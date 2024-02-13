<template>
  <div class="tooltipPersonalizado d-flex flex-column gap-2">
    <div class="d-flex justify-content-between">
      <div class="d-flex gap-2">
        <img :src="`https://ddragon.leagueoflegends.com/cdn/${versao}/img/item/${props.itemId}.png`" :width="tamanho" :height="tamanho" class="tooltipImg">
        <span class="tooltipNome">{{ item.name }}</span>
      </div>
      <span>Custo: {{ item.gold.total }}</span>
    </div>
    <div class="my-2" v-html="item.description"></div>
    <p class="text-start">{{ item.plaintext }}</p>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, onMounted, createApp } from 'vue';
import { useHistoricoStore } from "@/stores/Historico";

const historico = useHistoricoStore();
const item = computed(() => historico.itensRiot[props.itemId]);
const versao = computed(() => historico.versao.n.champion);
const tamanho = computed(() => (window.innerWidth < 768) ? 15 : 30);

const props = defineProps({
  itemId: {
    required: true,
  }
});
onMounted(() => {
  console.log(props.itemId);
});
</script>