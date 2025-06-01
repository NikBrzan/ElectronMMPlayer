
window.addEventListener('DOMContentLoaded', () => {
  const video = document.querySelector('video');
  const slider = document.querySelector("#myRange");
  player.getPlaylist();
  player.getTheme();
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

  document.getElementById('playlist').addEventListener('click', (e) => {
    const itemDiv = e.target.closest('.playlistItem');
    if (!itemDiv) return;
    const id = itemDiv.id;
    player.getItemIndex(id);
  });

  window.player.onUpdatePlaying((data) => {
    video.src = data.src;
    video.play();
  });

  window.player.onUpdateCurrent((data) => {
    const old = document.querySelector('.playlistItem.current');
    if (old) old.classList.remove('current');

    const newItem = document.getElementById(data.index);
    if (newItem) newItem.classList.add('current');

    const titlePlaying = document.querySelector('#currentPlaying');
    titlePlaying.innerHTML = data.title;
  })

  window.player.onUpdatePlaylist((data) => {
    console.log(data);
    const container = document.getElementById('playlist');
    container.innerHTML = "";
    for (const item of data) {
      container.innerHTML += formatHtml(item);
    }
  });

  window.player.onUpdateTheme((data) => {
    setTheme(data.theme);
  })

  document.querySelector('.menu').addEventListener('click', (e) => {

    if (e.target.tagName.toLowerCase() === 'li') {
      const clickedText = e.target.textContent.trim();

      switch (clickedText) {
        case 'Naloži podatke':
          player.openLoadDialog();
          break;
        case 'List':
          break;
        case 'Nastavitve':
          player.openSettingsWindow();
          break;
        case 'Debug':
          console.log('Clicked Debug');
          break;
        case "Zvočni ukazi":
          player.startRecord();
          break;
        case 'Pomoc':
          break;
        default:
          console.log('Clicked:', clickedText);
      }
    }
  });

  const timeDisplay = document.querySelector("#currentPlayingLength");
  video.ontimeupdate = (event) => {
    timeDisplay.innerHTML = video.currentTime.toFixed(1);
    slider.value = video.currentTime;
  };

  video.addEventListener('loadedmetadata', () => {
    slider.max = video.duration;
  });

  window.player.onTheme((data) => {
        setTheme(data.theme);
    });

  window.player.onTranscribe((data) => {
      
    if (data.includes("pause")) {
      video.pause();
      speak("Paused");
    } else if (data.includes("play")) {
      video.play();
      speak("Playing");
    } else if (data.includes("next")) {
      speak("Next item");
    } else if (data.includes("previous")) {
      speak("Previous item");
    } else {
      speak("Command not recognized");
    }

    });
});


function formatHtml(data) {
  return `<div class="playlistItem" id="${data.index}">
            <img src="${data.picture}" class="sideImg" />
            <div class="info">
              <p class="name">${data.title}</p>
              <p class="duration">${data.duration}</p>
            </div>
          </div>`;
}

function setTheme(theme) {
  const themeLink = document.getElementById('theme-link');
  themeLink.href = theme === 'dark' ? 'dark.css' : 'light.css';
}

function speak(text) {
  utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
};
