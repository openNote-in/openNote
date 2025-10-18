import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit 
} from 'firebase/firestore';
import { db } from '../firebase';

export interface Resource {
  id: string;
  title: string;
  type: 'notes' | 'quantum' | 'pyq' | 'syllabus';
  isPremium: boolean;
  year: string;
  branch: string;
  subject: string;
  downloadUrl?: string;
  viewUrl?: string;
  uploadDate: Date;
  size: string;
  description?: string;
  tags?: string[];
}

export interface ResourceFilters {
  year?: string;
  branch?: string;
  subject?: string;
  type?: string;
  isPremium?: boolean;
}

class ResourceService {
  private collectionName = 'resources';

  // Get all resources with optional filters
  async getResources(filters: ResourceFilters = {}): Promise<Resource[]> {
    try {
      let q = query(collection(db, this.collectionName));

      // Apply filters
      if (filters.year) {
        q = query(q, where('year', '==', filters.year));
      }
      if (filters.branch) {
        q = query(q, where('branch', '==', filters.branch));
      }
      if (filters.subject) {
        q = query(q, where('subject', '==', filters.subject));
      }
      if (filters.type) {
        q = query(q, where('type', '==', filters.type));
      }
      if (filters.isPremium !== undefined) {
        q = query(q, where('isPremium', '==', filters.isPremium));
      }

      // Order by upload date (newest first)
      q = query(q, orderBy('uploadDate', 'desc'));

      const querySnapshot = await getDocs(q);
      const resources: Resource[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        resources.push({
          id: doc.id,
          title: data.title,
          type: data.type,
          isPremium: data.isPremium,
          year: data.year,
          branch: data.branch,
          subject: data.subject,
          downloadUrl: data.downloadUrl,
          viewUrl: data.viewUrl,
          uploadDate: data.uploadDate.toDate(),
          size: data.size,
          description: data.description,
          tags: data.tags
        });
      });

      return resources;
    } catch (error) {
      console.error('Error fetching resources:', error);
      throw new Error('Failed to fetch resources');
    }
  }

  // Get a single resource by ID
  async getResource(id: string): Promise<Resource | null> {
    try {
      const docRef = doc(db, this.collectionName, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          title: data.title,
          type: data.type,
          isPremium: data.isPremium,
          year: data.year,
          branch: data.branch,
          subject: data.subject,
          downloadUrl: data.downloadUrl,
          viewUrl: data.viewUrl,
          uploadDate: data.uploadDate.toDate(),
          size: data.size,
          description: data.description,
          tags: data.tags
        };
      }

      return null;
    } catch (error) {
      console.error('Error fetching resource:', error);
      throw new Error('Failed to fetch resource');
    }
  }

  // Search resources by title or tags
  async searchResources(searchTerm: string, filters: ResourceFilters = {}): Promise<Resource[]> {
    try {
      // Note: Firestore doesn't support full-text search natively
      // For production, consider using Algolia or similar service
      const resources = await this.getResources(filters);
      
      const searchLower = searchTerm.toLowerCase();
      return resources.filter(resource => 
        resource.title.toLowerCase().includes(searchLower) ||
        resource.description?.toLowerCase().includes(searchLower) ||
        resource.tags?.some(tag => tag.toLowerCase().includes(searchLower))
      );
    } catch (error) {
      console.error('Error searching resources:', error);
      throw new Error('Failed to search resources');
    }
  }

  // Add a new resource (admin function)
  async addResource(resource: Omit<Resource, 'id'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, this.collectionName), {
        ...resource,
        uploadDate: new Date()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding resource:', error);
      throw new Error('Failed to add resource');
    }
  }

  // Update a resource (admin function)
  async updateResource(id: string, updates: Partial<Resource>): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, id);
      await updateDoc(docRef, updates);
    } catch (error) {
      console.error('Error updating resource:', error);
      throw new Error('Failed to update resource');
    }
  }

  // Delete a resource (admin function)
  async deleteResource(id: string): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting resource:', error);
      throw new Error('Failed to delete resource');
    }
  }

  // Get subjects by branch
  async getSubjectsByBranch(branch: string): Promise<string[]> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('branch', '==', branch)
      );
      
      const querySnapshot = await getDocs(q);
      const subjects = new Set<string>();
      
      querySnapshot.forEach((doc) => {
        subjects.add(doc.data().subject);
      });
      
      return Array.from(subjects).sort();
    } catch (error) {
      console.error('Error fetching subjects:', error);
      throw new Error('Failed to fetch subjects');
    }
  }
}

export const resourceService = new ResourceService();