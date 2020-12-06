# Google Lighthouse (Abschlussprojekt)

## 0. Entwicklung einer App/Tool für Google Lighthouse Performance Tests - [link](https://intra.powerofone.de/confluence/pages/viewpage.action?pageId=141018370)
Idee: Mittels eines CI Tools/App eine beliebige Anzahl von Seiten einer Website mittels Google Lighthouse testen

* Ohne GUI: CI Tool (Node.js)

* mit GUI (vom Aufwand her eher was für 2 Personen)
    * Desktop App durch z.B. Electron
    * dadurch auch für andere nutzbar, z.B. Projektmanager

* Seiten definieren durch z.B. sitemap.xml
    * wird oft bereits mitgeliefert beim Build (z.B. bei Hugo oder Nuxt.js)
    * Seiten ausschließen mittels pattern "/exclude/this/path/*"    

* Jeder Test läuft gegen vorher definierte Mindestwerte
    * vom Kunden definiert? (wie bei Pfizer)
    * Branchendurchschnitt? (woher nehmen?)
    * App: per GUI einstellbar?

* Zum Schluß wird ein Report generiert (PDF) 
    * bei der App kann das auch interaktiv sein (z.B mit Charts)
    * welche Seiten liegen unter den vorher definierten Werten?
    * Maßnahmen zusammenfassen und nach Wichtigkeit sortieren (critical, medium, minor)
    
* Useful Links:
    * https://www.npmjs.com/package/lighthouse
    * https://web.dev/measure/
    * https://web.dev/vitals/

___

## 3. Run Project
1. Install the Lighhouse node package (https://www.npmjs.com/package/lighthouse).  
   ``npm install --save lighthouse``
2. ``npm start``
___

## 4. Core Stacks: ElectronJS + VueJS
    
### [App2 mit Vue Cli & Electron-builder Plugin](https://github.com/nklayman/vue-cli-plugin-electron-builder)
* https://nklayman.github.io/vue-cli-plugin-electron-builder/
1. ``vue create app2``
2. ``vue add electron-builder``
3. Choose Electron Version: ``^9.0.0``
3. ``npm run electron:serve``

* Build for different OS and options:
    * Use ``-mwl`` for all three OS, or ``--mac`` , ``--win`` and ``--linux`` (And ``--ia32``, ``--x64`` to specify arch)
    * Use the above CLI args by ``$ npm run electron:build`` , and then it will be forwarded to the __electron-builder__
    * [Vue-Electron Pluging Guide](https://nklayman.github.io/vue-cli-plugin-electron-builder/guide/configuration.html#table-of-contents)
    * [Electron-builder Guide](https://www.electron.build/multi-platform-build)
___
