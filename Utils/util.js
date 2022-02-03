const { MessageEmbed } = require('discord.js');

module.exports.errorEmbed = async function(client, message, content, color) {
    if(!client) throw new Error("[Utils] errorEmbed - istemci sağlanmalıdır CLIENT BULUNMADI")
    if(!message) throw new Error("[Utils] errorEmbed - mesaj sağlanmalıdır BULUNMADI MESAJ")
    if(!content || typeof content !== 'string') throw new TypeError("[Utils] errorEmbed - içerik bir dize olmalıdır V13 Meseji Kanala Yollama Content Hatasi")
    if(!color || typeof color !== 'string') throw new TypeError("[Utils] - errorEmbed - renk bir dize olmalıdır   RENK HATASI")

    const errorEmbed = new MessageEmbed()
    .setDescription(content)
    .setColor(color)
    .setFooter(`Levian Code`, client.user.displayAvatarURL())

    await message.channel.send({
        embeds: [errorEmbed]
    })
}