function validateForm(){

    //grab the form fields and the form 
    const userName = document.querySelector('#username');
    const email1 = document.querySelector('#email');
    const passWord = document.querySelector('#password');
    const confirmPassword = document.querySelector('#confirm-password');
    const form = document.querySelector('#submit');
    
    // username validation
    const checkUsername = () => {
        let valid = false;
        const min = 3,
              max = 25;
        const username = userName.value.trim();
        
        if (!isRequired(username)) {
            showError(userName, 'username cannot be blank.');
        }      else if (!isBetween(username.length, min, max)) {
            showError(userName, `username must be between ${min} and ${max} characters.`)
        } else {
            showSuccess(userName);
            valid = true;
        }
        return valid;
    };
    
    // password validation
        const checkPassword = () => {
        let valid = false;
        const password = passWord.value.trim();
        
        if (!isRequired(password)) {
            showError(passWord, 'Password cannot be blank.');
        }   else if (!isPasswordSecure(password)) {
            showError(passWord, 'Password must have at least 8 characters that include special charaters');
        }   else {
            showSuccess(passWord);
            valid = true;
        }
            return valid;
    };

    // confirm password
    const checkConfirmPassword = () => {
        let valid = false;

        //check confirm password
        const confirmpassword = confirmPassword.value.trim();
        const password = passWord.value.trim();

        if (!isRequired(confirmpassword)) {
            showError(confirmPassword, 'Please enter the password again');
        } else if (password !== confirmpassword) {
            showError(confirmPassword, 'The password does not match');
        } else {
            showSuccess(confirmPassword);
            valid = true;
        }
    
        return valid;
    };
    
    // email validation 
    const checkEmail = () => {
        let valid = false;
        const email = email1.value.trim();

        if (!isRequired(email)) {
            showError(email1, 'email cannot be blank.');
        }   else if (!isEmailValid(email)) {
            showError(email1, 'email is not valid');
        }   else {
            showSuccess(email1);
            valid = true;
        }
            return valid;
    }; 

    // reusable utility functions
    const isRequired = value => value === '' ? false : true;
    const isBetween = (length, min, max) => length < min || length > max ? false : true;
    const isPasswordSecure = (password) => {
        const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        return re.test(password);
    };
    const isEmailValid = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    
    // error and success classes
    const showError = (input, message) => {
        const user = input.parentElement;
        user.classList.remove('success');
        user.classList.add('error');
    
        //show the error message
        const error = user.querySelector('small');
        error.textContent = message;
    };
    
    const showSuccess = (input) => {
        const user = input.parentElement;
        user.classList.remove('error');
        user.classList.add('success');
    
        //hide the error message
        const error = user.querySelector('small');
        error.textContent = '';
    }
    
    //modified eventlistener
    form.addEventListener('submit', function (e) {
        //prevent the form from submitting
        e.preventDefault();
    
        //validate fields
        let isUsernameValid = checkUsername(), 
            isPasswordValid  = checkPassword(),
            isEmailValid     = checkEmail(),
            isConfirmPasswordValid = checkConfirmPassword();

        let isFormValid = isUsernameValid && 
            isEmailValid && 
            isPasswordValid &&
            isConfirmPasswordValid;
    
        //submit to the server if the form is valid
        if (isFormValid) {
    
        }    
    });
    
    //debouncing feature
    const debounce = (fn, delay = 500) => {
        let timeoutId;
            return (...args) => {
            //cancel the previous timer
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            //setup a new timer
            timeoutId = setTimeout(() => {
                fn.apply(null, args)
            }, delay);
        };
    };
    //instant feedback feature
    form.addEventListener('input', debounce(function (e) {
        switch (e.target.id) {
            case 'username':
                checkUsername();
                break;
            case 'password':
                checkPassword();
                break;   
        }
    }));
    
    }