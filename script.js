const envelope = document.getElementById("envelope");
const delivery = document.getElementById("delivery");
const intro = document.getElementById("intro");
const acceptDelivery = document.getElementById("acceptDelivery");
const declineDelivery = document.getElementById("declineDelivery");
const deliveryResponse = document.getElementById("deliveryResponse");
const bouquetButton = document.getElementById("bouquetButton");
const bouquetSvg = bouquetButton.querySelector(".sunflower-bouquet");
const roseBouquetSvg = bouquetButton.querySelector(".bouquet-rose-art");
const bouquetArtworkStage = document.getElementById("bouquetArtworkStage");
const previousBouquet = document.getElementById("previousBouquet");
const nextBouquet = document.getElementById("nextBouquet");
const bouquetSwitchStatus = document.getElementById("bouquetSwitchStatus");
const bouquetModal = document.getElementById("bouquetModal");
const bouquetModalArtwork = document.getElementById("bouquetModalArtwork");
const closeBouquetModal = document.getElementById("closeBouquetModal");
const bouquetCollection = document.getElementById("bouquetCollection");
const bouquetDetail = document.getElementById("bouquetDetail");
const bouquetDetailTitle = document.getElementById("bouquetDetailTitle");
const bouquetDetailNote = document.getElementById("bouquetDetailNote");
const backToBouquets = document.getElementById("backToBouquets");
const bouquetCards = [...document.querySelectorAll(".bouquet-collection-card")];
const letter = document.getElementById("letter");
const closeLetter = document.getElementById("closeLetter");
const letterCard = document.getElementById("letterCard");
const letterFront = document.querySelector(".letter-front");
const letterBack = document.querySelector(".letter-back");
const messageVideo = document.getElementById("messageVideo");
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
const openChat = document.getElementById("openChat");
const chatDialog = document.getElementById("chatDialog");
const closeChat = document.getElementById("closeChat");
const chatStatus = document.getElementById("chatStatus");
const chatMessages = document.getElementById("chatMessages");
const loadOlderChat = document.getElementById("loadOlderChat");
const chatForm = document.getElementById("chatForm");
const chatMessage = document.getElementById("chatMessage");
const sendChat = document.getElementById("sendChat");
const chatImageInput = document.getElementById("chatImageInput");
const chatImagePreview = document.getElementById("chatImagePreview");
const chatImagePreviewImage = document.getElementById("chatImagePreviewImage");
const chatImagePreviewName = document.getElementById("chatImagePreviewName");
const removeChatImage = document.getElementById("removeChatImage");

const supabaseConfig = {
  url: "https://agidwyplqqqqqcgxrcul.supabase.co",
  anonKey: "sb_publishable_fvf7gPA1Pbuy2KtDeBfMgQ_ckKILzeg",
};

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
const snowflakes = ["❄", "❅", "❆"];
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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

let bouquetArtworkCloneId = 0;

function cloneBouquetArtwork(source) {
  const artwork = source.cloneNode(true);
  const elements = [artwork, ...artwork.querySelectorAll("*")];
  const ids = new Map();
  bouquetArtworkCloneId += 1;

  for (const element of elements) {
    if (element.id) {
      const originalId = element.id;
      const cloneId = `bouquet-${bouquetArtworkCloneId}-${originalId}`;
      ids.set(originalId, cloneId);
      element.id = cloneId;
    }
  }

  for (const element of elements) {
    for (const attribute of [...element.attributes]) {
      let value = attribute.value.replace(/url\(#([^)]+)\)/g, (reference, id) => (
        ids.has(id) ? `url(#${ids.get(id)})` : reference
      ));

      if ((attribute.name === "href" || attribute.name === "xlink:href") && value.startsWith("#")) {
        const id = value.slice(1);
        if (ids.has(id)) value = `#${ids.get(id)}`;
      }

      if (value !== attribute.value) element.setAttribute(attribute.name, value);
    }
  }

  return artwork;
}

