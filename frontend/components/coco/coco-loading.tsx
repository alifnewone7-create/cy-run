/**
 * Shared full-screen loader for guarded routes. Uses the same cosmic purple
 * grading as the rest of the site instead of the plain default spinner.
 */
export function CocoLoading({ label = 'Loading' }: { label?: string }) {
  return (
    <main className="coco-load" data-testid="coco-loading">
      <span className="coco-load-glow" aria-hidden="true" />
      <div className="coco-load-spinner" role="status" aria-label={label}>
        <span />
        <span />
      </div>
      <p className="coco-load-text">{label}</p>
    </main>
  )
}
