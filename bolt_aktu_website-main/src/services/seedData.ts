import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

// Sample data to seed the database
const sampleResources = [
  // CSE Resources
  {
    title: 'Complete AKTU Syllabus 2025 - CSE',
    type: 'syllabus',
    isPremium: false,
    year: '1st Year',
    branch: 'CSE',
    subject: 'Data Structures',
    downloadUrl: '/api/resources/cse-syllabus-2025.pdf',
    size: '2.1 MB',
    description: 'Complete updated syllabus for Computer Science Engineering',
    tags: ['syllabus', 'cse', '2025', 'aktu']
  },
  {
    title: 'Data Structures Previous Year Questions 2024',
    type: 'pyq',
    isPremium: false,
    year: '2nd Year',
    branch: 'CSE',
    subject: 'Data Structures',
    downloadUrl: '/api/resources/ds-pyq-2024.pdf',
    size: '5.3 MB',
    description: 'Previous year question papers for Data Structures',
    tags: ['pyq', 'data structures', '2024']
  },
  {
    title: 'Quantum Series - Data Structures',
    type: 'quantum',
    isPremium: false,
    year: '2nd Year',
    branch: 'CSE',
    subject: 'Data Structures',
    downloadUrl: '/api/resources/quantum-ds.pdf',
    size: '12.7 MB',
    description: 'Complete Quantum series book for Data Structures',
    tags: ['quantum', 'data structures', 'book']
  },
  {
    title: 'Premium Data Structures Solutions',
    type: 'pyq',
    isPremium: true,
    year: '2nd Year',
    branch: 'CSE',
    subject: 'Data Structures',
    viewUrl: '/api/premium/ds-solutions.pdf',
    size: '8.4 MB',
    description: 'Detailed solutions to Data Structures PYQs with explanations',
    tags: ['premium', 'solutions', 'data structures']
  },
  {
    title: 'Expert Notes - Algorithms',
    type: 'notes',
    isPremium: true,
    year: '2nd Year',
    branch: 'CSE',
    subject: 'Algorithms',
    viewUrl: '/api/premium/algorithms-notes.pdf',
    size: '15.2 MB',
    description: 'Comprehensive notes created by AKTU toppers',
    tags: ['premium', 'notes', 'algorithms']
  },

  // IT Resources
  {
    title: 'Complete AKTU Syllabus 2025 - IT',
    type: 'syllabus',
    isPremium: false,
    year: '1st Year',
    branch: 'IT',
    subject: 'Programming Fundamentals',
    downloadUrl: '/api/resources/it-syllabus-2025.pdf',
    size: '2.0 MB',
    description: 'Complete updated syllabus for Information Technology',
    tags: ['syllabus', 'it', '2025', 'aktu']
  },
  {
    title: 'Web Development PYQ 2024',
    type: 'pyq',
    isPremium: false,
    year: '3rd Year',
    branch: 'IT',
    subject: 'Web Development',
    downloadUrl: '/api/resources/web-dev-pyq-2024.pdf',
    size: '4.8 MB',
    description: 'Previous year questions for Web Development',
    tags: ['pyq', 'web development', '2024']
  },
  {
    title: 'Premium Web Development Solutions',
    type: 'pyq',
    isPremium: true,
    year: '3rd Year',
    branch: 'IT',
    subject: 'Web Development',
    viewUrl: '/api/premium/web-dev-solutions.pdf',
    size: '9.1 MB',
    description: 'Step-by-step solutions for Web Development PYQs',
    tags: ['premium', 'solutions', 'web development']
  },

  // ECE Resources
  {
    title: 'Complete AKTU Syllabus 2025 - ECE',
    type: 'syllabus',
    isPremium: false,
    year: '1st Year',
    branch: 'ECE',
    subject: 'Digital Electronics',
    downloadUrl: '/api/resources/ece-syllabus-2025.pdf',
    size: '2.3 MB',
    description: 'Complete updated syllabus for Electronics and Communication',
    tags: ['syllabus', 'ece', '2025', 'aktu']
  },
  {
    title: 'Digital Electronics Quantum Book',
    type: 'quantum',
    isPremium: false,
    year: '2nd Year',
    branch: 'ECE',
    subject: 'Digital Electronics',
    downloadUrl: '/api/resources/quantum-digital-electronics.pdf',
    size: '11.5 MB',
    description: 'Quantum series book for Digital Electronics',
    tags: ['quantum', 'digital electronics', 'book']
  },
  {
    title: 'Premium Signal Processing Notes',
    type: 'notes',
    isPremium: true,
    year: '3rd Year',
    branch: 'ECE',
    subject: 'Signal Processing',
    viewUrl: '/api/premium/signal-processing-notes.pdf',
    size: '13.8 MB',
    description: 'Expert-created notes for Signal Processing',
    tags: ['premium', 'notes', 'signal processing']
  }
];

export const seedDatabase = async (): Promise<void> => {
  try {
    // Check if data already exists
    const resourcesSnapshot = await getDocs(collection(db, 'resources'));
    
    if (resourcesSnapshot.empty) {
      console.log('Seeding database with sample resources...');
      
      for (const resource of sampleResources) {
        await addDoc(collection(db, 'resources'), {
          ...resource,
          uploadDate: new Date()
        });
      }
      
      console.log('Database seeded successfully!');
    } else {
      console.log('Database already contains resources, skipping seed.');
    }
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};