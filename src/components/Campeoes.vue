<template>
  <div>
    <input type="text" class="filtroCampeoes" v-model="champStore.filtroCampeoes">

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
  });
</script>

<style>
  input {
    background: transparent;
    color: #e8e6e3;
    border: 1px solid #ffffff50;
    padding: 5px 10px;
    border-radius: 20px;
  }
  .filtroCampeoes {
    margin-bottom: 10px;
  }
  .containerChamp {
    max-width: 800px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 5px;
  }
  .containerLine {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .divlines {
    padding: 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .linesBtn {
    padding: 5px;
    border-radius: 0px;
  }
  .primeiro {
    border-radius: 8px 0px 0px 8px;
  }
  .ultimo {
    border-radius: 0px 8px 8px 0px;
  }

  .imgChamp {
    border: 0;
    vertical-align: middle;
    max-width: 100%;
  }
  .divChamp {
    padding: 5px;
    position: relative;
    display: block;
    color: #d8b776;
  }
  .divChamp:hover {
    color: #24b2ba;
  }
  .spanChamp {
    display: block;
    width: 46px;
    line-height: 14px;
    font-size: 12px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-top: 2px;
    height: 16px;
  }
</style>
