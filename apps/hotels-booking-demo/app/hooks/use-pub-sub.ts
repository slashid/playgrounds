import { useCallback, useEffect } from "react";

export const EventName = {
  FILL_CHECKOUT_FORM: "FILL_CHECKOUT_FORM",
} as const;

type EventNameType = (typeof EventName)[keyof typeof EventName];

/**
 * Publishes an event with the given name and data
 */
export const publish = (eventName: EventNameType, data?: any) => {
  const event = new CustomEvent(eventName, { detail: data });
  document.dispatchEvent(event);
};

/**
 * This hook manages the subscription to a given event name
 */
export const usePubSub = (eventName: EventNameType, callback: () => void) => {
  const memoizedCallback = useCallback(() => callback(), [callback]);

  useEffect(() => {
    document.addEventListener(eventName, memoizedCallback);
    return () => document.removeEventListener(eventName, memoizedCallback);
  }, [eventName, memoizedCallback]);
};
