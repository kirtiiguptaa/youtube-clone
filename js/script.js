document.addEventListener("DOMContentLoaded", function() {
  var swiper = new Swiper(".swiper", {
    spaceBetween: 24,
    breakpoints: {
      400: {
        slidesPerView: 1,
        spaceBetween: 8,
      },
      550: {
        slidesPerView: 5,
        spaceBetween: 16,
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 24,
      },
      1200: {
        slidesPerView: 6,
        spaceBetween: 24,
      },
      1349: {
        slidesPerView: 8,
        spaceBetween: 24,
      },
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});
// DP DRODOWN
var userDp = document.querySelector(".user-dropdown");
var iconDropdown = document.querySelector(".icon-dropdown");
var navbar = document.querySelector(".navbar")

userDp.onclick = function() {
  navbar.classList.toggle("iconDropdown");
  iconDropdown.classList.toggle("visible");
}

// MENU ICON
var menuIcon = document.querySelector(".toggle-btn");
var sidebar = document.querySelector(".side-bar");
var container = document.querySelector(".main-container");
var filterContainer = document.querySelector(".filters");

function toggleSidebar() {
  sidebar.classList.toggle("small-sidebar");
  container.classList.toggle("large-container");
  filterContainer.classList.toggle("large-filter");
}

function setInitialState() {
  if (window.innerWidth < 1199) {
    sidebar.classList.add("small-sidebar");
    container.classList.add("large-container");
    filterContainer.classList.add("large-filter");
  } else {
    sidebar.classList.remove("small-sidebar");
    container.classList.remove("large-container");
    filterContainer.classList.remove("large-filter");
  }
}

window.onload = function() {
  setInitialState();
};

menuIcon.onclick = function() {
  toggleSidebar();
};

// VIDEO CONTAINER
const videoCardContainer = document.querySelector(".video-container");
let api_key = "AIzaSyDk3cgqo7kxm5lDVUeKePqTwMnUg5h7dOo";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

fetch(video_http + new URLSearchParams({
  key: api_key,
  part: "snippet",
  chart: "mostPopular",
  maxResults: 50,
  regionCode: "IN"
}))

.then(res => res.json())
.then(data => {
  data.items.forEach(item => {
    getChannelIcon(item);
  })
})
.catch(err => console.log(err));

const getChannelIcon = (video_data) => {
  fetch(channel_http + new URLSearchParams({
    key: api_key,
    part: "snippet",
    id: video_data.snippet.channelId
  }))
  .then(res => res.json())
  .then(data => {
    video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
    makeVideoCard(video_data)
  })
}

const makeVideoCard = (data) => {
  videoCardContainer.innerHTML += `
  <div class="video" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
    <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
    <div class="content">
      <img src="${data.channelThumbnail}" class="channel-icon" alt="">
      <div class="info">
        <h4 class="title">${data.snippet.title}</h4>
        <p class="channel-name">${data.snippet.channelTitle}</p>
      </div>
    </div>
  </div>
  `;
}

// SEARCH BAR

const searchInput = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search-btn");
const searchVoice = document.querySelector(".search-voice");
let searchLink = "https://www.youtube.com/results?search_query=";

searchBtn.addEventListener("click", () => {
  if(searchInput.value.length){
    location.href = searchLink + searchInput.value;
  }
})

// VOICE SEARCH

if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

  searchVoice.addEventListener('click', () => {
    recognition.start();
  });

  recognition.onresult = (event) => {
    const result = event.results[0][0].transcript;
    searchInput.value = result;
    search();
  };

  recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
  };
} else {
  console.error('Speech recognition not supported in this browser');
}

function search() {
  const query = searchInput.value.trim();
  if (query !== '') {
    const listItem = document.createElement('li');
    listItem.textContent = query;
    searchResults.appendChild(listItem);
  }
}