// variables
const html = new HTMLUI()
const yearField = document.querySelector('#year')
const form = document.querySelector('#request-quote')


// eventListeners
eventListeners()
function eventListeners(){
    document.addEventListener('DOMContentLoaded' , function(){
        html.displayYear()
    })

    // validate and calculate when submit
    form.addEventListener('submit' , validateCalculate)
}