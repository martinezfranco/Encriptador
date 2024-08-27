function selectID(id) {
  return document.getElementById(id);
}

const ui = {
  inputText: selectID("input_text"),
  outputText: selectID("output_text"),
  outputTextBox: selectID("output_text_box"),
  outputImageBox: selectID("output_image_box"),
  encryptButton: selectID("encrypt_button"),
  desencryptButton: selectID("desencrypt_button"),
  clipboardCopyButton: selectID("clipboard_copy_button"),
};

/* It sets the focus on the input text. */
ui.inputText.focus();

/* A dictionary that contains the letters that will be replaced. */
var cryptoDictionary = {
  a: "ai",
  e: "enter",
  i: "imes",
  o: "ober",
  u: "ufat",
};

/**
 * It takes a string and a dictionary as arguments, and returns a string where each
 * character in the original string is replaced by the value of the key in the
 * dictionary that matches the character.
 */
function encrypt(text) {
  let encryptedText = "";

  for (let iLetter = 0; iLetter < text.length; iLetter++) {
    let currentLetter = text[iLetter];

    encryptedText +=
      cryptoDictionary[currentLetter] === undefined
        ? currentLetter
        : cryptoDictionary[currentLetter];
  }

  return encryptedText;
}

/**
 * It replaces the encrypted letters with the original letters
 */
function desencrypt(encryptedText) {
  let desencryptedText = encryptedText;

  for (let key in cryptoDictionary) {
    desencryptedText = desencryptedText.replaceAll(cryptoDictionary[key], key);
  }

  return desencryptedText;
}

function isBasicLowerCase(text) {
  return text.match(/^[a-z ]+$/) ? true : false;
}

/**
 * It takes a function as an argument, and if the input is valid, it calls the
 * function and displays the result.
 * @param action - a function that takes a string and returns a string
 */
function setIfIsValid(action) {
  const text = ui.inputText.value;

  let isEmpty = text.trim() === "";

  let errorMessage =
    "Entrada invalida:\nEscriba en minúsculas, sin acentos y evite usar caracteres especiales";

  ui.inputText.value = isBasicLowerCase(text) ? "" : ui.inputText.value;
  ui.outputText.value = isBasicLowerCase(text) ? action(text) : errorMessage;

  if (isEmpty) {
    ui.outputImageBox.classList.remove("inactive");
  } else {
    ui.outputImageBox.classList.add("inactive");
  }

  ui.outputTextBox.style.display = isEmpty ? "none" : "flex";
}

ui.encryptButton.onclick = () => setIfIsValid(encrypt);

ui.desencryptButton.onclick = () => setIfIsValid(desencrypt);

/**
 * If the browser supports the Clipboard API, use it. Otherwise, fall back to the
 * old method
 */
function copyToClipboard() {
  ui.outputText.select();

  const text = ui.outputText.value;
  navigator.clipboard.writeText(text).then(
    () => {
      alert("Texto copiado correctamente.");
    },
    () => {
      copyToClipboardOld();
    }
  );
}

/**
 * The function first selects the text in the textarea, then tries to copy it to
 * the clipboard. If it fails, it alerts the user
 */
function copyToClipboardOld() {
  try {
    var successful = document.execCommand("copy");
    var msg = successful ? "fue satisfactoria." : "falló.";
    alert("La copia del texto " + msg);
  } catch (err) {
    alert("Ups! hubo un problema: ", err);
  }
}

ui.clipboardCopyButton.onclick = copyToClipboard;
