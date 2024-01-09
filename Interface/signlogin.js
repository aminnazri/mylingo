const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const signUpForm = document.getElementById('sign-up-form');
const signInForm = document.getElementById('sign-in-form');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

const submitData = document.getElementById('submitData');
submitData.addEventListener('click', (e) => {
    e.preventDefault();
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    if (container.classList.contains('active')) {
        // Sign Up
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                set(ref(database, 'users/' + user.uid), {
                    email: email,
                    password: password
                })
                    .then(() => {
                        alert('User created successfully');
                    })
                    .catch((error) => {
                        alert(error);
                    });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
            });
    } else {
        // Sign In
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                var lgDate = new Date();
                update(ref(database, 'users/' + user.uid), {
                    last_login: lgDate,
                })
                    .then(() => {
                        alert('User logged in successfully');
                    })
                    .catch((error) => {
                        alert(error);
                    });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
            });
    }
});

// ...
