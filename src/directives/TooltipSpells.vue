<template>
  <div class="tooltipPersonalizado d-flex flex-column gap-2">
    <div class="d-flex justify-content-between">
      <div class="d-flex gap-2">
        <img :src="`https://ddragon.leagueoflegends.com/cdn/${versao}/img/spell/${props.spell.id}.png`" :width="tamanho" :height="tamanho" class="tooltipImg">
        <span class="tooltipNome">{{ props.spell.name }}</span>
      </div>
      <span>recarga: {{ props.spell.cooldownBurn }}</span>
    </div>
    <p class="text-start">{{ props.spell.description }}</p>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, onMounted, createApp } from 'vue';
import { useHistoricoStore } from "@/stores/Historico";

const historico = useHistoricoStore();
const versao = computed(() => historico.versao.n.champion);
const tamanho = computed(() => (window.innerWidth < 768) ? 15 : 30);

const props = defineProps({
  spell: {
    required: true,
  }
});
</script>