'use strict'

const url = 'https://opentdb.com/api.php?amount=10'

//HTMLを取得
const questionNumber = document.getElementById('questionNumber')
const catDifPlace = document.getElementById('catDif')
const questionPlace = document.getElementById('question')
const startBtn = document.getElementById('startBtn')
const btnSection = document.querySelector('ul')


//問題のインデックス番号とスコアを格納
let currentNum = 0; 
let score = 0;
let QuestionNum = 1;

//開始ボタンを押すとJSONデータを取得しクイズ画面描画関数に渡す
startBtn.addEventListener('click', () => {
    startBtn.remove();
    questionNumber.textContent = '取得中'
    question.textContent = '少々お待ちください'

    fetch(url)
               .then((response) => {
                    return response.json()　//ここでBodyからJsonを返す
                })
                    .then((result) => {
                                        setQuiz(result);                                        
                                        })
                    .catch((e)=>{
                        console.log(e)
                 })                    
})            

//正解の選択肢をシャッフルする関数
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }

//クイズ画面を作成する
function setQuiz(jsonObj){
        console.log('現在のcurrentNumは' + currentNum);
    const Quiz = jsonObj.results[currentNum];
        console.log(Quiz)//取得したクイズデータを確認

    questionNumber.textContent = "問題" + QuestionNum

    question.textContent = Quiz.question //APIからとってきた質問   

    const category = document.createElement('div')
    category.textContent =  '[ジャンル]　' + Quiz.category
    catDifPlace.appendChild(category)

    const difficulty = document.createElement('div')
    difficulty.textContent = '[難易度]　' + Quiz.difficulty
    catDifPlace.appendChild(difficulty)

    question.textContent = Quiz.question

    const answers = Quiz.incorrect_answers
    answers.push(Quiz.correct_answer)

    const shuffledAnswers = shuffle(answers)
    console.log("shuffledAnswersは" + shuffledAnswers)//シャッフルしたanswer配列がちゃんとできてるか

    //選択肢ボタンの描画
    shuffledAnswers.forEach((choice) => {
        const li = document.createElement('li')
        const btn = document.createElement('button')
        btn.innerHTML = choice
        li.appendChild(btn)
        btnSection.appendChild(li)
            //選択肢ボタンを押した時の処理
            btn.addEventListener('click', () =>{
                    //正誤チェック
                    if(choice === Quiz.correct_answer){
                        console.log('正解')
                        score ++
                    }else{
                        console.log('間違い')
                    }
                    //選択肢ボタンを消す
                    while (btnSection.firstChild){
                                btnSection.removeChild(btnSection.firstChild)
                            }
                    while (catDifPlace.firstChild){
                        catDifPlace.removeChild(catDifPlace.firstChild)
                    }
 
                    //次のクイズへ
                    currentNum ++
                    QuestionNum ++
                    if(currentNum === 10){
                        questionNumber.textContent = "あなたの正答数は"　+ score + "です！！"
                        question.textContent = "再チャレンジしたい場合は以下をクリック"
                        const repeatBtn = document.createElement('button')
                        repeatBtn.innerHTML = "ホームに戻る"
                        btnSection.appendChild(repeatBtn)
                            repeatBtn.addEventListener('click', () => {
                                document.location.reload();
                            })

                    }else{
                    setQuiz(jsonObj)
                    }
                    
            })
    })
}











