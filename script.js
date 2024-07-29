document.getElementById('generate').addEventListener('click', function() {
    const length = document.getElementById('length').value;
    const includeUppercase = document.getElementById('uppercase').checked;
    const includeNumbers = document.getElementById('numbers').checked;
    const includeSpecial = document.getElementById('special').checked;

    const password = generatePassword(length, includeUppercase, includeNumbers, includeSpecial);
    document.getElementById('password').value = password;
    updateStrengthIndicator(password);
});

document.getElementById('copy').addEventListener('click', function() {
    const passwordField = document.getElementById('password');
    passwordField.select();
    document.execCommand('copy');
    alert('Password copied to clipboard!');
});

function generatePassword(length, includeUppercase, includeNumbers, includeSpecial) {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    let charset = lowercaseChars;
    if (includeUppercase) charset += uppercaseChars;
    if (includeNumbers) charset += numberChars;
    if (includeSpecial) charset += specialChars;

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
}

function updateStrengthIndicator(password) {
    const strengthIndicator = document.getElementById('strength-indicator');
    const lengthCriteria = password.length >= 12;
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*()_+[\]{}|;:,.<>?]/.test(password);

    if (lengthCriteria && hasUppercase && hasNumber && hasSpecial) {
        strengthIndicator.textContent = 'Strong';
        strengthIndicator.className = 'strong';
    } else if (lengthCriteria && (hasUppercase || hasNumber || hasSpecial)) {
        strengthIndicator.textContent = 'Medium';
        strengthIndicator.className = 'medium';
    } else {
        strengthIndicator.textContent = 'Weak';
        strengthIndicator.className = 'weak';
    }
}
