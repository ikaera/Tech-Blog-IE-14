async function loginFormHandlerEvent(event) {
  event.preventDefault();

  const username = document.querySelector('#user-name-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (password && username) {
    const response = await fetch('/api/users/login', {
      method: 'post',
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      console.log(response.statusText);
    }
  }
}

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandlerEvent);
