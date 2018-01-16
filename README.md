![My bot for discord. His name is Ethan.](https://camo.githubusercontent.com/17918ff7a0290f250fee52bc044ba7795445975e/687474703a2f2f692e696d6775722e636f6d2f514b316b717a322e706e67)

Ethan is a customizable discord bot written in NodeJS.

It supports custom plugins that handles Discord client events. Like _onReady_, _onMessage_ etc.

Work is still in progress.

## Setting up the development environment

* Installing dependecies

```bash
$ yarn
or
$ npm install
```

* Setting up keys

Create a `now-secrets.json` file in the root directory of you project. This is for [now-env](https://npmjs.org/package/now-env).

```json
{
  "@ethan-token": "YOUR_BOT_TOKEN",
  "@ethan-dev-token": "YOUR_DEV_BOT_TOKEN",
  "@steam-key": "YOUR_STEAM_API_KEY"
}
```

* Running in development mode

```bash
$ yarn dev
```

## Creating custom plugins

Example plugin:

`/src/plugins/echo.js`

```javascript
export default {
  permissions: ['Admin', 'Mod'], // Only people with Admin and Mod roles will be able to use this command. Leave the array empty to everyone be able to use.
  onMessage(bot, channel, message) {
    //This method will be called everytime someone send a message (excluding our bot). the bot arg is the client instance, channel is the channel the message was sent and message is the user message.
    if (message.content.startsWith('!echo')) {
      if (
        message.content.match(/!echo (.*)/i) &&
        message.content.match(/!echo (.*)/i)[1]
      ) {
        let msg = message.content.match(/!echo (.*)/i)[1]
        channel.send(msg)
      } else {
        message.reply('Usage: !echo message')
      }
    }
  }
}
```

Now activate the plugin adding it to the config file `bot.config.js`.

```javascript
{
  plugins: ['echo'] //The name must be the same as the plugin file
}
```

The available event methods are:

_onReady(client) {}_

_onMessage(client, channel, message) {}_

_onBotMention(bot, channel, message) {}_

_onNewMember(bot, channel, message) {}_

_onMemberRemoved(bot, channel, message) {}_

More examples at the plugins folder.

More info at [Discord.js documentation](https://discord.js.org/).

## Deploying

The project has an automated deployment flow to [Now](https://zeit.co).

Follow the install instructions in [Now's website](https://zeit.co) and set the secrets with the discord app keys.

```bash
$ now secret set ethan-token YOUR_BOT_TOKEN
$ now secret set ethan-dev-token YOUR_DEV_BOT_TOKEN
$ now secret set steam-key YOUR_STEAM_API_KEY
```

I recommend using different app tokens for production and development. Just create two apps in the discord website.

Now run and wait for the magic to happen.

```bash
$ yarn deploy
```

## License

[MIT](https://oss.ninja/mit/devnvll)
