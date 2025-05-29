
window.addEventListener('DOMContentLoaded', () => {
   const video = document.querySelector('video');
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

    window.player.onUpdatePlaying((newSrc) => {
    video.src = newSrc;
    video.play();
    });
});
