new Vue({
    el: '#app',
    data: {
        // setto i data: la salute di entrambi, booleano che indica se siamo in gioco, e un array vuota per i turni da stampare in <li>
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        // inizia il gioco
        startGame: function() {
            // 'avviso' il data
            this.gameIsRunning = true;
            // e riporto i valori a quelli di partenza
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = []
        },
        attack: function() {
            // calcolo il danno
            var damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage;
            // metto, a inizio array, il text che poi stamperò in html con un v-for
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hist Monster for ' + damage
            });
            // controllo la situazione partita
            if(this.checkWin()) {
                return;
            };
            // attacco del mostro
            this.monsterAttacks();
        },
        specialAttack: function() {
            // calcolo il danno
            var damage = this.calculateDamage(10, 20);
            this.monsterHealth -= damage;
            // metto, a inizio array, il text che poi stamperò in html con un v-for
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hist Monster hard for ' + damage
            });
            // controllo la situazione partita
            if (this.checkWin()) {
                return;
            };
            // attacco del mostro
            this.monsterAttacks();
        },
        heal: function() {
            // se la salute è minore di 90, aumentala di 10
            if (this.playerHealth <= 90) {
                this.playerHealth += 10;
            } else {
                // altrimenti portala a 100
                this.playerHealth = 100;
            };
            this.turns.unshift({
                isPlayer: true,
                text: 'Player Heals for 10'
            });
            this.monsterAttacks();
        },
        giveUp: function() {
            // se mi arrneod, basta reimpostare il data a false
            this.gameIsRunning = false;
        },
        monsterAttacks: function() {
            // il mostro attacca:
            // calcolo i danni
            var damage = this.calculateDamage(5, 12);
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hist Player for ' + damage

            });
            this.checkWin();
        },
        // funzione per calcolare i danni da richiamare ogni volta
        calculateDamage: function(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        // controllo situazione partita
        checkWin: function() {
            // se il mostro è arrivato a salute = 0
            if (this.monsterHealth <= 0) {
                // confirm ce la pssa direttamente Js, è un alert: se viene confermato startGame()
                if (confirm('You won! New Game?')) {
                    this.startGame();
                } else {
                    // altrimenti imposta la partita a 'non giocata'
                    this.gameIsRunning = false;
                }
                // alla fine returna true
                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm('You Lost! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            // qui returna false; perchè? se non sono entrato nell'if e nell'else, nessuno dei due è morto, quindi il gioco decve continuare
            return false;
        }
    }

});