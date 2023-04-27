import React from 'react'
import { useState } from 'react';
import { Link  , useNavigate} from 'react-router-dom'
import { validateOTP ,changePassword } from '../services/services';
import Toast from "../common/Toast"


const ForgotPassword = () => {
    const [email, setEmail] = useState();
    const [chnagePasswordData , setChangePasswordData] = useState({
        otp : null,
        newPassword:null,
        confirmPassword:null
    })
    const [changePassScreen, setChangePassScreen] = useState(false);
    const [isLoding, setLoding] = useState(false);
    const navigate = useNavigate()
    const sendOTP = (e) => {
        e.preventDefault();
        setLoding(true)
        validateOTP({
            "email": email
        }).then((res) => {
            if (res) {
                console.log(res);
                Toast(false, "OTP send successfully")
                setChangePassScreen(true);
                setLoding(false);
            }
        }).catch((err) => {
            Toast(true, err.response.data.errors[0].msg)
            setChangePassScreen(false);
            setLoding(false);

        })


    }

    const resetPassword = (e) => {
        console.log("inside ");
        changePassword({ 
            ...chnagePasswordData ,
            email:email
        }).then((res)=>{
            console.log();
            if(res){
            Toast(false , res.data.message)
                navigate("/login")
            }
        }).catch((err)=>{
            console.log(err);
            Toast(true , err.response.data.message)
        })

    }
    return (

        <div>
            <div className="container-fluid p-0">
                <div className="row g-0">
                    <div className="col-xl-9">
                        <div className="auth-full-bg pt-lg-5 p-4">
                            <div className="w-100">
                                <div className="bg-overlay"></div>
                                <div className="d-flex h-100 flex-column">
                                    <div className="p-4 mt-auto">
                                        <div className="row justify-content-center">
                                            <div className="col-lg-7">
                                                <div className="text-center">

                                                    <h4 className="mb-3"><i className="bx bxs-quote-alt-left text-primary h1 align-middle me-3"></i><span className="text-primary">5k</span>+ Satisfied clients</h4>

                                                    <div dir="ltr">
                                                        <div className="owl-carousel owl-theme auth-review-carousel" id="auth-review-carousel">
                                                            <div className="item">
                                                                <div className="py-3">
                                                                    <p className="font-size-16 mb-4">" Fantastic theme with a ton of options. If you just want the HTML to integrate with your project, then this is the package. You can find the files in the 'dist' folder...no need to install git and all the other stuff the documentation talks about. "</p>

                                                                    <div>
                                                                        <h4 className="font-size-16 text-primary">Abs1981</h4>
                                                                        <p className="font-size-14 mb-0">- Skote User</p>
                                                                    </div>
                                                                </div>

                                                            </div>

                                                            <div className="item">
                                                                <div className="py-3">
                                                                    <p className="font-size-16 mb-4">" If Every Vendor on Envato are as supportive as Themesbrand, Development with be a nice experience. You guys are Wonderful. Keep us the good work. "</p>

                                                                    <div>
                                                                        <h4 className="font-size-16 text-primary">nezerious</h4>
                                                                        <p className="font-size-14 mb-0">- Skote User</p>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3">
                        <div className="auth-full-page-content p-md-5 p-4">
                            <div className="w-100">

                                <div className="d-flex flex-column h-100">
                                    <div className="mb-4 mb-md-5">
                                        <a href="index.html" className="d-block auth-logo">
                                            <img src="assets/images/logo-dark.png" alt="" height="18" className="auth-logo-dark" />
                                            <img src="assets/images/logo-light.png" alt="" height="18" className="auth-logo-light" />
                                        </a>
                                    </div>
                                    <div className="my-auto">

                                        <div>
                                            <h5 className="text-primary"> Reset Password</h5>
                                        </div>

                                        <div className="mt-2">
                                            <div className="alert alert-success text-center mb-4" role="alert">
                                                Enter your {changePassScreen ? "OTP" : "Email and instructions will be sent to you!"}
                                            </div>
                                            <form>
                                                {
                                                    changePassScreen && changePassScreen ?
                                                        (
                                                            <>
                                                                <div className="mb-2">
                                                                    <label for="useremail" className="form-label">Enter OTP</label>
                                                                    <input type="number" className="form-control" id="otp" placeholder="Enter OTP" onChange={(e)=>setChangePasswordData((prev)=>({...prev,otp:parseInt(e.target.value)}))} />
                                                                </div>
                                                                <div className="mb-2">
                                                                    <label for="useremail" className="form-label">Password</label>
                                                                    <input type="email" className="form-control" id="password" placeholder="password" onChange={(e)=>setChangePasswordData((prev)=>({...prev,newPassword:e.target.value}))} />
                                                                </div>
                                                                <div className="mb-3">
                                                                    <label for="useremail" className="form-label">Confirm Password</label>
                                                                    <input type="email" className="form-control" id="cnfpass" placeholder="Confirm password" onChange={(e)=>setChangePasswordData((prev)=>({...prev,confirmPassword:e.target.value}))} />
                                                                </div>
                                                            </>
                                                        )

                                                        :
                                                        (
                                                            <div className="mb-3">
                                                                <label for="useremail" className="form-label">Email</label>
                                                                <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} id="useremail" placeholder="Enter email" />
                                                            </div>
                                                        )

                                                }



                                                <div className="text-end">
                                                    {
                                                        changePassScreen && changePassScreen ?
                                                            <button className="btn btn-primary w-md waves-effect waves-light" type="button" onClick={resetPassword}>Reset</button>
                                                            :
                                                            <button className="btn btn-primary w-md waves-effect waves-light " type="button" onClick={sendOTP}>{isLoding ? 'Loading...' : 'Send OTP'}</button>

                                                    }

                                                </div>

                                            </form>
                                            <div className="mt-5 text-center">
                                                <p>Remember It ? < Link to="/login" className="fw-medium text-primary"> Sign In here</Link> </p>
                                            </div>
                                        </div>
                                    </div>


                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ForgotPassword