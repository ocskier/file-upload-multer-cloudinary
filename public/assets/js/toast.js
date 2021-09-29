const showToast = (msg, duration, type) => {
  Toastify({
    text: msg,
    duration: duration,
    close: true,
    gravity: 'top', // `top` or `bottom`
    position: 'center', // `left`, `center` or `right`
    className: type === 'error' ? 'custom-error' : 'success',
    stopOnFocus: true, // Prevents dismissing of toast on hover
    // onClick: function () {}, // Callback after click
  }).showToast();
};
