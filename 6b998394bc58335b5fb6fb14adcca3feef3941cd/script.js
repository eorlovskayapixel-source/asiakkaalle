
async function sha1(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-1", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function login() {
  const password = document.getElementById("password").value;
  const hash = await sha1(password);

  
const repoName = window.location.pathname.split('/')[1];

  window.location.href = `/${repoName}/${hash}/index.html`;

}
