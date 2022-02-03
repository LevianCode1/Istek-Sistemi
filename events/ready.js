const chalk = require('chalk');
const ms = require('ms');

module.exports = async(client) => {
    setTimeout(async function() {
        console.log(chalk.white(`[${chalk.blueBright("BOT")}]${chalk.white(" - ")}${chalk.blue("Bağlanıyor...")}`));
    }, ms("0.2s"));
    setTimeout(async function() {
        console.log(chalk.white(`[${chalk.blueBright("BOT")}]${chalk.white(" - ")}${chalk.blue(`${client.user.tag}`)} Bağlandı`))
        console.log(" ")
    }, ms("1s"));
    console.log(" ")
            console.log(chalk.white(`[${chalk.blueBright("LEVIAN CODE")}]${chalk.white(" - ")}${chalk.blue("https://discord.gg/3Ke3XY3mJJ")}`));

    await client.user.setPresence({ activities: [{ name: "Levian Code Discord" }] });
}