import React from "react";


const LoadingButton = ({isLoading, name}) => {
    console.log(isLoading);
    return (
        <div>
            {
                isLoading ?
                    <div>
                        <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                    </div> :
                    name
            }            
        </div>
    )
}


export default LoadingButton;