const rl = require('readline');
const rssLibary = require('rss-parser');
const rssParser = new rssLibary();
const striptags = require('striptags');

const rssUrl = rl.createInterface({
    input: process.stdin,
    output: process.stdout
});

rssUrl.question('\x1b[33mPlease type in the URL you want the RSS Content from: ', (answer) => {
    console.log('Loading.. Please wait a Moment!\n\n');
    rssParser.parseURL(answer)
    //Post the Answers to the Console.
    .then((content) => {
        console.log(`\x1b[36mHere are the \x1b[5m${content.items.length}\x1b[0m\x1b[36m latest Articles from\x1b[34m ${content.title} [${content.link}]\n\n`);
        content.items.forEach((item) => {
            console.log("\x1b[34m" + item.title);
            console.log(`\x1b[32m${striptags(item.content)}`);
            console.log(`\x1b[35mReleased on ${item.pubDate ? item.pubDate : "No Publishing Date annouced."}\nRead More:${item.link?item.link:"No Link Provided"}\n`);
        })
        
        //console.log(content);
        rssUrl.close();
    })
    //If an Error Occures.
    .catch((error) => {
        console.error('\x1b[31mWhoopsie Daisy! There was a fatal Error while getting your feed. :(');
        console.error('\x1b[31mPlease appoligize and take this Stackcase to the Developer of this App:');
        console.error('\x1b[31m' + error.stack);
        rssUrl.close();
    })
});