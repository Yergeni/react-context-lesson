import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBocu5OVv0l6mWXLvpFF7d23jPLZaWv8Bk",
  authDomain: "crwn-db-e83a4.firebaseapp.com",
  databaseURL: "https://crwn-db-e83a4.firebaseio.com",
  projectId: "crwn-db-e83a4",
  storageBucket: "crwn-db-e83a4.appspot.com",
  messagingSenderId: "950999385972",
  appId: "1:950999385972:web:08f2b14f1b3a97e529ce21",
  measurementId: "G-070T2DDLSV"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
