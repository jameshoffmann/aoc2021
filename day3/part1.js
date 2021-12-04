import {rl} from '../readfile.js'

const lineCount = 1000
const digitCount = 12

const main = async () => {
    let oneCounters = {
        c0: 0,
        c1: 0,
        c2: 0,
        c3: 0,
        c4: 0,
        c6: 0,
        c7: 0,
        c8: 0,
        c9: 0,
        c10: 0,
        c11: 0,
    }
    for await (const line of rl) {
        for (let i = 0; i < line.length; i++) {
            if (line[i] === '1') oneCounters['c'+i] += 1
        }
    }
    let gammaRate = ''
    let epsilonRate = ''
    for (let i = 0; i < digitCount; i++) {
        if (oneCounters['c'+i] > lineCount/2) {
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