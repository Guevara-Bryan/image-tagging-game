import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyB-itbaK68LfWH5QoAHcruflOGen6xNlrc',
	authDomain: 'wheres-waldo-ba1ab.firebaseapp.com',
	projectId: 'wheres-waldo-ba1ab',
	storageBucket: 'wheres-waldo-ba1ab.appspot.com',
	messagingSenderId: '1091547547742',
	appId: '1:1091547547742:web:ab3e021f8341baef54cccf',
};

const app = initializeApp(firebaseConfig);

export const dataBase = getFirestore(app);
