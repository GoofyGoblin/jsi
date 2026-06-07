import { auth, db } from "./firebase.config.ts"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { query, collection, where, getDocs, setDoc, serverTimestamp, doc } from "firebase/firestore"
import { userSession } from "./userSession.mjs"

const users = collection(db, "users");
const googleProvider = new GoogleAuthProvider()

export async function getInfoFromFirestore(email: any) {
  try {
    const q = query(users, where(email, "==", "email"))
    const querySnapshot = await getDocs(q)
    console.log(querySnapshot);

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0]
      return userDoc.data()
    }

  } catch (e: any) {
    console.log(e.message)
    return
  }
}

export async function signInWithGoogle(role: string) {
  try {
    const userCredentials = await signInWithPopup(auth, googleProvider)
    const user = userCredentials.user

    let userInfo = await getInfoFromFirestore(user.email)

    if (!userInfo) {
      await setDoc(doc(db, "users", user.uid), {
        activeConfigId: "none",
        createdAt: serverTimestamp(),
        email: user.email,
        role: `${role}`,
        username: user.displayName
      }, { merge: true })
      userSession.saveSession(user)
    }

    return true
  } catch (e: any) {
    console.log(e.message)
    return false
  }
}


