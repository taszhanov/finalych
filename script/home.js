function calculate() {
  var errors = [];
  var team1 = {
    score: getScore("score_team1"),
    players: getPlayers("players_team1")
  };
  var team2 = {
    score: getScore("score_team2"),
    players: getPlayers("players_team2"),
  };
  
  if(playersCheck(team1, team2)){
    errors.push('Player names are required to be filled in!')
  }
  if(isNaN(team1.score.total) || isNaN(team2.score.total)){
    errors.push('Goals are required to be filled in!')
  }
  if(team1.players.length > 11 || team2.players.length > 11){
    errors.push('The number of players in a single team cannot be more than 11!')
  }
  if(team1.score.total + team2.score.total > 7){
    errors.push('The combined number of goals cannot be greater than 7!')
  }
  
  if(errors.length > 0) {
    showError(errors)
  }
  else {
    
    var gamestatus = 'Draw!'
    var description = 'Both teams scored an equal number of points.'
    
    if(team1.score.total != team2.score.total){
      gamestatus = (team1.score.total > team2.score.total ?
      'Team 1' : 'Team 2') + ' is the winner!'
      description = Math.abs(team1.score.total - team2.score.total) + ' point(s) ahead of the oppenent team.'
    }
    
    document.getElementById("div_team1").innerHTML = `
      <h2>Team 1</h2>
      <h1 style="font-size: 45px">${team1.score.total}</h1>
      <p>${team1.players.join(', ')}</p>
    `
    
    document.getElementById("div_team2").innerHTML = `
      <h2>Team 2</h2>
      <h1 style="font-size: 45px">${team2.score.total}</h1>
      <p>${team2.players.join(', ')}</p>
    `
    
    document.getElementById("result").innerHTML = `
      <center>
        <h1 style="font-size: 60px">${gamestatus}</h1>
        <h2>${description}</h2>
        <button class="again" onclick="location.reload()">Do another calculation</button>
      </center>
    `
   
    console.log("Players of Team 1:")
    team1.players.forEach(player => console.log(player));
    console.log("Players of Team 2:")
    team2.players.forEach(player => console.log(player));
  }
}

function getScore(id) {
  var score = document.getElementById(id).value;
  var each = score.trim().split(' ').map(a => parseFloat(a))
  var total = each.reduce((a, b) => a + b, 0)
  return {total, each}
}

function getPlayers(id) {
  var players = document.getElementById(id).value.replace(/\n/g, '').split(',')
  return players.map(a => a.trim()).filter(a => (a != ""))
}

function playersCheck(team1, team2) {
  if(team1.players.length < 1 || team2.players.length < 1){
    return true
  }
  else if (team1.players.length == 1 || team2.players.length == 1){
    return (team1.players[0] == '' || team2.players[0] == '')
  }
  else {
    return false
  }
}

function showError(list) {
  document.getElementById('error').innerHTML = `
    <div>
      <p>Fix the following errors to proceed to the calculation:
        <br/>
        ${list.join('<br/>')}
      </p>
    </div>
  `
}


window.onload = () => {
  Array.from(document.getElementsByClassName("teamscore")).map(input => {
    input.addEventListener('input', function() {
      this.value = this.value.replace(/[^0-9 \,]/, '');
    });
  })
}
