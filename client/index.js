import './index.css';

console.log('Hello, world!');
// const app = require("express")();


// dit zorgt ervoor dat de browser evenementen uitleest/ uitzend
let sse = new EventSource("http://localhost:3000/stream");
sse.onmessage = console.log


// als je een message ontvangt(refresh)s (infinite refresh loop)
// sse.onmessage = window.location.reload();

// https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events
sse.onmessage = (event) => {
    const newElement = document.createElement("li");
    const messageList = document.getElementsByClassName("messages");
  
    newElement.textContent = `message: ${event.data}`;
    console.log(newElement.textContent);
    messageList.appendChild(newElement);
    // console.log(newElement)
  };