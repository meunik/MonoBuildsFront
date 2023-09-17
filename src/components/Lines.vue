<template>
  <tr>
    <td>
      <div class="d-flex justify-content-center align-items-center gap-1">
        <div class="iconesCenter">
          <img v-if="line.champ" :src="`http://ddragon.leagueoflegends.com/cdn/${versao}/img/champion/${line.champ}.png`" :width="tamanho" :height="tamanho" class="icone">
        </div>
        <div class="runas text-color">
          <img :src="`https://opgg-static.akamaized.net/meta/images/lol/perk/${line.rune.primary_rune_id}.png?image=q_auto,f_webp,w_64&v=1694664078578`" :width="(tamanho/2)-3" :height="(tamanho/2)-3">
          <img :src="`https://opgg-static.akamaized.net/meta/images/lol/perkStyle/${line.rune.secondary_page_id}.png?image=q_auto,f_webp,w_64&v=1694664078578`" :width="(tamanho/2)-3" :height="(tamanho/2)-3">
        </div>
        <div class="runas text-color">
          <img :src="`http://ddragon.leagueoflegends.com/cdn/${versao}/img/spell/${line.spells.d}.png`" :width="(tamanho/2)-3" :height="(tamanho/2)-3" class="spells">
          <img :src="`http://ddragon.leagueoflegends.com/cdn/${versao}/img/spell/${line.spells.f}.png`" :width="(tamanho/2)-3" :height="(tamanho/2)-3" class="spells">
        </div>
      </div>
    </td>
    <td>
      <div class="text-color">
        <img :src="champStore.roles[line.position].img" :width="tamanho/2" :height="tamanho/2">
      </div>
    </td>
    <td class="text-color">
      <div class="white-space-nowrap">
        <span class="text-info">{{ line.stats.kill }}</span>
        <span> / </span>
        <span class="text-danger">{{ line.stats.death }}</span>
        <span> / </span>
        <span class="text-warning">{{ line.stats.assist }}</span>
      </div>
    </td>
    <td class="text-color">
      <div class="white-space-nowrap">
        <span class="text-success">{{ line.stats.minion_kill }}</span>
      </div>
    </td>
    <td>
      <div class="icones">
        <template v-for="(item, index) in line.items" :key="index">
          <img v-if="item != 0" :src="`http://ddragon.leagueoflegends.com/cdn/${versao}/img/item/${item}.png`" :width="tamanho" :height="tamanho" class="item">
          <div v-else class="semItem item" :style="`width: ${tamanho}px; height: ${tamanho}px;`"></div>
        </template>
      </div>
    </td>
  </tr>
</template>

<script setup>
import { ref, computed, defineProps, onMounted, proxyRefs } from 'vue';
import { useHistoricoStore } from "@/stores/Historico";
import { useCampeoesStore } from "@/stores/Campeoes";
import moment from 'moment';

const historico = useHistoricoStore();
const champStore = useCampeoesStore();

const props = defineProps({
  line: {
    required: true,
  }
});

const tamanho = computed(() => (window.innerWidth < 768) ? 25 : 60);
const sm = computed(() => (window.innerWidth < 768) ? true : false);
const versao = computed(() => historico.versao.n.champion);
</script>
      