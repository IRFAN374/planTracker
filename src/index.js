import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware , compose} from 'redux';
import rootReducers from './store/reducers/rootReducers';
import thunk from 'redux-thunk';
import { getFirestore, reduxFirestore, createFirestoreInstance } from 'redux-firestore';
import { getFirebase,  ReactReduxFirebaseProvider} from 'react-redux-firebase'
import firebase from 'firebase/app'
import fbConfig from './config/fbConfig'
// applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
// applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
import { useSelector } from 'react-redux'
import { isLoaded } from 'react-redux-firebase'

const store = createStore(
  rootReducers,
  compose(
      applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })),
      reduxFirestore(firebase, fbConfig)
  )
);

const profileSpecificProps = {
  userProfile: "users",
  useFirestoreForProfile: true,
  enableRedirectHandling: false,
  resetBeforeLogin: false,
};

const rrfProps = {
  firebase,
  config:  profileSpecificProps, fbConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
};
// const store = createStore(rootReducers,
//   compose(
//     applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
//     reactReduxFirebase(fbConfig), // redux binding for firebase
//     reduxFirestore(fbConfig) // redux bindings for firestore
//   )
// );

// const store = createStore(
//   rootReducers,
//   compose(
//     applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
//     reduxFirestore(fbConfig),
//     reactReduxFirebase(fbConfig)
//   )
// );

function AuthIsLoaded({ children }) {
  const auth = useSelector(state => state.firebase.auth)
  if (!isLoaded(auth)) return <div>loading....</div>;
  return children
}

ReactDOM.render(
    <Provider store={store} >
       <ReactReduxFirebaseProvider {...rrfProps}>
          <AuthIsLoaded>
             <App />
          </AuthIsLoaded>
      </ReactReduxFirebaseProvider>
    </Provider> ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
