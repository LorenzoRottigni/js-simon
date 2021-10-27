function generateRandomInt(){
    return Math.floor(Math.random()*50)
}
const randomArray = []
const arrayLength = 5

function startTimer(iterations){
    const timer = document.querySelector('.timer')
    let currentValue = parseInt(timer.textContent)
    const intervalHandler = setInterval(timerIncrementer, 100);
    function timerIncrementer(){
        timer.textContent = currentValue++
        if(currentValue > iterations)
            clearInterval(intervalHandler)
    }

}



for (let i = 0; i < arrayLength; i++) {
    randomArray.push(generateRandomInt())
}
for (let i = 0; i < randomArray.length; i++) {
    const element = randomArray[i];
    console.log(element)
}


alert(`Remember generated numbers: ${randomArray.join().replaceAll(',','·')}`)

startTimer(30);