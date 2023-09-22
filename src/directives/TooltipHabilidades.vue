<template>
  <div class="tooltipPersonalizado d-flex flex-column gap-2">
    <div class="d-flex justify-content-between">
      <div class="d-flex gap-2">
        <img :src="`https://ddragon.leagueoflegends.com/cdn/${versao}/img/spell/${skillName}.png`" :width="tamanho" :height="tamanho" class="tooltipImg">
        <span class="tooltipNome">{{ champ.name }}</span>
      </div>
    </div>
    <div class="d-flex flex-column">
      <span class="text-start text-p">Recarga(segundos): {{ spell.cooldownBurn }}</span>
      <span class="text-start text-p">Custo: {{ spell.costBurn }}</span>
      <span class="text-start text-p">Alcance: {{ spell.rangeBurn }}</span>
    </div>
    <div class="my-2 text-start" v-html="spell.description"></div>
    <!-- <p class="text-start">{{ champ.plaintext }}</p> -->
  </div>
</template>

<script setup>
import { ref, computed, defineProps, onMounted, createApp } from 'vue';
import { useHistoricoStore } from "@/stores/Historico";

const historico = useHistoricoStore();
const champ = computed(() => historico.campeao);
const spell = computed(() => historico.campeao.spells[props.skill]);
const versao = computed(() => historico.versao.n.champion);
const tamanho = computed(() => (window.innerWidth < 768) ? 15 : 30);

const props = defineProps({
  skillName: {
    required: true,
  },
  skill: {
    required: true,
  },
});
</script>