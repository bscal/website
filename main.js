var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));
app.use(express.static(path.join(__dirname, "client")));

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/html/index.html");
});

// Test Code/Pages
app.get('/solarsystem', function (req, res) {
    res.sendFile(__dirname + "/html/solarsystem.html");
});

app.get('/league', function (req, res) {
    res.sendFile(__dirname + "/html/league.html");
});

app.get('/escc', function (req, res) {
    res.sendFile(__dirname + "/html/escc.html");
});

app.get('/registeration', function (req, res) {
    res.sendFile(__dirname + "/html/registeration.html");
});

app.get('/paperpage', function (req, res) {
    res.sendFile(__dirname + "/html/paper.html");
});

app.get('/phaser', function (req, res) {
    res.sendFile(__dirname + "/html/phaser-test.html");
});

io.on('connection', function (socket) {
    console.log("A user connected");
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});

http.listen(3000, function () {
    console.log("listening on *:3000");
});