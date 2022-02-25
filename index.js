// This application as it stands will not run properly on Edge Explorer. 
// Research must be done to understand why the query fails in Edge.
const container = document.getElementById('container')
const colorPicker = document.getElementById('colorPicker')
const schemeSelector = document.getElementById('schemes')
const containerOfColors = document.getElementById('colors-container')
const containerOfCodes = document.getElementById('codes-container')
const baseURL = 'https://www.thecolorapi.com'
let hex = 'FFFFFF' /** without the hash so that the api understands it */
let mode = 'monochrome'
const count = 5
let arrayOfColors = [];

// console.log(`${baseURL}/scheme?hex=${hex.slice(1)}&format=json&mode=${mode}`)
// function to retrieve the hex value of the color selected in the color picker
function colorSelected(event){
    hex = event.target.value.slice(1)
    console.log(hex)
}
// function to retrieve the value of the selected mode or scheme and make a fetch call with this value
function schemeSelected(event){
    mode = event.target.value
    console.log(mode)
    fetch(`${baseURL}/scheme?hex=${hex}&format=json&mode=${mode}&count=${count}`)
    .then( res => res.json())
    .then( data => {
        console.log(data)
        arrayOfColors = data.colors 
        // needed info from data:  arrayOfColors[i].hex.value 
        
        //Resetting containers to avoid accumulation of data 
        containerOfColors.innerHTML = ''
        containerOfCodes.innerHTML = ''
        // Loop to generate the necessary divs to display colors and codes
        for(const color of arrayOfColors){
            //   COLORS
            // create a div to display color
            const newColor = document.createElement('div')
            // // give div class of color-display
            newColor.classList.add('color-display')
            // // set background color to hex value
            newColor.style.backgroundColor = color.hex.value
            // append div to containerOfColors
            containerOfColors.appendChild(newColor)
            //  CODES   
            // create a div to display code
            const newCode = document.createElement('div')
            // give div class of color-code
            newCode.classList.add('color-code')
            // set inner text of div hex value of the color
            newCode.innerText = color.hex.value
            // append div to containerOfCodes
            containerOfCodes.appendChild(newCode)
        }

    })
    

}

// fetch("https://www.thecolorapi.com/scheme?hex=ffffff&format=json&mode=monochrome").then( res => res.json()).then( data => console.log(data) )

// Event listener for the color picker to retrieve a color seed that will be used in the Fetch call
colorPicker.addEventListener('change', colorSelected)
// Event listener for the color scheme selector to retrieve the selected mode and make the fetch call
schemeSelector.addEventListener('change', schemeSelected)

