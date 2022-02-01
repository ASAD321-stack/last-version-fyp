// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();
// app.use(bodyParser);
// var cookieParser = require('cookie-parser')
// app.use(express.json());
// const jwt = require('jsonwebtoken');
// const router = express.Router();
// require('../index.js');
// const User = require('../models/user.model');
// const Driver = require('../models/userSchemaRide');
// const Ride = require('../models/DetailsSchema')
// const bcrypt = require('bcryptjs');
// const dotenv = require('dotenv');
// dotenv.config({ path: '../config.env' });
// app.use(cookieParser());
// const authenticate = require('../middleware/authenticate');
// app.use(express.urlencoded({ extended: true }));
// const moment = require('moment');
// var ObjectId = require('mongodb').ObjectId; 
// const multer = require('multer');
// const path = require('path');
// var http = require('http');
// var nStatic = require('node-static');
// const { log } = require('console');

// var fileServer = new nStatic.Server('./images');

// //app.use(express.static('./images'));

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname+"_"+Date.now()+path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage: storage })

// // app.use('/images', express.static(path.join(__dirname,'../images')));


// router.put('/profile' ,upload.single('photo'), authenticate, async(req,res)=>{
//  const success = req.file.filename+"uploaded successfully";
// try{
//  const loginData = await req['rootUser'].id;
//  const upload = await User.findByIdAndUpdate(loginData,{
//    image:req.file.filename,
//  })
// }catch(e){
//   console.log(e);
// }

// });
// //making images folder public






// //register
// router.post('/register', async (req, res) => {
//   const { username, email, password, cpassword } = req.body;
//   if (!username || !email || !password || !cpassword) {
//       return res.status(422).json({ error: "plz filled the field" });
//   }
//   try {
//       const userExist = await User.findOne({ email: email });
//       if (userExist) {
//           return res.status(422).json({ error: "Email is Already is Registed" });
//       }
//       else if (password != cpassword) {
//           return res.status(422).json({ error: "password are not matching" });
//       }
//       else {
//           const user = new User({ username, email, password, cpassword });


//           await user.save();
//           res.status(201).json({ message: "user registed successfully" });

//       }

//   } catch (err) {
//       console.log(err);
//   }
// });

// // login 
// router.post('/login', async (req, res) => {
//   console.log('-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=--==-=----------------- login');
//   try {
//     let token;
//     const { email, password } = req.body;
//     console.log(req.body);

//     if (!email || !password) {
//       return res.status(422).json({ error: "please filled the field" });
//     }
//     const userLogin = await User.findOne({ email: email });
//     if (userLogin) {

//       const isMatch = await bcrypt.compare(password, userLogin.password);
//       token = await userLogin.generateAuthToken();
//       // console.log("the token part " + token);

//       res.cookie('jwt', token, {
//         expires: new Date(Date.now() + 360000),
//         httpOnly: true
//       });

//       if (!isMatch) {
//         return res.status(400).json({ error: "Invalid Credientials " });
//       } else {
//         return res.json({ message: "User Login Successfully" });
//       }
//     }
//     else {
//      return res.status(400).json({ error: "Invalid Credientials " });
//     }
//   }
//   catch (err) {
//     console.log(err);
//   }
// });



// //post ridedetails
// router.post('/rideDetails', authenticate, async (req, res) => {
//   try {

//     console.log('-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=--==-=----------------- rideDetails post');

//     const { departure, destination, date, time, number, registration, meetupPoint, charges } = req.body;

//     if (!departure || !destination || !date || !time || !number || !registration || !meetupPoint || !charges) {
//       return res.status(422).json({ error: "plz filled the field" });
//     }
//     else {
//       const loginData =     await req['rootUser'].id;
//       const loginUserName = await req['rootUser'].username;
//       const loginEmail =    await req['rootUser'].email;
//       const loginImage =    await req['rootUser'].image;
//       console.log(loginUserName);
//       console.log("=========================");
//       const userData = new Ride({ loginId: loginData, loginName: loginUserName, userName: loginEmail, image:loginImage, departure, destination, date, time, number, registration, meetupPoint, charges });
//       const allAds = new Driver({ userName: loginUserName, departure, destination, date, time, number, registration, meetupPoint, charges });
//       console.log("=====================12121====");
//       await userData.save();
//       await allAds.save();
//       res.status(201).json({ message: "Added" });

