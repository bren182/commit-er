const {SlashCommandBuilder} = require('discord.js');
const { showStats } = require('../data/data_helper');
const moment = require('moment/moment');

module.exports = {
    data: new SlashCommandBuilder().setName('stats').setDescription('View commit stats.'),

    async execute(interaction) {
        var string = await showStats();
        
        var statsResponse = "```Commit statistics on " +  moment().format("YYYY-MM-DD hh:mm") + ":\n"
        + "-------------------------------------" + "\n"
        + "Total commits: " + string.length + "\n"
        + "Commits today: " + string.filter((x) => x.date >= moment().format('YYYY-MM-DD')).length + "\n"
        + "-------------------------------------" + "```"
        interaction.reply(statsResponse);
        
        
    }
}