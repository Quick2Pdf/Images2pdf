<script>
  let images = [];

  document.getElementById('imageUpload').addEventListener('change', function (e) {
    images = Array.from(e.target.files);
    previewImages();
  });

  function previewImages() {
    const previewArea = document.getElementById('preview');
    previewArea.innerHTML = '';
    images.forEach(img => {
      const reader = new FileReader();
      reader.onload = function (e) {
        const imgEl = document.createElement('img');
        imgEl.src = e.target.result;
        imgEl.style.width = "150px";
        imgEl.style.margin = "10px";
        imgEl.style.borderRadius = "10px";
        previewArea.appendChild(imgEl);
      }
      reader.readAsDataURL(img);
    });
  }

  async function generatePDF() {
    if (images.length === 0) {
      alert("Please upload images first.");
      return;
    }

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    for (let i = 0; i < images.length; i++) {
      const imgData = await toBase64(images[i]);
      const img = new Image();
      img.src = imgData;
      await new Promise(resolve => {
        img.onload = () => {
          const width = pdf.internal.pageSize.getWidth();
          const height = (img.height * width) / img.width;
          if (i !== 0) pdf.addPage();
          pdf.addImage(img, 'JPEG', 0, 0, width, height);
          resolve();
        };
      });
    }

    const name = document.getElementById('renamePdf').value || 'converted';
    pdf.save(`${name}.pdf`);
  }

  function toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  // Dark Mode Toggle
  document.getElementById("darkModeToggle").addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
  });
</script>
