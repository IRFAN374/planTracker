import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'

const ProjectDetails=(props)=> {
//    console.log(props);
    // const projectId = props.match.params.id;
    const { project,auth } = props;
    // console.log(project)
    if(!auth.uid){
        return <Redirect to="/signin" />
     }
    if(project){

        return (
            <div className="container section project-details">
                <div className="card z-depth-0">
                    <div className="card-content">
                        <span className="card-title">Project Title : {project.title}</span>
                        <p>{project.content}</p>
                    </div>
                    <div className="card-action grey lighten-4 grey-text">
                        <div>Posted By: {project.authorFirstName} {project.authorLastName} </div>
                        <div> {moment(project.createdAt.toDate()).calendar()} </div>
                    </div>
                </div>
            </div>
        )
    }else{
        return (
            <div className="container center">
                <p> Loading Project...</p>
            </div>
        )
    }
}

const mapStateToProps = (state,ownProps)=>{
    //console.log("state is: ",state)
    const id = ownProps.match.params.id;
    const projects = state.firestore.data.project
    const project = projects ? projects[id]: null
    return{
        project: project,
        auth: state.firebase.auth
    }
}
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'project'}
    ])    
)(ProjectDetails)
