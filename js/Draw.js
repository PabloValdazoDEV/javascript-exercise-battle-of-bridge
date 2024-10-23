const dice = new Dice();
const player = new Player("Heroe", 100, 100);
const enemy = new Player("Enemigo", 100, 10);
const game = new BattleGame(dice, player, enemy);
 
const ul = document.getElementById("history");
const diceElement = document.getElementById("dice-value");
const btnReload = document.getElementById("reload");
 
btnReload.addEventListener("click", ()=>{
  const gameOver = document.getElementById("game-over");;
  ul.innerHTML = '';
  player.life = 100;
  enemy.life = 100
  renderLife(player)
  renderLife(enemy)
  gameOver.classList.add('hidden');
  diceElement.innerText = 0
})
 
function play() {
  document.getElementById("attack").disabled = true;
  const player = game.player;
  const enemy = game.enemy;
 
  game.battle(player, enemy);
 
  renderBattleLog(player, enemy);
 
  if (enemy.isDead() || player.isDead()) return;
 
  game.battle(enemy, player);
 
  setTimeout(() => {
    renderBattleLog(enemy, player);
    document.getElementById("attack").disabled = false;
  }, 2000);
}
 
renderLife(game.player);
renderLife(game.enemy);
document.getElementById("attack").addEventListener("click", play);
 
function renderLife(player) {
  const lifeBar = document.getElementById(
    "health-" + player.name.toLowerCase()
  );
if(player.life < 0){
  player.life = 0
}
  lifeBar.setAttribute("style", "width:" + player.life + "%");
  player.life <= 0 ? document.getElementById("attack").disabled = true : document.getElementById("attack").disabled = false
}
 
function renderBattleLog(attacker, defender) {
  diceElement.innerText = game.dice.value;
  let text, defeatText;
 
if(attacker.attack * game.dice.value >= 10 ){
  text = `${attacker.name} ataca a ${defender.name} y le hace ${
    attacker.attack * game.dice.value
  } puntos de daño ¡Ataque crítico!`;
} else {
  text = `${attacker.name} ataca a ${defender.name} y le hace ${
    attacker.attack * game.dice.value
  } puntos de daño`;
}
 
  
 
  let elementText = document.createTextNode(text);
  let li = document.createElement("li");
  li.className = "typing";
  li.appendChild(elementText);
  ul.appendChild(li);
  renderLife(defender);
 
  if (defender.isDead()) {
    defeatText =
      defender.name + " ha sido derrotado y " + attacker.name + " ha ganado";
    elementText = document.createTextNode(defeatText);
    li = document.createElement("li");
    li.className = "typing";
    li.appendChild(elementText);
    ul.appendChild(li);
 
    const gameOver = document.getElementById("game-over");
    gameOver.className = "show";
    document.getElementById("attack").disabled = true;
  }
}