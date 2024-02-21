import React from 'react';
import ToggleButton from '../components/toggleButton';
import './form.css'

const Login = () => {
    return (
        <section className='display'>
            <ToggleButton />
            <form className='display'>
                <label htmlFor="email" className='formLabel'>Email:</label>
                <input type="email" id="email" className='formInput' />

                <label htmlFor="password" className='formLabel'>Password:</label>
                <input type="password" id="password" className='formInput' />

                <button type="submit" className='formButon'>Log In</button>
            </form>
        </section>
    );
};

export default Login;
