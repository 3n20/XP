function Formatter(result) {
    var year = [0,0,0,0,0,0,0,0,0,0,0,0]
    for (i = 0; result.length > i; i++) {
        var month = new Date(result[i].timestamp).getMonth()
        year[month]++
    }
    return year
}

module.exports = Formatter;