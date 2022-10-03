import throttle from 'lodash.throttle';

let feedbackDataStorage = {};

const STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input'),
  textarea: document.querySelector('textarea'),
  submit: document.querySelector('button'),
};

refs.form.addEventListener('input', throttle(onInputHandler, 500));
refs.form.addEventListener('submit', onSubmitHandler);

function onInputHandler(event) {
  const email = refs.email.value;
  const message = refs.textarea.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ email, message }));
  //   feedbackDataStorage[event.target.name] = event.target.value;
  //   localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbackDataStorage));
}

const storagedData = localStorage.getItem(STORAGE_KEY);
const storagedDataParsed = JSON.parse(storagedData);

if (storagedDataParsed) {
  refs.email.value = storagedDataParsed.email;
  refs.textarea.value = storagedDataParsed.message;
}

console.log(localStorage);

function onSubmitHandler(event) {
  event.preventDefault();
  const sentData = {
    email: refs.email.value,
    message: refs.textarea.value,
  };
  console.log(sentData);
  refs.form.reset();
  localStorage.removeItem(STORAGE_KEY);
  refs.email.value = '';
  refs.textarea.value = '';
}
