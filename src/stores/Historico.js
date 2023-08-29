import { defineStore } from "pinia";
import axios from 'axios';

export const useHistoricoStore = defineStore('Historico', {
    state: () => ({
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
        async teste() {
            const response = await axios.get('https://op.gg/api/v1.0/internal/bypass/rankings/br/champions/yone?&hl=pt_BR&limit=10');
            let data = response.data;
            let player = data.data;
            
            let summoner = player[0].summoner.summoner_id;
            let id = player[0].summoner.id;
            let url = `https://op.gg/api/v1.0/internal/bypass/games/br/summoners/${summoner}?&limit=20&hl=pt_BR&game_type=total`;
            const games = await axios.get(url);
            let seila = games.data.data;
            this.lista[0] = seila;
            // console.log(player);
            console.log(seila);
        },
    }
})