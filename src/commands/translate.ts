import { ApplicationCommandType, ContextMenuCommandBuilder } from "discord.js";
import { translate } from "../services/translation";
import type { DiscordCommand } from "../types/command";

export const translateCommand: DiscordCommand = {
  builder: new ContextMenuCommandBuilder()
    .setName("Translate Message")
    .setType(ApplicationCommandType.Message),
  async execute(interaction) {
    if (!interaction.isMessageContextMenuCommand()) return;

    const {
      targetMessage: { cleanContent },
    } = interaction;

    await interaction.deferReply({ ephemeral: true });
    const translation = await translate(cleanContent);

    interaction.editReply({
      content: translation ?? "Translation failed. Try again later.",
    });
  },
};