//     }
//   } catch (e) {
//     console.log('-=-=-=-=-=-=-=-=- Eror =-=-=--=-=-=-=-==--==-=-');
//     console.log(e);
//     res.send(e);
//   }
// });

// //get ridedetails
// router.get('/rideDetails',authenticate,async (req,res)=>{ 
//   console.log('-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=--==-=----------------- rideDetails');
//   try{
//      const driverData = await Ride.find();
//      res.send(driverData);
//     // console.log(driverData);
     
//   }catch(e)
//   {
//        res.send(e);
//   }
// });

// //get myride
// router.get('/myRide',authenticate,async (req,res)=>{ 
//   console.log('-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=--==-=----------------- myRide');
//   try{
//     const loginData = await req['rootUser'].id;
    
//      const driverData = await Ride.find({loginId:loginData});
//      res.send(driverData);
     
//   }catch(e)
//   {
//        res.send(e);
//   }
// });

// //delete
// router.delete('/delete/:id', async(req,res) => {
//   // console.log("adaf")
//   const id = req.params.id
//   console.log(id);
//   await Ride.findByIdAndDelete(id).then(user =>{
//     if(user)
//     {
//       return res.status(200).json({success: true , message: 'the User is deleted'})
//     } else {
//       return res.status(404).json({success:true ,message: 'User not found'})
//     }
//   }).catch(err=>{
//     return res.status(500).json({success:false, error: err})
//   })
 
// });

// //update
// router.put('/update/:id', async (req, res) => {
//   console.log("=================update");
//   const id = req.params.id;
//   console.log(id);
//   try {
//     const result = await Ride.findById(id);
//     console.log(result);
//     const updateResult = await Ride.findByIdAndUpdate(id, {
//       $set: req.body,
//     },
//       { new: true }
//     );

//     res.status(200).json(updateResult);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get('/getData/:id', async (req, res) => {
//   console.log('-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=--==-=----------------- getData');
//   const id = req.params.id;
//   const driverData = await Ride.findById(id);
//   res.send(driverData);
// });


// //request
// router.post('/request/:id', authenticate, async (req, res) => {
//   const id = req.params.id;
//   console.log(id);

//   const rootId = await req['rootUser'].id;
//   const userData = await req['rootUser'].username;
//   const userDataa = await req['rootUser'].number;
//   const passenger = req.body.passenger;  
//   const data = await Ride.find({loginId:rootId})
//   console.log(data);
//    if (data == false) {
//     await Ride.findByIdAndUpdate(id,
//       {

//         $addToSet: {
//           requests: [
//             {
//               name: userData,
//               number: userDataa
//             }
//           ]
//         },
//       },
    
//       function (err) {
//         if (err) {
//           console.log(err)
//         }
//         else {
//           res.status(200).json({ message: "Request Send" });
//           console.log("Updated User : ");
//         }
//       })
  
//   }
 
// })

// router.delete('/cancel/:id', async (req, res) => {
//   const id = req.params.id
//   console.log(id);
//   console.log("============Cancel");
//   try{
//     const todo = await Ride.findOne({"requests._id":id})
//     console.log(todo);
//     console.log(todo.requests);
//     todo.requests.pull({ _id: id })
//     todo.save();
//     }catch(err)
//     {
//       console.log("======Errrr======Cancel");
//       console.log(err);
//     }
  
// });

 
// // router.get('/home',authenticate,async(req,res)=> {
// //   try {
// //     console.log('-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=--==-=----------------- hello');
// //     // console.log(req)
// //     console.log(req['rootUser'].email)
// //     res.send({ rootUser: req['rootUser'] })
// //     // res.send('hello world');
// //   }catch(e)
// //   {
// //     console.log('-=-=-=-=-=-=-=-=- Eror =-=-=--=-=-=-=-==--==-=-');
// //     console.log(e);
// //     res.send(e);
// //   }
// // });

// router.get('/home', authenticate, async (req, res) => {
  
//   console.log('-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=--==-=----------------- hello');
//   let now = new Date();
//   var dateString = moment().subtract(1, 'days').format('YYYY-MM-DD');
//   await Ride.deleteMany({ date: dateString });
//   res.send({ rootUser: req['rootUser']})
  
// });

// //profile page

