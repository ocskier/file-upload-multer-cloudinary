const registerForm = document.querySelector('.register-form');

const handleRegister = async (files) => {
  const user = {};
  for (prop in user) {
      if (!user[prop]) {
          return
      }
  }

  try {
    const response = await fetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        "CONTENT-TYPE": 'application/json',
      },
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

registerForm.addEventListener('submit', handleRegister);
