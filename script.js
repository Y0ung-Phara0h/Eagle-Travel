
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
const searchAreaElements = document.querySelectorAll('.main-part button, .main-part p, .main-part h1');
const inputBox = document.getElementById('search-bar');


// let city=[];
// countries.forEach(country => {
//     city.push(...country.cities)
// });

function createCard(img, titl, desc){
    const divCard = document.createElement("div");
    const cardImage = document.createElement("div");
    cardImage.classList.append("card-img");
    cardImage.style.backgroundImage = `url('${img}')`;
    const cardTitle = document.createElement("h2");
    cardTitle.textContent = titl;
    const cardDesc = document.createElement("h3");
    cardDesc.innerText = desc;
    divCard.classList.append("card")
    divCard.append(cardImage, cardTitle, cardDesc);
    searchArea.appendChild(divCard);
};

// Forwarding the user to the search bar upon clicking on the Book now Button
// const searchBar = document.getElementById('search-bar');
// document.getElementById('book-btn').addEventListener('click',()=>{
//     searchBar.focus();
// });



searchBtn.addEventListener('click', ()=>{
    searchAreaElements.forEach(elem=>{
        elem.style.display = 'none';
    })
    const h1Element = document.createElement("h1");
    h1Element.textContent = "Search Result";
    searchArea.appendChild(h1Element);
    
    const countryList = fetchedData.countries;
    const beachList = fetchedData.beaches;
    const templeList = fetchedData.temples;
    const queryTxt = inputBox.value.toLowerCase();
    if (queryTxt) {
        if (countryList.find(country=>{country.name.toLowerCase() == queryTxt})) {
            const cantry = countryList.find(country=>country.name.toLowerCase() == queryTxt);
            cantry.cities.forEach(city=>{
                createCard(city.imageUrl, city.name, city.description)
            })
        }else if (countryList.find(country=>{country.cities.find(city=>city.name.toLowerCase() == queryTxt)})){
            const city = countryList.find((country)=>{country.cities.find(city=>city.name.toLowerCase() == queryTxt)});
            createCard(city.imageUrl, city.name, city.description)
        }else{
            console.log('No Result found');
        }
    }else{
        console.log('input field is empty');
    }
    
});


