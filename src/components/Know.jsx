import React from "react";

const Know = ({ know }) => {
    return (
        <div className="col-md-8">
            <div className="card mb-3">
                <div className="card-header">
                    <h5>{know.title}</h5>
                </div>
                <div className="card-body">
                    <blockquote className="blockquote mb-0">
                        <p>{know.description}</p>
                        <footer className="blockquote-footer fs-6">
                            <a href={know.user_id}>{know.first_name}</a>
                            <cite title="Source Title">at 9pm</cite>
                        </footer>
                    </blockquote>
                </div>
                <div className="card-footer text-muted">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="like-button">
                            <i className="far fa-comment"></i>
                            <span>0</span>
                        </div>
                        <div>
                            <div className="like-button">
                                <i className="far fa-heart heart-icon"></i>
                                <span className="like-count">0</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Know;
