function GameBox() {
  return (
    <div>
      Highest integer you'd like to see:
      <input id="range" value="12" type="text" class="fontStyle" size="5" />
      How many questions?
      <input id="questions" value="" type="text" class="fontStyle" size="5" />
      <select id="mathType" class="fontStyle" type="select">
        <option value="1">Addition/Subtraction</option>
        <option value="2">Multiplication</option>
        <option value="3">Division</option>
      </select>
      <input type="button" class="fontStyle" value="Let's do some math!" id="start" onmouseup="initialize()" />
    </div>
  )
}

class App extends React.Component {
  render() {
    return (
      <div>
        <div class="game-box">
          <GameBox />
        </div>
        <p id="msgBox" class="messages"></p>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('#react-dom'));