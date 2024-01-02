const LoadingSpinner = (bg_color=null) => {
    return (
        <div className="lds-ellipsis">
            <div className={bg_color}></div>
            <div className={bg_color}></div>
            <div className={bg_color}></div>
            <div className={bg_color}></div>
        </div>
    )
}


export default LoadingSpinner;