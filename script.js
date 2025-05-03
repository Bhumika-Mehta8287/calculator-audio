let display = document.getElementById('display');
let voiceToggleBtn = document.getElementById('voiceToggleBtn');
let voiceOn = true; // default state

// Toggle voice when button is clicked
voiceToggleBtn.addEventListener('click', () => {
  voiceOn = !voiceOn;
  voiceToggleBtn.innerText = voiceOn ? '🔊 Voice: ON' : '🔇 Voice: OFF';
});

function speak(text) {
  if (voiceOn) {
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = 'en-IN';
    speechSynthesis.speak(msg);
  }
}

function append(value) {
  if (display.innerText === '0' || display.innerText === 'Error') {
    display.innerText = value;
  } else {
    display.innerText += value;
  }
  speak(value);
}

function clearDisplay() {
  display.innerText = '0';
  speak("Cleared");
}

function deleteLast() {
  let newText = display.innerText.slice(0, -1) || '0';
  display.innerText = newText;
  speak("Deleted");
}

function calculate() {
  try {
    let expression = display.innerText.replace('÷', '/').replace('×', '*');
    let result = eval(expression);
    display.innerText = result;
    speak("Result is " + result);
  } catch {
    display.innerText = 'Error';
    speak("Error");
  }
}
