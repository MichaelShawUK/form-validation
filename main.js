import * as dom from "./dom.js";
import countries from "./countries.js";

function createCountryList() {
  countries.forEach((country) => {
    let optionNode = document.createElement("option");
    optionNode.append(country);
    dom.datalist.append(optionNode);
  });
}

function checkCountryInput(e) {
  if (countries.includes(e.target.value) || e.target.value === '') {
    dom.country.classList.remove('invalid-input');
    dom.countryError.textContent = '';
  } else if (!countries.includes(e.target.value)) {
    dom.country.classList.add('invalid-input');
    dom.countryError.textContent = 'Please select a country from the list';
  }
}

function checkPostCodeInput() {
  if (dom.postCode.validity.valid) {
    dom.postCodeError.textContent = '';
  } else {
    dom.postCodeError.textContent = 'Please enter a valid UK post code';
  }
}

function checkPwdConfirmInput() {
  if (dom.pwdConfirm.value === '' || dom.pwdConfirm.value === dom.pwd.value) {
    dom.pwdConfirm.classList.remove('invalid-input');
    dom.confirmPwdError.textContent = '';
  } else if (dom.pwdConfirm.value !== dom.pwd.value) {
    dom.pwdConfirm.classList.add('invalid-input');
    dom.confirmPwdError.textContent = 'Please enter a matching password';
  }
}

function intializeListeners() {
  dom.email.addEventListener("focusout", () => {
    if (dom.email.validity.valid) {
      dom.emailError.textContent = '';
    } else {
      dom.emailError.textContent = 'Please enter a valid e-mail address';
    }
  });
  
  dom.postCode.addEventListener("focusout", () => {
    checkPostCodeInput();
    dom.postCode.addEventListener("input", () => {
      checkPostCodeInput();
    });
  });
  
  dom.country.addEventListener('focusout', e => {
    checkCountryInput(e);
    dom.country.addEventListener('input', e => {
      checkCountryInput(e);
    })
  });
  
  dom.pwdConfirm.addEventListener('focusout', () => {
    checkPwdConfirmInput();
      dom.pwdConfirm.addEventListener('input', () => {
        checkPwdConfirmInput();
      })
  })
  
  dom.submitBtn.addEventListener('click', () => {
    if (dom.form.checkValidity() && 
        dom.country.classList.length === 0 && 
        dom.pwdConfirm.classList.length === 0) {
      alert('Success!');
    } else {
      alert('Failed!');
    }
  })
}

createCountryList();
intializeListeners();
