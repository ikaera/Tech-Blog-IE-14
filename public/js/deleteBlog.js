async function deleteHandlerEvent(event) {
  event.preventDefault();

  const blodId = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  const response = await fetch(`/api/posts/${blodId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    console.log(response.statusText);
  }
}

document
  .querySelector('.delete-blog-button')
  .addEventListener('click', deleteHandlerEvent);
