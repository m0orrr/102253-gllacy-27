var link = document.querySelector(".form-link");

var modalWrapper = document.querySelector(".modal-wrapper");
var modalLogin = modalWrapper.querySelector(".modal-login");
var modalClose = modalWrapper.querySelector(".modal-close-btn");

var formFeedback = modalLogin.querySelector("form");
var nameFeedback = formFeedback.querySelector("[name=name]");
var emailFeedback = formFeedback.querySelector("[name=email]");
var messageFeedback = formFeedback.querySelector("[name=message]");

var isStorageSupport = true;
var storageName = "";
var storageEmail = "";

try {
  storageName = localStorage.getItem("name");
  storageEmail = localStorage.getItem("email");
} catch (err) {
  isStorageSupport = false;
}

link.addEventListener("click", function(evt) {
  evt.preventDefault();
  modalWrapper.classList.add("modal-show");
  modalLogin.classList.add("modal-bounce");
  if (storageName) {
    nameFeedback.value = storageName;
    emailFeedback.focus();
  }
  if (storageEmail) {
    emailFeedback.value = storageEmail;
    messageFeedback.focus();
  } else {
    nameFeedback.focus();
  }
});

modalClose.addEventListener("click", function() {
  modalWrapper.classList.remove("modal-show");
  modalLogin.classList.remove("modal-bounce");
  modalLogin.classList.remove("modal-error");
});

formFeedback.addEventListener("submit", function(evt) {
  if (!nameFeedback.value || !emailFeedback.value) {
    evt.preventDefault();
    modalLogin.classList.remove("modal-error");
    modalLogin.offsetWidth = modalLogin.offsetWidth;
    modalLogin.classList.add("modal-error");
  } else {
    if (isStorageSupport) {
      localStorage.setItem("name", nameFeedback.value);
      localStorage.setItem("email", emailFeedback.value);
    }
  }
});

window.addEventListener("keydown", function(evt) {
  if (evt.keyCode == 27) {
    if (modalWrapper.classList.contains("modal-show")) {
      console.log(evt.keyCode);
      evt.preventDefault();
      modalWrapper.classList.remove("modal-show");
      modalLogin.classList.remove("modal-bounce");
      modalLogin.classList.remove("modal-error");
    }
  }
});