const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

const TARGET_CHANNEL_ID = process.env.TARGET_CHANNEL_ID;

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (message.channel.id === TARGET_CHANNEL_ID) {
    setTimeout(() => {
      message.delete().catch(console.error);
    }, 1000); 
  }
});

client.login(process.env.BOT_TOKEN);
