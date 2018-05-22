var phones = document.getElementsByClassName("phones");

document.getElementById("button").addEventListener("click", function(){
   document.getElementById("box").style.width = "250px"; 
   document.getElementById("box").style.height = "250px"; 
    
    fetch('/item', {
          method:"POST",
          headers: {
            "Content-Type":"application/json"
          },
          body: JSON.stringify({
            "want":"money"
          })
    }).then((response)=>{
        return response.json();
    }).then((json)=>{
        console.log(json.message)
    })
});

for(i=0; i < phones.length; i++){
  phone = phones[i].id
    document.getElementById(phone).addEventListener("click", function(){
       document.getElementById(this.id).style.fontSize = "25px";
        document.getElementById(this.id).style.color = "chartreuse";
    });
};