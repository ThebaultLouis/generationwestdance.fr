<template>
  <div>
    <!-- Shared SVG defs (smoke filter) -->
    <svg width="0" height="0" style="position:absolute" aria-hidden="true">
      <defs>
        <filter id="smoke-noise" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.02" numOctaves="2" seed="3">
            <animate attributeName="baseFrequency" dur="38s" values="0.012 0.02;0.018 0.026;0.012 0.02" repeatCount="indefinite"/>
          </feTurbulence>
          <feColorMatrix values="0 0 0 0 0.78
                                 0 0 0 0 0.66
                                 0 0 0 0 0.42
                                 0 0 0 0.6 0"/>
        </filter>
        <pattern id="smoke-fill" x="0" y="0" width="100%" height="100%" patternUnits="userSpaceOnUse">
          <rect width="100%" height="100%" filter="url(#smoke-noise)" opacity="0.4"/>
        </pattern>
      </defs>
    </svg>

    <AppNav @open-modal="modalOpen = true" />
    <HeroSection @open-modal="modalOpen = true" />
    <EmotionalSection />
    <ConcertSection />
    <ProgramSection />
    <ExperienceSection />
    <GallerySection />
    <TicketsSection @open-modal="modalOpen = true" />
    <PartnersSection />
    <AppFooter />
    <ReservationModal v-model="modalOpen" />
  </div>
</template>

<script setup lang="ts">
const modalOpen = ref(false)

onMounted(() => {
  const reveals = document.querySelectorAll('[data-reveal]')
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target) }
    })
  }, { threshold: 0, rootMargin: '0px 0px -8% 0px' })
  reveals.forEach(el => io.observe(el))
  setTimeout(() => reveals.forEach(el => el.classList.add('in')), 2500)
})
</script>
