function showMainPage() {
    document.getElementById('main-page').classList.remove('hidden');
    document.getElementById('login-page').classList.add('hidden');
    document.getElementById('register-page').classList.add('hidden');
    document.getElementById('forgot-password-page').classList.add('hidden');
}

function showLoginPage() {
    document.getElementById('main-page').classList.add('hidden');
    document.getElementById('login-page').classList.remove('hidden');
    document.getElementById('forgot-password-page').classList.add('hidden'); // Ensure forgot password page is hidden
}

function showRegisterPage() {
    document.getElementById('main-page').classList.add('hidden');
    document.getElementById('register-page').classList.remove('hidden');
}

function showForgotPasswordPage() {
    document.getElementById('login-page').classList.add('hidden');
    document.getElementById('forgot-password-page').classList.remove('hidden');
}

function sendVerificationCode() {
    const email = document.getElementById('register-email').value;
    if (!email.endsWith('@gmail.com')) {
        document.getElementById('register-message').innerText = 'E-posta @gmail.com ile bitmelidir';
        setTimeout(() => {
            document.getElementById('register-message').innerText = '';
        }, 3000);
        return;
    }
    fetch('http://localhost:5000/send_verification_code', {
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
    fetch('http://localhost:5000/send_forgot_password_code', {
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

document.getElementById('forgot-email').addEventListener('input', () => {
    document.getElementById('forgot-message').innerText = '';
});

function startTimer(timerId) {
    let timeLeft = 300;
    const timerElement = document.getElementById(timerId);
    const interval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(interval);
            timerElement.innerText = 'Süre doldu';
        } else {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerElement.innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            timeLeft--;
        }
    }, 1000);
}

function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    fetch('http://localhost:5000/login', {
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
    fetch('http://localhost:5000/register', {
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
    fetch('http://localhost:5000/reset_password', {
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

function guestLogin() {
    window.location.href = 'game.html'; // Redirect to game.html
}

function closeApplication() {
    window.open('', '_self').close(); // Close the browser tab
}

function exitGame() {
    // Implement the exit game logic
}

function showAboutPage() {
    // Implement the about page logic
}
