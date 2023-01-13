let prompt = ''
// let key = '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'
function generateResponse() {
    let display = document.getElementById('display')
    let text = document.getElementById('text')
    attachImg(display, text)

    console.log("Submitting")

    let url = "https://api.openai.com/v1/engines/text-davinci-003/completions";
    
    let key = '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'
    let bearer = 'Bearer ' + key
    // console.log(bearer)

    prompt += '\n'+ document.getElementById('prompt').value

    fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
            // 'Content-Type: application/json'
        },
        body: JSON.stringify({
            prompt: prompt,
            temperature: 0.9,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            stream: false,
            // logit_bias: {"10000": -100}
            // "stop": "\n"
        })

    })
    .then((response) => {return response.json()})
    .then((data)=>{
        // console.log(Object.keys(data))
        console.log(data)
        console.log(data['choices'][0].text)   

        removeImg(display)
        attachResponse(data['choices'][0].text, text)

        // return data['choices'][0].text
    })
    .catch(error => {
        console.log(error)
    })

}

function attachResponse(response, text){
    text.style.color = 'white'
    text.innerText = response
}

function removeImg(display){
    display.removeChild(display.querySelector('img'))
}

function attachImg(display, text){
    let img = document.createElement('img')
    img.src = 'images/loading.gif'

    text.innerText = ''
    display.appendChild(img)
}

let button = document.getElementById('execute')
button.addEventListener('click', generateResponse)
window.addEventListener('keydown', (e)=>{
    if (e.key.toUpperCase() == 'ENTER'){generateResponse()}
})
