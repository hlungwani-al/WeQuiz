var quiz = {
    // (A) PROPERTIES
    // (A1) QUESTIONS & ANSWERS
    // Q = QUESTION, O = OPTIONS, A = CORRECT ANSWER
    data:  [
        {
            q: "What time are you suppoused to sign in at Shaper?",
            o: ["08:10", "08:30", "Before 8", "After 8"],
            a: 2
        }
    ,

    {
        q: "How much is the stipend for FS at Shaper ?",
        o: ["R5900", "R6000", "R4500", "R3800"],
        a: 1
    },
    {
        q: "What time is FS Lunch ?",
        o: ["11:50", "12:05", "12:00", "12:35"],
        a: 2
    },
    {
        q: "At what time are you suppoused to leave Shaper ?",
        o: ["16:20", "16:25", "16:00", "16:30"],
        a: 3
    },
    {
        q: "What does Shaper provide as lunch ?",
        o: ["Bread & Coffe", "Burger & Juice", "Pizza & Cooldrink", "Bananas"],
        a: 0

    }
],
    // (A2) HTML ELEMENTS
    hWrap: null, // HTML quiz container
    hQn: null, // HTML question wrapper
    hAns: null, // HTML answers wrapper
    // (A3) GAME FLAGS
    now: 0, // current question
    score: 0, // current score
    // (B) INIT QUIZ HTML
    init: () => {
    // (B1) WRAPPER
    quiz.hWrap = document.getElementById("quizWrap");

    // (B2) QUESTIONS SECTION
    quiz.hQn = document.createElement("div");
    quiz.hQn.id = "quizQn";
    quiz.hWrap.appendChild(quiz.hQn);

    // (B3) ANSWERS SECTION
    quiz.hAns = document.createElement("div");
    quiz.hAns.id = "quizAns";
    quiz.hWrap.appendChild(quiz.hAns);
    // (B4) GO!
    quiz.draw();
},
    // (C) DRAW QUESTION
    draw: () => {

    // (C1) QUESTION
    quiz.hQn.innerHTML = quiz.data[quiz.now].q;

    // (C2) OPTIONS
    quiz.hAns.innerHTML = "";
      for (let i in quiz.data[quiz.now].o) {
        let radio = document.createElement("input");
            radio.type = "radio";
            radio.name = "quiz";
            radio.id = "quizo" + i;
            quiz.hAns.appendChild(radio);
        let label = document.createElement("label");
            label.innerHTML = quiz.data[quiz.now].o[i];
            label.setAttribute("for", "quizo" + i);
            label.dataset.idx = i;
            label.addEventListener("click", () => {
            quiz.select(label); });
            quiz.hAns.appendChild(label);
        } 
},
    select: (option) => {

    // (D1) DETACH ALL ONCLICK
    let all = quiz.hAns.getElementsByTagName("label");
     for (let label of all) {
        label.removeEventListener("click", quiz.select);
        }
    // (D2) CHECK IF CORRECT
    let correct = option.dataset.idx ==
        quiz.data[quiz.now].a;
    if (correct) {
        quiz.score++;
        option.classList.add("correct");
        } else {
        option.classList.add("wrong");
        }
        
    // (D3) NEXT QUESTION OR END GAME
    quiz.now++;
    setTimeout(() => {
      if (quiz.now < quiz.data.length) {
        quiz.draw();
      } else {
        quiz.hQn.innerHTML = `You have answered
        ${quiz.score} of ${quiz.data.length} correctly.`;
        quiz.hAns.innerHTML = "";
}
}, 1000);
},


  // (E) RESTART QUIZ
 reset: () => {
    quiz.now = 0;
    quiz.score = 0;
    quiz.draw();
},
}; 
window.addEventListener("load", quiz.init);