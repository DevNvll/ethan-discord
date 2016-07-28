const Discord = require("discord.js");
const client = new Discord.Client();

const youtubeStream = require('youtube-audio-stream');
const chalk = require('chalk');
const fs = require('fs');
const levelup = require('levelup');
const brain = levelup('./ethan_data');

const cfg = require('./botCfg.json');
let cmds = [];

let setupCmds = function() {
  fs.readdir(__dirname+'/commands/', function readdir(error, files) {
    if(error) {
      return console.log(error);
    }
    for (var x = 0; x < files.length; x++) {
      require('./commands/'+files[x]);
    }
  });
}();

client.loginWithToken(cfg.token);

client.on('ready', function() {
    console.log(chalk.green.bold("%s"), cfg.name, chalk.blue("is ready to go!"));
    if(cfg.game) client.setPlayingGame(cfg.game);
    if(cfg.dev) require("./utils/vorpalCmd.js")(client); //development command line
});

client.on("message", function(message) {
    for(let x=0; x < cmds.length; x++) {
      if(message.content.match(cmds[x].trigger)){
        cmds[x].run(message.channel.id, message);
      }
    }
    // if(message.content === "!fuckumang") {
    //     client.joinVoiceChannel(message.author.voiceChannel.id, (err, connection) => {
    //       connection.playRawStream(youtubeStream('http://youtube.com/watch?v=lbrBHUlJVfM'));
    //     });
    // }
    // if(message.content.match(/!echo (.*)/i)) {
    //
    // }
    // if(message.content.match(/!play (.*)/i)) {
    //     client.joinVoiceChannel(message.author.voiceChannel.id, (err, connection) => {
    //       connection.playRawStream(youtubeStream(message.content.match(/!play (.*)/i)[1]));
    //     });
    // }

});

exports.addCmd = function(cmd) {
  cmds.push(cmd);
}
exports.client = client;
