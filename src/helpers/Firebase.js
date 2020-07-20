import firebase from 'firebase/app'
import "firebase/storage"

import { firebaseConfig } from "../constants/defaultValues";

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage();
// const auth = firebase.auth();

export { storage, firebase as default }