'use strict';

var parse = require('parse-torrent');
var fs = require('fs');
var Client = require('bittorrent-tracker');
var peerId = new Buffer(20);
peerId.fill(0);

fs.readdirSync(__dirname + '/torrents').forEach(function(file) {
  var torrent = parse(fs.readFileSync(__dirname + '/torrents/' + file));
  var client = new Client(peerId, 12345, torrent);
  client.on('error', function(err) {
    console.log(err);
  });
  client.on('update', function(data) {
    console.log('Update for %s: %j', file, data);
  });
  client.start();
  client.once('update', client.complete.bind(client));
  // client.complete();
  // setInterval(client.update.bind(client), 1000*60*20);
});
