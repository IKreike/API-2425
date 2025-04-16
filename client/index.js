import './index.css';

console.log('Hello, world!');
// const app = require("express")();


// dit zorgt ervoor dat de browser evenementen uitleest/ uitzend
let sse = new EventSource("http://localhost:3000/stream");
sse.onmessage = console.log


// als je een message ontvangt(refresh)s (infinite refresh loop)
// sse.onmessage = window.location.reload();