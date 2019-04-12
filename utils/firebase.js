import * as firebase from 'firebase';  // Should not be used elsewhere in the project
import { auth } from './auth';

firebase.initializeApp(auth.firebase);

export default firebase;
