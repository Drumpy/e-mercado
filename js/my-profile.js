let profileFirstName = document.getElementById("profileFirstName");
let profileLastName = document.getElementById("profileFirstLastName");
let profileDayOfBirth = document.getElementById("profileDayOfBirth");
let profileEmail = document.getElementById("profileEmail");
let profileNumber = document.getElementById("profileNumber");
let profileImage = document.getElementById('profileImage');

let alertResult = document.getElementById("alertResult")

let myProfile = {};

let myProfileData = JSON.parse(localStorage.myProfile);

function saveProfile() {

	myProfile.name = profileFirstName.value;
	myProfile.lastName = profileLastName.value;
	myProfile.dayOfBirth = profileDayOfBirth.value;
	myProfile.email = profileEmail.value;
	myProfile.number = profileNumber.value;
	myProfile.image = profileImage.src;

	localStorage.setItem(
		"myProfile",
		JSON.stringify(myProfile)
	);

	alertResult.classList.add('show')
	showProfile();
};

function showProfile() {
	let profileNameDOM = document.getElementById("profileNameDOM");
	let profileDayOfBirthDOM = document.getElementById("profileDayOfBirthDOM");
	let profileEmailDOM = document.getElementById("profileEmailDOM");
	let profileNumberDOM = document.getElementById("profileNumberDOM");

	profileNameDOM.innerHTML = profileFirstName.value + " " + profileLastName.value;
	profileDayOfBirthDOM.innerHTML = profileDayOfBirth.value + " " + 'años';
	profileEmailDOM.innerHTML = profileEmail.value;
	profileNumberDOM.innerHTML = profileNumber.value;
}

let openFile = function (file) {
	let input = file.target;

	let reader = new FileReader();
	reader.onload = function () {
		let dataURL = reader.result;
		profileImage.src = dataURL;
	};
	reader.readAsDataURL(input.files[0]);
};

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

	profileFirstName.value = myProfileData.name;
	profileLastName.value = myProfileData.lastName;
	profileDayOfBirth.value = myProfileData.dayOfBirth;
	profileEmail.value = myProfileData.email;
	profileNumber.value = myProfileData.number;
	profileImage.src = myProfileData.image;

	if (myProfileData) {
		showProfile();
	}
});