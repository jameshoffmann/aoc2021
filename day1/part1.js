import {rl} from '../readfile.js'

const main = async() => {
  let count = -1
  let lastLine = 0
  for await (const line of rl) {
    if (Number(line) > lastLine) count++
    lastLine = Number(line)
  }
  console.log(count)
}

main()