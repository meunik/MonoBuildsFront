import { defineStore } from "pinia";
import axios from 'axios';

export const useHistoricoStore = defineStore('Historico', {
    state: () => ({
        listaItens: {},
        lista: [],
        teste: [],
    }),

    actions: {
        async fill() {
            this.teste = [
                {
                    id: 1,
                    valor: 1
                },
                {
                    id: 2,
                    valor: 2
                },
                {
                    id: 3,
                    valor: 3
                },
                {
                    id: 4,
                    valor: 4
                },
                {
                    id: 5,
                    valor: 5
                },
            ];
        },
        async summoners() {
            const response = await axios.get('https://op.gg/api/v1.0/internal/bypass/rankings/br/champions/yone?&hl=pt_BR&limit=10');
            let data = response.data;
            let player = data.data;
            console.log(player[0]);
            
            let stat = player[0].most_champion_stat;
            let summoner = player[0].summoner;
            this.listaItens[summoner.internal_name] = {
                "playar": {
                    internal_name: summoner.internal_name,
                    name: summoner.name,
                    play: stat.play,
                    win: stat.win,
                    lose: stat.lose,
                },
            };
            this.historico(summoner.summoner_id, summoner.internal_name);
        },
        async historico(summoner, key) {
            let url = `https://op.gg/api/v1.0/internal/bypass/games/br/summoners/${summoner}?&limit=20&hl=pt_BR&game_type=total`;
            const games = await axios.get(url);
            let jogos = games.data.data;
            console.log(jogos);

            this.lista.push(jogos);
        }
    }
})