<template>
  <div class="divLogo">
    <router-link :to="`/campeoes`" class="logo" aria-label="Mono Builds">
      <img src="/Mono-Builds.png" :width="274" :height="50" alt="Mono Builds" class="item">
    </router-link>
  </div>
  <router-view></router-view>
</template>

<style>
.divLogo {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}
.logo {
  font-size: 25px;
  font-weight: 600;
}
</style>
