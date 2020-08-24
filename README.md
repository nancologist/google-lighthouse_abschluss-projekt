# Google Lighthouse (Abschlussprojekt)

## 0. Entwicklung einer App/Tool für Google Lighthouse Performance Tests [link](https://intra.powerofone.de/confluence/pages/viewpage.action?pageId=141018370)
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

* Die Technologie auswählen
   * Google Extension als Technologie? (Anscheinend existiert schon in "npm lighhouse" wäre trotzdem sinnvoll?)
   * ProtonJS für GUI?
   * ElectronJS für GUI?
   * 5 Best JS Desktop App Technologien: https://brainhub.eu/blog/javascript-frameworks-for-desktop-apps/
   
* In welchen Aspekten soll das Produkt sich von https://web.dev/measure/ unterscheiden? (bzw. wenn so ein Tool schon online gibt warum bauen wir es nochmal?)  
__Meine Antwort:__ möglicherweise wegen der Personlisierungen in der Ausschreibung (Schwellenwerte, PDF Ausgabe usw.)
   
* Welcher Repo? (zB Pixelpark Gitlab)
___

## 3. Run Project
1. Install the Lighhouse node package globally (https://www.npmjs.com/package/lighthouse).  
   ``npm install -g lighthouse``
   
   
___

## 4. Warum Proton Native?

### 4.1. Leichter als ElectronJS

__ElectronJS:__  
* brings a lot of overheads (Nachteil)
* runs a full Webbrowser to manage a small GUI (Nachteil)

__Proton Native:__
* uses native tools with (nicht web-basiert wie ElectronJS)
* smaller size and less resource usage.

### 4.2. Hello World mit Proton Native
Quelle: https://www.freecodecamp.org/news/build-native-desktop-apps-with-javascript-a49ede90d8e9/

### 4.3. Links
Andere Beispielprojekte: https://github.com/kusti8/proton-native/tree/master/examples

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
