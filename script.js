const passwordInput = document.getElementById('password');
const strengthText = document.getElementById('strengthText');
const veryWeak = new Audio('sounds/veryweak.mp3');
const weak = new Audio('sounds/weak.mp3');
const moderate = new Audio('sounds/moderate.mp3');
const strong = new Audio('sounds/strong.mp3');
const veryStrong = new Audio('sounds/verystrong.mp3');

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

function explode() {
  // Add shake animation to input
  passwordInput.classList.add('shake');

  // Wait 5 seconds before starting
  setTimeout(() => {
    // Flash the screen white
    document.body.style.backgroundColor = 'white';
    setTimeout(() => {
      document.body.style.backgroundColor = '';
    }, 100);

    // Create LOTS of explosions for 7 seconds
    let explosionCount = 0;
    const explosionInterval = setInterval(() => {
      // Create 3 explosions at once
      for(let i = 0; i < 3; i++) {
        const explosion = document.createElement('div');
        explosion.classList.add('explosion');
        explosion.style.left = Math.random() * 100 + '%';
        explosion.style.top = Math.random() * 100 + '%';
        document.body.appendChild(explosion);
        
        setTimeout(() => explosion.remove(), 1000);
      }
      
      explosionCount++;
      
      // Stop after 7 seconds (7000ms / 100ms = 70 explosions)
      if(explosionCount >= 70) {
        clearInterval(explosionInterval);
      }
    }, 100); // New explosion every 100ms

    // Clear input and show destroyed message after explosions (7 seconds)
    setTimeout(() => {
      passwordInput.value = '';
      strengthText.textContent = '';
      passwordInput.classList.remove('shake');
    }, 7000);
    
    // Clear the destroyed message
    setTimeout(() => {
      strengthText.textContent = '';
    }, 9000);
    
  }, 5000); // 5 second delay
}



function updateDisplay(score) {
  const password = passwordInput.value;
  const output = document.querySelector('.output');
  if(password === '' || password.length === 0) {
    strengthText.textContent = '';
    return;
  }

  let strength = '';
  switch(score) {
    case 0:
    case 1:
      strength = 'Very Weak 🥀💀';
      veryWeak.play();
      break;
    case 2:
      strength = 'Weak 🫵🫵';
      weak.play();
      break;
    case 3:
      strength = 'Moderate 🤢🫥';
      moderate.play();
      break;
    case 4:
      strength = 'Strong 💪👅';
      strong.play();
      break;
    case 5:
      strength = 'Very Strong 🌬️🥇';
      veryStrong.currentTime = 0;
      veryStrong.play();

      setTimeout(() => {
        explode();
      }, 500);
      break;
  }
  strengthText.textContent = `Password Strength: ${strength}`;
}

function displayStrength(score) {
  strengthText.textContent = `Password Strength Score: ${score}/5`;
}
  

//try