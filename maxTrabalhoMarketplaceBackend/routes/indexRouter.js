var router = require('express').Router();
var Game = require('../mongoSchemas/mainSchema');

router.post('/add', (req, res, next) => {
  let game = new Game(req.body);
  if(req.body != undefined){
    game.save()
    .then((game) => {
      res.status(200).json({
        game: req.body.name + " added successfully",
        success: true
      })
    })
    .catch((err) => {
      res.status(400).json({
        game: "Falha ao salvar",
        success: false
      })
    });
  }else{
    res.status(400).json({
      game: "Falha na request",
      success: false
    });
  }
});

router.get('/', (req, res, next) => {
  Game.find((err, games) => {
    if(err){
      res.status(400).json({
        games: "null",
        success: false  
      });
    }else{
      res.status(200).json(games);
    }
  });
});

router.get('/edit/:id', (req, res, next) => {
  let id = req.params.id;

  Game.findById(id, (err, game) => {
    if(err){
      res.status(400).json({
        game: "null",
        success: false
      });
    }else{
      res.status(200).json(game);
    }
  });
});

router.put('/update/:id', (req, res, next) => {
  let id = req.params.id;
  Game.findById(id, (err, game) => {
    if(err){
      res.status(400).json({
        game: "Erro ao alterar",
        success: false
      });
    }else{
      game.name = req.body.name;
      game.price = req.body.price;

      game.save()
        .then(game => {
          res.status(200).json({
            game: "Alterado com sucesso",
            sucess: true
          })
        })
        .catch((err) => {
          ress.status(400).json({
            game: "Erro na database",
            sucess: false
          })
        })
    }
  });
});

router.get('/delete/:id', (req, res, next) => {
  Game.findByIdAndRemove({_id: req.params.id}, (err, game) => {
    if(err){
      res.status(400).json({
        game: err,
        success: false
      });
    }else{
      res.status(200).json({
        game: "Deletado com sucesso",
        success: true
      })
    }
  });
});
module.exports = router;
