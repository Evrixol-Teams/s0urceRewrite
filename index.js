/*
here goes our attempt to revive the s0urce.io game
with a private server and a custom client
*/

const config = require('./settings');
const AdRemover = require('./utils/adRemover.js');

const Server = require('./classes/Server');
const Player = require('./classes/Player');
const Firewall = require('./classes/Firewall');
const Upgrade = require('./classes/Upgrade');
const HackingHandler = require('./classes/HackingHandler');
const DatabaseManager = require('./classes/DatabaseManager');

const Express = require('express');
const http = require('http');

(async () => {
	const app = Express();
	app.get('/', (req, res) => res.sendFile(__dirname + '/client/index.html'));
	app.use('/client/img/word', Express.static(__dirname + '/client/img/word/', { extensions: ['png'] }))
	app.use('/client', Express.static(__dirname + '/client'));
	app.use('/ads', AdRemover);

	const httpServer = http.createServer(app);
	const server = new Server(httpServer);

	httpServer.listen(config.port, () => console.log('Server Started'));
})();