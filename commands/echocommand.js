const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder().setName('echo').setDescription('Echo what the user inputs as an argument!').addStringOption(option =>
        option.setName("message").setDescription("The message to echo back").setRequired(true)),

    async execute(interaction) {
        const message = interaction.options.getString("message");

        await interaction.reply("Here we are!\n " + message);
    }
}

