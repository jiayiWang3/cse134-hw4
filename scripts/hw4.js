
var form_errors = [];

function addFormError(errorType, errorMessage) {
    var errorExists = form_errors.some(e => e.type === errorType);
    if (!errorExists) {
        form_errors.push({ type: errorType, message: errorMessage });
    }
}

function removeFormError(errorType) {
    var errorIndex = form_errors.findIndex(e => e.type === errorType);
    if (errorIndex !== -1) {
        form_errors.splice(errorIndex, 1);
    }
}

document.getElementById('hw4_form').addEventListener('submit', function(event) {
    var hiddenInput = document.createElement('input');
    hiddenInput.type = 'hidden';
    hiddenInput.name = 'form-errors';
    hiddenInput.value = JSON.stringify(form_errors);
    this.appendChild(hiddenInput);
});



var usrname = document.getElementById("hw4_name");

usrname.addEventListener("input", function (event) {
  if (usrname.validity.tooShort) {
    usrname.setCustomValidity("The length should larger than 1!");
    addFormError('name_error', 'The length of name is less than 1.');
  } else if (usrname.validity.tooLong) {
    usrname.setCustomValidity("The length shoulld shorter than 100");
    addFormError('name_error', 'The length of name is less than 1.');
  } else {
    usrname.setCustomValidity('');
    removeFormError('name_error');
  }
});

var email_ = document.getElementById("hw4_email");

email_.addEventListener("input", function (event) {
  if (email_.validity.typeMismatch) {
    email_.setCustomValidity("Please input a valid email: format: xxx@xxx");
    addFormError('email_error', 'The input is not an valid email format.');
  } else if (email_.validity.tooShort) {
    email_.setCustomValidity("The length should larger than 3!");
    addFormError('email_error', 'The length of email is less than 3.');
  } else if (email_.validity.tooLong) {
    email_.setCustomValidity("The length shoulld shorter than 100");
    addFormError('email_error', 'The length of email is larger than 100.');
  } else {
    email_.setCustomValidity('');
    removeFormError('email_error');
  }
});

var comments = document.getElementById("hw4_comments");

comments.addEventListener("input", function (event) {
  if (comments.validity.tooShort) {
    comments.setCustomValidity("The length should larger than 1!");
    addFormError('comments_error', 'The length of comments is less than 1.');
  } else if (comments.validity.tooLong) {
    comments.setCustomValidity("The length should less than 300.");
    addFormError('comments_error', 'The length of comments is larger than 300.');
  } else if (comments.validity.patternMismatch) {
    comments.setCustomValidity("please do not use non-typical characters.");
    addFormError('comments_error', 'There is some invalid character.');
  } else {
    comments.setCustomValidity('');
    removeFormError('comments_error');
  }
});

document.getElementById('hw4_comments').addEventListener('input', function(e) {
    const regex = /^[-A-Za-z0-9\s\.,!?'&quot;:\–\—()$%&]*$/;
    const value = e.target.value;
    if (!regex.test(value)) {
        flashField(e.target);
        showErrorMessage();
        addFormError('comments_character', 'invalid character');
    } else {
        removeFormError('comments_character');
    }
});

function flashField(field) {
    field.classList.add('flash');
    setTimeout(() => field.classList.remove('flash'), 1000);
}

function showErrorMessage() {
    const errorMessage = document.getElementById('hw4_test_error');
    // errorMessage.style.display = 'block';
    errorMessage.textContent = "The character is invalid.";
    errorMessage.className = '.character_error';
    setTimeout(() => errorMessage.style.opacity = '0', 3000);
    setTimeout(() => errorMessage.style.textContent = " ", 3000);
}

document.getElementById('hw4_email').addEventListener('input', function(e) {
    const regex = /^[@-A-Za-z0-9\s\.,!?'&quot;:\–\—()$%&]*$/;
    const value = e.target.value;
    if (!regex.test(value)) {
        flashField(e.target);
        const errorMessage = document.getElementById('hw4_email_error');
        errorMessage.textContent = "The character is invalid.";
        errorMessage.className = '.character_error';
        setTimeout(() => errorMessage.style.opacity = '0', 3000);
        setTimeout(() => errorMessage.style.textContent = " ", 3000);
        addFormError('email_character', 'invalid email character');
    } else {
        removeFormError('comments_character');
    }
});

function flashField(field) {
    field.classList.add('flash');
    setTimeout(() => field.classList.remove('flash'), 1000);
}



document.getElementById('hw4_comments').addEventListener('input', function() {
    var commentBox = this;
    var charCount = commentBox.value.length;
    var maxChars = commentBox.getAttribute('maxlength');
    var infoMessage = document.getElementById('hw4_comments_info');

    // Update info message content
    infoMessage.textContent = charCount + '/' + maxChars;

    // Change style based on character count
    if (charCount > maxChars) {
        addFormError('comments_error', 'comments count exceeds 300.');
    } else {
        removeFormError('comments_error');
    }
    if (charCount > maxChars * 0.8) {
        infoMessage.className = 'num_count_error';
    } else {
        infoMessage.className = '';
    }
});




document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const toggleButton = document.getElementById('theme-toggle');

    // 加载时检查localStorage
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
    }

    toggleButton.addEventListener('click', () => {
        body.classList.toggle('dark-mode');

        // 保存到localStorage
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
});