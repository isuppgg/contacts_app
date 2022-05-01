document.addEventListener('DOMContentLoaded', () => {
  const body = {
    usernameEmail: 'iSupp',
    password: '21941',
  };
  fetch('http://localhost:8080/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
    .then(res => res.json())
    .then(data => console.log(data));
});
