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

const storagedData = localStorage.getItem(STORAGE_KEY);
const storagedDataParsed = JSON.parse(storagedData);

if (storagedDataParsed) {
  refs.email.value = storagedDataParsed.email;
  refs.textarea.value = storagedDataParsed.message;
}
// console.log(localStorage);

function onInputHandler(event) {
  const email = refs.email.value;
  const message = refs.textarea.value;
  localStorage.setItem(
    'feedback-form-state',
    JSON.stringify({ email, message })
  );
  //   feedbackDataStorage[event.target.name] = event.target.value;
  //   localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbackDataStorage));
}

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

// import throttle from 'lodash.throttle';

// const formEl = document.querySelector('.feedback-form');
// const emailEl = document.querySelector('[name = "email"]');
// const messageEl = document.querySelector('[name = "message"]');

// formEl.addEventListener('input', throttle(inputHandler, 500));
// formEl.addEventListener('submit', submitHandler);

// const savedData = localStorage.getItem('feedback-form-state');
// const parsedata = JSON.parse(savedData);

// if (parsedata) {
//   emailEl.value = parsedata.email;
//   messageEl.value = parsedata.message;
// }
// console.log(localStorage);

// function inputHandler() {
//   const email = emailEl.value;
//   const message = messageEl.value;
//   localStorage.setItem(
//     'feedback-form-state',
//     JSON.stringify({ email, message })
//   );
// }

// function submitHandler(event) {
//   event.preventDefault();
//   let email = event.target.elements.email.value;
//   let message = event.target.elements.message.value;

//   if (email === '' || message === '') {
//     return alert('please fill the form');
//   }

//   const data = { message, email };
//   console.log(data);

//   localStorage.removeItem('feedback-form-state');
//   formEl.reset();
// }
