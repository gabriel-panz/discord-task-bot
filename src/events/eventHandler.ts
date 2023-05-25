import { Client } from "discord.js";
import ready from "./ready";
import interactionCreate from "./interactionCreate";
import TasksRepository from "../repositories/tasksRepository";


const eventHandler = (client: Client<boolean>) => {
  const repository = new TasksRepository();

  client.on("ready", ready);

  client.on("interactionCreate", (i) => interactionCreate(i, repository));

  client.login(process.env.TOKEN);
};

export default eventHandler;
