const idInstansInput = document.querySelector(".idInstance");
const apiTokenInstansInput = document.querySelector(".apiTokenInstans");
const outputText = document.querySelector(".output_text");

document
  .querySelector(".getSettings")
  .addEventListener("click", () => fetchApiData("getSettings"));
document
  .querySelector(".getStateInstans")
  .addEventListener("click", () => fetchApiData("getStateInstance"));
document
  .querySelector(".getSendMessage")
  .addEventListener("click", () => postApiData("sendMessage"));
document
  .querySelector(".getSendFileByUrl")
  .addEventListener("click", () => postApiData("sendFileByUrl"));

async function fetchApiData(method) {
  const idInstance = idInstansInput.value.trim();
  const apiTokenInstance = apiTokenInstansInput.value.trim();
  const url = `https://api.green-api.com/waInstance${idInstance}/${method}/${apiTokenInstance}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    outputText.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    outputText.textContent = `Error: ${error.message}`;
  }
}

async function postApiData(method) {
  const idInstance = idInstansInput.value.trim();
  const apiTokenInstance = apiTokenInstansInput.value.trim();
  const chatId = document.querySelector(".chatId").value.trim(); 
  const message = document.querySelector(".message").value.trim();
  const urlInput = document.querySelector(".url-input").value.trim(); 
  const fileNameInput = document.querySelector(".caption").value.trim(); 
  const url = `https://api.green-api.com/waInstance${idInstance}/${method}/${apiTokenInstance}`;

  let body;
  if (method === "sendMessage") {
    body = JSON.stringify({ chatId, message });
  } else if (method === "sendFileByUrl") {
    body = JSON.stringify({
      chatId: chatId,
      urlFile: urlInput,
      fileName: fileNameInput,
      caption: message,
    });
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
    const data = await response.json();
    outputText.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    outputText.textContent = `Error: ${error.message}`;
  }
}
