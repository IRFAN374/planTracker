import {
    CREATE_PROJECT,
    CREATE_PROJECT_ERROR
} from '../constant/constant'

export const createProject =(project)=>{
    return (dispatch, getState,{getFirebase,getFirestore})=>{
        const fireStore = getFirestore();
        const profile = getState().firebase.profile
        const authorId = getState().firebase.auth.uid
        fireStore.collection('project').add({
            ...project,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
            createdAt: new Date()
        }).then( ()=>{
            dispatch({ type: CREATE_PROJECT, payload: project })
        }).catch((error)=>{
            console.log("Error in add create project",error);
            dispatch({ type: CREATE_PROJECT_ERROR, payload: error })
        })
    }
};