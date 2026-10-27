const envelope = document.getElementById("envelope");
const delivery = document.getElementById("delivery");
const intro = document.getElementById("intro");
const acceptDelivery = document.getElementById("acceptDelivery");
const declineDelivery = document.getElementById("declineDelivery");
const deliveryResponse = document.getElementById("deliveryResponse");
const bouquetButton = document.getElementById("bouquetButton");
const bouquetSvg = bouquetButton.querySelector(".sunflower-bouquet");
const bouquetModal = document.getElementById("bouquetModal");
const bouquetModalArtwork = document.getElementById("bouquetModalArtwork");
const closeBouquetModal = document.getElementById("closeBouquetModal");
const letter = document.getElementById("letter");
const closeLetter = document.getElementById("closeLetter");
const letterCard = document.getElementById("letterCard");
const letterFront = document.querySelector(".letter-front");
const letterBack = document.querySelector(".letter-back");
const messageQr = document.getElementById("messageQr");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const photoCounter = document.getElementById("photoCounter");
const closeLightbox = document.getElementById("closeLightbox");
const previousPhoto = document.getElementById("previousPhoto");
const nextPhoto = document.getElementById("nextPhoto");
const photoButtons = [...document.querySelectorAll(".photo-thumb")];
const petalLayer = document.getElementById("petalLayer");
const music = document.getElementById("bgMusic");
const volumeSlider = document.getElementById("volumeSlider");
music.volume = Number(volumeSlider.value) / 100;
const musicBtn = document.getElementById("musicBtn");
const musicText = document.getElementById("musicText");
const volumeText = document.getElementById("volumeText");
const musicHelp = document.getElementById("musicHelp");
const relationshipElapsed = document.getElementById("relationshipElapsed");
const openFlowerGame = document.getElementById("openFlowerGame");
const flowerGameModal = document.getElementById("flowerGameModal");
const closeFlowerGame = document.getElementById("closeFlowerGame");
const flowerGameField = document.getElementById("flowerGameField");
const flowerGameScore = document.getElementById("flowerGameScore");
const flowerGameMessage = document.getElementById("flowerGameMessage");
const startFlowerGame = document.getElementById("startFlowerGame");

const relationshipStart = new Date(2026, 7, 18);

function updateRelationshipElapsed() {
  const elapsedSeconds = Math.max(0, Math.floor((Date.now() - relationshipStart.getTime()) / 1000));
  const elapsed = {
    days: Math.floor(elapsedSeconds / 86400),
    hours: String(Math.floor((elapsedSeconds % 86400) / 3600)).padStart(2, "0"),
    minutes: String(Math.floor((elapsedSeconds % 3600) / 60)).padStart(2, "0"),
    seconds: String(elapsedSeconds % 60).padStart(2, "0"),
  };

  for (const [unit, value] of Object.entries(elapsed)) {
    relationshipElapsed.querySelector(`[data-elapsed-unit="${unit}"]`).textContent = value;
  }
}

updateRelationshipElapsed();
setInterval(updateRelationshipElapsed, 1000);

const flowers = ["🌸", "🌷", "🌼", "💗", "💕", "❤️"];
const deliveryMessages = [
  "น้าา รับไว้หน่อยนะ เค้าตั้งใจทำให้เลย 🥺💗",
  "ไม่รับจริงเหรอ เค้าอุตส่าห์ห่อใจตัวเองมาส่งด้วยนะ 🎁💕",
  "น้าาา นะ นะ นะ ได้ไหม รับของเค้าหน่อยน้าา 🥹",
  "แหนะจาไม่รับจริงๆเหรออ 🥺",
  "รับเถอะน้า แล้วเค้าจะแถมรอยยิ้มให้หนึ่งกองเลย 😊💗",
  "เค้ารอคำว่า “รับ” อยู่นะ ใจอ่อนให้กันหน่อยน้า 💓",
  "ไม่รับของก็ได้…แต่รับความคิดถึงจากเค้าไปก่อนได้ไหม 🥺",
  "อีกนิดเดียวเองนะ กดรับแล้วเปิดดูหน่อยน้าา 🌷",
];
let previousDeliveryMessageIndex = -1;

acceptDelivery.addEventListener("click", () => {
  delivery.hidden = true;
  intro.hidden = false;
  document.body.classList.add("intro-active");
  document.body.classList.add("bouquet-revealing");
  setTimeout(() => {
    document.body.classList.remove("bouquet-revealing");
  }, 3600);
});

