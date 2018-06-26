const Twit = require("twit");
const Reddit = require("redditor");
const reddit = require("redditor");
const config = require("./config");
const T = new Twit(config);

reddit.get("/r/$subreddit/new.json", function(err, response) {
    if (err) throw err;
    for (i = 0; i < 5; i++) {
    const result = response.data.children;
    const nestedUrls = result[i].data.url;
    console.log(nestedUrls);
    T.post("statuses/update", {
    status: nestedUrls + ' #reddit'
    }, function(err, data, response) {});
    }
    console.log("Tweeted 5 Latest post");
   });
