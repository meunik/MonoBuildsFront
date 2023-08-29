<script setup>
import { ref } from 'vue'

import { useHistoricoStore } from "@/stores/Historico";
const historico = useHistoricoStore();
// historico.fill();
historico.summoners();
console.log(historico);

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <h6>{{ historico.listaItens }}</h6>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
