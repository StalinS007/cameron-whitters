/* REVIEW MARKERS for Cameron's "Website Edits" doc (18 October 2026).
   Every element with data-edit="N" gets a numbered badge. Click a badge for what Cameron asked,
   what changed and the old text. The panel (bottom left) lists all 28 items with their status.
   Delete this file, review.css and the two tags in index.html before publishing. */
(() => {
  const EDITS = {
    1:  { t: "Hero section", s: "done",
          ask: "Keep the headline. New supporting copy. Separate line 'Personally managed by Cameron Whitters.' 'Every application is reviewed personally by Cameron.' Replace 'Competitive pedigree'. Keep the VSL, real runtime, proper designed thumbnail.",
          did: "All done. Thumbnail designed from the finished VSL; runtime 7:52; 'Competitive bodybuilding' used." },
    2:  { t: "Remove the early application block", s: "done",
          ask: "Completely remove 'Start the Application · One question opens it.' Replace that space with proof / transformations.",
          did: "Removed. The space is now the transformation strip (#3)." },
    3:  { t: "Move transformation proof dramatically higher", s: "needs",
          ask: "Proof strip almost immediately after the hero/VSL. 6–10 strongest transformations, horizontal swipe gallery. Minimal info: before/after, name, main result/timeframe. Heading 'REAL CLIENTS. DOCUMENTED RESULTS.' Riccardo and Oliver later as deeper case studies, then a larger wall.",
          did: "Swipe strip of 8 real clients right after the hero. Needs from Cameron: a result/timeframe line for Kadir, Thomas, Omar, Nadir, Riley and Ricky (only Riccardo and Oliver are known)." },
    4:  { t: "Problem section headline", s: "done",
          ask: "Keep 'The business is held to a standard. The body has been exempt.' or use 'You hold your business to a standard. Your body should be held to one too.' Keep it plain and authoritative.",
          did: "Used the cleaner second version. One-line swap back if Cameron prefers the original." },
    5:  { t: "Rebuild the Professional vs Physical graphic", s: "done",
          ask: "Replace with PROFESSIONALLY (Clear standards / Performance reviewed / Problems corrected quickly / High performance expected) vs PHYSICALLY (Standards have slipped / Progress has become inconsistent / Problems have been tolerated / Health, confidence and energy pay the price).",
          did: "Rebuilt with his exact wording, like for like." },
    6:  { t: "'Sound familiar?' copy", s: "done",
          ask: "Keep the beach line and the kids line. Replace the dinner line with the energy line. Delete the following line if it repeats. Replace 'You know the problem…' with 'The problem isn't that you don't care…'.",
          did: "Done. The 'partner gets what's left' line was deleted as a repeat." },
    7:  { t: "Why conventional coaching fails", s: "done",
          ask: "Keep the section, especially 'Conventional coaching asks you to organise your life around the programme. I build the strategy around the life you already have.'",
          did: "Kept unchanged." },
    8:  { t: "Business / Travel / Family / Access cards", s: "done",
          ask: "New Business copy. Keep Travel. New Family copy. Replace 'Your job is to execute…' everywhere with 'Your responsibility is execution. My responsibility is making sure you're executing the right strategy.'",
          did: "Done. That line only appeared once on the page." },
    9:  { t: "Executive Physique Protocol™", s: "check",
          ask: "Keep the mechanism, simpler explanation. Remove 'The physique changes first; then it is made to survive your life.' New intro paragraph (all three standards from day 1). New Phase 1 / Phase 2 copy. Replace 'A physique that survives the life you've created' with his line.",
          did: "All done word for word. To check: the new intro and the new closing line now make the same point, so one could go (#28)." },
    10: { t: "Direct Access / Personal Management", s: "done",
          ask: "Keep 'I PERSONALLY MANAGE YOUR TRANSFORMATION.' New paragraph. Remove weekly 45-minute calls. Only show what's true at every support level. New health line.",
          did: "Done. Six cards: progress review, private messaging, unlimited adaptations, travel planning, health strategy, direct involvement. No call cadence anywhere." },
    11: { t: "Lifestyle / relationship section", s: "done",
          ask: "Keep the concept, change the imagery. Remove the Mykonos / Greece / Italy collage and captions. Keep one strong photo of Cameron and Ella. Useful: Cameron working, coaching/reviewing client data, outside bodybuilding, one family/social image. Keep 'The man should be impressive…'. New copy under 'The life the strategy has to survive'.",
          did: "Collage and destination captions removed. Kept the one strong Cameron & Ella banner and the line he asked to keep, with his new copy under \'The life the strategy has to survive\'. The extra four-photo grid was dropped (your call). Folded into the Problem story, straight after Sound familiar, as his #23 asks." },
    12: { t: "Riccardo case study", s: "done",
          ask: "Keep the visual concept. Stats: 95 KG → 77.8 KG / ~25% → ~10% BODY FAT / 17.1 KG LOST / 8 MONTHS. '17.1 kg removed' → '17.1 kg lost'.",
          did: "Done." },
    13: { t: "Oliver case study", s: "done",
          ask: "Present as 25+ KG LOST / 8 MONTHS / FREQUENT INTERSTATE + OVERSEAS TRAVEL. Remove 'Weekly Travelling'.",
          did: "Done. Also changed 'removed' to 'lost' to match Riccardo." },
    14: { t: "Additional transformations wall", s: "check",
          ask: "After Oliver, another strong visual wall of transformations, for depth and repeatability. Cameron has a folder ready. Keep the small disclaimer.",
          did: "Wall rebuilt after the case studies: 9 different clients, no Oliver, no repeats from the top strip. Josh, Donnie, Jourdon, Meylad and Michael from Cameron's Testimonials folder. Across the whole page that is every client photo we have (16 people); more need to come from Cameron." },
    15: { t: "Testimonials", s: "check",
          ask: "Keep the section. Three excellent, specific, real testimonials alongside the transformation stack.",
          did: "Three real quotes from his Testimonials doc: Josh (restaurateur), Donny (construction & property), Meylad (dental practice owner). Lightly trimmed. Cameron should approve the excerpts." },
    16: { t: "About Cameron", s: "check",
          ask: "Replace the awkward mobile crop. One strong professionally framed portrait (not shirtless) and one Mr Australia / stage image. New authority copy (three paragraphs). Remove 'Men transformed internationally.'",
          did: "Professional portrait from his CHARGE brand shoot (black polo, Archer building) plus the podium photo. New copy word for word. 'Men transformed internationally' removed." },
    17: { t: "Remove the package comparison", s: "done",
          ask: "Remove Private Advisory vs Private Coaching. Keep the cream section. New heading and two paragraphs. Shared inclusions only (six listed). Weekly vs fortnightly explained on the call.",
          did: "Done. The FAQ cost answer was also changed so it no longer names the two packages." },
    18: { t: "Application process", s: "done",
          ask: "Keep this section. Concept and order are good. Can be tightened slightly.",
          did: "Kept. Step 1 now says 'review' to match the hero." },
    19: { t: "FAQ", s: "done",
          ask: "Keep the current FAQ topics. Cameron will review the answers separately.",
          did: "All topics kept. Ready for his review of the answers." },
    20: { t: "Final application section", s: "done",
          ask: "Delete 'The standard has been proven once. This is where it is applied again.' Replace with APPLY TO WORK WITH CAMERON + his paragraph.",
          did: "Done, as a simple text-led closing section." },
    21: { t: "Current application form", s: "done",
          ask: "Remove the custom form. A Typeform is being built separately. All Apply buttons should point to a dedicated /apply page. No age question early.",
          did: "Form removed. Every Apply button now goes to /apply, which has Cameron's Typeform from his integration package." },
    22: { t: "Footer", s: "done",
          ask: "Remove 'Cameron Whitters · CSW Fitness' as front-facing branding. CSW Fitness can still appear in Terms, Privacy, company details.",
          did: "Footer now reads '© 2026 Cameron Whitters'." },
    23: { t: "Final page order", s: "done",
          ask: "Hero + VSL + CTA + credibility → proof → Problem → Why coaching fails → Protocol → How Cameron manages it → Riccardo + Oliver → more transformations + testimonials → About → private engagement → after you apply → FAQ → final CTA. Lifestyle shortened or absorbed into Problem.",
          did: "Page now matches his list exactly. The shortened lifestyle block (#11) is folded into the Problem story, straight after Sound familiar.",
          order: ["Hero + VSL + Apply + credibility (#1)", "Real clients. Documented results. (#3)", "Problem + the comparison (#4, #5)", "Sound familiar? (#6) + Outside the business, shortened (#11)", "Why conventional coaching fails + Business / Travel / Family / Access cards (#7, #8)", "Executive Physique Protocol™ (#9)", "I personally manage your transformation (#10)", "Riccardo + Oliver case studies (#12, #13)", "More results + testimonials", "About Cameron / Mr Australia", "Private. Personalised. Built around your life.", "After you apply", "FAQ", "Apply to Work With Cameron"] },
    24: { t: "Design rhythm", s: "done",
          ask: "Keep the colours and the cream reset. Don't use label → headline → paragraph → cards everywhere. Break it with galleries, larger photography, asymmetric desktop layouts, simpler text-led sections.",
          did: "Transformation galleries (top swipe strip + 9-client wall), larger photography (full-width Cameron & Ella banner), asymmetric desktop layouts (Sound familiar, Direct access, About and FAQ: headline left, content right), simpler text-led sections (lifestyle paragraph, final CTA), plus a second cream reset." },
    25: { t: "CTA frequency", s: "done",
          ask: "Keep the sticky Apply button. Fewer duplicate large Apply buttons. Main ones: hero, after major proof, near the engagement section, final CTA.",
          did: "Exactly those four kept; five others removed. The sticky button now hides while another Apply button is on screen." },
    26: { t: "Mobile header", s: "done",
          ask: "On mobile, the header should collapse/reduce slightly once the visitor scrolls.",
          did: "Done: smaller padding and logo, tagline hidden once scrolled. Test at phone width." },
    27: { t: "Animations", s: "done",
          ask: "Subtle and premium, roughly 200–400ms reveals. No scroll-jacking, big parallax, excessive zoom or long delays before content is readable.",
          did: "Reveals now ~0.4s with a small rise. Protocol diagram builds in ~1.3s instead of 7.6s. Scroll drift removed." },
    28: { t: "Overall editing principle", s: "done",
          ask: "Cut 20–30% if it's tighter. Remove repetition. Rewrite clever lines in plain English. Proof sells more, copy explains less.",
          did: "Repeated lines removed (marked in red where they were). Proof now appears in three places instead of one. 18 Oct: Access card and Direct Access item 06 removed (direct access is said in the Direct Access section, About and FAQ); case-studies intro line removed; Protocol diagram label now plain English. Anything Cameron wrote or asked to keep was left exactly as he wrote it." },
  };
  const STATUS = { done: "Done", check: "Done · check", needs: "Needs Cameron" };

  const css = (el, cls) => el.classList.add(cls);
  const make = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  document.body.classList.add("rv-on");
  document.querySelectorAll(".rv-removed").forEach((el) => (el.hidden = false));

  // Badges
  const targets = [...document.querySelectorAll("[data-edit]")];
  targets.forEach((el) => {
    const n = el.dataset.edit;
    css(el, "rv-target");
    if (getComputedStyle(el).position === "static") el.style.position = "relative";
    const b = make("button", `rv-badge rv-${EDITS[n].s}${el.dataset.editPos === "right" ? " rv-right" : ""}`, `#${n}`);
    b.type = "button";
    b.setAttribute("aria-label", `Edit ${n}: ${EDITS[n].t}`);
    b.addEventListener("click", (e) => { e.preventDefault(); e.stopPropagation(); openPop(el, b); });
    el.appendChild(b);
  });

  // Popover
  const pop = make("div", "rv-pop"); pop.hidden = true; document.body.appendChild(pop);
  const closePop = () => (pop.hidden = true);
  function openPop(el, badge) {
    const n = el.dataset.edit, ed = EDITS[n];
    pop.innerHTML = `
      <div class="rv-pop-head"><span class="rv-num">#${n}</span><b>${esc(ed.t)}</b><span class="rv-chip rv-${ed.s}">${STATUS[ed.s]}</span><button type="button" class="rv-x" aria-label="Close">×</button></div>
      ${el.dataset.note ? `<div class="rv-sec"><i>What changed here</i><p>${esc(el.dataset.note)}</p></div>` : ""}
      ${el.dataset.before ? `<div class="rv-sec rv-before"><i>Before</i><p>${esc(el.dataset.before)}</p></div>` : ""}
      <div class="rv-sec rv-ask"><i>Cameron asked (#${n})</i><p>${esc(ed.ask)}</p></div>`;
    pop.hidden = false;
    const r = badge.getBoundingClientRect(), w = Math.min(380, window.innerWidth - 24);
    pop.style.width = w + "px";
    let left = Math.min(Math.max(12, r.left), window.innerWidth - w - 12);
    let top = r.bottom + 8;
    pop.style.left = left + "px"; pop.style.top = top + "px";
    const ph = pop.getBoundingClientRect().height;
    if (top + ph > window.innerHeight - 12) pop.style.top = Math.max(12, r.top - ph - 8) + "px";
    pop.querySelector(".rv-x").addEventListener("click", closePop);
  }
  document.addEventListener("click", (e) => { if (!pop.hidden && !pop.contains(e.target)) closePop(); });
  window.addEventListener("scroll", closePop, { passive: true });
  document.addEventListener("keydown", (e) => e.key === "Escape" && closePop());

  // Panel
  const counts = Object.values(EDITS).reduce((a, e) => ((a[e.s] = (a[e.s] || 0) + 1), a), {});
  const panel = make("aside", "rv-panel");
  panel.innerHTML = `
    <div class="rv-bar">
      <button type="button" class="rv-open">Cameron's edits <b>28</b></button>
      <label class="rv-toggle"><input type="checkbox" checked id="rvShow" /> Markers</label>
    </div>
    <div class="rv-list" hidden>
      <div class="rv-list-head">
        <b>Website Edits · Cameron's numbers</b>
        <span><i class="rv-dot rv-done"></i>${counts.done || 0} done <i class="rv-dot rv-check"></i>${counts.check || 0} done, worth checking <i class="rv-dot rv-needs"></i>${counts.needs || 0} need something from Cameron</span>
        <small>Click a row to jump to it. Click any gold badge on the page for details. Red strips show what was removed.</small>
      </div>
      <ol>${Object.entries(EDITS).map(([n, e]) => `
        <li data-go="${n}"><span class="rv-num">#${n}</span><div><b>${esc(e.t)}</b><span class="rv-chip rv-${e.s}">${STATUS[e.s]}</span><p>${esc(e.did)}</p>${e.order ? `<ol class="rv-order">${e.order.map((o) => `<li>${esc(o)}</li>`).join("")}</ol>` : ""}</div></li>`).join("")}
      </ol>
    </div>`;
  document.body.appendChild(panel);
  const list = panel.querySelector(".rv-list");
  panel.querySelector(".rv-open").addEventListener("click", () => (list.hidden = !list.hidden));
  panel.querySelector("#rvShow").addEventListener("change", (e) => {
    const on = e.target.checked;
    document.body.classList.toggle("rv-on", on);
    document.querySelectorAll(".rv-removed").forEach((el) => (el.hidden = !on));
    closePop();
  });
  panel.querySelectorAll("li[data-go]").forEach((li) =>
    li.addEventListener("click", () => {
      const el = document.querySelector(`[data-edit="${li.dataset.go}"]`);
      if (!el) return;
      if (window.innerWidth < 760) list.hidden = true;
      // reveal-animated elements may still be invisible; force them in
      el.closest(".reveal") && el.closest(".reveal").classList.add("in");
      el.classList.add("in");
      const y = el.getBoundingClientRect().top + window.scrollY - 110;
      window.scrollTo({ top: Math.max(0, y), behavior: "instant" });
      document.querySelectorAll(`[data-edit="${li.dataset.go}"]`).forEach((t) => { t.classList.remove("rv-flash"); void t.offsetWidth; t.classList.add("rv-flash"); });
    })
  );
})();
