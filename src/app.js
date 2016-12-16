import Discord from 'discord.js'
import chalk from 'chalk'
import cfg from '../config.json'
import checkPermissions from './utils/permissions'

const client = new Discord.Client()

let plugins = []

// setup plugins
require('../plugins.json').map((name) => {
  plugins.push(require('./plugins/' + name).default)
})

client.login(cfg.token)

client.on('ready', () => {
  if (process.env.NODE_ENV !== 'test') console.log(chalk.green.bold('%s'), cfg.name, chalk.blue('is ready to go!'))
  if (cfg.game) client.user.setStatus(null, cfg.game)
  if (cfg.dev) require('./utils/vorpalCmd.js')(client) // development command line
  for (let plugin of plugins) {
    if (plugin.onReady) plugin.onReady(client)
  }
})

client.on('message', (message) => {
  if (message.author.bot) return
  for (let plugin of plugins) {
    if (plugin.onMessage) {
      if (message.content.startsWith(plugin.trigger + ' ')) {
        let hasPermission = checkPermissions(message, plugin, client)
        if (hasPermission) {
          plugin.onMessage(client, message.channel, message)
        } else {
          message.reply('You don\'t have the permission to use this command.')
        }
      }
    }
  }
})

export default client
