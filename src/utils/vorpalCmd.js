import vorpal from 'vorpal'
import chalk from 'chalk'
vorpal()

const cmdline = (bot) => {
  vorpal
    .command('setpresence <game>', 'Set the playing game')
    .action((args, callback) => {
      this.log('Presence set to', args.game)
      bot.setPresence({game: args.game})
      callback()
    })

  vorpal
    .command('disconnect', 'Disconnect')
    .action((args, callback) => {
      this.log(chalk.red('Disconnecting...'))
      bot.disconnect()
      process.exit(0)
    })
  vorpal.delimiter('ethan> ').show()
}

export default cmdline
