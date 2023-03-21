async function signout() {
  const response = await fetch('/api/users/logout', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  // const result = await response.json();
  // console.log(result);
  if (response.ok) {
    document.location.replace('/');
  } else {
    console.log(response.statusText);
  }
}

document.querySelector('#logout').addEventListener('click', signout);
