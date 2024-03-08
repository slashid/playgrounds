import { atom } from "jotai";

export type ToastMessage = {
  type: "success" | "error";
  message: string;
};

/**
 * The current toast message
 */
export const toastAtom = atom<ToastMessage | null>(null);

/**
 * The context panel content
 */
export const contextPanelContentAtom = atom<React.ReactNode | null>(null);

/**
 * The users default org id
 */
export const defaultOrgIdAtom = atom<string | undefined>(undefined);
