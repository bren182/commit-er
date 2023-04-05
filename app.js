// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits, Collection, MessageActivityType, MessageActionRow } = require('discord.js');

const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config();
const wait = require('node:timers/promises').setTimeout;
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

// checking button click action

// client handling the interaction (clicking the button on discord)

client.on(Events.InteractionCreate, interaction => {
    if (interaction.isButton()) {
        console.log(interaction);
        // interaction.reply(`Thanks for clicking ${interaction.user.username}!`);
        interaction.update({ content: "Clicked! Done!", components: [] });

    }
    else {
        return;
    }
});

client.on('messageCreate', async message => {
    if (message.content === 'create button') {
        MessageAction
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('exampleButton')
                    .setLabel('Example Button')
                    .setStyle('PRIMARY')
            );
        await message.channel.send({ content: 'Click the button:', components: [row] });
    }
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

const cron = require('node-cron');
const { default: PostChannelMessage } = require('./actions/PostChannelMessage');

// cron schedule should run 
// every 3 hours. with hour field */3
cron.schedule('0 */3 * * *', () => {
    // run every 10 seconds
    // check if HasPostedCommit message to channel
    HasPostedCommit = PostChannelMessage(HasPostedCommit);
    // RemindUsers();


});



// Log in to Discord with your client's token
client.login(process.env.BOT_TOKEN);