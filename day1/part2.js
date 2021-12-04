import {rl} from '../readfile.js'

const main = async () => {
  let count = 0
  let last3 = []
  for await (const line of rl) {
    if (last3.length < 3) {
        last3.push(Number(line))
    }
    else if (last3[1] + last3[2] + Number(line) > last3.reduce(function(pv, cv) { return pv + cv}, 0)) {
        count++
        last3.shift()
        last3.push(Number(line))
    } else {
        last3.shift()
        last3.push(Number(line))
    }
  }
  console.log(count)
}

main();