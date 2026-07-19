import { addDoc } from "firebase/firestore/lite";
import { auth, db } from "./firebase.config.ts"
import { getDoc, doc, setDoc } from "firebase/firestore"

export async function uploadSubcollection(userId: any, userConfig: object, configType: string) {
  const subCollectionRef = doc(db, "users", userId, "config", configType);
  await setDoc(subCollectionRef, userConfig)
}

export async function getUploadedSubCollection(userId: any, configType: string) {
  const subCollectionRef = doc(db, "users", userId, "config", configType)
  const userConfig = getDoc(subCollectionRef)
  userConfig.then((doc) => {
    if (doc.exists()) {
      localStorage.setItem("user_config", JSON.stringify(doc.data()));
    } else {
      console.log("No document");
    }
  });
  return userConfig;
}
