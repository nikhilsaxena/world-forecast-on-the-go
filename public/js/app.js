const weatherForm = document.querySelector('form');
const cityName = document.querySelector('input');
const topMessage = document.querySelector('#message-1');
const bottomMessage = document.querySelector('#message-2');



weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const city = cityName.value;

    topMessage.textContent = 'Loading...';
    bottomMessage.textContent = '';

    const url = "/weather?city="+city;
    fetch(url).then((response)=>{
        response.json().then((data)=>{
            if(data.Error)
            {
                topMessage.textContent = data.Error;
            }
            else
            {
                topMessage.textContent = data.Location;
                bottomMessage.textContent = data.Forecast;                
            }
        });
})

    
});