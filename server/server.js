import 'dotenv/config';
import { App } from '@tinyhttp/app';
import { logger } from '@tinyhttp/logger';
import { Liquid } from 'liquidjs';
import sirv from 'sirv';
import bodyParser from 'body-parser';

// FIXME: ${json.number}
let ApiUrl = `http://numbersapi.com/random/trivia?json`;
// const data = {
//   'beemdkroon': {
//     id: 'beemdkroon',
//     name: 'Beemdkroon',
//     image: {
//       src: 'https://i.pinimg.com/736x/09/0a/9c/090a9c238e1c290bb580a4ebe265134d.jpg',
//       alt: 'Beemdkroon',
//       width: 695,
//       height: 1080,
//     }
//   },
//   'wilde-peen': {
//     id: 'wilde-peen',
//     name: 'Wilde Peen',
//     image: {
//       src: 'https://mens-en-gezondheid.infonu.nl/artikel-fotos/tom008/4251914036.jpg',
//       alt: 'Wilde Peen',
//       width: 418,
//       height: 600,
//     }
//   }
// }


const engine = new Liquid({
  extname: '.liquid',
});

const app = new App();

app
  .use(logger())
  .use(sirv('dist'))
  .use(bodyParser.urlencoded({ extended: true }))
  .listen(3000, () => console.log('Server available on http://localhost:3000'));

let messages = [];
// FIXME: is eigenlijk hetzelfde object wat steeds overgeschreven word
const messageInfo = new Object();

app.get('/', async (req, res) => {
  const data = await fetch(ApiUrl)
  console.log(messages);
  const json = await data.json();

  return res.send(renderTemplate('server/views/index.liquid', { title: 'Home', items: json, messages, messageInfo}));
});

// van cyd en copilot
app.post('/message', async (req, res) => {
 

  const message = req.body.message;
  if (message) {
    // console.log('[MESSAGE!!!]', message);
    // messages.push(message);


    // instead of putting message in the messages array, we add it to an object
    // add message and date and id
    messageInfo.bericht = message;
    messageInfo.date = new Date().getHours() +":"+ new Date().getMinutes();
    messageInfo.id = "Iris";

    // log only the timestamp out of the date
    // FIXME: time currently gets globally updated for all messages (due to it being 1 object?)
    console.log(messageInfo);

    console.log("test of the object");
    messages.push(messageInfo.bericht);
    // messages is de array met alle berichten
    // messageInfo is het object met alle informatie over het bericht

    for (message) {

    }




    // remove the initial message if it is just /random-fact
    messages = messages.filter(message => message !== '/random-fact');

    // eigen code
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

      console.log(json.number);
      console.log(json.text);
      messages.push(json.text);
      // messages.push("FUN FACT");

      // reset to a random fact
      ApiUrl = `http://numbersapi.com/random/trivia?json`;
    }
  }
  res.writeHead(303, { Location: '/' });
  res.end();
})


// app.get('/plant/:id/', async (req, res) => {
//   const id = req.params.id;
//   const item = data[id];
//   if (!item) {
//     return res.status(404).send('Not found');
//   }
//   return res.send(renderTemplate('server/views/detail.liquid', { title: `Detail page for ${id}`, item }));
// });

const renderTemplate = (template, data) => {
  const templateData = {
    NODE_ENV: process.env.NODE_ENV || 'production',
    ...data
  };

  return engine.renderFileSync(template, templateData);
};


// vanuit browser tech
// var inp = document.querySelector('.sent');
// console.log(inp);
// var i = 0;
// while (i < inp.length) {
//     inps[i].addEventListener("input", opslaan);
//     i++;
// }

// function opslaan() {
//   // localstorage api
//   localStorage.setItem(this.name, this.value);
// }