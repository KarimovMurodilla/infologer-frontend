import React from 'react';

const KnowPlaceHolder = () => {
    return (
        <div className="col-md-8">
            <div className="card border-secondary mb-3">
                <div className="card-header">
                    <p className="card-text placeholder-glow">
                        <span className="placeholder col-3"></span>
                    </p>
                </div>
                <div className="card-body">
                    <blockquote className="blockquote mb-0">
                        <p className="card-text placeholder-glow">
                            <span className="placeholder col-7"></span>
                            <span className="placeholder col-4"></span>
                            <span className="placeholder col-4"></span>
                            <span className="placeholder col-6"></span>
                            <span className="placeholder col-8"></span>
                        </p>
                    </blockquote>
                </div>
                <div className="card-footer text-muted">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="like-button">
                            <span className="placeholder col-8"></span>
                        </div>
                        <div>
                            <span className="placeholder col-8"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


const getManyPlaceHolders = (count) => {
    const repetitions = count;
    const elements = [];

    // Используем forEach для повторения нужное количество раз
    Array(repetitions).fill().forEach((_, index) => {
        elements.push(<KnowPlaceHolder key={index} />);
    });

    return elements;
}


// export default KnowPlaceHolder;

export default getManyPlaceHolders;