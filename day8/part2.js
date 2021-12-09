import {readFile} from "../readfile.js"
import {difference, intersection} from "../sets.js"

const main = () => {
    let input = parseInput()
    const numberSegmentMappings = ['1110111', '0010010', '1011101', '1011011', '0111010', '1101011', '1101111', '1010010', '1111111', '1111011']
    
    let total = 0
    for (const display of input) {
        let mapping = {a: new Set(), b: new Set(), c: new Set(), d: new Set(), e: new Set(), f: new Set(), g: new Set()}
        let one = new Set()
        let seven = new Set()
        let four = new Set()
        
        let counters = {a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0}
        for (const pattern of display[0]) {
            for (const char of pattern) {
                counters[char] += 1
            }
            switch(pattern.length) {
                case 2: for (const char of pattern) one.add(char); break
                case 3: for (const char of pattern) seven.add(char); break
                case 4: for (const char of pattern) four.add(char); break
                default: break
            }
        }
        for (const [key, value] of Object.entries(counters)) {
            switch(value) {
                case 6: mapping.b.add(key); break
                case 4: mapping.e.add(key); break
                case 9: mapping.f.add(key); break
                case 8: mapping.c.add(key); break
                case 7:
                    mapping.d.add(key)
                    mapping.g.add(key)
                    break
            }
        }
        mapping.a = difference(seven, one)
        mapping.c = difference(mapping.c, mapping.a)
        mapping.d = intersection(mapping.d, four)
        mapping.g = difference(mapping.g, mapping.d)

        let invertMapping = {a: '', b: '', c: '', d: '', e: '', f: '', g: ''}
        for (const [key, value] of Object.entries(mapping))  {
            invertMapping[[...value][0]] = key
        }

        let decodedNumbers = []
        for (const digit of display[1]) {
            let decodedSegments = ''
            for (const char of digit) {
                decodedSegments += invertMapping[char]
            }
            let decodedNumber = "0000000"
            for (const char of decodedSegments) {
                switch(char) {
                    case 'a': decodedNumber = setCharAt(decodedNumber, 0, '1'); break
                    case 'b': decodedNumber = setCharAt(decodedNumber, 1, '1'); break
                    case 'c': decodedNumber = setCharAt(decodedNumber, 2, '1'); break
                    case 'd': decodedNumber = setCharAt(decodedNumber, 3, '1'); break
                    case 'e': decodedNumber = setCharAt(decodedNumber, 4, '1'); break
                    case 'f': decodedNumber = setCharAt(decodedNumber, 5, '1'); break
                    case 'g': decodedNumber = setCharAt(decodedNumber, 6, '1'); break
                    default: break
                }
            }
            for (let i = 0; i < numberSegmentMappings.length; i++) {
                if (numberSegmentMappings[i] === decodedNumber) {
                    decodedNumbers.push(i.toString())
                    break
                }
            }
        }
        total += Number(decodedNumbers.join(""))
    }
    console.log(total)
}

const setCharAt = (str,index,chr) => {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
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