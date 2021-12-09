import {readFile} from "../readfile.js"

const main = () => {
    let input = parseInput()
    let counts = {
        one: 0,
        four: 0,
        seven: 0,
        eight: 0
    }
    for (const display of input) {
        for (const digit of display[1]) {
            switch(digit.length) {
                case 2: counts.one++; break
                case 4: counts.four++; break
                case 3: counts.seven++; break
                case 7: counts.eight++; break;
            }
        }
    }
    console.log(counts.one + counts.four + counts.seven + counts.eight)
}

const parseInput = () => {
    let input = readFile()
        .split(/(?<!\|)\r\n/)
        .map(el => el.replace('\r\n', '')
            .split('|')
            .map(el => el.trim().split(" ")))
    return input
}

main()