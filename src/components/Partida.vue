<template>
  <div class="spinner-border mt-3" role="status" v-if="carregando">
    <span class="visually-hidden">Loading...</span>
  </div>
  <div v-else>
    <div class="d-flex flex-column gap-1 gap-lg-2 m-4">
      <span class="d-flex font-bold">Itens</span>
      <div class="d-flex gap-2 flex-wrap">
        <div v-for="(build, index) in eventos.build" :key="`itensTimes${index}`" class="itensTimes d-flex gap-2 m-1">
          <template v-for="(item, index) in build" :key="`itensOrdem${index}`">
            <img v-if="item != 0" :src="`http://ddragon.leagueoflegends.com/cdn/${versao}/img/item/${item}.png`" :width="tamanhoSkill" :height="tamanhoSkill" class="trinket">
            <div v-else class="semItem trinket" :style="`width: ${tamanhoSkill}px; height: ${tamanhoSkill}px;`"></div>
          </template>
        </div>
      </div>
    </div>
    <div class="d-flex flex-column gap-2 gap-lg-3 m-4">
      <span class="d-flex font-bold">Habilidades</span>
      <div class="d-flex gap-2">
        <div v-for="(skill, index) in eventos.skils" :key="`habilidades${index}`" class="d-flex flex-column gap-1 gap-lg-2">
          <img :src="`https://opgg-static.akamaized.net/meta/images/lol/spell/AatroxQ.png?image=q_auto,f_webp,w_64&v=1694664078578`" :width="tamanhoSkill" :height="tamanhoSkill" :class="`opacitySkill ${(skilsLetra(skill) == 'Q')?'skillAtiva':''}`">
          <img :src="`https://opgg-static.akamaized.net/meta/images/lol/spell/AatroxW.png?image=q_auto,f_webp,w_64&v=1694664078578`" :width="tamanhoSkill" :height="tamanhoSkill" :class="`opacitySkill ${(skilsLetra(skill) == 'W')?'skillAtiva':''}`">
          <img :src="`https://opgg-static.akamaized.net/meta/images/lol/spell/AatroxE.png?image=q_auto,f_webp,w_64&v=1694664078578`" :width="tamanhoSkill" :height="tamanhoSkill" :class="`opacitySkill ${(skilsLetra(skill) == 'E')?'skillAtiva':''}`">
          <img :src="`https://opgg-static.akamaized.net/meta/images/lol/spell/AatroxR.png?image=q_auto,f_webp,w_64&v=1694664078578`" :width="tamanhoSkill" :height="tamanhoSkill" :class="`opacitySkill ${(skilsLetra(skill) == 'R')?'skillAtiva':''}`">
        </div>
      </div>
    </div>
    <table class="table align-middle table-borderless table-dark table-hover">
      <template v-for="(item, index) in teams" :key="index">
        <thead class="thead-listagem">
          <tr>
            <th scope="col" class="text-color th-sm">
              <span :class="`${item.key == 'BLUE' ? 'text-info' : 'text-danger'}`">
                {{ item.game_stat.is_win ? 'Vitória' : 'Derrota' }} 
              </span>
              <span class="d-none-sm"> ({{ item.key == 'BLUE' ? 'Time Azul' : 'Time Vermelho' }})</span>
            </th>
            <th scope="col" class="text-color th-sm d-none-sm">Rota</th>
            <th scope="col" class="text-color th-sm d-none-sm">Elo</th>
            <th scope="col" class="text-color th-sm">Frag</th>
            <th scope="col" class="text-color th-sm">CS</th>
            <th scope="col" class="text-color th-sm">D/T</th>
            <th scope="col" class="text-color th-sm">Itens</th>
          </tr>
        </thead>
        <tbody class="tbody-listagem" :class="item.key.toLowerCase()">
          <Lines v-if="players[item.key]" :line="players[item.key]['TOP']" :teams="partida.participants"/>
          <Lines v-if="players[item.key]" :line="players[item.key]['JUNGLE']" :teams="partida.participants"/>
          <Lines v-if="players[item.key]" :line="players[item.key]['MID']" :teams="partida.participants"/>
          <Lines v-if="players[item.key]" :line="players[item.key]['ADC']" :teams="partida.participants"/>
          <Lines v-if="players[item.key]" :line="players[item.key]['SUPPORT']" :teams="partida.participants"/>
        </tbody>
      </template>
    </table>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, onMounted, createApp } from 'vue';
import { useHistoricoStore } from "@/stores/Historico";
import { useCampeoesStore } from "@/stores/Campeoes";
import Lines from "@/components/Lines.vue";
import moment from 'moment';

const app = createApp({});
app.component('Lines', Lines);

const historico = useHistoricoStore();
const champStore = useCampeoesStore();

const props = defineProps({
  partida: {
    required: true,
  }
});

let eventos = ref([]);
let players = ref([]);
let teams = ref([]);
const tamanhoSkill = computed(() => (window.innerWidth < 768) ? 15 : 15);
const tamanho = computed(() => (window.innerWidth < 768) ? 25 : 60);
const sm = computed(() => (window.innerWidth < 768) ? true : false);
const versao = computed(() => historico.versao.n.champion);
const carregando = computed(() => historico.carregandoHistoricoSkills);
// const carregando = computed(() => (players.value.length > 0) ? false : true);

const skilsLetra = (skill) => {
  switch (skill) {
    case 1: return 'Q';
    case 2: return 'W';
    case 3: return 'E';
    case 4: return 'R';
    default: return null;
  }
};

onMounted(async () => {
  eventos.value = await historico.buscaEventos(
    props.partida.id,
    props.partida.created_at,
    props.partida.myData.participant_id
  );
  players.value = await historico.ajustesInfo(props.partida.participants);
  teams.value = props.partida.teams;
});
</script>
    