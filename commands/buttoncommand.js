const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder().setName('button').setDescription('Create a button!'),
    // not adding string options to the button yet. 
    // .addStringOption(option =>
    //    option.setName("message").setDescription("The message to echo back").setRequired(true)),

    async execute(interaction) {
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('primary')
                    .setLabel('Click me!')
                    .setStyle(ButtonStyle.Primary),
            );

        await interaction.reply({ content: 'I think you should,', components: [row] });

    }
}