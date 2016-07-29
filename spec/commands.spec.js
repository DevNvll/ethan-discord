const client = require('../lib/app');
let testing_channel = '208557085951000576';


describe('Commands', function() {
  describe('!echo', function() {
    it('bot should send the echoed message', function(done) {
      this.timeout(10000);
      client.on('ready', () => {
        client.sendMessage(testing_channel, '!echo test has passed');
      });
      client.on('message', (message) => {
        if(message.content.match(/!echo (.*)/i) && message.channel.id == testing_channel)
          done()
      });
    });
  });
});
