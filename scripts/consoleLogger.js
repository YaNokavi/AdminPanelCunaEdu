document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("formValid", function (event) {
    const formData = event.detail;

    console.clear();

    console.log("=== Новое обращение с формы ===");
    console.log("Имя (ФИО):", formData.name);
    console.log("Email:", formData.email);
    console.log("Тема:", formData.topic);
    console.log("Сообщение:", formData.message);
    console.log("Согласие на обработку ПД:", formData.consent ? "Да" : "Нет");

    const timestamp = new Date().toLocaleString();
    console.log("Время отправки:", timestamp);
    console.log("===============================");
  });
});
