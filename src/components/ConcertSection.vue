<template>
  <section class="block stage" id="concert">
    <div class="spotlights" aria-hidden="true">
      <div class="spotlight s1"></div>
      <div class="spotlight s2"></div>
      <div class="spotlight s3"></div>
    </div>
    <div class="smoke" aria-hidden="true">
      <svg viewBox="0 0 1400 900" preserveAspectRatio="xMidYMid slice">
        <rect width="1400" height="900" fill="url(#smoke-fill)"/>
      </svg>
    </div>
    <div class="floor" aria-hidden="true"></div>

    <div class="wrap">
      <div class="section-head" data-reveal>
        <div>
          <span class="eyebrow">Le Concert · 01</span>
        </div>
        <div>
          <h2>Un duo Canadien d'exception<br/><em>qui maîtrise la musique country.</em></h2>
          <p class="lede">
            Un duo Canadien d'exception qui maîtrise la musique country traditionnelle et la musique country pop contemporaine.
            Des artistes dont l'écriture marie l'âme du country de la musique country pop moderne à la rigueur de la musique country traditionnelle.
          </p>
        </div>
      </div>

      <div class="about-grid">
        <div class="about-imgs" data-reveal>
          <span class="tag">Live · Tour 2026</span>
          <div class="slot-a">
            <img src="/photos/concert-stage-wide.jpg" alt="The Abrams · Stage" class="slot-img" />
          </div>
          <div class="slot-b">
            <img src="/photos/concert-portrait-duo.jpg" alt="The Abrams · Portrait" class="slot-img" />
          </div>
        </div>

        <div class="about-text" data-reveal>
          <span class="eyebrow">Touring artist · 2026</span>
          <h3>
            Un son <span class="gold">façonné à Nashville</span>,
            une émotion <em>de l'autre côté de l'océan</em>.
          </h3>
          <p>
            Sur scène, les deux frères Abrams et leurs trois musiciens livrent un set acoustique-électrique qui passe de la ballade intime
            au crescendo nerveux du violon, l'écriture précise, le grain humain, l'énergie d'un vrai duo de tournée.
          </p>
          <p>
            Pour cette unique date 2026 en France, ils investiront la grande scène de l'Espace Artémisia
            avec un dispositif scénique pensé pour le live : son spatialisé, lumière cinéma, public au plus près.
          </p>
          <div class="about-stats">
            <div class="s"><div class="n">05</div><div class="l">Musiciens</div></div>
            <div class="s"><div class="n">90'</div><div class="l">Set live</div></div>
            <div class="s"><div class="n">01</div><div class="l">Date France</div></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-grid { display: grid; grid-template-columns: 1.05fr 1fr; gap: 80px; align-items: center; }
.about-imgs { position: relative; height: 680px; }
.about-imgs .slot-a {
  position: absolute; inset: 0 30% 18% 0;
  border: 1px solid var(--line); overflow: hidden;
}
.about-imgs .slot-b {
  position: absolute; width: 55%; aspect-ratio: 3/4; right: 0; bottom: 0;
  border: 1px solid var(--gold); box-shadow: 0 40px 80px rgba(0,0,0,.7);
  overflow: hidden;
}
.slot-img { width: 100%; height: 100%; object-fit: cover; display: block; }
.about-imgs .tag {
  position: absolute; left: -20px; top: 30px;
  writing-mode: vertical-rl; transform: rotate(180deg);
  font-family: var(--f-mono); font-size: 10px; letter-spacing: .4em;
  color: var(--gold); text-transform: uppercase;
}
.about-text h3 {
  font-family: var(--f-serif); font-style: italic; font-size: 32px;
  color: var(--ivory); font-weight: 400; margin: 24px 0; line-height: 1.25;
}
.about-text h3 .gold { font-style: normal; font-family: var(--f-display); letter-spacing: .04em; font-weight: 400; }
.about-text p { color: var(--ivory-d); font-size: 16px; max-width: 520px; margin: 0 0 18px; }
.about-stats {
  display: grid; grid-template-columns: repeat(3,1fr); gap: 0;
  margin-top: 40px; border-top: 1px solid var(--line);
}
.about-stats .s { padding: 20px 0; border-right: 1px solid var(--line); }
.about-stats .s:last-child { border-right: 0; }
.about-stats .n { font-family: var(--f-display); font-size: 42px; color: var(--gold); line-height: 1; }
.about-stats .l {
  font-family: var(--f-mono); font-size: 10px; letter-spacing: .28em;
  color: var(--ivory-d); text-transform: uppercase; margin-top: 6px;
}
@media (max-width: 980px) {
  .about-grid { grid-template-columns: 1fr; gap: 40px; }
  .about-imgs { height: 520px; }
}
@media (max-width: 600px) {
  .about-imgs { height: 320px; }
  .about-imgs .tag { display: none; }
  .about-text h3 { font-size: 24px; }
  .about-stats .n { font-size: 32px; }
}
</style>
