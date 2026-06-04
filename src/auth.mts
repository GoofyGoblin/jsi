import { auth, db } from "./firebase.config.ts"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { query, collection, where, getDocs, addDoc, serverTimestamp } from "firebase/firestore"
import { userSession } from "./userSession.mjs"
import type { DocumentData } from "firebase/firestore/lite"

const googleProvider = new GoogleAuthProvider()

async function getUserInfoFromFirestore(email: any) {
    try {
        const q = query(collection(db, "users"), where("email", "==", email))
        const querySnapshot = await getDocs(q)

        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0]
            return userDoc.data()
        }
        return
    } catch (error: any) {
        console.error(error.message)
        return
    }
}

/*
 * Đăng nhập / đăng ký bằng Google. Nếu chưa có bản ghi trong Firestore thì tạo user mới.
 */

export async function signInWithGoogle(role = "user", username: string) {
    try {
        const userCredential = await signInWithPopup(auth, googleProvider)
        const user = userCredential.user
        const email = user.email
        const activeConfigId = "none";
        const createdAt = serverTimestamp()

        if (!email) {
            throw new Error("Tài khoản Google không có email.")
        }

        let userInfo = await getUserInfoFromFirestore(email) as DocumentData | undefined

        if (!userInfo) {
            await addDoc(collection(db, "users"), {
                activeConfigId,
                createdAt,
                email,
                role,
                username: `${userInfo.displayName}`,
            })
            userInfo = await getUserInfoFromFirestore(email)
        }

        const additionalInfo = userInfo
            ? { role: userInfo.role_id }
            : { role }

        userSession.saveSession(user, additionalInfo)

        if (userInfo) {
            userSession.saveUserInfo(userInfo)
        }

        return user
    } catch (error: any) {
        console.error("Lỗi đăng nhập Google:", error.message)
        throw error
    }
}
