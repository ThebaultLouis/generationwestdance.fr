<template>
  <footer>
    <div class="wrap">
      <div class="foot-mark">The Abrams · 17.10.26</div>

      <div class="foot-grid">
        <div>
          <h5>Génération West Dance</h5>
          <p>Association country & western dance · Morbihan. Organisateur de la soirée Concert Live The Abrams 2026.</p>
          <p class="site-link">theabramsmusic.com</p>
        </div>
        <div>
          <h5>Lieu</h5>
          <a href="https://maps.app.goo.gl/XWJhq49WoYnBWQr37" target="_blank" rel="noopener">Espace Artémisia</a>
          <a href="https://maps.app.goo.gl/XWJhq49WoYnBWQr37" target="_blank" rel="noopener">5 rue des Archers</a>
          <a href="https://maps.app.goo.gl/XWJhq49WoYnBWQr37" target="_blank" rel="noopener">56200 La Gacilly</a>
          <a href="https://maps.app.goo.gl/XWJhq49WoYnBWQr37" target="_blank" rel="noopener">Morbihan · France</a>
        </div>
        <div>
          <h5>Contact</h5>
          <a href="mailto:generationwestdance@gmail.com">generationwestdance<br/>@gmail.com</a>
          <a href="tel:0676211368">+33 6 76 21 13 68</a>
        </div>
        <div>
          <h5>Suivre</h5>
          <a href="https://www.instagram.com/generationwestdance/" target="_blank" rel="noopener">Instagram</a>
          <a href="https://www.facebook.com/profile.php?id=61585757857070" target="_blank" rel="noopener">Facebook</a>
          <a href="https://www.helloasso.com/associations/generation-west-dance" target="_blank" rel="noopener">HelloAsso</a>
        </div>
      </div>

      <div class="foot-bar">
        <span>© 2026 GWD · Tous droits réservés</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  padding: 120px 0 40px; border-top: 1px solid var(--line);
  background: #08080A; position: relative; overflow: hidden;
}
footer::before {
  content: ""; position: absolute; inset: 0;
  background: radial-gradient(80% 50% at 50% 0%, rgba(200,169,107,.05), transparent 60%);
  pointer-events: none;
}
.foot-mark {
  font-family: var(--f-display);
  font-size: clamp(80px, 16vw, 220px);
  line-height: .85; color: transparent;
  -webkit-text-stroke: 1px var(--line-2);
  letter-spacing: .02em; margin: 0 0 60px;
}
.foot-grid {
  display: grid; grid-template-columns: 1.4fr 1fr 1fr 1fr;
  gap: 60px; margin-bottom: 80px;
}
.foot-grid h5 {
  font-family: var(--f-mono); font-size: 10px; letter-spacing: .32em;
  color: var(--gold); text-transform: uppercase; margin: 0 0 18px;
}
.foot-grid p, .foot-grid a {
  color: var(--ivory-d); font-size: 14px; line-height: 1.7; display: block;
}
.foot-grid a:hover { color: var(--gold); }
.site-link {
  margin-top: 14px; color: var(--gold) !important;
  font-family: var(--f-serif); font-style: italic;
}
.foot-bar {
  display: flex; justify-content: space-between;
  padding-top: 24px; border-top: 1px solid var(--line);
  font-family: var(--f-mono); font-size: 10px; letter-spacing: .28em;
  color: var(--mute); text-transform: uppercase; flex-wrap: wrap; gap: 16px;
}
@media (max-width: 880px) { .foot-grid { grid-template-columns: 1fr 1fr; } }
</style>
