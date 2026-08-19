export const PRELOADER_SEEN_KEY = "preloader:seen"

const SCRIPT = `(function(){var d=document.documentElement;try{
if(matchMedia("(prefers-reduced-motion: reduce)").matches){d.dataset.preloader="seen";return}
if(sessionStorage.getItem("${PRELOADER_SEEN_KEY}")){d.dataset.preloader="seen";return}
sessionStorage.setItem("${PRELOADER_SEEN_KEY}","1");d.dataset.preloader="run"
}catch(e){d.dataset.preloader="run"}})()`

export function PreloaderGateScript() {
  return <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />
}
