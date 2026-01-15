if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}

const daysEl = document.getElementById("days");
const clockEl = document.getElementById("clock");
const nameEl = document.getElementById("eventName");
const dateEl = document.getElementById("eventDate");

const editBtn = document.getElementById("editBtn");
const editView = document.getElementById("editView");
const mainView = document.getElementById("mainView");
const nameInput = document.getElementById("nameInput");
const dateInput = document.getElementById("dateInput");
const saveBtn = document.getElementById("saveBtn");

let event = JSON.parse(localStorage.getItem("event")) || {
  name:"My event",
  date:null
};

function updateUI(){
  nameEl.textContent = event.name;
  dateEl.textContent = event.date || "Set a date";
}

editBtn.onclick = () =>{
  mainView.classList.add("hidden");
  editView.classList.remove("hidden");
  nameInput.value = event.name;
  dateInput.value = event.date || "";
}

saveBtn.onclick = () =>{
  event.name = nameInput.value;
  event.date = dateInput.value;
  localStorage.setItem("event", JSON.stringify(event));
  editView.classList.add("hidden");
  mainView.classList.remove("hidden");
  updateUI();
}

function tick(){
  if(!event.date){
    daysEl.textContent="0";
    clockEl.textContent="00:00:00";
    return;
  }

  const target = new Date(event.date).getTime();
  const now = Date.now();
  let diff = target - now;

  if(diff < 0) diff = 0;

  const d = Math.floor(diff / 86400000);
  const h = Math.floor(diff % 86400000 / 3600000);
  const m = Math.floor(diff % 3600000 / 60000);
  const s = Math.floor(diff % 60000 / 1000);

  daysEl.textContent = d;
  clockEl.textContent =
    String(h).padStart(2,"0")+":"+
    String(m).padStart(2,"0")+":"+
    String(s).padStart(2,"0");
}

updateUI();
setInterval(tick,1000);