<template>
  <section class="block stage" id="billetterie">
    <div class="wrap">
      <div class="tickets" data-reveal>

        <div class="tickets-top">
          <span class="eyebrow">Billetterie · 05</span>
          <h3>Réservez<br/><em>votre soirée.</em></h3>
        </div>

        <div class="tickets-rule"></div>

        <div class="tickets-bottom">
          <div class="tickets-details">
            <p>Réservation sécurisée via HelloAsso. Paiement en ligne. E-billet émis instantanément.</p>
            <p class="rare">Ce genre de moment n'arrive pas souvent.</p>
            <div class="urgency">
              <span class="dot"></span>
              <span>Concert unique en France · Places limitées</span>
            </div>
          </div>

          <div class="tickets-action">
            <a
              class="btn primary"
              href="https://www.helloasso.com/associations/generation-west-dance/evenements/the-abrams"
              target="_blank"
              rel="noopener"
            >
              <span>Réserver maintenant</span><span class="arr">→</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.tickets {
  position: relative;
  border: 1px solid var(--line-2);
  background:
    radial-gradient(80% 60% at 50% 0%, rgba(200,169,107,.08), transparent 60%),
    linear-gradient(180deg, var(--bg-2), var(--bg));
  padding: 80px clamp(28px, 5vw, 80px);
}

.tickets-top { margin-bottom: 48px; }

.tickets h3 {
  font-family: var(--f-display);
  font-size: clamp(64px, 10vw, 140px);
  line-height: .88; margin: 16px 0 0; color: var(--ivory); letter-spacing: .005em;
}
.tickets h3 em {
  font-family: var(--f-serif); font-style: italic;
  color: var(--gold); text-transform: none; letter-spacing: 0;
}

.tickets-rule {
  height: 1px;
  background: linear-gradient(90deg, var(--line-2), transparent);
  margin-bottom: 48px;
}

.tickets-bottom {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 80px;
  align-items: center;
}

.tickets-details p { color: var(--ivory-d); max-width: 560px; margin: 0 0 12px; }
.rare {
  font-family: var(--f-serif); font-style: italic; font-size: 18px;
  color: var(--ivory); margin: 18px 0 0 !important;
}
.urgency {
  display: flex; align-items: center; gap: 14px;
  font-family: var(--f-mono); font-size: 10px; letter-spacing: .32em;
  color: var(--gold); text-transform: uppercase; margin-top: 16px;
}
.urgency .dot {
  width: 8px; height: 8px; border-radius: 50%; background: var(--gold);
  flex-shrink: 0; animation: pulse 2s infinite;
}

.tickets-action { flex-shrink: 0; }

@media (max-width: 720px) {
  .tickets-bottom { grid-template-columns: 1fr; gap: 36px; }
}
</style>
