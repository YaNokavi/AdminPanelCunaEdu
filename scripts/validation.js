document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    document.querySelectorAll(".is-invalid").forEach((el) => {
      el.classList.remove("border-red-500", "is-invalid");
    });
    document.querySelectorAll(".error-text").forEach((el) => el.remove());

    let isValid = true;

    const nameInput = document.getElementById("name");
    const nameValue = nameInput.value.trim();

    if (nameValue === "") {
      showError(nameInput, "Введите ваше имя");
      isValid = false;
    } else if (
      nameValue.split(" ").filter((word) => word.length > 0).length < 2
    ) {
      showError(nameInput, "Введите имя и фамилию (минимум 2 слова)");
      isValid = false;
    }

    const emailInput = document.getElementById("email");
    const emailValue = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailValue === "") {
      showError(emailInput, "Введите email");
      isValid = false;
    } else if (!emailPattern.test(emailValue)) {
      showError(
        emailInput,
        "Введите корректный email (например, example@mail.ru)",
      );
      isValid = false;
    }

    const topicInput = document.getElementById("topic");
    if (!topicInput.value) {
      showError(topicInput, "Выберите тему обращения");
      isValid = false;
    }

    const messageInput = document.getElementById("message");
    if (messageInput.value.trim() === "") {
      showError(messageInput, "Введите текст сообщения");
      isValid = false;
    }

    const consentInput = document.getElementById("consent");
    if (!consentInput.checked) {
      showError(
        consentInput,
        "Необходимо согласие на обработку персональных данных",
      );
      isValid = false;
    }

    if (isValid) {
      const formData = {
        name: nameValue,
        email: emailValue,
        topic: topicInput.options[topicInput.selectedIndex].text,
        message: messageInput.value.trim(),
        consent: consentInput.checked,
      };

      const customEvent = new CustomEvent("formValid", { detail: formData });
      document.dispatchEvent(customEvent);

      form.classList.add("hidden");
      document.getElementById("form-success").classList.remove("hidden");
    }
  });

  function showError(input, message) {
    input.classList.add("border-red-500", "is-invalid");
    const help = document.createElement("p");
    help.classList.add("text-red-500", "text-xs", "mt-1", "error-text");
    help.textContent = message;

    if (input.type === "checkbox") {
      input.parentElement.insertAdjacentElement("afterend", help);
    } else {
      input.parentElement.appendChild(help);
    }
  }

  document.querySelectorAll("input, select, textarea").forEach((input) => {
    input.addEventListener("input", removeError);
    input.addEventListener("change", removeError);
  });

  function removeError() {
    if (this.classList.contains("is-invalid")) {
      this.classList.remove("border-red-500", "is-invalid");

      const errors = this.parentNode.querySelectorAll(".error-text");
      errors.forEach((el) => el.remove());

      const nextElement = this.parentNode.nextElementSibling;
      if (nextElement && nextElement.classList.contains("error-text")) {
        nextElement.remove();
      }
    }
  }
});
