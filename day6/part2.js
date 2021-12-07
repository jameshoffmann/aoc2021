import {readFile} from '../readfile.js'

const NUM_DAYS = 256
let fishies = []

const main = () => {
    parseInput()
    dayCycle()
    console.log(getTotal())
}

const parseInput = () => {
    fishies = new Array(9).fill(0)
    readFile().split(',').forEach((d) => fishies[d] += 1)
}

const dayCycle = () => {
    for (let d = 1; d <= NUM_DAYS; d++) { 
        const prevFishies = fishies.map(el => el)
        for (let i = 0; i < 6; i++) fishies[i] = prevFishies[i+1]
        fishies[6] = prevFishies[7] + prevFishies[0]
        fishies[7] = prevFishies[8]
        fishies[8] = prevFishies[0]
    }
}

const getTotal = () => {
    let total = 0
    fishies.forEach(el => total += el)
    return total
}

main()