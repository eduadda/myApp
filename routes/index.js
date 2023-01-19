var express = require('express');
var router = express.Router();
let userModel= require('./users')


// router.get('/', function(req, res, next) {
 
//   res.render('index',{ title: 'Challange' } )

// });



////create user  //////sign up
router.get('/create', function(req, res, next) {
 
    res.render('signUp',{ title: 'Create' } )
  
});

//////////login user
router.get('/login', function(req, res, next) {
  res.render('login',{ title: 'Login' } )

});

/////save user
router.post('/save', function(req, res, next) {
  userModel.create({
    name:req.body.name,
    userName: req.body.userName,
    age:req.body.age,
    email: req.body.email,
    password:req.body.password,
  }).then((user)=>{
    res.redirect( `/login`)

  })
});

/////////login check

router.post('/checklogin', function(req, res, next) {
  userModel.findOne({userName : req.body.userName})

  .then((user)=>{
    if(user.password === req.body.password){
      res.redirect(`/profile/${user.userName}`)
    }
    else{
      res.render('check',{  title: 'Login' })
    }
 
  })
  

});



///////my profile 
router.get('/profile/:myName', function(req, res, next) {

  userModel.findOne({userName : req.params.myName})
  .then((user)=>{
    res.render('myhome',{ name:user.name , user, title: 'req.params.myName' })
  })


});






/////cards
router.get('/cards', function(req, res, next) {
  userModel.find()
  .then((allUser)=>{

    // res.send(allUser)
    res.render('cards', {allUser,title: 'Cards'})
  })
});

router.get('/all', function(req, res, next) {
  userModel.find()
  .then((allUser)=>{

    res.send(allUser)
    // res.render('cards', {allUser,title: 'Cards'})
  })
});

/////like router
router.get('/like/:id', function(req, res, next) {
  userModel.findOne({_id : req.params.id} )
  
  .then((user)=>{
    if(user.like.indexOf(user._id)=== -1){

      user.like.push(user._id)
    }else{
      user.like.splice( user.like.indexOf(user._id),1 )
    }
    
    user.save()
    .then(()=>{
      res.redirect('/cards')
    })
  })
});


module.exports = router;









// <h1>Hey,<%=user.name%></h1>

