const { SlashCommandBuilder } = require("discord.js");
const { appendData } = require("../data/data_helper");
const moment = require("moment");


module.exports = {
    data: new SlashCommandBuilder().setName('commit').setDescription('Submit a new commit!').addStringOption(option =>
        option.setName("commitlink").setDescription("The link to your commit. Stored in 'message'.").setRequired(true))
        .addStringOption(option => option.setName("message").setDescription("A short commit message, can be any message.").setRequired(false)),

    async execute(interaction) {
        const message = interaction.options.getString("message");
        const commitLink = interaction.options.getString("commitlink");
        // get the commit link and user, as well as datetime of message and append to users_data.json
        const myObj = {
            "message":message,
            "commit-link":commitLink,
            "userId":interaction.user.id,
            "date":moment().format("YYYY-MM-DD hh:mm:ss")
        }

        await interaction.reply("Successfully submitted your commit!\n " + "```" +  JSON.stringify(myObj, null, 2) + "```");
        appendData(JSON.stringify(myObj));
    }
}

