import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase/app";
import "firebase/firestore";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
//Reducers
//@TODO

const firebaseConfig = {
  apiKey: "AIzaSyCAhS9mQWrONcJoyPSBnNi-FD2LXG76gnM",
  authDomain: "react-client-panel-14cd4.firebaseapp.com",
  databaseURL: "https://react-client-panel-14cd4.firebaseio.com",
  projectId: "react-client-panel-14cd4",
  storageBucket: "react-client-panel-14cd4.appspot.com",
  messagingSenderId: "602076740315"
};

//React-Redux-Firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

//Init firebase instance
firebase.initializeApp(firebaseConfig);
//Init firestore
// const firestore = firebase();

//Get rid of warning DateStamp!
const settings = { timestampsInSnapshots: true };
firebase.firestore().settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase) // <- needed if using firestore
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer // <- needed if using firestore
});

//Create initial state
// Create store with reducers and initial state
const initialState = {};

//Create store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
