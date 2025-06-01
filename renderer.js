window.addEventListener('DOMContentLoaded', () => {
  const video = document.querySelector('video');
  const slider = document.querySelector("#myRange");
  player.getPlaylist();
  player.getTheme();
  let removal = false;

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

  window.player.onTranscribe(async (data) => {

    if (removal) {
    const numberWords = {
      "zero": 0, "one": 1, "two": 2, "three": 3, "four": 4,
      "five": 5, "six": 6, "seven": 7, "eight": 8, "nine": 9,
      "ten": 10
    };
    let index = null;

    const match = data.match(/\d+/);
    if (match) {
      index = parseInt(match[0], 10);
    } else if (data.includes("cancel")) {
      removal = false;
      return;
    } else {
      const wordMatch = Object.keys(numberWords).find(word => data.toLowerCase().includes(word));
      if (wordMatch) index = numberWords[wordMatch];
    }

    if (index !== null) {
      window.player.removeAtIndex(index);
      speak(`Removed item at index ${index}`);
    } 
    
    else {
      speak("Please say the index number to remove.");
      setTimeout(() => player.startRecord(), 3000);
      return;
    }
    removal = false;
    return;
  }
      
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
    } else if (data.includes("remove")) {
      speak("Tell me the index of the item you wish to remove");
      await new Promise(res => setTimeout(res, 3000));
      player.startRecord();
      removal = true;
    } 
    else {
      speak("Command not recognized");
    }

    });

  const zvocniUkazi = document.getElementById('zvocni-ukazi');
  if (zvocniUkazi) {
    zvocniUkazi.addEventListener('click', () => {
      zvocniUkazi.classList.add('rainbow-border');
      setTimeout(() => {
        zvocniUkazi.classList.remove('rainbow-border');
      }, 4000);
    });
  }
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
