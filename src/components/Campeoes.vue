<script setup>
import { computed, onMounted } from 'vue'
import { useHistoricoStore } from "@/stores/Historico";
import { useRoute } from "vue-router";

const route = useRoute();
const historico = useHistoricoStore();
const champ = route.params.champ;

onMounted(() => {
  historico.buscaCamepoes();
})
</script>

<template>
  <div class="container">
    <div v-for="campeao in historico.campeoes" :key="campeao.key" class="divItem">
      <router-link :to="`/mono/${campeao.id}`" data-toggle="tooltip" data-placement="top" :title="campeao.name">
        <img :src="`http://ddragon.leagueoflegends.com/cdn/13.17.1/img/champion/${campeao.image.full}`" width="48" :alt="campeao.id" height="48">
      </router-link>
    </div>
  </div>
</template>

<style scoped>

  .container {
    display: flex;
    flex-wrap: wrap;
  }
  .divItem {
    padding: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
