<template>
  <div class="spinner-border mt-3" role="status" v-if="carregando">
    <span class="visually-hidden">Loading...</span>
  </div>
  <div v-else>
    <div class="d-flex flex-column gap-1 gap-lg-2 m-1 m-lg-4">
      <span class="d-flex font-bold">Itens</span>
      <div class="d-flex gap-1 flex-wrap">
        <div v-for="(build, index) in eventos.build" :key="`itensTimes${index}`">
          <div class="d-flex">
            <span class="text-color">{{ Math.floor((index/60000)-1) }} min</span>
          </div>
          <div class="itensTimes d-flex justify-content-center align-items-center gap-1 gap-lg-2 m-1">
            <template v-for="(item, index) in build" :key="`itensOrdem${index}`">
              <img
                v-if="item != 0"
                v-hover="{ component: TooltipItens, props: { itemId: item } }"
                :src="`http://ddragon.leagueoflegends.com/cdn/${versao}/img/item/${item}.png`"
                :width="tamanhoItens"
                :height="tamanhoItens"
                class="trinket"
              >
              <div v-else class="semItem trinket" :style="`width: ${tamanhoItens}px; height: ${tamanhoItens}px;`"></div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex flex-column gap-2 gap-lg-3 m-1 m-lg-4">
      <span class="d-flex font-bold">Habilidades</span>
      <div class="colunaHabilidades flex-wrap">
        <div class="linhaHabilidades">
          <div class="d-flex">
            <img
              v-hover="{
                component: TooltipHabilidades,
                props: {
                  skillName: `${partida.matchup.pro}Q`,
                  skill: 0
                }
              }"
              :src="`https://ddragon.leagueoflegends.com/cdn/${versao}/img/spell/${partida.matchup.pro}Q.png`"
              :width="tamanhoSkill"
              :height="tamanhoSkill"
              class="mostraSkill"
            >
          </div>
          <div class="d-flex">
            <img
              v-hover="{
                component: TooltipHabilidades,
                props: {
                  skillName: `${partida.matchup.pro}W`,
                  skill: 1
                }
              }"
              :src="`https://ddragon.leagueoflegends.com/cdn/${versao}/img/spell/${partida.matchup.pro}W.png`"
              :width="tamanhoSkill"
              :height="tamanhoSkill"
              class="mostraSkill"
            >
          </div>
          <div class="d-flex">
            <img
              v-hover="{
                component: TooltipHabilidades,
                props: {
                  skillName: `${partida.matchup.pro}E`,
                  skill: 2
                }
              }"
              :src="`https://ddragon.leagueoflegends.com/cdn/${versao}/img/spell/${partida.matchup.pro}E.png`"
              :width="tamanhoSkill"
              :height="tamanhoSkill"
              class="mostraSkill"
            >
          </div>
          <div class="d-flex">
            <img
              v-hover="{
                component: TooltipHabilidades,
                props: {
                  skillName: `${partida.matchup.pro}R`,
                  skill: 3
                }
              }"
              :src="`https://ddragon.leagueoflegends.com/cdn/${versao}/img/spell/${partida.matchup.pro}R.png`"
              :width="tamanhoSkill"
              :height="tamanhoSkill"
              class="mostraSkill"
            >
          </div>
        </div>

        <div v-for="(skill, index) in eventos.skils" :key="`habilidades${index}`" class="linhaHabilidades">
          <div class="quadradinhoHabilidades">
            <div :class="`semItem trinket opacitySkill ${(skilsLetra(skill) == 'Q')?'skillAtiva':''}`" :style="`width: ${tamanhoSkill}px; height: ${tamanhoSkill}px;`"></div>
            <span :class="`letraHabilidades ${(skilsLetra(skill) == 'Q')?'skillAtiva':''}`">Q</span>
          </div>
          <div class="quadradinhoHabilidades">
            <div  :class="`semItem trinket opacitySkill ${(skilsLetra(skill) == 'W')?'skillAtiva':''}`" :style="`width: ${tamanhoSkill}px; height: ${tamanhoSkill}px;`"></div>
            <span :class="`letraHabilidades ${(skilsLetra(skill) == 'W')?'skillAtiva':''}`">W</span>
          </div>
          <div class="quadradinhoHabilidades">
            <div  :class="`semItem trinket opacitySkill ${(skilsLetra(skill) == 'E')?'skillAtiva':''}`" :style="`width: ${tamanhoSkill}px; height: ${tamanhoSkill}px;`"></div>
            <span :class="`letraHabilidades ${(skilsLetra(skill) == 'E')?'skillAtiva':''}`">E</span>
          </div>
          <div class="quadradinhoHabilidades">
            <div  :class="`semItem trinket opacitySkill ${(skilsLetra(skill) == 'R')?'skillAtiva':''}`" :style="`width: ${tamanhoSkill}px; height: ${tamanhoSkill}px;`"></div>
            <span :class="`letraHabilidades ${(skilsLetra(skill) == 'R')?'skillAtiva':''}`">R</span>
          </div>
        </div>
      </div>
    </div>
    <span class="d-flex font-bold my-2">Visão Geral</span>
    <table class="table align-middle table-borderless table-dark table-hover">
      <template v-for="(item, index) in teams" :key="index">
        <thead class="thead-listagem">
          <tr>
            <th scope="col" class="text-color th-sm">
              <span :class="`${item.key == 'BLUE' ? 'text-info' : 'text-danger'} text-sm-sm`">
                {{ item.game_stat.is_win ? 'Vitória' : 'Derrota' }} 
              </span>
              <span class="d-none-sm"> ({{ item.key == 'BLUE' ? 'Time Azul' : 'Time Vermelho' }})</span>
            </th>
            <th scope="col" class="text-color th-sm text-sm-sm">{{sm?'':'Nick'}}</th>
            <th scope="col" class="text-color th-sm text-sm-sm">{{sm?'':'Rota'}}</th>
            <th scope="col" class="text-color th-sm text-sm-sm">Elo</th>
            <th scope="col" class="text-color th-sm text-sm-sm">Frag</th>
            <th scope="col" class="text-color th-sm text-sm-sm">CS</th>
            <th scope="col" class="text-color th-sm text-sm-sm">D/T</th>
            <th scope="col" class="text-color th-sm text-sm-sm">Itens</th>
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
import TooltipItens from "@/directives/TooltipItens.vue";
import TooltipHabilidades from "@/directives/TooltipHabilidades.vue";
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
const tamanhoItens = computed(() => (window.innerWidth < 768) ? 15 : 60);
const tamanhoSkill = computed(() => (window.innerWidth < 768) ? 10 : 25);
const tamanho = computed(() => (window.innerWidth < 768) ? 15 : 60);
const sm = computed(() => (window.innerWidth < 768) ? true : false);
const versao = computed(() => historico.versao.n.champion);
const carregando = computed(() => historico.carregandoHistoricoSkills);

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
    