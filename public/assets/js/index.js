const photoFormSubmit = document.querySelector(
  '.photo-form .ui.submit.button'
);
const photoFileInput = document.querySelector('#file-upload');

const fileReader = new FileReader();
fileReader.onload = function (e) {
    document
      .querySelector('.ui.card .image img')
      .setAttribute('src', e.target.result);
};

const handleFileChange = async (e) => {
    fileReader.readAsDataURL(photoFileInput.files[0]);
}

const handleFileSubmit = async (e) => {
    e.preventDefault(); // not really needed here but good form 
    console.log(photoFileInput.files[0]);
    const multiFormData = new FormData();
    multiFormData.append('image-file', photoFileInput.files[0]);
    try {
        const response = await fetch('/api/upload',{
            method: 'POST',
            body: multiFormData,
        });
        const data = await response.json();
        console.log(data);
    } catch(error) {
        console.log(error);
    }
}

photoFileInput.addEventListener('change', handleFileChange);
photoFormSubmit.addEventListener('click', handleFileSubmit);