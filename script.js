const vocabBox = document.getElementById("vocab");
const checkBtn = document.getElementById("check-vocab-btn");
const brainstormFeedback = document.getElementById("feedback"); // Renamed to avoid ID collision

function cleanText(text) {
  return text.trim().toLowerCase().replace(/[^a-zA-Z ]/g, "");
}

function checkBrainstorm() {
  const userInput = vocabBox.value;
  const userItems = userInput.split(/,|\n/).map((item) => cleanText(item));

  const termCells = document.querySelectorAll(".vocab-term");
  let foundCount = 0;

  termCells.forEach((cell) => {
    const cellText = cleanText(cell.innerText);

    if (userItems.includes(cellText)) {
      cell.classList.add("found");
      cell.classList.remove("missed");
      foundCount++;
    } else {
      cell.classList.add("missed");
      cell.classList.remove("found");
    }
  });

  if (brainstormFeedback) {
    brainstormFeedback.textContent = `You remembered ${foundCount} terms from the list! Keep going!`;
  }
}

if (checkBtn) {
  checkBtn.addEventListener("click", checkBrainstorm);
}

const flashCards = [
  {
    image: "images/business/diversification.jpg",
    definition: "The strategy of expanding a company's range of products or entering new markets.",
    choices: ["Diversification", "Inflation", "Merger", "Investment"],
    answer: "Diversification"
  },
  {
    image: "images/business/economic-downturn.jpg",
    definition: "A period when economic activity declines, affecting businesses and employment.",
    choices: ["Inflation", "Market saturation", "Operational efficiency", "Economic downturn"],
    answer: "Economic downturn"
  },
  {
    image: "images/business/achieve-profitability.png",
    definition: "To reach a state where a company is making a profit.",
    choices: ["To build a brand", "Market saturation", "To achieve profitability", "To meet demand"],
    answer: "To achieve profitability"
  },
  {
    image: "images/business/branch-out.png",
    definition: "To start doing something new or different from what you have done before.",
    choices: ["To build a brand", "Branch out", "To achieve profitability", "To meet demand"],
    answer: "Branch out"
  }
];

let currentIndex = 0;
let missedCards = [];
let currentDeck = [...flashCards];

function renderCard() {
  const container = document.getElementById("flashcard-display");
  if (!container) return;

  if (currentIndex >= currentDeck.length) {
    if (missedCards.length > 0) {
      currentDeck = [...missedCards];
      missedCards = [];
      currentIndex = 0;
      renderCard();
      return;
    }

    container.innerHTML = `<h2 class="congrats">Congratulations! You've mastered this set!</h2>`;
    return;
  }

  const card = currentDeck[currentIndex];

  container.innerHTML = `
    <div class="flashcard">
      <div class="image-wrapper">
        <img src="${card.image}" alt="Vocabulary image">
      </div>
      <div class="flashcard-content">
        <p class="definition">${card.definition}</p>
        <div class="choice-container">
          ${card.choices.map(choice => `
            <button type="button" class="choice-item" data-choice="${choice}">
              ${choice}
            </button>
          `).join("")}
        </div>
        <div class="feedback"></div>
      </div>
    </div>
  `;

  addChoiceListeners();
}

function addChoiceListeners() {
  const buttons = document.querySelectorAll(".choice-item");
  const card = currentDeck[currentIndex];
  const feedbackBox = document.querySelector(".flashcard-content .feedback");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const selectedChoice = btn.dataset.choice;

      // Disable all buttons so user can't click twice
      buttons.forEach((button) => {
        button.disabled = true;
      });

      if (selectedChoice === card.answer) {
        btn.classList.add("correct");
        feedbackBox.textContent = "Correct!";
        feedbackBox.className = "feedback correct"; // Matches your .feedback.correct CSS!
      } else {
        btn.classList.add("wrong");
        
        // Highlight the right answer in green as well
        buttons.forEach((button) => {
          if (button.dataset.choice === card.answer) {
            button.classList.add("correct");
          }
        });

        feedbackBox.textContent = `Incorrect. The answer was: ${card.answer}`;
        feedbackBox.className = "feedback wrong"; // Matches your .feedback.wrong CSS!
        missedCards.push(card);
      }

      // Pause before moving to next card so user can see the feedback
      setTimeout(() => {
        currentIndex++;
        renderCard();
      }, 1500);
    });
  });
}

