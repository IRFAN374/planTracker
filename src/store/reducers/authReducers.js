import { 
   LOGIN_SUCCESS,
   LOGIN_ERROR ,
   SIGNOUT_ERROR,
   SIGNOUT_SUCCESS,
   SIGNUP_ERROR,
   SIGNUP_SUCCESS
} from "../constant/constant"

const initialState={
   authError: null
}

const authReducers = (state = initialState,action)=>{
   switch (action.type) {
      case LOGIN_SUCCESS:
         console.log("Login success")
         return {
            ...state,
            authError: null
         }
      case LOGIN_ERROR:
         console.log("Login Error")
         return {
            ...state,
            authError: "Login Failed"
         }
      case SIGNOUT_SUCCESS:
         console.log("user successfully signout");
         return {
            ...state,

         }
      case SIGNOUT_ERROR:
         console.log("Error in SignOUT");
         return {
            ...state,
            
         }
      case SIGNUP_SUCCESS:
         console.log("SignUp success")
         return {
            ...state,
            authError: null
         }
      case SIGNUP_ERROR:
         console.log("Sign up error",action.payload.message)
          return {
             ...state,
             authError: action.payload.message
          }      
      default:
         return state
   }
}
export default authReducers