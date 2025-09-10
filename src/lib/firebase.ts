// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, setDoc, addDoc, deleteDoc, writeBatch } from "firebase/firestore";
import { defaultRoles } from "./roles";
import type { Role } from "./roles";

// Your web app's Firebase configuration
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

// Function to seed the database with default roles if it's empty
export const seedDefaultRoles = async () => {
    const rolesCollection = collection(db, 'roles');
    const snapshot = await getDocs(rolesCollection);
    if (snapshot.empty) {
        console.log('No roles found in Firestore, seeding default roles...');
        const batch = writeBatch(db);
        defaultRoles.forEach((role) => {
            const docRef = doc(db, 'roles', role.id);
            batch.set(docRef, role);
        });
        await batch.commit();
        console.log('Default roles have been seeded.');
    }
};

// Functions to interact with the 'roles' collection in Firestore
export const getRoles = async (): Promise<Role[]> => {
    await seedDefaultRoles(); // Ensure roles exist before fetching
    const rolesCollection = collection(db, 'roles');
    const snapshot = await getDocs(rolesCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Role));
};

export const addRole = async (role: Omit<Role, 'id'>): Promise<Role> => {
    const newRoleRef = await addDoc(collection(db, 'roles'), role);
    return { id: newRoleRef.id, ...role };
}

export const updateRole = async (role: Role) => {
    const roleRef = doc(db, 'roles', role.id);
    await setDoc(roleRef, role, { merge: true });
};

export const deleteRole = async (roleId: string) => {
    const roleRef = doc(db, 'roles', roleId);
    await deleteDoc(roleRef);
};


export { db };