renderCard();

function FillTheGap(id, sentence, answer) {
  this.id = id;
  this.sentence = sentence;
  this.answer = answer.trim().toLowerCase().replace(/[^a-zA-Z -]/g, "");
}

const questions = [
  new FillTheGap("q1", "Many small businesses were forced to __________ their spending during the recession.", "cut back on"),
  new FillTheGap("q2", "A clear __________ helps customers understand why they should choose one brand over another.", "value proposition"),
  new FillTheGap("q3", "The company plans to __________ in Southeast Asia next year.", "expand into new markets"),
  new FillTheGap("q4", "Strong __________ is essential if investors are to trust a company's leadership.", "corporate governance"),
  new FillTheGap("q5", "Tech firms often focus on __________ because it allows them to grow without losing performance.", "scalability"),
  new FillTheGap("q6", "During an __________, unemployment usually rises and consumer spending falls.", "economic downturn"),
  new FillTheGap("q7", "Firms in highly competitive sectors must innovate quickly to maintain a __________.", "competitive advantage"),
  new FillTheGap("q8", "Social media platforms often depend on data __________ to generate income.", "monetization"),
  new FillTheGap("q9", "To avoid __________, businesses need to look for new customer segments.", "market saturation"),
  new FillTheGap("q10", "Good __________ can reduce waste and save time across the whole organisation.", "operational efficiency"),
  new FillTheGap("q11", "The startup is expected to __________ within three years.", "achieve profitability"),
  new FillTheGap("q12", "Companies that want loyal customers should always __________ in customer service.", "go the extra mile"),
  new FillTheGap("q13", "The board approved a new __________ to reduce environmental damage.", "sustainability strategy"),
  new FillTheGap("q14", "The company will __________ its new mobile app later this month.", "launch"),
  new FillTheGap("q15", "For many managers, __________ is still the final measure of success.", "the bottom line"),
  new FillTheGap("q16", "Some firms choose __________ so they are not dependent on a single product or market.", "diversification")
];

function renderGapFillCards() {
  const container = document.getElementById("gap-fill-container");
  if (!container) return;

  container.innerHTML = "";

  questions.forEach((q, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.className = "gap-card";

    const sentenceWithInput = q.sentence.replace(
      "__________",
      `<input type="text" id="${q.id}" class="gap-input" placeholder="Type here...">`
    );

    questionDiv.innerHTML = `
      <div class="gap-card-content">
        <p class="gap-question">${index + 1}. ${sentenceWithInput}</p>
        <div class="gap-feedback" id="feedback-${q.id}"></div>
      </div>
    `;

    container.appendChild(questionDiv);
  });
}

renderGapFillCards();
function checkGapFillAnswers() {
  questions.forEach((q) => {
    const inputField = document.getElementById(q.id);
    const feedbackBox = document.getElementById(`feedback-${q.id}`);
    const userAnswer = cleanText(inputField.value);

    if (userAnswer === q.answer) {
      feedbackBox.textContent = "Correct!";
      // KEEP THESE HERE:
      feedbackBox.className = "gap-feedback correct"; 
    } else {
      feedbackBox.textContent = `Incorrect. Correct answer: ${q.answer}`;
      // AND HERE:
      feedbackBox.className = "gap-feedback wrong";
    }
  });
}

const gapCheckBtn = document.getElementById("check-gap-btn");

if (gapCheckBtn) {
  gapCheckBtn.addEventListener("click", checkGapFillAnswers);
}
document.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    checkGapFillAnswers();
  }
});