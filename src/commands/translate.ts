import { ApplicationCommandType, ContextMenuCommandBuilder } from "discord.js";
import { translate } from "../services/translation";
import { createMessageStore } from "../utils/message-store";
import type { DiscordCommand } from "../types/command-types";

const messageStore = createMessageStore();

export const translateCommand: DiscordCommand = {
  builder: new ContextMenuCommandBuilder()
    .setName("Translate Message")
    .setType(ApplicationCommandType.Message),
  async execute(interaction) {
    if (!interaction.isMessageContextMenuCommand()) return;

    const {
      targetMessage: { cleanContent },
    } = interaction;

    const deferred = await interaction
      .deferReply({ ephemeral: true })
      .catch(() => false);

    if (!deferred) return;

    messageStore.get(cleanContent, (translation) => {
      interaction.editReply({
        content: translation ?? "Translation failed. Try again later.",
      });
    });
  },
};
