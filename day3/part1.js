import {rl} from '../readfile.js'

const lineCount = 1000
const digitCount = 12

const main = async () => {
    let gammaRate = ''
    let epsilonRate = ''
    let oneCounters = new Array(12).fill(0)
    for await (const line of rl) {
        for (let i = 0; i < line.length; i++) {
            if (line[i] === '1') oneCounters[i] += 1
        }
    }
    for (let i = 0; i < digitCount; i++) {
        if (oneCounters[i] > lineCount/2) {
            gammaRate += '1'
            epsilonRate += '0'
        } else {
            gammaRate += '0'
            epsilonRate += '1'
        }
    }
    console.log(parseInt(gammaRate, 2)*parseInt(epsilonRate, 2));
}

main()