function getBouquetArtwork(card) {
  if (card.dataset.bouquetSource === "rose") return roseBouquetSvg;
  if (card.dataset.bouquetSource === "sunflower") return bouquetSvg;
  return card.querySelector("svg");
}

let currentBouquetIndex = bouquetCards.findIndex((card) => card.dataset.bouquetSource === "sunflower");

function showBouquet(index) {
  currentBouquetIndex = (index + bouquetCards.length) % bouquetCards.length;
  const card = bouquetCards[currentBouquetIndex];

  bouquetArtworkStage.replaceChildren(cloneBouquetArtwork(getBouquetArtwork(card)));
  bouquetButton.setAttribute("aria-label", `เปิดคอลเล็กชันช่อดอกไม้ — ${card.dataset.bouquetTitle}`);
  bouquetSwitchStatus.textContent = `${card.dataset.bouquetTitle} · ${currentBouquetIndex + 1} / ${bouquetCards.length}`;
}

document.querySelectorAll(".bouquet-collection-card").forEach((card) => {
  if (card.dataset.bouquetSource !== "rose" && card.dataset.bouquetSource !== "sunflower") return;

  const preview = card.querySelector(".bouquet-collection-art");
  preview.appendChild(cloneBouquetArtwork(getBouquetArtwork(card)));
});

showBouquet(currentBouquetIndex);

previousBouquet.addEventListener("click", () => showBouquet(currentBouquetIndex - 1));
nextBouquet.addEventListener("click", () => showBouquet(currentBouquetIndex + 1));

function openBouquetCollection() {
  if (document.body.classList.contains("bouquet-revealing")) return;

  bouquetCollection.hidden = false;
  bouquetDetail.hidden = true;
  bouquetModal.hidden = false;
  bouquetModal.setAttribute("aria-hidden", "false");
  closeBouquetModal.focus();
}

function closeBouquet() {
  bouquetCollection.hidden = false;
  bouquetDetail.hidden = true;
  bouquetModal.hidden = true;
  bouquetModal.setAttribute("aria-hidden", "true");
  bouquetButton.focus();
}

function openBouquetDetail(card) {
  currentBouquetIndex = bouquetCards.indexOf(card);
  showBouquet(currentBouquetIndex);
  bouquetDetailTitle.textContent = card.dataset.bouquetTitle;
  bouquetDetailNote.textContent = card.dataset.bouquetNote;
  bouquetModalArtwork.replaceChildren(cloneBouquetArtwork(getBouquetArtwork(card)));
  bouquetCollection.hidden = true;
  bouquetDetail.hidden = false;
  backToBouquets.focus();
}

bouquetButton.addEventListener("click", openBouquetCollection);
closeBouquetModal.addEventListener("click", closeBouquet);
bouquetModal.addEventListener("click", (event) => {
  if (event.target === bouquetModal) closeBouquet();
});
bouquetCollection.addEventListener("click", (event) => {
  const card = event.target.closest(".bouquet-collection-card");
  if (card) openBouquetDetail(card);
});
backToBouquets.addEventListener("click", () => {
  bouquetDetail.hidden = true;
  bouquetCollection.hidden = false;
  bouquetCollection.querySelector(".bouquet-collection-card")?.focus();
});

// Falling snow
function createSnowflake() {
  const snowflake = document.createElement("span");
  snowflake.className = "snowflake";
  snowflake.textContent = snowflakes[Math.floor(Math.random() * snowflakes.length)];

  const size = 15 + Math.random() * 18;
  const duration = 7 + Math.random() * 6;
  const sway = -80 + Math.random() * 160;

  snowflake.style.top = prefersReducedMotion ? `${Math.random() * 95}vh` : "-50px";
  snowflake.style.left = `${Math.random() * 100}%`;
  snowflake.style.fontSize = `${size}px`;
  snowflake.style.animationDuration = `${duration}s`;
  snowflake.style.setProperty("--sway", `${sway}px`);

  petalLayer.appendChild(snowflake);

  if (!prefersReducedMotion) {
    setTimeout(() => snowflake.remove(), duration * 1000 + 500);
  }
}

