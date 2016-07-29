import request from 'axios';
import cheerio from 'cheerio';
import Q from 'bluebird'; //hehe

export default (id) => {
  return new Q((resolve) => {
    request('https://savedeo.com/download?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D' + id).then((res) => {
      let $ = cheerio.load(res.data),
      videoTitle = $('title').text(),
      audioURL = $('#main div.clip table tbody tr th span.fa-music').first().parent().parent().find('td a').attr('href');
      let data = {url: audioURL, title: videoTitle}
      resolve(data);
    }).catch((err) => {
      reject(err);
    });

  });
}
