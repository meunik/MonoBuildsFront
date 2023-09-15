import { defineStore } from "pinia";
import axios from 'axios';
import moment from 'moment';

export const useHistoricoStore = defineStore('Historico', {
  state: () => ({
    versao: {},
    listaItens: {},
    lista: [],
    limit: 10,
    limitHistorico: 10,
    carregandoMais: false,
    carregandoMaisHistorico: false,
    btnMais: true,
    btnMaisHistorico: true,
    campeoes: {},
    itensRiot: {},
    todosItens: [
      1001, 1004, 1006, 1011, 1018, 1026, 1027, 1028, 1029, 1031, 1033, 1036, 1037, 1038, 1042, 1043, 1052, 1053, 1057, 1058, 2003, 6695, 6662, 2015, 2031, 6609, 6664, 6694, 2065, 2138, 2139, 2140, 6676, 6675, 2420, 2421, 6677, 6656, 6660, 3001, 3003, 3006, 3009, 3011, 3020, 3024, 3031, 3033, 3035, 3036, 6655, 6632, 6653, 3044, 3046, 3047, 3050, 3051, 3053, 3057, 3065, 3066, 3067, 3068, 3070, 3071, 3072, 3074, 3075, 3076, 3077, 3078, 3082, 3083, 3085, 3086, 3089, 3091, 3094, 3095, 3100, 3102, 3105, 3107, 3108, 3109, 3110, 3111, 3113, 3114, 3115, 3116, 3117, 3123, 3124, 3133, 3134, 3135, 3139, 3140, 3142, 3143, 3145, 3152, 3153, 3155, 3156, 3157, 3158, 3165, 3179, 6333, 3190, 3191, 3193, 6693, 3211, 3222, 6630, 6631, 6692, 3504, 3508, 6671, 6670, 6691, 3742, 3748, 3801, 3802, 3814, 3004, 6673, 6672, 3916, 4005, 4401, 4628, 4629, 4630, 4632, 4633, 4635, 4636, 4637, 4642, 6029, 6035, 6616, 6617, 1516, 1517, 1518, 1519, 8001, 6696, 3119, 3121, 8020, 4644, 4645, 6665, 3161, 6667, 3803, 6657, 3084, 3087, 3023, 3012, 6620, 2019, 
      3862, 3863, 3864, 3860, 3850, 3851, 3853, 3854, 3855, 3857, 3858, 3859, 4638, 4643
    ],
    itensCompletos: [],
    itensNaoCompletos: [
      1001, 1004, 1006, 1011, 1018, 1026, 1027, 1028, 1029, 1031, 1033, 1036, 1037, 1038, 1042, 1043, 1052, 1053, 1057, 1058, 2003, 2015, 2019, 2031, 2138, 2139, 2140, 2420, 2421, 1516, 1517, 1518, 1519, 3012, 3023, 3024, 3035, 3044, 3051, 3057, 3066, 3067, 3070, 3076, 3077, 3082, 3086, 3105, 3108, 3113, 3114, 3123, 3133, 3134, 3140, 3145, 3155, 3191, 3211, 3801, 3802, 3803, 3916, 4630, 4632, 4642, 6029, 6660, 6670, 6677
    ],
    itensSup: [3860, 3850, 3851, 3853, 3854, 3855, 3857, 3858, 3859],
    itensBotas: [3006, 3009, 3020, 3047, 3111, 3117, 3158],
    itensMiticos: [
      2065, 6617, 6620, 3001, 3190, 6667, 4644, 6656, 6657, 6662, 6691, 3156, 6692, 6653, 6655, 4636, 3152, 4633, 3124, 6630, 6665, 3084, 6631, 6632, 3078, 6671, 6675, 3031, 3142
    ],
    spells: {
      1: 'SummonerBoost',
      3: 'SummonerExhaust',
      4: 'SummonerFlash',
      6: 'SummonerHaste',
      7: 'SummonerHeal',
      11: 'SummonerSmite',
      12: 'SummonerTeleport',
      14: 'SummonerDot',
      21: 'SummonerBarrier',
    }
  }),

  actions: {
    async versaoLol() {
      const response = await axios.get('https://ddragon.leagueoflegends.com/realms/br.json');
      const data = response.data;
      this.versao = data;
      return data;
    },
    async buscaCamepoes() {
      await this.versaoLol();
      const response = await axios.get(`https://ddragon.leagueoflegends.com/cdn/${this.versao.n.champion}/data/pt_BR/champion.json`);
      const data = response.data;
      this.campeoes = data.data;
      return data.data;
    },
    async buscaItensCompletos() {
      this.itensCompletos = this.todosItens.filter(item => !this.itensNaoCompletos.includes(item));
    },

    async maisSummoners(champ) {
      this.carregandoMais = true;

      try {
        await this.versaoLol();
        await this.buscaCamepoes();
        await this.buscaItensCompletos();
  
        const limitAnterior = this.limit - 1;
        this.limit = this.limit + 10;
        
        const url = `https://op.gg/api/v1.0/internal/bypass/rankings/br/champions/${champ}?&hl=pt_BR&limit=${this.limit}`;
        const games = await axios.get(url);
        const monos = games.data.data;

        monos.forEach(async (mono, index) => {if (index > limitAnterior) await this.listando(mono)});
  
        // console.log(JSON.parse(JSON.stringify(this.listaItens)));
      } catch (error) {
        console.error(error);
        this.btnMais = false;
      }

      this.carregandoMais = false;
    },
    async maisHistorico(summonerId, data, champId) {
      this.carregandoMaisHistorico = true;
      const url = `https://op.gg/api/v1.0/internal/bypass/games/br/summoners/${summonerId}?&ended_at=${data}&limit=20&hl=pt_BR&game_type=soloranked&champion=${champId}`;
      const games = await axios.get(url);
      const jogos = games.data.data;

      return await this.matchup(jogos, true);
    },

    async summoners(champ) {
      this.btnMais = true;
      this.limit = 10;
      this.listaItens = {};
      await this.versaoLol();
      await this.buscaCamepoes();
      await this.buscaItensCompletos();
      
      const url = `https://op.gg/api/v1.0/internal/bypass/rankings/br/champions/${champ}?&hl=pt_BR&limit=${this.limit}`;
      const games = await axios.get(url);
      const monos = games.data.data;

      monos.forEach(async mono => await this.listando(mono));

      // console.log(JSON.parse(JSON.stringify(this.listaItens)));
    },
    async listando(player) {
      const stat = player.most_champion_stat;
      const summoner = player.summoner;

      const key = Object.keys(this.campeoes).filter((key) => this.campeoes[key].key == stat.id);
      const campeao = this.campeoes[key];

      this.listaItens[summoner.internal_name] = {
        id: summoner.id,
        summoner_id: summoner.summoner_id,
        internal_name: summoner.internal_name,
        name: summoner.name,
        campeaoNameId: campeao.id,
        campeaoId: campeao.key,
        campeaoName: campeao.name,
        soloQ: (summoner.league_stats.length > 0)?summoner.league_stats[0]: null,
        flex: (summoner.league_stats.length > 1)?summoner.league_stats[1]:null,
        icon: summoner.profile_image_url,
        play: stat.play,
        win: stat.win,
        lose: stat.lose
      };
      await this.historico(summoner.summoner_id, summoner.internal_name, stat.id);
    },
    async historico(summonerId, key, champId, html = false) {
      if (html) this.carregando = true;
      const url = `https://op.gg/api/v1.0/internal/bypass/games/br/summoners/${summonerId}?&limit=20&hl=pt_BR&game_type=soloranked&champion=${champId}`;
      const games = await axios.get(url);
      const jogos = games.data.data;

      if (html) return await this.matchup(jogos);
      
      if (jogos.length > 0) {
        await this.itens(jogos, key);
        this.lista.push(jogos);
      } else delete this.listaItens[key];
    },
    async itens(jogos, key) {
      let itens = {};

      jogos.forEach(jogo => {
        jogo.myData.items.forEach(item => {
          itens[item] = itens[item] ? itens[item]+1 : 1;
        });
      });

      delete itens["0"];

      let bota = 0;
      let mitico = 0;
      let sup = 0;
      
      let itensArrayTodos = Object.entries(itens).map(([item, quantidade]) => ({item, quantidade}));
      let itensArray = itensArrayTodos.filter(valor => inArray(valor.item, this.itensCompletos));

      itensArray.sort((a, b) => b.quantidade - a.quantidade);

      itensArray = itensArray.filter(valor => {
        if (inArray(valor.item, this.itensBotas)) {
          if (bota > 0) return false;
          else bota = 1;
        }

        if (inArray(valor.item, this.itensMiticos)) {
          if (mitico > 0) return false;
          else mitico = 1;
        }

        if (inArray(valor.item, this.itensSup)) {
          if (sup > 0) return false;
          else sup = 1;
        }

        return true;
      });

      if (itensArray.length < 6) {
        itensArrayTodos = itensArrayTodos.sort((a, b) => b.quantidade - a.quantidade);

        let somenteItensId = [];
        itensArray.forEach(obj => somenteItensId.push(obj.item));

        let itensRestantes = itensArrayTodos.filter(valor => !inArray(valor.item, somenteItensId));
        
        itensRestantes = itensRestantes.filter(valor => {
          if (inArray(valor.item, this.itensBotas)) {
            if (bota > 0) return false;
            else bota = 1;
          }

          if (inArray(valor.item, this.itensMiticos)) {
            if (mitico > 0) return false;
            else mitico = 1;
          }

          if (inArray(valor.item, this.itensSup)) {
            if (sup > 0) return false;
            else sup = 1;
          }

          return true;
        });

        for (let i = itensArray.length; i < 6; i++) {
          if (itensRestantes && itensRestantes[i]) itensArray.push(itensRestantes[i]);
        }
      }

      const topSix = itensArray;
      const topSixItens = [];
      
      for (const obj in topSix) topSixItens[`item${obj}`] = topSix[obj].item;
      
      this.listaItens[key] = {
        ...this.listaItens[key],
        ...topSixItens
      };
    },
    
    async matchup(jogos, mais) {
      const jogosAtualizados = await Promise.all(jogos.map(async (jogo) => {
        const tempo = moment(jogo.created_at).fromNow(true);
        let monoId = jogo.myData.participant_id;
        let position = jogo.myData.position;

        let campeaoKey = Object.keys(this.campeoes).find(item => this.campeoes[item].key == jogo.myData.champion_id);
        let match = { pro: this.campeoes[campeaoKey].id, contra: 0 };
    
        await jogo.participants.forEach(e => {
          if (e.position == position && e.participant_id != monoId) {
            campeaoKey = Object.keys(this.campeoes).find(item => this.campeoes[item].key == e.champion_id);
            match.contra = this.campeoes[campeaoKey].id;
          }
        });
    
        return {
          ...jogo,
          spells: {
            d: this.spells[jogo.myData.spells[0]],
            f: this.spells[jogo.myData.spells[1]]
          },
          btnMaisHistorico: true,
          matchup: match,
          tempo: tempo
        };
      }));

      // console.log(jogosAtualizados);
      if (mais) this.carregandoMaisHistorico = false;
      else this.carregando = false;

      return jogosAtualizados;
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