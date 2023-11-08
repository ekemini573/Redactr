const originalText = document.getElementById("original");
const wordsToRedact = document.getElementById("words");

document.getElementById("redactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  redactFunction();
});

const redactFunction = () => {
  let redactTextContainer = document.getElementById("redatedTextContainer");
  let redactOptionValue = document.getElementById("choice").value;
  let originalTextValue = originalText.value;
  let textError = document.getElementById("textError");
  let wordError = document.getElementById("wordError");

  // gets the words and turn them into strings
  // using map to trim for extra whitespaces
  const wordsToRedactValue = wordsToRedact.value
    .split(/[;,|]/)
    .map((e) => e.trim());

  let redact = originalTextValue;

  // turn the original words into strings
  let redactWords = redact.split(/[" ";,|]/);

  // check if they are upto 10 or empty
  if (!redact || redactWords.length <= 10) {
    textError.innerText = "Text should be more than 10.";
    setTimeout(() => {
      textError.innerText = "";
    }, 2000);
  } else {
    if (wordsToRedactValue) {
      // iterates through the word
      wordsToRedactValue.forEach((word) => {
        // check if the word is in the original words
        // replace anyone found
        if (redact.includes(word)) {
          let regexText = new RegExp(word, "gi");
          redact = redact.replace(regexText, redactOptionValue);
          redactTextContainer.innerHTML = `
      <p id="redatedText">
      <button class="copy-icon" id="copier">&#128203;</button>
      <span class="copy-message" id="copyMessage">Click to copy</span>
      ${redact}</p>
      `;
        } else {
          if (word.length > 1) {
            let words = word.split(",")
            wordError.innerText += `${words} is not found `;

            return;
          } else {
            wordError.innerText = `${word} is not found`;
            return;
          }
        }
        setTimeout(() => {
          wordError.innerText = "";
        }, 2000);
      });

      // check the redacted words and let the user copies it if they
      // double click in the container
      if (redact) {
        const copier = document.getElementById("copier");
        const copyMessage = document.getElementById("copyMessage");
        copier.addEventListener("mouseover", () => {
          copyMessage.style.display = "block";
        });
        copier.addEventListener("mouseout", () => {
          copyMessage.style.display = "none";
        });
        copier.addEventListener("click", () => {
          navigator.clipboard.writeText(redact);
          alert("Copied!👌");
        });
      }
    } else {
      wordError.innerText = `Words to be blurred out is empty`;
      setTimeout(() => {
        wordError.innerText = "";
      }, 2000);
    }
  }
};