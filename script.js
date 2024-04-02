const songs = [
  {
    src: "path/to/your/song1.mp3",
    title: "Song Title 1",
    artist: "Artist Name 1",
  },
  {
    src: "path/to/your/song2.mp3",
    title: "Song Title 2",
    artist: "Artist Name 2",
  },
  // Add more songs following the same format
];

let currentSongIndex = 0;
const audio = new Audio();

// Update song information
function updateSongInfo() {
  const song = songs[currentSongIndex];
  document.querySelector(".title").textContent = song.title;
  document.querySelector(".artist").textContent = song.artist;
}

// Play or pause the audio
function playPause() {
  if (audio.paused) {
    audio.play();
    document.querySelector(".play-pause").classList.remove("fa-play");
    document.querySelector(".play-pause").classList.add("fa-pause");
  } else {
    audio.pause();
    document.querySelector(".play-pause").classList.remove("fa-pause");
    document.querySelector(".play-pause").classList.add("fa-play");
  }
}

// Play the next song
function nextSong() {
  currentSongIndex++;
  if (currentSongIndex >= songs.length) {
    currentSongIndex = 0;
  }
  loadSong();
}

// Play the previous song
function previousSong() {
  currentSongIndex--;
  if (currentSongIndex < 0) {
    currentSongIndex = songs.length - 1;
  }
  loadSong();
}

// Load the selected song
function loadSong() {
  const song = songs[currentSongIndex];
  audio.src = song.src;
  updateSongInfo();
  audio.load();
  audio.play();
}

// Update progress bar
audio.addEventListener("timeupdate", function () {
  const currentTime = audio.currentTime;
  const duration = audio.duration;
  const progress = (currentTime / duration) * 100;
  document.querySelector(".progress").style.width = progress + "%";

  // Update current time display
  const minutes = Math.floor(currentTime / 60);
  const seconds = Math.floor(currentTime % 60);
  const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;
  document.querySelector(".current-time").textContent = formattedTime;
});

// Update total time display when loaded
audio.addEventListener("loadeddata", function () {
  const duration = audio.duration;
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;
  document.querySelector(".total-time").textContent = formattedTime;
});

// Play the first song on page load
window.addEventListener("load", loadSong);

// Event listeners for buttons
document.querySelector(".play-pause").addEventListener("click", playPause);
document.querySelector(".fa-step-forward").addEventListener("click", nextSong);
document.querySelector(".fa-step-backward").addEventListener("click", previousSong);

// (Optional) Add event listeners for other functionalities like volume control
