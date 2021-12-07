import {rl} from '../readfile.js'

const main = async () => {
  let x = 0
  let y = 0
  let aim = 0
  for await (const line of rl) {
    let changeAmt = Number(line.slice(line.indexOf(' ')))
    switch(line[0]) {
        case 'd': aim += changeAmt; break
        case 'u': aim -= changeAmt; break
        case 'f': 
            x += changeAmt
            y += aim * changeAmt
            break
        default: break
    }
  }
  console.log(x*y)
}

main();