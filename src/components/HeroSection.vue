<template>
  <header class="hero stage" id="top">
    <div class="hero-stage" aria-hidden="true"></div>

    <div class="beams" aria-hidden="true">
      <div class="beam b1"></div>
      <div class="beam b2"></div>
      <div class="beam b3"></div>
      <div class="beam b4"></div>
      <div class="beam b5"></div>
    </div>
    <div class="hero-bloom" aria-hidden="true"></div>
    <div class="hero-floor" aria-hidden="true"></div>

    <div class="hero-band-slot" aria-hidden="false">
      <span class="corner c1"></span><span class="corner c2"></span>
      <span class="corner c3"></span><span class="corner c4"></span>
      <img src="/photos/hero-band.jpg" alt="The Abrams · Live" class="band-photo" />
    </div>

    <div class="wrap hero-grid">
      <div class="hero-eyebrow-row">
        <span class="eyebrow">Génération West Dance · Présente</span>
        <span class="right">L'Exceptionnel Duo Canadien — Concert Unique en France</span>
      </div>

      <div data-reveal>
        <h1 class="title">The<br/>Abrams</h1>
        <p class="strap">
          Une journée. Un duo canadien d'exception.
          <span class="gold-label">Le Nashville moderne</span>
          sur la scène de l'Espace Artémisia.
        </p>
        <div class="ctas">
          <a class="btn primary" href="https://www.helloasso.com/associations/generation-west-dance/evenements/the-abrams" target="_blank" rel="noopener">
            <span>Réserver maintenant</span><span class="arr">→</span>
          </a>
          <a class="btn ghost" href="#programme"><span>Découvrir le programme</span><span class="arr">↓</span></a>
        </div>
      </div>

      <div class="date-stamp" data-reveal>
        <div class="d">17</div>
        <div class="m">Oct</div>
        <div class="y">2026</div>
        <div class="h">21H00</div>
      </div>

      <div class="hero-meta">
        <div class="meta-cell">
          <div class="k">Date</div>
          <div class="v">Sam · 17.10<small>Concert · 21h00</small></div>
        </div>
        <div class="meta-cell">
          <div class="k">Lieu</div>
          <div class="v">La Gacilly<small>Espace Artémisia · Bretagne</small></div>
        </div>
        <div class="meta-cell">
          <div class="k">Format</div>
          <div class="v">Live + Bal<small>Workshop · Country · Concert</small></div>
        </div>
        <div class="meta-cell">
          <div class="k">Origine</div>
          <div class="v">Canada<small>Ontario · Nashville sound</small></div>
        </div>
      </div>
    </div>

  </header>
</template>

<script setup lang="ts">
defineEmits<{ 'open-modal': [] }>()
</script>

