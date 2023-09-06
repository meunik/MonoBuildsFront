<template>
  <div>
    <div>
      <router-link :to="`/campeoes`">
        Campeoes
      </router-link>
    </div>
    <div v-for="lista in historico.listaItens" :key="lista.id" class="monochamp">
      <div class="icones">
        <img v-if="lista.campeaoNameId" :src="`https://opgg-static.akamaized.net/meta/images/lol/champion/${lista.campeaoNameId}.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto,f_webp,w_160&amp;v=1693294894548`" width="48" :alt="lista.campeaoName" height="48" class="icone">
        <img v-if="lista.icon" :src="lista.icon" width="48" alt="icone do invocador" height="48" class="icone">
        <a :href="`https://www.op.gg/summoners/br/${lista.name}`" target="_blank" class="nome">{{ lista.name }}</a>
      </div>
      <div class="icones">
        <img v-if="lista.item0" :src="`https://opgg-static.akamaized.net/meta/images/lol/item/${lista.item0}.png?image=q_auto,f_webp,w_64&v=1693294894548`" width="48" alt="Primeiro item" height="48" class="item">
        <img v-if="lista.item1" :src="`https://opgg-static.akamaized.net/meta/images/lol/item/${lista.item1}.png?image=q_auto,f_webp,w_64&v=1693294894548`" width="48" alt="Primeiro item" height="48" class="item">
        <img v-if="lista.item2" :src="`https://opgg-static.akamaized.net/meta/images/lol/item/${lista.item2}.png?image=q_auto,f_webp,w_64&v=1693294894548`" width="48" alt="Primeiro item" height="48" class="item">
        <img v-if="lista.item3" :src="`https://opgg-static.akamaized.net/meta/images/lol/item/${lista.item3}.png?image=q_auto,f_webp,w_64&v=1693294894548`" width="48" alt="Primeiro item" height="48" class="item">
        <img v-if="lista.item4" :src="`https://opgg-static.akamaized.net/meta/images/lol/item/${lista.item4}.png?image=q_auto,f_webp,w_64&v=1693294894548`" width="48" alt="Primeiro item" height="48" class="item">
        <img v-if="lista.item5" :src="`https://opgg-static.akamaized.net/meta/images/lol/item/${lista.item5}.png?image=q_auto,f_webp,w_64&v=1693294894548`" width="48" alt="Primeiro item" height="48" class="item">
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUpdated } from 'vue'
import { useHistoricoStore } from "@/stores/Historico";
import { useRoute } from "vue-router";

const route = useRoute();
const historico = useHistoricoStore();
const champ = route.params.champ;

onMounted(() => {
  historico.summoners(champ);
})
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
.monochamp {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  margin: 10px 0px;
}
.nome {
  font-weight: 600;
  font-size: 23px;
  margin-right: 50px;
  margin-left: 20px;
}
.icones {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}
.icone {
  border-radius: 10px;
}
.item {
  border-radius: 10px;
}
</style>
