import fs from 'fs'
import readline from 'readline'
import dotenv from 'dotenv'
dotenv.config()

const IS_SAMPLE = false

let inputFile
IS_SAMPLE ? inputFile = 'sampleinput.txt' : inputFile = 'input.txt'

const fileStream = fs.createReadStream(inputFile)

const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

const readFile = () => {
    const text = fs.readFileSync(inputFile, 'utf-8')
    return text
}

export { fileStream, rl, readFile }