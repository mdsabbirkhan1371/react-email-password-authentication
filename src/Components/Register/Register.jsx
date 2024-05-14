import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../Firebase/firebase.config";
import { useState } from "react";
import { IoMdEyeOff } from "react-icons/io";

import { MdRemoveRedEye } from "react-icons/md";
import { Link } from "react-router-dom";




const Register = () => {

    const [resgisterError,setRegisterError]=useState('')
    const [success,setSuccess]=useState('')

    const [showPass,setShowPass]=useState(false)
    

    const handleFormSubmit = (e)=>{
        e.preventDefault()
        const email =e.target.email.value;
        const password =e.target.password.value;
        const acceptedTerms = e.target.checkbox.checked;
        const name =e.target.name.value;

        // reset error 
        setRegisterError('')
        setSuccess('')

        if(password.length<6){
            setRegisterError('Password Must be 6 Digits')
            return;
        }
        else if(!/[A-Z]/.test(password)){
            setRegisterError('Password Should Have One character Uppercase')
            return;
        }
        else if(!acceptedTerms){
            setRegisterError('Accepts Our Terms and Condition')
            return;
        }

        // create user 
        createUserWithEmailAndPassword(auth,email,password)
        .then(result=>{
            const user =result.user;
            console.log(user)
            setSuccess("User Created SuccessFully")

            // update profile 
            updateProfile(user,{
                displayName:name,photoURL: "https://example.com/jane-q-user/profile.jpg"
            })
            .then(()=>{
                console.log('Profile Update')
            })
            .catch(error=>{
                console.error(error)
            })


            // Send a user a verification email 
            sendEmailVerification(user)
            .then(()=>{
                alert('Verify Your Email')
            })
            .catch(error=>{
                console.error(error)
            })

        })
        .catch(error=>{
            console.error(error)

            setRegisterError(error.message)
        })

    }
    return (
        <div>
            
            <div className="md:w-1/2 mx-auto">
            <h4 className="text-3xl mt-5">Please Register</h4>
            <form onSubmit={handleFormSubmit}>
                <input className="w-2/3 mx-2 my-2 p-2" type="text" placeholder="Name" required name="name"  />
                <input className="w-2/3 mx-2 my-2 p-2" type="email" placeholder="Email" required name="email" id="" />
                <br />
                <div className="flex items-center relative">
                <input className="w-2/3 mx-2  p-2" type={showPass ? "text" : "password"} placeholder="Password" required name="password"  />
                
                <span className="absolute left-36 md:left-96" onClick={()=>setShowPass(!showPass)}>{showPass ? <IoMdEyeOff/> :<MdRemoveRedEye/>}</span>
                </div>
                <br />

                <div className="mb-3 ms-2">
                    <input type="checkbox" name="checkbox"  />
                    <label className="ml-2">Accept Our Terms And Condition</label>
                </div>
                <label className="label">
                    <p className="label-text-alt link link-hover text-xl text-success">Already Have An Account..?<Link to="/login">Login Here</Link></p>
                    </label>
                

                <input className="w-1/3 text-black mx-2  p-2 bg-secondary" type="submit" value="Submit" />
            </form>
            {
                resgisterError&& <p className="text-red-700">{resgisterError}</p>
            }
            {
                success&& <p className="text-green-700">{success}</p>
            }
            </div>
        </div>
    );
};

export default Register;