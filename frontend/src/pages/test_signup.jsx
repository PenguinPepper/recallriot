import { render, screen, fireEvent } from '@testing-library/react';
import Signup from './signup';

test('Confirm Password matches Password', () => {
    render(<Signup />);

    const passwordInput = screen.getByLabelText('Password:');
    const confirmPasswordInput = screen.getByLabelText('Confirm Password:');

    // Set the value of the password input
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Set the value of the confirm password input to match the password input
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });

    // Assert that the confirm password input value matches the password input value
    expect(confirmPasswordInput.value).toBe(passwordInput.value);
});