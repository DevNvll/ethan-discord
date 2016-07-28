const request = require('axios'),
cheerio = require('cheerio');


module.exports = (id, callback) => {
  request('https://savedeo.com/download?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D' + id).then((res) => {
    $ = cheerio.load(res.data);
    var videoTitle = $('title').text();
    var audioURL = $('#main div.clip table tbody tr th span.fa-music').first().parent().parent().find('td a').attr('href');
    callback(audioURL, videoTitle);
  });
}
