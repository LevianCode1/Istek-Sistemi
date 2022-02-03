const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: "kanalayarla",
    category: "İstek",
    description: "İstek Kanalı Ayarla",
    aliases: ["sc"],
    usage: "setchannel <event> <channel>",
    userPermissions: ["MANAGE_CHANNELS"],
    run: async(client, message, args) => {
        if(args[0] === "istek") {
            let channel = message.mentions.channels.first()
            if(!channel) {
                const noChannel = new MessageEmbed()
                .setDescription(`Lütfen bir kanaldan bahsedin`)
                .setColor(client.colors.red)
                .setFooter(message.author.username, message.author.displayAvatarURL())

                return message.channel.send({
                    embeds: [noChannel]
                })
            }

            db.set(`suggestionChannel_${message.guild.id}`, channel.id)

            const success = new MessageEmbed()
            .setDescription(`İstek kanalını ${channel} olarak ayarlandı`)
            .setColor(client.colors.green)
            .setFooter(message.author.username, message.author.displayAvatarURL())

            return message.channel.send({
                embeds: [success]
            })
        } else {
            const noArgs = new MessageEmbed()
            .setDescription(`Lütfen geçerli bir etkinlik sağlayın\n\nGeçerli Etkinlikler: \`öneriler\`\n**!kanalayarla istek #kanal**`)
            .setColor(client.colors.red)
            .setFooter(`Levian Code`, client.user.displayAvatarURL())

            return message.channel.send({
                embeds: [noArgs]
            })
        }
    }
}