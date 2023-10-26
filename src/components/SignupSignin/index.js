import React, { useState } from "react";
import "./styles.css"
import Input from "../Input";
import Button from "../Button";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword , signInWithPopup} from "firebase/auth";
import { auth,db } from "../../firebase";
import {toast} from "react-toastify"
import { useNavigate } from "react-router-dom";
import { doc, setDoc,getDoc } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";

import { provider } from "../../firebase";
function SignupSigninComponent(){

    const[name, setName]=useState("")
    const[email,setEmail]=useState("");
    const[password, setPassword]=useState("");
    const[confirmPassword, setConfirmPassword]=useState("");
    const [loading, setLoading]=useState(false);
    const[loginForm, setLoginForm]=useState("");
    const navigate=useNavigate();
 
    function signupWithEmail(){
        setLoading(true);
        console.log(name)
        console.log(email)
        console.log(password)
        console.log(confirmPassword);

            //Authenticate the user or basically create a new account using email and password
if(name!="" && email!="" && password!="" && confirmPassword!=""){
    if(password==confirmPassword){
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log("user", user);
         toast.success("user Created")
         setLoading(false);
         setName("");
         setEmail("");
         setPassword("");
         setConfirmPassword("");
         createDoc(user);
        navigate("/dashboard");
         //create a document with user id as the following id
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage)
          setLoading(false)
          // ..
        });
    }else{
        toast.error("password and confirm password don't match");
        setLoading(false);
    }
   
  
}else{
    toast.error("All fields are mandatory");
    setLoading(false)
}   
}

function loginUsingEmail(){
    console.log("email", email);
    console.log(password, "password")
setLoading(true)
    if(email!="" && password!=""){
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          toast.success("User Logged In!")
          console.log(user, "yes")
          navigate("/dashboard");
          setLoading(false)
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage)
          setLoading(false)
        });
    }else{
        toast.error("All fields are Mandatory")
        setLoading(false)
    }  
}

async function createDoc(user){
    //Make sure that the doc with uid dosent exit
    //create a doc
    setLoading(true)
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);

    if (!userData.exists()) {
        try{
            await setDoc(doc(db, "users", user.uid), {
                name: user.displayName ? user.displayName : name,
                email:user.email,
                photoURL: user.photoURL ? user.photoURL : "",
                createdAt:new Date(),
            });
            toast.success("Doc Created!")
            setLoading(false)
        }catch(e){
         toast.error(e.message)
         setLoading(false)
        }
    }else{
        toast.error("Doc Already exists!")
        setLoading(false)
    }
}


function googleAuth(){
    setLoading(true);
    try{
        signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          createDoc(user);
          navigate("/Dashboard")
          setLoading(false);
          toast.success("User Authenticated")

          // IdP data available using getAdditionalUserInfo(result)
          // ...
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false);
          // ...
        });
    }catch(e){
        toast.error(e.message)
        setLoading(false);
    }
    
}

return(<>
    {loginForm?
    <div className="signup-wrapper">
        <h2 className="title">Log In <span style={{color:"var(--theme)"}}>Financely</span></h2>
    
        <form>
        
           <Input lable={"Email"}
           type="email"
            state={email}
             setState={setEmail} 
             placeholder={"Jahn@gmail.com"}/>
    
        <Input lable={"Password"}
        type="password"
         state={password}
          setState={setPassword}
           placeholder={"********"}/>
    
    
          <Button 
          disabled={loading}
          text={loading ?"Loading....":"Login Using Email and Password"}
           onClick={loginUsingEmail}/>

          <p style={{textAlign:"center"}}>Or</p>

          <Button text={loading ?"Loading....":"Login Using Google"}   onClick={googleAuth} blue={true}/>
          <p  className="p-login"  onClick={()=>setLoginForm(!loginForm) }style={{textAlign:"center", cursor:"pointer"}}>Or don't have an account? Click Here.</p>
        </form>
    </div>:<div className="signup-wrapper">
        <h2 className="title">Sign Up On <span style={{color:"var(--theme)"}}>Financely</span></h2>
    
        <form>
           <Input lable={"Full Name"} 
           state={name}
           setState={setName}
            placeholder={"Jahn Deo"}/>
    
           <Input lable={"Email"}
           type="email"
            state={email}
             setState={setEmail} 
             placeholder={"Jahn@gmail.com"}/>
    
        <Input lable={"Password"}
        type="password"
         state={password}
          setState={setPassword}
           placeholder={"********"}/>
    
        <Input lable={"Confirm Password"}
       type="password"
         state={confirmPassword}
          setState={setConfirmPassword} 
          placeholder={"********"}/>
    
          <Button 
          disabled={loading}
          text={loading ?"Loading....":"Signup Using Email and Password"}
           onClick={signupWithEmail}/>

          <p  style={{textAlign:"center"}}>Or</p>
          <Button text={loading ?"Loading....":"Signup Using Google"}  onClick={googleAuth} blue={true}/>
          <p className="p-login" onClick={()=>setLoginForm(!loginForm)} style={{textAlign:"center",cursor:"pointer"}}>Or have an account Already? Click Here</p>
        </form>
    </div>
    }
    
    </>
    )

}

export default SignupSigninComponent;