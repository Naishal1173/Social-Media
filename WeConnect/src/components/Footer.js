import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear(); // Get the current year

    return (
        <footer className="iq-footer">
            <div className="container-fluid">
                <div className="row">
                    {/* <div className="col-lg-6">
                        <ul className="list-inline mb-0">
                            <li className="list-inline-item">
                                <a href="https://templates.iqonic.design/socialv-dist/dashboard/privacy-policy.html">Privacy Policy</a>
                            </li>
                            <li className="list-inline-item ms-3 ms-md-5">
                                <a href="https://templates.iqonic.design/socialv-dist/dashboard/terms-of-service.html">Terms of Use</a>
                            </li>
                        </ul>
                    </div> */}
                   <center> <div className="col-lg-6 d-flex justify-content-end">
                        Copyright {currentYear} 
                        <a href="index.html" className="mx-1">SocialV</a>
                        All Rights Reserved.
                    </div></center>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
