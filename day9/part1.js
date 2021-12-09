import {readFile} from '../readfile.js'

const main = () => {
    let input = readFile().split('\r\n').map(el => el.split("").map(el => Number(el)))

    const isLocalMin = (row, col) => {
        let val = input[row][col]

        let leftVal, rightVal, belowVal, aboveVal
        leftVal = input[row][col-1] ?? 10
        rightVal = input[row][col+1] ?? 10
        input[row-1] !== undefined ? belowVal = input[row-1][col] : belowVal = 10
        input[row+1] !== undefined ? aboveVal = input[row+1][col] : aboveVal = 10

        if (val < leftVal && val < rightVal && val < belowVal && val < aboveVal) return true
        return false
    }

    let total = 0
    for (let row = 0; row < input.length; row++) {
        for (let col = 0; col < input[row].length; col++) {
            if (isLocalMin(row, col)) total+= 1 + input[row][col]
        }
    }
    console.log(total)
}

main()