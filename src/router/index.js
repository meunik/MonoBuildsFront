import { createRouter, createWebHistory } from "vue-router";

import Monos from '@/components/Monos.vue';
import Campeoes from '@/components/Campeoes.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/campeoes',
    },
    {
      path: '/campeoes',
      name: 'Campeoes',
      component: Campeoes,
    },
    {
      path: '/mono/:champ',
      name: 'Monos',
      component: Monos,
    }
  ],
})

export default router
