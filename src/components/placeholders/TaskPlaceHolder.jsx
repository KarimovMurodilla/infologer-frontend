import React from 'react';

const TaskPlaceHolder = () => {
    return (
        <div className="col-md-8">
            <div className="card border-secondary mb-3">
                <div className="card-header">
                    <p className="card-text placeholder-glow">
                        <span className="placeholder col-3"></span>
                    </p>
                </div>
                <div className="card-body text-secondary">
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
            </div>
        </div>
    )
}


const getManyPlaceHolders = () => {
    const repetitions = 5;
    const elements = [];

    // Используем forEach для повторения нужное количество раз
    Array(repetitions).fill().forEach((_, index) => {
        elements.push(<TaskPlaceHolder key={index} />);
    });

    return elements;
}


export default getManyPlaceHolders;