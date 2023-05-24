import { Client, IntentsBitField } from "discord.js";
import env from "dotenv";
import { commands } from "./commands/slashCommands";

env.config();

type taskCollection = { userTag: string; tasks: task[] };
type task = { description: string };

const userTasks: taskCollection[] = [];

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", (c) => console.log("hello! I am on!"));

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  let userTag = interaction.user.tag;

  if (interaction.commandName == commands[commands.morning_coffee])
    interaction.reply("☕");

  if (interaction.commandName == commands[commands.tasks]) {
    let list = userTasks.find((x) => x.userTag === userTag)?.tasks;
    let answer: string = "";
    list?.forEach((x, i) => {
      answer += i + 1 + " - " + x.description + "\n";
    });
    if (answer) interaction.reply(answer);
    else interaction.reply("no tasks!");
  }

  if (interaction.commandName == commands[commands.add]) {
    let userIndex = userTasks.findIndex((x) => x.userTag === userTag);
    if (userIndex === -1) {
      userTasks.push({
        userTag: userTag,
        tasks: [
          {
            description: interaction.options
              .get("task-description")!
              .value!.toString(),
          },
        ],
      });
    } else
      userTasks[userIndex].tasks.push({
        description: interaction.options
          .get("task-description")!
          .value!.toString(),
      });

    interaction.reply(
      `task _"${interaction.options
        .get("task-description")!
        .value!.toString()}"_ added!`
    );

    return;
  }

  if (interaction.commandName == commands[commands.remove]) {
    let index = userTasks.findIndex((x) => x.userTag === userTag);
    if (index === -1) {
      interaction.reply('you have no tasks!');
      return;
    }
    userTasks[index].tasks = userTasks[index].tasks.filter((x,i) => (i+1) !== interaction.options.get('task-id')?.value as number)
  }
});

client.login(process.env.TOKEN);
