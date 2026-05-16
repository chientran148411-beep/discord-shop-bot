const {

  addCategoryButton,
  submitCategory,
  deleteCategoryButton,
  deleteCategory

} = require(
  './handlers/categoryHandler'
);require('dotenv').config();

const {

  Client,
  GatewayIntentBits,
  REST,
  Routes

} = require('discord.js');

const connectDB =
require('./config/database');

const welcomeSystem =
require('./handlers/welcomeSystem');

const adminPanel =
require('./handlers/adminPanel');



const client = new Client({

  intents: [

    GatewayIntentBits.Guilds,

    GatewayIntentBits.GuildMembers

  ]

});



// CONNECT DB

connectDB();



// READY

client.once('ready', async () => {

  console.log(
`${client.user.tag} Online`
  );



  const commands = [

    {

      name: "shop",

      description: "Mở shop"

    },

    {

      name: "admin",

      description: "Mở admin panel"

    }

  ];



  const rest = new REST({

    version: '10'

  }).setToken(process.env.TOKEN);



  await rest.put(

    Routes.applicationGuildCommands(

      process.env.CLIENT_ID,

      process.env.GUILD_ID

    ),

    {

      body: commands

    }

  );

});



// MEMBER JOIN

client.on(

  'guildMemberAdd',

  welcomeSystem

);



// INTERACTION

client.on(

  'interactionCreate',

  async interaction => {



    if (

      interaction.isChatInputCommand()

      &&

      interaction.commandName === "admin"

    ) {

      return adminPanel(interaction);

    }



  }

);



// LOGIN

client.login(process.env.TOKEN);
