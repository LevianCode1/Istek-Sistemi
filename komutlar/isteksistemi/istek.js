const { MessageEmbed } = require("discord.js");
const db = require('quick.db');

module.exports = {
    name: "istek",
    category: "İstek",
    description: "Bir şey iste.",
    aliases: [" "],
    usage: "istek <isteğiniz>",
    run: async(client, message, args, util) => {
        const channel = await db.fetch(`suggestionChannel_${message.guild.id}`)
        if(channel === null) {
            const noChannel = new MessageEmbed()
            .setDescription(`Önce bir istek kanalı ayarlamalısınız: \`!kanalayarla\``)
            .setColor(client.colors.red)
            .setFooter(message.author.username, message.author.displayAvatarURL())

            return message.channel.send({
                embeds: [noChannel]
            })
        }
        if(!args.length) {
            const noArgs = new MessageEmbed()
            .setDescription(`Lütfen bir istekte bulunun`)
            .setColor(client.colors.red)
            .setFooter(message.author.username, message.author.displayAvatarURL())

            return message.channel.send({
                embeds: [noArgs]
            })
        }

        try {
            const suggested = new MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setDescription(args.join(" "))
            .setColor(client.colors.orange)
            .setTimestamp()
            .addField("Durum: onay bekleniyor", "-")
            client.channels.cache.get(channel).send({
                embeds: [suggested]
            })
            .then(async(m) => {
                await m.react("🔼")
                await m.react("🔽")
            })
            .then(async() => {
                const success = new MessageEmbed()
                .setDescription(`İsteğiniz <#${channel}> adresine gönderildi`)
                .setColor(client.colors.green)
                .setFooter(message.author.username, message.author.displayAvatarURL())

                await message.channel.send({
                    embeds: [success]
                })
            })
            .catch(async() => {
                const noPerms = new MessageEmbed()
                .setDescription(`istek kanalında mesaj gönderme iznim yok`)
                .setColor(client.colors.red)
                .setFooter(`Levian Code`, client.user.displayAvatarURL())
    
                return message.channel.send({
                    embeds: [noPerms]
                })
            })
        } catch {
            return util.errorEmbed(client, message, "Bir hata oluştu, lütfen tekrar deneyin", client.colors.red)
        }

        
    }
}