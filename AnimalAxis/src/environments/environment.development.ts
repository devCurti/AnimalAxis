import * as firebase from '../../firebase.json';
import { getApps, initializeApp } from 'firebase/app';

export const environment = {
    production: false,
    firebaseConfig: firebase,
    apiUrl: 'https://animalaxissapi.azurewebsites.net/api'
};


// Initialize Firebase
export const app = getApps().length > 0 ? getApps()[0] : initializeApp(firebase)