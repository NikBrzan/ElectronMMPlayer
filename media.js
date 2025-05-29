class FileM {
    static Types = ['Video', 'Audio'];

    constructor() {
        this.title = '';
        this.path = '';
        this.type = 'Video';
        this.picture = '';
        this.size = 0;
        this.duration = 0; // in seconds
        this.playing = false;
    }
    /*constructor(title, path) {
        this.title = title;
        this.path = path;
        this.type = 'Video';
        this.picture = '';
        this.size = 0;
        this.duration = 0;
        this.playing = false;
    }*/
}
module.exports = {
    FileM
};