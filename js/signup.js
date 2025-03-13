// LOGIN AND SIGNUP
const form = document.getElementById("form");
const firstname_input = document.getElementById("firstname-input");
const email_input = document.getElementById("email-input");
const password_input = document.getElementById("password-input");
const repeat_password_input = document.getElementById("repeat-password-input");
const error_message = document.getElementById("error-message");

form.addEventListener("submit", (e) => {
  let errors = [];

  if (firstname_input) {
    errors = getSignupFormErrors(
      firstname_input.value,
      email_input.value,
      password_input.value,
      repeat_password_input.value
    );
  }
  if (errors.length > 0) {
    e.preventDefault();
    error_message.innerText = errors.join(". ");
  }
});

function getSignupFormErrors(firstname, email, password, repeatPassword) {
  let errors = [];

  if (firstname === "" || firstname == null) {
    errors.push("Firstname is required");
    firstname_input.parentElement.classList.add("incorrect");
  }
  if (email === "" || email == null) {
    errors.push("Email is required");
    email_input.parentElement.classList.add("incorrect");
  }
  if (password === "" || password == null) {
    errors.push("Password is required");
    password_input.parentElement.classList.add("incorrect");
  }
  if (password.length < 8) {
    errors.push("Password must have at least 8 characters");
    password_input.parentElement.classList.add("incorrect");
  }

  if (password !== repeatPassword) {
    errors.push("Password does not match Repeated Password");
    password_input.parentElement.classList.add("incorrect");
    repeat_password_input.parentElement.classList.add("incorrect");
  }

  return errors;
}

const allInputs = [
  firstname_input,
  email_input,
  password_input,
  repeat_password_input,
].filter((input) => input != null);

allInputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (input.parentElement.classList.contains("incorrect")) {
      input.parentElement.classList.remove("incorrect");
      error_message.innerText = "";
    }
  });
});

//DATA STORAGE
// const form = document.getElementById("form");
// const firstname_input = document.getElementById("firstname-input");

// var user = localStorage.getItem("user");
// if (user) {
//   var parsedUser = JSON.parse(user);
//   document.getElementById("user-name").innerHTML = "Hello ${parsedUser.name}";
//   document.getElementById("logoutButton").classList.remove("hidden");
// } else {
//   document.getElementById("user-name").innerHTML =
//     "Hello, please <a href = 'login.html'> login </a>";
// }

// document.getElementById("logoutButton").addEventListener("click", function () {
//   localStorage.removeItem("user");
//   window.location.href = "signin.html";
// });

// form.addEventListener("submit", function (event) {
//   event.preventDefault();
//   firstname_input.value;
//   password_input.value;

//   var user = localStorage.getItem(firstname_input);

//   if (user) {
//     var parsedUser = JSON.parse(user);
//     if (parsedUser.password === password_input) {
//       localStorage.setItem("user", JSON.stringify(parsedUser));
//       window.location.href = "userpage.html";
//     } else {
//       alert("Incorrect password");
//     }
//   } else {
//     alert("User not found");
//   }
// });
