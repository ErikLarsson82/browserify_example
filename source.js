var Kurt = require('./Kurt')
var uniq = require('uniq')

class Farmor extends Kurt {
    init() { console.log('farmor' + uniq([1,1,2]))}
}

new Farmor().init()