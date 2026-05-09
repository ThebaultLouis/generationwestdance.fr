<template>
  <section class="block stage" id="experience">
    <div class="wrap">
      <div class="section-head" data-reveal>
        <div><span class="eyebrow">L'Expérience · 03</span></div>
        <div>
          <h2>Plus qu'un concert.<br/><em>Une soirée country.</em></h2>
          <p class="lede">
            Une atmosphère pensée comme une vraie nuit Nashville. Communauté, danse, bonne cuisine,
            et l'émotion d'un live unique, du matin jusqu'à minuit passé.
          </p>
        </div>
      </div>

      <div class="exp-grid" data-reveal>
        <div class="exp">
          <div class="num">01</div>
          <h4>Live<em>music</em></h4>
          <p>Deux frères et trois musiciens, un groupe de tournée internationale repéré sur les scènes du Grand Ole Opry et de la CMA. Une seule fois, ici.</p>
          <div class="ic">
            <svg viewBox="0 0 24 24"><path d="M9 18V6l9-2v12"/><circle cx="6" cy="18" r="3"/><circle cx="15" cy="16" r="3"/></svg>
          </div>
        </div>
        <div class="exp">
          <div class="num">02</div>
          <h4>Bal<em>country</em></h4>
          <p>Huit heures de danse en ligne et partner work, animées par les références de la scène GWD. DJ set, parquet, ambiance club.</p>
          <div class="ic">
            <svg viewBox="0 0 24 24"><path d="M5 20l4-12 3 6 3-4 4 10"/><circle cx="9" cy="6" r="2"/></svg>
          </div>
        </div>
        <div class="exp">
          <div class="num">03</div>
          <h4>Food<em>truck</em></h4>
          <p>Cuisine américaine de tournée : pulled pork lent, mac &amp; cheese, bourbon vanille. Bar bières craft + cocktails signature.</p>
          <div class="ic">
            <svg viewBox="0 0 24 24"><rect x="2" y="9" width="14" height="8" rx="1"/><path d="M16 11h4l2 3v3h-6"/><circle cx="6" cy="19" r="2"/><circle cx="18" cy="19" r="2"/></svg>
          </div>
        </div>
        <div class="exp">
          <div class="num">04</div>
          <h4>Une<em>communauté</em></h4>
          <p>Trois cents danseurs, des familles, des passionnés venus de toute la Bretagne. La grande nuit annuelle de Génération West Dance.</p>
          <div class="ic">
            <svg viewBox="0 0 24 24"><circle cx="9" cy="9" r="3"/><circle cx="17" cy="10" r="2.5"/><path d="M3 20a6 6 0 0112 0M14 20a5 5 0 018 0"/></svg>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.exp-grid {
  display: grid; grid-template-columns: repeat(4,1fr);
  gap: 1px; background: var(--line); border: 1px solid var(--line);
}
.exp {
  background: var(--bg); padding: 38px 30px;
  display: flex; flex-direction: column; gap: 18px; min-height: 340px;
  position: relative; transition: background .5s ease;
}
.exp:hover { background: var(--bg-2); }
.exp .num { font-family: var(--f-mono); font-size: 11px; letter-spacing: .32em; color: var(--gold); }
.exp h4 {
  font-family: var(--f-display); font-size: 34px; color: var(--ivory);
  margin: 0; letter-spacing: .04em; line-height: 1;
}
.exp h4 em {
  font-family: var(--f-serif); font-style: italic; text-transform: none;
  color: var(--gold); font-size: .85em; letter-spacing: 0; display: block; margin-top: 6px;
}
.exp p { color: var(--ivory-d); font-size: 14px; margin: 0; line-height: 1.6; }
.exp .ic {
  width: 42px; height: 42px; border: 1px solid var(--gold);
  display: grid; place-items: center; color: var(--gold); margin-top: auto;
}
.exp .ic svg { width: 20px; height: 20px; stroke: currentColor; fill: none; stroke-width: 1.4; }

@media (max-width: 1080px) { .exp-grid { grid-template-columns: repeat(2,1fr); } }
@media (max-width: 560px) { .exp-grid { grid-template-columns: 1fr; } }
</style>
