export default function isPassword(password: string): boolean {
    // Password must be at least 8 characters long, contain at least one uppercase letter,
    // one lowercase letter, one digit, and one special character.
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}