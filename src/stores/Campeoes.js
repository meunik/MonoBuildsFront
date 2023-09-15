import { defineStore } from "pinia";
import axios from 'axios';

export const useCampeoesStore = defineStore('Campeoes', {
  state: () => ({
    versao: {},
    filtroCampeoes: '',
    laneChamps: {},
    campeoes: {},
    roles: {
      TODOS: {
        key: "TODOS",
        name: "TODOS",
        img: "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-unselected.png",
      },
      TOP: {
        key: "TOP",
        name: "TOP",
        img: "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-top.png",
      },
      JUNGLE: {
        key: "JUNGLE",
        name: "JUNGLE",
        img: "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-jungle.png",
      },
      MID: {
        key: "MIDDLE",
        name: "MID",
        img: "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-middle.png",
      },
      ADC: {
        key: "BOTTOM",
        name: "ADC",
        img: "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-bottom.png",
      },
      SUPPORT: {
        key: "SUPPORT",
        name: "SUP",
        img: "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-utility.png",
      },
    },
    roleSelect: "TODOS",
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
    async posicao() {
      try {
        const respostaEstatisticasCampeoes = await axios.get("https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-champion-statistics/global/default/rcp-fe-lol-champion-statistics.js");
        const dadosEstatisticasCampeoes = respostaEstatisticasCampeoes.data;
    
        const regex = /exports\s*=\s*JSON\.parse\('(.+?)'\)/;
        const correspondencias = regex.exec(dadosEstatisticasCampeoes);
    
        if (correspondencias && correspondencias.length > 1) {
          const objetoJSONString = correspondencias[1];
          const estatisticasFuncoes = JSON.parse(objetoJSONString);

          const todosCampeoes = {};
    
          Object.keys(estatisticasFuncoes).forEach((posicao) => {
            todosCampeoes[posicao] = Object.keys(estatisticasFuncoes[posicao]);
          });

          this.laneChamps = todosCampeoes;
        }
      } catch (erro) {
        console.error("Erro ao buscar dados:", erro);
      }
    },
    async fetchData() {
      try {
        const respostaEstatisticasCampeoes = await axios.get("https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-champion-statistics/global/default/rcp-fe-lol-champion-statistics.js");
        const dadosEstatisticasCampeoes = respostaEstatisticasCampeoes.data;

        const regex = /exports\s*=\s*JSON\.parse\('(.+?)'\)/;
        const correspondencias = regex.exec(dadosEstatisticasCampeoes);
    
        if (correspondencias && correspondencias.length > 1) {
          const objetoJSONString = correspondencias[1];
          const estatisticasFuncoes = JSON.parse(objetoJSONString);
          console.log(estatisticasFuncoes);
    
          const respostaChamadas = await axios.get("https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-summary.json");
          const dadosChamadas = respostaChamadas.data;
    
          const todasFuncoes = ["TOP", "JUNGLE", "MIDDLE", "BOTTOM", "SUPPORT"];
          const todosCampeoes = {};
    
          dadosChamadas.forEach((campeao) => {
            if (campeao.id !== -1) {
              todosCampeoes[campeao.id.toString()] = [];
    
              todasFuncoes.forEach((funcao) => {
                todosCampeoes[campeao.id.toString()][funcao] = {
                  taxaDeJogo: 0,
                };
              });
            }
          });
    
          todasFuncoes.forEach((funcao) => {
            for (const [campeao, taxa] of Object.entries(estatisticasFuncoes[funcao])) {
              todosCampeoes[campeao][funcao]['taxaDeJogo'] = parseFloat((taxa * 100).toFixed(5));
            }
          });
    
          const respostaVersao = await axios.get("https://raw.communitydragon.org/latest/content-metadata.json");
          const dadosVersao = respostaVersao.data;
          const versaoDividida = dadosVersao.version.split(".");
          const versao = versaoDividida[0] + "." + versaoDividida[1];
    
          const jsonData = {
            dados: todosCampeoes,
            patch: versao,
          };
    
          console.log(jsonData);
        }
      } catch (erro) {
        console.error("Erro ao buscar dados:", erro);
      }
    }
  }
})

function inArray(iten, array) {
  var length = array.length;
  for(var i = 0; i < length; i++) {
    if(array[i] == iten) return true;
  }
  return false;
}