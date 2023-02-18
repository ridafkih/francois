import type { createMessageStore } from "../utils/message-store";

export interface Message {
  originalText: string;
  translatedText?: string;
}

export interface MessageStore {
  /**
   * A key-value pair with the key being the MD5 hash
   * of the message contents and the value being the message
   * object.
   */
  messages: Record<string, Message>;
}

export type MessageStoreController = ReturnType<typeof createMessageStore>;
