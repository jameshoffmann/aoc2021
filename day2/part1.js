import {rl} from '../readfile.js'

const main = async () => {
  let x = 0
  let y = 0
  for await (const line of rl) {
    let changeAmt = Number(line.slice(line.indexOf(' ')))
    switch(line[0]) {
        case 'd': y = y + changeAmt; break;
        case 'u': y = y - changeAmt; break;
        case 'f': x = x + changeAmt; break;
        default: break;
    }
  }
  console.log(x*y)
}
  
main();