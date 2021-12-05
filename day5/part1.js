import {rl} from '../readfile.js'

const ROWS = 1000
const COLUMNS = 1000
let overlapCount = 0
let grid = Array(ROWS).fill().map(() => Array(COLUMNS).fill(0))

const main = async() => {
    for await (let row of rl) {
        let line = row.replace('-> ', '').split(/[\s,]+/).map((el) => Number(el))
        if (line[1] === line[3]) addHorizontal(line[1], line[0], line[2])
        else if (line[0] === line[2]) addVertical(line[0], line[1], line[3])
    }
    console.log(overlapCount)
}

const addHorizontal = (y, x1, x2) => {
    for (let i = Math.min(x1, x2); i <= Math.max(x1, x2); i++) {
        grid[y][i] += 1
        if (grid[y][i] === 2) overlapCount += 1
    }
}

const addVertical = (x, y1, y2) => {
    for (let i = Math.min(y1, y2); i <= Math.max(y1, y2); i++) {
        grid[i][x] += 1
        if (grid[i][x] === 2) overlapCount += 1
    }
}

main()