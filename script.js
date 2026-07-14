/* =====================================================
   script.js — shared behaviour for all pages
   1) Trivia page: BMI calculator logic
   2) All pages: contact form validation (right sidebar)
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initBmiCalculator();
  initContactForm();
});

/* ---------------------------------------------------
   1) BMI Trivia calculator (trivia.html only)
--------------------------------------------------- */
function initBmiCalculator() {
  const form = document.getElementById("bmiForm");
  if (!form) return; // only run on trivia.html

  const heightInput = document.getElementById("height");
  const weightInput = document.getElementById("weight");
  const resultBox = document.getElementById("bmiResult");
  const errorBox = document.getElementById("bmiError");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const heightCm = parseFloat(heightInput.value);
    const weightKg = parseFloat(weightInput.value);

    errorBox.textContent = "";
    resultBox.classList.remove("show");

    if (!heightCm || !weightKg || heightCm <= 0 || weightKg <= 0) {
      errorBox.textContent = "Please enter a valid height and weight (numbers greater than 0).";
      return;
    }

    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);
    const bmiRounded = Math.round(bmi * 10) / 10;

    let category = "";
    let badgeClass = "";

    if (bmi < 18.5) {
      category = "Underweight";
      badgeClass = "badge-under";
    } else if (bmi < 25) {
      category = "Normal";
      badgeClass = "badge-normal";
    } else if (bmi < 30) {
      category = "Overweight";
      badgeClass = "badge-over";
    } else {
      category = "Obese";
      badgeClass = "badge-obese";
    }

    resultBox.innerHTML = `
      <span class="bmi-value">${bmiRounded}</span>
      <p>Your BMI category is
        <span class="badge-category ${badgeClass}">${category}</span>
      </p>
    `;
    resultBox.classList.add("show");
  });

  form.addEventListener("reset", () => {
    resultBox.classList.remove("show");
    errorBox.textContent = "";
  });
}

/* ---------------------------------------------------
   2) Contact form validation (present on every page)
--------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const nameInput = document.getElementById("cf-name");
  const emailInput = document.getElementById("cf-email");
  const messageInput = document.getElementById("cf-message");
  const status = document.getElementById("formStatus");

  const nameError = document.getElementById("cf-name-error");
  const emailError = document.getElementById("cf-email-error");
  const messageError = document.getElementById("cf-message-error");

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let isValid = true;

    if (!nameInput.value.trim()) {
      nameError.textContent = "Name is required.";
      isValid = false;
    } else {
      nameError.textContent = "";
    }

    if (!emailInput.value.trim()) {
      emailError.textContent = "Email is required.";
      isValid = false;
    } else if (!emailPattern.test(emailInput.value.trim())) {
      emailError.textContent = "Please enter a valid email address.";
      isValid = false;
    } else {
      emailError.textContent = "";
    }

    if (!messageInput.value.trim()) {
      messageError.textContent = "Message is required.";
      isValid = false;
    } else if (messageInput.value.trim().length < 5) {
      messageError.textContent = "Message should be at least 5 characters.";
      isValid = false;
    } else {
      messageError.textContent = "";
    }

    if (!isValid) {
      status.textContent = "Please fix the errors above.";
      status.className = "error";
      return;
    }

    status.textContent = "Thanks! Your message looks good (demo form — not actually sent).";
    status.className = "success";
    form.reset();
  });
}