declineDelivery.addEventListener("click", () => {
  let messageIndex;
  do {
    messageIndex = Math.floor(Math.random() * deliveryMessages.length);
  } while (messageIndex === previousDeliveryMessageIndex);

  previousDeliveryMessageIndex = messageIndex;
  deliveryResponse.textContent = deliveryMessages[messageIndex];
  deliveryResponse.hidden = false;
});

function openBouquetModal() {
  if (document.body.classList.contains("bouquet-revealing")) return;

  bouquetModalArtwork.appendChild(bouquetSvg);
  bouquetModal.hidden = false;
  bouquetModal.setAttribute("aria-hidden", "false");
  closeBouquetModal.focus();
}

function closeBouquet() {
  bouquetButton.appendChild(bouquetSvg);
  bouquetModal.hidden = true;
  bouquetModal.setAttribute("aria-hidden", "true");
  bouquetButton.focus();
}

bouquetButton.addEventListener("click", openBouquetModal);
closeBouquetModal.addEventListener("click", closeBouquet);
bouquetModal.addEventListener("click", (event) => {
  if (event.target === bouquetModal) closeBouquet();
});

// Falling flowers
function createPetal() {
  const petal = document.createElement("span");
  petal.className = "petal";
  petal.textContent = flowers[Math.floor(Math.random() * flowers.length)];

  const size = 13 + Math.random() * 18;
  const duration = 6 + Math.random() * 7;
  const sway = -80 + Math.random() * 160;

  petal.style.left = `${Math.random() * 100}%`;
  petal.style.fontSize = `${size}px`;
  petal.style.animationDuration = `${duration}s`;
  petal.style.setProperty("--sway", `${sway}px`);

  petalLayer.appendChild(petal);

  setTimeout(() => petal.remove(), duration * 1000 + 500);
}

setInterval(createPetal, 420);

for (let i = 0; i < 12; i++) {
  setTimeout(createPetal, i * 180);
}

// Letter
function openLetter() {
  if (envelope.classList.contains("open") || letter.classList.contains("show")) return;

  openFlowerGame.hidden = true;
  envelope.classList.add("open");

  setTimeout(() => {
    letter.classList.add("show");
    letter.setAttribute("aria-hidden", "false");
    burstFlowers();
  }, 200);

  startMusic();
}

function closeTheLetter() {
  letter.classList.remove("show");
  letter.setAttribute("aria-hidden", "true");

  setTimeout(() => {
    envelope.classList.remove("open");
    openFlowerGame.hidden = false;
  }, 350);
}

envelope.addEventListener("click", openLetter);

closeLetter.addEventListener("click", closeTheLetter);

let flowerGameScoreValue = 0;
let flowerGameSpawnTimer = null;
let flowerGameFlowerTimer = null;
let flowerGameMisses = 0;
let activeGameFlower = null;
let flowerGameRunning = false;
const gameFlowers = ["🌷", "🌼", "🌸", "🌻", "💐"];

function stopFlowerGame() {
  clearTimeout(flowerGameSpawnTimer);
  clearTimeout(flowerGameFlowerTimer);
  flowerGameSpawnTimer = null;
  flowerGameFlowerTimer = null;
  activeGameFlower = null;
  flowerGameRunning = false;
}

function updateFlowerGameLives() {
  for (let life = 1; life <= 3; life += 1) {
    document.getElementById(`flowerGameLife${life}`).classList.toggle("lost", life <= flowerGameMisses);
  }
}

function finishFlowerGame() {
  stopFlowerGame();
  flowerGameField.replaceChildren();
  flowerGameMessage.textContent = `เกมจบแล้ว! เก็บได้ ${flowerGameScoreValue} ดอก เก่งมากเลย 💐💗`;
  startFlowerGame.disabled = false;
  startFlowerGame.textContent = "เล่นอีกครั้ง 🔄";
}

function scheduleGameFlower() {
  if (!flowerGameRunning) return;

  const delay = Math.max(180, 520 - flowerGameScoreValue * 18);
  flowerGameSpawnTimer = setTimeout(spawnGameFlower, delay);
}

