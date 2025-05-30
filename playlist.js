const { FileM } = require("./media.js")
var fs = require('fs');

let playlist = [
    /*new FileM({ title: "ime je ime wad w adwdw dwad wad asd", path: './assets/demo/demo_video1.mp4', duration: 12, picture: 'assets/buttons/end.png', size: 12 }),
    new FileM({ title: "ime2", path: './assets/demo/demo_video2.mp4', duration: 12, picture: 'assets/buttons/pause.png', size: 12 }),
    new FileM({ title: "ime3", path: './assets/demo/demo_video3.mp4', duration: 12, picture: 'assets/buttons/menu.png', size: 12 }),
    new FileM({ title: "zvok", path: './assets/demo/test.mp3', duration: 12, picture: 'assets/buttons/play.png', type: 'Audio', size: 12 }),*/
];

function save(path) {
    fs.writeFile(path, JSON.stringify(playlist), function (err) {
        if (err) {
            console.log(err);
        }
    });
}


function load(path) {
    try {
        const parsedData = JSON.parse(fs.readFileSync(path, 'utf-8'));
        playlist = parsedData.map(item => new FileM(item));

    } catch (err) {
        console.error("Error when loading that playlist:", err);
    }
}



let currentI = 0;
const state = {
    isRepeat: true,
    isShuffle: false,
    theme: "light"
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
    return {
        src: playlist[currentI].path,
    };
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
    return {
        src: playlist[currentI].path,
    };
}

function getPlaylistInfo() {
    return playlist.map((item, i) => ({
        title: item.title,
        duration: item.duration,
        picture: item.picture,
        index: i
    }));
}

function getItemPlaylist(i) {
    if (playlist.length <= i) throw 404;
    currentI = i;
    return {
        src: playlist[i].path
    };
}

function getCurrentI() {
    return {
        index: currentI,
        title: playlist[currentI].title
    };
}


module.exports = {
    next,
    state,
    prev,
    getPlaylistInfo,
    getItemPlaylist,
    getCurrentI,
    save,
    load
};