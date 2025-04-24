import './index.css';

console.log('Hello, world!');
// const app = require("express")();

// dit zorgt ervoor dat de browser evenementen uitleest/ uitzend
let sse = new EventSource("http://localhost:3000/stream");
// sse.onmessage = console.log


// als je een message ontvangt(refresh)s (infinite refresh loop)
// sse.onmessage = window.location.reload();

// https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events
// sse.onmessage = (event) => {
//     const newElement = document.createElement("li");
//     const messageList = document.getElementsByClassName("messages");

//     newElement.textContent = `message: ${event.data}`;
//     console.log(newElement.textContent);
//     // messageList.appendChild(newElement);
//     // console.log(newElement)
//     // window.location.reload();
//   };

// sse.addEventListener("messageInfo",(messageInfo)=>{
// console.log(messageInfo)
// // console.log(messageInfo)

// })

// sse.on("messageInfo",(event)=>{
//     console.log("messageInfo")
// })

const ClientMessages = [];
// used for the scroll sticking to the bottom
// https://stackoverflow.com/questions/18614301/keep-overflow-div-scrolled-to-bottom-unless-user-scrolls-up
const out = document.querySelector('ul');


sse.addEventListener("message", (messageText) => {
    console.log(messageText.data);
    // de-json the sent information
    let messageInfo = JSON.parse(messageText.data);
    console.log(messageInfo);

    // put the information in the array
    ClientMessages.push(messageInfo);
    renderMessage(messageInfo);
    // zorg dat het venster naar beneden is gescrolled
    out.scrollTop = out.scrollHeight - out.clientHeight
});

// thank you chatgpt for the idea
// function used to put the messages in the frame clientside (without reloading)
function renderMessage(messageInfo) {
    console.log(ClientMessages);
    // make the objects
    const chat = document.querySelector('ul');
    const messageItem = document.createElement('li');
    const time = document.createElement('p');
    const userName = document.createElement('h3');

    messageItem.classList.add("message")
    messageItem.classList.add(`other`)
    // messageInfo.setAttribute("id", "client")

    // fill the objects
    userName.textContent = messageInfo.id;
    messageItem.textContent = messageInfo.bericht;
    time.textContent = messageInfo.date;

    // put the stuff in the html
    chat.appendChild(messageItem);
    messageItem.appendChild(time);
    chat.insertBefore(userName, messageItem)
}

// doe deze dingen als de pagina word geladen
document.addEventListener("DOMContentLoaded", function () {
    console.log("page load?")
    console.log(ClientMessages.object)
    for (object in ClientMessages) {
        console.log(ClientMessages.data)
    }
    // zorg dat het venster naar beneden is gescrolled
    out.scrollTop = out.scrollHeight - out.clientHeight
});


