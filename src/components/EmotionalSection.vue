<template>
  <section class="block emotional stage">
    <div class="spotlights" aria-hidden="true">
      <div class="spotlight s1"></div>
      <div class="spotlight s2"></div>
      <div class="spotlight s3"></div>
    </div>

    <div class="wrap">
      <div class="emotional-inner" data-reveal>
        <span class="eyebrow">L'Expérience · Vivez-le</span>
        <blockquote class="imagine">
          <p class="imagine-line">Imaginez…</p>
          <p class="imagine-body">
            Les bottes qui frappent le parquet.<br/>
            Les lumières qui montent.<br/>
            L'ambiance country qui prend vie toute la journée.<br/>
            <span class="gold-accent">Puis les premières notes des Abrams</span><br/>
            dans une salle plongée dans l'énergie du live…
          </p>
        </blockquote>
        <p class="emotional-coda">
          Certains événements s'oublient vite.<br/>
          D'autres deviennent des souvenirs dont on parle encore des années après.
        </p>
        <a class="btn ghost" href="#programme">
          <span>Découvrir le programme</span><span class="arr">↓</span>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.emotional {
  padding: 160px 0;
  background:
    radial-gradient(80% 50% at 50% 50%, rgba(200,169,107,.06), transparent 65%),
    linear-gradient(180deg, #0B0B0C, #111114 50%, #0B0B0C);
}
.emotional-inner {
  max-width: 860px;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 36px;
}
.imagine {
  margin: 0;
  padding: 0;
  border: none;
}
.imagine-line {
  font-family: var(--f-display);
  font-size: clamp(72px, 12vw, 160px);
  line-height: .88;
  color: var(--gold);
  margin: 0 0 24px;
  letter-spacing: .01em;
}
.imagine-body {
  font-family: var(--f-serif);
  font-style: italic;
  font-size: clamp(22px, 2.8vw, 38px);
  color: var(--ivory);
  line-height: 1.5;
  font-weight: 400;
  margin: 0;
}
.gold-accent {
  color: var(--gold);
  font-style: normal;
  font-family: var(--f-display);
  letter-spacing: .04em;
  font-size: .8em;
}
.emotional-coda {
  font-family: var(--f-serif);
  font-size: clamp(16px, 1.4vw, 20px);
  color: var(--ivory-d);
  font-style: italic;
  line-height: 1.65;
  margin: 0;
  padding-top: 24px;
  border-top: 1px solid var(--line);
  width: 100%;
}
</style>
