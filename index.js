window.twttr = (function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0],
    t = window.twttr || {};
  if (d.getElementById(id)) return t;
  js = d.createElement(s);
  js.id = id;
  js.src = "https://platform.twitter.com/widgets.js";
  fjs.parentNode.insertBefore(js, fjs);

  t._e = [];
  t.ready = function(f) {
    t._e.push(f);
  };

  return t;
}(document, "script", "twitter-wjs"));


let windowHeight = function() {
	$(document).height($(window).height());
}


let pluginNYT = function(result) {
	let nyt_col = $("#first").html();
	for (let i = 0; i < result.response.docs.length; ++i) {
		let item = result.response.docs[i];
		if (item.multimedia.length > 0) {
			let headline = item.headline.main;
			let url = item.web_url;
			let img;
			for (let m = 0; m<item.multimedia.length; ++m) {
				if (item.multimedia[m].subtype == "thumbnail") {
					img = item.multimedia[m].url;
					break;
				}
			}
			let txt = "<div class=\"article nyt\">";
			txt += "<div class=\"article2\"><img class=\"nytImg\" src=\"https://www.nytimes.com/" + img+"\">";
			txt += "<span class=\"nytTitle\"><a href=\""+ url + "\">" + headline + "</a></span></div>";
			txt += "<div class=\"snippet\">" + item.snippet + "</div></div>";
			nyt_col = nyt_col + txt;
			$("#first").html(nyt_col);
		}
	}
}

let pluginFox = function(result) {
	let fox_col = $("#third").html();
	let l = result.articles.length;
	if (l > 10) l = 10;
	for (let i = 0; i < l; ++i) {
		let item = result.articles[i];
		let headline = item.title;
		let url = item.url;
		let img = item.urlToImage;
		if (img[0] == "h") {
			let txt = "<div class=\"article fox\">";
			txt += "<div class=\"article2\"><img class=\"foxImg\" src=\"" + img+"\">";
			txt += "<span class=\"nytTitle\"><a href=\""+ url + "\">" + headline + "</a></span></div>";
			txt += "<div class=\"snippet\">" + item.description + "</div></div>";
			fox_col = fox_col + txt;
			$("#third").html(fox_col);
		}
	}
}

let pluginCNN = function(result) {
	let cnn_col = $("#cnn").html();
	let l = result.articles.length;
	if (l > 10) l = 10;
	for (let i = 0; i < l; ++i) {
		let item = result.articles[i];
		let headline = item.title;
		let url = item.url;
		let img = item.urlToImage;
		if (img[0] == "h") {
			let txt = "<div class=\"article cnn\">";
			txt += "<div class=\"article2\"><img class=\"foxImg\" src=\"" + img+"\">";
			txt += "<span class=\"nytTitle\"><a href=\""+ url + "\">" + headline + "</a></span></div>";
			txt += "<div class=\"snippet\">" + item.description + "</div></div>";
			cnn_col = cnn_col + txt;
			$("#cnn").html(cnn_col);
		}
	}
}


let newsWrapper = function() {

	let url = 'https://newsapi.org/v2/everything?' +
          'q=trump&' +
          'language=en&' +
          'sources=fox-news&' +
          'sortBy=publishedAt&' +
          'apiKey=98822d390f2f45fe99670d23f6325ef6';
    
	let req = new Request(url);
	fetch(req,{mode: 'cors'}).then(convertoJson).then(pluginFox).catch(displayError);

	// url = 'https://services.cnn.com/newsgraph/search/description:trump/hasImage:true/source:cnn/language:en/rows:10/start:0/lastPublishDate,desc?api_key=66v94mw2atyzkd4nj6pnzfp7';
	url = 'https://newsapi.org/v2/everything?' +
          'q=trump&' +
          'language=en&' +
          'sources=cnn&' +
          'sortBy=publishedAt&' +
          'apiKey=98822d390f2f45fe99670d23f6325ef6';
	req = new Request(url);
	fetch(req,{mode: 'cors'}).then(convertoJson).then(pluginCNN).catch(displayError);

	url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
	url += '?' + $.param({
	  'api-key': "f2dead0100cf489aa6556bc1cb017f36",
	  'q': "trump",
	  'sort': "newest",
	  'fq': "source: (\"The New York Times\")",
	});
	req = new Request(url);
	fetch(req,{mode: 'cors'}).then(convertoJson).then(pluginNYT).catch(displayError);

	$(windowHeight)
}

let displayError = function(err, status, msg) {
  console.log(err)
  console.debug(status)
  console.debug(msg)
}

let convertoJson = function(result) {
	return result.json();
}

let twitterStyle = function() {
	$(".twitter-block").css("padding","10px");
	$(".twitter-block").css("background-color","white");
	$(".twitter-block").css("border","1px solid black");
	$(".twitter-block").css("margin-bottom","20px");
	// $(".twitter-block").width($("#first").width());
}

$(newsWrapper);
$(twitterStyle);
$(document).resize(twitterStyle)
