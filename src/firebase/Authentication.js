import {
  // createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  // signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { initializeApp } from "firebase/app";
import { app } from "./Firebase";

const Auth = getAuth();

export const isAuthenticated = (setIsloggedState, userId) => {
  onAuthStateChanged(Auth, (user) => {
    if (user) {
      setIsloggedState(true);
    } else {
      setIsloggedState(false);
    }
  });
};

export const getLoggedUser = (setIsloggedState) => {
  onAuthStateChanged(Auth, (user) => {
    if (user) {
      setIsloggedState(user);
    } else {
      console.log("No user logged in")
    }
  });
}



export const LogoutUser = () => {
  signOut(Auth)
    .then(() => {
        console.log("// Sign-out successful.");
    })
    .catch((error) => {     
      console.log(error);
    });
};

export const checkUser = () => {
  let currentUser = Auth.currentUser;
  return currentUser;
};
