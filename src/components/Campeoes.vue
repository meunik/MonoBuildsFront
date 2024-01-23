<template>
  <div class="d-flex flex-column justify-content-center align-items-center">
    <div class="d-flex flex-column flex-md-row gap-md-3 justify-content-center align-items-center">
      <input type="text" v-model="champStore.filtroCampeoes">
      <div class="containerLine">
        <div v-for="(role, key) in champStore.roles" :key="key" class="divlines">
          <button
            @click="champStore.roleSelect = (champStore.roleSelect != role.key) ? role.key : 'TODOS'"
            data-toggle="tooltip"
            data-placement="top"
            :title="role.name"
            :class="{
              linesBtn: 'linesBtn',
              selected: (champStore.roleSelect == role.key)?'selected':'',
              primeiro: (role.key == 'TODOS')?'primeiro':'',
              ultimo: (role.key == 'SUPPORT')?'ultimo':''
            }"
          >
            <img :src="role.img" alt="" :width="tamanhoLine" :height="tamanhoLine">
          </button>
        </div>
      </div>
    </div>

    <div class="containerChamp">
      <div v-for="campeao in campeoes" :key="campeao.key">
        <router-link
          :to="`/mono/${campeao.id}`"
          data-toggle="tooltip"
          data-placement="top"
          :title="campeao.name"
          class="divChamp"
        >
          <img :src="`http://ddragon.leagueoflegends.com/cdn/${champStore.versao.n.champion}/img/champion/${campeao.image.full}`" :width="tamanhoChamp" :height="tamanhoChamp" :alt="campeao.id" class="imgChamp">
          <span class="spanChamp" :style="`width: ${tamanhoChamp}px;`">{{ campeao.name }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useCampeoesStore } from "@/stores/Campeoes";
import { useRoute } from "vue-router";

const route = useRoute();
const champStore = useCampeoesStore();
const champ = route.params.champ;
const tamanhoLine = 25;
const tamanhoChamp = 48;

const campeoes = computed(() => {
  const filtro = champStore.filtroCampeoes.toLowerCase();
  const filtrados = Object.keys(champStore.campeoes).filter((key) => {
    const nomes = champStore.campeoes[key].name.toLowerCase();
    
    if (champStore.roleSelect == "TODOS") {
      return nomes.includes(filtro);
    } else {
      let filtroLine = champStore.laneChamps[champStore.roleSelect].includes(champStore.campeoes[key].key);
      return (filtroLine && nomes.includes(filtro));
    }
  });

  return filtrados.map((item) => champStore.campeoes[item]);
});

onMounted(async () => {
  await champStore.buscaCamepoes();
  champStore.posicao();
  console.log(champStore.teste());
});
</script>