// router.put('/password', authenticate, async(req,res)=>{

//   try {
//     console.log("===========profile");
//      const rootUser1 = req['rootUser']._id;
//      const userName = req.body.userName
//      const password = req.body.password;
//      const cpassword = req.body.cpassword;
//      const oldPassword = req.body.oldPassword;
//          const newpass = await bcrypt.hash(password,12);
//          const newCpass = await bcrypt.hash(cpassword,12);
         
//          const match = await User.findById(rootUser1)
//          if(match)
//         {
//          const isMatch =  await bcrypt.compare(oldPassword , match.password)
//          if(isMatch)
//          {
//           const find = await User.findByIdAndUpdate(rootUser1, {
//               password:newpass,
//               cpassword:newCpass,
//           },
//             { new: true });
//           res.status(200).json({message: "Save Changes"});
//          }
//          else {
//            return  res.status(201).json({ error: "Wrong Password" });
//          }

//         }
//   }
//  catch (e) {
//   console.log('-=-=-=-=-=-=-=-=- Eror =-=-=--=-=-=-=-==--==-=-');
//   res.status(500).json(e);
//   console.log(e);

// }

// })

// router.get('/logout',(req,res)=> {
//   console.log('-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=--==-=----------------- logout');
//   res.clearCookie("jwt");
//   res.redirect("/home");
//   // res.status(200).send('User logout')
// });


// router.get('/getData', async (req, res) => {
//   console.log('-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=--==-=----------------- getData');
//   let now = new Date();
//   var dateString = moment().subtract(1, 'days').format('YYYY-MM-DD');
//   await Ride.deleteMany({ date: dateString });
//   const driverData = await Ride.find();
//   res.send(driverData);
// });



// router.get('/getRequest',authenticate, async (req,res) => {
//   console.log("-------------GetRequest");
//   const request =  await req['rootUser'].name;
//  const find = await Ride.find({"requests.name":request});
//     console.log(find.toString());
//     res.send(find);
// })




// module.exports = router;
/////////////////////////////////////////////////////////////////////////////////////////
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser);
var cookieParser = require('cookie-parser')
app.use(express.json());
const jwt = require('jsonwebtoken');
const router = express.Router();
require('../index.js');
const User = require('../models/user.model');
const Driver = require('../models/userSchemaRide');
const Ride = require('../models/DetailsSchema')
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config({ path: '../config.env' });
app.use(cookieParser());
const authenticate = require('../middleware/authenticate');
app.use(express.urlencoded({ extended: true }));
const moment = require('moment');
var ObjectId = require('mongodb').ObjectId; 
const multer = require('multer');
const path = require('path');
var http = require('http');

var nStatic = require('node-static');
const { log } = require('console');

var fileServer = new nStatic.Server('./images');

//app.use(express.static('./images'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname+"_"+Date.now()+path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage })

//app.use('/images', express.static(path.join(__dirname,'../images')));


router.put('/profile' ,upload.single('photo'), authenticate, async(req,res)=>{
 const success = req.file.filename+"uploaded successfully";
try{
 const loginData = await req['rootUser'].id;
 const upload = await User.findByIdAndUpdate(loginData,{
   image:req.file.filename,
 })
}catch(e){
  console.log(e);
}

});
//making images folder public

router.post('/register', async (req, res) => {
    const { username, email, password, cpassword ,number } = req.body;
    if (!username || !email || !password || !cpassword || !number) {
        return res.status(422).json({ error: "plz filled the field" });
    }
    try {
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(422).json({ error: "Email is Already is Registed" });
        }
        else if (password != cpassword) {
            return res.status(422).json({ error: "password are not matching" });
        }
        else {
            const user = new User({ username, email, password, cpassword,number });
  
  
            await user.save();
            res.status(201).json({ message: "user registed successfully" });
  
        }
  
    } catch (err) {
        console.log(err);
    }
  });
  

