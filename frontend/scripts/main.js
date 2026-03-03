(function () {
  const form = document.getElementById("course-search-form");
  const pinInput = document.getElementById("pin");
  const passwordInput = document.getElementById("password");
  const messageEl = document.getElementById("form-message");

  if (!form) {
    return;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const pin = pinInput.value.trim();
    const password = passwordInput.value.trim();

    messageEl.textContent = "";
    messageEl.className = "form__message";
    pinInput.parentElement.classList.remove("input-wrapper--error");
    passwordInput.parentElement.classList.remove("input-wrapper--error");

    if (!pin) {
      pinInput.parentElement.classList.add("input-wrapper--error");
      messageEl.textContent = "Введите PIN-код курса.";
      messageEl.classList.add("form__message--error");
      pinInput.focus();
      return;
    }

    if (!password) {
      passwordInput.parentElement.classList.add("input-wrapper--error");
      messageEl.textContent = "Введите пароль курса.";
      messageEl.classList.add("form__message--error");
      passwordInput.focus();
      return;
    }

    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Поиск...";
    }

    try {
      const response = await fetch("/api/course/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ pin, password }),
      });

      const data = await response.json().catch(() => ({}));
      const ok = data.ok ?? response.ok;

      if (!ok) {
        const text =
          data.message || "Курс не найден или указаны неверные данные.";
        messageEl.textContent = text;
        messageEl.classList.add("form__message--error");
        return;
      }

      const successText = data.message || "Курс найден. Перенаправляем...";
      messageEl.textContent = successText;
      messageEl.classList.add("form__message--success");

      if (data.redirectUrl) {
        setTimeout(() => {
          window.location.href = data.redirectUrl;
        }, 500);
      }
    } catch (e) {
      console.error(e);
      messageEl.textContent = "Ошибка сети. Попробуйте ещё раз.";
      messageEl.classList.add("form__message--error");
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Найти курс";
      }
    }
  }

  form.addEventListener("submit", handleSubmit);
})();
