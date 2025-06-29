// Storage utility for BELANCE - Centralized localStorage management

export const STORAGE_KEYS = {
  USER_LOGGED_IN: 'belance_user_logged_in',
  USER_PROFILE: 'belance_user_profile',
  USER_DATA: 'belance_user_data'
} as const;

// ✅ UTILITY FUNCTIONS for localStorage management
export const saveToStorage = (key: string, data: any) => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(data));
    }
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const getFromStorage = (key: string) => {
  try {
    if (typeof window !== 'undefined') {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
  } catch (error) {
    console.error('Error reading from localStorage:', error);
  }
  return null;
};

export const removeFromStorage = (key: string) => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};

export const clearAllUserData = () => {
  Object.values(STORAGE_KEYS).forEach(key => {
    removeFromStorage(key);
  });
  console.log('✅ All user data cleared from localStorage');
};