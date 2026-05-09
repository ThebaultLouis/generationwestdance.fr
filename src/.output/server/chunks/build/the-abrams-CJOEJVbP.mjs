import { defineComponent, ref, isRef, unref, mergeProps, createVNode, resolveDynamicComponent, withCtx, toDisplayString, reactive, computed, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrRenderVNode, ssrInterpolate, ssrRenderTeleport, ssrRenderClass } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import { p as publicAssetsURL } from '../nitro/nitro.mjs';
import 'vue-router';
import '@iconify/vue';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '@iconify/utils';
import 'consola';
import 'node:module';
import 'ipx';

const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "AppNav",
  __ssrInlineRender: true,
  emits: ["open-modal"],
  setup(__props) {
    const scrolled = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<nav${ssrRenderAttrs(mergeProps({
        class: ["top", { scrolled: unref(scrolled) }],
        id: "topnav"
      }, _attrs))} data-v-0ac26d16><div class="row" data-v-0ac26d16><a href="#top" class="brand" aria-label="G\xE9n\xE9ration West Dance" data-v-0ac26d16><span class="mark" data-v-0ac26d16>G</span><span class="lbl" data-v-0ac26d16> G\xE9n\xE9ration West Dance \xB7 pr\xE9sente <b data-v-0ac26d16>The Abrams</b></span></a><div class="navlinks" data-v-0ac26d16><a href="#concert" data-v-0ac26d16>Le Concert</a><a href="#programme" data-v-0ac26d16>Programme</a><a href="#experience" data-v-0ac26d16>Exp\xE9rience</a><a href="#gallery" data-v-0ac26d16>Galerie</a><a href="#billetterie" data-v-0ac26d16>Billetterie</a></div><div class="nav-cta" data-v-0ac26d16><span class="nav-meta" data-v-0ac26d16>17.10.2026 \xB7 La Gacilly</span><a class="btn primary" href="https://www.helloasso.com/associations/generation-west-dance/evenements/the-abrams" target="_blank" rel="noopener" data-v-0ac26d16><span data-v-0ac26d16>R\xE9server</span><span class="arr" data-v-0ac26d16>\u2192</span></a></div></div></nav>`);
    };
  }
});
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppNav.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-0ac26d16"]]);
const _imports_0$2 = publicAssetsURL("/photos/hero-band.jpg");
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "HeroSection",
  __ssrInlineRender: true,
  emits: ["open-modal"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<header${ssrRenderAttrs(mergeProps({
        class: "hero stage",
        id: "top"
      }, _attrs))} data-v-58e85fa1><div class="hero-stage" aria-hidden="true" data-v-58e85fa1></div><div class="beams" aria-hidden="true" data-v-58e85fa1><div class="beam b1" data-v-58e85fa1></div><div class="beam b2" data-v-58e85fa1></div><div class="beam b3" data-v-58e85fa1></div><div class="beam b4" data-v-58e85fa1></div><div class="beam b5" data-v-58e85fa1></div></div><div class="hero-bloom" aria-hidden="true" data-v-58e85fa1></div><div class="hero-floor" aria-hidden="true" data-v-58e85fa1></div><div class="hero-band-slot" aria-hidden="false" data-v-58e85fa1><span class="corner c1" data-v-58e85fa1></span><span class="corner c2" data-v-58e85fa1></span><span class="corner c3" data-v-58e85fa1></span><span class="corner c4" data-v-58e85fa1></span><img${ssrRenderAttr("src", _imports_0$2)} alt="The Abrams \xB7 Live" class="band-photo" data-v-58e85fa1></div><div class="wrap hero-grid" data-v-58e85fa1><div class="hero-eyebrow-row" data-v-58e85fa1><span class="eyebrow" data-v-58e85fa1>G\xE9n\xE9ration West Dance \xB7 Pr\xE9sente</span><span class="right" data-v-58e85fa1>L&#39;Exceptionnel Duo Canadien \u2014 Concert Unique en France</span></div><div data-reveal data-v-58e85fa1><h1 class="title" data-v-58e85fa1>The<br data-v-58e85fa1>Abrams</h1><p class="strap" data-v-58e85fa1> Une journ\xE9e. Un duo canadien d&#39;exception. <span class="gold-label" data-v-58e85fa1>Le Nashville moderne</span> sur la sc\xE8ne de l&#39;Espace Art\xE9misia. </p><div class="ctas" data-v-58e85fa1><a class="btn primary" href="https://www.helloasso.com/associations/generation-west-dance/evenements/the-abrams" target="_blank" rel="noopener" data-v-58e85fa1><span data-v-58e85fa1>R\xE9server maintenant</span><span class="arr" data-v-58e85fa1>\u2192</span></a><a class="btn ghost" href="#programme" data-v-58e85fa1><span data-v-58e85fa1>D\xE9couvrir le programme</span><span class="arr" data-v-58e85fa1>\u2193</span></a></div></div><div class="date-stamp" data-reveal data-v-58e85fa1><div class="d" data-v-58e85fa1>17</div><div class="m" data-v-58e85fa1>Oct</div><div class="y" data-v-58e85fa1>2026</div><div class="h" data-v-58e85fa1>21H00</div></div><div class="hero-meta" data-v-58e85fa1><div class="meta-cell" data-v-58e85fa1><div class="k" data-v-58e85fa1>Date</div><div class="v" data-v-58e85fa1>Sam \xB7 17.10<small data-v-58e85fa1>Concert \xB7 21h00</small></div></div><div class="meta-cell" data-v-58e85fa1><div class="k" data-v-58e85fa1>Lieu</div><div class="v" data-v-58e85fa1>La Gacilly<small data-v-58e85fa1>Espace Art\xE9misia \xB7 Bretagne</small></div></div><div class="meta-cell" data-v-58e85fa1><div class="k" data-v-58e85fa1>Format</div><div class="v" data-v-58e85fa1>Live + Bal<small data-v-58e85fa1>Workshop \xB7 Country \xB7 Concert</small></div></div><div class="meta-cell" data-v-58e85fa1><div class="k" data-v-58e85fa1>Origine</div><div class="v" data-v-58e85fa1>Canada<small data-v-58e85fa1>Ontario \xB7 Nashville sound</small></div></div></div></div></header>`);
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/HeroSection.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-58e85fa1"]]);
const _sfc_main$9 = {};
function _sfc_ssrRender$6(_ctx, _push, _parent, _attrs) {
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "block emotional stage" }, _attrs))} data-v-799500fc><div class="spotlights" aria-hidden="true" data-v-799500fc><div class="spotlight s1" data-v-799500fc></div><div class="spotlight s2" data-v-799500fc></div><div class="spotlight s3" data-v-799500fc></div></div><div class="wrap" data-v-799500fc><div class="emotional-inner" data-reveal data-v-799500fc><span class="eyebrow" data-v-799500fc>L&#39;Exp\xE9rience \xB7 Vivez-le</span><blockquote class="imagine" data-v-799500fc><p class="imagine-line" data-v-799500fc>Imaginez\u2026</p><p class="imagine-body" data-v-799500fc> Les bottes qui frappent le parquet.<br data-v-799500fc> Les lumi\xE8res qui montent.<br data-v-799500fc> L&#39;ambiance country qui prend vie toute la journ\xE9e.<br data-v-799500fc><span class="gold-accent" data-v-799500fc>Puis les premi\xE8res notes des Abrams</span><br data-v-799500fc> dans une salle plong\xE9e dans l&#39;\xE9nergie du live\u2026 </p></blockquote><p class="emotional-coda" data-v-799500fc> Certains \xE9v\xE9nements s&#39;oublient vite.<br data-v-799500fc> D&#39;autres deviennent des souvenirs dont on parle encore des ann\xE9es apr\xE8s. </p><a class="btn ghost" href="#programme" data-v-799500fc><span data-v-799500fc>D\xE9couvrir le programme</span><span class="arr" data-v-799500fc>\u2193</span></a></div></div></section>`);
}
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/EmotionalSection.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["ssrRender", _sfc_ssrRender$6], ["__scopeId", "data-v-799500fc"]]);
const _imports_0$1 = publicAssetsURL("/photos/concert-stage-wide.jpg");
const _imports_1$1 = publicAssetsURL("/photos/concert-portrait-duo.jpg");
const _sfc_main$8 = {};
function _sfc_ssrRender$5(_ctx, _push, _parent, _attrs) {
  _push(`<section${ssrRenderAttrs(mergeProps({
    class: "block stage",
    id: "concert"
  }, _attrs))} data-v-e43d8d88><div class="spotlights" aria-hidden="true" data-v-e43d8d88><div class="spotlight s1" data-v-e43d8d88></div><div class="spotlight s2" data-v-e43d8d88></div><div class="spotlight s3" data-v-e43d8d88></div></div><div class="smoke" aria-hidden="true" data-v-e43d8d88><svg viewBox="0 0 1400 900" preserveAspectRatio="xMidYMid slice" data-v-e43d8d88><rect width="1400" height="900" fill="url(#smoke-fill)" data-v-e43d8d88></rect></svg></div><div class="floor" aria-hidden="true" data-v-e43d8d88></div><div class="wrap" data-v-e43d8d88><div class="section-head" data-reveal data-v-e43d8d88><div data-v-e43d8d88><span class="eyebrow" data-v-e43d8d88>Le Concert \xB7 01</span></div><div data-v-e43d8d88><h2 data-v-e43d8d88>Deux fr\xE8res,<br data-v-e43d8d88>cinq musiciens. <em data-v-e43d8d88>Une sc\xE8ne.</em></h2><p class="lede" data-v-e43d8d88> Deux fr\xE8res entour\xE9s de trois musiciens, un son qui traverse l&#39;Atlantique. Des artistes canadiens dont l&#39;\xE9criture marie l&#39;\xE2me du country traditionnel \xE0 la rigueur du folk contemporain, pour une seule date fran\xE7aise. </p></div></div><div class="about-grid" data-v-e43d8d88><div class="about-imgs" data-reveal data-v-e43d8d88><span class="tag" data-v-e43d8d88>Live \xB7 Tour 2026</span><div class="slot-a" data-v-e43d8d88><img${ssrRenderAttr("src", _imports_0$1)} alt="The Abrams \xB7 Stage" class="slot-img" data-v-e43d8d88></div><div class="slot-b" data-v-e43d8d88><img${ssrRenderAttr("src", _imports_1$1)} alt="The Abrams \xB7 Portrait" class="slot-img" data-v-e43d8d88></div></div><div class="about-text" data-reveal data-v-e43d8d88><span class="eyebrow" data-v-e43d8d88>Touring artist \xB7 2026</span><h3 data-v-e43d8d88> Un son <span class="gold" data-v-e43d8d88>fa\xE7onn\xE9 \xE0 Nashville</span>, une \xE9motion <em data-v-e43d8d88>de l&#39;autre c\xF4t\xE9 de l&#39;oc\xE9an</em>. </h3><p data-v-e43d8d88> Sur sc\xE8ne, les deux fr\xE8res Abrams et leurs trois musiciens livrent un set acoustique-\xE9lectrique qui passe de la ballade intime au crescendo nerveux du violon, l&#39;\xE9criture pr\xE9cise, le grain humain, l&#39;\xE9nergie d&#39;un vrai duo de tourn\xE9e. </p><p data-v-e43d8d88> Pour cette unique date 2026 en France, ils investiront la grande sc\xE8ne de l&#39;Espace Art\xE9misia avec un dispositif sc\xE9nique pens\xE9 pour le live : son spatialis\xE9, lumi\xE8re cin\xE9ma, public au plus pr\xE8s. </p><div class="about-stats" data-v-e43d8d88><div class="s" data-v-e43d8d88><div class="n" data-v-e43d8d88>05</div><div class="l" data-v-e43d8d88>Musiciens</div></div><div class="s" data-v-e43d8d88><div class="n" data-v-e43d8d88>90&#39;</div><div class="l" data-v-e43d8d88>Set live</div></div><div class="s" data-v-e43d8d88><div class="n" data-v-e43d8d88>01</div><div class="l" data-v-e43d8d88>Date France</div></div></div></div></div></div></section>`);
}
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ConcertSection.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["ssrRender", _sfc_ssrRender$5], ["__scopeId", "data-v-e43d8d88"]]);
const _sfc_main$7 = {};
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs) {
  _push(`<section${ssrRenderAttrs(mergeProps({
    class: "block program stage",
    id: "programme"
  }, _attrs))} data-v-4156d7bc><div class="spotlights" aria-hidden="true" data-v-4156d7bc><div class="spotlight s1" data-v-4156d7bc></div><div class="spotlight s2" data-v-4156d7bc></div><div class="spotlight s3" data-v-4156d7bc></div></div><div class="floor" aria-hidden="true" data-v-4156d7bc></div><div class="wrap" data-v-4156d7bc><div class="section-head" data-reveal data-v-4156d7bc><div data-v-4156d7bc><span class="eyebrow" data-v-4156d7bc>Programme \xB7 02</span></div><div data-v-4156d7bc><h2 data-v-4156d7bc>Une journ\xE9e<br data-v-4156d7bc><em data-v-4156d7bc>en deux temps.</em></h2><p class="lede" data-v-4156d7bc> Workshop, bal country, food truck, et pour clore la soir\xE9e, le concert \xE9v\xE9nement. Chaque moment pens\xE9 pour la communaut\xE9 country fran\xE7aise. </p></div></div><div class="timeline" data-reveal data-v-4156d7bc><div class="tl-row" data-v-4156d7bc><div class="time" data-v-4156d7bc>09:15</div><div class="body" data-v-4156d7bc><h4 data-v-4156d7bc>Accueil</h4><div class="sub" data-v-4156d7bc><a href="https://maps.app.goo.gl/XWJhq49WoYnBWQr37" target="_blank" rel="noopener" class="venue-link" data-v-4156d7bc>Espace Art\xE9misia \xB7 5 rue des Archers</a></div><p data-v-4156d7bc>Ouverture des portes, retrait des bracelets, caf\xE9 bienvenue. March\xE9 d&#39;artisans country install\xE9 sur l&#39;esplanade.</p></div></div><div class="tl-row" data-v-4156d7bc><div class="time" data-v-4156d7bc>10:00</div><div class="body" data-v-4156d7bc><h4 data-v-4156d7bc>Workshop \xB7 S\xE9verine Fillion &amp; Chrystel Durand</h4><div class="sub" data-v-4156d7bc>Deux heures \xB7 Tous niveaux</div><p data-v-4156d7bc>Atelier de danse country en ligne par deux figures reconnues de la sc\xE8ne fran\xE7aise. Inscription incluse dans le pass journ\xE9e.</p></div></div><div class="tl-row" data-v-4156d7bc><div class="time" data-v-4156d7bc>12:00</div><div class="body" data-v-4156d7bc><h4 data-v-4156d7bc>Bal Country</h4><div class="sub" data-v-4156d7bc>Huit heures non-stop \xB7 Food truck sur place</div><p data-v-4156d7bc>Sc\xE8ne DJ et danseurs sur le parquet. Le grand bal de la communaut\xE9 GWD, ouvert \xE0 tous, avec restauration am\xE9ricaine et bar.</p></div></div><div class="tl-row featured" data-v-4156d7bc><div class="time" data-v-4156d7bc>21:00</div><div class="body" data-v-4156d7bc><span class="badge" data-v-4156d7bc>T\xEAte d&#39;affiche</span><h4 data-v-4156d7bc>The Abrams \xB7 Concert Live</h4><div class="sub" data-v-4156d7bc>Quatre-vingt-dix minutes \xB7 Set complet \xB7 Rappel</div><p data-v-4156d7bc>L&#39;\xE9v\xE9nement de la soir\xE9e. Concert en configuration assise/debout, son spatialis\xE9, lumi\xE8re cin\xE9ma. Une seule date fran\xE7aise en 2026.</p></div></div></div></div></section>`);
}
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProgramSection.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["ssrRender", _sfc_ssrRender$4], ["__scopeId", "data-v-4156d7bc"]]);
const _sfc_main$6 = {};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs) {
  _push(`<section${ssrRenderAttrs(mergeProps({
    class: "block stage",
    id: "experience"
  }, _attrs))} data-v-9170424d><div class="wrap" data-v-9170424d><div class="section-head" data-reveal data-v-9170424d><div data-v-9170424d><span class="eyebrow" data-v-9170424d>L&#39;Exp\xE9rience \xB7 03</span></div><div data-v-9170424d><h2 data-v-9170424d>Plus qu&#39;un concert.<br data-v-9170424d><em data-v-9170424d>Une soir\xE9e country.</em></h2><p class="lede" data-v-9170424d> Une atmosph\xE8re pens\xE9e comme une vraie nuit Nashville. Communaut\xE9, danse, bonne cuisine, et l&#39;\xE9motion d&#39;un live unique, du matin jusqu&#39;\xE0 minuit pass\xE9. </p></div></div><div class="exp-grid" data-reveal data-v-9170424d><div class="exp" data-v-9170424d><div class="num" data-v-9170424d>01</div><h4 data-v-9170424d>Live<em data-v-9170424d>music</em></h4><p data-v-9170424d>Deux fr\xE8res et trois musiciens, un groupe de tourn\xE9e internationale rep\xE9r\xE9 sur les sc\xE8nes du Grand Ole Opry et de la CMA. Une seule fois, ici.</p><div class="ic" data-v-9170424d><svg viewBox="0 0 24 24" data-v-9170424d><path d="M9 18V6l9-2v12" data-v-9170424d></path><circle cx="6" cy="18" r="3" data-v-9170424d></circle><circle cx="15" cy="16" r="3" data-v-9170424d></circle></svg></div></div><div class="exp" data-v-9170424d><div class="num" data-v-9170424d>02</div><h4 data-v-9170424d>Bal<em data-v-9170424d>country</em></h4><p data-v-9170424d>Huit heures de danse en ligne et partner work, anim\xE9es par les r\xE9f\xE9rences de la sc\xE8ne GWD. DJ set, parquet, ambiance club.</p><div class="ic" data-v-9170424d><svg viewBox="0 0 24 24" data-v-9170424d><path d="M5 20l4-12 3 6 3-4 4 10" data-v-9170424d></path><circle cx="9" cy="6" r="2" data-v-9170424d></circle></svg></div></div><div class="exp" data-v-9170424d><div class="num" data-v-9170424d>03</div><h4 data-v-9170424d>Food<em data-v-9170424d>truck</em></h4><p data-v-9170424d>Cuisine am\xE9ricaine de tourn\xE9e : pulled pork lent, mac &amp; cheese, bourbon vanille. Bar bi\xE8res craft + cocktails signature.</p><div class="ic" data-v-9170424d><svg viewBox="0 0 24 24" data-v-9170424d><rect x="2" y="9" width="14" height="8" rx="1" data-v-9170424d></rect><path d="M16 11h4l2 3v3h-6" data-v-9170424d></path><circle cx="6" cy="19" r="2" data-v-9170424d></circle><circle cx="18" cy="19" r="2" data-v-9170424d></circle></svg></div></div><div class="exp" data-v-9170424d><div class="num" data-v-9170424d>04</div><h4 data-v-9170424d>Une<em data-v-9170424d>communaut\xE9</em></h4><p data-v-9170424d>Trois cents danseurs, des familles, des passionn\xE9s venus de toute la Bretagne. La grande nuit annuelle de G\xE9n\xE9ration West Dance.</p><div class="ic" data-v-9170424d><svg viewBox="0 0 24 24" data-v-9170424d><circle cx="9" cy="9" r="3" data-v-9170424d></circle><circle cx="17" cy="10" r="2.5" data-v-9170424d></circle><path d="M3 20a6 6 0 0112 0M14 20a5 5 0 018 0" data-v-9170424d></path></svg></div></div></div></div></section>`);
}
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ExperienceSection.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_5 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["ssrRender", _sfc_ssrRender$3], ["__scopeId", "data-v-9170424d"]]);
const _imports_0 = publicAssetsURL("/photos/gallery-01-stage.jpg");
const _imports_1 = publicAssetsURL("/photos/gallery-02-crowd.jpg");
const _imports_2 = publicAssetsURL("/photos/gallery-03-detail.jpg");
const _imports_3 = publicAssetsURL("/photos/gallery-04-backstage.jpg");
const _imports_4 = publicAssetsURL("/photos/gallery-05-portrait.jpg");
const _imports_5 = publicAssetsURL("/photos/gallery-06-encore.jpg");
const _sfc_main$5 = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  _push(`<section${ssrRenderAttrs(mergeProps({
    class: "block stage",
    id: "gallery"
  }, _attrs))} data-v-1db8cda1><div class="wrap" data-v-1db8cda1><div class="section-head" data-reveal data-v-1db8cda1><div data-v-1db8cda1><span class="eyebrow" data-v-1db8cda1>Galerie \xB7 04</span></div><div data-v-1db8cda1><h2 data-v-1db8cda1>Sous les <em data-v-1db8cda1>spots.</em></h2><p class="lede" data-v-1db8cda1> Une s\xE9lection visuelle inspir\xE9e de la tourn\xE9e. </p></div></div><div class="gallery" data-reveal data-v-1db8cda1><div class="gcell g1" data-v-1db8cda1><img${ssrRenderAttr("src", _imports_0)} alt="Stage" class="gcell-img" data-v-1db8cda1><span class="cap" data-v-1db8cda1>01 \xB7 Sc\xE8ne</span></div><div class="gcell g2" data-v-1db8cda1><img${ssrRenderAttr("src", _imports_1)} alt="Public" class="gcell-img" data-v-1db8cda1><span class="cap" data-v-1db8cda1>02 \xB7 Public</span></div><div class="gcell g3" data-v-1db8cda1><img${ssrRenderAttr("src", _imports_2)} alt="D\xE9tail" class="gcell-img" data-v-1db8cda1><span class="cap" data-v-1db8cda1>03 \xB7 D\xE9tail</span></div><div class="gcell g4" data-v-1db8cda1><img${ssrRenderAttr("src", _imports_3)} alt="Coulisses" class="gcell-img" data-v-1db8cda1><span class="cap" data-v-1db8cda1>04 \xB7 Coulisses</span></div><div class="gcell g5" data-v-1db8cda1><img${ssrRenderAttr("src", _imports_4)} alt="Portrait" class="gcell-img" data-v-1db8cda1><span class="cap" data-v-1db8cda1>05 \xB7 Portrait</span></div><div class="gcell g6" data-v-1db8cda1><img${ssrRenderAttr("src", _imports_5)} alt="Rappel" class="gcell-img" data-v-1db8cda1><span class="cap" data-v-1db8cda1>06 \xB7 Rappel</span></div></div></div></section>`);
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/GallerySection.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_6 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["ssrRender", _sfc_ssrRender$2], ["__scopeId", "data-v-1db8cda1"]]);
const _sfc_main$4 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<section${ssrRenderAttrs(mergeProps({
    class: "block stage",
    id: "billetterie"
  }, _attrs))} data-v-40865b58><div class="wrap" data-v-40865b58><div class="tickets" data-reveal data-v-40865b58><div class="tickets-top" data-v-40865b58><span class="eyebrow" data-v-40865b58>Billetterie \xB7 05</span><h3 data-v-40865b58>R\xE9servez<br data-v-40865b58><em data-v-40865b58>votre soir\xE9e.</em></h3></div><div class="tickets-rule" data-v-40865b58></div><div class="tickets-bottom" data-v-40865b58><div class="tickets-details" data-v-40865b58><p data-v-40865b58>R\xE9servation s\xE9curis\xE9e via HelloAsso. Paiement en ligne. E-billet \xE9mis instantan\xE9ment.</p><p class="rare" data-v-40865b58>Ce genre de moment n&#39;arrive pas souvent.</p><div class="urgency" data-v-40865b58><span class="dot" data-v-40865b58></span><span data-v-40865b58>Concert unique en France \xB7 Places limit\xE9es</span></div></div><div class="tickets-action" data-v-40865b58><a class="btn primary" href="https://www.helloasso.com/associations/generation-west-dance/evenements/the-abrams" target="_blank" rel="noopener" data-v-40865b58><span data-v-40865b58>R\xE9server maintenant</span><span class="arr" data-v-40865b58>\u2192</span></a></div></div></div></div></section>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TicketsSection.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_7 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-40865b58"]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "PartnersSection",
  __ssrInlineRender: true,
  setup(__props) {
    const partners = [
      { mark: "GWD", name: "G\xE9n\xE9ration West Dance", role: "Organisateur \xB7 La Gacilly" },
      { mark: "DML", name: "DML Country Laill\xE9", role: "Partenaire organisateur" },
      { mark: "WR", name: "West Rennes", role: "Partenaire organisateur" },
      { mark: "GC", name: "La Gacilly Country", role: "Partenaire local" },
      { mark: "FRB", name: "FRB Production", role: "Production sc\xE9nique" },
      { mark: "P&S", name: "Pickin' & Slidin'", role: "Production musicale" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: "block stage",
        id: "partners"
      }, _attrs))} data-v-0c2d0a16><div class="wrap" data-v-0c2d0a16><div class="section-head" data-reveal data-v-0c2d0a16><div data-v-0c2d0a16><span class="eyebrow" data-v-0c2d0a16>Partenaires \xB7 06</span></div><div data-v-0c2d0a16><h2 data-v-0c2d0a16>Pr\xE9sent\xE9 <em data-v-0c2d0a16>par.</em></h2><p class="lede" data-v-0c2d0a16> L&#39;\xE9v\xE9nement est rendu possible gr\xE2ce \xE0 la collaboration de six partenaires engag\xE9s dans la sc\xE8ne country fran\xE7aise et canadienne. </p></div></div><div class="partners" data-reveal data-v-0c2d0a16><!--[-->`);
      ssrRenderList(partners, (p) => {
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(p.url ? "a" : "div"), mergeProps({
          key: p.mark,
          class: "partner"
        }, { ref_for: true }, p.url ? { href: p.url, target: "_blank", rel: "noopener" } : {}), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="pmark" data-v-0c2d0a16${_scopeId}>${ssrInterpolate(p.mark)}</span><span class="pn" data-v-0c2d0a16${_scopeId}>${ssrInterpolate(p.name)}</span><span class="pr" data-v-0c2d0a16${_scopeId}>${ssrInterpolate(p.role)}</span>`);
            } else {
              return [
                createVNode("span", { class: "pmark" }, toDisplayString(p.mark), 1),
                createVNode("span", { class: "pn" }, toDisplayString(p.name), 1),
                createVNode("span", { class: "pr" }, toDisplayString(p.role), 1)
              ];
            }
          }),
          _: 2
        }), _parent);
      });
      _push(`<!--]--></div></div></section>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/PartnersSection.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_8 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-0c2d0a16"]]);
const _sfc_main$2 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<footer${ssrRenderAttrs(_attrs)} data-v-5731b90f><div class="wrap" data-v-5731b90f><div class="foot-mark" data-v-5731b90f>The Abrams \xB7 17.10.26</div><div class="foot-grid" data-v-5731b90f><div data-v-5731b90f><h5 data-v-5731b90f>G\xE9n\xE9ration West Dance</h5><p data-v-5731b90f>Association country &amp; western dance \xB7 Bretagne. Organisateur de la soir\xE9e Concert Live The Abrams 2026.</p><p class="site-link" data-v-5731b90f>theabramsmusic.com</p></div><div data-v-5731b90f><h5 data-v-5731b90f>Lieu</h5><a href="https://maps.app.goo.gl/XWJhq49WoYnBWQr37" target="_blank" rel="noopener" data-v-5731b90f>Espace Art\xE9misia</a><a href="https://maps.app.goo.gl/XWJhq49WoYnBWQr37" target="_blank" rel="noopener" data-v-5731b90f>5 rue des Archers</a><a href="https://maps.app.goo.gl/XWJhq49WoYnBWQr37" target="_blank" rel="noopener" data-v-5731b90f>56200 La Gacilly</a><a href="https://maps.app.goo.gl/XWJhq49WoYnBWQr37" target="_blank" rel="noopener" data-v-5731b90f>Bretagne \xB7 France</a></div><div data-v-5731b90f><h5 data-v-5731b90f>Contact</h5><a href="mailto:generationwestdance@gmail.com" data-v-5731b90f>generationwestdance<br data-v-5731b90f>@gmail.com</a><a href="tel:0676211368" data-v-5731b90f>+33 6 76 21 13 68</a></div><div data-v-5731b90f><h5 data-v-5731b90f>Suivre</h5><a href="https://www.instagram.com/generationwestdance/" target="_blank" rel="noopener" data-v-5731b90f>Instagram</a><a href="https://www.facebook.com/profile.php?id=61585757857070" target="_blank" rel="noopener" data-v-5731b90f>Facebook</a><a href="https://www.helloasso.com/associations/generation-west-dance" target="_blank" rel="noopener" data-v-5731b90f>HelloAsso</a></div></div><div class="foot-bar" data-v-5731b90f><span data-v-5731b90f>\xA9 2026 GWD \xB7 Tous droits r\xE9serv\xE9s</span></div></div></footer>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppFooter.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_9 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-5731b90f"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ReservationModal",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(__props) {
    const tiers = reactive([
      { id: 1, label: "Pass Concert", desc: "21h00 \xB7 The Abrams \xB7 Live", price: 38, qty: 2 },
      { id: 2, label: "Pass Journ\xE9e", desc: "Workshop + Bal + Concert", price: 58, qty: 0 },
      { id: 3, label: "Pass Premium", desc: "Journ\xE9e compl\xE8te + carr\xE9 or + boisson", price: 95, qty: 0 }
    ]);
    const total = computed(() => tiers.reduce((s, t) => s + t.price * t.qty, 0));
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        _push2(`<div class="${ssrRenderClass([{ open: __props.modelValue }, "modal-bk"])}" role="dialog"${ssrRenderAttr("aria-hidden", !__props.modelValue)} data-v-652e2968><div class="modal" data-v-652e2968><button class="modal-x" aria-label="Fermer" data-v-652e2968>\u2715</button><span class="eyebrow" data-v-652e2968>Billetterie \xB7 The Abrams</span><h3 data-v-652e2968>R\xE9server <em data-v-652e2968>votre soir\xE9e.</em></h3><div class="sub" data-v-652e2968>Samedi 17 octobre 2026 \xB7 <a href="https://maps.app.goo.gl/XWJhq49WoYnBWQr37" target="_blank" rel="noopener" class="venue-link" data-v-652e2968>Espace Art\xE9misia \xB7 La Gacilly</a></div><div class="tier-list" data-v-652e2968><!--[-->`);
        ssrRenderList(unref(tiers), (tier) => {
          _push2(`<div class="${ssrRenderClass([{ sel: tier.qty > 0 }, "tier-row"])}" data-v-652e2968><span class="rd" data-v-652e2968></span><div class="tn" data-v-652e2968>${ssrInterpolate(tier.label)} <small data-v-652e2968>${ssrInterpolate(tier.desc)}</small></div><div class="tp" data-v-652e2968>${ssrInterpolate(tier.price)}\u20AC</div><div class="tq" data-v-652e2968><button data-v-652e2968>\u2212</button><input type="text"${ssrRenderAttr("value", tier.qty)} readonly data-v-652e2968><button data-v-652e2968>+</button></div></div>`);
        });
        _push2(`<!--]--></div><div class="modal-foot" data-v-652e2968><div class="total" data-v-652e2968> Total<b data-v-652e2968>${ssrInterpolate(unref(total))}\u20AC</b></div><button class="btn primary" data-v-652e2968><span data-v-652e2968>Continuer sur HelloAsso</span><span class="arr" data-v-652e2968>\u2192</span></button></div></div></div>`);
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ReservationModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_10 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-652e2968"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "the-abrams",
  __ssrInlineRender: true,
  setup(__props) {
    const modalOpen = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppNav = __nuxt_component_0;
      const _component_HeroSection = __nuxt_component_1;
      const _component_EmotionalSection = __nuxt_component_2;
      const _component_ConcertSection = __nuxt_component_3;
      const _component_ProgramSection = __nuxt_component_4;
      const _component_ExperienceSection = __nuxt_component_5;
      const _component_GallerySection = __nuxt_component_6;
      const _component_TicketsSection = __nuxt_component_7;
      const _component_PartnersSection = __nuxt_component_8;
      const _component_AppFooter = __nuxt_component_9;
      const _component_ReservationModal = __nuxt_component_10;
      _push(`<div${ssrRenderAttrs(_attrs)}><svg width="0" height="0" style="${ssrRenderStyle({ "position": "absolute" })}" aria-hidden="true"><defs><filter id="smoke-noise" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.012 0.02" numOctaves="2" seed="3"><animate attributeName="baseFrequency" dur="38s" values="0.012 0.02;0.018 0.026;0.012 0.02" repeatCount="indefinite"></animate></feTurbulence><feColorMatrix values="0 0 0 0 0.78
                                 0 0 0 0 0.66
                                 0 0 0 0 0.42
                                 0 0 0 0.6 0"></feColorMatrix></filter><pattern id="smoke-fill" x="0" y="0" width="100%" height="100%" patternUnits="userSpaceOnUse"><rect width="100%" height="100%" filter="url(#smoke-noise)" opacity="0.4"></rect></pattern></defs></svg>`);
      _push(ssrRenderComponent(_component_AppNav, {
        onOpenModal: ($event) => modalOpen.value = true
      }, null, _parent));
      _push(ssrRenderComponent(_component_HeroSection, {
        onOpenModal: ($event) => modalOpen.value = true
      }, null, _parent));
      _push(ssrRenderComponent(_component_EmotionalSection, null, null, _parent));
      _push(ssrRenderComponent(_component_ConcertSection, null, null, _parent));
      _push(ssrRenderComponent(_component_ProgramSection, null, null, _parent));
      _push(ssrRenderComponent(_component_ExperienceSection, null, null, _parent));
      _push(ssrRenderComponent(_component_GallerySection, null, null, _parent));
      _push(ssrRenderComponent(_component_TicketsSection, {
        onOpenModal: ($event) => modalOpen.value = true
      }, null, _parent));
      _push(ssrRenderComponent(_component_PartnersSection, null, null, _parent));
      _push(ssrRenderComponent(_component_AppFooter, null, null, _parent));
      _push(ssrRenderComponent(_component_ReservationModal, {
        modelValue: unref(modalOpen),
        "onUpdate:modelValue": ($event) => isRef(modalOpen) ? modalOpen.value = $event : null
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/the-abrams.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=the-abrams-CJOEJVbP.mjs.map
