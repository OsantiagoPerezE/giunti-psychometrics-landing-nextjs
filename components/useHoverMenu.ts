"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
  type RefObject,
} from "react";

const CLOSE_DELAY_MS = 250;

export const useHoverMenu = (containerRef: RefObject<HTMLElement | null>) => {
  const [open, setOpen] = useState(false);
  const pinned = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const cancelClose = useCallback(() => clearTimeout(timer.current), []);

  const close = useCallback(() => {
    cancelClose();
    pinned.current = false;
    setOpen(false);
  }, [cancelClose]);

  const toggle = useCallback(() => {
    cancelClose();
    if (open && pinned.current) {
      close();
    } else {
      pinned.current = true;
      setOpen(true);
    }
  }, [open, close, cancelClose]);

  const onPointerEnter = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    cancelClose();
    setOpen(true);
  };

  const onPointerLeave = (e: PointerEvent) => {
    if (e.pointerType !== "mouse" || pinned.current) return;
    cancelClose();
    timer.current = setTimeout(() => setOpen(false), CLOSE_DELAY_MS);
  };

  useEffect(() => {
    if (!open) return;
    const onMouseDown = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close, containerRef]);

  useEffect(() => () => clearTimeout(timer.current), []);

  return {
    open,
    close,
    toggle,
    hoverHandlers: { onPointerEnter, onPointerLeave },
  };
};
