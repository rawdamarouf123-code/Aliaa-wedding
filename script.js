// فتح الدعوة وتشغيل الأنشودة تلقائيًا
const welcomeScreen = document.getElementById("welcomeScreen");
const mainContent = document.getElementById("mainContent");

document.getElementById("openInvitation").addEventListener("click", async () => {

  // تشغيل الأنشودة
  try {
    await nasheed.play();
    nasheedButton.textContent = "Ⅱ";
    nasheedButton.classList.add("playing");
  } catch (error) {
    console.log("تأكدي من وجود ملف الأنشودة");
  }

  // فتح الدعوة
  welcomeScreen.classList.add("hide");

  setTimeout(() => {
    welcomeScreen.style.display = "none";
    mainContent.hidden = false;
    window.scrollTo({top: 0, behavior: "smooth"});
  }, 750);

});
// قلوب بينك زاهية وواضحة لكن خفيفة على المحتوى
const heartsLayer = document.getElementById("floatingHearts");
function createHeart() {
  const heart = document.createElement("span");
  heart.className = "heart";
  heart.textContent = Math.random() > 0.35 ? "♥" : "♡";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = (11 + Math.random() * 10) + "px";
  heart.style.setProperty("--drift", (Math.random() * 70 - 35) + "px");
  const duration = 9 + Math.random() * 6;
  heart.style.animationDuration = duration + "s";
  heartsLayer.appendChild(heart);
  setTimeout(() => heart.remove(), duration * 1000);
}
setInterval(createHeart, 850);

// زر الأنشودة الجانبي
const nasheed = document.getElementById("nasheed");
const nasheedButton = document.getElementById("nasheedButton");
nasheedButton.addEventListener("click", async () => {
  if (nasheed.paused) {
    try {
      await nasheed.play();
      nasheedButton.textContent = "Ⅱ";
      nasheedButton.classList.add("playing");
    } catch (error) {
      alert("ضعي ملف الأنشودة داخل مجلد audio باسم bashraki.mp3");
    }
  } else {
    nasheed.pause();
    nasheedButton.textContent = "♫";
    nasheedButton.classList.remove("playing");
  }
});
nasheed.addEventListener("ended", () => {
  nasheedButton.textContent = "♫";
  nasheedButton.classList.remove("playing");
});

// زر الزغرودة الجانبي
const zaghroota = document.getElementById("zaghroota");
document.getElementById("zaghrootaButton").addEventListener("click", async () => {
  try {
    zaghroota.currentTime = 0;
    await zaghroota.play();
  } catch (error) {
    alert("ضعي ملف الزغرودة داخل مجلد audio باسم zaghroota.mp3");
  }
});

// العد التنازلي - الساعة الافتراضية 7 مساءً لحين معرفة ساعة الفرح
const weddingDate = new Date("2026-11-20T19:00:00");
function updateCountdown() {
  const diff = weddingDate - new Date();
  const message = document.getElementById("countdownMessage");
  if (diff <= 0) {
    ["days","hours","minutes","seconds"].forEach(id => document.getElementById(id).textContent = "0");
    message.textContent = "النهارده فرحة علياء وسعد الدين.. بارك الله لهما! ♡";
    return;
  }
  document.getElementById("days").textContent = Math.floor(diff / 86400000);
  document.getElementById("hours").textContent = Math.floor((diff % 86400000) / 3600000);
  document.getElementById("minutes").textContent = Math.floor((diff % 3600000) / 60000);
  document.getElementById("seconds").textContent = Math.floor((diff % 60000) / 1000);
  message.textContent = "كل ثانية بتقربنا من الفرحة ♡";
}
updateCountdown();
setInterval(updateCountdown, 1000);

// دفتر التهاني: يحفظ على نفس المتصفح والجهاز فقط في هذه النسخة
const form = document.getElementById("wishForm");
const wishesList = document.getElementById("wishesList");
function loadWishes() {
  const wishes = JSON.parse(localStorage.getItem("aliaWishes") || "[]");
  wishesList.innerHTML = "";
  wishes.slice().reverse().forEach(wish => {
    const card = document.createElement("article");
    card.className = "wish-card";
    const name = document.createElement("strong");
    const message = document.createElement("p");
    name.textContent = wish.name;
    message.textContent = wish.message;
    card.append(name, message);
    wishesList.appendChild(card);
  });
}
form.addEventListener("submit", event => {
  event.preventDefault();
  const name = document.getElementById("guestName").value.trim();
  const message = document.getElementById("wishText").value.trim();
  if (!name || !message) return;
  const wishes = JSON.parse(localStorage.getItem("aliaWishes") || "[]");
  wishes.push({name, message});
  localStorage.setItem("aliaWishes", JSON.stringify(wishes));
  form.reset();
  loadWishes();
});
loadWishes();

// أضيفي اسم القاعة ورابط الخريطة ووقت الفرح هنا لاحقًا
const venueName = "قاعة بنت الأكابر";
const mapUrl = "https://maps.app.goo.gl/yvfEVNQ8kkHPKJuz6";
const eventTime = "7pm الساعة السابعة مساءً";
if (venueName) document.getElementById("venueName").textContent = venueName;
if (eventTime) document.getElementById("eventTime").textContent = eventTime;
if (mapUrl) {
  const link = document.getElementById("mapLink");
  link.href = mapUrl;
  link.classList.remove("disabled");
}