//login 
router.post('/login', async (req, res) => {
  console.log('-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=--==-=----------------- login');
  try {
    let token;
    const { email, password } = req.body;
    console.log(req.body);

    if (!email || !password) {
      return res.status(422).json({ error: "please filled the field" });
    }
    const userLogin = await User.findOne({ email: email });
    if (userLogin) {

      const isMatch = await bcrypt.compare(password, userLogin.password);
      token = await userLogin.generateAuthToken();
      // console.log("the token part " + token);

      res.cookie('jwt', token, {
        expires: new Date(Date.now() + 360000),
        httpOnly: true
      });

      if (!isMatch) {
        res.status(400).json({ error: "Invalid Credientials " });
      } else {
        res.json({ message: "User Login Successfully" });
      }
    }
    else {
      res.status(400).json({ error: "Invalid Credientials " });
    }
  }
  catch (err) {
    console.log(err);
  }
});





router.post('/rideDetails', authenticate, async (req, res) => {
  try {

    console.log('-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=--==-=----------------- rideDetails post');

    const { departure, destination, date, time, number, flightNo, meetupPoint, charges } = req.body;

    if (!departure || !destination || !date || !time || !number || !flightNo ||  !meetupPoint || !charges) {
      return res.status(422).json({ error: "plz filled the field" });
    }
    else {
      const loginData = await req['rootUser'].id;
      const loginUserName = await req['rootUser'].username;
      const loginEmail = await req['rootUser'].email;
      const loginImage = await req['rootUser'].image;
      const loginRating = await req['rootUser'].rating;
      console.log(loginUserName);
      console.log("=========================");
      const userData = new Ride({ loginId: loginData, loginName: loginUserName, userName: loginEmail, image:loginImage, rating:loginRating,departure, destination, date, time, number, flightNo, meetupPoint, charges,payment:"0" });
      const allAds = new Driver({ userName: loginUserName, departure, destination, date, time, number, flightNo, meetupPoint, charges });
      console.log("=====================12121====");
      await userData.save();
      await allAds.save();
      res.status(201).json({ message: "Added" });

    }
  } catch (e) {
    console.log('-=-=-=-=-=-=-=-=- Eror =-=-=--=-=-=-=-==--==-=-');
    console.log(e);
    res.send(e);
  }
});

router.get('/rideDetails', authenticate, async (req, res) => {
  console.log('-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=--==-=----------------- rideDetails');
  try {
   
    const driverData = await Ride.find();
    res.send(driverData);
  
  } catch (e) {
    res.send(e);
  }
});
router.get('/myRide', authenticate, async (req, res) => {
  console.log('-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=--==-=----------------- myRide');
  try {
    const loginData = await req['rootUser'].id;
    const userData = await req['rootUser'].name;
    console.log(userData);
    const driverData = await Ride.find({ loginId: loginData });
    console.log(driverData)
    res.send(driverData);

  } catch (e) {
    res.send(e);
  }
});

