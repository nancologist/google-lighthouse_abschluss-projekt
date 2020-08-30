# prototype

## Zusätliche Eigenschaften der Desktop-App:

* CLI-Mode (Advance Mode) Für Entwickler

* Dunkel-Modus (umschaltbar)

* Zwei sprachig (Vorgabe: EN, Extra: DE)

* Add Tip Page when the App opens to explain the different aspects and settings of the app.
___

## Import File Extension Rule
* https://github.com/benmosher/eslint-plugin-import
___

## Prototype 2 ([Electron Boilerplate](https://github.com/electron-userland/electron-forge))

### Setup
1. ``npx create-electron-app .`` or ``yarn create electron-app my-new-app``


### Dependencies
* ``electron-reloader`` - For Hot Reloading the app in dev mode.
    * ``npm install electron-reload --save-dev``
    * https://www.geeksforgeeks.org/hot-reload-in-electronjs/
___

## Prototype 1 ``klayman/vue-cli-plugin-electron-builder``
(SFC: Single File Component i.e. ``.vue`` files)

### __Summary:__
* This is a combination of Vue-Cli and Electron which are delivered together
* Unfortunately because of the following problems and security issues between a vue SFC, lighthouse and electron, it doesn't worth it. 

### __Problems:__ 
* ``ipcRenderer`` not working in ``App.vue``
* By generating html there's a ``"no such file or dir"`` error.
* It should be set ``nodeIntegration: true`` for an SFC (So if a script node package (vue-cli dependency or 3rd party package) access internet it could be dangerous.)
___

### Project setup
1. ``vue create .``
2. Install pluging: ``vue add electron-builder``

### Build Process
* ``npm run electron:build``
    
### Using JSX in Vue
* How to add JSX to Vue : https://github.com/vuejs/jsx
* Example1: https://medium.com/js-dojo/using-jsx-with-vue-js-846f4fbbf07f
* Example2: https://scotch.io/tutorials/using-jsx-with-vue-and-why-you-should-care
___
