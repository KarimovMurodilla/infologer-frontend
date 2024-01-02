import React, { useState, useEffect } from "react";
import Know from "../components/Know";
import axios from "axios";
import LoadingSpinner from "../components/Loading";

const Knows = () => {
    const [knows, setKnows] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Add loading state

    useEffect(() => {
        const baseUrl = "http://localhost:8000/knows/all";

        axios.get(baseUrl)
            .then((res) => {
                setKnows(res.data);
                setIsLoading(false); // Set loading to false after data is fetched
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
                setIsLoading(false); // Handle errors and stop loading
            });
    }, []);

    return (
        <div className="container mt-5">
            {isLoading ? (
                <div className="text-center"><LoadingSpinner /></div>
            ) : knows.length > 0 ? (
                <div className="row mt-4 mb-5 justify-content-center">
                    {knows.map((know) => (
                        <Know key={know.id} know={know} />
                    ))}
                    <LoadingSpinner />
                </div>
                
            ) : (
                <div>
                    <h3>No data</h3>
                </div>
            )}
        </div>
    );
};

export default Knows;
