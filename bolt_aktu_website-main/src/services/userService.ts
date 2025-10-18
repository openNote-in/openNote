import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  collection, 
  getDocs, 
  query, 
  orderBy,
  where,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../firebase';
import { UserProfile } from '../types/user';

class UserService {
  private collectionName = 'users';

  /**
   * Create or update user profile in Firestore
   */
  async createUserProfile(uid: string, userData: Partial<UserProfile>): Promise<void> {
    try {
      const userRef = doc(db, this.collectionName, uid);
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists()) {
        // Create new user profile
        await setDoc(userRef, {
          uid,
          role: 'user',
          createdAt: new Date(),
          lastLoginAt: new Date(),
          isActive: true,
          ...userData
        });
      } else {
        // Update last login time
        await updateDoc(userRef, {
          lastLoginAt: new Date(),
          isActive: true
        });
      }
    } catch (error) {
      console.error('Error creating/updating user profile:', error);
      throw new Error('Failed to create user profile');
    }
  }

  /**
   * Get user profile from Firestore
   */
  async getUserProfile(uid: string): Promise<UserProfile | null> {
    try {
      const userRef = doc(db, this.collectionName, uid);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        const data = userDoc.data();
        return {
          uid: data.uid,
          email: data.email,
          displayName: data.displayName,
          photoURL: data.photoURL,
          role: data.role || 'user',
          createdAt: data.createdAt?.toDate() || new Date(),
          lastLoginAt: data.lastLoginAt?.toDate() || new Date(),
          isActive: data.isActive ?? true
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw new Error('Failed to fetch user profile');
    }
  }

  /**
   * Update user role (admin only)
   */
  async updateUserRole(uid: string, role: 'user' | 'admin'): Promise<void> {
    try {
      const userRef = doc(db, this.collectionName, uid);
      await updateDoc(userRef, { role });
    } catch (error) {
      console.error('Error updating user role:', error);
      throw new Error('Failed to update user role');
    }
  }

  /**
   * Get all users (admin only)
   */
  async getAllUsers(): Promise<UserProfile[]> {
    try {
      const usersQuery = query(
        collection(db, this.collectionName),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(usersQuery);
      const users: UserProfile[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        users.push({
          uid: data.uid,
          email: data.email,
          displayName: data.displayName,
          photoURL: data.photoURL,
          role: data.role || 'user',
          createdAt: data.createdAt?.toDate() || new Date(),
          lastLoginAt: data.lastLoginAt?.toDate() || new Date(),
          isActive: data.isActive ?? true
        });
      });
      
      return users;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new Error('Failed to fetch users');
    }
  }

  /**
   * Get user statistics (admin only)
   */
  async getUserStats(): Promise<{
    totalUsers: number;
    activeUsers: number;
    adminUsers: number;
    newUsersThisWeek: number;
  }> {
    try {
      const users = await this.getAllUsers();
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      
      return {
        totalUsers: users.length,
        activeUsers: users.filter(user => user.isActive).length,
        adminUsers: users.filter(user => user.role === 'admin').length,
        newUsersThisWeek: users.filter(user => user.createdAt >= oneWeekAgo).length
      };
    } catch (error) {
      console.error('Error fetching user stats:', error);
      throw new Error('Failed to fetch user statistics');
    }
  }
}

export const userService = new UserService();