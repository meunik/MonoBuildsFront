import { defineStore } from "pinia";
import axios from 'axios';
import moment from 'moment';

export const usePlayerStore = defineStore('Player', {
  state: () => ({
    url: '',
    versao: {},
    busca: {},
    campeoesRankd: {},
    campeoesNormal: {},
    carregando: false,
  }),

  // https://ddragon.leagueoflegends.com/cdn/13.18.1/data/pt_BR/runesReforged.json
  // https://ddragon.canisback.com/img/perk-images/Styles/7200_Domination.png

  actions: {
    async versaoLol() {
      const response = await axios.get('https://ddragon.leagueoflegends.com/realms/br.json');
      const data = response.data;
      this.versao = data;
      const url = `https://ddragon.leagueoflegends.com/cdn/${this.versao.n.champion}/data/pt_BR`;
      this.url = url;
      return url;
    },
    async urlVersao() {
      return (Object.keys(this.versao).length == 0) ? await this.versaoLol() : this.url;
    },
    async buscar(name) {
      this.carregando = true;
    //   const url = `https://op.gg/api/v1.0/internal/bypass/summoners/br/autocomplete?keyword=Boi+Doido`;
      const url = `https://www.op.gg/_next/data/cqduAPYCimnislVQrLfFZ/en_US/summoners/br/Vaca%20Maluca.json?region=br&summoner=Vaca+Maluca`;
      const response = await axios.get(url);
      const players = response.data.data;
      console.log(players);

      this.carregando = false;
    },
    async play(name) {
      this.carregando = true;
      const url = `https://www.op.gg/_next/data/cqduAPYCimnislVQrLfFZ/pt_BR/summoners/br/${name}.json`;
      const games = await axios.get(url);
      const jogos = games.data.data;

      this.carregando = false;
    },
    async listaCampeoesRankd(champId) {
      this.carregando = true;
      const url = `https://op.gg/api/v1.0/internal/bypass/summoners/br/${champId}/most-champions/rank?game_type=RANKED`;
      const games = await axios.get(url);
      const jogos = games.data.data;

      this.carregando = false;
    },
    async listaCampeoesNormal(champId) {
      this.carregando = true;
      const url = `https://op.gg/api/v1.0/internal/bypass/summoners/br/${champId}/most-champions/normal`;
      const games = await axios.get(url);
      const jogos = games.data.data;

      this.carregando = false;
    },
  }
})

function inArray(iten, array) {
  var length = array.length;
  for(var i = 0; i < length; i++) {
    if(array[i] == iten) return true;
  }
  return false;
}