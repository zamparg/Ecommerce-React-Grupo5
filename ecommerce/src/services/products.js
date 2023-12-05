import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
  limit,
  updateDoc,
  increment,
  where,
} from 'firebase/firestore'

import { db } from '../firebase/config'
import { filter } from '@chakra-ui/react';


export const getAllProducts = async (filterCondition = null, order=null) => {
  const collRef = collection(db, "products");
  let data
  if (filterCondition){
    const q = query(collRef, orderBy(filterCondition, order))
    data=await getDocs(q)
  }else {
    data = await getDocs(collRef)
  }

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
  const q = query(collRef, orderBy("searchCounter" , "desc"), limit(4));

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
  
  const q = query(collRef, orderBy("createdAt"), limit(3));//orderBy('name'),

  
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

//trae producto por ID
export const getProductById = async (id) => {
  const docRef = doc(db, 'products', id)
  const docSnap = await getDoc(docRef)
  
  if (docSnap.exists()) {
    // Incrementar el contador en la base de datos
    await updateDoc(docRef, { searchCounter: increment(1) });


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
export const createProduct = async (product) => {
  const doc = await addDoc(collection(db, 'products'), product)
  return doc
}

export const updateproduct = async (id, product) => {
  const docRef = doc(db, 'products', id)
  const docSnap = await getDoc(docRef)

 if (docSnap.exists()) {
    // Incrementar el contador en la base de datos
    await updateDoc(docRef, { ...product });
    const productData = docSnap.data()
    const prod= { ...productData, id: docSnap.id }
    return prod
  } else {
    throw new Error('El producto no existe')
  }
}








export const createContact = async (contact) => {
  const doc = await addDoc(collection(db, 'contact'), contact)
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
