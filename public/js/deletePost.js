const dashboard = document.getElementById('dashboard')

dashboard.addEventListener('click', (event) => {
  let blogid = event.target.dataset.blogid
  if (event.target.matches('button')) {
    console.log(`${blogid}`)
    fetch(`/api/blogs/${blogid}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          window.location.href = '/dashboard'
        }
      })
      .catch(err => console.log(err))
  }
})