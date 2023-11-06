<template>
  <tr class="tds-sm">
    <td>
      <div class="d-flex justify-content-center align-items-center gap-lg-1">
        <div class="iconesCenter">
          <img v-if="line.champ" :src="`http://ddragon.leagueoflegends.com/cdn/${versao}/img/champion/${line.champ}.png`" :width="tamanho" :height="tamanho" class="icone">
        </div>
        <div class="runas text-color">
          <img
            v-hover="{
              component: TooltipRunas,
              props: { id: line.rune.primary_rune_id, runas: runas }
            }"
            :src="`${runasUrlBase}${runas[line.rune.primary_rune_id].icon}`"
            :width="(tamanho/2)"
            :height="(tamanho/2)"
          >
          <img
            v-hover="{
              component: TooltipRunas,
              props: { id: line.rune.secondary_page_id, runas: runasPags }
            }"
            :src="`${runasUrlBase}${runasPags[line.rune.secondary_page_id].icon}`"
            :width="(tamanho/2)"
            :height="(tamanho/2)"
          >
        </div>
        <div class="runas text-color">
          <img
            v-hover="{ component: TooltipSpells, props: { spell: line.spells.d } }"
            :src="`http://ddragon.leagueoflegends.com/cdn/${versao}/img/spell/${line.spells.d.id}.png`"
            :width="(tamanho/2)"
            :height="(tamanho/2)"
            class="spells"
          >
          <img
            v-hover="{ component: TooltipSpells, props: { spell: line.spells.f } }"
            :src="`http://ddragon.leagueoflegends.com/cdn/${versao}/img/spell/${line.spells.f.id}.png`"
            :width="(tamanho/2)"
            :height="(tamanho/2)"
            class="spells"
          >
        </div>
      </div>
    </td>
    <td class="nomeTd tdPadding-sm">
      <a
        :href="`https://www.op.gg/summoners/br/${line.summoner.name}`"
        target="_blank"
        class="nome nome-md tresPontinhos-sm max-w-sm-38"
      >
        {{ line.summoner.name }}
      </a>
    </td>
    <td class="">
      <div class="text-color">
        <img :src="champStore.roles[line.position].img" :width="(tamanho/2)+5" :height="(tamanho/2)+5">
      </div>
    </td>
    <td class="">
      <div class="text-color">
        <img :src="line.tier_info.tier_image_url" :width="tamanho" :height="tamanho" class="icone">
      </div>
    </td>
    <td class="text-color">
      <div class="white-space-nowrap">
        <span class="text-info text-sm-sm">{{ line.stats.kill }}</span>
        <span> / </span>
        <span class="text-danger text-sm-sm">{{ line.stats.death }}</span>
        <span> / </span>
        <span class="text-warning text-sm-sm">{{ line.stats.assist }}</span>
      </div>
    </td>
    <td class="text-color">
      <div class="white-space-nowrap">
        <span class="text-success text-sm-sm">{{ line.stats.minion_kill }}</span>
      </div>
    </td>
    <td class="">
      <div class="d-flex flex-column align-items-center justify-content-center gap-1">
        <div class="d-flex flex-column align-items-center justify-content-center gap-1">
          <span class="text-danger text-sm d-none-sm">{{ dano(line.champion_id).dano }}</span>
          <div class="progress progressBarr" :style="`width: ${tamanhoBarr}px;`">
            <div class="progress-bar bg-danger" role="progressbar" :style="`width: ${dano(line.champion_id).porcent}%`"></div>
          </div>
        </div>
        <div class="d-flex flex-column align-items-center justify-content-center gap-1">
          <div class="progress progressBarr" :style="`width: ${tamanhoBarr}px;`">
            <div class="progress-bar bg-warning" role="progressbar" :style="`width: ${tank(line.champion_id).porcent}%`"></div>
          </div>
          <span class="text-warning-emphasis text-sm d-none-sm">{{ tank(line.champion_id).dano }}</span>
        </div>
      </div>
    </td>
    <td>
      <div class="iconesCenter">
        <template v-for="(item, index) in line.items" :key="index">
          <img
            v-if="item != 0"
            v-hover="{ component: TooltipItens, props: { itemId: item } }"
            :src="`http://ddragon.leagueoflegends.com/cdn/${versao}/img/item/${item}.png`"
            :width="tamanho"
            :height="tamanho"
            class="item"
          >
          <div v-else class="semItem item" :style="`width: ${tamanho}px; height: ${tamanho}px;`"></div>
        </template>
        <img
          v-if="line.trinket_item"
          v-hover="{ component: TooltipItens, props: { itemId: line.trinket_item } }"
          :src="`http://ddragon.leagueoflegends.com/cdn/${versao}/img/item/${line.trinket_item}.png`"
          :width="tamanho/1.5"
          :height="tamanho/1.5"
          class="trinket"
        >
        <div v-else class="semItem trinket" :style="`width: ${tamanho/1.5}px; height: ${tamanho/1.5}px;`"></div>
      </div>
    </td>
  </tr>
</template>

<script setup>
import { ref, computed, defineProps, onMounted, proxyRefs } from 'vue';
import { useHistoricoStore } from "@/stores/Historico";
import { useCampeoesStore } from "@/stores/Campeoes";
import TooltipItens from "@/directives/TooltipItens.vue";
import TooltipSpells from "@/directives/TooltipSpells.vue";
import TooltipRunas from "@/directives/TooltipRunas.vue";
import moment from 'moment';

const historico = useHistoricoStore();
const champStore = useCampeoesStore();

const props = defineProps({
  line: {
    required: true,
  },
  teams: {
    required: true,
  }
});

const runas = computed(() => historico.runas);
const runasPags = computed(() => historico.runasPags);
const runasUrlBase = computed(() => historico.runasUrlBase);

const tamanhoBarr = computed(() => (window.innerWidth < 768) ? 25 : 40);
const tamanho = computed(() => (window.innerWidth < 768) ? 15 : 60);
const sm = computed(() => (window.innerWidth < 768) ? true : false);
const versao = computed(() => historico.versao.n.champion);

const dano = (id) => {
  let topDamage = 0;
  let damage = 0;
  props.teams.forEach(player => {
    if (topDamage < player.stats.total_damage_dealt_to_champions) topDamage = player.stats.total_damage_dealt_to_champions;
    if (id == player.champion_id) damage = player.stats.total_damage_dealt_to_champions;
  });
  return {
    dano: damage,
    porcent: (damage/topDamage)*100,
  };
};

const tank = (id) => {
  let topDamage = 0;
  let damage = 0;
  props.teams.forEach(player => {
    if (topDamage < player.stats.total_damage_taken) topDamage = player.stats.total_damage_taken;
    if (id == player.champion_id) damage = player.stats.total_damage_taken;
  });
  return {
    dano: damage,
    porcent: (damage/topDamage)*100,
  };
};
</script>
      