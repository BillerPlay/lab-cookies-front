import React from "react";

export default function Field({ id, label, error, inputRef, ...props }) {
  const baseClass =
    "bg-background border rounded-sm px-3 py-2 text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary focus:shadow-[0_0_8px_rgba(0,240,255,0.4)] transition-shadow";

  return (
    <label className="flex flex-col gap-1.5 w-full mb-4">
      <span className="text-xs font-medium text-white/70 pl-1">
        {label}
      </span>
      <input
        id={id}
        ref={inputRef}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
        required
        className={`
          w-full px-4 py-2.5 
          bg-white/5 backdrop-blur-md
          border rounded-xl text-sm text-white placeholder:text-white/30
          outline-none transition-all duration-300
          focus:bg-white/10 focus:border-white/20 focus:ring-2 focus:ring-blue-500/30
          shadow-inner
          ${error ? "border-red-500/50 focus:ring-red-500/20" : "border-white/10"}
        `}
      />

      {error && (
        <p id={`${id}-error`} role="alert" aria-live="polite" className="text-xs text-red-400 mt-1 pl-1">
          {error}
        </p>
      )}
    </label>
  );
}
