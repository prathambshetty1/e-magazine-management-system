import { useEffect } from "react";

function ImagePreviewDialog({
  open,
  onOpenChange,
  image,
  title,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onOpenChange(false);
      }
    };

    if (open) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [open, onOpenChange]);

  if (!open || !image) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center"
      onClick={() => onOpenChange(false)}
    >
      <img
        src={image}
        alt={title}
        onClick={(e) => e.stopPropagation()}
        className="
          max-w-[90vw]
          max-h-[90vh]
          object-contain
          rounded-xl
          shadow-2xl
          cursor-zoom-out
          select-none
        "
      />

      <button
        onClick={() => onOpenChange(false)}
        className="
          absolute
          top-6
          right-8
          text-white
          text-5xl
          font-light
          hover:text-red-400
          transition
        "
      >
        ×
      </button>

      <div className="absolute bottom-6 text-white/80 text-sm">
        Click anywhere outside the image or press ESC to close
      </div>
    </div>
  );
}

export default ImagePreviewDialog;