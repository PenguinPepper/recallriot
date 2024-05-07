/* eslint-disable */
import React from 'react';
import './toggleButton.css';

const ToggleButton = () => {
    // Create 2 buttons:
    // one is log in and the other signup
    // if you click on the login button set login to true
    // else if you you clik on the other button the login will be set to false
    // The handle submit function will render a different method according to how 

    return (
        <ul className='list-none p-0 mt-10 mb-0 ml-4 mr-0 after:table after:clear-both flex flex-row justify-center'>
            <li>
                <a href='/login' className='p-2 px-12 bg-white cursor-pointer no-underline text-xl text-center text-gray-800 block float-left rounded-l-2xl'>log in</a>
            </li>
            <li>
                <a href='/signup' className='p-2 px-12 bg-white cursor-pointer no-underline text-xl text-center text-gray-800 block float-left rounded-l-2xl'>sign up</a>
            </li>
        </ul>
    );
};

export default ToggleButton;
