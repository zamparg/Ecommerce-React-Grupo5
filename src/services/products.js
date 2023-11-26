import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
  limit,
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

// traer 4 productos más buscados --- HACER LOGICA EN BBDD
export const getMostSearchProducts = async () => {

  const collRef = collection(db, "products");
  const q = query(collRef, orderBy("name" , "desc"), limit(4));

  const data = await getDocs(q)
  let products = []

  data.forEach((doc) => {
    products.push({
      ...doc.data(),
      id: doc.id,
    })
  })

  return products
}

// traer últimos 4 productos 
export const getLatestProducts = async () => {

  const collRef = collection(db, "products");
  
  const q = query(collRef, orderBy("name"), limit(3));//orderBy('name'),

  
  const data = await getDocs(q);

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
