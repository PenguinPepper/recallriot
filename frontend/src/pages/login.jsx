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
        <section className='w-full h-screen bg-signup bg-cover bg-center flex flex-col justify-center pl-8 pr-8'>
            {/* <ToggleButton /> */}
            <h1 className='text-3xl text-left pl-2 pt-2 pb-4 max-w-2xl bg-white rounded-t-xl '>Log In</h1>
            <section className='display  bg-white'></section>
            <section className='max-w-2xl bg-white rounded-b-xl p-4 '>
                <p className='text-sm '>Welcome back,</p>

                <form className='flex flex-col' onSubmit={handleSubmit(logIn)}>
                    <label htmlFor="email" className='formLabel'>Email Address:</label>
                    <input type="email" id="email" className='formInput rounded bg-slate-200 border-none'
                        {...register('email',
                            {
                                required: {
                                    value: true,
                                    message: "Email address is required",
                                },
                            })}
                    />

                    <label htmlFor="password" className='formLabel'>Password:</label>
                    <input type="password" id="password" className='formInput rounded bg-slate-200 border-none'
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
                    <section className='flex justify-center'> {/* Added flex justify-center */}
                        <button type="submit" className='formButon bg-purple-300 w-1/2 justify-center'>Log In</button>
                    </section>
                </form>
                <section className='flex justify-center'>
                    <p>or</p>
                    <p className=''> Sign Up </p>
                </section>
            </section>
        </section>
    );
};

export default Login;
