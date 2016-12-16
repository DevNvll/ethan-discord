import Discord from 'discord.js'
const client = new Discord.Client()
import chalk from 'chalk'
import cfg from '../config.json'
import checkPermissions from './utils/permissions'

let cmds = []

// setup command scripts
require('../commands.json').map((name) => {
  cmds.push(require('./commands/' + name))
})

client.login(cfg.token)

client.on('ready', () => {
  if (process.env.NODE_ENV !== 'test') console.log(chalk.green.bold('%s'), cfg.name, chalk.blue('is ready to go!'))
  if (cfg.game) client.user.setStatus(null, cfg.game)
  if (cfg.dev) require('./utils/vorpalCmd.js')(client) // development command line
})

client.on('message', (message) => {
  for (let cmd of cmds) {
    if (message.content.startsWith(cmd.trigger)) {
      let hasPermission = checkPermissions(message, cmd, client)
      if (hasPermission) {
        cmd.run(client, message.channel, message)
      } else {
        message.reply('You don\'t have the permission to use this command.')
      }
    }
  }
})

export default client
