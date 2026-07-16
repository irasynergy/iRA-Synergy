"use client";

import { useEffect } from "react";
import { siteConfig } from "@/config/site";

export default function CopyProtection() {
  useEffect(() => {
    if (!siteConfig.enableCopyProtection) return;

    // Add CSS class to body
    document.body.classList.add("copy-protected");

    // Helper to check if event target is an interactive element
    const isInteractiveElement = (target: HTMLElement | null) => {
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

    // Disable context menu (right-click)
    const handleContextMenu = (e: MouseEvent) => {
      if (isInteractiveElement(e.target as HTMLElement)) return;
      e.preventDefault();
    };

    // Disable specific keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isInteractiveElement(e.target as HTMLElement)) return;

      const isModifierPressed = e.ctrlKey || e.metaKey;

      if (isModifierPressed) {
        const key = e.key.toLowerCase();
        // Block Copy (c), Select All (a), View Source (u), Save (s), Print (p)
        if (key === "c" || key === "a" || key === "u" || key === "s" || key === "p") {
          e.preventDefault();
        }
      }
    };

    // Disable dragging (images, text)
    const handleDragStart = (e: DragEvent) => {
      if (isInteractiveElement(e.target as HTMLElement)) return;
      e.preventDefault();
    };

    // Attach event listeners
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("dragstart", handleDragStart);

    // Cleanup function
    return () => {
      document.body.classList.remove("copy-protected");
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("dragstart", handleDragStart);
    };
  }, []);

  return null;
}
