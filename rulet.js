const chambers = document.querySelectorAll('.chamber');
let bulletPosition = null;
let currentPosition = 0;
let spinning = false;
let bulletHidden = false;

// Zaman ve streak kontrolü
const LAST_PLAY_KEY = "rus-ruleti-last-play";
const STREAK_KEY = "rus-ruleti-streak";

function getStreak() {
  return parseInt(localStorage.getItem(STREAK_KEY)) || 0;
}

function setStreak(val) {
  localStorage.setItem(STREAK_KEY, val.toString());
}

function getLastPlay() {
  return parseInt(localStorage.getItem(LAST_PLAY_KEY)) || 0;
}

function setLastPlay(timestamp) {
  localStorage.setItem(LAST_PLAY_KEY, timestamp.toString());
}

function canPlayToday() {
  const now = Date.now();
  const last = getLastPlay();
  return now - last > 24 * 60 * 60 * 1000;
}

function showStreak() {
  const streak = getStreak();
  document.getElementById('result').innerText += `\n🔥 Streak: ${streak}`;
}

// Daire içine diz
function positionChambers() {
  const centerX = 150, centerY = 150, radius = 100;
  chambers.forEach((chamber, index) => {
    const angle = (index / 6) * 2 * Math.PI;
    const x = centerX + radius * Math.cos(angle) - 25;
    const y = centerY + radius * Math.sin(angle) - 25;
    chamber.style.left = `${x}px`;
    chamber.style.top = `${y}px`;

    chamber.addEventListener('click', () => {
      if (spinning) return;
      if (bulletHidden) return;  // Mermi gizliyse değiştirme!
      chambers.forEach(c => c.classList.remove('bullet'));
      bulletPosition = index;
      chamber.classList.add('bullet');
      document.getElementById('result').innerText = `💡 Mermi ${index + 1}. yuvaya yerleştirildi.`;
    });
  });
}

// Tamburu döndür (animasyonlu)
function spinChamber() {
  if (!canPlayToday()) {
    const hoursLeft = Math.ceil((24 * 60 * 60 * 1000 - (Date.now() - getLastPlay())) / (60 * 60 * 1000));
    alert(`Bugün oynadın! Lütfen ${hoursLeft} saat sonra tekrar dene.`);
    return;
  }

  if (bulletPosition === null) {
    alert("Önce mermiyi bir yuvaya yerleştir.");
    return;
  }

  if (spinning) return;
  spinning = true;
  bulletHidden = true;

  // Mermiyi gizle
  chambers.forEach(c => c.classList.remove('bullet'));

  let spins = Math.floor(Math.random() * 12) + 10;
  let i = 0;

  let interval = setInterval(() => {
    chambers.forEach(c => c.classList.remove('active'));
    chambers[i % 6].classList.add('active');
    currentPosition = i % 6;
    i++;
    if (i >= spins) {
      clearInterval(interval);
      spinning = false;
      document.getElementById('result').innerText = `🎯 Tambur döndü, pozisyon ${currentPosition + 1}`;
    }
  }, 100);
}

// Sık
function fire() {
  if (spinning) return;

  if (!canPlayToday()) {
    alert("Bugün zaten oynadın! Yarın tekrar gel.");
    return;
  }

  if (bulletPosition === null) {
    alert("Mermi yerleştirmedin.");
    return;
  }

  // Artık oynandı
  setLastPlay(Date.now());

  chambers.forEach(c => {
    c.classList.remove('active', 'bullet');
    c.style.background = '';
    c.style.borderColor = '#aaa';
  });

  chambers[currentPosition].classList.add('active');

  if (currentPosition === bulletPosition) {
    chambers[currentPosition].classList.add('bullet');
    chambers[currentPosition].style.background = 'red';
    document.getElementById('result').innerText = '💥 BANG! Vuruldun!\n💔 Streak sıfırlandı.';
    setStreak(0);
  } else {
    chambers[currentPosition].style.background = 'green';

    // Mermi nerede göster
    chambers[bulletPosition].classList.add('bullet');
    chambers[bulletPosition].style.borderColor = 'red';

    // Streak artır
    let current = getStreak();
    setStreak(current + 1);

    document.getElementById('result').innerText = `😅 Tık! Hayattasın.\n💡 Mermi ${bulletPosition + 1}. yuvadaydı.`;
    showStreak();

    setTimeout(() => {
      chambers[currentPosition].style.background = '';
      chambers[bulletPosition].style.borderColor = '#aaa';
    }, 1500);
  }
}

positionChambers();



