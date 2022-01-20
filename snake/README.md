# @jsgame/snakegame
The JS in-browser Snake Game: dodge barriers, eat food.

## Usage
### In HTML
Import `snake-game.js` to your module script, after that you will be able
to access all game API via `window['snakeGame']`.

Call `injectGame(selector)` function to inject the field by the given selector.
```html
    <body>
        <div id="snake-game"></div>

        <script type="module">
          import "./snake/dist/snake-game.js";
          const { injectGame } = window['snakeGame'];
          injectGame('#snake-game');
        </script>
    </body>
```


## Development
Install dependencies `npm install`  and build the app `npm run build`.
