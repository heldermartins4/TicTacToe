// Players
var p1=[], p2=[];
var sq = document.getElementById('area');

var winner = false;
const setWinner = (value) => winner=value;

const root = document.getElementById('root');
const head = document.getElementById('player');
const result = document.getElementById('result')

const score1 = document.getElementById('score-1')
const score2 = document.getElementById('score-2')
var p1Score = 0, p2Score = 0;

const dialog = document.getElementById('dialog');
const setModal = (value) => {
    value ? dialog.style.display = 'flex' : dialog.style.display = 'none'
}

setModal(false)

const btn = document.getElementById("btn");
btn.addEventListener('click', () => restart())

var turn = p1, countTurn = 1;
var turnStarting = p1;
const setTurn = (value) => turn = value;

const win = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 5, 9],
    [3, 5, 7],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9]
];

const setHead = (value) => {
    head.innerHTML = value
    result.innerHTML = value
    head.classList.add("appear")
    setTimeout(() => {
        head.classList.remove("appear")
        head.classList.add("disappear")
    }, 1500)
    head.classList.remove("disappear")
}

setHead("Vez de <i class='bi bi-x-lg'></i>")

const check = (value) => {
    for (let i = 0; i < win.length; i++) {
        let count = 0;
        for (let j = 0; j < win[i].length; j++) {
            value.some((item) => {
                item == win[i][j] && count++;
            })
            count >= 3 && setWinner(true);
        }
    }
}

const move = (p, value) => {
    p.push(value);
    check(p);

    if (countTurn % 2 == 0) {
        setHead("Vez de <i class='bi bi-circle'></i>")
    } else setHead("Vez de <i class='bi bi-x-lg'></i>")
    
    if (winner) {
        if (turn == p1) {
            p1Score++
            score1.innerText = p1Score
            setHead("<i class='bi bi-x-lg'></i> ganhou!")
            countTurn = 1
            turnStarting = p1
        } else {
            p2Score++
            score2.innerText = p2Score
            setHead("<i class='bi bi-circle'></i> ganhou!")
            countTurn = 2
            turnStarting = p2
        }
        setModal(true)
    } else if (!winner) {
        // console.log(`turn: ${turn == p1 ? 'p1' : 'p2'}\ncountTurn: ${countTurn}`)
        if (turnStarting == p2 && turn == p2 && countTurn == 11) draw(p2)
        if (turnStarting == p1 && turn == p1 && countTurn == 10) draw(p1)
    }
}

const draw = (nextPlayer) => {
    setHead("Vish, deu velha!")
    setModal(true)
    turnStarting = nextPlayer
    if (countTurn % 2 == 0) {
        countTurn = 2
    } else countTurn = 1
}

for (let index = 1; index <= 9; index++) {
    const el = document.createElement('div');
    el.innerHTML = "<i class='bi bi-x-lg' style='color:transparent'></i>";
    el. dataset.pos = index;
    root.append(el);

    el.addEventListener('click', () => {
        let data = +el.getAttribute('data-pos');
        el.classList.add("toggled");
        countTurn % 2 == 0 ? setTurn(p2) : setTurn(p1);
        !winner && countTurn++;
        move(turn, data);
        turn == p1 ? el.innerHTML = "<i class='bi bi-x-lg' style='color:#0f0'></i>" : 
            el.innerHTML = "<i class='bi bi-circle' style='color:#f00'></i>"
    })
}

const restart = () => {
    setModal(false)
    let el = document.querySelectorAll(".toggled");
    p1 = [];
    p2 = [];
    // console.log("p1: ", p1, "p2: ", p2)
    setWinner(false);
    setTurn(turn);
    for (let i = 0; i < el.length; i++) {
        el[i].innerHTML = "<i class='bi bi-x-lg' style='color:transparent'></i>";
        el[i].classList.remove("toggled")
    }

    if (countTurn % 2 == 0) {
        countTurn = 2;
        setHead("Vez de <i class='bi bi-circle'></i>")
        turnStarting = p2
    } else {
        countTurn = 1;
        setHead("Vez de <i class='bi bi-x-lg'></i>")
        turnStarting = p1
    }
}