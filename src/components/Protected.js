import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
const Protected = (props) => {
        const Cmp  = props.component;
        var auth = JSON.parse(localStorage.getItem("is_login"));
        return (
            <div>
                {
                    (auth) ? <Cmp /> : <Redirect to="/signin" />
                }
            </div>
        );
}

export default Protected;