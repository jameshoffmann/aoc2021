import {readFile} from '../readfile.js'

const NUM_DAYS = 256
let adults = []
let babies = []

const main = () => {
    parseInput()
    solve()
    console.log(getTotal())
}

const parseInput = () => {
    adults = new Array(7).fill(0)
    babies = new Array(9).fill(0)
    readFile().split(',').forEach((d) => adults[d] += 1)
}

const solve = () => {
    for (let d = 1; d <= NUM_DAYS; d++) { 
        const tempAdults = adults.map(el => el)
        const tempBabies = babies.map(el => el)
        for (let i = 0; i < 8; i++) {
            if (i < 6) {
                adults[i] = tempAdults[i+1]
                babies[i] = tempBabies[i+1]
            } else if (i === 6) {
                adults[6] = 0
                adults[6] += tempAdults[0] + tempBabies[0]
                babies[8] = 0
                babies[8] += tempAdults[0] + tempBabies[0]
                babies[6] = tempBabies[7]
            } else if (i === 7) {
                babies[7] = tempBabies[8]
            }
        }
    }
}

const getTotal = () => {
    let total = 0
    adults.forEach(el => total += el)
    babies.forEach(el => total += el)
    return total
}

main()