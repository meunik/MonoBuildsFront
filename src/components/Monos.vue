<template>
  <div class="monoContainer">
    <div class="mb-32">
      <router-link :to="`/campeoes`" class="routeBtn">
        Campeoes
      </router-link>
    </div>

    <div>
      <table class="table align-middle table-borderless table-dark table-hover">
        <thead class="thead-listagem">
          <tr>
            <th scope="col"></th>
            <th scope="col">Nicks</th>
            <th scope="col">{{(innerWidth < 768)?'R':'Rank'}}</th>
            <th scope="col">{{(innerWidth < 768)?'J':'Jogos'}}</th>
            <th scope="col" class="d-none-sm">V/D</th>
            <th scope="col">Itens</th>
          </tr>
        </thead>

        <tbody class="tbody-listagem">
          <template v-for="lista in historico.listaItens" :key="lista.id">
            <tr>
              <td>
                <div class="icones">
                  <img v-if="lista.campeaoNameId" :src="`http://ddragon.leagueoflegends.com/cdn/${versao}/img/champion/${lista.campeaoNameId}.png`" :width="tamanho" :alt="lista.campeaoName" :height="tamanho" class="icone">
                  <div class="position-relative">
                    <img v-if="lista.icon" :src="lista.icon" :width="tamanho-tamanhoMenos" alt="icone do invocador" :height="tamanho-tamanhoMenos" class="iconePlayer">
                    <img v-if="lista.soloQ" :src="lista.soloQ.tier_info.border_image_url" :width="tamanho" alt="icone do invocador" :height="tamanho" class="rankBorda">
                  </div>
                </div>
              </td>
              <td class="nomeTd tdPadding-sm">
                <a
                  :href="`https://www.op.gg/summoners/br/${lista.name}`"
                  target="_blank"
                  class="nome tresPontinhos-sm"
                >
                  {{ lista.name }}
                </a>
              </td>
              <td class="tdPadding-sm">
                <img v-if="lista.soloQ" :src="lista.soloQ.tier_info.tier_image_url" :width="tamanho" :alt="lista.campeaoName" :height="tamanho" class="icone">
              </td>
              <td class="text-color tdPadding-sm">
                <span class="text-nowrap">{{ lista.play }} <span class="d-none-sm">jogos</span></span>
              </td>
              <td class="d-none-sm text-color">
                <div class="amaDiv">
                  <div class="ama text-end">
                    <span>V</span>
                    <span class="text-primary">{{ lista.win }}</span>
                  </div>
                  <div class="ama">
                    <span>/</span>
                    <span>/</span>
                  </div>
                  <div class="ama text-start">
                    <span>D</span>
                    <span class="text-danger">{{ lista.lose }}</span>
                  </div>
                </div>
              </td>
              <td>
                <div class="icones">
                  <img
                    v-if="lista.item0"
                    v-hover="{ component: TooltipItens, props: { itemId: lista.item0 } }"
                    :src="`http://ddragon.leagueoflegends.com/cdn/${versao}/img/item/${lista.item0}.png`"
                    :width="tamanho"
                    :height="tamanho"
                    class="item"
                  >
                  <div v-else class="semItem item" :style="`width: ${tamanho}px; height: ${tamanho}px;`"></div>

                  <img
                    v-if="lista.item1"
                    v-hover="{ component: TooltipItens, props: { itemId: lista.item1 } }"
                    :src="`http://ddragon.leagueoflegends.com/cdn/${versao}/img/item/${lista.item1}.png`"
                    :width="tamanho"
                    :height="tamanho"
                    class="item"
                  >
                  <div v-else class="semItem item" :style="`width: ${tamanho}px; height: ${tamanho}px;`"></div>

                  <img
                    v-if="lista.item2"
                    v-hover="{ component: TooltipItens, props: { itemId: lista.item2 } }"
                    :src="`http://ddragon.leagueoflegends.com/cdn/${versao}/img/item/${lista.item2}.png`"
                    :width="tamanho"
                    :height="tamanho"
                    class="item"
                  >
                  <div v-else class="semItem item" :style="`width: ${tamanho}px; height: ${tamanho}px;`"></div>

                  <img
                    v-if="lista.item3"
                    v-hover="{ component: TooltipItens, props: { itemId: lista.item3 } }"
                    :src="`http://ddragon.leagueoflegends.com/cdn/${versao}/img/item/${lista.item3}.png`"
                    :width="tamanho"
                    :height="tamanho"
                    class="item"
                  >
                  <div v-else class="semItem item" :style="`width: ${tamanho}px; height: ${tamanho}px;`"></div>

                  <img
                    v-if="lista.item4"
                    v-hover="{ component: TooltipItens, props: { itemId: lista.item4 } }"
                    :src="`http://ddragon.leagueoflegends.com/cdn/${versao}/img/item/${lista.item4}.png`"
                    :width="tamanho"
                    :height="tamanho"
                    class="item"
                  >
                  <div v-else class="semItem item" :style="`width: ${tamanho}px; height: ${tamanho}px;`"></div>

                  <img
                    v-if="lista.item5"
                    v-hover="{ component: TooltipItens, props: { itemId: lista.item5 } }"
                    :src="`http://ddragon.leagueoflegends.com/cdn/${versao}/img/item/${lista.item5}.png`"
                    :width="tamanho"
                    :height="tamanho"
                    class="item"
                  >
                  <div v-else class="semItem item" :style="`width: ${tamanho}px; height: ${tamanho}px;`"></div>
                </div>
              </td>
              <td class="tdPadding-sm">
                <a
                  class="btn btn-dark btnVerMais pb-0"
                  data-bs-toggle="collapse"
                  :href="`#collapse-${lista.id}`"
                  role="button"
                  aria-expanded="false"
                  :aria-controls="`collapse-${lista.id}`"
                  @click="visible[lista.id] = !visible[lista.id]"
                  :style="`height: ${tamanho}px;`"
                >
                  <i v-if="visible[lista.id]" class="bi bi-caret-up-fill"></i>
                  <i v-else class="bi bi-caret-down-fill"></i>
                </a>
              </td>
            </tr>
            <tr class="noHover">
              <td colspan="7" class="tdPadding-sm p-0">
                <div class="collapse" :id="`collapse-${lista.id}`">
                  <div v-if="visible[lista.id]">
                    <UltimasPartidas
                      ref="partidas"
                      :summoner_id="lista.summoner_id"
                      :internal_name="lista.internal_name"
                      :campeaoId="lista.campeaoId"
                    />
                    <hr>
                  </div>
                </div>
              </td>
            </tr>
          </template>
            <tr class="noHover">
              <td colspan="7">
                <div class="spinner-border" role="status" v-if="historico.carregandoMais">
                  <span class="visually-hidden">Loading...</span>
                </div>
                <div v-else>
                  <a
                    v-if="historico.btnMais"
                    class="btn btn-dark btnVerMaisLista"
                    @click="historico.maisSummoners(champ)"
                  >
                    <i class="bi bi-plus-lg"></i>
                  </a>
                  <span v-else class="text-secondary">Limite Atingido</span>
                </div>
              </td>
            </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, createApp } from 'vue'