<style scoped>
.hero {
  min-height: 100vh; display: grid; align-items: end;
  padding-top: 120px; padding-bottom: 80px; position: relative;
}
.hero-grid {
  display: grid; grid-template-columns: 1fr auto; gap: 60px;
  align-items: end; position: relative; z-index: 3;
}
.hero-eyebrow-row {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 42px;
  border-top: 1px solid rgba(90,63,26,.35); padding-top: 18px;
  grid-column: 1 / -1;
}
.hero-eyebrow-row .right {
  font-family: var(--f-mono); font-size: 11px; letter-spacing: .28em;
  color: #6B4A1F; text-transform: uppercase;
}
.eyebrow { color: #5A3F1A; }
.eyebrow::before { background: #5A3F1A; }

h1.title {
  font-family: var(--f-display);
  font-size: clamp(80px, 16vw, 248px);
  line-height: .82; letter-spacing: -.005em; margin: 0;
  text-shadow: 0 20px 60px rgba(120,80,30,.25);
  background: linear-gradient(180deg, #3A2812 0%, #6B4A1F 50%, #2A1B0A 100%);
  -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
}
.strap {
  font-family: var(--f-serif); font-style: italic;
  font-size: clamp(22px, 2.2vw, 30px);
  color: #6B4A1F; margin-top: 18px; max-width: 560px; font-weight: 400;
}
.gold-label {
  font-style: normal; font-family: var(--f-display);
  letter-spacing: .04em; font-size: .9em; color: #5A3F1A;
}

.ctas { display: flex; gap: 14px; margin-top: 36px; flex-wrap: wrap; }
.btn { color: #6B4A1F; --b: #5A3F1A; }
.btn:hover { color: #F2E6CA; }
.btn::before { background: #3A2812; }
.btn.primary { background: #3A2812; color: #F2E6CA; border-color: #3A2812; }
.btn.primary::before { background: #F2E6CA; }
.btn.primary:hover { color: #3A2812; }

.date-stamp {
  border: 1px solid #5A3F1A; padding: 18px 24px 22px; text-align: center;
  background: linear-gradient(180deg, rgba(255,255,255,.25), rgba(255,255,255,.05));
  backdrop-filter: blur(2px); min-width: 140px;
}
.date-stamp .d { font-family: var(--f-display); font-size: 64px; line-height: 1; color: #3A2812; letter-spacing: .02em; }
.date-stamp .m { font-family: var(--f-display); font-size: 22px; letter-spacing: .3em; color: #6B4A1F; margin-top: 2px; }
.date-stamp .y {
  font-family: var(--f-mono); font-size: 11px; letter-spacing: .28em; color: #6B4A1F;
  margin-top: 10px; padding-top: 10px; border-top: 1px solid rgba(90,63,26,.35);
}
.date-stamp .h { font-family: var(--f-display); font-size: 28px; color: #5A3F1A; margin-top: 6px; letter-spacing: .06em; }

.hero-meta {
  grid-column: 1 / -1;
  display: grid; grid-template-columns: repeat(4, minmax(0,1fr));
  gap: 0; margin-top: 64px; border-top: 1px solid rgba(90,63,26,.35);
}
.meta-cell { padding: 24px 28px; border-right: 1px solid rgba(90,63,26,.35); }
.meta-cell:last-child { border-right: 0; }
.meta-cell .k {
  font-family: var(--f-mono); font-size: 10px; letter-spacing: .32em;
  text-transform: uppercase; color: #5A3F1A; margin-bottom: 10px;
}
.meta-cell .v {
  font-family: var(--f-display); font-size: 30px; letter-spacing: .04em;
  color: #6B4A1F; line-height: 1.05;
}
.meta-cell .v small {
  display: block; font-family: var(--f-serif); font-size: 13px;
  color: #5A3F1A; letter-spacing: .04em; margin-top: 6px;
  font-style: italic; text-transform: none; font-weight: 400;
}

.hero-band-slot {
  position: absolute; right: 6%; top: 18%; width: 46%; max-width: 720px; height: 62vh; z-index: 2;
  border: 1px solid rgba(90,63,26,.35);
  box-shadow: 0 60px 120px rgba(0,0,0,.7), inset 0 0 0 1px rgba(0,0,0,.3);
  overflow: hidden;
}
.hero-band-slot::after {
  content: ""; position: absolute; inset: 0; pointer-events: none;
  background:
    linear-gradient(180deg, transparent 50%, rgba(40,28,12,.35) 100%),
    radial-gradient(60% 40% at 50% 0%, transparent, rgba(40,28,12,.15));
}
.corner { position: absolute; width: 18px; height: 18px; border: 1px solid #5A3F1A; }
.c1 { top: -1px; left: -1px; border-right: 0; border-bottom: 0; }
.c2 { top: -1px; right: -1px; border-left: 0; border-bottom: 0; }
.c3 { bottom: -1px; left: -1px; border-right: 0; border-top: 0; }
.c4 { bottom: -1px; right: -1px; border-left: 0; border-top: 0; }

.band-photo { width: 100%; height: 100%; object-fit: cover; display: block; }

.scroll-cue {
  position: absolute; left: var(--pad); bottom: 24px; z-index: 5;
  display: flex; align-items: center; gap: 14px;
  font-family: var(--f-mono); font-size: 10px; letter-spacing: .32em;
  text-transform: uppercase; color: #5A3F1A;
}
.scroll-cue .line {
  width: 46px; height: 1px; background: #5A3F1A; position: relative; overflow: hidden;
}
.scroll-cue .line::after {
  content: ""; position: absolute; inset: 0; background: #F2E6CA;
  animation: cue 2.4s ease-in-out infinite;
}

@media (max-width: 1080px) {
  .hero-band-slot { position: relative; width: 100%; height: 50vh; right: auto; top: auto; margin-top: 40px; }
  .hero-meta { grid-template-columns: repeat(2, minmax(0,1fr)); }
  .meta-cell:nth-child(2n) { border-right: 0; }
  .meta-cell:nth-child(-n+2) { border-bottom: 1px solid rgba(90,63,26,.35); }
}
</style>
