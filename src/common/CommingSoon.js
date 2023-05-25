import React from 'react'

const CommingSoon = () => {
    return (
       <>
         <div className="home-btn d-none d-sm-block">
                        <a href="index.html" className="text-white"><i className="fas fa-home h2"></i></a>
                    </div>
                    <div className="my-5 pt-sm-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="text-center">
                                        <a href="index.html" className="d-block auth-logo">
                                            <img src="file:///C:/Users/91745/Downloads/layouts/layouts/pages-comingsoon.html" alt="" height="20" className="auth-logo-dark mx-auto" />
                                            <img src="assets/images/logo-light.png" alt="" height="20" className="auth-logo-light mx-auto" />
                                        </a>
                                        <div className="row justify-content-center mt-5">
                                            <div className="col-sm-4">
                                                <div className="maintenance-img">
                                                    <img src="assets/images/coming-soon.svg" alt="" className="img-fluid mx-auto d-block" />
                                                </div>
                                            </div>
                                        </div>
                                        <h4 className="mt-5">Let's get started with Skote</h4>
                                        <p className="text-muted">It will be as simple as Occidental in fact it will be Occidental.</p>

                                        <div className="row justify-content-center mt-5">
                                            <div className="col-md-8">
                                                <div data-countdown="2021/12/31" className="counter-number"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
       </>
    )
}

export default CommingSoon