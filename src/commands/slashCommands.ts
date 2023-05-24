import { ApplicationCommand, ApplicationCommandOptionType } from "discord.js";

export enum commands {
  morning_coffee = 0,
  tasks = 1,
  add = 2,
  remove = 3,
}
const commandsList = [
  {
    name: "morning_coffee",
    description: "brews you a delicious morning coffee!",
  },
  {
    name: "tasks",
    description: "lists all your tasks",
  },
  {
    name: "add",
    description: "adds a task",
    options: [
      {
        name: "task-description",
        description: "describe your task in a short sentence",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
  {
    name: "remove",
    description: "removes a task",
    options: [
      {
        name: "task-id",
        description: "the task's id",
        type: ApplicationCommandOptionType.Number,
        required: true,
      },
    ],
  },
] as ApplicationCommand[];

export default commandsList;
