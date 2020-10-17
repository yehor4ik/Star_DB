import React from 'react';
import { Redirect } from 'react-router-dom'

const SecretPage = ({ isLoggedIn }) => {
    if(isLoggedIn) {
        return (
            <div className="jumbotron text-center">
                <h3>This page is full of secrets!!!</h3>
                <p style={{fontSize: '4px' }}>ты лох</p>
            </div> 
        )
    }

    return <Redirect to="/login" />
};

export default SecretPage;