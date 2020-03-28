
const lowerScreen = document.querySelector(".lowerScreen")
const upperScreen =  document.querySelector(".upperScreen")

// clicking on an operator button will set the operator variable

let lastButtonPressed = ""
let secretArray=[]

document.querySelectorAll("button").forEach(button=> button.addEventListener("click",e => HandleOperations(e.target.value)))

document.addEventListener("keypress", e=> {
regex = /[\*\/\-\+\(\)=\.%]/
regex2=/\d/
if (e.key.match(regex) || e.key.match(regex2)) HandleOperations(e.key)
if(e.key === "Enter") HandleOperations("=")
if(e.key === "c") HandleOperations("clear")
handleSecretArray(e.key)



})

function handleSecretArray (element){
    secretArray.push(element)
    if (secretArray.length >8) secretArray = secretArray.slice(-8)
    console.log(secretArray.join("").toUpperCase())
    if(secretArray.join("").toUpperCase()==="CHOOCHOO") lowerScreen.textContent="I Love You!", lastButtonPressed = "secret"
  
}

function HandleOperations(button){
    if (lastButtonPressed === "secret")lowerScreen.textContent=""
    regex = /[\*\/\-\+%]/
    regex2 = /[\*\/\+%]/

    if(button === "="){
            
        upperScreen.textContent += lowerScreen.textContent;
        if (upperScreen.textContent=== "") return ""
        if (upperScreen.textContent[upperScreen.textContent.length-1].match(regex)) upperScreen.textContent = upperScreen.textContent.slice(0,-1);
        if (upperScreen.textContent[0].match(regex2)) upperScreen.textContent = upperScreen.textContent.slice(1);

        
        if (eval(upperScreen.textContent)%1 === 0)  upperScreen.textContent= eval(upperScreen.textContent);
        else   upperScreen.textContent= eval(upperScreen.textContent).toFixed(2);

        lowerScreen.textContent = "";
        lastButtonPressed = "equal";

    }else if(isNaN(button) && (button !== "." && button !== "(" && button !== ")")){
        
        if (button === "clear") return lowerScreen.textContent="",  upperScreen.textContent= "";

        if (lastButtonPressed=== "" && button === "-") return lowerScreen.textContent += button

        if(lastButtonPressed==="operator") upperScreen.textContent = upperScreen.textContent.slice(0,-1)
        upperScreen.textContent += lowerScreen.textContent + button;
        
        lowerScreen.textContent = "";
        lastButtonPressed = "operator";

    }else {
        if(button!==undefined)  lowerScreen.innerHTML += button
        
        
        if (!upperScreen.textContent.match(regex)) upperScreen.textContent = ""

        lastButtonPressed = "number";
    
    }

    }




    // when you click on an operator = set the value of firstNumber as the lower screen, erase lower screen, bring lower screen to upper screen, add operator

    // add paranthesis on first and second number if operation is * or /



    /* make a function as such function HandleOperations(button){
        if button=== "="
        else if isNaN(button) && !=="." (operators)
        else
        then simply call the e.key event on the document, and do add event listener (handleOperations(e.key))
    }*/