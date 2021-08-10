import React from 'react'
import moment from 'moment'
const Notification=({notifications})=> {
    return (
        <div className="section">
            <div className="card z-depth-0">
                <div className="card-content">
                    <span className="card-title">Notifications</span>
                    <ul className="notifications">
                        { notifications && notifications.map(notice=>{
                            return (
                                <li key={notice.id}>
                                    <span className="pink-text"> {notice.user}:  </span>
                                    <span>{notice.content}</span>
                                    <div className="grey-text note-date">
                                        {moment(notice.time.toDate()).fromNow()}
                                    </div>
                                </li>
                            )
                          })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Notification
