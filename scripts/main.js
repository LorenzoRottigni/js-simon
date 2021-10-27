

const button = document.querySelector('button');
const numberGrid = document.querySelector('.number-grid')
const numberContainer = document.getElementById('number-container')
const timer = document.querySelector('.timer')
let buttonConditioner = true
let currentValue = parseInt(timer.textContent)
const randomArray = []
const arrayLength = 5
const text = document.querySelector('h1')


function generateRandomInt(){
    return Math.floor(Math.random()*50)
}

function startTimer(iterations){
    const intervalHandler = setInterval(timerIncrementer, 100);
    function timerIncrementer(){
        timer.textContent = currentValue++
        if(currentValue > iterations){
            clearInterval(intervalHandler)
            interfaceToggler()
            userInput()
        }
    }

}

function interfaceToggler(){
    if(timer.classList.contains('d-none')){
        timer.classList.replace('d-none','d-flex')
        numberContainer.classList.add('d-none')
    }else{
        timer.classList.replace('d-flex','d-none')
        numberContainer.classList.remove('d-none')
    }
}

function userInput(){
    const iconSlotAll = document.querySelectorAll('input[type="number"]')

    iconSlotAll.forEach(element => {
        element.value = ''
    });
    text.textContent = 'Write the correct sequence:'
  
}

function numberGridGenerator(){
    for (let i = 0; i < arrayLength; i++) {
        randomArray.push(generateRandomInt())
        createNumberSlot(randomArray[i], numberGrid)
    }
    
}

function createNumberSlot(inputNumber, targetContainer){
    const numberSlot = document.createElement('input')
    numberSlot.type = 'number'
    numberSlot.value = inputNumber
    numberSlot.classList.add('p-3','bg-light','rounded','shadow', 'number-slot')
    targetContainer.appendChild(numberSlot)
}

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
            element.style.backgroundColor = 'green'
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


numberGridGenerator()


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



