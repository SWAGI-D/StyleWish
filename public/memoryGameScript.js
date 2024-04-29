const cards = document.querySelectorAll(".card");

let matchedCard = 0;
let cardOne, cardTwo;
let disableDeck = false;

function flipCard({target: clickedCard})
{
    if(cardOne !== clickedCard && !disableDeck)
    {
        clickedCard.classList.add("flip");
        if(!cardOne)
        {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src, 
        cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2)
{
    if(img1 === img2)
    {
        matchedCard++;
        if(matchedCard == 8)
        {
            setTimeout(() => {
                return shuffleCard();
            }, 1000);
        }
               cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false;
    }

    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200);
}

function shuffleCard()
{
    matchedCard = 0;
    cardOne = cardTwo = "";
    disableDeck = false;
    let arr = ["bag","belt","dress","hat","heels","pants","shirt","sunglass","bag","belt","dress","hat","heels","pants","shirt","sunglass"];
    arr = arr.map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value); 

    console.log(arr);

    cards.forEach((card, index)=> {
        card.classList.remove("flip");
        let ImgTag = card.querySelector(".back-view img");
        ImgTag.src = `assets/${arr[index]}.png`;
        card.addEventListener("click", flipCard);
    });
}

shuffleCard();

cards.forEach(card => {
    card.addEventListener("click", flipCard);
});
