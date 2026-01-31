import { realtimeDB } from "../firebase";
import { ref, onValue,push } from "firebase/database";
import { getAuth } from "firebase/auth";
const userMessagesRef = ref(realtimeDB, 'userMessages');

export function sendMessage(message) {
    return push(userMessagesRef, {
        message: message,
        timestamp: Date.now(),
        senderId: getAuth().currentUser.uid,
        senderName: getAuth().currentUser.displayName
    }
    );
}
export function toggleHeartMessage(messageId, messageData, currentUserId, currentUserName) {
    return new Promise(async (resolve, reject) => {
        try {
            const { realtimeDB } = await import('../firebase');
            const { ref, get, update } = await import('firebase/database');
            const { sendHeartNotification } = await import('./NotificationRepositories.js');
            
            const messageRef = ref(realtimeDB, `userMessages/${messageId}`);
            const snapshot = await get(messageRef);
            const currentData = snapshot.val();
            
            // Get current hearts data
            const heartedBy = currentData?.heartedBy || {};
            const currentHeartCount = currentData?.heart || 0;
            
            // Check if user already hearted
            const userAlreadyHearted = heartedBy[currentUserId] === true;
            
            if (userAlreadyHearted) {
                // Unheart: remove user and decrease count
                delete heartedBy[currentUserId];
                await update(messageRef, {
                    heart: Math.max(0, currentHeartCount - 1),
                    heartedBy: heartedBy
                });
                resolve({ action: 'unhearted', newCount: Math.max(0, currentHeartCount - 1) });
            } else {
                // Heart: add user and increase count
                heartedBy[currentUserId] = true;
                await update(messageRef, {
                    heart: currentHeartCount + 1,
                    heartedBy: heartedBy
                });
                
                // Send notification to message owner (not to self)
                if (messageData.senderId && messageData.senderId !== currentUserId) {
                    await sendHeartNotification(messageData.senderId, currentUserName, messageData.message);
                }
                
                resolve({ action: 'hearted', newCount: currentHeartCount + 1 });
            }
        } catch (error) {
            console.error('Error toggling heart:', error);
            reject(error);
        }
    });
}
export function getMessages(setMessagesList) {
    return onValue(userMessagesRef, (snapshot) => {
        const messages = [];
        snapshot.forEach((childSnapshot) => {
            messages.push({
                id: childSnapshot.key,
                ...childSnapshot.val()
            });
        });
        setMessagesList(messages);
    });
}
export function heartMessage(messageId) {
    const messageRef = ref(realtimeDB, `userMessages/${messageId}`);
    return onValue(messageRef, (snapshot) => {
        const data = snapshot.val();
        const currentHearts = data?.heart || 0;
        const hearterUserId = getAuth().currentUser.uid;
        const hearterName = getAuth().currentUser.displayName;
        
        // Update heart count
        const updates = {};
        updates[`userMessages/${messageId}/heart`] = currentHearts + 1;
        
        return realtimeDB.ref().update(updates);
    }, { onlyOnce: true });
}

export function addHeartToMessage(messageId, senderId, senderName) {
    const messageRef = ref(realtimeDB, `userMessages/${messageId}`);
    const hearterUserId = getAuth().currentUser.uid;
    const hearterName = getAuth().currentUser.displayName;
    
    return onValue(messageRef, (snapshot) => {
        const data = snapshot.val();
        const currentHearts = data?.heart || 0;
        const newHeartCount = currentHearts + 1;
        
        // Update using update instead of transaction
        const updates = {};
        updates[`userMessages/${messageId}/heart`] = newHeartCount;
        
        import('../firebase').then(({ realtimeDB }) => {
            import('firebase/database').then(({ update, ref: dbRef }) => {
                update(dbRef(realtimeDB), updates);
            });
        });
        
        return newHeartCount;
    }, { onlyOnce: true });
}