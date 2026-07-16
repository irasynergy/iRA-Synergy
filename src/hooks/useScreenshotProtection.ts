"use client";

import { useEffect, useState, useCallback, useRef } from "react";

/**
 * Configuration options for the useScreenshotProtection hook.
 */
export interface UseScreenshotProtectionProps {
  watermarkText?: string;
  overlayDuration?: number;
  blurOnHide?: boolean;
  blockDevTools?: boolean;
  blockRightClick?: boolean;
  userEmail?: string;
}

/**
 * Custom hook to deter screenshots, copying, and developer console inspections.
 * 
 * @param props Configuration options for the security modules
 * @returns Object containing block states and a manual trigger callback
 */
export function useScreenshotProtection({
  overlayDuration = 1200,
  blurOnHide = true,
  blockDevTools = true,
  blockRightClick = true,
  userEmail,
}: UseScreenshotProtectionProps = {}) {
  const [isBlocked, setIsBlocked] = useState(false);
  const [isDevToolsOpen, setIsDevToolsOpen] = useState(false);
  const blockTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastLoggedRef = useRef<Record<string, number>>({});

  // Client-side to server-side Audit Logging connector
  const logEvent = useCallback((event: string, details?: any) => {
    const now = Date.now();
    const lastTime = lastLoggedRef.current[event] || 0;
    
    // Throttling: Only log the same event type once every 5 seconds to prevent spam
    if (now - lastTime < 5000) return;
    lastLoggedRef.current[event] = now;

    fetch("/api/security-log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event,
        details,
        timestamp: new Date().toISOString(),
        userEmail: userEmail || "Anonymous",
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "Unknown",
      }),
    }).catch((err) => console.error("[SECURITY] Audit logging failed:", err));
  }, [userEmail]);

  // Instantly blanks out screen for a configured duration when a screenshot attempt is made
  const triggerBlackout = useCallback((actionSource: string = "key_trigger") => {
    setIsBlocked(true);
    logEvent("SCREENSHOT_ATTEMPT", { source: actionSource, action: "blackout_overlay_flashed" });
    
    if (blockTimeoutRef.current) {
      clearTimeout(blockTimeoutRef.current);
    }
    blockTimeoutRef.current = setTimeout(() => {
      setIsBlocked(false);
    }, overlayDuration);
  }, [overlayDuration, logEvent]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Helper: checks if event targets an interactive input element
    const isInputElement = (target: HTMLElement | null): boolean => {
      if (!target) return false;
      const tagName = target.tagName;
      return (
        tagName === "INPUT" ||
        tagName === "TEXTAREA" ||
        target.isContentEditable ||
        tagName === "SELECT" ||
        tagName === "OPTION"
      );
    };

    // -------------------------------------------------------------
    // 1. Keyboard Shortcuts & PrintScreen Interception
    // -------------------------------------------------------------
    const handleKeyDown = (e: KeyboardEvent) => {
      // Print Screen detection key intercept
      if (e.key === "PrintScreen" || e.keyCode === 44) {
        e.preventDefault();
        triggerBlackout("PrintScreen_keydown");
      }

      const ctrlOrCmd = e.ctrlKey || e.metaKey;

      if (ctrlOrCmd) {
        const key = e.key.toLowerCase();
        
        // Ctrl+P (Print)
        if (key === "p") {
          e.preventDefault();
          triggerBlackout("Ctrl+P");
        }

        // Ctrl+S (Save Page)
        if (key === "s") {
          e.preventDefault();
          triggerBlackout("Ctrl+S");
        }

        // Ctrl+A (Select All - Layer 4 restriction)
        if (key === "a" && !isInputElement(e.target as HTMLElement)) {
          e.preventDefault();
          logEvent("SELECT_ALL_BLOCKED");
        }

        // Ctrl+C (Copy - Layer 4 restriction)
        if (key === "c" && !isInputElement(e.target as HTMLElement)) {
          e.preventDefault();
          logEvent("COPY_BLOCKED");
        }
      }

      // DevTools keys: F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+Shift+K
      if (blockDevTools) {
        if (e.key === "F12" || e.keyCode === 123) {
          e.preventDefault();
          logEvent("DEVTOOLS_SHORTCUT_BLOCKED", { key: "F12" });
        }
        if (ctrlOrCmd && e.shiftKey) {
          const key = e.key.toLowerCase();
          if (key === "i" || key === "j" || key === "c" || key === "k") {
            e.preventDefault();
            logEvent("DEVTOOLS_SHORTCUT_BLOCKED", { key: `Ctrl+Shift+${key.toUpperCase()}` });
          }
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "PrintScreen" || e.keyCode === 44) {
        triggerBlackout("PrintScreen_keyup");
        // Clear clipboard immediately to block memory paste dumps
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText("Restricted Access").catch(() => {});
        }
      }
    };

    // Wipes clipboard on global copy attempts
    const handleCopy = (e: ClipboardEvent) => {
      if (!isInputElement(e.target as HTMLElement)) {
        e.preventDefault();
        logEvent("COPY_EVENT_BLOCKED");
        if (e.clipboardData) {
          e.clipboardData.setData("text/plain", "Restricted Access");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("copy", handleCopy as EventListener);

    // -------------------------------------------------------------
    // 2. Page Visibility API & Tab Focus Blurring
    // -------------------------------------------------------------
    const handleVisibilityChange = () => {
      if (!blurOnHide) return;
      
      const body = document.body;
      if (document.visibilityState === "hidden") {
        body.classList.add("screenshot-blur");
        logEvent("VISIBILITY_HIDDEN");
      } else {
        body.classList.remove("screenshot-blur");
        logEvent("VISIBILITY_VISIBLE");
      }
    };

    const handleWindowBlur = () => {
      if (!blurOnHide) return;
      document.body.classList.add("screenshot-blur");
      logEvent("TAB_BLURRED");
    };

    const handleWindowFocus = () => {
      if (!blurOnHide) return;
      document.body.classList.remove("screenshot-blur");
      logEvent("TAB_FOCUSED");
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleWindowBlur);
    window.addEventListener("focus", handleWindowFocus);

    // -------------------------------------------------------------
    // 3. Right-Click Context Menu & Selection Lock
    // -------------------------------------------------------------
    const handleContextMenu = (e: MouseEvent) => {
      if (blockRightClick && !isInputElement(e.target as HTMLElement)) {
        e.preventDefault();
        logEvent("RIGHT_CLICK_BLOCKED");
      }
    };

    const handleDragStart = (e: DragEvent) => {
      if (!isInputElement(e.target as HTMLElement)) {
        e.preventDefault();
        logEvent("DRAG_START_BLOCKED");
      }
    };

    // Apply global selections blocking CSS attributes
    const htmlElement = document.documentElement;
    if (htmlElement) {
      htmlElement.style.setProperty("user-select", "none");
      htmlElement.style.setProperty("-webkit-user-select", "none");
    }

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("dragstart", handleDragStart);

    // -------------------------------------------------------------
    // 4. DevTools Open Detection via size threshold delta
    // -------------------------------------------------------------
    let pollerId: number | null = null;
    let wasDevToolsOpen = false;
    
    if (blockDevTools) {
      const detectDevTools = () => {
        const threshold = 160;
        const widthDelta = window.outerWidth - window.innerWidth > threshold;
        const heightDelta = window.outerHeight - window.innerHeight > threshold;
        const isOpen = widthDelta || heightDelta;

        if (isOpen) {
          setIsDevToolsOpen(true);
          if (!wasDevToolsOpen) {
            logEvent("DEVTOOLS_DETECTED", { type: widthDelta ? "side_dock" : "bottom_dock" });
            wasDevToolsOpen = true;
          }
        } else {
          setIsDevToolsOpen(false);
          wasDevToolsOpen = false;
        }
      };

      window.addEventListener("resize", detectDevTools);
      pollerId = window.setInterval(detectDevTools, 800) as unknown as number;
      detectDevTools(); // Initial run
    }

    // -------------------------------------------------------------
    // Cleanup of all triggers on unmount
    // -------------------------------------------------------------
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("copy", handleCopy as EventListener);
      
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleWindowBlur);
      window.removeEventListener("focus", handleWindowFocus);
      
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("dragstart", handleDragStart);

      const htmlEl = document.documentElement;
      if (htmlEl) {
        htmlEl.style.removeProperty("user-select");
        htmlEl.style.removeProperty("-webkit-user-select");
      }

      if (blockDevTools) {
        window.removeEventListener("resize", () => {});
        if (pollerId !== null) clearInterval(pollerId);
      }

      if (blockTimeoutRef.current) clearTimeout(blockTimeoutRef.current);
      document.body.classList.remove("screenshot-blur");
    };
  }, [overlayDuration, blurOnHide, blockDevTools, blockRightClick, triggerBlackout, logEvent]);

  return {
    isBlocked,
    isDevToolsOpen,
    triggerBlackout,
  };
}
