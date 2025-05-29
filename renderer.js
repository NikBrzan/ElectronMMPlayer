
window.addEventListener('DOMContentLoaded', () => {
  const video = document.querySelector('video');

  player.getPlaylist();

  const buttons = {
    prev: () => {
      player.prev();
    },
    pause: () => {
      const video = document.querySelector('video');
      video.pause();
    },
    play: () => {
      const video = document.querySelector('video');
      video.play();
    },
    next: () => player.next(),
    end: () => console.log('Stop/End playback'),
    repeat: () => player.toggleRepeat(),
    shuffle: () => {
      const shuffleBtn = document.getElementById('shuffle');
      shuffleBtn.classList.toggle('selectedBtn');
      player.toggleShuffle();
    }
  };

  Object.keys(buttons).forEach((btnId) => {
    const btn = document.getElementById(btnId);
    if (btn) {
      btn.addEventListener('click', buttons[btnId]);
    }
  });

  window.player.onUpdatePlaying((data) => {
    video.src = data.src;
    video.play();
  });

  window.player.onUpdatePlaylist((data) => {
    console.log(data);
    const container = document.getElementById('playlist');
    container.innerHTML = "";
    for (const item of data) {
      container.innerHTML += formatHtml(item);
    }
  });
});


function formatHtml(data) {
  return `<div class="playlistItem">
            <img src="${data.picture}" class="sideImg" />
            <div class="info">
              <p class="name">${data.title}</p>
              <p class="duration">${data.duration}</p>
            </div>
          </div>`;
}
