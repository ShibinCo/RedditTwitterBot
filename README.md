Go to your project directory and initialize:

npm init
Follow the initialization steps. This creates a package.json file. This file acts like a manifest with important meta information and all the project dependencies.

Name the entry point whatever you want to call your main app file. I chose to call the file app.js.

Install our packages from the repository we looked at earlier.

npm install twit 
Look back in our “package.json” file. We now have the twit dependency declared. The twit module has now been installed into the “modules” folder.

Now install the “redditor” package the same way:

npm install redditor
In the editor create a new file for the entry point. Name it app.js or whatever you decided to call yours during the “npm init” process.

[app.js] Importing dependencies
const Twit = require("twit");
const Reddit = require("redditor");
Make a [config.js] file to hold our API keys
Why not just supply the keys inside of app.js? Safety. Making the keys external to the app.js allows for a level of abstraction so they aren’t in plain sight for anyone to see.

Create a config.js file and paste your keys:

module.exports = {
consumer_key:         ‘...’
,consumer_secret:     ‘...’
,access_token:        ‘...’
,access_token_secret: ‘...’
}
Notice we define module.exports to this comma-separated object. This allows the main part of the app (app.js) to refer to these keys. We are “exporting” these keys from the config.js file. Then we’re going to “import” them in the app.js file.

[app.js] print a message

console.log(‘Hello, world!’);
[package.json] make a start script

"start": "node app.js"
Adding this inside “scripts” will allow us to run our app using the “npm start” command. Don’t forget to comma-separate them if there is more than one script!

[cmd.exe]

npm start
Our ‘Hello, world!’ should display in the command line. Cool.

Node.js allows for all ECMAScript2015 (ES6) features. We are using “const” instead of “var”. Stay tuned for a post on the difference between “var”, “let”, and “const”. In the meantime, Google and Stack Overflow exist.

[app.js]

Node.js allows for us to import modules to “app.js” using this syntax.

const Twit = require(‘twit’); //imports the twit package
Import the “redditor” module in the same way.

const reddit = require(‘redditor’);
Import the “config.js” file into “app.js” and pass the config dependency into a new Twit object “T”.

const config = require(‘./config’);
const T = new Twit(config);
Note: the dot-slash (./) prepends the custom module. This points to the file in the same directory as “app.js”. If, for some reason, we needed to import a file higher in the directory structure we would use the (../)notation. We can point to any file in any directory using these notations.

Note: Node.js knows to look for regular generated modules (Twit and Redditor) in the module folder so they don’t need their directories defined.

Call the “get” function on the reddit object we created. It takes two parameters: the subreddit endpoint and a callback function.

reddit.get(‘/r/politics.json’, function(err, response) {
 if (err) throw err;
 for (i = 0; i < 3; i++) {
 const result = response.data.children;
 const nestedUrls = result[i].data.url;
 console.log(nestedUrls);
}
Above, we iterated over the JSON response which happens to return an array (nested inside a few objects). Research the Reddit API documentation to see how the JSON responses are structured.

[cmd.exe]

npm start
You should see the top 3 posts. Cool!

Pat yourself on the back, you have a way to programmatically grab urls from Reddit. But we’re not done yet! We want them to land on Twitter!

Call the post and pass in the ‘statuses/update’ to complete the API endpoint. I chose to concatenate the status (tweet) with the hashtag “ #news”. Remember to add a space before the hashtag to separate them so the url does not become invalid.

reddit.get(‘/r/politics.json’, function(err, response) {
 if (err) throw err;
 for (i = 0; i < 3; i++) {
 const result = response.data.children;
 const nestedUrls = result[i].data.url;
 console.log(nestedUrls);
 T.post(‘statuses/update’, {
 status: nestedUrls + “ #news”
 }, function(err, data, response) {});
 }
});
Run the app with the “npm start” command. Now open your web browser and check your twitter profile. You should see the bot tweeted all by itself! The post should feature image “cards” that twitter generates since news organizations follow best practices of embedding social media tags into their html (The same is true for Instagram, Facebook, etc).
