function DefaultScreen(props) {
  const addsub = React.createElement('input',{type: 'radio', checked: props.mathType == 1? true : false, name: "mathType", value: 1, onChange: () => { props.changeMathType(1) } });
  const multi = React.createElement('input',{type: 'radio', checked: props.mathType == 2? true : false, name: "mathType", value: 2, onChange: () => { props.changeMathType(2) } });
  const divide = React.createElement('input',{type: 'radio', checked: props.mathType == 3? true : false, name: "mathType", value: 3, onChange: () => { props.changeMathType(3) } });
  return (
    <div>
      Highest integer you'd like to see:
      <input ref={input => {input && props.focus === 'range'? (input.focus(), props.select? input.select() : '') : ''}} id="range" value={props.range} type="text" size="5" autoComplete="off" onFocus={() => {props.focus != 'range'? props.toggleFocus() : ''}} onChange={e => props.updateInput(e)} onKeyUp={e => {console.log(e); e.keyCode == 13? props.initialize() : e.keyCode == 40 || e.keyCode == 9? props.toggleFocus() : e.keyCode == 39? props.toggleMathType(true) : e.keyCode == 37? props.toggleMathType(false) : ''}} />
      How many questions?
      <input ref={input => {input && props.focus === 'questions'? (input.focus(), props.select? input.select() : '') : ''}} id="questions" value={props.questions} type="text" size="5" autoComplete="off" onFocus={() => {props.focus != 'questions'? props.toggleFocus() : ''}} onChange={e => props.updateInput(e)} onKeyUp={e => {e.keyCode == 13? props.initialize() : e.keyCode == 38? props.toggleFocus() : e.keyCode == 39? props.toggleMathType(true) : e.keyCode == 37? props.toggleMathType(false) : ''}} />
      <div id="mathType">
        <p>Add/Subtract</p>
        <p>Multiplication</p>
        <p>Division</p>
        {addsub}
        {multi}
        {divide}
      </div>
      <button type="button" id="start" onClick={() => {props.initialize()}} onKeyPress={e => {e.preventDefault()}} onKeyUp={e => {e.keyCode == 13? props.initialize() : ''}}>Let's do some math!</button>
    </div>
  )
}

function Question(props) {
  const question = (props.mathType === 3? props.rand1 * props.rand2 : props.rand1) + props.op + props.rand2 + ' = '
  const answerBox = <input ref={input => {input && props.focus === 'answer'? input.focus() : ''}} id="answer" value={props.answer} size="5" className="qBox" onKeyUp={e => {e.keyCode == 13? props.button === 'Submit'? props.quizResult() : props.randomInt() : ''}} onChange={e => props.updateInput(e)} />
  return (
    <div>
      <p>Question {props.qCount} / {props.questions}</p>
      {question}{answerBox}
      <p>
        <button id="submit" type="button" onClick={() => {props.button === 'Submit'? props.quizResult() : props.randomInt() }} onKeyPress={e => {e.preventDefault()}} onKeyUp={e => {e.keyCode == 13? props.button === 'Submit'? props.quizResult() : props.randomInt() : ''}}>{props.button}</button>
      </p>
    </div>
  )
}

