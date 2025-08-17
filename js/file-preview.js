// file-preview.js
const mediaInput = document.getElementById("media");
const previewImages = document.getElementById("previewImage");
const fileURL = document.getElementById("fileURL");

mediaInput.addEventListener("change", () => {
  if (mediaInput.files.length > 0) {
    const file = mediaInput.files[0];
    const tempURL = URL.createObjectURL(file);
    fileURL.value = tempURL;
    if (file.type.startsWith("image/")) {
      previewImages.src = tempURL;
      previewImages.style.display = "block";
    } else {
      previewImages.style.display = "none";
    }
  } else {
    fileURL.value = "";
    previewImages.style.display = "none";
  }
});
