export const $ = (selector) => document.querySelector(selector);

export const $$ = (selector) => document.querySelectorAll(selector);

export const removeAriaInvalid = (el) => {
  el.removeAttribute("aria-invalid");
  el.removeAttribute("aria-describedby");
};

export const removeErrors = ($form) => {
  const $$listError = $$("span.form__error");
  const $$listClassInputError = $$(".form__input--error");
  const $$listGroupError = $$(".form__group--error");

  $$listError.forEach((span) => span.remove());
  $$listClassInputError.forEach((el) =>
    el.classList.remove("form__input--error")
  );
  $$listGroupError.forEach((el) => el.classList.remove("form__group--error"));

  $form.querySelectorAll("textarea").forEach((el) => removeAriaInvalid(el));
  ["text", "email"].forEach((type) => {
    $form.querySelectorAll(type).forEach((el) => removeAriaInvalid(el));
  });
  ["radio", "checkbox"].forEach((type) => {
    $form
      .querySelectorAll(`input[type='${type}']`)
      .forEach((el) => removeAriaInvalid(el));
  });
};

export const addErrorSpan = (name, message, tag = "input") => {
  const $input = $$(`${tag}[name="${name}"]`)[0];
  let $parent = $input.parentNode;

  while (!$parent.classList.contains("form__group")) {
    $parent = $parent.parentNode;
  }

  $parent.classList.add("form__group--error");

  const nameSpanError = `${name}_error_${crypto.randomUUID()}`;
  const spanError = document.createElement("span");

  spanError.classList.add("form__error");
  spanError.setAttribute("id", nameSpanError);
  spanError.textContent = message;

  $input.setAttribute("aria-invalid", "true");
  $input.setAttribute("aria-describedby", nameSpanError);
  $input.classList.add("form__input--error");

  $parent.appendChild(spanError);
};

export const handleChange = (evt) => {
  const $input = evt.target;
  let $parent = $input.parentNode;

  while (!$parent.classList.contains("form__group")) {
    $parent = $parent.parentNode;
  }

  $parent.classList.remove("form__group--error");

  $parent.querySelectorAll("span.form__error").forEach((el) => el.remove());

  $input.removeAttribute("aria-invalid");
  $input.removeAttribute("aria-describedby");
  $input.classList.remove("form__input--error");
};
