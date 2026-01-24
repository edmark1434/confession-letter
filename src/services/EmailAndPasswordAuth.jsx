import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export async function login(credentials, auth) {
    try {
        const cred = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
        return cred.user;
    } catch (error) {
        // Check if it's a credential-related error
        if (error.code === 'auth/user-not-found' || 
            error.code === 'auth/wrong-password' ||
            error.code === 'auth/invalid-email') {
            throw new Error("Invalid login credentials");
        }
        // For other errors, rethrow the original
        throw error;
    }
}

export async function register(userInfo, auth, db) {
    try{
    const cred = await createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password);
    const user = cred.user;

    await setDoc(doc(db,"users",user.uid),{
        email: user.email,
        fullname: userInfo.fullname,
        username: userInfo.username,
        createdAt: serverTimestamp(),
    })
    return user;
  }catch(error){
    if (error.code === 'auth/email-already-in-use') {
      throw new Error("Email already registered");
    }
    if (error.code === 'auth/weak-password') {
      throw new Error("Password must be at least 6 characters");
    }
    throw error;
  }
}