if (prefersReducedMotion) {
  for (let i = 0; i < 28; i++) createSnowflake();
} else {
  setInterval(createSnowflake, 300);

  for (let i = 0; i < 18; i++) {
    setTimeout(createSnowflake, i * 140);
  }
}

const supabaseUrl = supabaseConfig.url.replace(/\/+$/, "");
const chatApiReady = Boolean(supabaseUrl && supabaseConfig.anonKey);
const chatPageSize = 50;
let chatRefreshTimer;
let chatLoadedMessages = [];
let chatMessagesInitialized = false;
let chatHasOlderMessages = false;
let chatOlderMessagesLoading = false;
let pendingChatImage = null;
let chatImagePreviewUrl = "";

const chatImageTypes = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
  ["image/gif", "gif"],
  ["image/avif", "avif"],
]);
const chatImageMaxBytes = 5 * 1024 * 1024;

function setChatStatus(message, isError = false) {
  chatStatus.textContent = message;
  chatStatus.classList.toggle("is-error", isError);
}

function formatChatTimestamp(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "เวลาไม่ถูกต้อง";

  return date.toLocaleString("th-TH", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function getChatImageUrl(value) {
  const url = value.replace(/[.,!?;:)\]]+$/, "");
  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.protocol !== "https:" && parsedUrl.protocol !== "http:") return null;
    if (!/\.(?:avif|gif|jpe?g|png|webp)$/i.test(parsedUrl.pathname)) return null;
    return { href: parsedUrl.href, trailingText: value.slice(url.length) };
  } catch {
    return null;
  }
}

function appendChatMessageContent(container, value) {
  const urlPattern = /https?:\/\/[^\s<>]+/g;
  let lastIndex = 0;
  let match;

  while ((match = urlPattern.exec(value))) {
    const image = getChatImageUrl(match[0]);
    if (!image) continue;

    container.append(document.createTextNode(value.slice(lastIndex, match.index)));

    const link = document.createElement("a");
    link.className = "chat-image-link";
    link.href = image.href;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", "เปิดรูปภาพขนาดเต็ม");

    const imageElement = document.createElement("img");
    imageElement.className = "chat-message-image";
    imageElement.src = image.href;
    imageElement.alt = "รูปภาพในข้อความ";
    imageElement.loading = "lazy";
    imageElement.decoding = "async";
    imageElement.referrerPolicy = "no-referrer";
    link.append(imageElement);
    container.append(link, document.createTextNode(image.trailingText));
    lastIndex = match.index + match[0].length;
  }

  container.append(document.createTextNode(value.slice(lastIndex)));
}

