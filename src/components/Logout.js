import React, { useState , useEffect} from 'react';
import { Redirect } from 'react-router-dom';

const Logout = () => {
    const [logInStatus, setStatus] = useState({is_login:""})

    useEffect(() => {
        logout();
    });
    const logout = () => {
        localStorage.setItem('is_login', false);
        setStatus({
            ...logInStatus,
            is_login: false
        });
        window.location.reload();
    }
        return (
            <div>
                { 
                (logInStatus.is_login == false) ? <Redirect to="/signin" /> : null
                }
            </div>
        );
}

export default Logout;