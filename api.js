import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    getDoc,
    getDocs,
    collection,
    doc,
    getFirestore,
    query,
    where,
} from "firebase/firestore/lite";

const firebaseConfig = {
    apiKey: "AIzaSyCSqHTzJ1AMVPHWdqMD1uBQ1vL1kKsTByk",
    authDomain: "vanlife-aaf27.firebaseapp.com",
    projectId: "vanlife-aaf27",
    storageBucket: "vanlife-aaf27.appspot.com",
    messagingSenderId: "500195018628",
    appId: "1:500195018628:web:26e5701cc82aece5c7ffd1",
    measurementId: "G-JEQGBNXYK6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

const vansCollectionRef = collection(db, "vans");

export async function getVans() {
    const querySnapshot = await getDocs(vansCollectionRef);
    const dataArr = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
    }));
    return dataArr;
}

export async function getVan(id) {
    const docRef = doc(db, "vans", id);
    const vanSnapshot = await getDoc(docRef);
    return { ...vanSnapshot.data(), id: vanSnapshot.id };
}

export async function getHostVans() {
    const q = query(vansCollectionRef, where("hostId", "==", "123"));
    const querySnapshot = await getDocs(q);
    const dataArr = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
    }));
    return dataArr;
}


export async function loginUser(creds) {
    const res = await fetch("/api/login", {
        method: "post",
        body: JSON.stringify(creds),
    });
    const data = await res.json();

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status,
        };
    }

    return data;
}
