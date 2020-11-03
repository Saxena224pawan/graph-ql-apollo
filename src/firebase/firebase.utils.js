import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
const config = {
  apiKey: "AIzaSyDFMC94Cp4U5mNCDCM819ILdHXNryJgxes",
  authDomain: "crwn-db-30282.firebaseapp.com",
  databaseURL: "https://crwn-db-30282.firebaseio.com",
  projectId: "crwn-db-30282",
  storageBucket: "crwn-db-30282.appspot.com",
  messagingSenderId: "756749793409",
  appId: "1:756749793409:web:8fff2f207d9ca54ac73580",
  measurementId: "G-YE41L5PEQY"
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
