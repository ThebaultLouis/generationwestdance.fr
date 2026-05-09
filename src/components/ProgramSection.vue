<template>
  <section class="block program stage" id="programme">
    <div class="spotlights" aria-hidden="true">
      <div class="spotlight s1"></div>
      <div class="spotlight s2"></div>
      <div class="spotlight s3"></div>
    </div>
    <div class="floor" aria-hidden="true"></div>

    <div class="wrap">
      <div class="section-head" data-reveal>
        <div>
          <span class="eyebrow">Programme · 02</span>
        </div>
        <div>
          <h2>Une journée<br/><em>en deux temps.</em></h2>
          <p class="lede">
            Workshop, bal country, food truck, et pour clore la soirée, le concert événement.
            Chaque moment pensé pour la communauté country française.
          </p>
        </div>
      </div>

      <div class="timeline" data-reveal>
        <div class="tl-row">
          <div class="time">09:15</div>
          <div class="body">
            <h4>Accueil</h4>
            <div class="sub"><a href="https://maps.app.goo.gl/XWJhq49WoYnBWQr37" target="_blank" rel="noopener" class="venue-link">Espace Artémisia · 5 rue des Archers</a></div>
            <p>Ouverture des portes, retrait des bracelets, café bienvenue. Marché d'artisans country installé sur l'esplanade.</p>
          </div>
        </div>
        <div class="tl-row">
          <div class="time">10:00</div>
          <div class="body">
            <h4>Workshop · Séverine Fillion &amp; Chrystel Durand</h4>
            <div class="sub">Deux heures · Tous niveaux</div>
            <p>Atelier de danse country en ligne par deux figures reconnues de la scène française. Inscription incluse dans le pass journée.</p>
          </div>
        </div>
        <div class="tl-row">
          <div class="time">12:00</div>
          <div class="body">
            <h4>Bal Country</h4>
            <div class="sub">Huit heures non-stop · Food truck sur place</div>
            <p>Scène DJ et danseurs sur le parquet. Le grand bal de la communauté GWD, ouvert à tous, avec restauration américaine et bar.</p>
          </div>
        </div>
        <div class="tl-row featured">
          <div class="time">21:00</div>
          <div class="body">
            <span class="badge">Tête d'affiche</span>
            <h4>The Abrams · Concert Live</h4>
            <div class="sub">Quatre-vingt-dix minutes · Set complet · Rappel</div>
            <p>L'événement de la soirée. Concert en configuration assise/debout, son spatialisé, lumière cinéma. Une seule date française en 2026.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.timeline {
  display: grid; grid-template-columns: 200px 1fr;
  gap: 0; border-top: 1px solid var(--line);
}
.tl-row { display: contents; }
.tl-row .time, .tl-row .body {
  padding: 36px 0; border-bottom: 1px solid var(--line); transition: .4s ease;
}
.tl-row .time {
  font-family: var(--f-display); font-size: 36px; color: var(--gold);
  letter-spacing: .04em; padding-right: 30px; display: flex; align-items: flex-start;
}
.tl-row .body {
  padding-left: 30px; border-left: 1px solid var(--line); position: relative;
}
.tl-row .body::before {
  content: ""; position: absolute; left: -5px; top: 46px;
  width: 9px; height: 9px; background: var(--bg);
  border: 1px solid var(--gold); border-radius: 50%; transition: .4s;
}
.tl-row:hover .body::before { background: var(--gold); box-shadow: 0 0 0 4px rgba(200,169,107,.18); }
.tl-row .body h4 {
  font-family: var(--f-display); font-size: 30px; color: var(--ivory);
  margin: 0 0 6px; letter-spacing: .04em;
}
.venue-link { color: inherit; text-decoration: underline; text-underline-offset: 3px; opacity: .75; }
.venue-link:hover { opacity: 1; }
.tl-row .body .sub {
  font-family: var(--f-serif); font-style: italic; color: var(--gold);
  font-size: 18px; margin-bottom: 10px;
}
.tl-row .body p { color: var(--ivory-d); max-width: 680px; font-size: 15px; margin: 0; }

.tl-row.featured .time { color: var(--ivory); }
.tl-row.featured .body {
  background: linear-gradient(180deg, rgba(200,169,107,.04), transparent 60%);
}
.tl-row.featured .body h4 { color: var(--gold); font-size: 48px; }
.tl-row.featured .badge {
  display: inline-block;
  font-family: var(--f-mono); font-size: 10px; letter-spacing: .32em; text-transform: uppercase;
  color: #0B0B0C; background: var(--gold); padding: 6px 12px; margin-bottom: 12px;
}

@media (max-width: 720px) {
  .timeline { grid-template-columns: 1fr; }
  .tl-row .time { padding-right: 0; border-bottom: 0; padding-bottom: 0; font-size: 28px; }
  .tl-row .body { border-left: 0; padding-left: 0; padding-top: 8px; }
  .tl-row .body::before { display: none; }
}
</style>
