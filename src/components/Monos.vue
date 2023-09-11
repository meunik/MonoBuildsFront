<template>
  <div class="monoContainer">
    <div class="mb-32">
      <router-link :to="`/campeoes`" class="routeBtn">
        Campeoes
      </router-link>
    </div>

    <div class="table-responsive">
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
          <tr v-for="lista in historico.listaItens" :key="lista.id">
            <td>
              <div class="icones">
                <img v-if="lista.campeaoNameId" :src="`https://opgg-static.akamaized.net/meta/images/lol/champion/${lista.campeaoNameId}.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto,f_webp,w_160&amp;v=1693294894548`" :width="tamanho" :alt="lista.campeaoName" :height="tamanho" class="icone">
                <div class="position-relative">
                  <img v-if="lista.icon" :src="lista.icon" :width="tamanho-tamanhoMenos" alt="icone do invocador" :height="tamanho-tamanhoMenos" class="iconePlayer">
                  <img v-if="lista.soloQ" :src="lista.soloQ.tier_info.border_image_url" :width="tamanho" alt="icone do invocador" :height="tamanho" class="rankBorda">
                </div>
              </div>
            </td>
            <td class="nomeTd">
              <a
                :href="`https://www.op.gg/summoners/br/${lista.name}`"
                target="_blank"
                class="nome tresPontinhos"
              >
                {{ lista.name }}
              </a>
            </td>
            <td class="">
              <img v-if="lista.soloQ" :src="lista.soloQ.tier_info.tier_image_url" :width="tamanho" :alt="lista.campeaoName" :height="tamanho" class="icone">
            </td>
            <td class="text-color">
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
                <img v-if="lista.item0" :src="`https://opgg-static.akamaized.net/meta/images/lol/item/${lista.item0}.png?image=q_auto,f_webp,w_64&v=1693294894548`" :width="tamanho" alt="Primeiro item" :height="tamanho" class="item">
                <img v-if="lista.item1" :src="`https://opgg-static.akamaized.net/meta/images/lol/item/${lista.item1}.png?image=q_auto,f_webp,w_64&v=1693294894548`" :width="tamanho" alt="Primeiro item" :height="tamanho" class="item">
                <img v-if="lista.item2" :src="`https://opgg-static.akamaized.net/meta/images/lol/item/${lista.item2}.png?image=q_auto,f_webp,w_64&v=1693294894548`" :width="tamanho" alt="Primeiro item" :height="tamanho" class="item">
                <img v-if="lista.item3" :src="`https://opgg-static.akamaized.net/meta/images/lol/item/${lista.item3}.png?image=q_auto,f_webp,w_64&v=1693294894548`" :width="tamanho" alt="Primeiro item" :height="tamanho" class="item">
                <img v-if="lista.item4" :src="`https://opgg-static.akamaized.net/meta/images/lol/item/${lista.item4}.png?image=q_auto,f_webp,w_64&v=1693294894548`" :width="tamanho" alt="Primeiro item" :height="tamanho" class="item">
                <img v-if="lista.item5" :src="`https://opgg-static.akamaized.net/meta/images/lol/item/${lista.item5}.png?image=q_auto,f_webp,w_64&v=1693294894548`" :width="tamanho" alt="Primeiro item" :height="tamanho" class="item">
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script setup>
import { computed, onMounted, onUpdated } from 'vue'
import { useHistoricoStore } from "@/stores/Historico";
import { useRoute } from "vue-router";

const route = useRoute();
const historico = useHistoricoStore();
const champ = route.params.champ;
const tamanhos = 60;

const tamanho = computed(() => (window.innerWidth < 768) ? 25 : 60);
const tamanhoMenos = computed(() => (window.innerWidth < 768) ? 6 : 12);
const sm = computed(() => (window.innerWidth < 768) ? true : false);
const innerWidth = computed(() => window.innerWidth);

onMounted(() => {
  historico.summoners(champ);
})
</script>
