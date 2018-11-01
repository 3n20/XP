function Formatter(result) {
    var day = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    var max = 0
    
    for (i = 0; result.length > i; i++) {
        var hours = new Date(result[i].timestamp).getHours()
        day[hours]++
    }
    return day
}

module.exports = Formatter;