import React, { useState, useEffect, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Know from "../components/Know";
import getManyPlaceHolders from "../components/placeholders/KnowPlaceHolder";
import api from "../auth/Api";


export const KnowsContext = createContext();

const KnowsPage = ({ showCompleted, userId, showAll }) => {
    const [knows, setKnows] = useState([]);
    const [knowsIsLoading, setIsLoading] = useState(true); // Add loading state
    const navigate = useNavigate();

    console.log(userId);
    const getData = async () => {
        try {
            const urlTo = showAll ? '/knows/all' : userId ? `/knows/${userId}` : '/knows';
            const response = await api.get(urlTo);
            setKnows(response.data);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                localStorage.clear();
                navigate("/auth/login");
            } else {
                console.error("Error fetching user data:", error);
            }
        } finally {
            setIsLoading(false); // Handle errors and stop loading
        }
    }

    // Fetch data when the component mounts
    useEffect(() => {
        getData();
    }, [userId]);

    return (
        showCompleted ? 
        <KnowsContext.Provider value={{ knows, getData, knowsIsLoading }}>
            <ShowKnows showCompleted={showCompleted} />
        </KnowsContext.Provider>       
        :
        <KnowsContext.Provider value={{ knows, getData, knowsIsLoading }}>
            <Knows showAll={showAll} />
        </KnowsContext.Provider>
    );
};

const Knows = ({ showAll }) => {
    const navigate = useNavigate();
    const { knows, getData, knowsIsLoading } = useContext(KnowsContext);
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
            await getData();
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
        <div className="container mt-5">
            { !showAll && <div className="row justify-content-center mb-5">
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
            </div>}

            <ShowKnows knows={knows} isLoading={knowsIsLoading} />
        </div>
    );
};


const ShowKnows = () => {
    const { knows, knowsIsLoading } = useContext(KnowsContext);

    return (
        <div>
            {knowsIsLoading ? (
                <div className="row mt-4 mb-5 justify-content-center">
                    {getManyPlaceHolders()}
                </div>
            ) : knows.length > 0 ? (
                <div className="row mt-4 mb-5 justify-content-center">
                    {
                        knows && knows.slice().reverse().map((know) => (
                            <Know key={know.id} know={know} />
                        ))
                    }
                </div>
            ) : (
                <div className="text-center">
                    <h3>No data</h3>
                </div>
            )}
        </div>
    )
}

export default KnowsPage;
