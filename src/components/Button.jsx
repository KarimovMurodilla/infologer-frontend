import React from "react";


const LoadingButton = ({name, is_loading}) => {
    console.log(is_loading);
    return (
        <div>
            {
                is_loading ?
                    <div>
                        <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                    </div> :
                    name
            }            
        </div>
    )
}


export default LoadingButton;