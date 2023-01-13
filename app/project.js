let prompt = ''
function generateResponse() {
    console.log("Calling GPT3")
    let url = "https://api.openai.com/v1/engines/text-davinci-003/completions";
    let api = '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'
    let bearer = 'Bearer ' + api

    prompt += '\n'+ document.getElementById('prompt').value

    fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            prompt: prompt,
            temperature: 0.9,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            stream: false,
            logit_bias: {"10000": -100}
            // "stop": "\n"
        })

    })
    .then((response) => {return response.json()})
    .then((data)=>{
        // console.log(Object.keys(data))
        console.log(data)
        console.log(data['choices'][0].text)   

        attachResponse(data['choices'][0].text)

        // return data['choices'][0].text
    })
    .catch(error => {
        console.log(error)
    })

}

function attachResponse(response){
    let text = document.getElementById('text')
    text.style.color = 'white'
    text.innerText = response
}
let button = document.getElementById('execute')
button.addEventListener('click', generateResponse)
window.addEventListener('keydown', (e)=>{
    if (e.key.toUpperCase() == 'ENTER'){generateResponse()}
})
