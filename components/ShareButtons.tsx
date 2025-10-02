"use client";

import { useState } from "react";

interface ShareButtonsProps {
  title: string;
  text: string;
  url: string;
  onDownloadCard?: () => void;
}

export default function ShareButtons({ title, text, url, onDownloadCard }: ShareButtonsProps) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied">("idle");
  const [downloadStatus, setDownloadStatus] = useState<"idle" | "downloading">("idle");

  const handleShare = async () => {
    // Try Web Share API if available
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        // Analytics hook placeholder
        // trackEvent('share', { method: 'web_share_api' });
      } catch (err) {
        // User cancelled or error - do nothing
        console.log("Share cancelled");
      }
    } else {
      // Fallback to copy
      handleCopy();
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopyStatus("copied");
      // Analytics hook placeholder
      // trackEvent('share', { method: 'copy_link' });
      setTimeout(() => setCopyStatus("idle"), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleDownload = async () => {
    if (!onDownloadCard) return;
    setDownloadStatus("downloading");
    await onDownloadCard();
    setTimeout(() => setDownloadStatus("idle"), 1000);
  };

  return (
    <div className="flex gap-3">
      {/* Share button - uses Web Share API if available */}
      <button
        onClick={handleShare}
        className="
          flex-1 px-6 py-3 rounded-xl
          text-sm font-medium text-white
          bg-stone-900 hover:bg-stone-800
          active:scale-95
          transition-all duration-150
          focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-offset-2
        "
      >
        Share Result
      </button>
      
      {/* Download card button */}
      {onDownloadCard && (
        <button
          onClick={handleDownload}
          disabled={downloadStatus === "downloading"}
          className="
            flex-1 px-6 py-3 rounded-xl
            text-sm font-medium text-stone-700
            bg-stone-100 hover:bg-stone-200 border-2 border-stone-200
            active:scale-95
            transition-all duration-150
            focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-offset-2
            disabled:opacity-50
          "
        >
          {downloadStatus === "downloading" ? "Saving..." : "📥 Save Card"}
        </button>
      )}
    </div>
  );
}
