/*eslint-disable */
import React from 'react';
import { useForm } from 'react-hook-form';
import ToggleButton from '../components/toggleButton';

/*
So the email that we will send to the user contains the login link?

*/

const Signup = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();

    const SignUp = async (data) => {
        // const signingUp = {
        //     userName: data.userName,
        //     email: data.email,
        //     password: data.password,
        // }

        // const response = await axios.post('http://localhost:3003/auth/signup', signingUp);
        console.log(data);

    }

    return (
        <section className=''>
            {/* <ToggleButton /> */}
            <h1 className='text-3xl text-left pt-0 mt-0 pb-2'>Sign Up</h1>
            <section className='display pt-2 bg-white'></section>
            <section className='max-w-2xl bg-white'>
                <p className='text-sm '>Create your Free Account</p>

                <form className='flex flex-col' onSubmit={handleSubmit(SignUp)}>
                    <label htmlFor="userName" className='formLabel'>User Name:</label>
                    <input type="text" id="userName" className='rounded bg-slate-200 border-none'
                        {...register('userName',
                            {
                                required: {
                                    value: true,
                                    message: "Please enter your name and surname",
                                },
                            })}
                    />

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

                    <label htmlFor="confirmation" className='formLabel'>Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmation"
                        className='formInput rounded bg-slate-200 border-none'
                        {...register('confirmation', {
                            required: {
                                value: true,
                                message: "Please retype password",
                            },
                            validate: (value) =>
                                value === watch('password')
                                    ? undefined
                                    : "Passwords do not match",
                        })}
                    />
                    {errors.confirmation && (
                        <span className="errorMessage">{errors.confirmation.message}</span>
                    )}
                    <section className=''>
                        <button type="submit" className='formButon bg-purple-300 w-1/2 justify-self-center'>Sign Up</button>
                    </section>
                </form>
                <p>Or</p>
                <p> Sign up with Google</p>
            </section>
        </section>
    );
};

export default Signup;
