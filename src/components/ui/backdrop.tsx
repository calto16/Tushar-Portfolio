/** Fixed full-viewport background: concrete + blueprint grid + neon vignette. */
export function Backdrop() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 bg-concrete-950">
      <div className="absolute inset-0 bg-blueprint opacity-50" />
      <div className="absolute inset-0 bg-vignette" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--color-concrete-500) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
}
