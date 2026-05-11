<template>
  <nav class="top" :class="{ scrolled }" id="topnav">
    <div class="row">
      <a href="#top" class="brand" aria-label="Génération West Dance">
        <img src="/logo.png" alt="GWD" class="mark" />
        <span class="lbl">
          Génération West Dance · présente
          <b>The Abrams</b>
        </span>
      </a>
      <div class="navlinks">
        <a href="#concert">Le Concert</a>
        <a href="#programme">Programme</a>
        <a href="#experience">Expérience</a>
        <a href="#gallery">Galerie</a>
        <a href="#billetterie">Billetterie</a>
      </div>
      <div class="nav-cta">
        <span class="nav-meta">17.10.2026 · La Gacilly</span>
        <a class="btn primary" href="https://www.helloasso.com/associations/generation-west-dance/evenements/the-abrams" target="_blank" rel="noopener">
          <span>Réserver</span><span class="arr">→</span>
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
defineEmits<{ 'open-modal': [] }>()

const scrolled = ref(false)

onMounted(() => {
  const onScroll = () => { scrolled.value = window.scrollY > 30 }
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
</script>

<style scoped>
nav.top {
  position: fixed; top: 0; left: 0; right: 0; z-index: 50;
  transition: background .4s ease, border-color .4s ease, backdrop-filter .4s ease;
  border-bottom: 1px solid transparent;
}
nav.top.scrolled {
  background: rgba(11,11,12,.78);
  backdrop-filter: blur(14px);
  border-bottom-color: var(--line);
}
nav.top:not(.scrolled) .brand .lbl { color: rgba(200,169,107,.7); }
nav.top:not(.scrolled) .brand .lbl b { color: #C8A96B; }
nav.top:not(.scrolled) .navlinks a { color: rgba(200,169,107,.7); }
nav.top:not(.scrolled) .navlinks a:hover { color: #C8A96B; }
nav.top:not(.scrolled) .navlinks a::after { background: #C8A96B; }
nav.top:not(.scrolled) .nav-meta { color: rgba(200,169,107,.65); }
nav.top:not(.scrolled) .nav-cta .btn.primary {
  background: #C8A96B; color: #0a0a0a; border-color: #C8A96B;
}
.row {
  display: flex; align-items: center; justify-content: space-between;
  padding: 18px var(--pad);
}
.brand { display: flex; align-items: center; gap: 14px; }
.brand .mark {
  width: 38px; height: 38px; object-fit: contain; display: block;
}
.brand .lbl {
  font-family: var(--f-mono); font-size: 10px; letter-spacing: .3em;
  text-transform: uppercase; color: var(--ivory-d);
}
.brand .lbl b {
  display: block; font-family: var(--f-display); font-weight: 400;
  font-size: 18px; letter-spacing: .18em; color: var(--ivory);
}
.navlinks { display: flex; gap: 34px; }
.navlinks a {
  font-family: var(--f-mono); font-size: 11px; letter-spacing: .28em;
  text-transform: uppercase; color: var(--ivory-d);
  position: relative; padding: 6px 0; transition: color .3s;
}
.navlinks a::after {
  content: ""; position: absolute; left: 0; right: 100%; bottom: 0;
  height: 1px; background: var(--gold); transition: right .35s ease;
}
.navlinks a:hover { color: var(--ivory); }
.navlinks a:hover::after { right: 0; }
.nav-cta { display: flex; align-items: center; gap: 18px; }
.nav-meta {
  font-family: var(--f-mono); font-size: 10px; letter-spacing: .28em;
  color: var(--gold); text-transform: uppercase;
}
@media (max-width: 880px) {
  .navlinks { display: none; }
  .nav-meta { display: none; }
}
</style>
