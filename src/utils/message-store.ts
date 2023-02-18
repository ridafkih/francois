import { createHash } from "crypto";
import { translate } from "../services/translation";
import type { Message, MessageStore } from "../types/message-store-types";

type OnTranslatedFunction = (translation: string) => void;

/**
 * Hashes the contents of a message or any given string.
 */
export const messageStoreHash = (content: string) => {
  return createHash("md5").update(content).digest("hex");
};

/**
 * Creates a message store which can be used to track messages when
 * awaiting a translation.
 */
export const createMessageStore = () => {
  const subscribers: Record<string, OnTranslatedFunction[]> = {};
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

  const subscribe = (content: string, onTranslated: OnTranslatedFunction) => {
    const hash = messageStoreHash(content);
    if (!subscribers[hash]) subscribers[hash] = [];
    subscribers[hash].push(onTranslated);
  };

  /**
   * Adds the message to the store.
   * @param content The message content.
   */
  const add = (content: string) => {
    const hash = messageStoreHash(content);

    store.messages[hash] = new Proxy(
      { originalText: content },
      {
        set(target, property, newValue, receiver) {
          if (
            property === "translatedText" &&
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

  const get = async (content: string, onTranslated: OnTranslatedFunction) => {
    const hash = messageStoreHash(content);

    if (!store.messages[hash]) {
      add(content);
      translate(content).then((translation) => {
        store.messages[hash].translatedText = translation;
      });
    }

    const message = store.messages[hash];
    if (!message.translatedText) subscribe(content, onTranslated);
    else onTranslated(message.translatedText);
  };

  return { store, get };
};
