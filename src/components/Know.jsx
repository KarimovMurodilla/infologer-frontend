import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegComment } from "react-icons/fa";
import { FaLightbulb, FaRegLightbulb } from "react-icons/fa6";
import { IoMdMore } from "react-icons/io";
import ReactMarkdown from 'react-markdown';

import getMe from "../auth/GetMe";
import api from "../auth/Api";
import { KnowsContext } from "../pages/Knows";
import LoadingButton from "./Button";


const Know = ({ know, inPrivate }) => {
    const me = getMe();
    const count = know.likes.length;
    const myId = me ? me.id : null;
    const status = know.likes.filter(like => like.user_id === myId).length === 1;

    const [localLikeCount, setLikeCount] = useState(count);
    const [localStatus, setStatus] = useState(status);
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { getData } = useContext(KnowsContext);

    console.log(inPrivate);
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

    const handleFeedback = async () => {
        setLoading(true);
        try {
            const headers = {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            }
            await api.get(`/feedback/${know.id}`,
                { headers }
            )
            await getData(true);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                localStorage.clear();
                navigate("/auth/login");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="col-md-8">
            <div className="card border-secondary mb-3">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h5>{know.title}</h5>
                    {inPrivate && (
                        <div className="dropdown">
                            <button className="btn dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                                <IoMdMore className="fs-4" />
                            </button>
                            <ul className="dropdown-menu dropdown-menu-dark">
                                <li>
                                    <button
                                        className="dropdown-item"
                                        onClick={handleFeedback}
                                    >
                                        AI Feedback
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="dropdown-item"
                                        onClick={null}
                                    >
                                        Edit
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="dropdown-item text-danger"
                                        onClick={null}
                                    >
                                        Delete
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
                <div className="card-body">
                    <blockquote className="blockquote mb-0">
                        <p className="pre-line">{know.description}</p>
                        <footer className="blockquote-footer fs-6">
                            <Link to={`/${know.user.username}`}>{know.user.first_name}</Link>
                            <cite title="Source Title" className="ms-2">{makeDatePretty({ originalDateTimeString: know.created_at })}</cite>
                        </footer>
                    </blockquote>

                    <LoadingButton isLoading={isLoading} name="" />
                    {know.feedback &&
                        (<blockquote className="blockquote mt-3">
                            <span className="badge bg-primary text-wrap">AI Feedback</span>
                            <code className="d-block">
                                <ReactMarkdown>
                                    {know.feedback.description}
                                </ReactMarkdown>
                            </code>
                        </blockquote>)
                    }
                </div>
                <div className="card-footer text-muted">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="comment-button">
                            {/* <button className="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                                <FaRegComment className="fs-3" />
                            </button>
                            <span>0</span> */}
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
