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

sse.addEventListener("message", (messageText) => {
    console.log(messageText.data);
    let messageInfo = JSON.parse(messageText.data);
    console.log(messageInfo.bericht);

    messageInfo.id = "other";

    // put the information in the array
    ClientMessages.push(messageInfo);
    renderMessage(messageInfo);

    // console.log(messageInfo);
    // console.log(ClientMessages);
    // console.log("hello");
});

// thank you chatgpt for the idea
function renderMessage(messageInfo) {
    console.log(ClientMessages);
    const chat = document.querySelector('ul');
    const messageItem = document.createElement('li');
    const time = document.createElement('p');
    messageItem.classList.add("message")
    messageItem.classList.add(`${messageInfo.id}`)
    // messageInfo.setAttribute("id", "client")

    messageItem.textContent = messageInfo.bericht;
    time.textContent = messageInfo.date;
    chat.appendChild(messageItem);
    messageItem.appendChild(time);

    // console.log(ClientMessages)
}

document.addEventListener("DOMContentLoaded", function() {
    console.log("page load?")
    console.log(ClientMessages.object)
    for (object in ClientMessages) {
        console.log(ClientMessages.data)
}
  });
// function loadPage(){
// for (object in ClientMessages) {

// }
// }