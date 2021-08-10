import { 
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    SIGNOUT_SUCCESS,
    SIGNOUT_ERROR ,
    SIGNUP_SUCCESS,
    SIGNUP_ERROR
} from "../constant/constant";

export const signIn = (crediantilas)=>{
    return( dispatch, getState, {getFirebase} )=>{
        const firebase = getFirebase();
        firebase.auth().signInWithEmailAndPassword(
            crediantilas.email,
            crediantilas.password
        ).then(()=>{
            dispatch({
                type: LOGIN_SUCCESS
            })
        }).catch((error)=>{
            dispatch({
                type: LOGIN_ERROR,
                payload: error
            })
        })
    }
}

export const signOut =() =>{
    return ( dispatch, getState, { getFirebase})=>{
        const firebase = getFirebase();

        firebase.auth().signOut().then(()=>{
            dispatch({
                type: SIGNOUT_SUCCESS
            })
        }).catch((error)=>{
            dispatch({
                type: SIGNOUT_ERROR,
                payload: error
            })
        })
    }
}

export const signUp = (newUser) =>{
    return ( dispatch, getState, { getFirebase, getFirestore} )=>{
        const firebase = getFirebase();
        const firestore = getFirestore();
        console.log("new user is", newUser)
        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then( (resp)=>{
            console.log("response i got: ", resp)
            return firestore.collection("users").doc(resp.user.uid).set({
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                initials: newUser.firstName[0] + newUser.lastName[0]
            })
        }).then(()=>{
            dispatch({
                type: SIGNUP_SUCCESS
            })
        }).catch((error)=>{
            dispatch({
                type: SIGNUP_ERROR,
                payload: error
            })
        })
    }
}