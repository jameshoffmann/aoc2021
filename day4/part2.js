import {readFile} from '../readfile.js'

const main = () => {
    let {draws, boards} = parseInput()
    console.log(solve(draws, boards))
}

const parseInput = () => {
    let input = readFile().split('\r\n')
    let draws = input.splice(0, 2).toString().split(',')
    let boards = []
    let board = []
    for (let i = 0; i < input.length; i++) {
        if (input[i] === '') {
            boards.push(board)
            board = []
        } else {
            board.push(input[i].split(' ').filter((el) => el !== '').map(number => ({number: Number(number), marked: false})))
            if (i === input.length - 1) boards.push(board)
        }
    }
    return {draws, boards}
}

const solve = (draws, boards) => {
    for (let i = 0; i < draws.length; i++) {
        markBoards(boards, draws[i])
        if (boards.length > 1 && i >= 5) {
            removeWinners(boards)
            continue
        }
        if (checkFinalBoard(boards[0])) return calculateScore(boards[0], draws[i])
    }
}

const markBoards = (boards, draw) => {
    for (const board of boards) {
        for (const row of board) {
            for (const el of row) {
                if (el.number === Number(draw)) el.marked = true
            }
        }
    }
}

const removeWinners = (boards) => {
    let indicesToRemove = []
    for (let i = 0; i < boards.length; i++) {
        let isHorWinner = checkHorizontals(boards[i])
        let isVertWinner = checkVerticals(boards[i])
        if (isHorWinner || isVertWinner) {
            indicesToRemove.push(i)
        }
    }
    for (let i = indicesToRemove.length - 1; i >= 0; i--) {
        boards.splice(indicesToRemove[i], 1)
    }
    return
}

const checkFinalBoard = (finalBoard) => {
    let isHorWinner = checkHorizontals(finalBoard)
    let isVertWinner = checkVerticals(finalBoard)
    if (isHorWinner || isVertWinner) return true
    return false
}

const checkHorizontals = (board) => {
    for (const row of board) {
        if (row[0].marked && row[1].marked && row[2].marked && row[3].marked && row[4].marked) return true
    }
    return false
}

const checkVerticals = (board) => {
    for (let i = 0; i < 5; i++) {
        if (board[0][i].marked && board[1][i].marked && board[2][i].marked && board[3][i].marked && board[4][i].marked) return true
    }
    return false
}

const calculateScore = (winningBoard, draw) => {
    let unmarkedSum = 0
    for (const row of winningBoard) {
        for (const el of row) {
            if (!el.marked) unmarkedSum += el.number
        }
    }
    return unmarkedSum * draw
}

main()