/* Cameron Whitters: cookie consent + Meta Pixel gate.
   Load as a normal (non-module) script in <head>, before anything else, so the saved choice is
   known before cw-site-bootstrap.mjs is imported (required by Cameron's integration package).

   - window.CWConsent is the adapter the package expects: isGranted(), subscribe(cb), getReceipt().
   - The Pixel (CSW Fitness Market Data, 1073988224464549) is never loaded without consent,
     and only after the page calls window.CWReleasePixel() (after bootstrap has cleaned the URL).
   - Each grant / decline / withdrawal is sent to CONSENT_WEBHOOK (a Zapier Catch Hook) with an
     opaque consent ID, so the backend can verify current consent. Empty = no logging yet. */
(function () {
  "use strict";
  var CONSENT_WEBHOOK = "https://hooks.zapier.com/hooks/catch/28429816/41fwb17/";   // Cameron's Zapier consent-log Catch Hook
  var PIXEL_ID = "1073988224464549";
  var PIXEL_HOSTS = ["www.cameronwhitters.com", "cameronwhitters.com", "stalins007.github.io"];
  var POLICY_VERSION = "2026-10-18";
  var KEY = "cw.consent.v1";

  var listeners = [];
  var pixelReady = false;   // page has finished bootstrap and allows the Pixel to start
  var pixelLoaded = false;

  function read() { try { return JSON.parse(localStorage.getItem(KEY) || "null"); } catch (e) { return null; } }
  function write(v) { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) {} }
  function newId() {
    try { if (crypto.randomUUID) return crypto.randomUUID(); } catch (e) {}
    var a = new Uint8Array(16); (window.crypto || {}).getRandomValues ? crypto.getRandomValues(a) : a.forEach(function (_, i) { a[i] = Math.random() * 256; });
    return Array.prototype.map.call(a, function (b) { return ("0" + b.toString(16)).slice(-2); }).join("");
  }

  var state = read();       // { id, advertising: "granted" | "declined", at, v }
  function granted() { return !!(state && state.advertising === "granted" && state.v === POLICY_VERSION); }

  window.CWConsent = {
    isGranted: function () { return granted() === true; },
    subscribe: function (cb) { listeners.push(cb); return function () { listeners = listeners.filter(function (f) { return f !== cb; }); }; },
    getReceipt: function () { return state && state.id ? String(state.id).replace(/[^A-Za-z0-9_-]/g, "") : ""; },
  };

  function log(status) {
    if (!CONSENT_WEBHOOK) return;
    var body = JSON.stringify({
      consent_id: state.id, status: status, purpose: "advertising", policy_version: POLICY_VERSION,
      occurred_at: new Date().toISOString(), page: location.origin + location.pathname,
    });
    try { fetch(CONSENT_WEBHOOK, { method: "POST", mode: "no-cors", keepalive: true, headers: { "Content-Type": "text/plain" }, body: body }); } catch (e) {}
  }

  function loadPixel() {
    if (pixelLoaded || !pixelReady || !granted() || PIXEL_HOSTS.indexOf(location.hostname) === -1) return;
    pixelLoaded = true;
    /* Standard Meta Pixel base code */
    !function (f, b, e, v, n, t, s) { if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = []; t = b.createElement(e); t.async = !0;
      t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s); }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    window.fbq("set", "autoConfig", false, PIXEL_ID);   // no automatic page scraping / advanced matching
    window.fbq("consent", "grant");
    window.fbq("init", PIXEL_ID);
    window.fbq("track", "PageView");
  }
  window.CWReleasePixel = function () { pixelReady = true; loadPixel(); };

  function clearMetaCookies() {
    ["_fbp", "_fbc"].forEach(function (name) {
      var host = location.hostname, parts = host.split(".");
      var domains = ["", host, "." + host]; if (parts.length > 2) domains.push("." + parts.slice(-2).join("."));
      domains.forEach(function (d) { document.cookie = name + "=; Max-Age=0; path=/" + (d ? "; domain=" + d : ""); });
    });
  }

  function setChoice(advertising) {
    var wasGranted = granted();
    state = { id: (state && state.id) || newId(), advertising: advertising, at: new Date().toISOString(), v: POLICY_VERSION };
    write(state);
    log(advertising === "granted" ? "granted" : wasGranted ? "withdrawn" : "declined");
    if (advertising === "granted") loadPixel();
    else if (wasGranted) { if (window.fbq) window.fbq("consent", "revoke"); clearMetaCookies(); }
    listeners.slice().forEach(function (cb) { try { cb(granted()); } catch (e) {} });
    hide();
  }

  /* ---------- Banner UI (self-contained styles so it works on every page) ---------- */
  var css = ".cwc{position:fixed;z-index:70;left:16px;right:16px;bottom:calc(16px + env(safe-area-inset-bottom));max-width:560px;margin:0 auto;background:#121212;border:1px solid rgba(184,155,106,.45);color:#c8c3b9;font:14px/1.55 Inter,system-ui,-apple-system,Helvetica,Arial,sans-serif;padding:18px 20px;box-shadow:0 12px 40px rgba(0,0,0,.6)}" +
    ".cwc b{display:block;font-family:Oswald,'Arial Narrow',sans-serif;font-weight:500;font-size:15px;letter-spacing:.18em;text-transform:uppercase;color:#f3f0ea;margin-bottom:6px}" +
    ".cwc p{margin:0}.cwc a{color:#d2b88c;text-decoration:underline;text-underline-offset:3px}" +
    ".cwc-row{display:flex;flex-wrap:wrap;gap:10px;margin-top:14px}" +
    ".cwc button{font:500 13px/1 Oswald,'Arial Narrow',sans-serif;letter-spacing:.2em;text-transform:uppercase;padding:13px 20px;cursor:pointer;border:1px solid #b89b6a}" +
    ".cwc .cwc-yes{background:#b89b6a;color:#0b0b0b}.cwc .cwc-no{background:transparent;color:#f3f0ea;border-color:rgba(243,240,234,.35)}" +
    ".cwc button:focus-visible{outline:2px solid #f0c46e;outline-offset:2px}.cwc-status{margin-top:8px;font-size:13px;color:#8d887f}" +
    "@media (max-width:520px){.cwc button{flex:1 1 auto}}";
  var box = null;
  function privacyHref() { var path = location.pathname; return /\/(apply|privacy|terms)\/?$/.test(path) ? "../privacy/" : "privacy/"; }
  function show(settings) {
    if (!document.body) return;
    if (!document.getElementById("cwc-style")) { var st = document.createElement("style"); st.id = "cwc-style"; st.textContent = css; document.head.appendChild(st); }
    if (box) box.remove();
    box = document.createElement("div");
    box.className = "cwc"; box.setAttribute("role", "dialog"); box.setAttribute("aria-label", "Cookie preferences");
    var status = settings && state ? '<p class="cwc-status">Current choice: ' + (granted() ? "advertising cookies allowed" : "advertising cookies declined") + ".</p>" : "";
    box.innerHTML = "<b>Cookies</b><p>We'd like to use advertising cookies, including Meta's, to measure our marketing. The site and the application work the same either way, and your application answers are never shared with Meta. <a href=\"" + privacyHref() + "\">Privacy Policy</a></p>" + status +
      '<div class="cwc-row"><button type="button" class="cwc-yes">Accept</button><button type="button" class="cwc-no">' + (settings && granted() ? "Withdraw consent" : "Decline") + "</button></div>" +
      (settings && granted() ? '<p class="cwc-status">Withdrawing while you are part-way through the application restarts it.</p>' : "");
    box.querySelector(".cwc-yes").addEventListener("click", function () { setChoice("granted"); });
    box.querySelector(".cwc-no").addEventListener("click", function () { setChoice("declined"); });
    document.body.appendChild(box);
  }
  function hide() { if (box) { box.remove(); box = null; } }
  window.CWConsentSettings = function () { show(true); };

  function init() {
    document.querySelectorAll("[data-cookie-settings]").forEach(function (a) {
      a.addEventListener("click", function (e) { e.preventDefault(); show(true); });
    });
    if (!state || state.v !== POLICY_VERSION) show(false);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
