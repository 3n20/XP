function Formatter(result) {
    var week = [0,0,0,0,0,0,0]
    for (i = 0; result.length > i; i++) {

        var day = new Date(result[i].timestamp).getDay()
        week[day]++
        
    }
    return week
}

module.exports = Formatter;