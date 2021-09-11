const Discord = require("discord.js");
const config = require(`./config.json`);
const dash = require(`./dashboard/settings.json`);
const colors = require("colors");
const Enmap = require("enmap");
const client = new Discord.Client({
    shards: "auto",
    allowedMentions: {
      parse: [ ],
      repliedUser: false,
    },
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    intents: [ 
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
    ]
});

client.settings = new Enmap({ name: "settings",dataDir: "./databases/settings"});


client.on("messageCreate", (message) => {
    if(!message.guild || message.author.bot) return;
    client.settings.ensure(message.guild.id, {
        prefix: config.prefix,
        hellomsg: "Hello World!",
        roles: [],
    });
    //Get the settings
    let { prefix, hellomsg, roles } = client.settings.get(message.guild.id)
    //Get the arguments
    let args = message.content.slice(prefix.length).trim().split(" ");
    let cmd = args.shift()?.toLowerCase();
    //If there is a command, execute it
    if(cmd && cmd.length > 0 && message.content.startsWith(prefix)){
        if(cmd == "prefix"){
            message.reply(`Current prefix is \`${prefix}\`!\n**Go to the Dashboard to change it!**\n> ${dash.website.domain}`).catch(console.error);
        }
        if(cmd == "hello"){
            message.reply(hellomsg).catch(console.error);
        }
        if(cmd == "roles"){
            message.reply(roles.map(r=>`<@&${r}>`).join(", ")).catch(console.error);
        }
    }
})

/**
 * @LOAD_THE_DASHBOARD - Loading the Dashbaord Module with the BotClient into it!
 */
client.on("ready", () => {
   require("./dashboard/index.js")(client);
})

//Start the Bot
client.login(process.env.token || config.token)

/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://discord.gg/milrato
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */
