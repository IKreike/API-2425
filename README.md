# API @cmda-minor-web 2024 - 2025
Het web is een geweldige plek en de beschikbare technologieën ervan zijn vandaag de dag krachtiger dan ooit tevoren.
De kracht van het web ligt in het feit dat het een platform is dat voor iedereen beschikbaar is en dat het gebaseerd is
op open standaarden. De technologieën worden ontworpen en gespecificeerd op basis van consensus en zijn niet in handen
van één enkele entiteit.

Desondanks zijn er veel mensen en bedrijven die vinden dat het internet niet voldoet aan hun behoeften. Dit blijkt uit
de pogingen van grote techbedrijven om hun eigen afgesloten ecosystemen te creëren. Ze streven hiermee naar controle over
zowel de gebruikerservaring als de gegenereerde data.

**In dit vier weken durende vak zullen we de kracht van het web ervaren en kijken hoe we (mobiele) web apps kunnen maken die
net zo aantrekkelijk zijn als native mobiele apps. We beginnen met het maken van een server-side gerenderde applicatie
waarbij we geleidelijk de gebruikerservaring verbeteren met relevante beschikbare web API's.**

[TLDR; hoe zet ik mijn project op?](#Inrichten-ontwikkelomgeving)

## Doelen

Na deze cursus zul je:

- In staat zijn om een server-side gerenderde applicatie te maken.
- In staat zijn om een enerverende gebruikerservaring te creëren.
- Een breder begrip hebben van het web en zijn mogelijkheden.

## Opdracht

In dit vak zullen we een van de meest voorkomende app-concepten van vandaag
gebruiken en ontdekken dat we deze kunnen maken met moderne webtechnologie
met als doel om een rijke gebruikerservaring creëeren.

Randvoorwaarden:

- Minimaal een overzichts- en detailpagina
- Gebouwd in TinyHTTP + Liquid
- Minimaal een content API
- Minimaal twee Web API's

Voorbeelden:

- Maak je eigen streamingplatform (Netflix/Spotify).
- Maak je eigen doom-scroll-app (Instagram/TikTok).
- Maak je eigen chatapplicatie (WhatsApp/Signal).
- Een andere app die je zelf leuk vindt...

Voorbeeld content API's die je kan gebruiken:

- [MovieDB API](https://developer.themoviedb.org/reference/intro/getting-started)
- [Rijksmuseum API](https://data.rijksmuseum.nl/object-metadata/api/)
- [Spotify API](https://developer.spotify.com/documentation/web-api)
- ...

Voorbeelden van Web API's die je kan gebruiken:

- [Page Transition API voor animaties tusse npagina's](https://developer.mozilla.org/en-US/docs/Web/API/Page_Transitions_API)
- [Web Animations API voor complexe animaties](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)
- [Service Worker API voor installable web apps](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Web Push API voor push notifications](https://developer.mozilla.org/en-US/docs/Web/API/Push_API)
- [Server sent events voor realtime functionaliteit](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)
- [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- [Web Share API voor sharen van content binnen de context van de gebruiker](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share)
- ...

De lijst is eindeloos, laat je vooral inspireren op de overzichtspagina van [MDN](https://developer.mozilla.org/en-US/docs/Web/API).

## Beoordeling
De beoordelingscriteria zijn te vinden op [DLO](https://dlo.mijnhva.nl/d2l/le/content/609470/Home)

## Planning

| Planning                   | Maandag               | Dinsdag            | Vrijdag                                     |
|----------------------------|-----------------------|--------------------|---------------------------------------------|
| Week 1 - Kickoff & concept | Introductie ne uitleg | Workshops          | Feedback gesprekken                         |
| Week 2 - The baseline      | College + workshops   | Workshops          | Feedback gesprekken                         |
| Week 3 - Enhance           | College + workshops   | Workshops          | Feedback gesprekken(*DONDERDAG*)            |
| Week 4 - Enhance & wrap up | Tweede paasdag        | Individuele vragen | Beoordelingsgesprekken(*DONDERDAG/VRIJDAG*) |

## Bronnen

- [Nodejs.org](https://nodejs.org/en/), voor de installatie van NodeJS op jouw systeem, kies voor NodeJS 22.13.1 Long Term Support. Dit is de meest stabiele versie van NodeJS, welke ondersteund wordt met goede documentatie.
- [VSCode How To Open Terminal](https://www.youtube.com/watch?v=OmQhOnBzg_k), om iemand de terminal te zien openen en gebruiken op Youtube.
- [Introduction to NodeJS](https://nodejs.dev/en/learn/), voor een in depth introductie met de NodeJS ontwikkelomgeving. Let op: dit is best een technisch verhaal. De eerste zes pagina’s zijn interessant.
- Om serverside te kunnen renderen maken we gebruik van [TinyHttp](https://github.com/tinyhttp).
- Voor templating maken we gebruik van [LiquidJS](https://liquidjs.com/).
- [Liquid Filters](https://liquidjs.com/filters/overview.html)
- Voor build tooling(CSS en JS) maken we gebruik [Vite](https://vitejs.dev/).
- [Using the Fetch API @ MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [JSON.parse() @ MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)
- [Partial commits in GitHub Desktop](https://github.blog/news-insights/product-news/partial-commits-in-github-for-windows/)
- [Committing and reviewing changes to your project in GitHub Desktop](https://docs.github.com/en/desktop/making-changes-in-a-branch/committing-and-reviewing-changes-to-your-project-in-github-desktop)

## Inrichten ontwikkelomgeving

1. Navigeer naar [nodejs.org](https://nodejs.org/en/) en installeer de NodeJS ontwikkelomgeving. Kies voor _NodeJS 22.13.1 with long-term support_, download de benodigde bestanden en doorloop het installatieproces.

2. Fork daarna [deze repository](https://github.com/cmda-minor-web/API-2425) en *clone* deze op jouw computer.

3. Open deze repository in je code editor.

4. Open de _Terminal_ in Visual Studio Code door de toetscombinatie `` ^` `` (control + `) te gebruiken. Er opent een terminalscherm in de hoofdmap van jouw project.

5. Voer in de terminal het commando `npm install` uit, door het in te typen en op enter te drukken. Je gebruikt _NPM_, de _NodeJS Package Manager_ om alle _afhankelijkheden_ voor dit project te installeren. NPM is een veelgebruikte package manager in frontend land. Voor dit project gebruiken we _TinyHTTP_ (om een _server_ te maken) en _Liquid_ (om HTML te _renderen_).
- (Optioneel) Na de installatie is de map `node_modules` aangemaakt, en gevuld met allerlei _packages_. Scroll eens door deze map heen; vele honderden *open source* ontwikkelaars hebben de packages die je ziet gebouwd en die mag je gratis gebruiken. Ontwikkelen in NodeJS is *standing on the shoulders of giants*.

### Project starten en stoppen
Start het voorbeeldproject op door in de terminal het commando `npm run dev` uit te voeren. Als het goed is, komt een melding te staan over het opstarten van de server: `Server available on http://localhost:3000` — Open deze URL in je browser. Let op: Vite draait op een andere poort dan TinyHTTP, dus je moet de poort van TinyHTTP gebruiken: http://localhost:3000

Als het werkt, zet je je server weer uit door in de terminal de toetscombinatie `^c` (control + c) in te voeren. Deze toetsencombinatie wordt in de terminal gebruikt om de huidige taak te stoppen en *controle* (vandaar de c) terug te krijgen van het programma.

- Optioneel: Volg het [NodeJS ‘Hello World’ voorbeeld](https://medium.com/@mohammedijas/hello-world-in-node-js-b333275ddc89)
- Optioneel, iets technischer: Lees de eerste vijf delen van [Introduction to Node](https://nodejs.dev/en/learn/) als je een meer in-depth introductie wilt met de NodeJS ontwikkelomgeving.

# Processverslag
## week 1
1. ideegeneratie
Ik vond het best lastig om een idee te bedenken waar ik enthousiast voor werd. Ik denk dat ik hierdoor ook een best moeilijke opdracht heb uitgekozen. Ik had de content api die ik wou gebruiken al vrij snel gevonden, en omdat hij relatief simpel was is er juist heel veel mogelijk. Ik ben uiteindelijk geland op een chatapp met het gebruik van "commands" waarbij je de API kan aanroepen. 

content API: 
http://numbersapi.com/#52/trivia
## week 2
2. bericht opslaan in array, arrayelementen inladen in html
3. controleren op command, bericht vervangen door bericht van API
4. object maken van bericht voor meer informatie (tijd, ID)
## week 3
5. Server-sent events API
## week 4
6. Login pagina
7. User ID en cookie API





week3
- zorg dat het heen en weer goed werkt
- zorg voor goed documentatie


## Huidige features
- /random-fact command
- meerdere devices in 1 chatroom
- kan code schrijven in de chat (its not a bug its a feature)
- supported on mobile
- usernames
The rit met het OV nadat dit werkte leek heel snel te gaan

## wat zou ik nog willen toevoegen/verbeteren
- image support<br>
Doordat het bericht direct in de html word gezet, zou ik kunnen checken of het bericht eindigd in een img indicatie (.jpeg, .png etc) en dan het bericht kunnen insluiten in een image tag "<img src="https://i.pinimg.com/736x/dd/a0/90/dda090574e456815e4f80965a773ae61.jpg" width="560">". Zo zou ik plaatjes kunnen renderen in the chatgroep.
- client-side javascript die op de server werkt<br>
De client-side javascript werkt momenteel helaas niet op de server, waardoor je met de hand moet refreshen om nieuwe berichten te zien en er niet automatisch gescrolld word. Dat is jammer en het verbeterd het leven veel.
- tijd<br>
Er is een kleine bug met de tijd, want als de minuten 1 getal zijn laat hij ook maar 1 getal zien. Dit zou ik kunnen oplossen door te checken op de hoeveelheid tekens in de huidige minuten en als het een 1 is er een 0 voor zetten. (13:8 => 13:08)
- commands<br>
Ik zou wel eindeloos kunnen doorgaan met leuke commands verzinnen 
- typing state<br>
Het zou mogelijk kunnen zijn om met sse events een event af te sturen waarbij er vermeld word of een gebruiker aan het typen is.
- <b>colored names </b> <br>
Het zou nuttig zijn als elke gebruiker een eigen (gerandomiseerde?) kleur heefd in zijn naam duidelijker te maken wie wie is
- <b> speech to text </b><br>
Dat zou toch cool zijn? Ook een extra API

<b></b>

### bronnen
https://stackoverflow.com/questions/175739/how-can-i-check-if-a-string-is-a-valid-number

https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events

https://github.com/fdnd-task/server-side-rendering-server-side-website/blob/main/server.js

server sent events tryout code
https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events

Server sent events uitleg
https://www.youtube.com/watch?v=4HlNv1qpZFY 

hoe krijg je de site online
https://github.com/fdnd-task/connect-your-tribe-profile-card/blob/main/docs/visitekaartje-met-nodejs.md#visitekaartje-integreren-en-live-testen

Declan

Cyd

chatgpt
