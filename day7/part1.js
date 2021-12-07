import {readFile} from '../readfile.js'

const main = () => {
    let {max, min, positions} = parseInput()
    let fuelTotal = 0
    for (let i = min; i <= max; i++) {
        let temp = 0
        positions.forEach(p => temp += Math.abs(p - i))
        if (temp < fuelTotal || fuelTotal === 0) fuelTotal = temp
    }
    console.log(fuelTotal)
}

const parseInput = () => {
    let max = 0
    let min = 0
    let positions = readFile().split(',').map(el => {
        max = Math.max(Number(el), max)
        min = Math.min(Number(el), min)
        return Number(el)
    })
    return {max, min, positions}
}

main()