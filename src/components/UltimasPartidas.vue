<template>
  <div class="spinner-border mt-3" role="status" v-if="carregando">
    <span class="visually-hidden">Loading...</span>
  </div>
  <table class="table align-middle table-borderless table-dark table-hover" v-else>
    <tbody class="tbody-listagem">
      <template v-for="partida in partidas" :key="`partidas-${partida.id}`">
        <tr :class="`trPartidas tr-${status(partida)}`">
          <td>
            <div v-if="sm" class="matchupSm text-color">
              <img v-if="partida.matchup" :src="`http://ddragon.leagueoflegends.com/cdn/${versao}/img/champion/${partida.matchup.pro}.png`" :width="(tamanho/2)" :height="(tamanho/2)" class="icone">
              <img v-if="partida.matchup" :src="`http://ddragon.leagueoflegends.com/cdn/${versao}/img/champion/${partida.matchup.contra}.png`" :width="(tamanho/2)" :height="(tamanho/2)" class="icone">
            </div>
            <div v-else class="icones">
              <img v-if="partida.matchup" :src="`http://ddragon.leagueoflegends.com/cdn/${versao}/img/champion/${partida.matchup.pro}.png`" :width="tamanho" :height="tamanho" class="icone">
              <span><i class="bi bi-x-lg"></i></span>
              <img v-if="partida.matchup" :src="`http://ddragon.leagueoflegends.com/cdn/${versao}/img/champion/${partida.matchup.contra}.png`" :width="tamanho" :height="tamanho" class="icone">
            </div>
          </td>
          <td>
            <div class="text-color">
              <img :src="champStore.roles[partida.myData.position].img" :width="tamanho/2" :height="tamanho/2">
            </div>
          </td>
          <td class="d-none-sm">
            <div class="text-color">
              <img :src="partida.myData.tier_info.tier_image_url" :width="tamanho" :height="tamanho" class="icone">
              <span class="pdl">: {{partida.myData.tier_info.lp}}</span>
            </div>
          </td>
          <td class="text-color">
            <div class="white-space-nowrap">
              <span class="text-info">{{ partida.myData.stats.kill }}</span>
              <span> / </span>
              <span class="text-danger">{{ partida.myData.stats.death }}</span>
              <span> / </span>
              <span class="text-warning">{{ partida.myData.stats.assist }}</span>
            </div>
          </td>
          <td>
            <div class="runas text-color">
                <img :src="`https://opgg-static.akamaized.net/meta/images/lol/perk/${partida.myData.rune.primary_rune_id}.png?image=q_auto,f_webp,w_64&v=1694664078578`" :width="(tamanho/2)-3" :height="(tamanho/2)-3">
                <img :src="`https://opgg-static.akamaized.net/meta/images/lol/perkStyle/${partida.myData.rune.secondary_page_id}.png?image=q_auto,f_webp,w_64&v=1694664078578`" :width="(tamanho/2)-3" :height="(tamanho/2)-3">
            </div>
          </td>
          <td>
            <div class="runas text-color">
                <img :src="`http://ddragon.leagueoflegends.com/cdn/${versao}/img/spell/${partida.spells.d}.png`" :width="(tamanho/2)-3" :height="(tamanho/2)-3" class="spells">
                <img :src="`http://ddragon.leagueoflegends.com/cdn/${versao}/img/spell/${partida.spells.f}.png`" :width="(tamanho/2)-3" :height="(tamanho/2)-3" class="spells">
            </div>
          </td>
          <td>
            <div class="icones">
              <template v-for="(item, index) in partida.myData.items" :key="index">
                <img v-if="item != 0" :src="`http://ddragon.leagueoflegends.com/cdn/${versao}/img/item/${item}.png`" :width="tamanho" :height="tamanho" class="item">
                <div v-else class="semItem item" :style="`width: ${tamanho}px; height: ${tamanho}px;`"></div>
              </template>
            </div>
          </td>
          <td>
            <div class="tempoTrinket text-color">
              <img v-if="partida.myData.trinket_item" :src="`http://ddragon.leagueoflegends.com/cdn/${versao}/img/item/${partida.myData.trinket_item}.png`" :width="tamanho/2" :height="tamanho/2" class="trinket">
              <div v-else class="semItem trinket" :style="`width: ${tamanho/2}px; height: ${tamanho/2}px;`"></div>
              <span class="text-sm">{{ partida.tempo }} <span class="d-none-sm">atrás</span></span>
            </div>
          </td>
        </tr>
      </template>
        <tr class="noHover">
          <td colspan="8">
            <div class="spinner-border" role="status" v-if="historico.carregandoMaisHistorico">
              <span class="visually-hidden">Loading...</span>
            </div>
            <div v-else>
              <a
                v-if="btnMaisHistorico"
                class="btn btn-dark btnVerMaisLista"
                @click="buscarMaisPartidas(partidas)"
              >
                <i class="bi bi-plus-lg"></i>
              </a>
              <span v-else class="text-secondary">Limite Atingido</span>
            </div>
          </td>
        </tr>
    </tbody>
  </table>
</template>

<script setup>
import { ref, computed, defineProps, onMounted } from 'vue';
import { useHistoricoStore } from "@/stores/Historico";
import { useCampeoesStore } from "@/stores/Campeoes";
import moment from 'moment';

const historico = useHistoricoStore();
const champStore = useCampeoesStore();

const props = defineProps({
  summoner_id: {
    required: true,
    type: String
  },
  internal_name: {
    required: true,
    type: String
  },
  campeaoId: {
    required: true,
    type: String
  }
});

let partidas = ref([]);
let btnMaisHistorico = ref(true);
const tamanho = computed(() => (window.innerWidth < 768) ? 25 : 60);
const sm = computed(() => (window.innerWidth < 768) ? true : false);
const carregando = computed(() => (partidas.value.length > 0) ? false : true);
const versao = computed(() => historico.versao.n.champion);

const buscarMaisPartidas = async (matchs) => {
  const dataUltimaPartida = matchs[matchs.length-1].created_at;
  const dataProxBusca = moment(dataUltimaPartida).add(1, 'm').format();
  try {
    const novasPartidas = await historico.maisHistorico(props.summoner_id, dataProxBusca, props.campeaoId);
    if (novasPartidas.length == 0) btnMaisHistorico.value = false;
    else novasPartidas.forEach(partida => partidas.value.push(partida));
  } catch (error) {
    console.error(error);
    btnMaisHistorico.value = false;
  }
};

const status = (partida) => {
  if (partida.is_remake) return 'cinza';
  if (partida.is_recorded) return 'cinza';

  switch (partida.myData.stats.result) {
    case 'LOSE': return 'vermelha';
    case 'WIN': return 'azul';
    default: return 'cinza';
  }
};

onMounted(async () => {
  partidas.value = await historico.historico(props.summoner_id, props.internal_name, props.campeaoId, true);
});
</script>
  