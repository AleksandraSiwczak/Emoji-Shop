import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

import {
  getAuth,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDSI5D-GqSOZfoxUE1DyGT_PDpMqUV-u7I",
  authDomain: "ola-siwczak-test.firebaseapp.com",
  projectId: "ola-siwczak-test",
  storageBucket: "ola-siwczak-test.appspot.com",
  messagingSenderId: "751443405751",
  appId: "1:751443405751:web:8b06f361359d8399231632",
  measurementId: "G-WEFM8SCPNY",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export const getProducts = () => {
	return getDocs(collection(db, 'products')).then(result => result.docs.map(doc => {
		return {
			id: doc.id,
			...doc.data() as { item: string; name: string; price: { value: number; currency: 'PLN' }}
		}
	}))
}

// @ts-ignore
window.importDataToFirestore = () => {
  fetch('http://localhost:3000/products.json').then(response => response.json()).then(data => {
    // @ts-ignore
    data.forEach(({ id, ...product }) => {
      addDoc(collection(db, 'products'), product)
    })
  })
}

// const registerUserWithEmail = async (name, email, password, callback) => {
//   const response = await createUserWithEmailAndPassword(auth, email, password);
//   const user = response.user;
//   alert("Uzytkownik zarejestrowany");
//   callback(user);
  

//   await addDoc(collection(db, "users"), {
//     uid: user.uid,
//     name,
//     authProvider: "local",
//     email,
//   });
// };

// const loginUserWithEmail = async (email, password, callback) => {
//   await signInWithEmailAndPassword(auth, email, password).then((response) => {
//     console.log(response);
//     callback(response);
//   });
// };

export { db, auth };
