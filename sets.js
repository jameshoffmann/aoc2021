export function isSuperset(set, subset) {
    for (let elem of subset) {
        if (!set.has(elem)) {
            return false
        }
    }
    return true
}

export function union(setA, setB) {
    let _union = new Set(setA)
    for (let elem of setB) {
        _union.add(elem)
    }
    return _union
}

export function intersection(setA, setB) {
    let _intersection = new Set()
    for (let elem of setB) {
        if (setA.has(elem)) {
            _intersection.add(elem)
        }
    }
    return _intersection
}

export function symmetricDifference(setA, setB) {
    let _difference = new Set(setA)
    for (let elem of setB) {
        if (_difference.has(elem)) {
            _difference.delete(elem)
        } else {
            _difference.add(elem)
        }
    }
    return _difference
}

export function difference(setA, setB) {
    let _difference = new Set(setA)
    for (let elem of setB) {
        _difference.delete(elem)
    }
    return _difference
}

export function intersectionOfSetList(setList) {
    let _intersection = new Set()
    for (elem of setList[0]) {
        _intersection.add(elem)
    }
    for (let i = 1; i < setList.size(); i++) {
        _intersection = intersection(_intersection, setList[i])
    }
    return _intersection
}

export function unionOfSetList(setList) {
    let _union = new Set()
    for (const set of setList) {
        _union = union(_union, set)
    }
    return _union
}