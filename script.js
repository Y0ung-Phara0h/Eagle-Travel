
let fetchedData;
fetch('./api.json')
  .then(response=>response.json())
  .then(data=>{
      fetchedData = data;
  })
  .catch(err=>console.log(err));

const searchBtn = document.querySelector('.search-btn');
const searchArea = document.querySelector('.main-part');
const searchAreaElements = document.querySelectorAll('.main-part button, .main-part p, .main-part h2');
const inputBox = document.getElementById('search-bar');
const cardsDiv = document.createElement("div");
cardsDiv.classList.add("cards-div");


function createCard(img, titl, desc, country){
    const divCard = document.createElement("div");
    const cardImage = document.createElement("div");
    cardImage.classList.add("card-img");
    cardImage.style.backgroundImage = `url('${img}')`;
    const cardTitle = document.createElement("h2");
    if (country === undefined) {
        cardTitle.textContent = titl;
    }else{
        cardTitle.textContent = titl+", "+country;
    }
    const cardDesc = document.createElement("h4");
    cardDesc.innerText = desc;
    divCard.classList.add("card")
    divCard.append(cardImage, cardTitle, cardDesc);
    cardsDiv.appendChild(divCard);
};



function addCards() {
    const countryList = fetchedData.countries;
    const beachList = fetchedData.beaches;
    const templeList = fetchedData.temples;
    const queryTxt = inputBox.value.toLowerCase();
    if (queryTxt) {
        const cantry = countryList.find(country=>country.name.toLowerCase() == queryTxt);
        const city = countryList.flatMap(country=>country.cities).find(city=>city.name.toLowerCase() == queryTxt);
        const beach = beachList.find(beachName=>beachName.name.toLowerCase().trim() == queryTxt.trim());
        const temple = templeList.find(tem=>tem.name.toLowerCase().trim() == queryTxt.trim());
        // console.log(temple);
        if (cantry) {
            cantry.cities.forEach(city=>{
                createCard(city.imageUrl, city.name, city.description)
            })
            searchArea.appendChild(cardsDiv);
        }else if (city){
            createCard(city.imageUrl, city.name, city.description);
            searchArea.appendChild(cardsDiv);
        }else if(beach){
            createCard(beach.imageUrl, beach.name, beach.description, beach.country);
            searchArea.appendChild(cardsDiv);
        }else if(temple){
            createCard(temple.imageUrl, temple.name, temple.description, temple.country);
            searchArea.appendChild(cardsDiv);
        }else if(queryTxt == "beach" || queryTxt == "beachs" || queryTxt == "coast" || queryTxt == "bay"){
            beachList.forEach(beach=>createCard(beach.imageUrl, beach.name, beach.description, beach.country))
            searchArea.appendChild(cardsDiv);
        }else if(queryTxt == "temple" || queryTxt == "temples" || queryTxt == "historical" || queryTxt == "ancient"){
            templeList.forEach(tem=>createCard(tem.imageUrl, tem.name, tem.description, tem.country))
            searchArea.appendChild(cardsDiv);
        }else if(queryTxt == "country" || queryTxt == "countries" || queryTxt == "state" || queryTxt == "states" || queryTxt == "city" || queryTxt == "cities"){
            countryList.forEach(country=>country.cities.forEach(city=>{
                createCard(city.imageUrl, city.name, city.description, country.name)
            }));
            beachList.forEach(beach=>{
                createCard(beach.imageUrl, beach.name, beach.description, beach.country)
            });
            templeList.forEach(temple=>{
                createCard(temple.imageUrl, temple.name, temple.description, temple.country)
            });
            searchArea.appendChild(cardsDiv);
        }
        else{
            const textElement = document.querySelector('.main-part > h1');
            textElement.textContent = "No Result has been found, Please try again by writing the correct word."
            textElement.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
            textElement.style.backdropFilter = "blur(5px)";
            textElement.style.textShadow = "1px 1px 3px #0F2D3A";
            textElement.style.padding = "2rem 1rem";
            textElement.style.borderRadius = "10px";
            console.log('No Result found');
        }
    }else{
        // console.log(countryList);
        countryList.forEach(country=>country.cities.forEach(city=>{
            createCard(city.imageUrl, city.name, city.description, country.name)
        }));
        beachList.forEach(beach=>{
            createCard(beach.imageUrl, beach.name, beach.description, beach.country)
        });
        templeList.forEach(temple=>{
            createCard(temple.imageUrl, temple.name, temple.description, temple.country)
        });
        searchArea.appendChild(cardsDiv);
        console.log('input field is empty');
    }
}

// Cleaning Logic function
function resetBtn() {
    const headElement = document.querySelector('.main-part > h1');
    const cardsDivElement = document.querySelector('.cards-div');
    if(headElement && cardsDivElement){
        headElement.remove();
        cardsDivElement.remove();
        searchAreaElements.forEach(elem=>{
            elem.style.display = 'block';
        })
        searchArea.style.removeProperty("padding-right");
        inputBox.value = "";
    }else if(headElement){
        headElement.remove();
        searchAreaElements.forEach(elem=>{
            elem.style.display = 'block';
        })
        searchArea.style.removeProperty("padding-right");
        inputBox.value = "";
    }
}

// Forwarding the user to the search bar upon clicking on the Book now Button
document.getElementById('book-btn').addEventListener('click',()=>{
    inputBox.focus();
});

// Listen to the Search button
searchBtn.addEventListener('click', ()=>{
    searchAreaElements.forEach(elem=>{
        elem.style.display = 'none';
    })
    const elemento = document.querySelector('.main-part > h1');
    if(!elemento){
        const h1Element = document.createElement("h1");
        h1Element.textContent = "Search Result";
        h1Element.style.textShadow = "1px 1px 3px #0F2D3A";
        searchArea.appendChild(h1Element);
        searchArea.style.paddingRight = "0%";
    }else if (elemento.value != "Search Result"){
        elemento.textContent = "Search Result";
        elemento.style.removeProperty("background-color");
        elemento.style.removeProperty("backdrop-filter");
        elemento.style.removeProperty("text-shadow");
        elemento.style.removeProperty("padding");
        elemento.style.removeProperty("border-radius");
    }
    if (cardsDiv.children.length > 0) {
        cardsDiv.replaceChildren();
        addCards();
    }else{
        addCards();
    }
     
});

// Listen to Reset button
const clearBtn = document.querySelector('.clear-btn');
clearBtn.addEventListener('click',()=>{resetBtn()});

