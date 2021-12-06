player = document.querySelector('.player');

video = document.querySelector('.video');

playBtn = document.getElementById('play-pause');
screenPlayBtn = document.querySelector('.on_screnn_play');
mute = document.getElementById('mute-muted');
fullscreen = document.getElementById('full-screen');

timestamp = document.getElementById('timestamp');

progress = document.querySelector('.time-bar');
volume = document.getElementById('sound-bar');


// Play-Pause
function togglePlayPause() {
    if(video.paused){
        video.play();
        playBtn.className = 'pause';
        screenPlayBtn.style.display = 'none';
    } else {
        playBtn.className = 'play';
        video.pause();
        screenPlayBtn.style.display = 'block';
    }
};

// Показывает время видео
function updateProgressTime() {
    progress.value = (video.currentTime / video.duration) * 100;

    let mins = Math.floor(video.currentTime / 60);
    if (mins < 10) {
        mins = '0' + mins;
    }

    let secs = Math.floor(video.currentTime % 60);
    if (secs < 10) {
        secs = '0' + secs;
    }

    timestamp.textContent = `${mins}:${secs}`;

    if (video.currentTime == video.duration) {
        playBtn.className = 'play';
    }
}

// Меняет время видео
function setVideoProgress() {
    video.currentTime = (progress.value * video.duration) / 100;
}

// Mute-unmute
function soundToggle(){
    video.muted = !video.muted;
    mute.classList.toggle('muted')
}

// Fullscreen
function switchFullscreen() {
    if (document.fullscreenElement === player) {
        document.exitFullscreen();
    } else {
        player.requestFullscreen();
    }
}

// Вызов событий
// Play-Pause
screenPlayBtn.addEventListener('click', () => { togglePlayPause(); })
playBtn.addEventListener('click', () => { togglePlayPause(); })
video.addEventListener('click', () => { togglePlayPause(); })

// Мониторит время видео
video.addEventListener('timeupdate', () => {updateProgressTime(); })

// ПОЛ ДНЯ УБИЛ, ЧТОБЫ ПОНЯТЬ, КАК ЗАСТАВИТЬ РАБОТАТЬ mousemove КОРРЕКТНО,
// А ПОТОМ УЗНАЛ, ЧТО ЕСТЬ input AAAAAAAAAAAAAAAAAAAAAAAAAA
progress.addEventListener('input', () => {setVideoProgress(); })

// Громкость
volume.addEventListener('input', (e) => {video.volume = e.target.value;
    if(video.volume === 0 && !video.muted){
        video.muted = true;
       mute.classList.add('muted');
    } else if (video.volume > 0 && video.muted){
        video.muted = false;
       mute.classList.remove('muted');
   }})
mute.addEventListener('click', () => {soundToggle(); })

// Фуллскрин
fullscreen.addEventListener('click', function () {
    switchFullscreen();
})
video.addEventListener('dblclick', function () {
    switchFullscreen();
})
screenPlayBtn.addEventListener('dblclick', function () {
    switchFullscreen();
})