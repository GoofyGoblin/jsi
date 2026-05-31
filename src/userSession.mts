// userSession.js - Quản lý phiên đăng nhập người dùng

class UserSession {
  constructor() {
    this.sessionKey = "user_session"
    this.userInfoKey = "user_info"
  }

  // Lưu thông tin phiên đăng nhập
  saveSession(user, additionalInfo = {}) {
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

  // Lấy thông tin phiên đăng nhập
  getSession() {
    const sessionData = localStorage.getItem(this.sessionKey)
    return sessionData ? JSON.parse(sessionData) : null
  }

  // Kiểm tra xem người dùng đã đăng nhập chưa
  isLoggedIn() {
    return this.getSession() !== null
  }

  // Lấy thông tin người dùng từ session
  getCurrentUser() {
    return this.getSession()
  }

  // Xóa phiên đăng nhập (đăng xuất)
  clearSession() {
    localStorage.removeItem(this.sessionKey)
    localStorage.removeItem(this.userInfoKey)
    console.log("Phiên đăng nhập đã được xóa")
  }

  // Lưu thông tin bổ sung của người dùng (từ Firestore)
  saveUserInfo(userInfo) {
    localStorage.setItem(this.userInfoKey, JSON.stringify(userInfo))
  }

  // Lấy thông tin bổ sung của người dùng
  getUserInfo() {
    const userInfo = localStorage.getItem(this.userInfoKey)
    return userInfo ? JSON.parse(userInfo) : null
  }

  // Kiểm tra xem session có hết hạn không (optional - 24h)
  isSessionExpired() {
    const session = this.getSession()
    if (!session || !session.loginTime) return true

    const loginTime = new Date(session.loginTime)
    const now = new Date()
    const hoursDiff = (now - loginTime) / (1000 * 60 * 60)

    return hoursDiff > 24 // Session hết hạn sau 24h
  }

  // Gia hạn session
  refreshSession() {
    const session = this.getSession()
    if (session) {
      session.loginTime = new Date().toISOString()
      localStorage.setItem(this.sessionKey, JSON.stringify(session))
    }
  }
}

// Export singleton instance
export const userSession = new UserSession()

// Export class để có thể tạo instance mới nếu cần
export default UserSession
