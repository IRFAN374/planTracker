import React from 'react';
import { Link } from "react-router-dom"
import SignedInLink from './SignedInLink';
import SignedOutLink from './SignedOutLink';
import { connect } from 'react-redux'


const Navbar=(props)=> {
   //console.log(props.auth)
    const { auth,profile } = props;
    const links  = !auth.uid ? <SignedOutLink /> : <SignedInLink profile={profile} />
    return (
        <nav className="nav-wrapper grey darken-3">
            <div className="container">
                <Link to="/" className="brand-logo">planTracker</Link>
                { links }
            </div>
        </nav>
    )
}

const mapStateToProps = (state)=>{
    console.log("State is: ",state)
    return {
        auth : state.firebase.auth,
        profile: state.firebase.profile
    }
}
export default connect(mapStateToProps)(Navbar)
