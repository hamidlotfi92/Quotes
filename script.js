//Query selectors
const quoteContainer=document.querySelector("#quot-container");
const quoteText=document.querySelector("#quot");
const authorText=document.querySelector("#author");
const tweeterButton=document.querySelector("#tweeter");
const newQuoteBtn=document.querySelector("#new-quot");
const readButton=document.querySelector("#readerButton");
const audio=document.querySelector("#audioPlayer");
//Global Variables
let data=[];

//show new quot
const newQuote=()=>{
    let index= Math.floor(Math.random()* data.length);
    console.log(data[index]);
    quoteText.textContent=data[index].text;
    (data[index].author ? authorText.textContent=data[index].author: "unknown");
    //check the quote size to determine styling
    if(data[index].text.length>50){
        quoteText.classList.add=".long-quot ";
    }else{
        quoteText.classList.remove=".long-quot ";
    }
}
let response;
// Text to speach 
async function readThis(){
    const apiKey='764606a2bab4441982b1cba5989548ae'
    const text=quoteText.innerText;
    VoiceRSS.speech({
        key: apiKey,
        src: text,
        hl: 'en-us',
        v: 'Mike',
        r: -2, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
    }
    
   



//Get Quote from API
async function getQuoteFromApi(){
    //this is a free api that just provides loads of quotes
    const apiUrl='https://type.fit/api/quotes';
    try{
        const response=await fetch( apiUrl);
         data=await response.json();
        newQuote();
    }catch(error){
        getQuoteFromApi();
        console.log('no quote',error);
    }
}

// Tweet the current quote
const tweetQuote=()=>{
    const tweeterUrl=`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(tweeterUrl,'_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click',newQuote);
tweeterButton.addEventListener('click',tweetQuote);
readButton.addEventListener('click',readThis);
//On Load
getQuoteFromApi();
