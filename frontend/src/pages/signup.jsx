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
        <section className='display'>
            <ToggleButton />
            <h1 className='text-xl font-semibold'>Create your Free Account</h1>
            <form className='display' onSubmit={handleSubmit(SignUp)}>
                <label htmlFor="userName" className='formLabel'>User Name:</label>
                <input type="text" id="userName" className='rounded'
                    {...register('userName',
                        {
                            required: {
                                value: true,
                                message: "Please enter your name and surname",
                            },
                        })}
                />

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

                <label htmlFor="confirmation" className='formLabel'>Confirm Password:</label>
                <input
                    type="password"
                    id="confirmation"
                    className='formInput'
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

                <button type="submit" className='formButon'>Sign Up</button>
            </form>
            <p>Or Sign up with Google</p>
        </section>
    );
};

export default Signup;
