# beep beep boop

# local development
1. npm install
2. create your own discord bot and make it a bot user, and get a valid token.   Here's a guide: http://discord.kongslien.net/guide.html
3. create a ```.env``` file at the root of your repo:
file should have the following:  ``` bot_token=xxxxxxxxxxxxx ``` where xxxx is your bot's token.
4.  Add a mashape_hscard_token= xxxx  with your api token from https://market.mashape.com/omgvamp/hearthstone#

5. node bot

# Lessons learned / Thoughts
1.  I'll get this up and running on heroku soon, when i do, i'll just have it auto deploy from an origin/production branch.
2.  Lets not use or depend on FFMPEG for now.  I don't wanna mess with getting that up and running on heroku just yet.

# resources
https://discord.js.org/#/docs/main/stable/general/welcome
https://github.com/hydrabolt/discord.js/
