import React, { useState, useEffect } from 'react';
import api from '../auth/Api';

const YourComponent = () => {
    return (
        <div>
            {/* Mobile View */}
            <div className="d-lg-none">
                <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom">Toggle bottom offcanvas</button>

                <div className="offcanvas offcanvas-bottom" tabindex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasBottomLabel">Offcanvas bottom</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                    TextTextTextTextTextTextTextTextText

                    <br />
                    <br />

                    <br />

                    TextTextTextText
                    TextTextText


                    <br />
                    <br />

                    TextTextText
                    </div>
                </div>
            </div>

            {/* Desktop View */}
            <div className="d-none d-lg-block">
            </div>
        </div>
    );
};

export default YourComponent;