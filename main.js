
//first window variabl
const ukrainianWord = document.getElementById("ukrainian_word"),
      germanWord = document.getElementById("german_word");

const btnStart =  document.getElementById("btn_start"),
      btnToAdd = document.getElementById("btn_to_add");

const divPush   = document.getElementById("div_push");
const firstScreen  = document.getElementById("first screen");
const windowWithArrays = document.getElementById("window_with_arrays");



// chek for localStorage 
let taskQuestion = [] ;

!localStorage.taskQuestion ? taskQuestion = [] : taskQuestion = JSON.parse(localStorage.getItem('taskQuestion'));



//game window variabl
const section1 = document.getElementById("section_1"),
      section2 = document.getElementById("section_2");

const gameWindow = document.getElementById("game_window");
const ukrainianQuestion = document.getElementById("ukrainian_question");
const indexQuestion = document.getElementById("index_question");
const germanQuestion = document.getElementById("german_question");
const gameBtn = document.getElementById("game_btn");
const checkButton = document.getElementById("check_button");


const openInput = document.getElementById("open_input");
const addWord = document.getElementById("add_word");
const popup = document.getElementById("popup");
const btnClose = document.getElementById("popup_close");

let index = 0 ;

const allWord = [];


//localstorage variable


const addLocalstorageBtn = document.getElementById("add_in_localStorage");
const inputAddInLocalStorage = document.getElementById("input_add_in_localStorage");
const divTextPush = document.getElementById("div_text_push");






let indexRandom;
 const compleatetAnswer = [];








// Events
addWord.addEventListener("click", () => {
     openInput.classList.add("open")
})

btnToAdd.addEventListener('click', () =>{
    addingElements()
    console.log(allWord)
    
    ukrainianWord.value =''; 
    germanWord.value = '';
    
});
btnClose.addEventListener('click', () => {
    location.reload()
 })

 

 btnStart.addEventListener("click", () =>{
       section1.classList.add("none")
       section2.classList.add("lok")
       
       randomQuestion()
       
       
       
       indexQuestion.innerHTML =index;
 })

 checkButton.addEventListener('click', () => {
   checkQuestion(indexRandom)
               
 })

gameBtn.addEventListener("click", () => {
            
                germanQuestion.classList.remove('green')
                germanQuestion.classList.remove('red')
                germanQuestion.value ="";
                ukrainianQuestion.innerHTML = "";
                index++
                indexQuestion.innerHTML = index;

                randomQuestion()
                
                console.log(compleatetAnswer)
                
 })




//first window code 
const addingToTheWindow = () => {
    divPush.innerHTML += `
        <div class="flex_div">
            <p class="ukr">${ukrainianWord.value}</p>
            <p class="ger">${germanWord.value}</p> 
        </div>
    `
}

 function CreatingAnObject (ukrValue,gerValue) {
    this.ukrValue = ukrValue;
    this.gerValue =gerValue;
}
  
 
const addingElements = () => {

    if(ukrainianWord.value && germanWord.value !== '' ){
        allWord.push(new CreatingAnObject(ukrainianWord.value, germanWord.value))
         addingToTheWindow()
         
    } else {
        alert('ВВЕДІТЬ ЩОСЬ')
    }
       
 }






//game code
 const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * allWord.length)
   let hitDuplicate = false ;
    
   

    

    if(index == allWord.length) {
         popup.classList.add("open")
    }else {
        
        if(compleatetAnswer.length > 0) {
            compleatetAnswer.forEach(item => {
                if(item == randomNumber) {
                    hitDuplicate = true;
                }
            });
            }

            if(hitDuplicate){
                randomQuestion()
            }else{
                indexRandom = randomNumber;
                console.log(indexRandom)
                
                creatingQuestion() 
            }


            if(compleatetAnswer.length == 0){
                indexRandom = randomNumber;
               
                creatingQuestion()
            }
           
    };
     
    console.log(compleatetAnswer);
        compleatetAnswer.push(indexRandom);
    

    
 }




const checkQuestion = (ind) => {
    if(allWord[ind].gerValue == germanQuestion.value) {
       germanQuestion.classList.add("green")   
    } 
    else if (allWord[ind].gerValue !== germanQuestion.value) {
        germanQuestion.classList.add("red") 
    }
}
const creatingQuestion = () => {
    ukrainianQuestion.innerHTML = allWord[indexRandom].ukrValue;

      
}

 
 

 



//LocalStorage work

function creteHTMLText(it){
    windowWithArrays.innerHTML  += `
    <div class="box_p">
          <p class="text_comand">${it}</p>
    </div>    
`
}


const creatSentencesInHTML = () =>{

if(taskQuestion.length > 0) {
      

    for(let i = 0; i < taskQuestion.length; i++) {
        creteHTMLText(taskQuestion[i].nameObject)
        
    }
      
        
       
       
      
} 

}

creatSentencesInHTML()








 

addLocalstorageBtn.addEventListener("click", () => {
    puschInLocalStorage()
    location.reload()
})

function CreatingObjectForStorage (nameObject,err) {
    this.nameObject = nameObject;
    this.err = err

}

const puschInLocalStorage = () => {
    taskQuestion.push(new CreatingObjectForStorage(inputAddInLocalStorage.value,allWord))
    localStorage.setItem('taskQuestion', JSON.stringify(taskQuestion))   
} 
const allTextComand = document.querySelectorAll(".text_comand")






const checkAnswer = (er) => {
    

    for(let ind = 0; ind < taskQuestion.length; ind++) {
        if(taskQuestion[ind].nameObject == er.srcElement.innerText){
            for(let i = 0; i < taskQuestion[ind].err.length; i++){
                allWord.push(taskQuestion[ind].err[i])
            }
        }
       
    }
    console.log(allWord)

 }


for(let inde of allTextComand){
    inde.addEventListener('click',e => checkAnswer(e))
}

