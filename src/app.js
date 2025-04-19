const suits = ["♠", "♥", "♣", "♦"];
    const values = [2,3,4,5,6,7,8,9,10];
    let currentCards = [];
    let bubbleLog = [];

    function getRandomCard() {
      const value = values[Math.floor(Math.random() * values.length)];
      const suit = suits[Math.floor(Math.random() * suits.length)];
      return { value, suit };
    }

    function drawCards() {
      const count = parseInt(document.getElementById("cardCount").value);
      if (isNaN(count) || count <= 0) {
        alert("Por favor, ingresa una cantidad válida.");
        return;
      }

      currentCards = [];
      bubbleLog = [];
      document.getElementById("logContainer").innerHTML = "";

      for (let i = 0; i < count; i++) {
        currentCards.push(getRandomCard());
      }

      renderCards();
    }
    function renderCards(cards = currentCards) {
      const container = document.getElementById("cardContainer");
      container.innerHTML = "";
      cards.forEach(card => {
        const cardDiv = document.createElement("div");
        cardDiv.className = "card";
        if (card.suit === "♥") cardDiv.classList.add("red");
        cardDiv.innerHTML = `${card.value} ${card.suit}`;
        container.appendChild(cardDiv);
        if (card.suit === "♦") cardDiv.classList.add("red");
        cardDiv.innerHTML = `${card.value} ${card.suit}`;
        container.appendChild(cardDiv);
      });
    }

    function bubbleSortCards() {
      let cards = [...currentCards];
      bubbleLog = [];

      let len = cards.length;
      let swapped;

      for (let i = 0; i < len; i++) {
        swapped = false;
        for (let j = 0; j < len - i - 1; j++) {
          if (cards[j].value > cards[j + 1].value) {
            [cards[j], cards[j + 1]] = [cards[j + 1], cards[j]];
            swapped = true;
            bubbleLog.push(cards.map(c => ({ ...c })));
          }
        }
        if (!swapped) break;
      }

      currentCards = cards;
      renderCards();
      renderLog();
    }

    function renderLog() {
      const logContainer = document.getElementById("logContainer");
      logContainer.innerHTML = "";

      bubbleLog.forEach((step, index) => {
        const div = document.createElement("div");
        div.className = "log-step";
        div.innerHTML = `<strong>Paso ${index + 1}:</strong> ` +
          step.map(c => `${c.value}${c.suit}`).join(" | ");
        logContainer.appendChild(div);
      });
    }