import React, { useState, useEffect, createContext, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Know from "../components/Know";
import getManyPlaceHolders from "../components/placeholders/KnowPlaceHolder";
import api from "../auth/Api";


export const KnowsContext = createContext();

const KnowsPage = () => {
    const [knows, setKnows] = useState([]);
    const [knowsIsLoading, setIsLoading] = useState(true);
    const [isScrollLoading, setOnScrollLoading] = useState(true);
    const [page, setPage] = useState(0);
    const location = useLocation();
    const navigate = useNavigate();

    const getData = async (refresh) => {
        try {
            if (refresh) {
                const urlTo = `/knows?page=0`;
                const response = await api.get(urlTo);
                setKnows(response.data);
                setPage(5);
            } else {
                const urlTo = `/knows?page=${page}`;
                const response = await api.get(urlTo);
                setKnows((prevData) => [...prevData, ...response.data]);
                setPage(prevPage => prevPage + 5);
            }

        } catch (error) {
            if (error.response && error.response.status === 401) {
                localStorage.clear();
                navigate("/auth/login");
            } else {
                console.error("Error fetching user data:", error);
            }
        } finally {
            setIsLoading(false);
            setOnScrollLoading(false);
        }
    }

    useEffect(() => {
        if (isScrollLoading) {
            getData();
        }
    }, [isScrollLoading]);

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return function () {
            document.removeEventListener('scroll', scrollHandler)
        };
    }, []);

    const scrollHandler = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
            setOnScrollLoading(true);
        }
    }

    return (
        <KnowsContext.Provider value={{ knows, getData, knowsIsLoading, isScrollLoading, location }}>
            <Knows />
        </KnowsContext.Provider>
    );
};

const Knows = () => {
    const navigate = useNavigate();
    const { knows, getData, knowsIsLoading, isScrollLoading, location } = useContext(KnowsContext);
    const [btnLoading, setBtnLoading] = useState(false);
    const [knowData, setKnowData] = useState({
        title: "",
        description: ""
    })

    const handlePost = async () => {
        try {
            const headers = {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            }
            const resp = await api.post('/knows',
                knowData,
                { headers }
            )
            setKnowData({
                title: "",
                description: ""
            });
            await getData(true);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                localStorage.clear();
                navigate("/auth/login");
            }
        } finally {
            setBtnLoading(false);
        }
    }

    return (
        <div className={location.pathname === '/knows' ? "container" : ""}>
            {location.pathname === '/knows' &&
                <div className="row justify-content-center mb-4">
                    <div className="col-md-8">
                        <h2 className="text-center mb-4">What did you learn today?</h2>
                        <form>
                            <div className="card">
                                <div className="card-header">
                                    <div className="input-container fs-5">
                                        <input
                                            type="text"
                                            id="transparentInput"
                                            placeholder="Title"
                                            value={knowData.title}
                                            onChange={(e) => setKnowData({ ...knowData, ['title']: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="card-body">
                                    <blockquote className="blockquote mb-0">
                                        <textarea
                                            className="transparentTextArea"
                                            placeholder="Describe your experience..."
                                            value={knowData.description}
                                            onChange={(e) => setKnowData({ ...knowData, ['description']: e.target.value })}
                                        />
                                    </blockquote>
                                </div>
                            </div>

                            <div className="d-grid gap-2">
                                <button
                                    className="btn btn-success"
                                    type="button"
                                    onClick={handlePost}
                                    disabled={!knowData.title || !knowData.description}
                                >
                                    Post
                                </button>
                            </div>
                        </form>
                    </div>
                    <hr className="mt-4 mb-3" />
                </div>
            }

            <ShowKnows knows={knows} knowsIsLoading={knowsIsLoading} />
            {
                isScrollLoading &&
                (<div className="row mt-4 mb-5 justify-content-center">
                    {getManyPlaceHolders(1)}
                </div>)
            }
        </div>
    );
};


export const ShowKnows = ({ knows, knowsIsLoading }) => {
    return (
        <div>
            {knowsIsLoading ? (
                <div className="row mt-4 mb-5 justify-content-center">
                    {getManyPlaceHolders(5)}
                </div>
            ) : knows.length > 0 ? (
                <div className="row mt-4 mb-5 justify-content-center">
                    {
                        knows && knows.slice().map((know) => (
                            <Know key={know.id} know={know} />
                        ))
                    }
                </div>
            ) : (
                <div className="text-center">
                    <p>No data</p>
                </div>
            )}
        </div>
    )
}

export default KnowsPage;
