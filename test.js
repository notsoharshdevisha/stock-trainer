const str = '086'
console.log(str.length)

function GetFormat(str) {
    let digitsToDisplay
    if (str.length > 12) {
        digitsToDisplay = str.length - 12
        return str.substring(0,digitsToDisplay) + ' Tn'
    } else if (str.length > 9 && str.length < 13) {
        digitsToDisplay = str.length - 9
        return str.substring(0,digitsToDisplay) + ' Bn'
    } else if (str.length > 6 && str.length < 10) {
        digitsToDisplay = str.length - 6
        return str.substring(0,digitsToDisplay) + ' Mn'
    } else if (str.length > 3 && str.length < 7) {
        digitsToDisplay = str.length - 3
        return str.substring(0,digitsToDisplay) + ' Th'
    } else {
        return str
    }
}

ans = GetFormat(str)
console.log(ans)
