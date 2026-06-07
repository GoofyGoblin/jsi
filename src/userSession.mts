/*
* UserSession, some methods to save time on manipulating user data
*/

class UserSession {
  sessionKey: string
  userInfoKey: string

  constructor() {
    this.sessionKey = "user_session"
    this.userInfoKey = "user_info"
  }

  saveSession(user: any, additionalInfo = {}) {

    const sessionData = {
      configId: user.activeConfigId,
      createdAt: user.createdAt,
      email: user.email,
      role: user.role,
      username: user.displayName,
      loginTime: new Date().toISOString(),
      ...additionalInfo
    }

    localStorage.setItem(this.sessionKey, JSON.stringify(sessionData))
    console.log("Saved session data", sessionData)
    console.log("User data", user)
  }

  getSession() {
    const sessionData = localStorage.getItem(this.sessionKey)
    return sessionData ? JSON.parse(sessionData) : null
  }

  clearSession() {
    localStorage.removeItem(this.sessionKey)
    console.log("Removed session data")
  }

  saveUserInfo(userInfo: any) {
    localStorage.setItem(this.userInfoKey, userInfo)
  }

  isLoggedIn() {
    return this.getSession() !== null
  }

  isSessionExpired() {
    const sessionData = this.getSession()
    if (!sessionData || !sessionData.loginTime) return true

    const loginTime: any = new Date(sessionData.loginTime)
    const currentTime: any = new Date()

    const hoursDiff = (currentTime - loginTime) / 3600000

    return hoursDiff > 24
  }

  refreshSession() {
    const sessionData = this.getSession()

    if (sessionData) {
      sessionData.loginTime = new Date().toISOString()
      localStorage.setItem(this.sessionKey, JSON.stringify(sessionData))
    }
  }
}

export const userSession = new UserSession()
export default UserSession

