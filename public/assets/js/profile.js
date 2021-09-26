const photoFormSubmit = document.querySelector('.photo-form .ui.submit.button');
const photoFileInput = document.querySelector('#file-upload');
let preview = document.querySelector('.ui.card .image');

const fileReader = new FileReader();
fileReader.onload = function (e) {
  preview.childNodes[1].setAttribute('src', e.target.result);
};

const handleFileChange = (e) => {
  fileReader.readAsDataURL(photoFileInput.files[0]);
};

const handleFileSubmit = (e) => {
  photoFormSubmit.classList.toggle('loading');
  e.preventDefault(); // not really needed here but good form
  handleFileUpload(photoFileInput.files);
};

const handleFileUpload = async (files) => {
  console.log(files[0]);
  const multiFormData = new FormData();
  multiFormData.append('image-file', photoFileInput.files[0]);
  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: multiFormData,
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  } finally {
    photoFormSubmit.classList.toggle('loading');
  }
};

const drop = (e) => {
  e.stopPropagation();
  e.preventDefault();

  const dt = e.dataTransfer;
  const files = dt.files;
  photoFileInput.files = files;
  preview.style.color = 'transparent';
  fileReader.readAsDataURL(files[0]);
};

const dragenter = (e) => {
  e.stopPropagation();
  e.preventDefault();
};

const dragleave = (e) => {
  e.stopPropagation();
  e.preventDefault();
  preview.style.backgroundColor = 'transparent';
};

const dragover = (e) => {
  e.stopPropagation();
  e.preventDefault();
  preview.style.backgroundColor = 'grey';
};

preview.addEventListener('dragenter', dragenter, false);
preview.addEventListener('dragleave', dragleave, false);
preview.addEventListener('dragover', dragover, false);
preview.addEventListener('drop', drop, false);
photoFileInput.addEventListener('change', handleFileChange);
photoFormSubmit.addEventListener('click', handleFileSubmit);
