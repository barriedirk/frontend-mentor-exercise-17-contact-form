import { $, removeErrors, addErrorSpan, handleChange } from "./utils.js";

(async () => {
  const $form = $("#contact_us");
  const $toast = $("#toast");

  [
    'input[name="first_name"]',
    'input[name="last_name"]',
    'input[name="email"]',
    'input[name="query_type"]',
    'textarea[name="message"]',
    'input[name="consent"]',
  ].forEach((selector) =>
    $form.querySelectorAll(selector).forEach((el) => {
      el.addEventListener("change", handleChange);

      if (
        el.tagName === "INPUT" &&
        (el.type === "checkbox" || el.type === "radio")
      ) {
        el.checked = false;
      } else {
        el.value = "";
      }
    })
  );

  removeErrors($form);

  $form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    evt.stopPropagation();

    removeErrors($form);

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const formDataRaw = new FormData(evt.target);
    const formData = Object.fromEntries(formDataRaw.entries());

    let isValid = true;

    ["first_name", "last_name", "message", "email"].forEach((name) => {
      formData[name] = formData[name]?.trim() || "";

      if (formData[name] === "") {
        isValid = false;
        addErrorSpan(
          name,
          "This field is required",
          name === "message" ? "textarea" : "input"
        );
      }
    });

    formData["consent"] = formData["consent"]?.trim() || "";
    formData["query_type"] = formData["query_type"]?.trim() || "";

    if (!regexEmail.test(formData["email"])) {
      isValid = false;
      addErrorSpan("email", "Please enter a valid email address");
    }

    if (formData["consent"] === "") {
      isValid = false;
      addErrorSpan(
        "consent",
        "To submit this form, please consent to being contacted"
      );
    }

    if (formData["query_type"] === "") {
      isValid = false;
      addErrorSpan("query_type", "Please select a query type");
    }

    if (!isValid) return;

    $toast.classList.remove("hidden");

    setTimeout(() => {
      $toast.classList.add("hidden");
    }, 3000);
  });
})();
