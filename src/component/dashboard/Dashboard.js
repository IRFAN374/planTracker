import React, { Component } from 'react'
import Notification from './Notification'
import ProjectList from '../projects/ProjectList'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

class Dashboard extends Component {
    render() {
        // console.log("projectlist ",this.props)
        const {projects,auth,notifications}= this.props;
        // console.log("project list",projects)
        if(!auth.uid){
           return <Redirect to="/signin" />
        }
        return (
           <div className="dashboard container">
             <div className="row">
                 <div className="col s12 m6">
                     <ProjectList projects={projects} />
                 </div>
                 <div className="col s12 m5 offset-m1">
                     <Notification notifications={notifications}/>
                 </div>
             </div>
           </div>
        )
    }
}

const mapStateToProps = (state) =>{
    console.log("firebase state: ",state)
    return {
        // projects: state.project.projects,
        projects: state.firestore.ordered.project,
        auth: state.firebase.auth,
        notifications: state.firestore.ordered.notifications
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'project', orderBy:['createdAt', 'desc'] },
        { collection: 'notifications', limit: 5, orderBy:['time',"desc"]}
    ])
)(Dashboard)

