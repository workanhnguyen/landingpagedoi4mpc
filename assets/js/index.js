// Init
var userNameArr = [];
var passWordArr = [];
var userName;
var passWord;
var confirmPassWord;
const toastAttribute = {
    icon: '<i class="fa-solid fa-circle-exclamation toast__icon"></i>',
    title: 'Error',
    content: '',
    status: 'toast--error'
}
var signInAllow = false;
var rightPassword = true;
// Functions
function toast(icon, title, content, status) {
    const main = document.querySelector('#toast');
    if (main) {
        const toast = document.createElement('div');
        toast.classList.add('toast');
        toast.classList.add(status);
        toast.innerHTML = `
            ${icon}
            <div class="toast__body">
                <div class="toast__body-title">${title}</div>
                <div class="toast__body-content">${content}</div>
            </div>
        `;
        main.appendChild(toast);
        setTimeout(function() {
            main.removeChild(toast);
        }, 4000);   
    }
}
// Remove info in sign up and sign in input
function removeInfo() {
    var inputArr = document.querySelectorAll('.signup input');
    for (var i = 0; i < inputArr.length; i++) {
        inputArr[i].value = '';
    }
}
// Turn between Sign In and Sign Up Form
var signIn = document.querySelector('.signin');
var signUp = document.querySelector('.signup');
var turnSignUp = document.querySelector('.sign__turn--signup');
var turnSignIn = document.querySelector('.sign__turn--signin');

turnSignUp.addEventListener('click', function () {
    signIn.style.transform = 'translateX(-150%)';
    signUp.style.transform = 'translateX(-50%)';
    console.log(1);
});

turnSignIn.addEventListener('click', function () {
    signIn.style.transform = 'translateX(50%)';
    signUp.style.transform = 'translateX(150%)';
    console.log(1);
})




// Sign Up

var signUpBtn = document.querySelector('.signup .sign__btn');
signUpBtn.addEventListener('click', function () {
    userName = document.querySelector('.signup .sign__body-username').value;
    passWord = document.querySelector('.signup .sign__body-password').value;
    confirmPassWord = document.querySelector('.signup .sign__body-confirm-password').value;
    console.log(userName, passWord, confirmPassWord);
    if (userName === "" || passWord === "" || confirmPassWord === "") {
        toastAttribute.content = "Please enter all fields!";
        toast(toastAttribute.icon, toastAttribute.title, toastAttribute.content, toastAttribute.status);
    } else if (passWord === confirmPassWord) {
        userNameArr = JSON.parse(localStorage.getItem('username'));
        passWordArr = JSON.parse(localStorage.getItem('password'));
        var flagIn = true;
        if (userNameArr === null) {
            userNameArr = [];
            passWordArr = [];
            userNameArr.push(userName);
            passWordArr.push(passWord);
            localStorage.setItem('username', JSON.stringify(userNameArr));
            localStorage.setItem('password', JSON.stringify(passWordArr));
            removeInfo();
            signIn.style.transform = 'translateX(50%)';
            signUp.style.transform = 'translateX(150%)';
        } else {
            for (var i = 0; i < userNameArr.length; i++) {
                if (userNameArr[i] === userName) {
                    toastAttribute.content = "User already exist!";
                    toast(toastAttribute.icon, toastAttribute.title, toastAttribute.content, toastAttribute.status);
                    flagIn = false;
                    break;
                }
            }
            if (flagIn === true) {
                userNameArr.push(userName);
                passWordArr.push(passWord);
                localStorage.setItem('username', JSON.stringify(userNameArr));
                localStorage.setItem('password', JSON.stringify(passWordArr));
                removeInfo();
                signIn.style.transform = 'translateX(50%)';
                signUp.style.transform = 'translateX(150%)';
                toastAttribute.icon = '<i class="fa-solid fa-circle-check toast__icon"></i>';
                toastAttribute.title = 'Success';
                toastAttribute.status = 'toast--success';
                toastAttribute.content = "Signup is successful!";
                toast(toastAttribute.icon, toastAttribute.title, toastAttribute.content, toastAttribute.status);
            }
        }
    } else {
        toastAttribute.content = "Confirm password not match!";
        toast(toastAttribute.icon, toastAttribute.title, toastAttribute.content, toastAttribute.status);
    }
});

// Sign In
var signInBtn = document.querySelector('.signin .sign__btn');
signInBtn.addEventListener('click', function () {
    userName = document.querySelector('.signin .sign__body-username').value;
    passWord = document.querySelector('.signin .sign__body-password').value;
    if (userName === "" || passWord === "") {
        toastAttribute.content = "Please enter all fields!";
        toast(toastAttribute.icon, toastAttribute.title, toastAttribute.content, toastAttribute.status);
    } else {
        userNameArr = JSON.parse(localStorage.getItem('username'));
        passWordArr = JSON.parse(localStorage.getItem('password'));
        if (userNameArr === null || passWordArr === null) {
            toastAttribute.content = "Username is not exist!";
            toast(toastAttribute.icon, toastAttribute.title, toastAttribute.content, toastAttribute.status);
        } else {
            for (var i = 0; i < userNameArr.length; i++) {
                if (userName === userNameArr[i] && passWord === passWordArr[i]) {
                    signInAllow = true;
                    break;
                } else if (userName === userNameArr[i] && passWord !== passWordArr[i]) {
                    rightPassword = false;
                    break;
                } else {
                    rightPassword = true;
                }
            }
            if (signInAllow === false) {
                toastAttribute.content = "Username is not exist!";
                if (rightPassword === false) {
                    toastAttribute.content = "Password not match!";
                }
                toast(toastAttribute.icon,toastAttribute.title,toastAttribute.content,toastAttribute.status);
            } else {
                document.querySelector('.signin .sign__btn').href = './homepage.html';
            }
        }
    }
});
