//test comment

const express = require("express")  //imports express module which helps with making internet connections 
const app = express()
const bodyParser = require("body-parser") //helps with retrieveing stuff from database
const hbs = require("hbs");

const http = require("http").createServer(app);
const io = require("socket.io").listen(http);


var char_room= [{chat_name: "chatRoom1", currentUser: []},{chat_name: "chatRoom2", currentUser: []},{chat_name: "chatRoom3", currentUser: []}]
	user_count = 0;
	


app.use(express.static(__dirname + "/folder")) //<-- css and javascript
app.use(bodyParser.json()) // this will run first before it sends something
app.set("view engine", "hbs")
//--------------------------------------------------------------------
app.get('/', function(require,response){
    
	response.render("index.hbs", {
        stuff:"a message",
        phoneNumber: [{phone:"1234567890", name:"John Doe"},{phone:"6045324567", name:"Jane Doe"},{phone:"4145679087", name:"November Falls"}]
    })
    
}) //This is called a router which helps you get to your page
app.get('/chat',function(require,response){
	response.sendFile(__dirname + "/chat.html")
	
});
app.post('/item', (require,response)=>{
    console.log(require.body.want)
    response.send({message:"I got them monies"})
});

app.post('/adUserDiv', (require,response)=>{
    console.log(require.body)
    response.send([{fName:"tom",lName:"jack",userId:"123"}, {fName:"sasha",lName:"Ann",userId:"456"}])
});

app.post('/newChatRoomDiv', (require,response)=>{
    console.log(require.body)
    response.send({message:"ok"})
});

app.get('/profile', (require,response)=>{
  profileInfo = {fname:"fname", lname:"lname", bio:"A users bio", email:"email", phone:["1234", "5678", "9012"], addresses:["first street", "second second avenue", "three third road"]}
    
    response.render("profile.hbs", profileInfo);
    //INCORPORATE ^^^ KEYS ^^^ AS THE HBS THINGS
});

app.get("/message",(require,response)=>{
    
	response.send("first message")
    
});
//-------------------------------------------------------------------
var users=[];
io.on('connection', function(socket){
	console.log("user connected")
	user_count +=1
	socket.emit('userAcount', 'user'+user_count.toString())
	
	
	socket.on("choiceChat", function(data){      //socket.on <--listen 
		console.log(data)
		socket.join(data.room)
		socket.emit('currentRoom', data.room)
		for(i=0;i < char_room.length; i++){
			if(char_room[i].chat_name == data.room){
				if(char_room[i].currentUser.indexOf(data.user) == -1){
					char_room[i].currentUser.push(data.user)
					io.in(data.room).emit('joinRoom', char_room[i].currentUser)
					io.in(data.room).emit('chat', {user:'Server', message:data.user+' has joined this room !'})
				}
			}
		}
		
		 //anything.emit <-- say something
	})
	
	
	socket.on("sendMessage", function(data){
		io.in(data.room).emit('chat', {user:data.user, message:data.message})
	})
	socket.on('disconnect', function(){
		console.log("user disconnected")
	}); 
})

//-------------------------------------------------------------------
//below setup my own server
http.listen(4500, function(err){
	if(err){
		console.log(err)
	}
	console.log("listening on port 4500")
})

//response.sendFile(__dirname + "/example.html")


