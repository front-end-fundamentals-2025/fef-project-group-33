// LOGIN AND SIGNUP
const form = document.getElementById("form");
const firstname_input = document.getElementById("firstname-input");
const password_input = document.getElementById("password-input");
const error_message = document.getElementById("error-message");

form.addEventListener("submit", (e) => {
  let errors_login = [];

  if (firstname_input) {
    errors_login = getLoginFormErrors(
      firstname_input.value,
      password_input.value
    );
  }
  if (errors_login.length > 0) {
    e.preventDefault();
    error_message.innerText = errors_login.join(". ");
  }
});

function getLoginFormErrors(firstname, password) {
  let errors_login = [];
  if (firstname === "" || firstname == null) {
    errors_login.push("Firstname is required");
    firstname_input.parentElement.classList.add("incorrect");
  }
  if (password === "" || password == null) {
    errors_login.push("Password is required");
    password_input.parentElement.classList.add("incorrect");
  }

  return errors_login;
}

const allInputs = [firstname_input, password_input].filter(
  (input) => input != null
);

allInputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (input.parentElement.classList.contains("incorrect")) {
      input.parentElement.classList.remove("incorrect");
      error_message.innerText = "";
    }
  });
});

form.addEventListener("submit", function (event) {
  event.preventDefault();
  firstname_input.value;
  password_input.value;

  var user = localStorage.getItem(firstname_input);

  if (user) {
    var parsedUser = JSON.parse(user);
    if (parsedUser.password === password_input) {
      localStorage.setItem("user", JSON.stringify(parsedUser));
      //   window.location.href = "userpage.html";
    } else {
      alert("Incorrect password");
    }
  } else {
    alert("User not found");
  }
});
