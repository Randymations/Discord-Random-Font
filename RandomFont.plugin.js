//META{"name":"RandomFont","authorId":"384167892012498944","website":"https://github.com/Randymations", "source":"https://github.com/Randymations/Discord-Random-Font"}*//

/*@cc_on
@if (@_jscript)
	var shell = WScript.CreateObject("WScript.Shell");
	var fs = new ActiveXObject("Scripting.FileSystemObject");
	var pathPlugins = shell.ExpandEnvironmentStrings("%APPDATA%\\BetterDiscord\\plugins");
	var pathSelf = WScript.ScriptFullName;
	shell.Popup("It looks like you've mistakenly tried to run me directly. \\n(Don't do that!)", 0, "I'm a plugin for BetterDiscord", 0x30);
	if (fs.GetParentFolderName(pathSelf) === fs.GetAbsolutePathName(pathPlugins)) {
		shell.Popup("I'm in the correct folder already.", 0, "I'm already installed", 0x40);
	} else if (!fs.FolderExists(pathPlugins)) {
		shell.Popup("I can't find the BetterDiscord plugins folder.\\nAre you sure it's even installed?", 0, "Can't install myself", 0x10);
	} else if (shell.Popup("Should I copy myself to BetterDiscord's plugins folder for you?", 0, "Do you need some help?", 0x34) === 6) {
		fs.CopyFile(pathSelf, fs.BuildPath(pathPlugins, fs.GetFileName(pathSelf)), true);
		// Show the user where to put plugins in the future
		shell.Exec("explorer " + pathPlugins);
		shell.Popup("I'm installed!", 0, "Successfully installed", 0x40);
	}
	WScript.Quit();
@else @*/

class RandomFont {

    getName() {return 'RandomFont';}
    getDescription() {return 'Loads a random font from Google\'s font server upon Discord\'s launch.';}
    getVersion() {return '1.0'}
    getAuthor() {return 'Randymations';}
    load() {}

    start() {
        const API_KEY = 'AIzaSyA1EdcTvRtwyQvHGgbG_ccNzA5k-Gf0yFk';
        let fontsList = [];
        async function loadFontsList() {
            try {
                const result = await fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=' + API_KEY);
                const data = await result.json();
                console.log('Loaded Google fonts list: ', data.items.length);
                return data.items;
            } catch (error) {
                console.log('loadFontsList', error, error.message);
            }
        }
        function loadRandomFont(fontsList) {
            const randomIndex = Math.floor(Math.random() * fontsList.length);
            const chosenFont = fontsList[randomIndex].family;
            console.log('Chosen font: ', chosenFont);
            return chosenFont;
        }
        function updateFont(chosenFont) {
            const style = document.createElement('style');
            const urlName = (chosenFont).replace(/ /g, '+')
            style.setAttribute('id', 'RandomFont');
            style.textContent = `@import url('https://fonts.googleapis.com/css2?family=${urlName}&display=swap');\n::-webkit-input-placeholder, body, button, input, select, textarea {font-family: '${chosenFont}';}`;
            document.head.append(style);
        }
        async function main() {
            fontsList = await loadFontsList();
            const chosenFont = loadRandomFont(fontsList);
            updateFont(chosenFont);
        }
        main();
    }

    stop() {
        console.log("Random Font stopped");
        document.getElementById("RandomFont").remove();
    }
}

/*@end@*/
