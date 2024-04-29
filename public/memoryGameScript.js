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
