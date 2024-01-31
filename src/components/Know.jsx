import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegComment } from "react-icons/fa";
import { FaLightbulb, FaRegLightbulb } from "react-icons/fa6";

import getMe from "../auth/GetMe";
import api from "../auth/Api";

const Know = ({ know }) => {
    const me = getMe();
    const count = know.likes.length;
    const myId = me && me.id;
    const status = know.likes.filter(like => like.user_id === myId).length === 1; 
    console.log(know.likes);
    console.log(me.id);
    console.log(status);

    const [localLikeCount, setLikeCount] = useState(count);
    const [localStatus, setStatus] = useState(status)
    const navigate = useNavigate();

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

    const handleClick = async () => {
        try {
            const headers = {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            }
            const data = {
                "know_id": know.id
            }
            await api.post(`/likes`,
                data,
                { headers }
            )
            if (localStatus && localLikeCount !== 0) {
                setLikeCount((prevCount) => prevCount - 1)
                setStatus(false);
            } else {
                setLikeCount((prevCount) => prevCount + 1)
                setStatus(true);
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                localStorage.clear();
                navigate("/auth/login");
            }
        }
    }

    return (
        <div className="col-md-8">
            <div className="card border-secondary mb-3">
                <div className="card-header">
                    <h5>{know.title}</h5>
                </div>
                <div className="card-body">
                    <blockquote className="blockquote mb-0">
                        <p className="pre-line">{know.description}</p>
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
                            <div className="like-button" onClick={handleClick}>
                                {
                                    localStatus
                                        ? <FaLightbulb className="fs-3 lightbulb" style={{ color: "orange" }} />
                                        : <FaRegLightbulb className="fs-3" />
                                }
                                <span className="like-count">{localLikeCount}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Know;
