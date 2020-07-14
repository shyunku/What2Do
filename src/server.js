const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const livereload = require("livereload");
const connectLivereload = require("connect-livereload");
const fireman = require('./firebase');

const PORT = 8080;

// open livereload high port and start to watch public directory for changes
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));

// ping browser on Express boot, once browser has reconnected and handshaken
liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 80);
});


app.use(connectLivereload());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//app.use(favicon(path.join(__dirname, 'static', 'img', 'favicon.ico')));



app.listen(PORT, () => {
    console.log('Server opened in localhost:'+PORT);
});

/** ----------------------- Routing ----------------------- */
// GET
app.get('/', (req, res) => {
    res.render('template/index');
});


// POST
app.post('/post-todoitem', (req, res) =>{
    const data = req.body;
    fireman.addNewTodoItem(data.title, "<uid>", data.importance);
    res.send('OK');
});