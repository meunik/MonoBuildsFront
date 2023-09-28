<template>
  <div class="d-flex align-items-center justify-content-between mb-32 gap-2 gap-md-0">
    <div class="divLogo">
      <router-link :to="`/campeoes`" class="logo" aria-label="Mono Builds">
        <img src="/Mono-Builds.png" :width="logoWidth" :height="logoHeight" alt="Mono Builds" class="item">
      </router-link>
    </div>
    <div class="d-flex align-items-center justify-content-center gap-1 gap-md-4">
      <router-link :to="`/campeoes`" class="routeBtn">
        Campeoes
      </router-link>
      <!-- <input type="text" class="input-sm" v-model="nickname">
      <button class="routeBtn" @click="buscarPlayer()">Buscar</button>
      <div class="listaPlayers d-none"></div> -->
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { usePlayerStore } from "@/stores/Player";
const player = usePlayerStore();

let nickname = ref('');
const logoWidth = computed(() => (window.innerWidth < 768) ? 137 : 274);
const logoHeight = computed(() => (window.innerWidth < 768) ? 25 : 50);

const buscarPlayer = () => {
  if (nickname.value.length > 2) {
    // console.log(nickname.value);
    player.buscar(nickname.value);
  }
};
</script>
  