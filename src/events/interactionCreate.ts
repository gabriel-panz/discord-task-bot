import {
  CacheType,
  ChatInputCommandInteraction,
  Interaction,
} from "discord.js";
import { commands } from "../commands/slashCommands";
import TasksRepository from "../repositories/tasksRepository";
import { user } from "../types/task";

const interactionCreate = (
  interaction: Interaction<CacheType>,
  repository: TasksRepository
) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName == commands[commands.morning_coffee])
    morningCoffee(interaction);

  if (interaction.commandName == commands[commands.tasks])
    listTasks(interaction, repository);

  if (interaction.commandName == commands[commands.add])
    addTasksOrUser(interaction, repository);

  if (interaction.commandName == commands[commands.remove])
    removeTask(interaction, repository);
};

const morningCoffee = (interaction: ChatInputCommandInteraction<CacheType>) => {
  interaction.reply("☕");
};

const removeTask = (
  interaction: ChatInputCommandInteraction<CacheType>,
  repository: TasksRepository
) => {
  let success = repository.removeTask(
    interaction.user.id,
    interaction.options.get("task-id")?.value! as string
  );
  if (success) interaction.reply("Task removed successfully!");
  else interaction.reply("Could not delete task!");
};

const addTasksOrUser = (
  interaction: ChatInputCommandInteraction<CacheType>,
  repository: TasksRepository
) => {
  let userAdding: user = {
    userId: interaction.user.id,
    tasks: [
      {
        description: interaction.options
          .get("task-description")!
          .value!.toString(),
      },
    ],
  };

  repository.upsert(userAdding);

  interaction.reply(
    `task _"${interaction.options
      .get("task-description")!
      .value!.toString()}"_ added!`
  );

  return;
};

const listTasks = (
  interaction: ChatInputCommandInteraction<CacheType>,
  repository: TasksRepository
) => {
  let list = repository.byId(interaction.user.id)?.tasks;

  if (!list || list.length < 1) {
    interaction.reply("no tasks!");
    return;
  }

  let answer: string = "";

  list?.forEach((x, i) => {
    answer += i + 1 + " - " + x.description + "\n";
  });

  interaction.reply(answer);
};

export default interactionCreate;
