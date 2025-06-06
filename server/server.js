import 'dotenv/config';
import { App } from '@tinyhttp/app';
import { logger } from '@tinyhttp/logger';
import { Liquid } from 'liquidjs';
import sirv from 'sirv';
import bodyParser from 'body-parser';

import { EventEmitter } from 'node:events';

import { parse, serialize } from '@tinyhttp/cookie';


let ApiUrl = `http://numbersapi.com/random/trivia?json`;

const engine = new Liquid({
  extname: '.liquid',
});

const app = new App();
const events = new EventEmitter;

app
  .use(logger())
  .use(sirv('dist'))
  .use(bodyParser.urlencoded({ extended: true }))
  .listen(3000, () => console.log('Server available on http://localhost:3000'));

let messages = [];

// als er om de indexpage gevraagd word...
app.get('/', async (req, res) => {
  const data = await fetch(ApiUrl)
  const json = await data.json();

  // krijg de username vanuit het opgeslagen cookie (of neem een blank string om errors te voorkomen) (scr: declan)
  const cookie = parse(req.headers.cookie || "");
  const user = cookie.username;
  console.log(user)
  // als er een username is ingevuld, laad de main pagina, anders (terug) naar login
  if (user) {
    return res.send(renderTemplate('server/views/index.liquid', { items: json, messages, user }));
  } else {
    res.redirect('/login');
  }
});

// als er om de login gevraagd word, render de loginpagina
app.get("/login", (req, res) => {
  return res.send(renderTemplate('server/login/login.liquid'));
})

// als er op de loginpagina een post word verstuurt
app.post("/login", (req, res) => {
  const user = req.body.user

  // check of er een gebruiker word meegestuurd en stuur dan door naar de mainpage, anders error
  if (user) {
    res.setHeader('Set-Cookie', 'username=' + user)
    res.redirect('/')
  } else (
    res.status(400).send('username is required')
  )
})

// trying server sent events SSE
// source: https://www.youtube.com/watch?v=4HlNv1qpZFY
app.get("/stream", (req, res) => {
  // maak de content stream aan
  res.setHeader("Content-Type", "text/event-stream");

  // if we recieve a newMessage event
  events.on("newMessage", (messageInfo) => {
    // message to the console
    // res.write("data: " + "message sent\n\n");
    // message to the terminal
    // console.log("message sent and sruff gor testing");

    // stuur het bericht als json naar de server
    let messageText = JSON.stringify(messageInfo)
    res.write("data: " + `${messageText}\n\n`);
  })
})

// basis van cyd en copilot
app.post('/message', async (req, res) => {
  const message = req.body.message;
  const user = req.body.user;

  if (message) {
    // console.log('[MESSAGE!!!]', message);
    let messageInfo = new Object();
    // instead of putting message in the messages array, we add it to an object together with a timestamp and an id
    messageInfo.bericht = message;
    // FIXME: do something if it is a 0 bc it only shows singledigits (would probably check if it is one digit and if its true put a 0 in front)
    messageInfo.date = new Date().getHours() + ":" + new Date().getMinutes();
    messageInfo.id = user;

    // put it in the messages array
    messages.push(messageInfo);
    // messages is de array met alle berichten
    // messageInfo is het object met alle informatie over het bericht

    // als er /random-fact in het bericht staat...
    if (message.includes(`/random-fact`)) {
      console.log("its random fact day");

      let number = message.replace('/random-fact ', ''); // remove the command from the message
      // if the message is a number, use that number for the url
      if (isNaN(number) == false) {
        number = parseInt(number); // change the string into a number
        ApiUrl = `http://numbersapi.com/${number}/trivia?json`;
      }

      // gain/update the api and url information
      const data = await fetch(ApiUrl)
      const json = await data.json();

      messageInfo.bericht = json.text;
      messageInfo.id = "BOT";

      // reset to a random fact
      ApiUrl = `http://numbersapi.com/random/trivia?json`;
    }
    // als je een message ontvangt, stuur een ping naar de server
    console.log({ messages })
    events.emit("newMessage", messageInfo) // in tweede argument data meegeven
  }
  // get sent back to the page(reload)
  res.writeHead(303, { Location: '/' });
  res.end();
})


const renderTemplate = (template, data) => {
  const templateData = {
    NODE_ENV: process.env.NODE_ENV || 'production',
    ...data
  };

  return engine.renderFileSync(template, templateData);
};