function renderChatMessages(messages, { preservePosition = false, scrollToBottom = false } = {}) {
  const previousScrollHeight = chatMessages.scrollHeight;
  const previousScrollTop = chatMessages.scrollTop;
  const wasAtBottom = previousScrollHeight - previousScrollTop - chatMessages.clientHeight < 80;
  const items = messages.map((message) => {
    const item = document.createElement("li");
    const isOwner = message.sender_type === "owner";
    item.className = `chat-message${isOwner ? " is-owner" : " is-user"}`;

    const heading = document.createElement("div");
    heading.className = "chat-message-heading";

    const timestamp = document.createElement("time");
    timestamp.dateTime = message.created_at;
    timestamp.textContent = formatChatTimestamp(message.created_at);

    const content = document.createElement("div");
    content.className = "chat-message-content";
    appendChatMessageContent(content, message.content);

    if (isOwner) {
      const name = document.createElement("strong");
      name.textContent = "กร";
      heading.append(name);
    }
    heading.append(timestamp);
    item.append(heading, content);
    return item;
  });

  chatMessages.replaceChildren(...items);
  if (preservePosition) {
    chatMessages.scrollTop = previousScrollTop + chatMessages.scrollHeight - previousScrollHeight;
  } else if (scrollToBottom || wasAtBottom) {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
}

function mergeChatMessages(existing, incoming) {
  const messagesById = new Map(existing.map((message) => [String(message.id), message]));
  for (const message of incoming) messagesById.set(String(message.id), message);
  return [...messagesById.values()].sort((first, second) => Number(first.id) - Number(second.id));
}

function removePendingChatImage() {
  if (chatImagePreviewUrl) URL.revokeObjectURL(chatImagePreviewUrl);
  pendingChatImage = null;
  chatImagePreviewUrl = "";
  chatImageInput.value = "";
  chatImagePreview.hidden = true;
  chatImagePreviewImage.removeAttribute("src");
  chatImagePreviewName.textContent = "";
}

function createChatUploadId() {
  return [...crypto.getRandomValues(new Uint8Array(16))]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function uploadChatImage(file, fileName) {
  const response = await fetch(`${supabaseUrl}/storage/v1/object/chat-images/${fileName}`, {
    method: "POST",
    headers: {
      apikey: supabaseConfig.anonKey,
      Authorization: `Bearer ${supabaseConfig.anonKey}`,
      "Content-Type": file.type,
      "x-upsert": "false",
    },
    body: file,
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(details || `อัปโหลดรูปไม่สำเร็จ (${response.status})`);
  }

  return `${supabaseUrl}/storage/v1/object/public/chat-images/${fileName}`;
}

async function requestChat(path, options = {}) {
  const response = await fetch(`${supabaseUrl}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: supabaseConfig.anonKey,
      Authorization: `Bearer ${supabaseConfig.anonKey}`,
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(details || `Supabase ตอบกลับด้วยสถานะ ${response.status}`);
  }

  const body = await response.text();
  if (!body.trim()) return null;

  try {
    return JSON.parse(body);
  } catch {
    throw new Error("Supabase ส่งข้อมูลตอบกลับที่อ่านไม่ได้");
  }
}

async function loadChatMessages({ scrollToBottom = !chatMessagesInitialized } = {}) {
  try {
    const newestMessages = await requestChat(
      `chat_messages?select=id,display_name,sender_type,content,created_at&order=id.desc&limit=${chatPageSize}`,
    );
    if (!chatMessagesInitialized) {
      chatHasOlderMessages = newestMessages.length === chatPageSize;
    }
    chatLoadedMessages = mergeChatMessages(chatLoadedMessages, newestMessages);
    loadOlderChat.hidden = !chatHasOlderMessages;
    renderChatMessages(chatLoadedMessages, { scrollToBottom });
    chatMessagesInitialized = true;
    setChatStatus(chatLoadedMessages.length ? "ข้อความล่าสุด 💗" : "ยังไม่มีข้อความ มาเริ่มคุยกันได้นะ");
  } catch (error) {
    setChatStatus(`โหลดข้อความไม่สำเร็จ: ${error.message}`, true);
  }
}

async function loadOlderChatMessages() {
  if (chatOlderMessagesLoading || !chatHasOlderMessages || !chatLoadedMessages.length) return;

  chatOlderMessagesLoading = true;
  loadOlderChat.disabled = true;
  loadOlderChat.textContent = "กำลังโหลด...";

  try {
    const oldestId = chatLoadedMessages[0].id;
    const olderMessages = await requestChat(
      `chat_messages?select=id,display_name,sender_type,content,created_at&id=lt.${oldestId}&order=id.desc&limit=${chatPageSize}`,
    );
    chatHasOlderMessages = olderMessages.length === chatPageSize;
    chatLoadedMessages = mergeChatMessages(chatLoadedMessages, olderMessages);
    renderChatMessages(chatLoadedMessages, { preservePosition: true });
    loadOlderChat.hidden = !chatHasOlderMessages;
    setChatStatus(chatHasOlderMessages ? "เลื่อนดูข้อความเก่าต่อได้เลย 💗" : "โหลดข้อความเก่าครบแล้ว 💗");
  } catch (error) {
    setChatStatus(`โหลดข้อความเก่าไม่สำเร็จ: ${error.message}`, true);
  } finally {
    chatOlderMessagesLoading = false;
    loadOlderChat.disabled = false;
    loadOlderChat.textContent = "โหลดข้อความเก่า";
  }
}

loadOlderChat.addEventListener("click", loadOlderChatMessages);

function openChatDialog() {
  chatDialog.hidden = false;
  chatDialog.setAttribute("aria-hidden", "false");
  openChat.setAttribute("aria-expanded", "true");

  if (!chatApiReady) {
    setChatStatus("แชตยังไม่พร้อมใช้งาน กรุณาตั้งค่า Supabase ตามไฟล์ SUPABASE_SETUP.md", true);
    sendChat.disabled = true;
  } else {
    loadChatMessages();
    chatRefreshTimer = setInterval(loadChatMessages, 10000);
  }

  chatMessage.focus();
}

function closeChatDialog() {
  chatDialog.hidden = true;
  chatDialog.setAttribute("aria-hidden", "true");
  openChat.setAttribute("aria-expanded", "false");
  clearInterval(chatRefreshTimer);
  openChat.focus();
}

openChat.setAttribute("aria-expanded", "false");
openChat.addEventListener("click", openChatDialog);
closeChat.addEventListener("click", closeChatDialog);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !chatDialog.hidden) {
    event.stopImmediatePropagation();
    closeChatDialog();
  }
});

chatForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!chatApiReady) return;

  const messageText = chatMessage.value.trim();
  if (!messageText && !pendingChatImage) {
    setChatStatus("พิมพ์ข้อความหรือเลือกรูปก่อนส่งนะ", true);
    chatMessage.focus();
    return;
  }

  sendChat.disabled = true;
  chatImageInput.disabled = true;
  removeChatImage.disabled = true;
  setChatStatus("กำลังส่งข้อความ...");

  try {
    let content = messageText;

    if (pendingChatImage) {
      const file = pendingChatImage;
      const extension = chatImageTypes.get(file.type);
      if (!extension) throw new Error("ชนิดไฟล์รูปนี้ไม่รองรับ");

      const fileName = `${createChatUploadId()}.${extension}`;
      const publicUrl = `${supabaseUrl}/storage/v1/object/public/chat-images/${fileName}`;
      content = [messageText, publicUrl].filter(Boolean).join("\n");
      if (content.length > 500) {
        throw new Error("ข้อความพร้อมลิงก์รูปยาวเกินกำหนด กรุณาย่อข้อความ");
      }

      await uploadChatImage(file, fileName);
    }

    await requestChat("chat_messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        display_name: "ผู้ใช้",
        sender_type: "user",
        content,
      }),
    });
    chatForm.reset();
    removePendingChatImage();
    await loadChatMessages({ scrollToBottom: true });
    setChatStatus("ส่งข้อความแล้ว 💗");
  } catch (error) {
    setChatStatus(`ส่งข้อความไม่สำเร็จ: ${error.message}`, true);
  } finally {
    sendChat.disabled = false;
    chatImageInput.disabled = false;
    removeChatImage.disabled = false;
  }
});

chatImageInput.addEventListener("change", () => {
  const [file] = chatImageInput.files;
  if (!file) return;

  if (!chatImageTypes.has(file.type)) {
    removePendingChatImage();
    setChatStatus("รองรับไฟล์ JPG, PNG, WebP, GIF และ AVIF เท่านั้น", true);
    return;
  }

  if (file.size > chatImageMaxBytes) {
    removePendingChatImage();
    setChatStatus("รูปต้องมีขนาดไม่เกิน 5 MB", true);
    return;
  }

  if (chatImagePreviewUrl) URL.revokeObjectURL(chatImagePreviewUrl);
  pendingChatImage = file;
  chatImagePreviewUrl = URL.createObjectURL(file);
  chatImagePreviewImage.src = chatImagePreviewUrl;
  chatImagePreviewName.textContent = file.name;
  chatImagePreview.hidden = false;
  setChatStatus("เพิ่มรูปแล้ว พิมพ์ข้อความหรือกดส่งได้เลย");
});

removeChatImage.addEventListener("click", removePendingChatImage);

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
messageVideo.addEventListener("click", (event) => event.stopPropagation());
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
