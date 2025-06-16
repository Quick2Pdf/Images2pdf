function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

const preview = document.getElementById("preview");
const imageInput = document.getElementById("imageInput");
let images = [];

imageInput.addEventListener("change", function () {
  preview.innerHTML = "";
  images = [...this.files];
  images.forEach(file => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = document.createElement("img");
      img.src = e.target.result;
      preview.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
});

async function generatePDF() {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();
  for (let i = 0; i < images.length; i++) {
    const img = await loadImage(images[i]);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    const imgData = canvas.toDataURL("image/jpeg", 1.0);
    if (i > 0) pdf.addPage();
    pdf.addImage(imgData, 'JPEG', 10, 10, 190, 0);
  }
  const name = document.getElementById("pdfName").value || "Quick2PDF_Document.pdf";
  pdf.save(name);
}

function loadImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

function scrollToFeatures() {
  document.getElementById(\"features\").scrollIntoView({ behavior: 'smooth' });
  }
