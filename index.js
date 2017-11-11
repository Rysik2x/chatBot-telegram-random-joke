var telegramBot = require('node-telegram-bot-api'),
	Cron = require('cron').CronJob,
	request = require('request'),
	AllHtmlEntities = require('html-entities').AllHtmlEntities,
	entities = new AllHtmlEntities(),
	token = '****';

var bot = new telegramBot(token, {
	polling: true,
});

bot.on('message', function(msg) {
	var id = msg.from.id;
	bot.sendMessage(id, msg.text);
});

var job = new Cron('0,10 * * * * *', function() {
  console.log('You will see this message every second');
  var chatId = 00000000,
  	url = 'http://www.umori.li/api/random?site=bash.im&name=bash&num=1';

  request(url, function(error, response, body) {
  	var data = JSON.parse(body);
  	bot.sendMessage(chatId, entities.decode(data[0].elementPureHtml));
  })
});

job.start();