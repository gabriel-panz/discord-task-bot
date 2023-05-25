import { Client } from "discord.js";
import ready from "./ready";
import interactionCreate from "./interactionCreate";
import TasksRepository from "../repositories/tasksRepository";
import express from 'express'

const restApi = express()

const eventHandler = (client: Client<boolean>) => {
  const repository = new TasksRepository();

  client.on("ready", ready);

  client.on("interactionCreate", (i) => interactionCreate(i, repository));

  client.login(process.env.TOKEN);

  restApi.get('/health', (req, res) => res.send(200))
  
  let port = process.env.PORT ? Number(process.env.PORT) : 8000
  restApi.listen(port, () => {
    console.log(`listening on port: ${port}`)
  })
};

export default eventHandler;
