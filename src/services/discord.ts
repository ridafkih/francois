import { Client, Events, REST, Routes } from "discord.js";
import { translateCommand } from "../commands/translate";

const { DISCORD_TOKEN, DISCORD_CLIENT_ID } = process.env;
if (!DISCORD_TOKEN) throw Error("The `DISCORD_TOKEN` is unset");
if (!DISCORD_CLIENT_ID) throw Error("The `DISCORD_CLIENT_ID` is unset");

/**
 * Registers the commands on the application-level, and starts
 * the Discord bot service.
 */
export const start = () => {
  console.log("🚀 Initializing Discord Client");

  const client = new Client({ intents: ["MessageContent", "GuildMessages"] });
  const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN!);

  client.on(Events.ClientReady, () => console.log("👍 Client Online"));
  client.on(Events.InteractionCreate, translateCommand.execute);

  rest
    .put(Routes.applicationCommands(DISCORD_CLIENT_ID), {
      body: [translateCommand.builder],
    })
    .then(() => client.login(DISCORD_TOKEN));
};