import { useHistoricoStore } from "@/stores/Historico";
import { useRoute } from "vue-router";
import UltimasPartidas from "@/components/UltimasPartidas.vue";
import TooltipItens from "@/directives/TooltipItens.vue";

const route = useRoute();
const historico = useHistoricoStore();
const champ = route.params.champ;
let visible = ref({});

const tamanho = computed(() => (window.innerWidth < 768) ? 20 : 60);
const tamanhoMenos = computed(() => (window.innerWidth < 768) ? 4 : 12);
const sm = computed(() => (window.innerWidth < 768) ? true : false);
const innerWidth = computed(() => window.innerWidth);
const versao = computed(() => historico.versao.n.champion);

const app = createApp({});
app.component('UltimasPartidas', UltimasPartidas);
// app.data({visible: {}});

// const vHover = {
//   mounted: (el, binding) => {
//     const app = createApp(binding.value);
//     const hoverComponentInstance = app.mount(document.createElement('div'));
//     el.addEventListener("mouseenter", () => {
//       document.body.appendChild(hoverComponentInstance.$el);
//     });
//     el.addEventListener("mouseleave", () => {
//       document.body.removeChild(hoverComponentInstance.$el);
//     });
//   }
// }

onMounted(() => {
  historico.summoners(champ);
});
</script>
