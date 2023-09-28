<template>
  <Menu />
  <router-view></router-view>
</template>

<script setup>
import { createApp } from 'vue';
import Menu from "@/components/Menu.vue";

const app = createApp({});
app.component('Menu', Menu);

</script>
