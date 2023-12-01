import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth'

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
