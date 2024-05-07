/*eslint-disable */
import React from 'react';
import ToggleButton from '../components/toggleButton';
import { useForm } from 'react-hook-form';
import './form.css'

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const logIn = (data) => {
        console.log(data);
    }
    return (
        <section className='display'>
            <ToggleButton />
            <form onSubmit={handleSubmit(logIn)} className='display'>
                <label htmlFor="email" className='formLabel'>Email Address:</label>
                <input type="email" id="email" className='formInput'
                    {...register('email',
                        {
                            required: {
                                value: true,
                                message: "Email address is required",
                            },
                        })}
                />

                <label htmlFor="password" className='formLabel'>Password:</label>
                <input type="password" id="password" className='formInput'
                    {...register('password',
                        {
                            required: {
                                value: true,
                                message: "Password is required",
                            },
                            minLength: {
                                value: 8,
                                message: "Password must be at least 8 characters",
                            },
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                message: `Password must contain at least: one uppercase letter, one lowercase letter, one number and one special character`,
                            },
                        })}
                />
                {errors.password && (
                    <ul className="text-xs text-rose-700 text-left">
                        {errors.password.message.split(',').map((message, index) => (
                            <li key={index}>   {message}</li>
                        ))}
                    </ul>
                )}

                <button type="submit" className='formButon'>Log In</button>
            </form>
        </section>
    );
};

export default Login;
