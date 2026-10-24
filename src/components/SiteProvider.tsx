"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

import { truckInfo } from "@/data/bangkok99";

import { Wordmark } from "./Wordmark";

/** "order" is the Order pickup panel; "chat" is the honest demo panel the chatbot ends in. */
export type PanelKind = "order" | "chat";

type SiteContextValue = { openPanel: (kind: PanelKind) => void };

const SiteContext = createContext<SiteContextValue | null>(null);

const buttonBase = "rounded-full px-5 py-3 text-center font-bold transition-colors";

/**
 * The single shared dialog. Nothing on the page sends data anywhere: "Order pickup" explains how to
 * order today (Grubhub or a call), and the chatbot's catering and fallback answers end here.
 */
export function SiteProvider({ children }: { children: React.ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [kind, setKind] = useState<PanelKind>("order");

  const openPanel = useCallback((next: PanelKind) => {
    setKind(next);
    dialogRef.current?.showModal();
  }, []);

  const value = useMemo(() => ({ openPanel }), [openPanel]);
  const close = () => dialogRef.current?.close();

  return (
    <SiteContext.Provider value={value}>
      {children}
      <dialog
        ref={dialogRef}
        aria-labelledby="panel-title"
        aria-describedby="panel-description"
        className="m-auto w-[calc(100%-2rem)] max-w-md overflow-hidden rounded-[2rem] bg-rice p-0 text-char shadow-2xl backdrop:bg-char/60 backdrop:backdrop-blur-sm"
        onClick={(event) => {
          // Clicks on the backdrop land on the <dialog> itself, not its content.
          if (event.target === event.currentTarget) close();
        }}
      >
        <div aria-hidden="true" className="awning" />
        <div className="px-7 pt-5 pb-7 text-center sm:px-8 sm:pb-8">
          <Wordmark className="text-3xl" />
          <h2 id="panel-title" className="mt-5 font-display text-2xl font-bold">
            {kind === "order" ? "Order pickup is coming soon" : "This is a demo"}
          </h2>
          <p id="panel-description" className="mt-2 leading-relaxed text-tamarind">
            {kind === "order"
              ? "This is a demo, so it doesn't take orders yet. For now, order on Grubhub or give us a call."
              : "This chat is scripted and doesn't send anything, so it can't take your details. For now, give us a call."}
          </p>
          <div className={`mt-6 grid gap-3 ${kind === "order" ? "sm:grid-cols-2" : ""}`}>
            <a href={truckInfo.phoneHref} className={`${buttonBase} bg-chili text-white hover:bg-chili-dark`}>
              Call {truckInfo.phone}
            </a>
            {kind === "order" && (
              <a
                href={truckInfo.grubhubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${buttonBase} border-2 border-chili text-chili hover:bg-chili hover:text-white`}
              >
                Order on Grubhub
              </a>
            )}
          </div>
          <button type="button" autoFocus onClick={close} className="mt-5 text-sm font-bold text-tamarind underline underline-offset-4 hover:text-char">
            Close
          </button>
        </div>
      </dialog>
    </SiteContext.Provider>
  );
}

export function useSite(): SiteContextValue {
  const context = useContext(SiteContext);
  if (!context) throw new Error("useSite must be used inside SiteProvider");
  return context;
}

/** "Order pickup": opens the honest coming-soon panel with their Grubhub link and phone. */
export function OrderButton({ className, children = "Order pickup" }: { className?: string; children?: React.ReactNode }) {
  const { openPanel } = useSite();
  return (
    <button type="button" className={className} onClick={() => openPanel("order")}>
      {children}
    </button>
  );
}
