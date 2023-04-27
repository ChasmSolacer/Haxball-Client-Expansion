[Polski](https://github.com/ChasmSolacer/Haxball-Client-Expansion/blob/master/README_pl.md#haxball-client-expansion)
# Haxball-Client-Expansion
### Note: it will work only in Chromium Browser (Chrome, Edge, Brave, etc.)
The `game-min.js` file is located on haxball.com/play.<br>
In order to modify it, it needs to be overridden

## Instructions
### 1. Download repository
- Click green `Code` button → `Download ZIP`.

![Download ZIP](https://user-images.githubusercontent.com/46286197/215098635-7506d00a-2649-48ef-92aa-2892205a0ddd.png)
- Extract the .zip file anywhere to an empty folder.
- Do not rename the `www.haxball.com` folder or `play` file inside because they must be overridden!

### 2. Open Chromium Browser (Chrome, Edge, Brave, etc.)
#### Set up [Local Overrides](https://developer.chrome.com/blog/new-in-devtools-65/#overrides):
- Navigate to https://www.haxball.com/play.
- Press F12 to open the DevTools panel.
- Open the `Sources` tab.
- Open the `Overrides` tab.

![Open Overrides tab](https://user-images.githubusercontent.com/46286197/230602334-765266de-6b4f-4b5a-9c8c-6333f574dd36.png)
- Click `Select folder for overrides`.

![Select folder for overrides](https://user-images.githubusercontent.com/46286197/230602819-2b8cf3ba-fa73-4960-96fd-be18b0eb06c6.png)
- Select the folder with extracted zip – should contain `www.haxball.com` folder.
- Click `Allow` to give the browser access to folders.

![Click Allow](https://user-images.githubusercontent.com/46286197/230603501-2fe09d7d-19ba-4f27-afad-6997cd2c3d9b.png)
- This will override game-min.js file
- Now **refresh the page**. You should notice some changes (eg. the room list spanning the whole window).
- Hint: the overrides are preserved after browser restart and work in all browser windows, so you have to do it only once. Next time just go to Haxball, press F12 and refresh the page. The changes should apply.

### 3. Adding snippets (optional)
- Snippets allow to save some js files and run them with one click.
- Press F12 to open the DevTools panel.
- Open the `Sources` tab.
- Open the `Snippets` tab.

![Open Snippets tab](https://user-images.githubusercontent.com/46286197/230608281-43c4fa5d-6eb7-4d4a-8189-ad3a520fe7df.png)
- Click `New snippet`

![Click New snippet](https://user-images.githubusercontent.com/46286197/230608837-b500e47b-26e7-4ad5-a794-199e12b252b4.png)
- New snippet file will appear.
- Paste some code you want to run and click the triangle button below (or press Ctrl+Enter) to run the snippet.

![Paste code and run](https://user-images.githubusercontent.com/46286197/230609759-e80f906d-173b-4781-8ac2-7c06767956c4.png)
- Snippets are preserved just like the overrides, so you will always have quick access to them.

NOTE: this will break after a Haxball update.
