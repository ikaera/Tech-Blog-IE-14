const commentFormHandlerEvent = async function (event) {
  event.preventDefault();

  const blogId = document.querySelector('input[name="blog-id"]').value;

  const commentContent = document.querySelector(
    'textarea[name="comment-body"]'
  ).value;

  if (commentContent) {
    await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        blogId,
        commentContent,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    document.location.reload();
  }
};

document
  .querySelector('.comment-form')
  .addEventListener('submit', commentFormHandlerEvent);
