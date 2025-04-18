document.addEventListener('DOMContentLoaded', () => {

    const grid = document.querySelector('#gridlay')
    let squares = Array.from(document.querySelectorAll('#gridlay div'))
    const width = 10
    const scoreDisplay = document.querySelector('#scoreCount')
    const btn = document.querySelector('#thebutton')
    let score = 0
    let nextRandom = 0
    let tick
    const colors = [
        '#0341AE', // Blue
        '#72CB3B', // Green
        '#FFD500', // Yellow
        '#FF971C', // Orange
        '#FF3213'  // Red
        ]
    const lTetro = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2],
    ]
    const zTetro = [
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1],
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1]
        ]

        const tTetro = [
        [1,width,width+1,width+2],
        [1,width+1,width+2,width*2+1],
        [width,width+1,width+2,width*2+1],
        [1,width,width+1,width*2+1]
      ]

      const oTetro = [
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1]
      ]

      const iTetro = [
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3],
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3]
      ]
const tetros = [lTetro, zTetro, tTetro, oTetro, iTetro]

// Define next up display area
const displaySquares = document.querySelectorAll('#nextUp div')
const displayWidth = 4
const displayIndex = 0

const upNextTetros = [
    [1, displayWidth+1, displayWidth*2+1, 2],
    [0,displayWidth,displayWidth+1,displayWidth*2+1],
    [1,displayWidth,displayWidth+1,displayWidth+2],
    [0,1,displayWidth,displayWidth+1],
    [1,displayWidth+1,displayWidth*2+1,displayWidth*3+1]
]

function displayShape() {
    displaySquares.forEach(square => {
        square.classList.remove('tetro')
        square.style.backgroundColor = ''
    })
    upNextTetros[nextRandom].forEach(index => {
        displaySquares[displayIndex + index].classList.add('tetro')
        displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom]
    })
}

// Set up tetrominoes
nextRandom = Math.floor(Math.random() * tetros.length)
//displayShape()

let random = nextRandom
nextRandom = Math.floor(Math.random() * tetros.length)
let rotation = 0
let position = 4
let current = tetros[random][rotation]

    function draw() {
    current.forEach(index => {
        squares[position + index].classList.add('tetro')
        squares[position + index].style.backgroundColor = colors[random]
    })
}
function undraw() {
    current.forEach(index => {
        squares[position + index].classList.remove('tetro')
         squares[position + index].style.backgroundColor = ''
    })
}


function moveDown() {
    undraw()
    position += width
    draw()
    freeze()
}

function freeze() {
    if(current.some(index => squares[position + index + width].classList.contains('taken')))
    {
        current.forEach(index => squares[position + index].classList.add('taken'))
        random = nextRandom
        nextRandom = Math.floor(Math.random() * tetros.length)
        position = 4
        rotation = 0
        current = tetros[random][rotation]
        if(current.some(index => squares[position + index].classList.contains('taken'))) {
            gameLost()
            return
        }
        draw()
        displayShape()
        addScore()
    }
}

function moveLeft() {
    undraw()
    const isAtLeftEdge = current.some(index => (position + index) % width === 0)
    if(!isAtLeftEdge) position -=1
    if(current.some(index => squares[position + index].classList.contains('taken')))
    {
      position +=1
    }
    draw()
}

function moveRight() {
    undraw()
    const isAtRightEdge = current.some(index => ((position + index) + 1) % width === 0)
    if(!isAtRightEdge) position +=1
    if(current.some(index => squares[position + index].classList.contains('taken')))
    {
      position -=1
    }
    draw()
}

function moveRotate() {
    undraw()
    rotation++
    if(current.some(index => (position + index + 1) % width === 0)) {
        rotation--;
    }
    if(current.some(index => (position + index) % width === 0)) {
        rotation--;
    }
    if (rotation === 4)
    {
        rotation = 0
    }

    current = tetros[random][rotation]
    draw()

}
//tick = setInterval(moveDown, 1000)
//draw()
function control(e) {
    if (e.keyCode === 65 || e.keyCode === 37)
    {
        moveLeft()
    }
    if (e.keyCode === 68 || e.keyCode === 39)
    {
        moveRight()
    }
    if (e.keyCode === 87 || e.keyCode === 38)
    {
        moveRotate()
    }
    if (e.keyCode === 83 || e.keyCode === 40)
    {
        moveDown()
    }
}
document.addEventListener('keyup', control)

btn.addEventListener('click', () => {
    if(tick)
    {
        clearInterval(tick)
        tick = null
    }
    else
    {
        draw()
        tick = setInterval(moveDown, 1000)
        nextRandom = Math.floor(Math.random() * tetros.length)
        displayShape()

    }
})

document.getElementById('resetBtn').addEventListener('click', () => {
    location.reload();
});


function addScore() {
    for (let i = 0; i < 199; i += width) {
        const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

        if (row.every(index => squares[index].classList.contains('taken'))) {
            score += 10
            scoreDisplay.innerHTML = score
            row.forEach(index => {
                squares[index].classList.remove('taken')
                squares[index].classList.remove('tetro')
                squares[index].style.backgroundColor = ''
            })
            const squaresRemoved = squares.splice(i, width)
            squares = squaresRemoved.concat(squares)
            squares.forEach(cell => grid.appendChild(cell))
        }
    }
}

function gameLost() {
    scoreDisplay.innerHTML = 'End'
    clearInterval(tick)
    document.removeEventListener('keyup', control)
}

})
