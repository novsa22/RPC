const Discord = require("discord.js-selfbot-v13");
const client = new Discord.Client({
    readyStatus: false,
    checkUpdate: false,
});

require("dotenv").config();
const config = require("./config.js");
function validateConfig(config) {
    const requiredFields = [
    "joinVoice24",
    "channelID24",
    "appID",
    "statusType",
    "token",
    "Name",
    "State",
    "Details",
    "RPCTimeStamp",
    "FirstButtonName",
    "FirstButtonUrl",
    "SecondButtonName",
    "SecondButtonUrl",
    "LargeImage",
    "LargeText",
    "SmallImage",
    "SmallText",
  ];
    const missingFields = requiredFields.filter((field) => !config[field]);
    
    if (missingFields.length > 0) {
        console.error(`Config is not filled properly. Missing fields: ${missingFields.join(", ")}`);
        process.exit(1);
    }
}
let showTime = config.showTime
let joinVoice24 = config.joinVoice24

const { joinVoiceChannel } = require('@discordjs/voice');
client.on("ready", async () => {
    setInterval(() => {
        const voice24 = joinVoice24 ? autoVoice24() : "";
        const r = new Discord.RichPresence()
        .setApplicationId(config.appID)
        .setType(config.statusType) // PLAYING, STREAMING, COMPETING, LISTENING, WATCHING
        .setURL("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
        .setState(config.State)
        .setName(config.Name)
        .setDetails(config.Details)
        .setStartTimestamp(config.RPCTimeStamp)
        .setAssetsLargeImage(config.LargeImage)
        .setAssetsLargeText(config.LargeText)
        .setAssetsSmallImage(config.SmallImage)
        .setAssetsSmallText(config.SmallText)
        .addButton(config.FirstButtonName, config.FirstButtonUrl)
        .addButton(config.SecondButtonName, config.SecondButtonUrl);
        client.user.setActivity(r);
    }, 10000);
});

function autoVoice24() {
    setInterval( async () => {
        client.channels.fetch(config.channelID24)
        .then((channel) => {
            const VoiceConnection = joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator
            });
            
            VoiceConnection.receiver.voiceConnection.setSelfMute(false);
            VoiceConnection.receiver.voiceConnection.setSelfDeaf(true);
        }).catch((error) => { return; });
        
    }, 1000)
}
    
setTimeout(() => {
    if (!client || !client.user) {
        console.log("LOGIN CLIENT GAGAL!, MEMATIKAN PROSES")
        process.kill(1);
    } else {
        console.log("LOGIN CLIENT BERHASIL!")
    }
}, 1 * 1000 * 20);
client.login(
  config.token
);
