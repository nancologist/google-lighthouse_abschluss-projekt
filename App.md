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

## Prototype 2 

### Setup
1. ``git clone https://github.com/electron/electron-quick-start .``
2. ``electron-reloader`` - For Hot Reloading the app in dev mode.
   * ``yarn add electron-reload --save-dev``
   * https://www.geeksforgeeks.org/hot-reload-in-electronjs/
   
3. Create fonts https://google-webfonts-helper.herokuapp.com/

4. Add Eslint https://eslint.org/docs/user-guide/getting-started

## Building and Packaging (https://github.com/electron-userland/electron-builder)
1. ``yarn add electron-builder --dev``
2. ``yarn pack`` to test packaging , ``yarn dist`` to build packages
3. ... (Look at ``electron-builder.pdf``)
___

## Prototype 1 ``klayman/vue-cli-plugin-electron-builder``
(SFC: Single File Component i.e. ``.vue`` files)

___

### __Summary:__
* This is a combination of Vue-Cli and Electron which are delivered together
* Unfortunately because of the following problems and security issues between a vue SFC, lighthouse and electron, it doesn't worth it. 

___

## Depndencies
* __[electron-prompt](https://www.npmjs.com/package/electron-prompt)__
Because ``alert``, ``prompt`` and other process blockers are removed by Electron team we need to use this package.

### __Problems (ALL SOLVED)__ 
* ``ipcRenderer`` not working in ``App.vue``
* It should be set ``nodeIntegration: true`` for an SFC (So if a script node package (vue-cli dependency or 3rd party package) access internet it could be dangerous.)

* ``__dirname`` und andere globale Node-Variablen werden durch webpack manipuliert und ``lighhouse`` braucht diese Variablen um den Bericht zu schreiben. (``background.js`` is unfortunately bundled with webpack.).  
Ich habe viel versucht durch ``webpack.config.js`` dieses Verhalten zu manipulieren aber es geht leider nicht. (Das gleiche passiert mit React-demo-app)
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

### Best of Vuetify for the project
* __Bottom sheets__ : Maybe for showing the test result or the logs of the test.
* __Dialogs__
* __Expansion Panels__ : Maybe for test results or categories
* __Sliders__
* __Parallax__ : Cooooool!
* __Progress > Circular__ : Maybe for the test result
* __Sparklines__ : Maybe for the test result
* __Skeleton Loaders__ for Spinner (or Luke Haas)
* __Tabs__
* __Tooltips__

___

### Planungsabweichungen

* Menü: Für die Applikation wurde nachhinein festgestellt, dass ein klassisches Fenster-Menü nicht unbedingt notwendig ist. Stattdessen wurde für eine bessere Benutzererfahrung (UX) die Drag&Drop-Funktion implementiert, damit der Benutzer nicht lange nach der Sitemap-Datei auf seinem Rechner
 sucht...
 

___

### Benötigte Code-Snippets für die Doku

* __Doku / Seit 9__ : ``utils.js`` > vor allem wo ``lighthouse()`` zu konfigurieren gerufen wird.
