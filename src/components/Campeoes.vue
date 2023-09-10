<script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useHistoricoStore } from "@/stores/Historico";
  import { useRoute } from "vue-router";

  const route = useRoute();
  const historico = useHistoricoStore();
  const champ = route.params.champ;

  const campeoes = computed(() => {
    const filtro = historico.filtroCampeoes.toLowerCase();
    const filtrados = Object.keys(historico.campeoes).filter((key) => {
      const nomes = historico.campeoes[key].name.toLowerCase();
      return nomes.includes(filtro);
    });
    return filtrados.map((item) => historico.campeoes[item]);
    // let teste = filtrados.map((item) => historico.campeoes[item]);
    // console.log(teste);
    // return teste
  });

  onMounted(async () => {
    await historico.buscaCamepoes();
  });
</script>

<template>
  <div>
    <input type="text" class="filtroCampeoes" v-model="historico.filtroCampeoes">
    <div class="container">
      <div v-for="campeao in campeoes" :key="campeao.key" class="divItem">
        <router-link :to="`/mono/${campeao.id}`" data-toggle="tooltip" data-placement="top" :title="campeao.name">
          <img :src="`http://ddragon.leagueoflegends.com/cdn/13.17.1/img/champion/${campeao.image.full}`" width="48" :alt="campeao.id" height="48">
        </router-link>
      </div>
    </div>
  </div>
</template>



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
  .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
  .divItem {
    padding: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
