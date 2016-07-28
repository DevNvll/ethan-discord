const vorpal = require('vorpal')();
const chalk = require('chalk');
function cmd(bot) {
  vorpal
    .command('setpresence <game>', 'Set the playing game')
    .action(function(args, callback) {
      this.log('Presence set to', args.game);
      bot.setPresence({game: args.game});
      callback();
    });

  vorpal
    .command('disconnect', 'Disconnect')
    .action(function(args, callback) {
      this.log(chalk.red('Disconnecting...'));
      bot.disconnect();
      process.exit(0);
    });
    vorpal.delimiter('ethan> ').show();
}

module.exports = cmd;
