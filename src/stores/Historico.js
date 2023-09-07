import { defineStore } from "pinia";
import axios from 'axios';

export const useHistoricoStore = defineStore('Historico', {
    state: () => ({
        listaItens: {},
        lista: [],
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
    }),

    actions: {
        async buscaCamepoes() {
            const response = await axios.get('http://ddragon.leagueoflegends.com/cdn/13.16.1/data/pt_BR/champion.json');
            const data = response.data;
            this.campeoes = data.data;
        },
        async buscaItensCompletos() {
            this.itensCompletos = this.todosItens.filter(item => !this.itensNaoCompletos.includes(item));
        },


        async summoners(champ) {
            this.listaItens = {};
            await this.buscaCamepoes();
            await this.buscaItensCompletos();
            
            const url = `https://op.gg/api/v1.0/internal/bypass/rankings/br/champions/${champ}?&hl=pt_BR&limit=10`;
            const games = await axios.get(url);
            const monos = games.data.data;

            monos.forEach(async mono => await this.listando(mono));
        },
        async listando(player) {
            const stat = player.most_champion_stat;
            const summoner = player.summoner;

            const key = Object.keys(this.campeoes).filter((key) => this.campeoes[key].key == stat.id);
            const campeao = this.campeoes[key];

            this.listaItens[summoner.internal_name] = {
                id: summoner.id,
                internal_name: summoner.internal_name,
                name: summoner.name,
                campeaoNameId: campeao.id,
                campeaoId: campeao.key,
                campeaoName: campeao.name,
                icon: summoner.profile_image_url,
                play: stat.play,
                win: stat.win,
                lose: stat.lose
            };
            await this.historico(summoner.summoner_id, summoner.internal_name, stat.id);
        },
        async historico(summonerId, key, champId) {
            const url = `https://op.gg/api/v1.0/internal/bypass/games/br/summoners/${summonerId}?&limit=20&hl=pt_BR&game_type=soloranked&champion=${champId}`;
            const games = await axios.get(url);
            const jogos = games.data.data;

            await this.itens(jogos, key);

            this.lista.push(jogos);
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

            // const topSix = itensArray.slice(0, 6);
            const topSix = itensArray;
            const topSixItens = [];
            
            for (const obj in topSix) topSixItens[`item${obj}`] = topSix[obj].item;
            
            this.listaItens[key] = {
                ...this.listaItens[key],
                ...topSixItens
            };
        },
        async is_itemCompleto(item) {

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