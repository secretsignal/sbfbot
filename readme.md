# beep beep boop

# local development
1. npm install
2. create your own discord bot and make it a bot user, and get a valid token.   Here's a guide: ~~http://discord.kongslien.net/guide.html~~ https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token
3. create a ```.env``` file at the root of your repo:
file should have the following:  
    `bot_token=xxxx` where xxxx is your bot's token

    `mashape_hscard_token=xxxx` where xxx is your api token from https://market.mashape.com/omgvamp/hearthstone#
    
    `botenv=xxxx` where xxxx is `dev` or `production`

4. node bot

## Tests
`npm run test` - Run all tests

`npm run test -- test/name_test.js` - Run the specified test

# Lessons learned / Thoughts
1.  I'll get this up and running on heroku soon, when i do, i'll just have it auto deploy from an origin/production branch.
2.  Lets not use or depend on FFMPEG for now.  I don't wanna mess with getting that up and running on heroku just yet.

# resources
https://discord.js.org/#/docs/main/stable/general/welcome

https://github.com/hydrabolt/discord.js/
