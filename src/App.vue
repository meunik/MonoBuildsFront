<template>
  <router-link :to="`/campeoes`" class="logo" aria-label="Mono Builds">
    <img src="/Mono-Builds.png" :width="274" :height="50" alt="Mono Builds" class="item">
  </router-link>
  <router-view></router-view>
</template>

<style>
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  font-size: 25px;
  font-weight: 600;
}
</style>
