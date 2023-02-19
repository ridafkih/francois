import type { createMessageStore } from "../utils/message-store";

interface Message {
  value: string;
  linkedValue?: string;
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

export type OnSetFunction = (newValue: string) => void;
export type SetterFunction = () => Promise<string> | string;

export interface StoreGetOptions {
  /**
   * Triggered when a record is created in the store, the
   * return value will be set to the `linkedValue`.
   */
  onCreate: SetterFunction;
  /**
   * Triggered when the `linkedValue` key is set on
   * the message object inside the store.
   */
  onSet: OnSetFunction;
}
