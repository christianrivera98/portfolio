/**
 * Stamps `data-preloader` on <html> before the browser paints the body, so the
 * decision "does this visit see the preloader?" is already made by the time the
 * overlay markup is parsed. React cannot make it: a client effect only runs
 * after hydration, which is exactly when the black overlay would already be on
 * screen. Three states:
 *   run  — first visit of the session: CSS locks scroll, overlay plays.
 *   seen — repeat visit (or reduced motion): overlay is display:none, no lock.
 *   done — set by PreloaderScrollLock once the sequence finishes.
 * The session key is written the moment the sequence STARTS, so reloading
 * mid-sequence also skips it.
 */
export const PRELOADER_SEEN_KEY = "preloader:seen"

const SCRIPT = `(function(){var d=document.documentElement;try{
if(matchMedia("(prefers-reduced-motion: reduce)").matches){d.dataset.preloader="seen";return}
if(sessionStorage.getItem("${PRELOADER_SEEN_KEY}")){d.dataset.preloader="seen";return}
sessionStorage.setItem("${PRELOADER_SEEN_KEY}","1");d.dataset.preloader="run"
}catch(e){d.dataset.preloader="run"}})()`

export function PreloaderGateScript() {
  return <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />
}
