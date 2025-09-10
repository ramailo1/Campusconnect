
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, writeBatch, getDocs } from "firebase/firestore";
import { users, courses, appointments, libraryBooks } from './data';
import { defaultRoles } from './roles';

// IMPORTANT: Replace with your actual Firebase configuration
const firebaseConfig = {
  "apiKey": "API_KEY",
  "authDomain": "projectId.firebaseapp.com",
  "projectId": "projectId",
  "storageBucket": "projectId.appspot.com",
  "messagingSenderId": "senderId",
  "appId": "appId"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

async function seedCollection(collectionName: string, data: any[], idField?: string) {
    const collectionRef = collection(db, collectionName);
    const snapshot = await getDocs(collectionRef);

    if (!snapshot.empty) {
        console.log(`Collection "${collectionName}" is not empty. Skipping seeding.`);
        return;
    }

    const batch = writeBatch(db);
    console.log(`Seeding "${collectionName}"...`);
    data.forEach(item => {
        const docId = idField ? item[idField] : undefined;
        const docRef = docId ? collectionRef.doc(docId) : collectionRef.doc();
        batch.set(docRef, item);
    });

    await batch.commit();
    console.log(`Seeding for "${collectionName}" complete.`);
}


async function main() {
    console.log('Starting database seed process...');
    try {
        await seedCollection('roles', defaultRoles, 'id');
        await seedCollection('users', users, 'id');
        await seedCollection('courses', courses, 'code');
        await seedCollection('appointments', appointments, 'id');
        await seedCollection('libraryBooks', libraryBooks, 'id');
        console.log('Database seeding finished successfully.');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
}

main();
