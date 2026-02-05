const passwordInput = document.getElementById('password');
const strengthText = document.getElementById('strengthText');

passwordInput.addEventListener('input', function() {
  const password = passwordInput.value;

  checkStrength(password);
});

function checkStrength(password) {
  let score = 0;

  //Check if length is greater than 8
  if (password.length >= 8) score++;

  //Check for uppercase letters
  if(/[A-Z]/.test(password)) score++;

  //Check for lowercase letters
  if(/[a-z]/.test(password)) score++;

  //Check for numbers
  if(/[0-9]/.test(password)) score++;

  //Check for special characters
  if(/[\W]/.test(password)) score++;
  displayStrength(score);

  updateDisplay(score);
}

function updateDisplay(score) {
  let strength = '';
  switch(score) {
    case 0:
    case 1:
      strength = 'Very Weak';
      break;
    case 2:
      strength = 'Weak';
      break;
    case 3:
      strength = 'Moderate';
      break;
    case 4:
      strength = 'Strong';
      break;
    case 5:
      strength = 'Very Strong';
      break;
  }
  strengthText.textContent = `Password Strength: ${strength}`;
}

function displayStrength(score) {
  strengthText.textContent = `Password Strength Score: ${score}/5`;
}
  
//try