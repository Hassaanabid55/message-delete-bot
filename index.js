const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const TARGET_CHANNEL_IDS = process.env.TARGET_CHANNEL_IDS.split(',');

const USER_MESSAGE_DELETE_DELAY = 1000; // 1 second
const BOT_MESSAGE_DELETE_DELAY = 5000;  // 5 seconds

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (TARGET_CHANNEL_IDS.includes(message.channel.id)) {
    const delay = message.author.bot ? BOT_MESSAGE_DELETE_DELAY : USER_MESSAGE_DELETE_DELAY;

    setTimeout(() => {
      message.delete().catch(console.error);
    }, delay);
  }
});

client.login(process.env.BOT_TOKEN);
