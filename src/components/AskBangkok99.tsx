"use client";

import { useEffect, useId, useRef, useState } from "react";

import { answer, greeting, suggestions, type BotAction, type BotReply } from "@/lib/bangkokBot";

import { Bowl, ChatBubble } from "./Icons";
import { useSite } from "./SiteProvider";

type Message = { id: number; from: "bot" | "guest"; text: string; action?: BotAction };

// A short pause before each reply reads as a conversation; the follow-up step (the demo panel) waits a
// little longer so the reply can be read first.
const REPLY_DELAY_MS = 450;
const FOLLOW_UP_DELAY_MS = 1400;

const actionLabels: Record<BotAction, string> = {
  order: "How to order",
  menu: "See the menu",
  contact: "How to reach us",
};

const actionClass = "mt-2 inline-block rounded-full bg-chili px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-chili-dark";

/**
 * "Ask Bangkok99": a floating, scripted helper. Replies come from `answer()` in lib/bangkokBot.ts, on
 * the page itself; nothing typed here leaves the browser or is stored.
 */
export function AskBangkok99() {
  const { openPanel } = useSite();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ id: 0, from: "bot", ...greeting }]);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const nextId = useRef(1);
  const timers = useRef<number[]>([]);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef(false);
  const panelId = useId();

  useEffect(() => () => timers.current.forEach((timer) => window.clearTimeout(timer)), []);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    } else if (returnFocus.current) {
      // The launcher is hidden while the panel is open, so focus it only once it's back.
      returnFocus.current = false;
      launcherRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [messages, typing]);

  const later = (callback: () => void, delay: number) => {
    timers.current.push(window.setTimeout(callback, delay));
  };

  const close = (focusLauncher = true) => {
    returnFocus.current = focusLauncher;
    setOpen(false);
  };

  const runAction = (action: BotAction) => {
    if (action === "menu") {
      close(false);
      document.getElementById("menu")?.scrollIntoView({ block: "start" });
    } else {
      openPanel(action === "order" ? "order" : "chat");
    }
  };

  const ask = (question: string) => {
    const text = question.trim().slice(0, 200);
    if (!text || typing) return;
    const reply: BotReply = answer(text);
    setMessages((current) => [...current, { id: nextId.current++, from: "guest", text }]);
    setDraft("");
    setTyping(true);
    later(() => {
      setTyping(false);
      setMessages((current) => [...current, { id: nextId.current++, from: "bot", ...reply }]);
      // Catering ("Ask us! Leave your details") and anything off-script end in the demo panel. The
      // other answers only offer their button (no `auto`).
      if (reply.auto && reply.action) {
        const action = reply.action;
        later(() => runAction(action), FOLLOW_UP_DELAY_MS);
      }
    }, REPLY_DELAY_MS);
  };

  return (
    <>
      {open && (
        <section
          id={panelId}
          role="dialog"
          aria-modal="false"
          aria-labelledby={`${panelId}-title`}
          className="fixed right-3 bottom-24 z-50 flex max-h-[min(36rem,calc(100dvh-8rem))] w-[min(24rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-[1.75rem] bg-white pop ring-1 ring-char/10 md:right-6 md:bottom-6"
          onKeyDown={(event) => {
            if (event.key === "Escape") close();
          }}
        >
          <header className="flex items-center gap-3 bg-chili px-4 py-3 text-white">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-saffron text-char">
              <Bowl className="size-7" />
            </span>
            <div className="min-w-0 flex-1">
              <h2 id={`${panelId}-title`} className="font-display text-xl leading-tight font-bold">
                Ask Bangkok99
              </h2>
              <p className="text-xs font-semibold text-saffron-soft">Scripted demo · nothing is sent</p>
            </div>
            <button
              type="button"
              onClick={() => close()}
              aria-label="Close Ask Bangkok99"
              className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-white/25"
            >
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </header>

          <div ref={logRef} role="log" aria-live="polite" aria-label="Conversation" className="flex-1 space-y-3 overflow-y-auto bg-rice px-4 py-4">
            {messages.map(({ id, from, text, action }) =>
              from === "bot" ? (
                <div key={id} className="max-w-[88%]">
                  <p className="rounded-2xl rounded-bl-md bg-white px-4 py-2.5 leading-snug text-char ring-1 ring-char/10">{text}</p>
                  {action && (
                    <button type="button" onClick={() => runAction(action)} className={actionClass}>
                      {actionLabels[action]}
                    </button>
                  )}
                </div>
              ) : (
                <p key={id} className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-chili-dark px-4 py-2.5 leading-snug break-words text-white">
                  {text}
                </p>
              ),
            )}
            {typing && (
              <p className="w-fit rounded-2xl rounded-bl-md bg-white px-4 py-2.5 text-tamarind ring-1 ring-char/10">
                <span className="sr-only">Bangkok99 helper is typing</span>
                <span aria-hidden="true" className="tracking-[0.3em] motion-safe:animate-pulse">
                  •••
                </span>
              </p>
            )}
          </div>

          <div className="border-t border-char/10 bg-white px-3 pt-3 pb-3">
            <ul aria-label="Suggested questions" className="flex flex-wrap gap-1.5">
              {suggestions.map((suggestion) => (
                <li key={suggestion.label}>
                  <button
                    type="button"
                    onClick={() => ask(suggestion.question)}
                    disabled={typing}
                    className="rounded-full bg-saffron-soft px-3 py-1.5 text-sm font-bold text-chili-dark transition-colors hover:bg-saffron-light disabled:opacity-60"
                  >
                    {suggestion.label}
                  </button>
                </li>
              ))}
            </ul>
            <form
              className="mt-2.5 flex gap-2"
              onSubmit={(event) => {
                event.preventDefault();
                ask(draft);
              }}
            >
              <label htmlFor={`${panelId}-input`} className="sr-only">
                Type a question
              </label>
              <input
                ref={inputRef}
                id={`${panelId}-input`}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                maxLength={200}
                autoComplete="off"
                placeholder="Type a question"
                className="min-w-0 flex-1 rounded-full border-2 border-char/15 px-4 py-2.5 text-base focus:border-chili focus:outline-none"
              />
              <button
                type="submit"
                disabled={typing || !draft.trim()}
                className="rounded-full bg-chili px-4 font-bold text-white transition-colors hover:bg-chili-dark disabled:opacity-50"
              >
                Ask
              </button>
            </form>
          </div>
        </section>
      )}

      <button
        ref={launcherRef}
        type="button"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onClick={() => (open ? close() : setOpen(true))}
        className={`fixed right-3 bottom-[5.25rem] z-40 items-center gap-2 rounded-full bg-char py-2.5 pr-4 pl-3 font-display text-base font-bold text-saffron-light pop ring-2 ring-saffron transition-colors hover:bg-chili-dark md:right-6 md:bottom-6 md:py-3 md:text-lg ${
          open ? "hidden" : "inline-flex"
        }`}
      >
        <ChatBubble className="size-6" />
        Ask Bangkok99
      </button>
    </>
  );
}
