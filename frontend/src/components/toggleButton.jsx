import React, { useState } from 'react';
import './toggleButton.css';

const ToggleButton = () => {
    const [isLogin, setIsLogin] = useState(false);
    // Create 2 buttons:
    // one is log in and the other signup
    // if you click on the login button set login to true
    // else if you you clik on the other button the login will be set to false
    // The handle submit function will render a different method according to how 
    const logInHandleClick = () => {
        setIsLogin(true);
        window.location.href = '/login';
        console.log(`log in: ${isLogin}`);
    };

    const signUpHandleClick = () => {
        setIsLogin(!isLogin);
        window.location.href = '/signup';
        console.log(`log in: ${isLogin}`);
    };

    return (
        <section>
            <article onClick={logInHandleClick}>
                log in
            </article>
            <article onClick={signUpHandleClick}>
                sign up
            </article>
        </section>
    );
};

export default ToggleButton;
