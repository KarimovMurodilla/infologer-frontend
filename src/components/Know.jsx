import React from "react";
import { Link } from "react-router-dom";
import { FaRegComment } from "react-icons/fa";
import { MdLightbulbOutline } from "react-icons/md";

const Know = ({ know }) => {
    const makeDatePretty = ({ originalDateTimeString }) => {
        const options = { 
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: false
        };

        const utcDatetime = new Date(`${originalDateTimeString}Z`);
        const formatter = new Intl.DateTimeFormat('en-US', options);
        const localTime = formatter.format(utcDatetime);

        return localTime;
      }

    return (
        <div className="col-md-8">
            <div className="card border-secondary mb-3">
                <div className="card-header">
                    <h5>{know.title}</h5>
                </div>
                <div className="card-body">
                    <blockquote className="blockquote mb-0">
                        <p style={{whiteSpace: "pre-line"}}>{know.description}</p>
                        <footer className="blockquote-footer fs-6">
                            <Link to={`/${know.user.username}`}>{know.user.first_name}</Link>
                            <cite title="Source Title" className="ms-2">{makeDatePretty({ originalDateTimeString: know.created_at })}</cite>
                        </footer>
                    </blockquote>
                </div>
                <div className="card-footer text-muted">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="like-button">
                            <FaRegComment className="fs-3" />
                            <span>0</span>
                        </div>
                        <div>
                            <div className="like-button">
                                <MdLightbulbOutline className="fs-3" />
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
