<template>
  <Menu />
  <router-view></router-view>
  <Rodape />
</template>

<script setup>
import { createApp } from 'vue';
import Menu from "@/components/Menu.vue";
import Rodape from "@/components/Rodape.vue";

const app = createApp({});
app.component('Menu', Menu);
app.component('Rodape', Menu);

</script>
