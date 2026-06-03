 const resetPasswordTemplate = (
    resetLink
) => {

    return `
        <h2>Password Reset</h2>

        <p>
            Click the button below to reset your password.
        </p>

        <a href="${resetLink}">
            Reset Password
        </a>

        <p>
            This link will expire in 15 minutes.
        </p>
    `;
};

export {resetPasswordTemplate}