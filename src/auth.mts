import { auth, db } from "./firebase.config.ts"
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut } from "firebase/auth"
import { query, collection, where, getDocs, addDoc} from "firebase/firestore"
import { userSession } from "./userSession.mjs"

const googleProvider = new GoogleAuthProvider()

async function getUserInfoFromFirestore(email: any) {
  try {
    const q = query(collection(db, "users"), where("email", "==", email))
    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0]
      return userDoc.data()
    }
    return null
  } catch (error: any) {
    console.error("Lỗi lấy thông tin user:", error.message)
    return null
  }
}

/**
 * Đăng nhập / đăng ký bằng Google. Nếu chưa có bản ghi trong Firestore thì tạo user mới.
 */
export async function signInWithGoogle(role_id = 2) {
    try {
        const userCredential = await signInWithPopup(auth, googleProvider)
        const user = userCredential.user
        const email = user.email

        if (!email) {
            throw new Error("Tài khoản Google không có email.")
        }

        let userInfo = await getUserInfoFromFirestore(email)

        if (!userInfo) {
            await addDoc(collection(db, "users"), {
                email,
                role_id,
                balance: 0,
            })
            userInfo = await getUserInfoFromFirestore(email)
        }

        const additionalInfo = userInfo
            ? { role_id: userInfo.role_id }
            : { role_id }

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
