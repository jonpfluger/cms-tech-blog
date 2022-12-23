const editPost = document.getElementById('editPost')


const handleSubmit = (event) => {
    event.preventDefault()

    const {
        title: titleInput,
        content: contentInput,
      } = event.target.elements
    
      const updatedPost = {
        title: titleInput.value,
        content: contentInput.value
      }

    const blogId = event.target.dataset.blogid

    fetch(`/api/blogs/${blogId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedPost)
      })
      .then(response => {
        if (response.status === 200) {
          window.location.href = '/dashboard'
        }
      })
      .catch(err => console.log(err))
}

editPost.addEventListener('submit', handleSubmit)