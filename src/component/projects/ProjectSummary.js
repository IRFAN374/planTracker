import React from 'react'
import moment from "moment"
const ProjectSummary=({project})=> {
    return (
        <div className="card z-depth-0 project-summary">
            <div className="card-content grey-text text-darken-3">
                <span className="card-title"> {project.title} </span>
                <p>Posted By: <b> {project.authorFirstName} {project.authorLastName} </b></p>
                <p className="grey-text"> {moment(project.createdAt.toDate()).calendar()} </p>
                <div>
                    <p>{project.content}</p>
                </div>
            </div>
        </div>
    )
}

export default ProjectSummary
