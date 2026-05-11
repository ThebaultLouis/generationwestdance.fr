<template>
  <section class="block stage" id="gallery">
    <div class="wrap">
      <div class="section-head" data-reveal>
        <div><span class="eyebrow">Galerie · 04</span></div>
        <div>
          <h2>Sous les <em>spots.</em></h2>
          <p class="lede">
            Une sélection visuelle inspirée de la tournée.
          </p>
        </div>
      </div>

      <div class="gallery" data-reveal>
        <div class="gcell g1">
          <img src="/photos/gallery-01-stage.jpg" alt="Stage" class="gcell-img" />
          <span class="cap">01 · Scène</span>
        </div>
        <div class="gcell g2">
          <img src="/photos/gallery-02-crowd.jpg" alt="Public" class="gcell-img" />
          <span class="cap">02 · Public</span>
        </div>
        <div class="gcell g3">
          <img src="/photos/gallery-03-detail.jpg" alt="Détail" class="gcell-img" />
          <span class="cap">03 · Détail</span>
        </div>
        <div class="gcell g4">
          <img src="/photos/gallery-04-backstage.jpg" alt="Coulisses" class="gcell-img" />
          <span class="cap">04 · Coulisses</span>
        </div>
        <div class="gcell g5">
          <img src="/photos/gallery-05-portrait.jpg" alt="Portrait" class="gcell-img" />
          <span class="cap">05 · Portrait</span>
        </div>
        <div class="gcell g6">
          <img src="/photos/gallery-06-encore.jpg" alt="Rappel" class="gcell-img" />
          <span class="cap">06 · Rappel</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.gallery {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: 90px;
  gap: 14px;
}
.gcell {
  position: relative;
  border: 1px solid var(--line);
  overflow: hidden;
}
.gcell-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; display: block; }
.gcell::after {
  content: ""; position: absolute; inset: 0;
  background: linear-gradient(180deg, transparent 50%, rgba(11,11,12,.7));
  pointer-events: none;
}
.gcell .cap {
  position: absolute; left: 14px; bottom: 12px;
  font-family: var(--f-mono); font-size: 10px; letter-spacing: .28em;
  color: var(--gold); text-transform: uppercase; z-index: 2;
}
.g1 { grid-column: span 5; grid-row: span 4; }
.g2 { grid-column: span 4; grid-row: span 3; }
.g3 { grid-column: span 3; grid-row: span 3; }
.g4 { grid-column: span 4; grid-row: span 3; }
.g5 { grid-column: span 3; grid-row: span 4; }
.g6 { grid-column: span 5; grid-row: span 3; }

@media (max-width: 880px) {
  .gallery { grid-template-columns: repeat(6,1fr); grid-auto-rows: 80px; }
  .g1, .g6 { grid-column: span 6; }
  .g2, .g3, .g4, .g5 { grid-column: span 3; }
}
@media (max-width: 480px) {
  .gallery { grid-auto-rows: 110px; }
  .g2, .g3, .g4, .g5 { grid-column: span 6; }
}
</style>
