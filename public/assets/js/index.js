const photoFormSubmit = document.querySelector(
  '.photo-form .ui.submit.button'
);
const photoFileInput = document.querySelector('#file-upload');

const handleFileSubmit = async (e) => {
    e.preventDefault(); // not really needed here but good form 
    const photoFile = photoFileInput.files[0];
    console.log(photoFile);
}

photoFormSubmit.addEventListener('click', handleFileSubmit);