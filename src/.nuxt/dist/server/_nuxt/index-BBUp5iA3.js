import { defineComponent, withAsyncContext, useSSRContext } from "vue";
import { n as navigateTo } from "../server.mjs";
import "/home/thebault/projects/generationwestdance.fr/src/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/home/thebault/projects/generationwestdance.fr/src/node_modules/hookable/dist/index.mjs";
import "/home/thebault/projects/generationwestdance.fr/src/node_modules/unctx/dist/index.mjs";
import "/home/thebault/projects/generationwestdance.fr/src/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/home/thebault/projects/generationwestdance.fr/src/node_modules/defu/dist/defu.mjs";
import "/home/thebault/projects/generationwestdance.fr/src/node_modules/ufo/dist/index.mjs";
import "@iconify/vue";
import "/home/thebault/projects/generationwestdance.fr/src/node_modules/klona/dist/index.mjs";
import "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  async setup(__props) {
    let __temp, __restore;
    [__temp, __restore] = withAsyncContext(() => navigateTo("/the-abrams", { redirectCode: 301 })), await __temp, __restore();
    return () => {
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-BBUp5iA3.js.map
