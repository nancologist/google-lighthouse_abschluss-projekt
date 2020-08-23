# Google Lighthouse (Abschlussprojekt)

## Entwicklung einer App/Tool für Google Lighthouse Performance Tests [link](https://intra.powerofone.de/confluence/pages/viewpage.action?pageId=141018370)
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

## Ich muss lerenen...

* Testkriterien
   * __Loading:__ LCP (Largest Contentful Paint)
   * __Interactivity:__ FID (First Input Delay)
   * __Visual Stability:__ CLS (Cumulative Layout Shift)

___

## Meine Fragen

* Die Technologie auswählen
   * Google Extension als Technologie? (Anscheinend existiert schon in "npm lighhouse" wäre trotzdem sinnvoll?)
   * ProtonJS für GUI?
   * ElectronJS für GUI?
   
* In welchen Aspekten soll das Produkt sich von https://web.dev/measure/ unterscheiden? (bzw. wenn so ein Tool schon online gibt warum bauen wir es nochmal?)  
__Meine Antwort:__ möglicherweise wegen der Personlisierungen in der Ausschreibung (Schwellenwerte, PDF Ausgabe usw.)
   
* Welches Repo? (zB Pixelpark Gitlab)
