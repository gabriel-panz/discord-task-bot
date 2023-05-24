import { Client } from "discord.js";
import { commands } from "../commands/slashCommands";
import ready from "./ready";
import interactionCreate from "./interactionCreate";
import TasksRepository from "../repositories/tasksRepository";
import { TaskDataContext } from "../interfaces/dataContext";

const eventHandler = (client: Client<boolean>) => {
  const dataContext: TaskDataContext = {
    users: [],
  };

  const repository = new TasksRepository();

  client.on("ready", ready);

  client.on("interactionCreate", (i) => interactionCreate(i, repository));

  client.login(process.env.TOKEN);
};

export default eventHandler;
