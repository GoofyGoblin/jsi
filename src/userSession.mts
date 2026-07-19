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
  }

  getSession() {
    const sessionData = localStorage.getItem(this.sessionKey)
    return sessionData ? JSON.parse(sessionData) : null
  }
}

export const userSession = new UserSession()
export default UserSession

