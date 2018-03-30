var express = require('express');
var brain =  require ('brain.js');
var router = express.Router();
var  data = require('./data')
var net = new brain.NeuralNetwork();


/* GET home page. */
router.get('/samples', function(req, res, next) {
  console.log(req);
  res.render('index', { title: 'Express' });

});

function trainer(){
  net.train(data,{
              // Defaults values --> expected validation
iterations: 200000,    // the maximum times to iterate the training data --> number greater than 0
errorThresh: 0.005,   // the acceptable error percentage from training data --> number between 0 and 1
log: true,           // true to use console.log, when a function is supplied it is used --> Either true or a function
logPeriod: 10,        // iterations between logging out --> number greater than 0
learningRate: 0.3,   // scales with delta to effect training rate --> number between 0 and 1
momentum: 0.1,        // scales with next layer's change value --> number between 0 and 1
callback: null,       // a periodic call back that can be triggered while training --> null or function
callbackPeriod: 10,   // the number of iterations through the training data between callback calls --> number greater than 0
timeout: Infinity     // the max number of milliseconds to train for --> number greater than 0
});
}

trainer();
router.get('/model', function(req, res, next){
  
  var output = net.run({
      pH: 4,
      Disolved_Oxygen:15,
      Alkalinity: 47,
      fColiform: 121,
      nitrates: 4,
      phosphates: 1, 
      turbidity: 3
    });
  console.log(output);
})

module.exports = router;
