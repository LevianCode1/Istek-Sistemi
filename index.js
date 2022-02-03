const { Intents } = require('discord.js');
const Levian = require('./Utils/levian');
const client = new Levian({ intents: 32767 }, { allowedMentions: { parse: ['users', 'roles'], repliedUser: false } });
client.start();