const arrow = document.getElementById("scrollArrow");

window.addEventListener("scroll", () => {
    if (window.scrollY > 800) {
        arrow.style.display = "block";
    }
    else {
        arrow.style.display = "none";
    }
})

// ----------------------------------------------------------------

const navMenu = document.getElementById('mobileMenu');
const allNavbar = document.querySelectorAll('.nav-top a');

function toggleMenu() {
    navMenu.classList.toggle('show');
}

for(const navbar of allNavbar){
    navbar.addEventListener('click', () => {
        navMenu.classList.remove('show');
    })
}

// ------------------------- Highlight the current page Navigation ---------------------------------------

const links = document.querySelectorAll('.nav-top > a');
const currentPage = window.location.pathname.split('/').pop();

for (const link of links) {
    if (link.getAttribute('href') === currentPage) {
        link.style.color = 'deeppink';
    }
    else {
      link.style.color = '';
    }
}

// ----------------------------------------------------------------

function filterPets(petTypes, btnID) {

    // ----------------------- To Change Button Color -----------------

    const buttons = document.querySelectorAll('.filter-buttons > button');

    for (let btn of buttons) {
        btn.classList.remove('activeButton');
    }

    document.getElementById(btnID).classList.add('activeButton');

    // ----------------------- To Filter Pets ---------------------

    const petCards = document.querySelectorAll('.pet-card');

    for (let card of petCards) {
        if (petTypes === 'all' || card.classList.contains(petTypes)) {
            card.style.display = "block";
        }
        else {
            card.style.display = "none";
        }
    }

};

// ---------------------- Form Submition ------------------------------------------

const form = document.querySelector("form");

const userName = document.querySelector('#name');
const userEmail = document.querySelector('#email');
const userSubject = document.querySelector('#subject');
const userMessage = document.querySelector('#message');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    fetchingData();

});

// ----------------------------------------------------------------

function dataValidation() {
    const trimedName = userName.value.trim();
    const trimedEmail = userEmail.value.trim();
    const trimedSubject = userSubject.value.trim();
    const trimedMessage = userMessage.value.trim();

    let isValid = true;
    const validatedData = {};

    if (trimedName === '') {
        setError(userName, "Enter Valid UserName");
        isValid = false;
    }
    else {
        setSuccess(userName);
        validatedData.name = trimedName;
    }

    if (trimedEmail === '') {
        setError(userEmail, "Enter Valid Email");
        isValid = false;
    }
    else {
        setSuccess(userEmail);
        validatedData.email = trimedEmail;
    }

    if (trimedSubject === '') {
        setError(userSubject, "Enter Valid Subject");
        isValid = false;
    }
    else {
        setSuccess(userSubject);
        validatedData.subject = trimedSubject;
    }

    if (trimedMessage === '') {
        setError(userMessage, "Enter Valid Message");
        isValid = false;
    }
    else {
        setSuccess(userMessage);
        validatedData.message = trimedMessage;
    }


    function setError(inputBox, message) {
        const div = inputBox.parentElement;
        const small = div.querySelector('small');
        small.innerText = message;
    }

    function setSuccess(inputBox) {
        const div = inputBox.parentElement;
        const small = div.querySelector('small');
        small.innerText = '';
    }


    if (isValid) return validatedData;
    else return null;           // This controls whether the form should proceed
};

// ----------------------------------------------------------------

function fetchingData() {

    const finalValidatedData = dataValidation();

    if (!finalValidatedData) return;   // Stop if validation failed

    const formData = new FormData();
    formData.append("access_key", "d41735d1-af9e-4fb1-8d0f-3071e1c3c87e");
    formData.append("name", finalValidatedData.name);
    formData.append("email", finalValidatedData.email);
    formData.append("subject", finalValidatedData.subject);
    formData.append("message", finalValidatedData.message);

    // For Post
    fetch(form.action, {
        method: "POST",
        body: formData
    })
        .then((response) => {
            if (response.ok) {
                alert("Form submitted successfully!")
                form.reset();
            }
            else alert("Oops! Something went wrong. Please try again.");
        })
        .catch(error => alert("Network error. Please check your connection."));
};

// ----------------------------------------------------------------

