import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setTermsAndCondition, setToken, setUserName, setUserRole } from "../helper/token.helper";
import Toast from "../common/Toast";
import { login, terms_Condition } from "../services/services";
import { Button, Modal } from "react-bootstrap";
const Login = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [acceptTerms, setTerms] = useState(false)
    const [preview, setpreview] = useState(false);
    const [credentials, setCredentials] = useState({
        username: null,
        password: null
    });
    const [token , setUserToken] = useState(null)
    const navigate = useNavigate();
    const handleSubmit = () => {
        if (!credentials.username) {
            Toast(true, 'please enter username')
        } else if (!credentials.password) {
            Toast(true, 'Please enter password');
        } else if (credentials.username && credentials.password) {
            login(credentials).then((res) => {
                if (res) {
                    setUserRole(res?.data?.results?.UserRoles[0]?.Role?.name);
                    setUserName(res?.data?.results?.username.toUpperCase())
                    setToken(res?.data?.results?.token);
                    setUserToken(res?.data?.results?.token)
                    if (res?.data?.results?.terms_n_conditions == true) {
                        setTermsAndCondition(res?.data?.results?.terms_n_conditions)
                        Toast(false, res?.data?.message);
                        navigate('/dashboard');
                    } else {
                        handleShow()
                    }
                }
            }).catch((err) => {
                console.log(err);
                Toast(true, err.response.data.message);
            })
        }
    }

    const handleAcceptTerms = () => {
        if (acceptTerms) {
            terms_Condition(
                token,
                {
                    "terms_n_conditions": acceptTerms
                }
            ).then((res) => {
                if (res)
                    if (res) {
                        Toast(false, 'Logged in Successfully')
                        setTerms(false)
                        navigate('/dashboard')
                    }
            }).catch((err) => {
                console.log(err);
            })
        } else {
            Toast(true, "Please Accept terms to access dashboard")
        }
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
                                            <h5 className="text-primary">Welcome Back !</h5>
                                            <p className="text-muted">Sign in to continue to Zashed.</p>
                                        </div>

                                        <div className="mt-4">
                                            <form >

                                                <div className="mb-3">
                                                    <label for="username" className="form-label">Username</label>
                                                    <input type="text" className="form-control" id="username" placeholder="Enter username" value={credentials?.username} onChange={(event) => setCredentials((prev) => ({ ...prev, username: event.target.value }))} />
                                                </div>

                                                <div className="mb-3">
                                                    <div className="float-end">
                                                        <Link className="text-muted" to="/forgotpassword" >Forgot password?</Link>
                                                    </div>
                                                    <label className="form-label">Password</label>
                                                    <div className="input-group auth-pass-inputgroup">
                                                        <input type={preview ? "text" : "password"} className="form-control" placeholder="Enter password" aria-label="Password" value={credentials?.password} onChange={(event) => setCredentials((prev) => ({ ...prev, password: event.target.value }))} aria-describedby="password-addon" />
                                                        <button className="btn btn-light " type="button" id="password-addon" onClick={() => setpreview(!preview)}><i className="mdi mdi-eye-outline"></i></button>
                                                    </div>
                                                </div>

                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" id="remember-check" />
                                                    <label className="form-check-label" for="remember-check">
                                                        Remember me
                                                    </label>
                                                </div>

                                                <div className="mt-3 d-grid">
                                                    <button className="btn btn-primary waves-effect waves-light" type="button" onClick={handleSubmit}>Log In</button>
                                                </div>




                                            </form>

                                        </div>
                                    </div>


                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* terma and condition  */}
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Terms & Conditions</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        These terms and conditions govern your use of the Seller Dashboard, which is owned and operated by Zashed Fashiontech Pvt. Ltd. By accessing or using the Seller Dashboard, you agree to be bound by these Terms.
                        Use of the Dashboard: The User is authorized to use the Dashboard to view sales data and other related information for the purpose of conducting business with the owner of the Dashboard. You may not use the Seller Dashboard to engage in any activity that is illegal, fraudulent, or in violation of our policies.
                        Confidentiality and security: The User acknowledges and agrees that all information displayed on the Dashboard is confidential and proprietary to the owner. The User agrees to maintain the confidentiality of the information displayed on the Dashboard and not to disclose it to any third party. You are responsible for maintaining the security of your account and any actions taken through your account.
                        Intellectual Property: The User acknowledges that the Dashboard and all related materials, including but not limited to software, data, and trademarks, are the property of the owner of the Dashboard and are protected by intellectual property laws. The User may not modify, reproduce, distribute, or create derivative works based on the Dashboard without the owner's prior written consent.
                        Limitation of Liability: The User acknowledges and agrees that the owner of the Dashboard shall not be liable for any direct, indirect, incidental, special, consequential, or exemplary damages, including but not limited to damages for loss of profits, goodwill, use, data, or other intangible losses resulting from the use or inability to use the Dashboard.
                        Termination: The owner of the Dashboard reserves the right to terminate the User's access to the Dashboard at any time and for any reason, without notice.
                        Governing Law: This Agreement shall be governed by and construed in accordance with the laws of the jurisdiction in which the owner of the Dashboard is located, without giving effect to any principles of conflicts of law.
                        By using the Dashboard, the User acknowledges and agrees to all of the terms and conditions set forth in this Agreement. If the User does not agree to these terms and conditions, the User should not use the Dashboard.
                    </p>
                    <div className="row">
                        <div className="col-1">
                            <input type="checkbox" onChange={(e) => setTerms(e.target.checked)} />
                        </div>
                        <div className="col-11">
                            <p>I agree to all the Terms & Condition</p>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAcceptTerms}>Save</Button>
                </Modal.Footer>
            </Modal>
        </div>


    )
};
export default Login;


