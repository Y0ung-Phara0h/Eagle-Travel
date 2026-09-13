
let fetchedData;
fetch('./api.json')
  .then(response=>response.json())
  .then(data=>{
      fetchedData = data;
      console.log(data);
  })
  .catch(err=>console.log(err));

const searchBtn = document.querySelector('.search-btn');
const searchArea = document.querySelector('.main-part');
const searchAreaElements = document.querySelectorAll('.main-part button, .main-part p, .main-part h2');
const inputBox = document.getElementById('search-bar');
const cardsDiv = document.createElement("div");
cardsDiv.classList.add("cards-div");


function createCard(img, titl, desc){
    const divCard = document.createElement("div");
    const cardImage = document.createElement("div");
    cardImage.classList.add("card-img");
    cardImage.style.backgroundImage = `url('${img}')`;
    const cardTitle = document.createElement("h2");
    cardTitle.textContent = titl;
    const cardDesc = document.createElement("h4");
    cardDesc.innerText = desc;
    divCard.classList.add("card")
    divCard.append(cardImage, cardTitle, cardDesc);
    cardsDiv.appendChild(divCard);
};

// Forwarding the user to the search bar upon clicking on the Book now Button
// const searchBar = document.getElementById('search-bar');
// document.getElementById('book-btn').addEventListener('click',()=>{
//     searchBar.focus();
// });

function addCards() {
    const countryList = fetchedData.countries;
    const beachList = fetchedData.beaches;
    const templeList = fetchedData.temples;
    const queryTxt = inputBox.value.toLowerCase();
    if (queryTxt) {
        const cantry = countryList.find(country=>country.name.toLowerCase() == queryTxt);
        const countryCity = countryList.flatMap(country=>country.cities).find(city=>city.name.toLowerCase() == queryTxt);
        console.log(cantry, countryCity);
        if (cantry) {
            cantry.cities.forEach(city=>{
                createCard(city.imageUrl, city.name, city.description)
            })
            searchArea.appendChild(cardsDiv);
        }else if (countryCity){
            const city = countryCity.cities.find(city=>city.name.toLowerCase() == queryTxt)
            createCard(city.imageUrl, city.name, city.description)
            searchArea.appendChild(cardsDiv);
        }else{
            console.log('No Result found');
        }
    }else{
        // console.log(countryList);
        countryList.forEach(country=>country.cities.forEach(city=>{
            createCard(city.imageUrl, city.name, city.description)
        }));
        beachList.forEach(beach=>{
            createCard(beach.imageUrl, beach.name, beach.description)
        });
        templeList.forEach(temple=>{
            createCard(temple.imageUrl, temple.name, temple.description)
        });
        searchArea.appendChild(cardsDiv);
        console.log('input field is empty');
    }
}


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
    }
    if (cardsDiv.children.length > 0) {
        cardsDiv.replaceChildren();
        addCards();
    }else{
        addCards();
    }
     
});


