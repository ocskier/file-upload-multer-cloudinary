$(document).ready(function () {
  // fix menu when passed
  $('.masthead').visibility({
    once: false,
    onBottomPassed: function () {
      $('.fixed.menu').transition('fade in');
    },
    onBottomPassedReverse: function () {
      $('.fixed.menu').transition('fade out');
    },
  });

  // create sidebar and attach to menu open
  $('.ui.sidebar').sidebar('attach events', '.toc.item');
  $('.ui.form')
    .form({
      fields: {
        email: {
          identifier: 'email',
          rules: [
            {
              type: 'empty',
              prompt: 'Please enter your e-mail',
            },
            {
              type: 'email',
              prompt: 'Please enter a valid e-mail',
            },
          ],
        },
        password: {
          identifier: 'password',
          rules: [
            {
              type: 'empty',
              prompt: 'Please enter your password',
            },
            {
              type: 'length[6]',
              prompt: 'Your password must be at least 6 characters',
            },
          ],
        },
      },
    })
    .submit(async (e) => {
      e.preventDefault();
      $(e.target).toggleClass('loading');
      const userCreds = {
        email: $('input[name="email"]').val().trim(),
        password: $('input[name="password"]').val().trim(),
      };
      for (cred in userCreds) {
        if (!userCreds[cred]) {
          $(e.target).toggleClass('loading');
          return;
        }
      }

      try {
        const response = await fetch('/auth/users/login', {
          method: 'POST',
          body: JSON.stringify(userCreds),
          headers: {
            'CONTENT-TYPE': 'application/json',
          },
        });
        const data = await response.json();
        console.log(data);
        showToast('Successfully logged in!', 1500);
        setTimeout(() => {
          location.replace('/');
        }, 1500);
      } catch (error) {
        console.log(error);
        showToast(error, 3000, 'error');
      } finally {
        e.target.reset();
        $(e.target).toggleClass('loading');
      }
    });
});
