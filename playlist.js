const { FileM } = require("./media.js")

playlist = [
    './assets/demo/demo_video1.mp4',
    './assets/demo/demo_video2.mp4',
    './assets/demo/demo_video3.mp4',
];

let currentI = 0;
const state = {
    isRepeat: true,
    isShuffle: false,
};

function nextI() {
    if (playlist.length === 1) return 0;
    let newI;
    if (state.isShuffle) {
        do {
            newI = Math.floor(Math.random() * playlist.length);
        }
        while (newI === currentI);
        return newI;
    }
    return (currentI + 1) % playlist.length;
}

function next() {
    currentI = nextI();
    return playlist[currentI];
}

function prevI() {
    if (playlist.length === 1) return 0;
    let newI;
    if (state.isShuffle) {
        do {
            newI = Math.floor(Math.random() * playlist.length);
        }
        while (newI === currentI);
        return newI;
    }
    let tmp = currentI - 1;
    if (tmp < 0) tmp = playlist.length - 1; // unsafe
    return tmp;
}

function prev() {
    currentI = prevI();
    return playlist[currentI];
}

module.exports = {
    next,
    state,
    prev
};