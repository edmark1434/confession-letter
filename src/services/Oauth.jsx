import { GoogleAuthProvider, getAuth, signInWithPopup, } from "firebase/auth";
import { saveUser} from "../repositiories/UserRepositories";
const provider = new GoogleAuthProvider();

export async function SignInWithGooglePopup() {
  const auth = getAuth();
  try {
    const result = await signInWithPopup(auth, provider);
    await saveUser(result.user.uid,{
        email:result.user.email,
        username:result.user.displayName,
        createdAt: new Date(),
        provider: "google"
    });
    return true;
  } catch (error) {
    throw error;
  }
}