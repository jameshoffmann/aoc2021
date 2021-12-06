import {readFile} from '../readfile.js'

let fishies = []
const DAYS = 80
const newFish = {
    daysLeft: 8,
    justSpawned: true
}

const main = () => {
    fishies = readFile().split(",").map((el) => {return {daysLeft: Number(el), justSpawned: false}})
    for (let day = 0; day < DAYS; day++) {
        let startOfDayCount = fishies.length
        for (let i = 0; i < startOfDayCount; i++) {
            fishies[i].daysLeft--
            if (fishies[i].daysLeft < 0) {
                fishies[i].daysLeft = 6
                fishies.push(newFish)
            }
        }
        fishies = fishies.map((fish) => {return {...fish, justSpawned: false}})
    }

    console.log(fishies.length)
    
}

main()
