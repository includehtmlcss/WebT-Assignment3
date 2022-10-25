const submit = document.getElementById('submit');
var attempts = 3;
const attemptsHtml = document.getElementById('attempts');
const timer = document.querySelector('.timer');

window.onload = function () {
	attemptsHtml.innerHTML = 3;
	timer.innerHTML = "Retry after 00:30";
}

submit.addEventListener('click', (e) => {
	e.preventDefault();

	let username = document.querySelector("#username").value;
	let password = document.querySelector("#password").value;

	--attempts;
	attemptsHtml.innerHTML = attempts;

	var usernameValidation = false, passwordValidation = false;

	if (username.length === 0) {
		setUsernameAlert("Username cannot be empty!");
		usernameValidation = false;
	}
	else if (username.length < 5) {
		setUsernameAlert("Username must be atleast 5 characters long!");
		usernameValidation = false;
	}
	else if (0 <= parseInt(username[0]) && parseInt(username[0]) <= 9) {
		setUsernameAlert("Username can't have a number as first character!");
		usernameValidation = false;
	}
	else {
		hideUsernameAlert();
		usernameValidation = true;
	}

	if (password.length === 0) {
		setPasswordAlert("Password cannot be empty!");
		passwordValidation = false;
	}
	else if (password.length < 8) {
		setPasswordAlert("Password must be atleast 8 characters long!");
		passwordValidation = false;
	}
	else {
		hidePasswordAlert();
		passwordValidation = true;
	}

	if (usernameValidation && passwordValidation && attempts >= 0) {
		const container = document.querySelector('.form-container');
		container.style.textAlign = "center";
		container.innerHTML = `<h2 style="text-align: 'center';">Welcome ${username}!</h2><p style="color: white; font-size: 0.9rem;">You've been logged in successfully.</p>`;
	}
	else if (attempts === 0) {
		var fiveMinutes = 30;
		startTimer(fiveMinutes, timer);
	}
})

function startTimer(duration, display) {
	display.style.visibility = "visible";
	document.getElementById('username').disabled = true;
	document.getElementById('password').disabled = true;
	document.getElementById('submit').disabled = true;
	document.getElementById('username').classList.add("disabled");
	document.getElementById('password').classList.add("disabled");
	document.getElementById('submit').classList.add("disabled");
	var timer = duration, minutes, seconds;
	var x = setInterval(function () {
		minutes = parseInt(timer / 60, 10);
		seconds = parseInt(timer % 60, 10);

		minutes = minutes < 10 ? "0" + minutes : minutes;
		seconds = seconds < 10 ? "0" + seconds : seconds;

		display.textContent = "Retry after " + minutes + ":" + seconds;

		if (--timer < 0) {
			clearInterval(x);
			display.style.visibility = "hidden";
			resetAttempts();
			document.getElementById('username').disabled = false;
			document.getElementById('password').disabled = false;
			document.getElementById('submit').disabled = false;
			document.getElementById('username').classList.remove("disabled");
			document.getElementById('password').classList.remove("disabled");
			document.getElementById('submit').classList.remove("disabled");
		}
	}, 1000);
}

function setUsernameAlert(message) {
	const html = document.getElementById('uname-alert-container');
	html.style.display = 'flex';
	const alert = document.getElementById('uname-alert');
	alert.innerHTML = message;
}
function setPasswordAlert(message) {
	const html = document.getElementById('pass-alert-container');
	html.style.display = 'flex';
	const alert = document.getElementById('pass-alert');
	alert.innerHTML = message;
}
function hideUsernameAlert() {
	const html = document.getElementById('uname-alert-container');
	html.style.display = 'none';
}
function hidePasswordAlert() {
	const html = document.getElementById('pass-alert-container');
	html.style.display = 'none';
}
function resetAttempts() {
	attempts = 3;
	attemptsHtml.innerHTML = 3;
}