function missFlowerGame() {
  if (!flowerGameRunning) return;

  flowerGameMisses += 1;
  updateFlowerGameLives();
  if (flowerGameMisses >= 3) {
    finishFlowerGame();
    return;
  }

  flowerGameMessage.textContent = `อุ๊ย พลาดแล้ว! เหลืออีก ${3 - flowerGameMisses} ครั้งนะ 🥺`;
}

function spawnGameFlower() {
  if (!flowerGameRunning) return;

  const flower = document.createElement("button");
  flower.className = "game-flower";
  flower.type = "button";
  flower.textContent = gameFlowers[Math.floor(Math.random() * gameFlowers.length)];
  flower.setAttribute("aria-label", `เก็บดอกไม้ ${flower.textContent}`);
  flower.style.left = `${5 + Math.random() * 78}%`;
  flower.style.top = `${5 + Math.random() * 62}%`;
  activeGameFlower = flower;
  flower.addEventListener("click", () => {
    if (!flowerGameRunning || activeGameFlower !== flower) return;
    clearTimeout(flowerGameFlowerTimer);
    flowerGameFlowerTimer = null;
    flower.remove();
    activeGameFlower = null;
    flowerGameScoreValue += 1;
    flowerGameScore.textContent = String(flowerGameScoreValue);
    flowerGameMessage.textContent = flowerGameScoreValue >= 10
      ? "เร็วมากกก Kitty เก็บแทบไม่ทันแล้ว! 🌷✨"
      : "เก็บได้แล้ว! ดอกต่อไปกำลังมา 💗";
    scheduleGameFlower();
  });
  flowerGameField.appendChild(flower);

  const lifetime = Math.max(550, 1700 - flowerGameScoreValue * 55);
  flowerGameFlowerTimer = setTimeout(() => {
    if (activeGameFlower !== flower) return;
    flower.remove();
    activeGameFlower = null;
    flowerGameFlowerTimer = null;
    missFlowerGame();
    scheduleGameFlower();
  }, lifetime);
}

function startFlowerRound() {
  stopFlowerGame();
  flowerGameField.replaceChildren();
  flowerGameScoreValue = 0;
  flowerGameMisses = 0;
  flowerGameScore.textContent = "0";
  updateFlowerGameLives();
  flowerGameMessage.textContent = "เริ่มแล้ว! รีบแตะดอกไม้ก่อนหายไปนะ 🌸";
  flowerGameRunning = true;
  startFlowerGame.disabled = true;
  spawnGameFlower();
}

flowerGameField.addEventListener("click", (event) => {
  if (event.target.closest(".game-flower") || !flowerGameRunning) return;
  missFlowerGame();
});

function openFlowerGameModal() {
  openFlowerGame.hidden = true;
  flowerGameModal.hidden = false;
  flowerGameModal.setAttribute("aria-hidden", "false");
  startFlowerGame.focus();
}

function closeFlowerGameModal() {
  stopFlowerGame();
  flowerGameField.replaceChildren();
  flowerGameScoreValue = 0;
  flowerGameMisses = 0;
  flowerGameScore.textContent = "0";
  updateFlowerGameLives();
  flowerGameMessage.textContent = "พร้อมแล้วกดเริ่มเกมเลย 💗";
  startFlowerGame.disabled = false;
  startFlowerGame.textContent = "เริ่มเกม ✨";
  flowerGameModal.hidden = true;
  flowerGameModal.setAttribute("aria-hidden", "true");
  openFlowerGame.hidden = false;
  openFlowerGame.focus();
}

openFlowerGame.addEventListener("click", openFlowerGameModal);
closeFlowerGame.addEventListener("click", closeFlowerGameModal);
flowerGameModal.addEventListener("click", (event) => {
  if (event.target === flowerGameModal) closeFlowerGameModal();
});
startFlowerGame.addEventListener("click", startFlowerRound);

function flipLetterCard() {
  const isFlipped = !letterCard.classList.contains("flipped");

  if (isFlipped) {
    letterCard.style.height = `${letterFront.offsetHeight}px`;
    letterFront.hidden = true;
    letterBack.hidden = false;
  } else {
    letterFront.hidden = false;
    letterBack.hidden = true;
    letterCard.style.height = "";
  }

  letterCard.classList.toggle("flipped", isFlipped);
  letterFront.setAttribute("aria-hidden", String(isFlipped));
  letterBack.setAttribute("aria-hidden", String(!isFlipped));
  letterCard.setAttribute("aria-label", isFlipped ? "พลิกกลับด้านหน้า" : "พลิกไปด้านหลัง");
}

