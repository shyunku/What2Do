const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');

const PORT = 8080;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//app.use(favicon(path.join(__dirname, 'static', 'img', 'favicon.ico')));

app.get('/', (req, res) => {
    res.render('example');
});

app.listen(PORT, () => {
    console.log('Server opened in localhost:'+PORT);
});