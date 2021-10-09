const loadUserData = async () => {
  try {
    const response = await fetch('/auth/users');
    const user = await response.json();
    if (location.pathname === '/' && response.status < 400) {
      Array.from(document.querySelectorAll('a[href*="logout"]')).forEach((el) => {
        el.style.setProperty('display', 'inline-block', 'important');
      });
    } else if (location.pathname === '/' && response.status >= 400) {
      Array.from(document.querySelectorAll('a[href*="login"]')).forEach((el) => {
        el.style.setProperty('display', 'inline-block', 'important');
      });
    } else {
      circularProfile.setAttribute(
        'src',
        user?.image
          ? user?.image
          : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToplStyx8pu0DsUkR-zSI6hAAN-vzcrZF0HA&usqp=CAU'
      );
      console.log(user);
      circularProfile.nextElementSibling.childNodes[2].textContent = user.full;
      circularProfile.nextElementSibling.nextElementSibling.childNodes[2].textContent =
        user.email;
    }
  } catch (err) {
    console.log(err);
  }
};

loadUserData();
