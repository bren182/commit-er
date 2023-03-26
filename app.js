// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const { HasNotCommitted } = require('./data/data_helper');
const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config();
let HasPostedCommit = false;

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages, GatewayIntentBits.MessageContent], partials: ["CHANNEL", "MESSAGE", "REACTION"] });

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filepPath = path.join(commandsPath, file);
    const command = require(filepPath);

    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING HERE] The command at ${filepPath} is missing a required "data" or "execute" property`);
    }
}

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;
    // cool stuff available in interaction
    // console.log(interaction);
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No matching command ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
        } else {
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
});

client.on("messageCreate", message => {
    if (!message.author.bot) {
        // console.log(message);
        const args = message.content.slice("echo".length).trim().split(' ');
        const command = args.shift().toLowerCase();

        message.channel.send(`Command name: ${command} \n Arguments: ${args}`);
    }

});

const cron = require('node-cron');


cron.schedule('* 30 * * * *', () => {
    // run every 10 seconds
    // check if HasPostedCommit message to channel
    PostChannelMessage();
    RemindUsers();
    

});

function PostChannelMessage() {
    var committed = HasNotCommitted();
    if(!HasPostedCommit) {
       
    

        client.channels.fetch("729310559471796227").then(x => x.send(committed[1]));
        if(committed[0]) {
            HasPostedCommit = true;
        }
        else {
            HasPostedCommit = false;
        }
    }
    else {
        if(!committed[0]) {
            client.channels.fetch("729310559471796227").then(x => x.send(committed[1]));
        }
    }
}



// Log in to Discord with your client's token
client.login(process.env.BOT_TOKEN);