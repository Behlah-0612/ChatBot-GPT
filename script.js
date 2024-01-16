const chat = document.getElementById('chat-log'),input = document.getElementById('user-input'),sendBtn = document.getElementById('send-button'),btnIcon = document.getElementById('button-icon'),info=document.querySelector('.info');

sendBtn.addEventListener('click', sendMsg);
input.addEventListener('keydown',(event)=>{
    if(event.key == 'Enter'){
        sendMsg();
    }
});

function sendMsg(){
    const msg = input.value.trim();


    //if the user enters nothing - chatbot will do nothing
    if (msg==''){
        return;
    }

    // if the user enters developer - chatbot will tell my message
    else if(msg == 'developer'){
        input.value = '';
        appendMsg('user',msg);
        setTimeout(()=>{
            appendMsg('bot','The website is coded by Behlah - a student in TRU, Kamloops');
            btnIcon.classList.add('fa-solid','fa-paper-airplane');
            btnIcon.classList.remove('fas','fa-spinner','fa-pulse');
        }, 2250);
        return;
    }

    appendMsg('user',msg);
    input.value = '';
    

    // CHAT GPT API 
   /* const url = 'https://chatgpt-42.p.rapidapi.com/conversationgpt4';
const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/json',
		'X-RapidAPI-Key': '077766acfbmshca4a51beb6cf1a6p143ce0jsn3af78c369685',
		'X-RapidAPI-Host': 'chatgpt-42.p.rapidapi.com'
	},
	body: {
		messages: [
			{
				role: 'user',
				content: 'hello'
			}
		],
		system_prompt: '',
		temperature: 0.9,
		top_k: 5,
		top_p: 0.9,
		max_tokens: 256,
		web_access: false
	}
};*/

    const yourOpenAIKey = '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'; 
    const yourOpenAIHost = 'https://api.openai.com';

    //tester key : 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; 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

    const options= {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-OpenAI-Key': yourOpenAIKey,
            'Authorization': `Bearer ${yourOpenAIKey} `,  
            'X-OpenAI-Host': yourOpenAIHost,
        },
        body:(`{"messages":[{"role":"user","content":"${msg}"}]}`)
    };

    fetch(`https://api.openai.com/v1/completions`, options)
        .then((response) => response.json())
        .then((response) => {
            appendMsg('bot', response.choices[0].messages.content);
            btnIcon.classList.add('fa-solid', 'fa-paper-airplane');
            btnIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
        })
        .catch((err) => {
            if (err.name === 'TypeError') {
                appendMsg('bot', 'Error: Your API Key is not accesible');
                btnIcon.classList.add('fa-solid', 'fa-paper-airplane');
                btnIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
            }
        });


}
function appendMsg(sender,message){
    info.style.display ="none";
    btnIcon.classList.remove('fa-solid','fa-paper-airplane');
    btnIcon.classList.add('fas','fa-spinner','fa-pulse');

    const msgElement = document.createElement('div');
    const iconElement = document.createElement('div');
    const chatElement = document.createElement('div');
    const icon = document.createElement('i');

    chatElement.classList.add('chat-box');
    iconElement.classList.add('icon');
    msgElement.classList.add(sender);
    msgElement.innerText = message;

    if(sender === 'user'){
        icon.classList.add('fa-regular','fa-user');
        iconElement.setAttribute('id','user-icon');
    }
    else{
        icon.classList.add('fa-solid','fa-robot');
        iconElement.setAttribute('id','bot-icon');
    }

    iconElement.appendChild(icon);
    chatElement.appendChild(iconElement);
    chatElement.appendChild(msgElement);
    chat.appendChild(chatElement);
    chat.scrollTo = chat.scrollHeight;

}