import React from 'react';
import { useForm } from 'react-hook-form';
import ToggleButton from '../components/toggleButton';

const Signup = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();

    const SignUp = (data) => {
        console.log(`Signing up: ${data}`);
    }

    return (
        <section className='display'>
            <ToggleButton />
            <form className='display' onSubmit={handleSubmit(SignUp)}>
                <label htmlFor="fullName" className='formLabel'>Full Name:</label>
                <input type="text" id="fullName" className='formInput'
                    {...register('fullName',
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
                        })}
                />

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

                <label htmlFor="grade" className='formLabel'>Grade:</label>
                <input type="text" id="grade" className='formInput' />

                <button type="submit" className='formButon'>Sign Up</button>
            </form>
        </section>
    );
};

export default Signup;
