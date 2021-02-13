import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCeRPV74O3VuTUULja1njJHNkWn4OsfbO8",
  authDomain: "crwn-db-80cd5.firebaseapp.com",
  projectId: "crwn-db-80cd5",
  storageBucket: "crwn-db-80cd5.appspot.com",
  messagingSenderId: "810970795413",
  appId: "1:810970795413:web:1d83b0f5533c09ac33ba9c",
  measurementId: "G-Q1EK9ZKW9V",
};

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
        ...additionalData,
      });
    } catch (error) {
      console.log("Error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
