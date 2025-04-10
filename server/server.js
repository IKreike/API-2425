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

app.get('/', async (req, res) => {
  const data = await fetch(ApiUrl)
  console.log(messages);
  const json = await data.json();

  return res.send(renderTemplate('server/views/index.liquid', { title: 'Home', items: json, messages }));
});

// van cyd en copilot
app.post('/message', async (req, res) => {

  const message = req.body.message;
  if (message) {

    // console.log('[MESSAGE!!!]', message);
    messages.push(message);

    // remove the initial message if it is just /random-fact
    messages = messages.filter(message => message !== '/random-fact');

    // eigen code
    if (message.includes(`/random-fact`)) {
      console.log("its random fact day");
      // dont nececerily need to act if the command is only part of the message, yet I could try?

      let number = message.replace('/random-fact ', ''); // remove the command from the message
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