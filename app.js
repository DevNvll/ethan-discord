const Discord = require("discord.js");
const client = new Discord.Client();

const chalk = require('chalk');
const fs = require('fs');
const levelup = require('levelup');
const brain = levelup('./ethan_data');

const cfg = require('./botCfg.json');
let cmds = [];


 //setup command scripts
require('./commands.json').map((name) => {
  cmds.push(require('./commands/' + name + '.js'));
});

client.loginWithToken(cfg.token);

client.on('ready', () => {
    console.log(chalk.green.bold("%s"), cfg.name, chalk.blue("is ready to go!"));
    if(cfg.game) client.setPlayingGame(cfg.game);
    if(cfg.dev) require("./utils/vorpalCmd.js")(client); //development command line
});

client.on("message", (message) => {
    for(let x=0; x < cmds.length; x++) {
      if(message.content.match(cmds[x].trigger)){
        cmds[x].run(client, message.channel, message);
      }
    }
});
