$(document).ready(function() {
  $(".dot1").click(function() {
    $(".options, p").css("visibility", "hidden");
    $("td").css("visibility", "visible");
    ai_color = "black";
    human_color = "white";
    console.log("white");
  });
  $(".dot2").click(function() {
    $(".options, p").css("visibility", "hidden");
    $("td").css("visibility", "visible");
    // document.getElementsByTag("td").style.visibility="visible"
    console.log("black");
  });

  $("td").click(function() {
    move(this, human_player, human_color);
    // check
    console.log("clicked");
  });
});
var board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
var human_player = "H";
var ai_player = "A";
var round = 0;
var ai_color = "white";
var human_color = "black";

function move(element, player, color) {
  console.log("element"+ element.id);
  if (board[element.id] != "H" && board[element.id] != "A") {
    round++;

    // $(element).css("background-color", color);
    document.getElementById(element.id).innerHTML = "X";
    // document.querySelector(element).innerText = 'X';
    board[element.id] = player;
    
    console.log(board);

    //This will be impossible condition
    if (winning(board, player)) {
      setTimeout(function(){
        alert("YOU WIN!");
        back_to_original();
      }, 500);
      return;
    }
    else if (round > 8) {
      $(".main").append("<h1 class='tie'>Ohhh nooo tied . Let me beat u one more time xD ? ! !</h1>");
            $(".main").css("background", "white");
            setTimeout(function () {
                // alert("TIE");

                $(".tie").remove();
                $(".main").css("background", "linear-gradient(#aebbf7, #15bbbb, #ffeee6)");

                back_to_original();
            }, 2000);
            return;
      // setTimeout(function() {
      //   alert("It's a TIE");
      //   back_to_original();
      // }, 500);
      // return;
    }
    else {
      round++;
      var index = minimax(board, ai_player).index;
      document.getElementById(index).innerHTML = "O";
      board[index] = ai_player;
      console.log(board);
      console.log(index);
      if (winning(board, ai_player)) {
        $(".main").append("<h2 class='lose'>ohhh you lose, can't beat an AI. Wanna play again??</h2>");
            $(".main").css("background", "white");
            setTimeout(function () {
                // alert("TIE");

                $(".lose").remove();
                $(".main").css("background", "linear-gradient(#aebbf7, #15bbbb, #ffeee6)");

                back_to_original();
            }, 2000);
            return;

        // setTimeout(function() {
        //   alert("YOU LOSE");
        //   back_to_original();
        // }, 500);
        // return;
      } 
      else if (round === 0) {
        setTimeout(function() {
          alert("tie");
          back_to_original();
        }, 500);
        return;
      }
    }
  }
}

//restart the game
function back_to_original() {
  round = 0;
  board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  for(var i=0;i<9;i++){
    document.getElementById(i).innerHTML = "";
  }
  $("td").css("background-color", "transparent");  
}

function minimax(board2, player) {
  let array = avail(board2);
  if (winning(board2, human_player)) {
    return {
      score: -10
    };
  }
  else if (winning(board2, ai_player)) {
    return {
      score: 10
    };
  }
  else if (array.length === 0) {
    return {
      score: 0
    };
  }

  var moves = [];
  for (var i = 0; i < array.length; i++) {
    var move = {};
    move.index = board2[array[i]];
    board2[array[i]] = player;

    if (player == ai_player) {
      var g = minimax(board2, human_player);
      move.score = g.score;
    } else {
      var g = minimax(board2, ai_player);
      move.score = g.score;
    }
    board2[array[i]] = move.index;
    moves.push(move);
  }

  var bestMove;
  if (player === ai_player) {
    var bestScore = -10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    var bestScore = 10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }
  return moves[bestMove];
}

//check available spots
function check(turn){
  if(turn!="H" && turn!="A"){
    return true;
  }
  else{
    return false;
  }
}
function avail(board2) {
  return board2.filter(check);
}

// winning combinations
function winning(board, player) {
  //check all the 8 possible winning cases
  if (
    (board[0] == player && board[1] == player && board[2] == player) ||
    (board[3] == player && board[4] == player && board[5] == player) ||
    (board[6] == player && board[7] == player && board[8] == player) ||
    (board[0] == player && board[3] == player && board[6] == player) ||
    (board[1] == player && board[4] == player && board[7] == player) ||
    (board[2] == player && board[5] == player && board[8] == player) ||
    (board[0] == player && board[4] == player && board[8] == player) ||
    (board[2] == player && board[4] == player && board[6] == player)
  ) {
    return true;
  } else {
    return false;
  }
}
