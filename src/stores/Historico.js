import { defineStore } from "pinia";
import axios from 'axios';
import moment from 'moment';
import arquivoItensRiot from "@/Utils/itens.json";

export const useHistoricoStore = defineStore('Historico', {
  state: () => ({
    url: '',
    versao: {},
    listaItens: {},
    lista: [],
    limit: 10,
    limitHistorico: 10,
    carregandoMais: false,
    carregandoMaisHistorico: false,
    carregandoHistoricoSkills: false,
    btnMais: true,
    btnMaisHistorico: true,
    campeoes: {},
    campeao: {},
    runasUrlBase: 'https://ddragon.canisback.com/img/',
    runasPags: {},
    runas: {},
    itensRiot: {},
    todosItens: [],
    itensCompletos: [],
    itensNaoCompletos: [
      1001, 1004, 1006, 1011, 1018, 1026, 1027, 1028, 1029, 1031, 1033, 1036, 1037, 1038, 1042, 1043, 1052, 1053, 1057, 1058, 2003, 2015, 2019, 2031, 2138, 2139, 2140, 2420, 2421, 1516, 1517, 1518, 1519, 3012, 3023, 3024, 3035, 3044, 3051, 3057, 3066, 3067, 3070, 3076, 3077, 3082, 3086, 3105, 3108, 3113, 3114, 3123, 3133, 3134, 3140, 3145, 3155, 3191, 3211, 3801, 3802, 3803, 3916, 4630, 4632, 4642, 6029, 6660, 6670, 6677, 1083, 1055
    ],
    itensSup: [3860, 3850, 3851, 3853, 3854, 3855, 3857, 3858, 3859],
    itensBotas: [3006, 3009, 3020, 3047, 3111, 3117, 3158],
    itensMiticos: [
      2065, 6617, 6620, 3001, 3190, 6667, 4644, 6656, 6657, 6662, 6691, 3156, 6692, 6653, 6655, 4636, 3152, 4633, 3124, 6630, 6665, 3084, 6631, 6632, 3078, 6671, 6675, 3031, 3142
    ],
    itensRiot: {},
    spells: {},
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
    async buscaCamepoes() {
      const url = await this.urlVersao();
      const response = await axios.get(`${url}/champion.json`);
      const data = response.data;
      this.campeoes = data.data;
      return data.data;
    },
    async buscaCampeao(champ) {
      const url = await this.urlVersao();
      const response = await axios.get(`${url}/champion/${champ}.json`);
      const data = response.data;
      const campeaoObj = data.data[champ];
      this.campeao = campeaoObj;
      // console.log(JSON.parse(JSON.stringify(campeaoObj)));
    },
    async buscaRunas() {
      const url = await this.urlVersao();
      const response = await axios.get(`${url}/runesReforged.json`);
      const data = response.data;
      let runasPagsObj = {};
      let runasObj = {};

      for (const runas of data) {
        runasPagsObj[runas.id] = runas;
        for (const slot of runas.slots) {
          let runaObj = {};
          for (const runa of slot.runes) {
            runaObj[runa.id] = runa;
            runasObj[runa.id] = runa;
          }
          slot.runes = runaObj;
        }
      }
      this.runasPags = runasPagsObj;
      this.runas = runasObj;
      // console.log(JSON.parse(JSON.stringify(runasPagsObj)));
      // console.log(JSON.parse(JSON.stringify(runasObj)));
    },
    async buscaItensCompletos() {

      let numerosItens = [];

      for (const key in arquivoItensRiot) {
          if (arquivoItensRiot.hasOwnProperty(key) && arquivoItensRiot[key].mItems) {
              const itemArray = arquivoItensRiot[key].mItems;

              itemArray.forEach(item => {
                  const numeroItem = item.match(/\d+/);

                  if (numeroItem) {
                    const numeroInteiro = parseInt(numeroItem[0], 10);
                    if (!numerosItens.includes(numeroInteiro)) {
                      numerosItens.push(numeroInteiro);
                    }
                  }
              });
          }
      }
      
      this.itensCompletos = numerosItens.filter(item => !this.itensNaoCompletos.includes(item));
      // this.itensCompletos = this.todosItens.filter(item => !this.itensNaoCompletos.includes(item));
    },
    async buscaSpells() {
      const url = await this.urlVersao();
      const response = await axios.get(`${url}/summoner.json`);
      const data = response.data;
      const spellObj = data.data;

      Object.keys(spellObj).forEach(key => {
        this.spells = {
          ...this.spells,
          [spellObj[key].key]: spellObj[key]
        }
      });
      // console.log(JSON.parse(JSON.stringify(this.spells)));
    },
    async buscaItens() {
      const url = await this.urlVersao();
      const response = await axios.get(`${url}/item.json`);
      const data = response.data;
      const itensObj = data.data;
      this.itensRiot = itensObj;
      // console.log(JSON.parse(JSON.stringify(itensObj)));
    },

    async maisSummoners(champ) {
      this.carregandoMais = true;

      try {
        if (Object.keys(this.versao).length == 0) await this.versaoLol();
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

      this.carregandoMaisHistorico = false;
      return await this.matchup(jogos, true);
    },

    async summoners(champ) {
      this.carregandoMais = true;
      this.btnMais = true;
      this.limit = 10;
      this.listaItens = {};
      await this.versaoLol();
      await this.buscaCamepoes();
      await this.buscaCampeao(champ);
      await this.buscaRunas();
      await this.buscaItensCompletos();
      await this.buscaSpells();
      await this.buscaItens();
      
      const url = `https://op.gg/api/v1.0/internal/bypass/rankings/br/champions/${champ}?&hl=pt_BR&limit=${this.limit}`;
      const games = await axios.get(url);
      const monos = games.data.data;

      monos.forEach(async mono => await this.listando(mono));

      this.carregandoMais = false;
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
        name: summoner.game_name,
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

        // usar quando tiver itens míticos, são itens principáis e únicos
        // if (inArray(valor.item, this.itensMiticos)) {
        //   if (mitico > 0) return false;
        //   else mitico = 1;
        // }

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

          // usar quando tiver itens míticos, são itens principáis e únicos
          // if (inArray(valor.item, this.itensMiticos)) {
          //   if (mitico > 0) return false;
          //   else mitico = 1;
          // }

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

      let listarItens = {};
      for (const key in itensArray) listarItens[`item${key}`] = itensArray[key].item;
      
      this.listaItens[key] = {
        ...this.listaItens[key],
        ...listarItens
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

      return jogosAtualizados;
    },
    async ajustesInfo(jogos, mais) {
      let porLines = {
        BLUE:{
          TOP: {},
          JUNGLE: {},
          MID: {},
          ADC: {},
          SUPPORT: {},
        },
        RED:{
          TOP: {},
          JUNGLE: {},
          MID: {},
          ADC: {},
          SUPPORT: {},
        },
      };

      const jogosAtualizados = await Promise.all(jogos.map(async (jogo) => {
        const tempo = moment(jogo.created_at).fromNow(true);
    
        let campeaoKey = Object.keys(this.campeoes).find(item => this.campeoes[item].key == jogo.champion_id);
    
        let ajustado = {
          ...jogo,
          spells: {
            d: this.spells[jogo.spells[0]],
            f: this.spells[jogo.spells[1]]
          },
          btnMaisHistorico: true,
          champ: this.campeoes[campeaoKey].id,
          tempo: tempo
        };

        porLines[jogo.team_key][jogo.position] = ajustado;
        return ajustado;
      }));
    
      return porLines;
    },
    
    async buscaEventos(champId, createdAt, participanteId) {
      this.carregandoHistoricoSkills = true;
      const data = encodeURIComponent(createdAt);
      const response = await axios.get(`https://op.gg/api/v1.0/internal/bypass/games/br/analysis/${champId}=?created_at=${data}`);
      const events = response.data.data;
      const frames = events.timeline.frames;
      let skils = [];
      let build = {};

      await frames.forEach(async frame => {
        const tempo = frame.timestamp;
        build = { ...build, [tempo]: [] };

        await frame.events.forEach(event => {
          if (event.participant_id == participanteId) {
            if (event.type == "ITEM_PURCHASED") build[tempo].push(event.item_id);
            if (event.type == "SKILL_LEVEL_UP") skils.push(event.skill_slot);
          }
        });
      });

      Object.keys(build).forEach(key => { if (build[key].length == 0) delete build[key]; });

      // console.log(skils);
      // console.log(build);

      this.carregandoHistoricoSkills = false;
      return { skils: skils, build: build };
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