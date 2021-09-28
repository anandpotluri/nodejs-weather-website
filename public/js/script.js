console.log("Client side javascript loaded...");



const weatherForm = document.querySelector('form');
const searchEle = document.querySelector('input');
const errorEle = document.querySelector('.error');
const locationEle = document.querySelector('.location');
const messageEle =  document.querySelector('.message');

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const location = searchEle.value;
    if(location == undefined || location.length ==0) {
        errorEle.textContent = "You must provide location";
        locationEle.textContent = "";
        messageEle.textContent = '';
    } else {

        errorEle.textContent = "";
        locationEle.textContent = "";
        messageEle.textContent = "Loading";
        const url = 'http://localhost:3000/weather?address='+location;

        fetch(url).then((response) => {
            response.json().then((data) => {
                if(data.error) {
                    messageEle.textContent="";
                    errorEle.textContent = data.error;
                } else {
                    locationEle.textContent = data.location;
                    messageEle.textContent = JSON.stringify(data.forecast);
                }
            })
        });
    }
})