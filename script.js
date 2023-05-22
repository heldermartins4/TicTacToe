// Players
var p1=[], p2=[];
var sq = document.getElementById('area');

var winner = false;
const setWinner = (value) => winner=value;

const root = document.getElementById('root');
const head = document.getElementById('player');

const btn = document.createElement("button");
btn.className = "btn"
btn.innerText = "Jogar de novo!"

const header = head.parentNode;
header.insertBefore(btn, head)
btn.classList.add("hidden")
btn.addEventListener('click', () => restart())

var turn = p1, countTurn = 1;
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

    // turn == p1 ? console.log("p1", p1) : console.log("p2", p2)

    if (!winner && countTurn > 9) {
        head.innerText = "Vish, deu velha...";
        btn.classList.remove("hidden")
        countTurn = 1;
    } else if (countTurn % 2 == 0) {
        head.innerText = `Vez de jogador 2`
    } else head.innerText = `Vez de jogador 1`

    if (winner) {
        if (turn == p1) {
            head.innerText = `Jogador 1 ganhou!`;
        } else head.innerText = `Jogador 2 ganhou!`;
        btn.classList.remove("hidden")
    }
}

for (let index = 1; index <= 9; index++) {
    const el = document.createElement('div');
    el.innerText = index;
    el. dataset.pos = index;
    root.append(el);

    el.addEventListener('click', () => {
        let data = +el.getAttribute('data-pos');
        el.classList.add("toggled");
        countTurn % 2 == 0 ? setTurn(p2) : setTurn(p1);
        !winner && countTurn++;
        move(turn, data);
        turn == p1 ? el.style.backgroundColor = '#0f0' : el.style.backgroundColor = '#f00'
    })
}

const restart = () => {
    btn.classList.add("hidden")
    let el = document.querySelectorAll(".toggled");
    p1 = [];
    p2 = [];
    // console.log("p1: ", p1, "p2: ", p2)
    setWinner(false);
    setTurn(turn);
    for (let i = 0; i < el.length; i++) {
        el[i].style.backgroundColor = "#ddd"
        el[i].classList.remove("toggled")
    }

    if (countTurn % 2 == 0) {
        countTurn = 0;
        head.innerText = `Vez de jogador 2`
    } else {
        countTurn = 1;
        head.innerText = `Vez de jogador 1`
    }
}