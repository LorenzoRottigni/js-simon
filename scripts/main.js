

//ELEMENT BUTTON -- toggle numberContainer / timer
const button = document.querySelector('button');
//to execute the other function respect the precedently executed
let buttonConditioner = true
//istructions
const text = document.querySelector('h1')
//container of numberGrid
const numberContainer = document.getElementById('number-container')
//container of generated number solts
const numberGrid = document.querySelector('.number-grid')
//container for the clock
const timer = document.querySelector('.timer')
//timer time to int
let currentValue = parseInt(timer.textContent)
//array of random ints < 50
const randomArray = []
//number of random numbers
const arrayLength = 5

/*
*   returns a random int >0 and <50
*   @returns {number}
*/
function generateRandomInt(){
    return Math.floor(Math.random()*50)
}
/*
*   Starts a timer and at the end toggles the interface and reset fields for user input
*   @param {number} iterations - number of seconds to set timer
*/
function startTimer(iterations){
    const intervalHandler = setInterval(timerIncrementer, 1000);
    function timerIncrementer(){
        timer.textContent = currentValue++
        if(currentValue > iterations){
            clearInterval(intervalHandler)
            interfaceToggler()
            text.textContent = 'Write the correct sequence:'
            document.querySelectorAll('input[type="number"]').forEach(element => {
                element.value = ''
            });
        }
    }

}
/*
*   changes the display status of the timer and the number container true => false, true => false
*/
function interfaceToggler(){
    if(timer.classList.contains('d-none')){
        timer.classList.replace('d-none','d-flex')
        numberContainer.classList.add('d-none')
    }else{
        timer.classList.replace('d-flex','d-none')
        numberContainer.classList.remove('d-none')
    }
}

/*
*   generates the random numbers array and writes them into slots
*/
function numberGridGenerator(){
    for (let i = 0; i < arrayLength; i++) {
        randomArray.push(generateRandomInt())
        createNumberSlot(randomArray[i], numberGrid)
    }
}
/*
*   Generates a new slot containing random number and appends it to parent container
*   @param {number} inputNumber - random input number
*   @param {HTMLElement} targetContainer - container to append the input number
*/
function createNumberSlot(inputNumber, targetContainer){
    const numberSlot = document.createElement('input')
    numberSlot.type = 'number'
    numberSlot.value = inputNumber
    numberSlot.classList.add('p-3','bg-light','rounded','shadow', 'number-slot')
    targetContainer.appendChild(numberSlot)
}
/*
*   Checks if the inserted numbers are equal to the generated ones, clones slots and write in new slots the generated random numbers array
*   Generates new button for refresh page
*/
function checkNumbers(){
    const iconSlotAll = document.querySelectorAll('input[type="number"]')
    numberContainer.removeChild(button);
    let i = 0
    let correctAnswers = 0
    const newContainer = numberGrid.cloneNode(false)
    iconSlotAll.forEach(element => {
        createNumberSlot(randomArray[i], newContainer)
        if(parseInt(element.value) === randomArray[i])
            correctAnswers++
        if(correctAnswers === randomArray.length)
            text.textContent = 'YOU WON!!!'
        else
            text.textContent = `${correctAnswers} answers correct`
        i++
    });
    newContainer.classList.add('mt-5')
    numberContainer.appendChild(newContainer);
    const refreshButton = document.createElement('button');
    refreshButton.classList.add('mt-5','rounded','px-5','py-3','bg-light','fs-3','shadow')
    refreshButton.textContent = 'PLAY AGAIN'
    refreshButton.addEventListener('click',()=>{
        location.reload()
    })
    numberContainer.appendChild(refreshButton)
}

//write number grid
numberGridGenerator()

//set listener to button
button.addEventListener('click', ()=>{
    if(buttonConditioner){
        interfaceToggler()
        startTimer(30);
        buttonConditioner = false
    }else{
        checkNumbers()
        buttonConditioner = true
    }
    
})



