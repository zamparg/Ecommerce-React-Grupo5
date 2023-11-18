import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore'

import { db } from '../firebase/config'

export const getAllProducts = async () => {
  const data = await getDocs(collection(db, 'products'))

  let products = []

  data.forEach((doc) => {
    products.push({
      ...doc.data(),
      id: doc.id,
    })
  })
  return products
}

export const getProductById = async (id) => {
  const docRef = doc(db, 'products', id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    const productData = docSnap.data()
    const product = { ...productData, id: docSnap.id }
    return product
  } else {
    throw new Error('El producto no existe')
  }
}

export const createOrder = async (order) => {
  const doc = await addDoc(collection(db, 'orders'), order)
  return doc
}

export const getOrderByUserId = async (id) => {
  const data = await getDocs(
    query(collection(db, 'orders'), where('id', '==', id))
  )

  let orders = []

  data.forEach((doc) => {
    orders.push({
      ...doc.data(),
      id: doc.id,
    })
  })
  return orders
}
