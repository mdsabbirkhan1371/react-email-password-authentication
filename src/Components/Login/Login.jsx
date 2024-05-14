import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../Firebase/firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";


const Login = () => {

    const [error,setError]=useState('')
    const [success,setSuccess]=useState('')

    

    const handleLogin =(e)=>{

        e.preventDefault()
        const email =e.target.email.value;
        const password =e.target.password.value;

        console.log(email,password)

        // reset error 
        setError('')
        setSuccess('')

        // sign in method
        signInWithEmailAndPassword(auth,email,password)
        .then(res=>{
            const user =res.user;
            console.log(user)
            if(user.emailVerified){
                setSuccess("User Login Successfully",user)
            }
            else{
                al
            }
        })
        .catch(error=>{
            setError(error.message)
        }) 
    }

    

     // reset password method 
     const emailRef = useRef()

     const handleResetPassword=()=>{
        const email =emailRef.current.value;

        if(!email){
            setError('Please Enter Your Email')
            return;
        }
        else if(!/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/.test(email)){
            setError('Please Write a Valid Email Address')
        }
        


        // password reset 
        sendPasswordResetEmail(auth,email)
        .then(res=>{
            alert('Password reset email sent!')
        })
        .catch(error=>{
            console.error(error)
        })
    }

    return (
        <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
                <h1 className="text-5xl font-bold">Login now!</h1>
                <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi.</p>
            </div>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">

                <form onSubmit={handleLogin} className="card-body">
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input ref={emailRef}  type="email" name="email" placeholder="Email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" placeholder="Password" name="password" className="input input-bordered" required />
                    <label className="label">
                        <a href="#" onClick={handleResetPassword} className="label-text-alt link link-hover">Forgot password?</a>
                        <br />
                    </label>
                    <label className="label">
                    <p className="label-text-alt link link-hover text-success text-xl">New Here..?<Link to="/register">Create an account</Link></p>
                    </label>
                    
                    </div>

                {/* error message  */}

                    {
                    error&&<p className="text-red-700">{error}</p>
                    }

                    {/* success message  */}

                    {
                        success && <p className="text-success">{success}</p>
                    }


                    <div className="form-control mt-6">
                    <button className="btn btn-primary">Login</button>
                    </div>
                </form>
                
            </div>
        </div>
</div>
    );
};

export default Login;