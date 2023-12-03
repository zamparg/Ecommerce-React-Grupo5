import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth'

import {
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore'


import { db } from '../firebase/config'
import { auth } from '../firebase/config'

export const loginWithEmail = async ({ email, password }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )
    const { user } = userCredential
    // console.log(user)
    return user
  } catch (error) {
    const errorCode = error.code
    const errorMessage = error.message
    console.log(errorCode, errorMessage)
  }
}

export const registerUser = async ({ email, password }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
    const { user } = userCredential
    // console.log(user)
    return user
  } catch (error) {
    const errorCode = error.code
    const errorMessage = error.message
    console.log(errorCode, errorMessage)
  }
}

export const loginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider()
    const userCredential = await signInWithPopup(auth, provider)
    const { user } = userCredential
    return user
  } catch (error) {
    const errorCode = error.code
    const errorMessage = error.message
    console.log(errorCode, errorMessage)
  }
}

  export const isAdminUser = async (email) => {

    const adminQuery = query(collection(db, 'admin'), where('email', '==', email));


    const querySnapshot = await getDocs(adminQuery);

  // Verificar si hay algún documento que cumple con la condición
  const exists = querySnapshot.size > 0;
  
  return exists;
  }
