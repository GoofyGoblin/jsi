/*
 * Usersession, manages the user session.
 */

class UserSession {
    sessionKey: string
    userInfoKey: string

  constructor() {
    this.sessionKey = "user_session"
    this.userInfoKey = "user_info"
  }

  /*
   * Saves the user info inside localStorage
   */

  saveSession(user: any, additionalInfo = {}) {
    const sessionData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || "",
      photoURL: user.photoURL || "",
      emailVerified: user.emailVerified,
      loginTime: new Date().toISOString(),
      ...additionalInfo,
    }

    localStorage.setItem(this.sessionKey, JSON.stringify(sessionData))
    console.log("Phiên đăng nhập đã được lưu:", sessionData)
  }

  /*
   * Gets the user info from localStorage
   */
  getSession() {
    const sessionData = localStorage.getItem(this.sessionKey)
    return sessionData ? JSON.parse(sessionData) : null
  }

  /*
   * Check if user is logged in by checking the local storage data
   */

  isLoggedIn() {
    return this.getSession() !== null
  }

  getCurrentUser() {
    return this.getSession()
  }

  clearSession() {
    localStorage.removeItem(this.sessionKey)
    localStorage.removeItem(this.userInfoKey)
    console.log("Phiên đăng nhập đã được xóa")
  }

  saveUserInfo(userInfo: any) {
    localStorage.setItem(this.userInfoKey, JSON.stringify(userInfo))
  }

  getUserInfo() {
    const userInfo = localStorage.getItem(this.userInfoKey)
    return userInfo ? JSON.parse(userInfo) : null
  }

  isSessionExpired() {
    const session = this.getSession()
    if (!session || !session.loginTime) return true

    const loginTime: any = new Date(session.loginTime)
    const now: any = new Date()
    const hoursDiff = (now - loginTime) / (1000 * 60 * 60)

    return hoursDiff > 24
  }

  refreshSession() {
    const session = this.getSession()
    if (session) {
      session.loginTime = new Date().toISOString()
      localStorage.setItem(this.sessionKey, JSON.stringify(session))
    }
  }
}

export const userSession = new UserSession()

