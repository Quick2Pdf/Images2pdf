const dropArea = document.getElementById('drop-area');
const imageInput = document.getElementById('images');
const preview = document.getElementById('preview');
let images = [];

imageInput.addEventListener('change', handleFiles);
dropArea.addEventListener('dragover', e => {
  e.preventDefault();
  dropArea.classList.add('dragover');
});
dropArea.addEventListener('dragleave', () => dropArea.classList.remove('dragover'));
dropArea.addEventListener('drop', e => {
  e.preventDefault();
  dropArea.classList.remove('dragover');
  handleFiles({ target: { files: e.dataTransfer.files } });
});

function handleFiles(event) {
  const files = Array.from(event.target.files);
  images = files;
  preview.innerHTML = '';
  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = e => {
      const img = document.createElement('img');
      img.src = e.target.result;
      preview.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
}

async function convertToPDF() {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();
  for (let i = 0; i < images.length; i++) {
    const img = await loadImage(images[i]);
    const imgProps = pdf.getImageProperties(img);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    if (i > 0) pdf.addPage();
    pdf.addImage(img, 'JPEG', 0, 0, pdfWidth, pdfHeight);
  }

  const fileName = document.getElementById('pdfName').value.trim() || 'converted.pdf';
  pdf.save(fileName);
}

function loadImage(file) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = e => resolve(e.target.result);
    reader.readAsDataURL(file);
  });
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
    }
