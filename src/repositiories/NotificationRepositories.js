import { realtimeDB } from "../firebase";
import { ref, onValue,push } from "firebase/database";
const userNotificationRef = ref(realtimeDB, 'userNotifications');
export function sendNotification(id,userId,message,type) {
    return push(userNotificationRef, {
        title: type === "confession" ? "New Confession Response" : "New Valentine Response",
        message: message,
        timestamp: Date.now(),
        id: id,
        receiverId: userId,
    });
}
export function getNotifications(id,setNotifications) {
    return onValue(userNotificationRef, (snapshot) => {
        const notifications = [];
        snapshot.forEach((childSnapshot) => {
        const data = childSnapshot.val();

        if (data.receiverId === id) {
            notifications.push({
            id: childSnapshot.key,
            ...data
            });
        }
        });
        notifications.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
        setNotifications(notifications);
    });
}

export function sendHeartNotification(messageOwnerId, hearterName, message) {
    return push(userNotificationRef, {
        title: "New Heart on Your Message",
        message: `${hearterName} hearted your message: "${message.substring(0, 50)}${message.length > 50 ? '...' : ''}"`,
        timestamp: Date.now(),
        receiverId: messageOwnerId,
        type: 'heart'
    });
}

