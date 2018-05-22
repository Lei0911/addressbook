
var crNum1 = document.getElementById("chatRoom1"),
	// crNum2 = document.getElementById("chatRoom2"),
	// crNum3 = document.getElementById("chatRoom3"),
	sdB = document.getElementById("sendBtn"),
	nChtRoom = document.getElementById("addCrButton"),
	chtDisp = document.getElementById("chatDisplay"),
	addChtRmPupPg = document.getElementById("addChatRoomPopUpPage"),
	createBtn = document.getElementById("createButton"),
	cDetails = document.getElementById("chatDetails"),
	ctRmList = document.getElementById("chatRoomList"),
	sdInp = document.getElementById("sendInp"),
	perConInfo = document.getElementById("personContactInfo"),
	createCRN = document.getElementById("createChatRoomName"),
	nCtRmName = document.getElementById("newChatRoomName"),
	// ctRmToBeAdd = document.getElementById("chatroom_to_be_added"),
	socket = io(),
	userid = '',
	currentRoom='',
	//validateChatData = (chatData) => {},
	uNList = document.getElementById("userNameList");
	
	
	
nChtRoom.addEventListener("click",function(){                  //  "new chatroom" button 
		addChtRmPupPg.style.display = "block";
	    fetch('/adUserDiv', {
          method:"POST",
          headers: {
            "Content-Type":"application/json"
          },
          body: JSON.stringify({
            "require":"name"
          })
    }).then((response)=>{
        return response.json();
    }).then((json)=>{
        perConInfo.innerHTML = "";
		console.log(json)
		for(i=0; i < json.length; i++){
			
			console.log(json[i]);
			adUserDiv = document.createElement("div");
			adUserDiv.className = "adUrDiv";
			adUserDiv.innerHTML = json[i].fName+" "+json[i].lName;
			adUserDiv.id = json[i].userId
			
			perConInfo.appendChild(adUserDiv);
		}
    })
});


createBtn.addEventListener("click",function(){                          //"create" new chatroom button
	var newChatRoom = document.createElement("div");
	newChatRoom.className = "nCtrm";
	ctRmList.appendChild(newChatRoom);
	addChtRmPupPg.style.display = "none";
	newChatRoom.innerHTML = createCRN.value;
});
createCRN.addEventListener("keyup", function(ev){                  // give a name of a new created chatroom text "input-box"
	if(ev.keyCode=="13"){
		nCtRmName.innerHTML = createCRN.value;
		createCRN.value="";
	};
});
	
crNum1.addEventListener("click",function(){                      // chatroom main page --> "ChatRoom No.1"
	socket.emit("choiceChat",{room:this.id, user:userid});	
	cDetails.style.display = "block";
});

sdB.addEventListener("click",function(){                     // "Send Message" button
	socket.emit('sendMessage', {room:currentRoom, message:sdInp.value, user: userid});
	sdInp.value = "";
});
sdInp.addEventListener("keyup",function(ev){                 //send message input "text-box"
	if(ev.keyCode=="13"){
		socket.emit('sendMessage', {room:currentRoom, message:sdInp.value, user: userid});
		sdInp.value="";
	}
});

socket.on('chat', function(data){
	var mess = document.createElement("div");
	var user = document.createElement("div");
	var message = document.createElement("div");
	
	mess.className="messDiv";
	user.className="userNameDiv";
	message.className="textInfoDiv";

	
	user.innerHTML = data.user+":";
	message.innerHTML = data.message;
	

	
	mess.appendChild(user);
	mess.appendChild(message);
	cDetails.appendChild(mess);
	
	
	//cDetails.appendChild(message)
})
socket.on('currentRoom', function(data){
	currentRoom = data;
	console.log(currentRoom)
})
socket.on('userAcount',function(data){
	userid=data
})
socket.on('joinRoom',function(data){
	uNList.innerHTML = ''
	for(var i=0;i<data.length; i++){
		var user= document.createElement("div")
	user.innerHTML = data[i]
	uNList.appendChild(user)
	user.className = "users"
	}
	
});








