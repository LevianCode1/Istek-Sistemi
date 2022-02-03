const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: "onayla",
    category: "İstek",
    description: "Bir isteği kabul edin.",
    aliases: [" "],
    usage: "onayla <messageID> [sebep]",
    userPermissions: ["MANAGE_CHANNELS"],
    run: async(client, message, args, util) => {
        const channel = db.fetch(`suggestionChannel_${message.guild.id}`)
        if(channel === null) {
            const noChannel = new MessageEmbed()
            .setDescription(`Önce bir öneri kanalı ayarlamalısınız: \`!kanalayarla\``)
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
    
            const accepted = new MessageEmbed()
            .setAuthor(data.author.name, data.author.iconURL)
            .setDescription(data.description)
            .setColor(client.colors.green)
            .addField("Durum: Onaylandı", `${args.slice(1).join(" ") || "-"}`)
    
            await suggestedEmbed.edit({
                embeds: [accepted]
            })
            .then(async() => {
                await suggestedEmbed.reactions.removeAll();
            })
            .then(async() => {
                const success = new MessageEmbed()
                .setDescription(`\`${args[0]}\` kimliğine sahip istek __kabul edildi__`)
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