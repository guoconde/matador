new Vue({
    el: '#app',
    data: {
        running: false,
        playerReady: false,
        playerName: '',
        playerLife: 100,
        playerMana: 100,
        monsterLife: 100,
        logs: []
    },

    computed: {
        hasResult() {
            return this.playerLife == 0 || this.monsterLife == 0
        },
    },

    methods: {
        startGame() {
            this.running = true;
            this.playerLife = 100;
            this.playerMana = 100;
            this.monsterLife = 100;
            this.logs = []
            this.getName()
        },
        getName() {
            const receberNome = document.querySelector('.name')?.value
            this.playerName = receberNome
            this.playerReady = true
        },
        giveUp() {
            this.playerName = '';
            this.playerReady = false;
            this.running = false;
        },
        attack(especial) {
            if (especial == true && this.playerMana > 15) {
                this.hurt('monsterLife', 5, 10, especial, 'Jogador', 'Monstro', 'player')
                this.manaCost(especial, 15)
            } else if (especial == false) {
                this.hurt('monsterLife', 5, 10, especial, 'Jogador', 'Monstro', 'player')
                this.mana(2, 5)
            } else {
                this.registerLog(`O Ataque especial falhou!`, 'player')
            }
            if (this.monsterLife > 0) {
                this.hurt('playerLife', 7, 12, false, 'Monstro', 'Jogador', 'monster')
                this.heal('monsterLife', 1, 3, 'Monstro', 'monster')
            }
        },
        manaCost(especial, value) {
            const loseMana = especial ? value : 0
            this.playerMana = Math.max(this.playerMana - loseMana, 0)
        },
        hurt(prop, min, max, especial, source, target, cls) {
            const plus = especial ? 5 : 0
            const hurt = this.getRandom(min + plus, max + plus)
            this[prop] = Math.max(this[prop] - hurt, 0)
            this.registerLog(`${source} atingiu ${target} com ${hurt} de dano.`, cls)
        },
        getRandom(min, max) {
            const value = Math.random() * (max - min) + min
            return Math.round(value)
        },
        heal(prop, min, max, source, cls) {
            const heal = this.getRandom(min, max)
            this[prop] = Math.min(this[prop] + heal, 100)
            this.registerLog(`${source} se curou em ${heal} pontos de vida.`, cls)
        },
        mana(min, max) {
            const mana = this.getRandom(min, max)
            this.playerMana = Math.min(this.playerMana + mana, 100)
        },
        healAll() {
            if(this.playerMana >= 20) {
                this.heal('playerLife', 15, 25, 'Jogador', 'player')
                this.manaCost(true, 20)
            } else {
                this.registerLog(`Sem mana suficiente`, 'player')
            }
            this.hurt('playerLife', 7, 12, false, 'Monstro', 'Jogador', 'monster')
        },
        registerLog(text, cls) {
            this.logs.unshift({ text, cls })
        }
    },

    watch: {
        hasResult(value) {
            if (value) this.running = false
        }
    }
})