function ScoreScreen(props) {
  const scoreHeader = <thead>
    <tr>
      <th>#</th>
      <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
      <th colspan="4">Question</th>
      <th>&nbsp;</th>
      <th colspan="2">Answer</th>
    </tr>
  </thead>

  const scoreBody = props.scoreBoard.map((question, i) => {
    return <tbody id="scoreBox">
      <tr></tr>
      <tr>
        <td>{i+1}</td>
        <td>&nbsp;</td>
        <td>{question[0]}</td>
        <td>{question[1]}</td>
        <td>{question[2]}</td>
        <td>=</td>
        <td>&nbsp;</td>
        <td>{question[3]}</td>
        {question[3] == question[4]? '' : <td style={{color: '#f00'}}>{question[4] == ''? '-' : question[4]}</td>}
      </tr>
    </tbody>
  });

  const score = <table align="center">{scoreHeader}{scoreBody}</table>;
  return (
    <div>
      <p>YOU SCORED {props.score} / {props.questions}</p>
      {props.showScore? score : <button ref={input => {input && props.focus === 'score'? input.focus() : ''}}  onClick={() => {props.scoreSwitch()}} onKeyPress={e => {e.preventDefault()}} onKeyUp={e => {e.keyCode == 13? props.scoreSwitch() : e.keyCode == 38 || e.keyCode == 40? props.toggleFocus() : ''}}>Quiz Review</button>}
      <br />
      <br />
      <button ref={input => {input && props.focus === 'new'? input.focus() : ''}} onClick={() => {props.newQuiz()}} onKeyPress={e => {e.preventDefault()}} onKeyUp={e => {e.keyCode == 13? props.newQuiz() : e.keyCode == 38 || e.keyCode == 40? props.toggleFocus() : ''}}>New Quiz</button>
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: {
          msg: '',
          color: ''
        },
      mathType: 1,
      range: 12,
      qCount: 0,
      score: 0,
      scoreBoard: [],
      focus: 'questions',
      display: 'params',
      button: 'Submit',
      select: false,
    }
    this.changeMathType = this.changeMathType.bind(this)
    this.initialize = this.initialize.bind(this)
    this.updateInput = this.updateInput.bind(this)
    this.quizResult = this.quizResult.bind(this)
    this.display = this.display.bind(this)
    this.randomInt = this.randomInt.bind(this)
    this.newQuiz = this.newQuiz.bind(this)
    this.scoreSwitch = this.scoreSwitch.bind(this)
    this.toggleFocus = this.toggleFocus.bind(this)
    this.toggleMathType = this.toggleMathType.bind(this)
  }

  updateInput(e) {
    const input =  e.target.id === 'range'? { range: e.target.value } : e.target.id === 'questions'? { questions: e.target.value } : { answer: e.target.value }
    this.setState(input)
  }
  toggleFocus() {
    const focus = this.state.focus === 'questions'? 'range' : this.state.focus === 'range'? 'questions' : this.state.focus === 'score'? 'new' : this.state.showScore? '' : 'score';
    this.setState({focus: focus})
  }
  toggleMathType(right) {
    const mathType = this.state.mathType === 1? right? 2 : 3 : this.state.mathType === 2? right? 3 : 1 : right? 1 : 2;
    this.setState({mathType: mathType})
  }
  changeMathType(option) {
    this.setState({mathType: option})
  }
  clearError() {
    this.setState({
      error: {
        msg: '',
        color: ''
      }
    })
  }
  scoreSwitch() {
    this.clearError();
    this.setState({
      showScore: true,
      focus: 'new',
    })
  }
  newQuiz() {
    this.clearError();
    this.setState({
      display: 'params',
      focus: 'questions',
      score: 0,
      qCount: 0,
      scoreBoard: [],
    })
  }

  initialize() {
    if (isNaN(this.state.range) || this.state.range < 1 || this.state.range === '' || isNaN(this.state.questions) || this.state.questions < 1 || this.state.questions === '') {
      this.setState({error: {
        msg: 'INPUT ERROR! Must enter positive integer',
        color: '#f00'
      }})
    } else {
      this.randomInt();
      this.setState({
        display: 'question',
        focus: 'answer',
        showScore: false,
      });
    }
  }
  randomInt() {
    this.clearError();
    switch (this.state.mathType) {
      case 1:
        var op = Math.random() < 0.5? '  +  ' : '  -  ';
        break;
      case 2:
        var op = '  x  ';
        break;
      case 3:
        var op = '  /  ';
        break;
    }
    var base = this.state.mathType == 1? 1 : 2;
    var sub = this.state.mathType == 1? 0 : 1;
    this.setState(prevState => {
      return {
        rand1: Math.floor((Math.random() * (this.state.range - sub)) + base),
        rand2: Math.floor((Math.random() * (this.state.range - sub)) + base),
        op: op,
        qCount: prevState.qCount + 1,
        button: 'Submit',
        answer: '',
      }
    })
  }
  quizResult() {
    let result = false;
    switch (this.state.op) {
      case '  +  ':
        result = this.state.rand1 + this.state.rand2;
        break;
      case '  -  ':
        result = this.state.rand1 - this.state.rand2;
        break;
      case '  x  ':
        result = this.state.rand1 * this.state.rand2;
        break;
      case '  /  ':
        result = this.state.rand1;
        break;
    }
    this.setState(prevState => {
      prevState.scoreBoard.push([this.mathType === 3? this.state.rand1 * this.state.rand2 : this.state.rand1, this.state.op, this.state.rand2, result, this.state.answer])
      return {
      error: result == this.state.answer? {
        msg: 'CORRECT',
        color: '#0a0',
      } : {
        msg: 'INCORRECT! The answer is ' + result,
        color: '#f00',
      },
      score: result == this.state.answer? prevState.score + 1 : prevState.score,
      button: 'Next Question',
      display: this.state.qCount < this.state.questions? 'question' : 'score',
      focus: this.state.qCount < this.state.questions? 'answer' : 'score',
      }
    });
  }

  display() {
    if (this.state.display === 'params') {
      return <DefaultScreen
        mathType={this.state.mathType}
        range={this.state.range}
        questions={this.state.questions}
        updateInput={this.updateInput}
        initialize={this.initialize}
        changeMathType={this.changeMathType}
        nameInput={this.nameInput}
        focus={this.state.focus}
        toggleFocus={this.toggleFocus}
        toggleMathType={this.toggleMathType}
        select={this.state.select}
      />
    } else if (this.state.display === 'question') {
      return <Question
        qCount={this.state.qCount}
        range={this.state.range}
        questions={this.state.questions}
        mathType={this.state.mathType}
        updateInput={this.updateInput}
        quizResult={this.quizResult}
        button={this.state.button}
        rand1={this.state.rand1}
        rand2={this.state.rand2}
        op={this.state.op}
        randomInt={this.randomInt}
        answer={this.state.answer}
        focus={this.state.focus}
      />
    } else if (this.state.display === 'score') {
      return <ScoreScreen
        score={this.state.score}
        questions={this.state.questions}
        newQuiz={this.newQuiz}
        op={this.state.op}
        scoreSwitch={this.scoreSwitch}
        showScore={this.state.showScore}
        scoreBoard={this.state.scoreBoard}
        focus={this.state.focus}
        toggleFocus={this.toggleFocus}
      />
    }
    console.log(this.range);
  }

  render() {
    return (
      <div>
        <div class="game-box react">
          {this.display()}
        </div>
        <p id="msgBox" class="messages" style={{color: this.state.error.color, textShadow: '.3px .3px .7px #aaa'}}>{this.state.error.msg}</p>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('#react-dom'));