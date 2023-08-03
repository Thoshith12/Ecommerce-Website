function toggleForm() {
    var loginCard = document.getElementById('login-card');
    var signupCard = document.getElementById('signup-card');

    loginCard.classList.toggle('hidden');
    signupCard.classList.toggle('hidden');
}

function login() {
    var email = document.getElementById('login-email').value;
    var password = document.getElementById('login-password').value;

    var users = JSON.parse(localStorage.getItem('users'));

    if (users) {
        var user = users.find(function (user) {
            return user.email === email && user.password === password;
        });

        if (user) {
            window.location.href = 'ecommercewithapi.html';
            
        } else {
            alert('Invalid password');
        }
    } else {
        alert('Invalid email or password');
    }
}
function signup() {
    var name = document.getElementById('signup-name').value;
    var email = document.getElementById('signup-email').value;
    var password = document.getElementById('signup-password').value;

    var users = JSON.parse(localStorage.getItem('users')) || [];
    var existingUser = users.find(function (user) {
        return user.email === email;
    });

    if (existingUser) {
        alert('User with the same email already exists');
    } else {
        var newUser = {
            name: name,
            email: email,
            password: password
        };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        alert('Signup successful');
    }
}