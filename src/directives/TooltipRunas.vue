<template>
  <div class="tooltipPersonalizado d-flex flex-column gap-2">
    <div class="d-flex justify-content-between">
      <div class="d-flex gap-2">
        <img
          :src="`${runasUrlBase}${runas[id].icon}`"
          :width="tamanho"
          :height="tamanho"
          class="tooltipImg"
        >
        <span class="tooltipNome">{{ runas[id].name }}</span>
      </div>
    </div>
    <div class="my-2 text-start" v-html="runas[id].longDesc"></div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, onMounted, createApp } from 'vue';
import { useHistoricoStore } from "@/stores/Historico";

const historico = useHistoricoStore();
const runasUrlBase = computed(() => historico.runasUrlBase);
const versao = computed(() => historico.versao.n.champion);
const tamanho = computed(() => (window.innerWidth < 768) ? 15 : 30);

const props = defineProps({
  id: {
    required: true,
  },
  runas: {
    required: true,
  },
});
</script>