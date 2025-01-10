// ...existing code...

const BASE_URL = 'https://lexup-words-and-collections-production.up.railway.app';

function sendVerificationCode() {
    const email = document.getElementById('register-email').value;
    if (!email.endsWith('@gmail.com')) {
        document.getElementById('register-message').innerText = 'E-posta @gmail.com ile bitmelidir';
        setTimeout(() => {
            document.getElementById('register-message').innerText = '';
        }, 3000);
        return;
    }
    fetch(`${BASE_URL}/send_verification_code`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Verification code sent') {
            document.getElementById('verification-section').classList.remove('hidden');
            startTimer('verification-timer');
        } else {
            document.getElementById('register-message').innerText = 'E-posta bulunamadı';
            setTimeout(() => {
                document.getElementById('register-message').innerText = '';
            }, 3000);
        }
    });
}

function sendForgotPasswordCode() {
    const email = document.getElementById('forgot-email').value;
    fetch(`${BASE_URL}/send_forgot_password_code`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Verification code sent') {
            document.getElementById('forgot-verification-section').classList.remove('hidden');
            document.getElementById('forgot-message').innerText = ''; // Clear the error message
            startTimer('forgot-timer');
        } else {
            document.getElementById('forgot-message').innerText = 'E-posta bulunamadı';
        }
    });
}

// ...existing code...

function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Login successful') {
            document.getElementById('login-message').innerText = 'Giriş başarılı';
            setTimeout(() => {
                window.location.href = 'game.html'; // Redirect to game.html after 2 seconds
            }, 2000);
        } else {
            document.getElementById('login-message').innerText = 'E-posta veya şifre yanlış';
        }
    });
}

function register() {
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    if (password !== confirmPassword) {
        document.getElementById('register-message').innerText = 'Şifreler uyuşmuyor';
        return;
    }
    fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'User registered') {
            document.getElementById('register-message').innerText = 'Kayıt başarılı';
            setTimeout(() => {
                document.getElementById('register-page').classList.add('hidden');
                showLoginPage();
            }, 2000); // Redirect to login page after 2 seconds
        } else {
            document.getElementById('register-message').innerText = 'E-posta zaten kayıtlı';
        }
    });
}

function resetPassword() {
    const email = document.getElementById('forgot-email').value;
    const verificationCode = document.getElementById('forgot-verification-code').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmNewPassword = document.getElementById('confirm-new-password').value;
    if (newPassword !== confirmNewPassword) {
        document.getElementById('forgot-message').innerText = 'Şifreler uyuşmuyor';
        return;
    }
    fetch(`${BASE_URL}/reset_password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, code: verificationCode, new_password: newPassword })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Password reset successful') {
            document.getElementById('forgot-message').innerText = 'Şifre başarıyla sıfırlandı';
            setTimeout(() => {
                document.getElementById('forgot-password-page').classList.add('hidden');
                showLoginPage();
            }, 2000); // Redirect to login page after 2 seconds
        } else {
            document.getElementById('forgot-message').innerText = 'Geçersiz veya süresi dolmuş kod';
        }
    });
}

// ...existing code...
