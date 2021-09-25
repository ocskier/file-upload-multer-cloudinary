const loginForm = document.querySelector('.login-form');

const handleLogin = async (e) => {
  const userCreds = {};
  for (cred in userCreds) {
    if (!userCreds[cred]) {
      return;
    }
  }

  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify(userCreds),
      headers: {
        "CONTENT-TYPE": 'application/json',
      }
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

loginForm.addEventListener('submit', handleLogin);
