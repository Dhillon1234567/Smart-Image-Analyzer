function analyzeImage() {
  const fileInput = document.getElementById("imageInput");
  const output = document.getElementById("output");

  if (!fileInput.files[0]) {
    alert("Please select an image");
    return;
  }

  const file = fileInput.files[0];
  const formData = new FormData();
  formData.append("file", file);
  formData.append("apikey", "helloworld"); // OCR.space test API key
  formData.append("OCREngine", 2); // Better accuracy

  output.innerText = "Analyzing image...";

  // Display preview
  const reader = new FileReader();
  reader.onload = function (e) {
    document.getElementById("preview").innerHTML = `<img src="${e.target.result}" />`;
  };
  reader.readAsDataURL(file);

  // Call OCR API
  fetch("https://api.ocr.space/parse/image", {
    method: "POST",
    body: formData
  })
    .then(res => res.json())
    .then(data => {
      const parsedText = data.ParsedResults?.[0]?.ParsedText || "No text found.";
      output.innerText = `Text Found:\n${parsedText}`;
    })
    .catch(err => {
      output.innerText = "Error analyzing image.";
      console.error(err);
    });
}
