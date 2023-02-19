import { createHash } from "crypto";
import type {
  MessageStore,
  OnSetFunction,
  SetterFunction,
  StoreGetOptions,
} from "../types/message-store-types";

/**
 * Hashes the contents of a message or any given string.
 */
export const hashMessage = (content: string) => {
  return createHash("md5").update(content).digest("hex");
};

/**
 * Creates a message store which can be used to track messages when
 * awaiting a linkewd value.
 */
export const createMessageStore = () => {
  const subscribers: Record<string, OnSetFunction[]> = {};
  const store: MessageStore = {
    messages: new Proxy(
      {},
      {
        set(target, property, newValue, receiver) {
          setTimeout(() => {
            delete store.messages[<string>property];
          }, 1000 * 60 * 10);

          return Reflect.set(target, property, newValue, receiver);
        },
      }
    ),
  };

  const subscribe = (content: string, onSet: OnSetFunction) => {
    const hash = hashMessage(content);
    if (!subscribers[hash]) subscribers[hash] = [];
    subscribers[hash].push(onSet);
  };

  /**
   * Adds the message to the store.
   * @param content The message content.
   */
  const add = (content: string) => {
    const hash = hashMessage(content);

    store.messages[hash] = new Proxy(
      { value: content },
      {
        set(target, property, newValue, receiver) {
          if (
            property === "linkedValue" &&
            newValue &&
            subscribers[hash] &&
            subscribers[hash].length > 0
          ) {
            subscribers[hash].forEach((callback) => callback(newValue));
            delete subscribers[hash];
          }

          return Reflect.set(target, property, newValue, receiver);
        },
      }
    );
  };

  const set = async (content: string, setter: SetterFunction) => {
    const hash = hashMessage(await content);
    const newValue = await setter();

    store.messages[hash].linkedValue = newValue;
  };

  const get = async (content: string, { onCreate, onSet }: StoreGetOptions) => {
    const hash = hashMessage(content);

    if (!store.messages[hash]) {
      set(content, onCreate);
      add(content);
    }

    const message = store.messages[hash];
    if (!message.linkedValue) subscribe(content, onSet);
    else onSet(message.linkedValue);
  };

  return { store, get, set };
};
