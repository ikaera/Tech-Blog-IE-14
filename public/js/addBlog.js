async function addBlogFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="blog-title"]').value;
  const blogContent = document
    .querySelector('textarea[name="blog-content"]')
    .value.trim();

  const response = await fetch(`/api/posts`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      blogContent: blogContent,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.replace('../dashboard');
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector('.new-blog-form')
  .addEventListener('submit', addBlogFormHandler);
