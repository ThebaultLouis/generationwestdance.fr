<template>
  <Teleport to="body">
    <div
      class="modal-bk"
      :class="{ open: modelValue }"
      role="dialog"
      :aria-hidden="!modelValue"
      @click.self="$emit('update:modelValue', false)"
    >
      <div class="modal">
        <button class="modal-x" @click="$emit('update:modelValue', false)" aria-label="Fermer">✕</button>
        <span class="eyebrow">Billetterie · The Abrams</span>
        <h3>Réserver <em>votre soirée.</em></h3>
        <div class="sub">Samedi 17 octobre 2026 · <a href="https://maps.app.goo.gl/XWJhq49WoYnBWQr37" target="_blank" rel="noopener" class="venue-link">Espace Artémisia · La Gacilly</a></div>

        <div class="tier-list">
          <div
            v-for="tier in tiers"
            :key="tier.id"
            class="tier-row"
            :class="{ sel: tier.qty > 0 }"
            @click="tier.qty === 0 && setQty(tier, 1)"
          >
            <span class="rd"></span>
            <div class="tn">
              {{ tier.label }}
              <small>{{ tier.desc }}</small>
            </div>
            <div class="tp">{{ tier.price }}€</div>
            <div class="tq">
              <button @click.stop="setQty(tier, tier.qty - 1)">−</button>
              <input type="text" :value="tier.qty" readonly />
              <button @click.stop="setQty(tier, tier.qty + 1)">+</button>
            </div>
          </div>
        </div>

        <div class="modal-foot">
          <div class="total">
            Total<b>{{ total }}€</b>
          </div>
          <button class="btn primary">
            <span>Continuer sur HelloAsso</span><span class="arr">→</span>
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{ modelValue: boolean }>()
defineEmits<{ 'update:modelValue': [boolean] }>()

const tiers = reactive([
  { id: 1, label: 'Pass Concert', desc: '21h00 · The Abrams · Live',               price: 38, qty: 2 },
  { id: 2, label: 'Pass Journée', desc: 'Workshop + Bal + Concert',                 price: 58, qty: 0 },
  { id: 3, label: 'Pass Premium', desc: 'Journée complète + carré or + boisson',   price: 95, qty: 0 },
])

const total = computed(() => tiers.reduce((s, t) => s + t.price * t.qty, 0))

function setQty(tier: typeof tiers[0], v: number) {
  tier.qty = Math.max(0, Math.min(9, v))
}
</script>

<style scoped>
.modal-bk {
  position: fixed; inset: 0; background: rgba(0,0,0,.85);
  backdrop-filter: blur(10px); z-index: 200;
  display: none; align-items: center; justify-content: center; padding: 20px;
  opacity: 0; transition: opacity .3s ease;
}
.modal-bk.open { display: flex; opacity: 1; }
.modal {
  width: 100%; max-width: 780px; border: 1px solid var(--gold);
  background: var(--bg); padding: 48px; position: relative;
  box-shadow: 0 60px 120px rgba(0,0,0,.7);
  transform: translateY(20px); transition: transform .4s cubic-bezier(.2,.8,.2,1);
}
.modal-bk.open .modal { transform: translateY(0); }
.modal-x {
  position: absolute; top: 18px; right: 18px;
  width: 36px; height: 36px; border: 1px solid var(--line-2); background: transparent;
  color: var(--ivory); cursor: pointer; display: grid; place-items: center;
  font-family: var(--f-mono); font-size: 14px;
}
.modal-x:hover { border-color: var(--gold); color: var(--gold); }
.modal h3 {
  font-family: var(--f-display); font-size: 48px; color: var(--ivory);
  margin: 0 0 6px; letter-spacing: .02em;
}
.modal h3 em { font-family: var(--f-serif); font-style: italic; color: var(--gold); text-transform: none; letter-spacing: 0; }
.modal .sub { font-family: var(--f-serif); color: var(--ivory-d); font-style: italic; margin-bottom: 32px; font-size: 18px; }
.venue-link { color: inherit; text-decoration: underline; text-underline-offset: 3px; opacity: .75; }
.venue-link:hover { opacity: 1; }

.tier-list { display: grid; gap: 14px; margin-bottom: 24px; }
.tier-row {
  display: grid; grid-template-columns: auto 1fr auto auto; gap: 24px; align-items: center;
  padding: 20px 24px; border: 1px solid var(--line); background: var(--bg-2);
  cursor: pointer; transition: .3s;
}
.tier-row:hover, .tier-row.sel { border-color: var(--gold); background: rgba(200,169,107,.06); }
.tier-row .rd {
  width: 18px; height: 18px; border-radius: 50%; border: 1px solid var(--ivory-d);
  position: relative; flex-shrink: 0;
}
.tier-row.sel .rd { border-color: var(--gold); }
.tier-row.sel .rd::after { content: ""; position: absolute; inset: 4px; border-radius: 50%; background: var(--gold); }
.tier-row .tn {
  font-family: var(--f-display); font-size: 22px; color: var(--ivory);
  letter-spacing: .04em; line-height: 1.1;
}
.tier-row .tn small {
  display: block; font-family: var(--f-serif); font-style: italic; font-size: 13px;
  color: var(--ivory-d); text-transform: none; letter-spacing: 0; margin-top: 4px;
}
.tier-row .tp { font-family: var(--f-display); font-size: 28px; color: var(--gold); }
.tier-row .tq { display: flex; align-items: center; gap: 0; border: 1px solid var(--line); }
.tier-row .tq button {
  width: 32px; height: 32px; background: transparent; color: var(--ivory);
  border: 0; cursor: pointer; font-size: 18px;
}
.tier-row .tq button:hover { color: var(--gold); }
.tier-row .tq input {
  width: 36px; background: transparent; border: 0; color: var(--ivory);
  text-align: center; font-family: var(--f-display); font-size: 18px;
}

.modal-foot {
  display: flex; align-items: center; justify-content: space-between; gap: 24px;
  padding-top: 24px; margin-top: 8px; border-top: 1px solid var(--line); flex-wrap: wrap;
}
.modal-foot .total {
  font-family: var(--f-mono); font-size: 11px; letter-spacing: .32em;
  color: var(--gold); text-transform: uppercase;
}
.modal-foot .total b {
  font-family: var(--f-display); font-size: 48px; color: var(--ivory);
  display: block; margin-top: 4px; letter-spacing: .04em;
}
</style>