letterCard.addEventListener("click", flipLetterCard);
messageQr.addEventListener("click", (event) => event.stopPropagation());
letterCard.addEventListener("keydown", (event) => {
  if (event.target === letterCard && (event.key === "Enter" || event.key === " ")) {
    event.preventDefault();
    flipLetterCard();
  }
});

let activePhotoIndex = 0;
let lastPhotoTrigger = null;

function showPhoto(index) {
  activePhotoIndex = (index + photoButtons.length) % photoButtons.length;
  const image = photoButtons[activePhotoIndex].querySelector("img");
  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;
  photoCounter.textContent = `${activePhotoIndex + 1} / ${photoButtons.length}`;
}

function openPhoto(index, trigger) {
  lastPhotoTrigger = trigger;
  showPhoto(index);
  lightbox.classList.add("show");
  lightbox.setAttribute("aria-hidden", "false");
  closeLightbox.focus();
}

function closePhoto() {
  lightbox.classList.remove("show");
  lightbox.setAttribute("aria-hidden", "true");
  lastPhotoTrigger?.focus();
}

photoButtons.forEach((button, index) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    openPhoto(index, button);
  });
});

closeLightbox.addEventListener("click", closePhoto);
previousPhoto.addEventListener("click", () => showPhoto(activePhotoIndex - 1));
nextPhoto.addEventListener("click", () => showPhoto(activePhotoIndex + 1));
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closePhoto();
});

letter.addEventListener("click", (e) => {
  if (e.target === letter) closeTheLetter();
});

document.addEventListener("keydown", (e) => {
  if (!flowerGameModal.hidden && e.key === "Escape") {
    e.stopPropagation();
    closeFlowerGameModal();
    return;
  }

  if (!bouquetModal.hidden && e.key === "Escape") {
    e.stopPropagation();
    closeBouquet();
    return;
  }

  if (lightbox.classList.contains("show")) {
    if (e.key === "Escape") {
      e.stopPropagation();
      closePhoto();
    } else if (e.key === "ArrowLeft") {
      showPhoto(activePhotoIndex - 1);
    } else if (e.key === "ArrowRight") {
      showPhoto(activePhotoIndex + 1);
    }
    return;
  }

  if (e.key === "Escape") closeTheLetter();
});

// Music
async function startMusic() {
  try {
    await music.play();
    setMusicUI(true);
  } catch {
    musicHelp.classList.add("show");
    setTimeout(() => musicHelp.classList.remove("show"), 3500);
  }
}

function setMusicUI(isPlaying) {
  musicBtn.textContent = isPlaying ? "🔊" : "🎵";
  musicText.textContent = isPlaying ? "เพลง: ON" : "เพลง: OFF";
}

function updateVolumeUI() {
  const percentage = Number(volumeSlider.value);
  volumeText.textContent = `เสียง: ${percentage}%`;
}

updateVolumeUI();

volumeSlider.addEventListener("input", () => {
  music.volume = Number(volumeSlider.value) / 100;
  updateVolumeUI();
});

musicBtn.addEventListener("click", async () => {
  if (music.paused) {
    await startMusic();
  } else {
    music.pause();
    setMusicUI(false);
  }
});

// Try autoplay when page opens.
// Modern browsers may block this until the user interacts with the page.
window.addEventListener("load", () => {
  startMusic();
});

// If autoplay was blocked, the first interaction attempts music again.
document.addEventListener("pointerdown", () => {
  if (music.paused) startMusic();
}, { once: true });

// Flower burst when opening letter
function burstFlowers() {
  for (let i = 0; i < 18; i++) {
    setTimeout(() => {
      const p = document.createElement("span");
      p.className = "petal";
      p.textContent = flowers[Math.floor(Math.random() * flowers.length)];
      p.style.left = `${40 + Math.random() * 20}%`;
      p.style.fontSize = `${16 + Math.random() * 16}px`;
      p.style.animationDuration = `${3 + Math.random() * 3}s`;
      p.style.setProperty("--sway", `${-180 + Math.random() * 360}px`);
      petalLayer.appendChild(p);
      setTimeout(() => p.remove(), 6500);
    }, i * 70);
  }
}
