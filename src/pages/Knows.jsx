import React, { useState, useEffect } from "react";
import Know from "../components/Know";
import getManyPlaceHolders from "../components/KnowPlaceHolder";
import api from "../auth/Api";


const Knows = ({ showAll }) => {
    const [knows, setKnows] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Add loading state
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    useEffect(() => {
        const baseUrl = showAll ? "/knows/all" : "/knows";

        api.get(baseUrl)
            .then((res) => {
                setKnows(res.data);
                setIsLoading(false); // Set loading to false after data is fetched
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
                setIsLoading(false); // Handle errors and stop loading
            });
    }, [showAll]);


    const handlePost = () => {
        const ids = knows.map(item => item.id);
        const maxId = Math.max(...ids);
        const postId = maxId + 1;
        setKnows([...knows, { postId, title, description }]);

        console.log(knows);
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center mb-5">
                <div className="col-md-8">
                    <h2 className="text-center mb-4">What do you learn today?</h2>
                    <form>
                        <div className="card">
                            <div className="card-header">
                                <div className="input-container fs-5">
                                    <input 
                                        type="text" 
                                        id="transparentInput" 
                                        placeholder="Title"
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="card-body">
                                <blockquote className="blockquote mb-0">
                                    <textarea 
                                        id="transparentTextArea" 
                                        placeholder="Describe your experience..."
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </blockquote>
                            </div>
                        </div>

                        <div className="d-grid gap-2">
                            <button className="btn btn-success" type="button" onClick={handlePost}>
                                Post
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {isLoading ? (
                <div className="row mt-4 mb-5 justify-content-center">
                    {getManyPlaceHolders()}
                </div>
            ) : knows.length > 0 ? (
                <div className="row mt-4 mb-5 justify-content-center">
                    <h3 className="text-center">Your posts</h3>
                    {
                        knows && knows.reverse().map((know) => (
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
    );
};

export default Knows;
