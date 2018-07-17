
var express = require('express');
var router = express.Router();
var VerifyToken = require("../auth/verifyToken");
var Portfolio = require("../models/portFolio");

// route for create portfolio
router.post("/", VerifyToken,function(req, res){

    var newPortFolio = new Portfolio({
        portfolio_id: Math.floor(1000+Math.random()*9000),
        title: req.body.title,
        description: req.body.description,
        service: req.body.service,
        url: req.body.url,
        client: req.body.client
    });
    newPortFolio.save(function(err, portFolioData) {
      if (err) {
        return res.status(500).json({
          message: err
        });
      } else {
        return res.status(201).json({
            data: portFolioData,
            message : "PortFolio Successfully Created."
        });
      }
    });
    
});

// route for fetching portfolio
router.get("/:id?",VerifyToken,function(req, res){
    
    var callFunc = function(err, portFolioData){
      if (err) {
        return res.status(500).json({
          message: err
        });
      }
      else {
        return res.status(200).json({
            data: portFolioData
        });
      }
    };

    if(typeof req.params.id == "undefined"){
      Portfolio.find({},callFunc);
    }
    else{
      Portfolio.find({'portfolio_id': req.params.id},callFunc);
    }
    
});

// route for updating portfolio
router.put("/:id",VerifyToken,function(req, res){
    
    
  if(typeof req.params.id == "undefined"){
    return res.status(400).json({
      message: "Portfolio id is missing"
    });
  }
  else{
    Portfolio.update(
      {'portfolio_id': req.params.id},
      {
        title: req.body.title,
        description: req.body.description,
        service: req.body.service,
        url: req.body.url,
        client: req.body.client
      },
      function(err, portFolioData){
      if (err) {
        return res.status(500).json({
          message: err
        });
      }
      else {
        return res.status(201).json({
            data: portFolioData
        });
      }
    });
  }
  
});

// route for deleting portfolio
router.delete("/:id",VerifyToken,function(req, res){
    
    
  if(typeof req.params.id == "undefined"){
    return res.status(400).json({
      message: "Portfolio id is missing"
    });
  }
  else{
    Portfolio.deleteOne(
      {'portfolio_id': req.params.id},
      function(err){
      if (err) {
        return res.status(500).json({
          message: err
        });
      }
      else {
        return res.status(204).send();
      }
    });
  }
  
});

module.exports = router;