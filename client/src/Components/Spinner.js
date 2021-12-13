import React from 'react'
import Loader from 'react-loader-spinner'
const Spinner = () => {
    return (
<div className="SpinnerContainer">
        <Loader type="Oval" color="black" height={80} width={80} />
        </div>
    )
}

export default Spinner
