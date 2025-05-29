window.addEventListener('DOMContentLoaded', () => {
    settings.getTheme();
    var radios = document.forms["theme-form"].elements["theme"];
    for (radio in radios) {
        radios[radio].onclick = function () {
            settings.switchTheme({ theme: this.value });
        }
    }
    window.settings.onUpdateTheme((data) => {
        setTheme(data.theme);
    })

    window.settings.onTheme((data) => {
        var radios = document.forms["theme-form"].elements["theme"];
        console.log("theme: ", data)
        for (radio in radios) {
            if (radios[radio].value === data.theme) {
                radios[radio].checked = true;
            }
        }
    });
});

function setTheme(theme) {
    const themeLink = document.getElementById('theme-link');
    themeLink.href = theme === 'dark' ? 'dark.css' : 'light.css';
}