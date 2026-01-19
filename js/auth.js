
function checkAuth() {
  const user = localStorage.getItem('user');
  const isLoginPage = window.location.pathname.includes('index.html') || window.location.pathname === '/';

  if (!user && !isLoginPage) {
      window.location.href = 'index.html';
  } else if (user && isLoginPage) {
      window.location.href = 'dashboard.html';
  }
}

function login(email, password) {
  if(email === 'admin@school.com' && password === 'admin') {
      localStorage.setItem('user', JSON.stringify({ email }));
      window.location.href = 'dashboard.html';
  } else {
      alert('Invalid credentials! (Try: admin@school.com / admin)');
  }
}

function logout() {
  localStorage.removeItem('user');
  window.location.href = 'index.html';
}

checkAuth();