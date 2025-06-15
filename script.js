// script.js const dropArea = document.getElementById('dropArea'); const imageInput = document.getElementById('imageInput'); const preview = document.getElementById('preview'); const pdfName = document.getElementById('pdfName'); const darkToggle = document.getElementById('darkToggle');

let images = [];

dropArea.addEventListener('dragover', (e) => { e.preventDefault(); dropArea.style.borderColor = '#007BFF'; });

dropArea.addEventListener('dragleave', () => { dropArea.style.borderColor = '#ccc'; });

dropArea.addEventListener('drop', (e) => { e.preventDefault(); dropArea.style.borderColor = '#ccc'; const files = Array.from(e.dataTransfer.files); handleFiles(files); });

imageInput.addEventListener('change', (e) => { const files = Array.from(e.target.files); handleFiles(files); });

darkToggle.addEventListener('click', () => { document.body.classList.toggle('dark-mode'); });

function handleFiles(files) { files.forEach(file => { if (file.type.startsWith('image/')) { const reader = new FileReader(); reader.onload = (e) => { const img = document.createElement('img'); img.src = e.target.result; preview.appendChild(img); images.push(e.target.result); }; reader.readAsDataURL(file); } }); }

async function generatePDF() { if (images.length === 0) return alert('Please upload at least one image.'); const { jsPDF } = window.jspdf; const pdf = new jsPDF();

for (let i = 0; i < images.length; i++) { const img = new Image(); img.src = images[i]; await new Promise(resolve => { img.onload = () => { const imgProps = pdf.getImageProperties(img); const pdfWidth = pdf.internal.pageSize.getWidth(); const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width; if (i !== 0) pdf.addPage(); pdf.addImage(images[i], 'JPEG', 0, 0, pdfWidth, pdfHeight); resolve(); }; }); } const name = pdfName.value.trim() || 'converted'; pdf.save(${name}.pdf); }

