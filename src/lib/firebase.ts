// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, setDoc, addDoc, deleteDoc, writeBatch, getDoc } from "firebase/firestore";
import { defaultRoles } from "./roles";
import type { Role } from "./roles";
import type { NavItem } from "./data";
import { navItems as defaultNavItems, adminNavItems as defaultAdminNavItems } from "./data";

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

// ----- ROLES -----
export const fetchRolesFromDB = async (): Promise<Role[]> => {
    const rolesCollection = collection(db, 'roles');
    const snapshot = await getDocs(rolesCollection);
    if (snapshot.empty) {
        console.log('No roles found, returning default roles.');
        return defaultRoles;
    }
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Role));
};

export const addRoleToDB = async (role: Omit<Role, 'id'>): Promise<Role> => {
    const newRoleRef = await addDoc(collection(db, 'roles'), role);
    return { id: newRoleRef.id, ...role };
}

export const updateRoleInDB = async (role: Role) => {
    const roleRef = doc(db, 'roles', role.id);
    await setDoc(roleRef, role, { merge: true });
};

export const deleteRoleFromDB = async (roleId: string) => {
    const roleRef = doc(db, 'roles', roleId);
    await deleteDoc(roleRef);
};


// ----- SETTINGS -----

export const getSettings = async () => {
    const settingsDocRef = doc(db, 'settings', 'global');
    const docSnap = await getDoc(settingsDocRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        // Return default settings if the document doesn't exist
        console.log("No global settings found, creating from defaults.");
        const defaultSettings = {
            navItems: defaultNavItems,
            adminNavItems: defaultAdminNavItems,
            platformName: 'CampusConnect',
            sidebarBehavior: 'expanded',
            dashboardSettings: {
                metrics: ["total-visitors", "borrowed-books", "overdue-books", "new-members"],
                sections: ["users-list", "books-list", "top-choices"],
            },
            dashboardText: {
                greeting: "Hello",
                metrics: {
                    "total-visitors": "Total Visitors",
                    "borrowed-books": "Borrowed Books",
                    "overdue-books": "Overdue Books",
                    "new-members": "New Members",
                },
                sections: {
                    "users-list": "Users List",
                    "books-list": "Books List",
                    "top-choices": "Top Choices",
                },
                addUserButton: "Add New User"
            },
            appointmentFormText: {
                title: "Schedule an Appointment",
                description: "Book a new appointment.",
                studentLabel: "Student",
                studentPlaceholder: "Select a student",
                advisorLabel: "Advisor",
                advisorPlaceholder: "Select an advisor",
                dateLabel: "Date",
                timeLabel: "Available Times",
                timePlaceholder: "Select a time slot",
                notesLabel: "Notes (Optional)",
                notesPlaceholder: "e.g. Discussing fall semester schedule",
                buttonText: "Schedule Appointment"
            }
        };
        await saveSettings(defaultSettings);
        return defaultSettings;
    }
};

export const saveSettings = async (settings: any) => {
    const settingsDocRef = doc(db, 'settings', 'global');
    await setDoc(settingsDocRef, settings);
};

// ----- Generic Data Fetching -----
export const fetchCollection = async <T>(collectionName: string): Promise<T[]> => {
    const dataCollection = collection(db, collectionName);
    const snapshot = await getDocs(dataCollection);
    return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }) as T);
}

export const addDocument = async <T>(collectionName: string, data: T): Promise<T & { id: string }> => {
    const docRef = await addDoc(collection(db, collectionName), data as any);
    return { ...data, id: docRef.id };
};

export const updateDocument = async (collectionName: string, docId: string, data: any) => {
    const docRef = doc(db, collectionName, docId);
    await setDoc(docRef, data, { merge: true });
};

export const deleteDocument = async (collectionName: string, docId: string) => {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
};


export { db };
