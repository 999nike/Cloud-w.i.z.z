async function sendMessage() {
  const message = document.getElementById('message').value;
  const responseElement = document.getElementById('response');
  try {
    const res = await fetch('/api?msg=' + encodeURIComponent(message));
    const text = await res.text();
    responseElement.textContent = text;
  } catch (err) {
    responseElement.textContent = 'Error: ' + err;
  }
}
