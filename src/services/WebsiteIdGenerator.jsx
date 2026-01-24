import { getAuth } from "firebase/auth";
import { getUser } from "../repositiories/UserRepositories";

export const generateWebsiteId = async () => {
    let username = localStorage.getItem("username");
  if (!username) {
    const userDoc = await getUser(getAuth().currentUser.uid); // await resolves first
    username = userDoc?.username; // fallback in case username missing
    localStorage.setItem("username", username); // store for future use
  }

  const randomSuffix = Math.floor(1000 + Math.random() * 9000); // 4-digit number
  return username.replace(" ", "") + randomSuffix;
}