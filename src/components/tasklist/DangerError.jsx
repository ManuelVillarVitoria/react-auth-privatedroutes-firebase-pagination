import React from 'react'

const DangerError = ({dangerMessage}) => {

    return (

        <div className="alert alert-danger">{dangerMessage}</div>
    )
}

export default DangerError
