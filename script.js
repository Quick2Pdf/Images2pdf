document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("imgInput");
  const btn = document.getElementById("convertBtn");

  if (input && btn) {
    btn.addEventListener("click", () => {
      const files = input.files;
      if (!files.length) {
        alert("Please upload image files.");
        return;
      }

      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF();

      let count = 0;
      Array.from(files).forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = function (e) {
          const img = new Image();
          img.onload = function () {
            const width = pdf.internal.pageSize.getWidth();
            const height = (img.height * width) / img.width;

            if (index > 0) pdf.addPage();
            pdf.addImage(img, "JPEG", 0, 0, width, height);

            count++;
            if (count === files.length) {
              pdf.save("images.pdf");
            }
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      });
    });
  }
});
