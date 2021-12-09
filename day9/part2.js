import {readFile} from '../readfile.js'
import {Queue} from '../queue.js'

const main = () => {
    let input = readFile().split('\r\n').map(el => el.split("").map(el => Number(el)))

    const isLocalMin = (row, col) => {
        let val = input[row][col]

        let leftVal, rightVal, belowVal, aboveVal
        input[row][col-1] !== undefined ? leftVal = input[row][col-1] : leftVal = 9
        input[row][col+1] !== undefined ? rightVal = input[row][col+1] : rightVal = 9
        input[row+1] !== undefined ? belowVal = input[row+1][col] : belowVal = 9
        input[row-1] !== undefined ? aboveVal = input[row-1][col] : aboveVal = 9

        if (val < leftVal && val < rightVal && val < belowVal && val < aboveVal) return true
        return false
    }

    const getSurroundingBasinPositions = (row, col) => {
        let surroundingBasinPositions = []
        let val = input[row][col]

        let leftVal = input[row][col-1] ?? null
        if (leftVal && val < leftVal && leftVal !== 9) {
            surroundingBasinPositions.push({row: row, col: col-1})
        }

        let rightVal = input[row][col+1] ?? null
        if (rightVal && val < rightVal && rightVal !== 9) {
            surroundingBasinPositions.push({row: row, col: col+1})
        } 

        let belowVal
        input[row+1] !== undefined ? belowVal = input[row+1][col] : null
        if (belowVal && val < belowVal && belowVal !== 9) {
            surroundingBasinPositions.push({row: row+1, col: col})
        }

        let aboveVal
        input[row-1] !== undefined ? aboveVal = input[row-1][col] : null
        if (aboveVal && val < aboveVal && aboveVal !== 9) {
                surroundingBasinPositions.push({row: row-1, col: col})
        }

        return surroundingBasinPositions
    }

    let lowPoints = []
    for (let row = 0; row < input.length; row++) {
        for (let col = 0; col < input[row].length; col++) {
            if (isLocalMin(row, col)) {
                lowPoints.push({row: row, col: col})
            }
        }
    }

    let basinSizes = []
    for (const lowPoint of lowPoints) {
        let q = new Queue()
        let basin = new Set()
        q.enqueue(lowPoint)
        
        let total = 0
        while (!q.isEmpty()) {
            let pos = q.dequeue()
            basin.add(JSON.stringify({row: pos.row, col: pos.col}))
            
            let surroundingBasinPositions = getSurroundingBasinPositions(pos.row, pos.col)
            for (const surroundingBasinPos of surroundingBasinPositions) {
                if (!basin.has(surroundingBasinPos)) {
                    q.enqueue(surroundingBasinPos)
                    basin.add(JSON.stringify(surroundingBasinPos))
                    total+=1
                }
            }
            total = basin.size
        }
        basinSizes.push(total)
    }

    basinSizes.sort(function(a, b){return a - b});
    console.log(basinSizes[basinSizes.length-1]*basinSizes[basinSizes.length-2]*basinSizes[basinSizes.length-3])
}

main()