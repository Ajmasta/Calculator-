
const lowerScreen = document.querySelector(".lowerScreen")
const upperScreen =  document.querySelector(".upperScreen")


// clicking on an operator button will set the operator variable

let lastButtonPressed = ""
let secretArray=[]

document.querySelectorAll("button").forEach(button=> 
        button.addEventListener("click",e => HandleOperations(e.target.value)))

document.addEventListener("keydown", e=> {
regex = /[\*\/\-\+\(\)=\.%]/
regex2=/\d/

// (e.key.length===1) is to handle F10, F12 inputs etc. 

if ((e.key.match(regex) || e.key.match(regex2))&& (e.key.length===1)) HandleOperations(e.key)

//Handling different keys for the same operations, as they are convenient to use with a keyboard
switch (e.key){
    case ("Enter"):
        HandleOperations("=")
        break;
    case(" "):
        HandleOperations("=")
        break;
    case ('c'):
        HandleOperations("clear")
        break;
    case ('Backspace'):
        HandleOperations("backspace")
        break;

}

handleSecretArray(e.key)

document.querySelectorAll("button").forEach(button=>{ 
    
    if (e.key===button.value) {
        
        switch (button.classList.value){
            case("leftButtons"):
                button.classList.add("leftButtonsPressed")
                setTimeout(()=> button.classList.remove("leftButtonsPressed"), 200)
                break;
            
            case("centerButtons"):            
                button.classList.add("centerButtonsPressed")            
                setTimeout(()=> button.classList.remove("centerButtonsPressed"), 200)
                break;
                
            case("rightButtons"):            
                button.classList.add("rightButtonsPressed")            
                setTimeout(()=> button.classList.remove("rightButtonsPressed"), 200)
                break;
            
            case("longButtons"):        
                button.classList.add("longButtonsPressed")            
                setTimeout(()=> button.classList.remove("longButtonsPressed"), 250)
                break;
        }
    }
    else if ((e.key==="c" && button.value==="clear") || (e.key==="Enter" && button.value==="=")
    || (e.key===" " && button.value==="=")) {
      
        button.classList.add("longButtonsPressed")            
        setTimeout(()=> button.classList.remove("longButtonsPressed"), 250)
        
    }

})


})

function handleSecretArray (element){
    secretArray.push(element)
    if (secretArray.length >8) secretArray = secretArray.slice(-8)
    
    if(secretArray.join("").toUpperCase()==="CHOOCHOO") lowerScreen.textContent="I Love You!",
             lastButtonPressed = "secret"
  
}

function HandleOperations(button){
    console.log(button)
    if(lastButtonPressed==="") lowerScreen.textContent=""
    if (lastButtonPressed === "secret") lowerScreen.textContent=""
    if(upperScreen.textContent ==="Error") upperScreen.textContent=""
    regex = /[\*\/\-\+%]/
    regex2 = /[\*\/\+%]/

    if(button === "="){
            
        upperScreen.textContent += lowerScreen.textContent;

        if (upperScreen.textContent=== "") return ""

        if (upperScreen.textContent[upperScreen.textContent.length-1].match(regex)) 
                upperScreen.textContent = upperScreen.textContent.slice(0,-1);

        if (upperScreen.textContent[0].match(regex2)) upperScreen.textContent = upperScreen.textContent.slice(1);

     
        try{

            if (eval(upperScreen.textContent)%1 === 0)  upperScreen.textContent= eval(upperScreen.textContent);
            else   upperScreen.textContent= eval(upperScreen.textContent).toFixed(2);
        }
        catch
        {
            upperScreen.textContent = "Error"
            lowerScreen.textContent=""
            lastButtonPressed = "";
        }

        lowerScreen.textContent = "";
        lastButtonPressed = "";

      //Handling operators  
    }else if(isNaN(button) && (button !== "." && button !== "(" && button !== ")")){
        
        if (button === "clear") return lowerScreen.textContent="",  upperScreen.textContent= "";
       
        if (button === "backspace") {
            if (lowerScreen.textContent) return lowerScreen.textContent = lowerScreen.textContent.slice(0,-1)
            else return upperScreen.textContent = upperScreen.textContent.slice(0,-1)}
       
            //Handling negative numbers input
        if (lastButtonPressed=== "" && button === "-") return lowerScreen.textContent += button, lastButtonPressed = "-", console.log(lastButtonPressed);
        if (lastButtonPressed === "-") return ""
        if(lastButtonPressed==="operator") upperScreen.textContent = upperScreen.textContent.slice(0,-1)

        upperScreen.textContent += lowerScreen.textContent + button;
        lowerScreen.textContent = "";

        lastButtonPressed = "operator";

    }else {
        if(button!==undefined)  lowerScreen.innerHTML += button
        
        if (!upperScreen.textContent.match(regex) &&!lowerScreen.textContent.match(regex)) upperScreen.textContent = ""
        
        if(upperScreen.textContent[0]=== "-" && (lowerScreen.textContent[0]!== "-" && 
                !upperScreen.textContent.slice(1).match(regex))) upperScreen.textContent = ""

        else if (upperScreen.textContent.includes("e") && !upperScreen.textContent[upperScreen.textContent.length-1].match(regex)) upperScreen.textContent = ""

        lastButtonPressed = "number";
    
    }

    }



