class FileM {
    static Types = ['Video', 'Audio'];

    constructor({
        title = '',
        path = '',
        type = 'Video',
        picture = '',
        size = 0,
        duration = 0,
        playing = false
    } = {}) {
        this.title = title;
        this.path = path;
        this.type = FileM.Types.includes(type) ? type : 'Video';
        this.picture = picture;
        this.size = size;
        this.duration = duration;
        this.playing = playing;
    }
}


module.exports = {
    FileM
};