"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

type Option<T extends string> = { value: T; label: string };

type Props<T extends string> = {
  id?: string;
  value: T;
  onChange: (value: T) => void;
  options: Option<T>[];
  ariaLabel?: string;
  disabled?: boolean;
};

export default function Select<T extends string>({
  id,
  value,
  onChange,
  options,
  ariaLabel,
  disabled,
}: Props<T>) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listId = useId();

  const selected = options.find((o) => o.value === value);
  const selectedIndex = Math.max(
    0,
    options.findIndex((o) => o.value === value),
  );

  // Tutup saat klik di luar
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  // Pilihan aktif (keyboard) selalu terlihat
  useEffect(() => {
    if (!open) return;
    document.getElementById(`${listId}-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [open, active, listId]);

  const openList = () => {
    setActive(selectedIndex);
    setOpen(true);
  };

  const choose = (index: number) => {
    const option = options[index];
    if (option) onChange(option.value);
    setOpen(false);
    buttonRef.current?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        openList();
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActive((a) => Math.min(options.length - 1, a + 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActive((a) => Math.max(0, a - 1));
        break;
      case "Home":
        e.preventDefault();
        setActive(0);
        break;
      case "End":
        e.preventDefault();
        setActive(options.length - 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        choose(active);
        break;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={ariaLabel}
        aria-activedescendant={open ? `${listId}-${active}` : undefined}
        disabled={disabled}
        onClick={(e) => {
          if (e.detail === 0) return; // klik dari keyboard sudah ditangani onKeyDown
          if (open) setOpen(false);
          else openList();
        }}
        onKeyDown={onKeyDown}
        className={`flex w-full items-center justify-between gap-3 rounded-xl border bg-white px-3 py-2.5 text-left text-[13px] font-medium text-ink outline-none transition disabled:cursor-not-allowed disabled:opacity-50 ${
          open
            ? "border-brand ring-4 ring-brand/10"
            : "border-softgrey hover:border-muted/40 focus-visible:border-brand focus-visible:ring-4 focus-visible:ring-brand/10"
        }`}
      >
        <span className="truncate">{selected?.label ?? ""}</span>
        <ChevronDown
          size={16}
          className={`shrink-0 transition-transform duration-200 ${
            open ? "rotate-180 text-brand" : "text-muted"
          }`}
        />
      </button>

      <ul
        id={listId}
        role="listbox"
        aria-label={ariaLabel}
        className={`absolute left-0 right-0 z-30 mt-2 max-h-64 origin-top overflow-y-auto rounded-2xl border border-softgrey bg-white p-1.5 shadow-xl transition duration-150 ${
          open
            ? "visible translate-y-0 scale-100 opacity-100"
            : "invisible -translate-y-1 scale-95 opacity-0"
        }`}
      >
        {options.map((option, i) => {
          const isSelected = option.value === value;
          return (
            <li
              key={option.value}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={isSelected}
              onPointerEnter={() => setActive(i)}
              onClick={() => choose(i)}
              className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-[13px] transition-colors ${
                isSelected ? "font-semibold text-brand" : "font-medium text-ink"
              } ${i === active ? "bg-brand/10" : ""}`}
            >
              <span>{option.label}</span>
              {isSelected && <Check size={15} className="shrink-0" />}
            </li>
          );
        })}
      </ul>
    </div>
  );
}