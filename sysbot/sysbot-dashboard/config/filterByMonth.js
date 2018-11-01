function Formatter(result) {
    var month = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    for (i = 0; result.length > i; i++) {
        var day = new Date(result[i].timestamp).getUTCDate()-1
        month[day]++
    }
    return month
}

module.exports = Formatter;