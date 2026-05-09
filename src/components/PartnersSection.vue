<template>
  <section class="block stage" id="partners">
    <div class="wrap">
      <div class="section-head" data-reveal>
        <div><span class="eyebrow">Partenaires · 06</span></div>
        <div>
          <h2>Présenté <em>par.</em></h2>
          <p class="lede">
            L'événement est rendu possible grâce à la collaboration de six partenaires
            engagés dans la scène country française et canadienne.
          </p>
        </div>
      </div>

      <div class="partners" data-reveal>
        <component
          :is="p.url ? 'a' : 'div'"
          v-for="p in partners"
          :key="p.mark"
          class="partner"
          v-bind="p.url ? { href: p.url, target: '_blank', rel: 'noopener' } : {}"
        >
          <span class="pmark">{{ p.mark }}</span>
          <span class="pn">{{ p.name }}</span>
          <span class="pr">{{ p.role }}</span>
        </component>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const partners = [
  { mark: 'GWD', name: 'Génération West Dance', role: 'Organisateur · La Gacilly' },
{ mark: 'DML', name: 'DML Country Laillé',    role: 'Partenaire organisateur' },
  { mark: 'WR',  name: 'West Rennes',            role: 'Partenaire organisateur' },
  { mark: 'GC',  name: 'La Gacilly Country',     role: 'Partenaire local' },
  { mark: 'FRB', name: 'FRB Production',          role: 'Production scénique' },
  { mark: 'P&S', name: "Pickin' & Slidin'",       role: 'Production musicale' },
]
</script>

<style scoped>
.partners {
  display: grid; grid-template-columns: repeat(3, 1fr);
  border: 1px solid var(--line); background: var(--bg);
}
.partner {
  padding: 48px 24px; border-right: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 14px; min-height: 180px; text-align: center; transition: background .4s;
}
.partner:nth-child(3n) { border-right: 0; }
.partner:nth-child(n+4) { border-bottom: 0; }
.partner:hover { background: var(--bg-2); }
.partner .pmark {
  width: 64px; height: 64px; border: 1px solid var(--gold);
  display: grid; place-items: center;
  font-family: var(--f-display); color: var(--gold); font-size: 18px;
  letter-spacing: .06em; position: relative;
}
.partner .pmark::after { content: ""; position: absolute; inset: 4px; border: 1px solid rgba(200,169,107,.3); }
.partner .pn { font-family: var(--f-display); font-size: 18px; letter-spacing: .18em; color: var(--ivory); }
.partner .pr {
  font-family: var(--f-mono); font-size: 9px; letter-spacing: .32em;
  color: var(--mute); text-transform: uppercase;
}

@media (max-width: 880px) {
  .partners { grid-template-columns: repeat(2, 1fr); }
  .partner:nth-child(3n) { border-right: 1px solid var(--line); }
  .partner:nth-child(2n) { border-right: 0; }
  .partner:nth-child(n+4) { border-bottom: 1px solid var(--line); }
  .partner:nth-last-child(-n+2) { border-bottom: 0; }
}
@media (max-width: 480px) {
  .partners { grid-template-columns: 1fr; }
  .partner { border-right: 0 !important; border-bottom: 1px solid var(--line) !important; }
  .partner:last-child { border-bottom: 0 !important; }
}
</style>
