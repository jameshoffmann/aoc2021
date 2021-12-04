import {rl} from '../readfile.js'

const digitCount = 12

const main = async () => {
    let input = []
    for await (const line of rl) {
        input.push(line)
    }
    let co2List = input
    let oxygenList = input

    for (let i = 0; i < digitCount; i++) {
        if (oxygenList.length === 1) break
        let oneCount = 0;
        for (const line of oxygenList) {
            if (line[i] === '1') oneCount += 1
            if (oneCount > oxygenList.length/2) break
        }
        oneCount >= oxygenList.length/2 ? 
        oxygenList = oxygenList.filter(item => item[i] === '1') :
        oxygenList = oxygenList.filter(item => item[i] === '0')
    }

    for (let i = 0; i < digitCount; i++) {
        if (co2List.length === 1) break
        let oneCount = 0;
        for (const line of co2List) {
            if (line[i] === '1') oneCount += 1
            if (oneCount > co2List.length/2) break
        }
        oneCount >= co2List.length/2 ? 
        co2List = co2List.filter(item => item[i] === '0') :
        co2List = co2List.filter(item => item[i] === '1')
    }

    console.log(parseInt(oxygenList[0], 2)*parseInt(co2List[0], 2))
}

main()