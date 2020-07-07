import firebase from 'firebase/app'
import "firebase/storage"

import { firebaseConfig } from "../constants/defaultValues";

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage();

export { storage, firebase as default }