router.put('/update/:id', async (req, res) => {
  console.log("=================update");
  const id = req.params.id;
  console.log(id);
  try {
    const result = await Ride.findById(id);
    console.log(result);
    const updateResult = await Ride.findByIdAndUpdate(id, {
      $set: req.body,
    },
      { new: true }
    );

    res.status(200).json(updateResult);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.delete('/cancel/:id', async (req, res) => {
  const id = req.params.id
  console.log(id);
  console.log("============Cancel");
  try{
    const todo = await Ride.findOne({"requests._id":id})
    console.log(todo);
    console.log(todo.requests);
    todo.requests.pull({ _id: id })
    todo.save();
    }catch(err)
    {
      console.log("======Errrr======Cancel");
      console.log(err);
    }
  
});

router.delete('/delete/:id', async (req, res) => {
  const id = req.params.id
  console.log(id);
  console.log("============delete");
  await Ride.findByIdAndDelete(id).then(user => {
    if (user) {
      return res.status(200).json({ success: true, message: 'the User is deleted' })
    } else {
      return res.status(404).json({ success: true, message: 'User not found' })
    }
  }).catch(err => {
    return res.status(500).json({ success: false, error: err })
  })
  
});


router.put('/request/:id', authenticate, async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const rootId = await req['rootUser'].id;
  const userData = await req['rootUser'].username;  
  const userNumber = await req['rootUser'].number; 
  const userImage = await req['rootUser'].image;  
  const userRating = await req['rootUser'].rating;
  const data = await Ride.find({loginId:rootId})
  console.log(data);
   if (data == false) {
    await Ride.findByIdAndUpdate(id,
      {
        $addToSet: {
          requests: [
            {
              ID:rootId,
              name: userData,
              number:userNumber,
              image:userImage,
              rating:userRating
            }
          ]
        },
      },
    
      function (err) {
        if (err) {
          console.log(err)
        }
        else {
          res.status(200).json({ message: "Request Send" });
          console.log("Updated User : ");
        }
      })
  
  }
  else {
     res.status(500).json({ error: "Request Not Sent:Authorization" });
  }
})


//home
router.get('/home', authenticate, async (req, res) => {
  
    console.log('-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=--==-=----------------- hello');
    let now = new Date();
    var dateString = moment().subtract(1, 'days').format('YYYY-MM-DD');
    await Ride.deleteMany({ date: dateString });
    res.send({ rootUser: req['rootUser']})
    
});

router.put('/changeData', authenticate, async(req,res)=>{

  try {
    console.log("===========Profile");
     const rootUser1 = req['rootUser']._id;
     const number = req.body.userNumber
         
          await User.findByIdAndUpdate(rootUser1, {
             number:number
          },
            { new: true });
          res.status(200).json({message: "Save Changes"});
  }
 catch (e) {
  console.log('-=-=-=-=-=-=-=-=- Eror =-=-=--=-=-=-=-==--==-=-');
  res.status(500).json(e);
  console.log(e);

}

})


router.put('/password', authenticate, async(req,res)=>{

  
  console.log("===========Password");
   const rootUser1 = req['rootUser']._id;
   const userName = req.body.userName
   const password = req.body.password;
   const cpassword = req.body.cpassword;
   const oldPassword = req.body.oldPassword;

   if (!password || !cpassword ) {
    return res.status(400).json({ error: "plz filled the field" });
  }

  try {

     if (password != cpassword) {
      return res.status(422).json({ error: "password are not matching" });
    }
    else{
       const newpass = await bcrypt.hash(password,12);
       const newCpass = await bcrypt.hash(cpassword,12);
       
       const match = await User.findById(rootUser1)
       if(match)
      {
       const isMatch =  await bcrypt.compare(oldPassword , match.password)
       if(isMatch)
       {
        const find = await User.findByIdAndUpdate(rootUser1, {
            password:newpass,
            cpassword:newCpass,
        },
          { new: true });
        res.status(200).json({message: "Save Changes"});
       }
       else {
         return  res.status(201).json({ error: "Wrong Password" });
       }

      }
    }
}
catch (e) {
console.log('-=-=-=-=-=-=-=-=- Eror =-=-=--=-=-=-=-==--==-=-');
res.status(500).json(e);
console.log(e);

}

})



router.get('/logout', (req, res) => {
  console.log('-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=--==-=----------------- logout');
  res.clearCookie("jwt");
  res.redirect("/home");
});


router.get('/getRequest',authenticate, async (req,res) => {
  console.log("-------------GetRequest");
  const request =  await req['rootUser'].username;
 const find = await Ride.find({"requests.name":request});
 res.send(find);
  
})

router.get('/getData/:id', async (req, res) => {
  console.log('-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=--==-=----------------- getData');
  const id = req.params.id;
  const driverData = await Ride.findById(id);
  res.send(driverData);
});

router.get('/getRequest',authenticate, async (req,res) => {
  console.log("-------------GetRequest");
  const request =  await req['rootUser'].loginName;
 const find = await Ride.find({"requests.name":request});
 res.send(find);
  
})

router.put('/payment/:id', authenticate, async(req,res) => {
  console.log("=================payment");
  const id = req.params.id;
  console.log(id);
  try {
    const payments = req.body.payment;
    const getPayment = await Ride.findById(id);
    const addPayment = +getPayment.payment + +payments;
     console.log(payments);
     console.log(addPayment);
    
      await Ride.findByIdAndUpdate(id, {
        payment:addPayment
      },
        { new: true }
      );
    
    res.status(200).json(updateResult);
  } catch (err) {
    res.status(500).json(err);
  }
})

router.put('/rating/:id',authenticate, async(req,res)=>{
  console.log("=================update");
  const id = req.params.id;
  console.log(id);
  try {
   const rating = req.body.rating;
   console.log(rating);
    const updateResult = await User.findByIdAndUpdate(id, {
          
      rating:rating*5/5
    },
    {new:true}
    );

    res.status(200).json(updateResult);
  } catch (err) {
    res.status(500).json(err);
  }
})



module.exports = router;