const express = require('express');
const app = express();
const cors = require('cors');
require("dotenv").config();
const db=require('./db/connect')
const userdb = require('./model/user')
const session = require('express-session')
const passport = require('passport')
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;


const GenAI = require('./utils/GenAI');
const user = require('./model/user');

app.use(cors({
	origin:"http://localhost:5173",
	methods:"GET,POST,PUT,DELETE",
	credentials:true
}));

app.use(express.json());

//setup session
app.use(session({
	secret:"qwertyuiop",
	resave:false,
	saveUninitialized:true
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(
	new GoogleStrategy({
		clientID:process.env.clientId,
		clientSecret:process.env.clientSecret,
		callbackURL:"/auth/google/callback",
		scope:['email','profile'],
		passReqToCallback:true
	},
	async(request,accessToken,refreshToken,profile,done)=>{
		// console.log(profile)
		console.log(accessToken)
		console.log(refreshToken)
		try{
			let user = await userdb.findOne({googleId:profile.id})
			// console.log(user)
			if(!user){
				user = new userdb({
					googleId:profile.id,
					displayName:profile.displayName,
					email:profile.emails[0].value,

				})
				await user.save()
				request.logIn(user, (err) => {
					if (err) {
					  return done(err);
					}
					return done(null, user);
				});
				console.log("saved")
				return done(null,user)
			}
		}
		catch(err){
			console.log(err)
			return done(err,null)
		}
	}
	)	
)

passport.serializeUser((user, done) => {
	done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
	try {
	  const user = await userdb.findById(id);
	  done(null, user); // Pass the whole user object
	} catch (err) {
	  done(err, null);
	}
  });


app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: "http://localhost:5173/details",
        failureRedirect: 'http://localhost:5173/'
}));

app.get("/login/success",async(req,res)=>{
	console.log("requesttttttttttttttt",req.user)
	if(req.user){
		res.status(200).json({message:"User Authenticated",user:req.user})
	}else{
		res.status(400).json({message:"User not Authenticated"})
	}
})

app.post('/interview', async (req, res) => {
	const { companyName, position } = req.body;
	const interview = await GenAI.simulateInterview(companyName, position);
	res.status(200).json(interview);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
	db()
});