const newPostHandler = async (event) => {
    // Stop the browser from submitting the form so we can do so with JavaScript
    event.preventDefault();
  
    // Gather the data from the form elements on the page
    const title = document.querySelector('#reviewTitle').value.trim();
    const content = document.querySelector('#body').value.trim();
  
    if (title && content) {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/')
      } else {
        alert('Failed to create post');
      }
    }
};

document
  .querySelector('#createPost')
  .addEventListener('submit', newPostHandler);