import 'dotenv/config';
import { App } from '@tinyhttp/app';
import { logger } from '@tinyhttp/logger';
import { Liquid } from 'liquidjs';
import sirv from 'sirv';
import bodyParser from 'body-parser';

import { EventEmitter } from 'node:events';


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

app.get('/', async (req, res) => {
  const data = await fetch(ApiUrl)
  console.log(messages);
  const json = await data.json();

  return res.send(renderTemplate('server/views/index.liquid', { title: 'Home', items: json, messages }));
});

// trying server sent events SSE
// source: https://www.youtube.com/watch?v=4HlNv1qpZFY
app.get("/stream", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.write("data: " + "oiwehjfjo'iaerhgdo'i!\n\n");

  // if we recieve a newMessage event
  events.on("newMessage", (messageInfo) => {
    // message to the console
    // res.write("data: " + "hello!\n\n");
    res.write("data: " + "reload\n\n");
    // message to the terminal
    // console.log("message sent and sruff gor testing");
    // console.log(messageInfo);
    // do something to refresh the page?
    // reload();
  })
})

// basis van cyd en copilot
app.post('/message', async (req, res) => {
  const message = req.body.message;
  if (message) {
    // console.log('[MESSAGE!!!]', message);
    let messageInfo = new Object();
    // instead of putting message in the messages array, we add it to an object together with a timestamp and an id
    messageInfo.bericht = message;
    messageInfo.date = new Date().getHours() + ":" + new Date().getMinutes();
    messageInfo.id = "User";

    // check the current object and put it in the messages array
    console.log(messageInfo);
    console.log("test of the object");
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
    events.emit("newMessage", messageInfo) // in tweede argument data meegeven
  }
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
