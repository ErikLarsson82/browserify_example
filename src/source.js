var Kurt = require('./Kurt')
var uniq = require('uniq')
var pushbot = require('./pushbot.json')
var Box2D_req = require('./Box2D')

console.log(pushbot)
console.log(window.Box2D, Box2D_req.Dynamics)

class Farmor extends Kurt {
    init() { console.log('farmor' + uniq([1,1,2]))}
}

new Farmor().init()