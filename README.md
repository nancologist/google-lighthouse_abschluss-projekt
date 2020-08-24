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

## 1. Ich muss lerenen...

* Testkriterien (3 wichtige Aspekten in 2020 laut web.dev):
   * __Loading:__ LCP (Largest Contentful Paint)
   * __Interactivity:__ FID (First Input Delay)
   * __Visual Stability:__ CLS (Cumulative Layout Shift)

___

## 2. Meine Fragen (Gespräch mit Erik)

* Die Technologie auswählen für eine Desktop App
   * ElectronJS ist laut meiner Recherche am Sichersten, (vielleicht Electron+Vue oder Electron+React?)
   * __Vuido__ (basiert auf Vue)
    * leider seit zwei Jahren nicht mehr aktualisiert und befindet sich in der Version 0.2.0
    * keine starke Reputation in npmjs.com und github
   * __ProtonNative__ (basiert auf React)
    * auch keine gute Reputation in npmjs.com
    * on MacOS funktioniert nicht mit Node >12.13.0 
   
* In welchen Aspekten soll das Produkt sich von https://web.dev/measure/ unterscheiden? (bzw. wenn so ein Tool schon online gibt warum bauen wir es nochmal?)
__Meine Antwort:__ möglicherweise wegen der Personlisierungen in der Ausschreibung (Schwellenwerte, PDF Ausgabe usw.)
   
* Welcher Repo? (zB Pixelpark Gitlab)
___

## 3. Run Project
1. Install the Lighhouse node package (https://www.npmjs.com/package/lighthouse).  
   ``npm install --save lighthouse``
___

## 4. Electron - Demo App

Hinweise:
* The recommended way of doing so is to install it as a development dependency in your app, which allows you to work on multiple apps with different Electron versions.

## 4.1. with JS (vanilla)

Source: https://www.electronjs.org/docs/tutorial/first-app
1. ``npm init``
2. Add ``electron .`` to pakcage.json
3. ``npm install --save-dev electron``
4. Create index.html in the root dir
5. Run Application: ``npm start``

## 4.2. with React

## 4.3. with Vue
___

## 5. Projekt Bericht (Dokumentation)

_Anmerkung, die Unterteilungen müssen vielleicht nicht unbedingt genau so sein. Aber ich werde ich an den 8 Hauptabschnitten halten_

### 5.1. Einleitung
* Projektbeschreibung
* Projektziel
* Projektumfeld
* Projektbegründung
* Projektschnittstellen
* Projektabgrenzung

### 5.2. Projektplanung
* Projektphasen
* Ressourcenplanung
* Entwicklungsprozess

### 5.3. Analysephase
* Ist-Analyse
* Wirtschaftlichkeitsanalyse
   * "Make or Buy"-Entscheidung
   * Projektkosten
   * Amortisationsdauer
* Nicht-monetäre Vorteile
* Anwendungsfälle
* Lastenheft/Fachkonzept

### 5.4. Entwurfsphase
* Zielplattform
* Architekturdesign
* Entwurf der Benutzeroberfläche
* Datenmodell
* Geschäftslogik
* Pflichtenheft

### 5.5. Implementirungsphase
* Iterationsplanung
* Implementrung der Datenstruktur
* Implmenetierung der Geschäftlogik

### 5.6. Abnahme und Einfürhungsphase
* Abnahme durch den Fachbereich
* Deployment und Einführung
* Abkürzungsverzeichnis (Mori: vielleicht pro Seite als 

### 5.7. Dokumentation

### 5.8. Fazit
* Soll-/Ist-Vergleich
* Lessons Learned
* Ausblick

### Sonstige
* Anhang
* Abbildungsverzeichnis
* Tabellenverzeichnis

___

## 6. Projektantrag (IHK)

### 6.1. Hinweise
* Inhalt des Projektantrags : https://it-berufe-podcast.de/inhalte-des-projektantrags-anwendungsentwickler-podcast-25/
* Beispiele : https://it-berufe-podcast.de/beispiel-fuer-einen-ausfuehrlichen-projektantrag-zum-abschlussprojekt/

### 6.2. Antrag

___
