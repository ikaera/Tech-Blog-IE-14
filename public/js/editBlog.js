async function editFormHandlerEvent(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="blog-title"]').value;
  const blogContent = document
    .querySelector('textarea[name="blog-content"]')
    .value.trim();
  const blogId = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  const response = await fetch(`/api/posts/${blogId}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      blogContent: blogContent,
    }),
    headers: {
      ContentType: 'application/json',
    },
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    console.log(response.statusText);
  }
}

document
  .querySelector('.edit-blog-form')
  .addEventListener('submit', editFormHandlerEvent);
