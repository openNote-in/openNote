import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile,
  AuthError
} from 'firebase/auth';
import { auth } from '../firebase';
import { userService } from '../services/userService';
import { AuthUser } from '../types/user';

/**
 * Interface defining the shape of our authentication context
 */
interface AuthContextType {
  /** Current authenticated user or null if not authenticated */
  user: AuthUser | null;
  /** Loading state for authentication operations */
  loading: boolean;
  /** Sign up with email and password */
  signup: (email: string, password: string, displayName?: string) => Promise<void>;
  /** Login with email and password */
  login: (email: string, password: string) => Promise<void>;
  /** Login with Google popup */
  loginWithGoogle: () => Promise<void>;
  /** Logout current user */
  logout: () => Promise<void>;
  /** Send password reset email */
  resetPassword: (email: string) => Promise<void>;
  /** Update user profile */
  updateUserProfile: (displayName: string, photoURL?: string) => Promise<void>;
}

/**
 * Authentication context - provides auth state and methods to entire app
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Custom hook to use authentication context
 * Throws error if used outside of AuthProvider
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

/**
 * Props interface for AuthProvider component
 */
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Authentication provider component that wraps the entire application
 * Manages authentication state and provides auth methods to child components
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  /**
   * Sign up new user with email and password
   * @param email - User's email address
   * @param password - User's password
   * @param displayName - Optional display name for the user
   */
  const signup = async (email: string, password: string, displayName?: string): Promise<void> => {
    try {
      setLoading(true);
      const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update user profile with display name if provided
      if (displayName && firebaseUser) {
        await updateProfile(firebaseUser, { displayName });
      }

      // Create user profile in Firestore
      await userService.createUserProfile(firebaseUser.uid, {
        email: firebaseUser.email || '',
        displayName: displayName || firebaseUser.displayName || '',
        photoURL: firebaseUser.photoURL || '',
        role: 'user'
      });
    } catch (error) {
      const authError = error as AuthError;
      throw new Error(getAuthErrorMessage(authError));
    } finally {
      setLoading(false);
    }
  };

  /**
   * Login user with email and password
   * @param email - User's email address
   * @param password - User's password
   */
  const login = async (email: string, password: string): Promise<void> => {
    try {
      setLoading(true);
      const { user: firebaseUser } = await signInWithEmailAndPassword(auth, email, password);
      
      // Update last login time in Firestore
      await userService.createUserProfile(firebaseUser.uid, {
        email: firebaseUser.email || '',
        displayName: firebaseUser.displayName || '',
        photoURL: firebaseUser.photoURL || ''
      });
    } catch (error) {
      const authError = error as AuthError;
      throw new Error(getAuthErrorMessage(authError));
    } finally {
      setLoading(false);
    }
  };

  /**
   * Login user with Google popup
   * Handles popup blocked scenarios gracefully
   */
  const loginWithGoogle = async (): Promise<void> => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      
      // Add additional scopes if needed
      provider.addScope('email');
      provider.addScope('profile');
      
      // Configure provider settings
      provider.setCustomParameters({
        prompt: 'select_account'
      });

      const { user: firebaseUser } = await signInWithPopup(auth, provider);
      
      // Create/update user profile in Firestore
      await userService.createUserProfile(firebaseUser.uid, {
        email: firebaseUser.email || '',
        displayName: firebaseUser.displayName || '',
        photoURL: firebaseUser.photoURL || '',
        role: 'user'
      });
    } catch (error) {
      const authError = error as AuthError;
      
      // Handle popup blocked scenario
      if (authError.code === 'auth/popup-blocked') {
        throw new Error('Popup was blocked by your browser. Please allow popups and try again.');
      }
      
      // Handle popup closed by user
      if (authError.code === 'auth/popup-closed-by-user') {
        throw new Error('Sign-in was cancelled. Please try again.');
      }
      
      throw new Error(getAuthErrorMessage(authError));
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logout current user
   */
  const logout = async (): Promise<void> => {
    try {
      setLoading(true);
      await signOut(auth);
    } catch (error) {
      const authError = error as AuthError;
      throw new Error(getAuthErrorMessage(authError));
    } finally {
      setLoading(false);
    }
  };

  /**
   * Send password reset email to user
   * @param email - User's email address
   */
  const resetPassword = async (email: string): Promise<void> => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      const authError = error as AuthError;
      throw new Error(getAuthErrorMessage(authError));
    }
  };

  /**
   * Update user profile information
   * @param displayName - New display name for the user
   * @param photoURL - New photo URL for the user
   */
  const updateUserProfile = async (displayName: string, photoURL?: string): Promise<void> => {
    try {
      if (!user) {
        throw new Error('No user is currently signed in');
      }
      
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error('No user is currently signed in');
      }

      // Update Firebase Auth profile
      await updateProfile(currentUser, { 
        displayName, 
        ...(photoURL && { photoURL }) 
      });

      // Update Firestore profile
      await userService.createUserProfile(currentUser.uid, {
        displayName,
        ...(photoURL && { photoURL })
      });
    } catch (error) {
      const authError = error as AuthError;
      throw new Error(getAuthErrorMessage(authError));
    }
  };

  /**
   * Set up authentication state listener on component mount
   * This listener will update the user state whenever auth state changes
   */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Get user profile from Firestore to get role
          const userProfile = await userService.getUserProfile(firebaseUser.uid);
          
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            emailVerified: firebaseUser.emailVerified,
            role: userProfile?.role || 'user'
          });
        } catch (error) {
          console.error('Error fetching user profile:', error);
          // Fallback to basic user info
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            emailVerified: firebaseUser.emailVerified,
            role: 'user'
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  /**
   * Context value object containing all auth state and methods
   */
  const value: AuthContextType = {
    user,
    loading,
    signup,
    login,
    loginWithGoogle,
    logout,
    resetPassword,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Converts Firebase auth error codes to user-friendly messages
 * @param error - Firebase AuthError object
 * @returns User-friendly error message
 */
const getAuthErrorMessage = (error: AuthError): string => {
  switch (error.code) {
    case 'auth/user-not-found':
      return 'No account found with this email address.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters long.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection and try again.';
    case 'auth/requires-recent-login':
      return 'Please log out and log back in to perform this action.';
    default:
      return error.message || 'An unexpected error occurred. Please try again.';
  }
};