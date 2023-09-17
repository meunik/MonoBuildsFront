<template>
  <div class="spinner-border mt-3" role="status" v-if="carregando">
    <span class="visually-hidden">Loading...</span>
  </div>
  <table class="table align-middle table-borderless table-dark table-hover mx-lg-3" v-else>
    <thead class="thead-listagem">
      <tr>
        <th scope="col">Champ</th>
        <th scope="col">Rota</th>
        <th scope="col">Frag</th>
        <th scope="col">Farm</th>
        <th scope="col">Itens</th>
      </tr>
    </thead>
    <tbody class="tbody-listagem">
      <Lines v-if="players['RED']" :line="players['RED']['TOP']" />
      <Lines v-if="players['RED']" :line="players['RED']['JUNGLE']" />
      <Lines v-if="players['RED']" :line="players['RED']['MID']" />
      <Lines v-if="players['RED']" :line="players['RED']['ADC']" />
      <Lines v-if="players['RED']" :line="players['RED']['SUPPORT']" />

      <br>

      <Lines v-if="players['BLUE']" :line="players['BLUE']['TOP']" />
      <Lines v-if="players['BLUE']" :line="players['BLUE']['JUNGLE']" />
      <Lines v-if="players['BLUE']" :line="players['BLUE']['MID']" />
      <Lines v-if="players['BLUE']" :line="players['BLUE']['ADC']" />
      <Lines v-if="players['BLUE']" :line="players['BLUE']['SUPPORT']" />
    </tbody>
  </table>
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

let players = ref([]);
const tamanho = computed(() => (window.innerWidth < 768) ? 25 : 60);
const sm = computed(() => (window.innerWidth < 768) ? true : false);
const versao = computed(() => historico.versao.n.champion);
// const carregando = computed(() => (players.value.length > 0) ? false : true);
const carregando = computed(() => false);

onMounted(async () => {
  players.value = await historico.ajustesInfo(props.partida.participants);
});
</script>
    