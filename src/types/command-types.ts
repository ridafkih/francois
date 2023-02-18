import type {
  CacheType,
  Interaction,
  ContextMenuCommandBuilder,
} from "discord.js";

export interface DiscordCommand {
  builder: ContextMenuCommandBuilder;
  execute(interaction: Interaction<CacheType>);
}
