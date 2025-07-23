// Simple user session management
export class UserSession {
  private static readonly USER_ID_KEY = 'psi_user_id';
  private static readonly USER_NAME_KEY = 'psi_user_name';

  // Generate a unique user ID based on browser fingerprint
  private static generateUserId(): string {
    const browserInfo = [
      navigator.userAgent,
      navigator.language,
      screen.width,
      screen.height,
      new Date().getTimezoneOffset(),
      navigator.hardwareConcurrency || 0,
      (navigator as Navigator & { deviceMemory?: number }).deviceMemory || 0
    ].join('|');
    
    // Simple hash function
    let hash = 0;
    for (let i = 0; i < browserInfo.length; i++) {
      const char = browserInfo.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    return `user_${Math.abs(hash)}_${Date.now()}`;
  }

  // Get or create user ID
  static getUserId(): string {
    if (typeof window === 'undefined') return '';
    
    let userId = localStorage.getItem(this.USER_ID_KEY);
    if (!userId) {
      userId = this.generateUserId();
      localStorage.setItem(this.USER_ID_KEY, userId);
    }
    return userId;
  }

  // Get user name
  static getUserName(): string {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem(this.USER_NAME_KEY) || '';
  }

  // Set user name
  static setUserName(name: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.USER_NAME_KEY, name);
  }

  // Clear user session
  static clearSession(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(this.USER_ID_KEY);
    localStorage.removeItem(this.USER_NAME_KEY);
  }

  // Check if user is logged in
  static isLoggedIn(): boolean {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem(this.USER_ID_KEY);
  }
} 