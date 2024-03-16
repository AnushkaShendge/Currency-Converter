const baseURL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdowns = document.querySelectorAll(".dropDown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select")
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let select of dropdowns ){
    for(currcode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currcode;
        newOption.value = currcode;
        if(select.name === "from" && currcode === "USD" ){
            newOption.selected = "selected";
        }else if(select.name === "to" && currcode === "INR" ){
            newOption.selected = "selected";
        } 
        select.append(newOption);
    }
    select.addEventListener("change" , (evt) =>{
        updateFlag(evt.target);
    })
}
const updateFlag = (ele) =>{
    let currcode = ele.value;
    let countryCode = countryList[currcode];
    let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = ele.parentElement.querySelector("img");
    img.src = newsrc;
}

btn.addEventListener("click" , async(evt) =>{
    evt.preventDefault();
    let amt = document.querySelector("form input");
    let amtval = amt.value;
    if(amtval === "" || amtval < 1){
        amtval = "1";
        amt.value = "1";
    }
    const url = `${baseURL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(url);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
    console.log(rate);
    let finalAmt = amtval * rate;
    msg.innerText = `${amtval} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`
})