function DefaultScreen(props) {
  const addsub = React.createElement('input',{type: 'radio', defaultChecked: true, name: "mathType", value: 1, onChange: () => { props.changeMathType(1) } });
  const multi = React.createElement('input',{type: 'radio', defaultChecked: false, name: "mathType", value: 2, onChange: () => { props.changeMathType(2) } });
  const divide = React.createElement('input',{type: 'radio', defaultChecked: false, name: "mathType", value: 3, onChange: () => { props.changeMathType(3) } });
  return (
    <div>
      Highest integer you'd like to see:
      <input id="range" value={props.range} type="text" className="fontStyle" size="5" />
      How many questions?
      <input selected="selected" id="questions" value={props.questions} type="text" className="fontStyle" size="5" />
      <div id="mathType" className="fontStyle" >
        <p>Add/Subtract</p>
        <p>Multiplication</p>
        <p>Division</p>
        {addsub}
        {multi}
        {divide}
      </div>
      <button type="button" className="fontStyle" id="start" onClick={() => {props.initialize(props.range, props.questions)}}>Let's do some math!</button>
    </div>
  )
}

function QuestionThread(props) {
    // Chooses which operator to print
  if (props.mathType === 1) {
    var fetch = Math.random();
    if (fetch < 0.5) {
        var type = '  +  '
    } else {
        var type = '  -  '
    }
    var base = 1;
    var sub = 0;
  } else if (props.mathType === 2) {
      var type='  x  ';
      var base = 2;
      var sub = 1;
  } else if (props.mathType === 3){
      var type='  /  ';
      var base = 2;
      var sub = 1;
  }
  const rand1 = Math.floor((Math.random() * (props.range - sub)) + base);
  const rand2 = Math.floor((Math.random() * (props.range - sub)) + base);

  return (
    <div>
      <p>Question {props.qCount} / {props.questions}</p>
      {rand1}{type}{rand2}  =  <input id="answr" size="5" class="qBox" />
      <p>
        <button id="submit" type="button">Submit</button>
      </p>
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        mathType: 1,
        error: {
          msg: '',
          color: ''
        },
        range: 12,
        questions: 3,
        qCount: 0,
        display: 'params',
      }
    this.changeMathType = this.changeMathType.bind(this)
    this.initialize = this.initialize.bind(this)
    this.questionThread = this.questionThread.bind(this)
  }
  initialize(highest, count) {
    if (isNaN(highest) || highest < 1 || highest === '' || isNaN(count) || count < 1 || count === '') {
      this.setState({error: {
        msg: 'INPUT ERROR! Must enter positive integer',
        color: '#f00'
      }})
    } else {
      this.questionThread()
    }
  }
  questionThread() {
    this.setState((prevState) => { return {display: 'question', qCount: prevState.qCount + 1} });
  }

  clearError() {
    this.setState({error: {
      msg: '',
      color: ''
    }})
  }
  changeMathType(option) {
    this.setState({mathType: option})
  }

  render() {
    const params = React.createElement(DefaultScreen, { range: this.state.range, questions: this.state.questions, range: this.state.range, questions: this.state.questions, initialize: this.initialize, changeMathType: this.changeMathType });
    const question = React.createElement(QuestionThread, {qCount: this.state.qCount, questions: this.state.questions, mathType: this.state.mathType, range: this.state.range});

    if (this.state.display === 'params') {
      var display = params;
    } else if (this.state.display === 'question') {
      var display = question;
    }
    
    return (
      <div>
        <div class="game-box react">
          {display}
        </div>
        <p id="msgBox" class="messages" style={{color: this.state.error.color, textShadow: '.3px .3px .7px #aaa'}}>{this.state.error.msg}</p>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('#react-dom'));