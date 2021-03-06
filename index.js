// This application as it stands will not run properly on Edge Explorer. 
// Research must be done to understand why the query fails in Edge.
const container = document.getElementById('container')
const colorPicker = document.getElementById('colorPicker')
const schemeSelector = document.getElementById('schemes')
const getSchemeBtn = document.getElementById('button')
const containerOfColors = document.getElementById('colors-container')
const containerOfCodes = document.getElementById('codes-container')
const baseURL = 'https://www.thecolorapi.com'
let hex = 'FFFFFF' /** without the hash so that the api understands it */
let mode = 'monochrome'
const count = 5
let arrayOfColors = [];

// initialize app with basic scheme
getScheme()

// function to retrieve the hex value of the color selected in the color picker
function colorSelected(event){
    hex = event.target.value.slice(1)
}
// function to retrieve the value of the selected mode or scheme and make a fetch call with this value
function schemeSelected(event){
    mode = event.target.value    
}
// function to fetch the array of color schemes from the API
function getScheme(){
    fetch(`${baseURL}/scheme?hex=${hex}&format=json&mode=${mode}&count=${count}`)
    .then( res => res.json())
    .then( data => {
        arrayOfColors = data.colors 
        // info needed from data:  arrayOfColors[i].hex.value 
        
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
// copies hex code to clipboard from hex codes container
function CodetoClipboard(e){ 
    // capturing hex code
    let text = e.target.innerText  
    // copy captured hex code
    navigator.clipboard.writeText(text)
    .then( ()=> {
        alert(`'${text}' copied to the clipboard`)
    })
    .catch( () => {
        alert('something went wrong')
    })  
}
// copies hex code to clipboard from background-color in color display divs
function displaytoClipboard(e){
    // capturing background color in rgb format
    let bgColor = e.target.style.backgroundColor
    // function to convert from rgb to hex code
    const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`
    // copy converted background color to hex code
    navigator.clipboard.writeText(rgb2hex(bgColor))
    .then( ()=> {
        alert(`'${rgb2hex(bgColor)}' copied to the clipboard`)
    })
    .catch( () => {
        alert('something went wrong')
    })  
}
// Event listener for the color picker to retrieve a color seed that will be used in the Fetch call
colorPicker.addEventListener('change', colorSelected)
// Event listener for the color scheme selector to retrieve the selected mode and make the fetch call
schemeSelector.addEventListener('change', schemeSelected)
// Event listener for the get scheme button
getSchemeBtn.addEventListener('click', getScheme)
// Event listener for the color displays to copy hex code to clipboard
containerOfColors.addEventListener('click', displaytoClipboard)
// Event listener for the color codes to copy hex code to clipboard
containerOfCodes.addEventListener('click', CodetoClipboard)

