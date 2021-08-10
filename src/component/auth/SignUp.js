import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from "react-redux";
import { signUp } from "../../store/actions/authAction"

class SignUp extends Component {
    state = {
        email:'',
        password:'',
        firstName:'',
        lastName:''
    }

    handleChange = (event)=>{
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleSubmit =(event)=>{
       event.preventDefault();
    //    console.log("user info",this.state)
      this.props.signUp(this.state)
    }
    render() {
        const { auth ,authError} = this.props
        if(auth.uid){
            return <Redirect to="/" />
         }
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Sign Up</h5>
                    <div className="row">
                        <div className="input-field col s6">
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" id="firstName" onChange={this.handleChange} />
                        </div>

                        <div className="input-field col s6">
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" id="lastName" onChange={this.handleChange} />
                        </div>
                    </div>
                    
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={this.handleChange} />
                    </div>

                    <div className="input-field">
                        <input type="password" id="password" onChange={this.handleChange} />
                        <label htmlFor="password">Password</label>
                    </div>

                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0">Sign Up</button>
                        <div className="center red-text">
                            {
                                authError ? <p>{authError}</p> : null
                            }
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        signUp: (newUser)=> dispatch(signUp(newUser))
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (SignUp)
