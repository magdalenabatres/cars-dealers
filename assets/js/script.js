function toggleMenu() {
  const popup = document.querySelector(".nav__popup");
  const overlay = document.querySelector(".nav__overlay");

  popup.classList.toggle("open");

  overlay.style.display = popup.classList.contains("open")
    ? "block"
    : "none";
}

window.searchCars = function () {
  const query = document.getElementById("searchInput").value.trim();

  if (!query) {
    alert("Please enter a search term");
    return;
  }
  window.location.href = `cars.html?search=${encodeURIComponent(query)}`;
};


// ================= MODAL ================= //

function openContact() {
  document.getElementById("contactModal").classList.add("active");
}

function closeContact() {
  document.getElementById("contactModal").classList.remove("active");
}

function contactmodal_funtion() {
  const contact = document.getElementById("email-contact");
  if (!contact) return;

  contact.innerHTML = `
      <button class="close-contact" onclick="closeContact()">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 512 512">
          <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-96-96c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224H192c-17.7 0-32 14.3-32 32s14.3 32 32 32h210.7l-41.4 41.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l96-96zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96C43 32 0 75 0 128v256c0 53 43 96 96 96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H96c-17.7 0-32-14.3-32-32V128c0-17.7 14.3-32 32-32h64z"/>
        </svg>
      </button>

      <h2>Contact Us</h2>

      <form class="contact-form" onsubmit="contact(event)">
        <input name="user_name" class="input" type="text" placeholder="Your Name" required>
        <input name="user_email" class="input" type="email" placeholder="Your Email" required>
        <textarea name="message" class="input" placeholder="Your Message" required></textarea>
        <button type="submit" class="btn">Send</button>
      </form>

      <div class="modal__overlay--loading">Sending...</div>
      <div class="modal__overlay--success">Message sent!</div>
  `;
}

function contact(event) {
  event.preventDefault();

  const loading = document.querySelector('.modal__overlay--loading');
  const success = document.querySelector('.modal__overlay--success');

  loading.classList.add("modal__overlay--visible");

  emailjs
    .sendForm(
      'service_3q6uuo8',
      'template_rcq3p4k',
      event.target,
      'DVVDqozF-3nCdhRdl'
    )
    .then(() => {
      loading.classList.remove("modal__overlay--visible");
      success.classList.add("modal__overlay--visible");
      closeContact();
    })
    .catch(() => {
      loading.classList.remove("modal__overlay--visible");
      alert("The email service is temporarily unavailable. Please contact me directly at magdalena.batres@gmail.com");
    });
}


function loadEmailJS(callback) {
  // Si ya está cargado, no lo cargamos otra vez
  if (window.emailjs) {
    callback();
    return;
  }

  const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";

  script.onload = () => {
    emailjs.init("DVVDqozF-3nCdhRdl");
    callback();
  };

  document.body.appendChild(script);
}