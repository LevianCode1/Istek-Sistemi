const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: "reddet",
    category: "İstek",
    description: "Bir İsteği reddet.",
    aliases: [" "],
    usage: "reddet <messageID> [sebep]",
    userPermissions: ["MANAGE_CHANNELS"],
    run: async(client, message, args, util) => {
        const channel = db.fetch(`suggestionChannel_${message.guild.id}`)
        if(channel === null) {
            const noChannel = new MessageEmbed()
            .setDescription(`Önce bir istek kanalı ayarlamalısınız: \`!kanalayarla\``)
            .setColor(client.colors.red)
            .setFooter(message.author.username, message.author.displayAvatarURL())

            return message.channel.send({
                embeds: [noChannel]
            })
        }
        if(!args[0]) {
            const noArgs = new MessageEmbed()
            .setDescription("Lütfen bir mesaj kimliği sağlayın")
            .setColor(client.colors.red)
            .setFooter(message.author.username, message.author.displayAvatarURL())

            return message.channel.send({
                embeds: [noArgs]
            })
        }

        try {
            const suggestedEmbed = await message.guild.channels.cache.get(channel).messages.fetch(args[0])
    
            const data = suggestedEmbed.embeds[0]
    
            const denied = new MessageEmbed()
            .setAuthor(data.author.name, data.author.iconURL)
            .setDescription(data.description)
            .setColor(client.colors.red)
            .addField("Durum: Reddedildi", `${args.slice(1).join(" ") || "-"}`)
    
            await suggestedEmbed.edit({
                embeds: [denied]
            })
            .then(async() => {
                await suggestedEmbed.reactions.removeAll();
            })
            .then(async() => {
                const success = new MessageEmbed()
                .setDescription(`\`${args[0]}\` kimliğine sahip istek __reddedildi__`)
                .setColor(client.colors.green)
                .setFooter(message.author.username, message.author.displayAvatarURL())

                await message.channel.send({
                    embeds: [success]
                })
            })
        } catch {
            return util.errorEmbed(client, message, "Lütfen geçerli bir mesaj kimliği sağlayın", client.colors.red)
        }
    }
}