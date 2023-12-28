/* 
*
1 :- Player Management
*
*/

/* Next Bet Calculation For Player */
function NextBetCalculation4Player() {

  // - progression 
  if (isPositiveProgression == 0) {

    if (Borad[Borad.length - 1].playerGame.win == 1 || Borad[Borad.length - 1].playerGame.win == 2) {

      AmountSelectionIndexPlayer = 0;
      betUnitPlayer = parseInt(amountSelection[AmountSelectionIndexPlayer]);

      if (Borad[Borad.length - 1].playerGame.BrakeModeOnInPlay == 1) {
        AmountSelectionIndexPlayer = Borad[Borad.length - 1].playerGame.AmountSelectionIndex + 1;
        if (amountSelection.length == Borad[Borad.length - 1].playerGame.AmountSelectionIndex + 1) {
          AmountSelectionIndexPlayer = 0;
        }
        betUnitPlayer = parseInt(amountSelection[AmountSelectionIndexPlayer]);
        BrakeModeOnInPlayPlayer = 0;
      }

    } else if (Borad[Borad.length - 1].playerGame.win == 3) {
      betUnitPlayer = parseInt(Borad[Borad.length - 1].playerGame.betUnit);
    } else {

      if (Borad[Borad.length - 1].playerGame.AmountSelectionIndex + 1 < amountSelection.length) {
        AmountSelectionIndexPlayer = Borad[Borad.length - 1].playerGame.AmountSelectionIndex + 1;
        betUnitPlayer = parseInt(amountSelection[AmountSelectionIndexPlayer]);
      } else {
        AmountSelectionIndexPlayer = 0;
        betUnitPlayer = parseInt(amountSelection[AmountSelectionIndexPlayer]);
      }

      if (Borad[Borad.length - 1].playerGame.BrakeCount >= brakeNo && brakeNo != 0) {
        betUnitPlayer = 0;
        AmountSelectionIndexPlayer = Borad[Borad.length - 1].playerGame.AmountSelectionIndex;
        BrakeModeOnInPlayPlayer = 1;
      }


    }
  } else {

    if (Borad[Borad.length - 1].playerGame.win == 1 || Borad[Borad.length - 1].playerGame.win == 2) {

      if (Borad[Borad.length - 1].playerGame.AmountSelectionIndex + 1 < amountSelection.length) {
        AmountSelectionIndexPlayer = Borad[Borad.length - 1].playerGame.AmountSelectionIndex + 1;
        betUnitPlayer = parseInt(amountSelection[AmountSelectionIndexPlayer]);
      } else {
        AmountSelectionIndexPlayer = 0;
        betUnitPlayer = parseInt(amountSelection[AmountSelectionIndexPlayer]);
      }

      if (Borad[Borad.length - 1].playerGame.BrakeModeOnInPlay == 1) {
        AmountSelectionIndexPlayer = Borad[Borad.length - 1].playerGame.AmountSelectionIndex + 1;
        if (amountSelection.length == Borad[Borad.length - 1].playerGame.AmountSelectionIndex + 1) {
          AmountSelectionIndexPlayer = 0;
        }
        betUnitPlayer = parseInt(amountSelection[AmountSelectionIndexPlayer]);
        BrakeModeOnInPlayPlayer = 0;
      }


    } else if (Borad[Borad.length - 1].playerGame.win == 3) {
      betUnitPlayer = parseInt(Borad[Borad.length - 1].playerGame.betUnit);
    } else {

      AmountSelectionIndexPlayer = 0;
      betUnitPlayer = parseInt(amountSelection[AmountSelectionIndexPlayer]);

      if (Borad[Borad.length - 1].playerGame.BrakeCount >= brakeNo && brakeNo != 0) {
        betUnitPlayer = 0;
        AmountSelectionIndexPlayer = Borad[Borad.length - 1].playerGame.AmountSelectionIndex;
        BrakeModeOnInPlayPlayer = 1;
      }
    }
  }


  totalBetAmtPlayer = PerUnit * betUnitPlayer;

  /* Tie Amt Calculation  */
  if (tieMode == 1 && betUnitPlayer > Borad[Borad.length - 1].playerGame.betUnit) {
    tieAmtPlayer = Math.floor(PerUnit * betUnitPlayer / 8);
    tieUnitPlayer = Math.floor(tieAmtPlayer / PerUnit);
    BetOnTiePlayer = 1;
    totalBetAmtPlayer += tieAmtPlayer;
  }

  if (selectedGameModeInMultipleMode['Player'] == 1) {
    multipleBetUnitOnPlayer += betUnitPlayer;
    multipleBetOnPlayer = 1;
    if (BetOnTiePlayer == 1) {
      multipleBetOnTie = 1;
      multipleBetUnitOnTie += tieUnitPlayer;
      multipleBetAmountOnTie += tieAmtPlayer;
    }
  }

  if (gameMode == 'Player') {
    bet.innerHTML = '<div><span class="boradTableinPlayer"> Player </span><span> : $' + betUnitPlayer * PerUnit + '</span></div>';
    if (BetOnTiePlayer != 0) bet.innerHTML += '<div><span class="boradTableinTie"> Tie Amount </span><span> : $' + tieAmtPlayer + '</span></div>';
    bet.innerHTML += '<div><span>Total Amount : $' + totalBetAmtPlayer + '</span></div>';
  }

  if (totalBetAmtPlayer > Borad[Borad.length - 1].playerGame.MaxBet) {
    maxBetPlayer = totalBetAmtPlayer;
  }


}

/* Perview Next to Next Bet Calculation For Player */
function NextToNextBetCalculation4Player() {

  // - progression 
  if (isPositiveProgression == 0) {
    previewBetUnitPlayerWin = parseInt(amountSelection[0]);

    if (BrakeModeOnInPlayPlayer == 1) {
      var tempAmountSelectionIndexPlayer = Borad[Borad.length - 1].playerGame.AmountSelectionIndex + 1;
      if (amountSelection.length == Borad[Borad.length - 1].playerGame.AmountSelectionIndex + 1) {
        tempAmountSelectionIndexPlayer = 0;
      }
      previewBetUnitPlayerWin = parseInt(amountSelection[tempAmountSelectionIndexPlayer]);
    }

    if (AmountSelectionIndexPlayer + 1 < amountSelection.length) {
      previewBetUnitPlayerLoss = parseInt(amountSelection[AmountSelectionIndexPlayer + 1]);
    } else {
      previewBetUnitPlayerLoss = parseInt(amountSelection[0]);
    }

    if (Borad[Borad.length - 1].playerGame.BrakeCount + 1 >= brakeNo && brakeNo != 0) {
      previewBetUnitPlayerLoss = 0;

    }
  } else {
    previewBetUnitPlayerLoss = parseInt(amountSelection[0]);

    if (BrakeModeOnInPlayPlayer == 1) {
      var tempAmountSelectionIndexPlayer = Borad[Borad.length - 1].playerGame.AmountSelectionIndex + 1;
      if (amountSelection.length == Borad[Borad.length - 1].playerGame.AmountSelectionIndex + 1) {
        tempAmountSelectionIndexPlayer = 0;
      }
      previewBetUnitPlayerLoss = parseInt(amountSelection[tempAmountSelectionIndexPlayer]);
    }

    if (AmountSelectionIndexPlayer + 1 < amountSelection.length) {
      previewBetUnitPlayerWin = parseInt(amountSelection[AmountSelectionIndexPlayer + 1]);
    } else {
      previewBetUnitPlayerWin = parseInt(amountSelection[0]);
    }

    if (Borad[Borad.length - 1].playerGame.BrakeCount + 1 >= brakeNo && brakeNo != 0) {
      previewBetUnitPlayerWin = 0;

    }
  }


  if (selectedGameModeInMultipleMode['Player'] == 1) {
    previewBetUnitPlayerWinINMM += previewBetUnitPlayerWin;
    previewBetUnitPlayerLossINMM += previewBetUnitPlayerLoss;
    previewBetOnPlayerWin = 1;
    previewBetOnPlayerLoss = 1;
  }

  if (gameMode == 'Player') {
    preview.innerHTML = 'Win(W) : Player $' + previewBetUnitPlayerWin * PerUnit + '<br>Loss(L) : Player $' + previewBetUnitPlayerLoss * PerUnit;
  }

}


/* 
*
2 :- Banker Management
*
*/

/* Next Bet Calculation For Banker */
function NextBetCalculation4Banker() {

  // - progression
  if (isPositiveProgression == 0) {
    if (Borad[Borad.length - 1].BankerGame.win == 1 || Borad[Borad.length - 1].BankerGame.win == 2) {

      AmountSelectionIndexBanker = 0;
      betUnitBanker = parseInt(amountSelection[AmountSelectionIndexBanker]);

      if (Borad[Borad.length - 1].BankerGame.BrakeModeOnInPlay == 1) {

        AmountSelectionIndexBanker = Borad[Borad.length - 1].BankerGame.AmountSelectionIndex + 1;
        if (amountSelection.length == Borad[Borad.length - 1].BankerGame.AmountSelectionIndex + 1) {
          AmountSelectionIndexBanker = 0;
        }
        betUnitBanker = parseInt(amountSelection[AmountSelectionIndexBanker]);
        BrakeModeOnInPlayBanker = 0;
      }

    } else if (Borad[Borad.length - 1].BankerGame.win == 3) {
      betUnitBanker = Borad[Borad.length - 1].BankerGame.betUnit;
    } else {

      if (Borad[Borad.length - 1].BankerGame.AmountSelectionIndex + 1 < amountSelection.length) {
        AmountSelectionIndexBanker = Borad[Borad.length - 1].BankerGame.AmountSelectionIndex + 1;
        betUnitBanker = parseInt(amountSelection[AmountSelectionIndexBanker]);
      } else {
        AmountSelectionIndexBanker = 0;
        betUnitBanker = parseInt(amountSelection[AmountSelectionIndexBanker]);
      }

      if (Borad[Borad.length - 1].BankerGame.BrakeCount >= brakeNo && brakeNo != 0) {
        betUnitBanker = 0;
        AmountSelectionIndexBanker = Borad[Borad.length - 1].BankerGame.AmountSelectionIndex;
        BrakeModeOnInPlayBanker = 1;
      }
    }
  } else {
    if (Borad[Borad.length - 1].BankerGame.win == 1 || Borad[Borad.length - 1].BankerGame.win == 2) {

      if (Borad[Borad.length - 1].BankerGame.AmountSelectionIndex + 1 < amountSelection.length) {
        AmountSelectionIndexBanker = Borad[Borad.length - 1].BankerGame.AmountSelectionIndex + 1;
        betUnitBanker = parseInt(amountSelection[AmountSelectionIndexBanker]);
      } else {
        AmountSelectionIndexBanker = 0;
        betUnitBanker = parseInt(amountSelection[AmountSelectionIndexBanker]);
      }


      if (Borad[Borad.length - 1].BankerGame.BrakeModeOnInPlay == 1) {

        AmountSelectionIndexBanker = Borad[Borad.length - 1].BankerGame.AmountSelectionIndex + 1;
        if (amountSelection.length == Borad[Borad.length - 1].BankerGame.AmountSelectionIndex + 1) {
          AmountSelectionIndexBanker = 0;
        }
        betUnitBanker = parseInt(amountSelection[AmountSelectionIndexBanker]);
        BrakeModeOnInPlayBanker = 0;
      }

    } else if (Borad[Borad.length - 1].BankerGame.win == 3) {
      betUnitBanker = Borad[Borad.length - 1].BankerGame.betUnit;
    } else {

      AmountSelectionIndexBanker = 0;
      betUnitBanker = parseInt(amountSelection[AmountSelectionIndexBanker]);

      if (Borad[Borad.length - 1].BankerGame.BrakeCount >= brakeNo && brakeNo != 0) {
        betUnitBanker = 0;
        AmountSelectionIndexBanker = Borad[Borad.length - 1].BankerGame.AmountSelectionIndex;
        BrakeModeOnInPlayBanker = 1;
      }
    }
  }



  totalBetAmtBanker = PerUnit * betUnitBanker;

  /* Tie Amt Calculation */
  if (tieMode == 1 && betUnitBanker > Borad[Borad.length - 1].BankerGame.betUnit) {
    tieAmtBanker = Math.floor(PerUnit * betUnitBanker / 8);
    tieUnitBanker = Math.floor(tieAmtBanker / PerUnit);
    BetOnTieBanker = 1;
    totalBetAmtBanker += tieAmtBanker;
  }

  if (selectedGameModeInMultipleMode['Banker'] == 1) {
    multipleBetUnitOnBanker += betUnitBanker;
    multipleBetOnBanker = 1;
    if (BetOnTieBanker == 1) {
      multipleBetOnTie = 1;
      multipleBetUnitOnTie += tieUnitBanker;
      multipleBetAmountOnTie += tieAmtBanker;
    }
  }

  if (gameMode == 'Banker') {
    bet.innerHTML = '<div><span class="boradTableinBanker"> Banker</span><span> : $' + betUnitBanker * PerUnit + '</span></div>';
    if (BetOnTieBanker != 0) bet.innerHTML += '<div><span class="boradTableinTie"> Tie Amount </span><span> : $' + tieAmtBanker + '</span></div>';
    bet.innerHTML += '<div><span> Total Amount : $' + totalBetAmtBanker + '</span></div>';
  }

  if (totalBetAmtBanker > Borad[Borad.length - 1].BankerGame.MaxBet) {
    maxBetBanker = totalBetAmtBanker;
  }

}

/* Perview Next to Next Bet Calculation For Banker */
function NextToNextBetCalculation4Banker() {

  // - progression
  if (isPositiveProgression == 0) {
    previewBetUnitBankerWin = parseInt(amountSelection[0]);

    if (BrakeModeOnInPlayBanker == 1) {
      var tempAmountSelectionIndexBanker = Borad[Borad.length - 1].BankerGame.AmountSelectionIndex + 1;
      if (amountSelection.length == Borad[Borad.length - 1].BankerGame.AmountSelectionIndex + 1) {
        tempAmountSelectionIndexBanker = 0;
      }
      previewBetUnitBankerWin = parseInt(amountSelection[tempAmountSelectionIndexBanker]);
    }

    if (AmountSelectionIndexBanker + 1 < amountSelection.length) {
      previewBetUnitBankerLoss = parseInt(amountSelection[AmountSelectionIndexBanker + 1]);
    } else {
      previewBetUnitBankerLoss = parseInt(amountSelection[0]);
    }

    if (Borad[Borad.length - 1].BankerGame.BrakeCount + 1 >= brakeNo && brakeNo != 0) {
      previewBetUnitBankerLoss = 0;
    }
  } else {
    previewBetUnitBankerLoss = parseInt(amountSelection[0]);

    if (BrakeModeOnInPlayBanker == 1) {
      var tempAmountSelectionIndexBanker = Borad[Borad.length - 1].BankerGame.AmountSelectionIndex + 1;
      if (amountSelection.length == Borad[Borad.length - 1].BankerGame.AmountSelectionIndex + 1) {
        tempAmountSelectionIndexBanker = 0;
      }
      previewBetUnitBankerLoss = parseInt(amountSelection[tempAmountSelectionIndexBanker]);
    }

    if (AmountSelectionIndexBanker + 1 < amountSelection.length) {
      previewBetUnitBankerWin = parseInt(amountSelection[AmountSelectionIndexBanker + 1]);
    } else {
      previewBetUnitBankerWin = parseInt(amountSelection[0]);
    }

    if (Borad[Borad.length - 1].BankerGame.BrakeCount + 1 >= brakeNo && brakeNo != 0) {
      previewBetUnitBankerWin = 0;
    }

  }

  if (selectedGameModeInMultipleMode['Banker'] == 1) {
    previewBetUnitBankerWinINMM += previewBetUnitBankerWin;
    previewBetUnitBankerLossINMM += previewBetUnitBankerLoss;
    previewBetOnBankerWin = 1;
    previewBetOnBankerLoss = 1;
  }

  if (gameMode == 'Banker') {
    preview.innerHTML = 'Win(W) : Banker  $' + previewBetUnitBankerWin * PerUnit + '<br> Loss(L) : Banker  $' + previewBetUnitBankerLoss * PerUnit;
  }


}


/* 
*
4 :- Zig Zag Player Management
*
*/

function NextBetCalculation4ZigZagPlayer() {

  if (Borad[Borad.length - 1].ZigZagPlayerGame.betOn == 'Player') {
    betOnZigZagPlayer = 'Banker';
  } else {
    betOnZigZagPlayer = 'Player';
  }

  // Bet Unit
  // - progression
  if (isPositiveProgression == 0) {
    if (Borad[Borad.length - 1].ZigZagPlayerGame.win == 1 || Borad[Borad.length - 1].ZigZagPlayerGame.win == 2) {

      AmountSelectionIndexZigZagPlayer = 0;
      betUnitZigZagPlayer = parseInt(amountSelection[AmountSelectionIndexZigZagPlayer]);

      if (Borad[Borad.length - 1].ZigZagPlayerGame.BrakeModeOnInPlay == 1) {
        AmountSelectionIndexZigZagPlayer = Borad[Borad.length - 1].ZigZagPlayerGame.AmountSelectionIndex + 1;
        if (amountSelection.length == Borad[Borad.length - 1].ZigZagPlayerGame.AmountSelectionIndex + 1) {
          AmountSelectionIndexZigZagPlayer = 0;
        }
        betUnitZigZagPlayer = parseInt(amountSelection[AmountSelectionIndexZigZagPlayer]);
        BrakeModeOnInPlayZigZagPlayer = 0;
      }

    } else if (Borad[Borad.length - 1].ZigZagPlayerGame.win == 3) {
      betUnitZigZagPlayer = parseInt(Borad[Borad.length - 1].ZigZagPlayerGame.betUnit);
    } else {

      if (Borad[Borad.length - 1].ZigZagPlayerGame.AmountSelectionIndex + 1 < amountSelection.length) {
        AmountSelectionIndexZigZagPlayer = Borad[Borad.length - 1].ZigZagPlayerGame.AmountSelectionIndex + 1;
        betUnitZigZagPlayer = parseInt(amountSelection[AmountSelectionIndexZigZagPlayer]);
      } else {
        AmountSelectionIndexZigZagPlayer = 0;
        betUnitZigZagPlayer = parseInt(amountSelection[AmountSelectionIndexZigZagPlayer]);
      }

      if (Borad[Borad.length - 1].ZigZagPlayerGame.BrakeCount >= brakeNo && brakeNo != 0) {
        betUnitZigZagPlayer = 0;
        AmountSelectionIndexZigZagPlayer = Borad[Borad.length - 1].ZigZagPlayerGame.AmountSelectionIndex;
        BrakeModeOnInPlayZigZagPlayer = 1;
      }


    }
  } else {
    if (Borad[Borad.length - 1].ZigZagPlayerGame.win == 1 || Borad[Borad.length - 1].ZigZagPlayerGame.win == 2) {

      if (Borad[Borad.length - 1].ZigZagPlayerGame.AmountSelectionIndex + 1 < amountSelection.length) {
        AmountSelectionIndexZigZagPlayer = Borad[Borad.length - 1].ZigZagPlayerGame.AmountSelectionIndex + 1;
        betUnitZigZagPlayer = parseInt(amountSelection[AmountSelectionIndexZigZagPlayer]);
      } else {
        AmountSelectionIndexZigZagPlayer = 0;
        betUnitZigZagPlayer = parseInt(amountSelection[AmountSelectionIndexZigZagPlayer]);
      }

      if (Borad[Borad.length - 1].ZigZagPlayerGame.BrakeModeOnInPlay == 1) {
        AmountSelectionIndexZigZagPlayer = Borad[Borad.length - 1].ZigZagPlayerGame.AmountSelectionIndex + 1;
        if (amountSelection.length == Borad[Borad.length - 1].ZigZagPlayerGame.AmountSelectionIndex + 1) {
          AmountSelectionIndexZigZagPlayer = 0;
        }
        betUnitZigZagPlayer = parseInt(amountSelection[AmountSelectionIndexZigZagPlayer]);
        BrakeModeOnInPlayZigZagPlayer = 0;
      }

    } else if (Borad[Borad.length - 1].ZigZagPlayerGame.win == 3) {
      betUnitZigZagPlayer = parseInt(Borad[Borad.length - 1].ZigZagPlayerGame.betUnit);
    } else {

      AmountSelectionIndexZigZagPlayer = 0;
      betUnitZigZagPlayer = parseInt(amountSelection[AmountSelectionIndexZigZagPlayer]);

      if (Borad[Borad.length - 1].ZigZagPlayerGame.BrakeCount >= brakeNo && brakeNo != 0) {
        betUnitZigZagPlayer = 0;
        AmountSelectionIndexZigZagPlayer = Borad[Borad.length - 1].ZigZagPlayerGame.AmountSelectionIndex;
        BrakeModeOnInPlayZigZagPlayer = 1;
      }


    }
  }


  totalBetAmtZigZagPlayer = PerUnit * betUnitZigZagPlayer;

  /* Tie Amt Calculation  */
  if (tieMode == 1 && betUnitZigZagPlayer > Borad[Borad.length - 1].ZigZagPlayerGame.betUnit) {
    tieAmtZigZagPlayer = Math.floor(PerUnit * betUnitZigZagPlayer / 8);
    tieUnitZigZagPlayer = Math.floor(tieAmtZigZagPlayer / PerUnit);
    BetOnTieZigZagPlayer = 1;
    totalBetAmtZigZagPlayer += tieAmtZigZagPlayer;
  }

  if (selectedGameModeInMultipleMode['ZigZagPlayer'] == 1) {
    if (betOnZigZagPlayer == 'Player') {
      multipleBetUnitOnPlayer += betUnitZigZagPlayer;
      multipleBetOnPlayer = 1;
    } else {
      multipleBetUnitOnBanker += betUnitZigZagPlayer;
      multipleBetOnBanker = 1;
    }
    if (BetOnTieZigZagPlayer == 1) {
      multipleBetOnTie = 1;
      multipleBetUnitOnTie += tieUnitZigZagPlayer;
      multipleBetAmountOnTie += tieAmtZigZagPlayer;
    }
  }

  if (gameMode == 'ZigZag Player First') {
    if (betOnZigZagPlayer == 'Player') bet.innerHTML = '<div><span class="boradTableinPlayer">' + betOnZigZagPlayer + '</span><span> : $' + betUnitZigZagPlayer * PerUnit + '</span></div>';
    if (betOnZigZagPlayer == 'Banker') bet.innerHTML = '<div><span class="boradTableinBanker">' + betOnZigZagPlayer + '</span><span> : $' + betUnitZigZagPlayer * PerUnit + '</span></div>';

    if (BetOnTieZigZagPlayer != 0) bet.innerHTML += '<div><span class="boradTableinTie"> Tie Amount </span><span> : $' + tieAmtZigZagPlayer + '</span></div>';
    bet.innerHTML += '<div><span>Total Amount : $' + totalBetAmtZigZagPlayer + '</span></div>';
  }

  if (totalBetAmtZigZagPlayer > Borad[Borad.length - 1].ZigZagPlayerGame.MaxBet) {
    maxBetZigZagPlayer = totalBetAmtZigZagPlayer;
  }

}

/* Perview Next to Next Bet Calculation For  Zig Zag Player First */
function NextToNextBetCalculation4ZigZagPlayer() {

  if (betOnZigZagPlayer == 'Player') previewBetOnZigZagPlayerWin = 'Banker';
  else previewBetOnZigZagPlayerWin = 'Player';


  // - progression
  if (isPositiveProgression == 0) {
    previewBetOnZigZagPlayerLoss = previewBetOnZigZagPlayerWin;

    previewBetUnitZigZagPlayerWin = parseInt(amountSelection[0]);

    if (BrakeModeOnInPlayZigZagPlayer == 1) {
      var tempAmountSelectionIndexZigZagPlayer = Borad[Borad.length - 1].ZigZagPlayerGame.AmountSelectionIndex + 1;
      if (amountSelection.length == Borad[Borad.length - 1].ZigZagPlayerGame.AmountSelectionIndex + 1) {
        tempAmountSelectionIndexZigZagPlayer = 0;
      }
      previewBetUnitZigZagPlayerWin = parseInt(amountSelection[tempAmountSelectionIndexZigZagPlayer]);
    }

    if (AmountSelectionIndexZigZagPlayer + 1 < amountSelection.length) {
      previewBetUnitZigZagPlayerLoss = parseInt(amountSelection[AmountSelectionIndexZigZagPlayer + 1]);
    } else {
      previewBetUnitZigZagPlayerLoss = parseInt(amountSelection[0]);
    }

    if (Borad[Borad.length - 1].ZigZagPlayerGame.BrakeCount + 1 >= brakeNo && brakeNo != 0) {
      previewBetUnitZigZagPlayerLoss = 0;

    }
  } else {
    previewBetOnZigZagPlayerLoss = previewBetOnZigZagPlayerWin;

    previewBetUnitZigZagPlayerLoss = parseInt(amountSelection[0]);

    if (BrakeModeOnInPlayZigZagPlayer == 1) {
      var tempAmountSelectionIndexZigZagPlayer = Borad[Borad.length - 1].ZigZagPlayerGame.AmountSelectionIndex + 1;
      if (amountSelection.length == Borad[Borad.length - 1].ZigZagPlayerGame.AmountSelectionIndex + 1) {
        tempAmountSelectionIndexZigZagPlayer = 0;
      }
      previewBetUnitZigZagPlayerLoss = parseInt(amountSelection[tempAmountSelectionIndexZigZagPlayer]);
    }

    if (AmountSelectionIndexZigZagPlayer + 1 < amountSelection.length) {
      previewBetUnitZigZagPlayerWin = parseInt(amountSelection[AmountSelectionIndexZigZagPlayer + 1]);
    } else {
      previewBetUnitZigZagPlayerWin = parseInt(amountSelection[0]);
    }

    if (Borad[Borad.length - 1].ZigZagPlayerGame.BrakeCount + 1 >= brakeNo && brakeNo != 0) {
      previewBetUnitZigZagPlayerWin = 0;

    }
  }


  if (selectedGameModeInMultipleMode['ZigZagPlayer'] == 1) {
    if (previewBetOnZigZagPlayerWin == 'Banker') {
      previewBetUnitBankerWinINMM += previewBetUnitZigZagPlayerWin;
      previewBetUnitBankerLossINMM += previewBetUnitZigZagPlayerLoss;
      previewBetOnBankerWin = 1;
      previewBetOnBankerLoss = 1;
    } else {
      previewBetUnitPlayerWinINMM += previewBetUnitZigZagPlayerWin;
      previewBetUnitPlayerLossINMM += previewBetUnitZigZagPlayerLoss;
      previewBetOnPlayerWin = 1;
      previewBetOnPlayerLoss = 1;
    }
  }

  if (gameMode == 'ZigZag Player First') {
    preview.innerHTML = 'Win(W) : ' + previewBetOnZigZagPlayerWin + ' $' + previewBetUnitZigZagPlayerWin * PerUnit + '<br>Loss(L) : ' + previewBetOnZigZagPlayerLoss + ' $' + previewBetUnitZigZagPlayerLoss * PerUnit;
  }

}



/* 
*
5 :- Zig Zag Banker Management
*
*/

function NextBetCalculation4ZigZagBanker() {

  if (Borad[Borad.length - 1].ZigZagBankerGame.betOn == 'Player') {
    betOnZigZagBanker = 'Banker';
  } else {
    betOnZigZagBanker = 'Player';
  }

  // - progression
  if (isPositiveProgression == 0) {
    if (Borad[Borad.length - 1].ZigZagBankerGame.win == 1 || Borad[Borad.length - 1].ZigZagBankerGame.win == 2) {

      AmountSelectionIndexZigZagBanker = 0;
      betUnitZigZagBanker = parseInt(amountSelection[AmountSelectionIndexZigZagBanker]);

      if (Borad[Borad.length - 1].ZigZagBankerGame.BrakeModeOnInPlay == 1) {
        AmountSelectionIndexZigZagBanker = Borad[Borad.length - 1].ZigZagBankerGame.AmountSelectionIndex + 1;
        if (amountSelection.length == Borad[Borad.length - 1].ZigZagBankerGame.AmountSelectionIndex + 1) {
          AmountSelectionIndexZigZagBanker = 0;
        }
        betUnitZigZagBanker = parseInt(amountSelection[AmountSelectionIndexZigZagBanker]);
        BrakeModeOnInPlayZigZagBanker = 0;
      }

    } else if (Borad[Borad.length - 1].ZigZagBankerGame.win == 3) {
      betUnitZigZagBanker = parseInt(Borad[Borad.length - 1].ZigZagBankerGame.betUnit);
    } else {

      if (Borad[Borad.length - 1].ZigZagBankerGame.AmountSelectionIndex + 1 < amountSelection.length) {
        AmountSelectionIndexZigZagBanker = Borad[Borad.length - 1].ZigZagBankerGame.AmountSelectionIndex + 1;
        betUnitZigZagBanker = parseInt(amountSelection[AmountSelectionIndexZigZagBanker]);
      } else {
        AmountSelectionIndexZigZagBanker = 0;
        betUnitZigZagBanker = parseInt(amountSelection[AmountSelectionIndexZigZagBanker]);
      }

      if (Borad[Borad.length - 1].ZigZagBankerGame.BrakeCount >= brakeNo && brakeNo != 0) {
        betUnitZigZagBanker = 0;
        AmountSelectionIndexZigZagBanker = Borad[Borad.length - 1].ZigZagBankerGame.AmountSelectionIndex;
        BrakeModeOnInPlayZigZagBanker = 1;
      }


    }
  } else {
    if (Borad[Borad.length - 1].ZigZagBankerGame.win == 1 || Borad[Borad.length - 1].ZigZagBankerGame.win == 2) {

      if (Borad[Borad.length - 1].ZigZagBankerGame.AmountSelectionIndex + 1 < amountSelection.length) {
        AmountSelectionIndexZigZagBanker = Borad[Borad.length - 1].ZigZagBankerGame.AmountSelectionIndex + 1;
        betUnitZigZagBanker = parseInt(amountSelection[AmountSelectionIndexZigZagBanker]);
      } else {
        AmountSelectionIndexZigZagBanker = 0;
        betUnitZigZagBanker = parseInt(amountSelection[AmountSelectionIndexZigZagBanker]);
      }

      if (Borad[Borad.length - 1].ZigZagBankerGame.BrakeModeOnInPlay == 1) {
        AmountSelectionIndexZigZagBanker = Borad[Borad.length - 1].ZigZagBankerGame.AmountSelectionIndex + 1;
        if (amountSelection.length == Borad[Borad.length - 1].ZigZagBankerGame.AmountSelectionIndex + 1) {
          AmountSelectionIndexZigZagBanker = 0;
        }
        betUnitZigZagBanker = parseInt(amountSelection[AmountSelectionIndexZigZagBanker]);
        BrakeModeOnInPlayZigZagBanker = 0;
      }

    } else if (Borad[Borad.length - 1].ZigZagBankerGame.win == 3) {
      betUnitZigZagBanker = parseInt(Borad[Borad.length - 1].ZigZagBankerGame.betUnit);
    } else {

      AmountSelectionIndexZigZagBanker = 0;
      betUnitZigZagBanker = parseInt(amountSelection[AmountSelectionIndexZigZagBanker]);

      if (Borad[Borad.length - 1].ZigZagBankerGame.BrakeCount >= brakeNo && brakeNo != 0) {
        betUnitZigZagBanker = 0;
        AmountSelectionIndexZigZagBanker = Borad[Borad.length - 1].ZigZagBankerGame.AmountSelectionIndex;
        BrakeModeOnInPlayZigZagBanker = 1;
      }


    }
  }

  totalBetAmtZigZagBanker = PerUnit * betUnitZigZagBanker;

  /* Tie Amt Calculation  */
  if (tieMode == 1 && betUnitZigZagBanker > Borad[Borad.length - 1].ZigZagBankerGame.betUnit) {
    tieAmtZigZagBanker = Math.floor(PerUnit * betUnitZigZagBanker / 8);
    tieUnitZigZagBanker = Math.floor(tieAmtZigZagBanker / PerUnit);
    BetOnTieZigZagBanker = 1;
    totalBetAmtZigZagBanker += tieAmtZigZagBanker;
  }

  if (selectedGameModeInMultipleMode['ZigZagBanker'] == 1) {

    if (betOnZigZagBanker == 'Player') {
      multipleBetUnitOnPlayer += betUnitZigZagBanker;
      multipleBetOnPlayer = 1;
    } else {
      multipleBetUnitOnBanker += betUnitZigZagBanker;
      multipleBetOnBanker = 1;
    }
    if (BetOnTieZigZagBanker == 1) {
      multipleBetOnTie = 1;
      multipleBetUnitOnTie += tieUnitZigZagBanker;
      multipleBetAmountOnTie += tieAmtZigZagBanker;
    }
  }

  if (gameMode == 'ZigZag Banker First') {
    if (betOnZigZagBanker == 'Player') bet.innerHTML = '<div><span class="boradTableinPlayer">' + betOnZigZagBanker + '</span><span> : $' + betUnitZigZagBanker * PerUnit + '</span></div>';
    if (betOnZigZagBanker == 'Banker') bet.innerHTML = '<div><span class="boradTableinBanker">' + betOnZigZagBanker + '</span><span> : $' + betUnitZigZagBanker * PerUnit + '</span></div>';

    if (BetOnTieZigZagBanker != 0) bet.innerHTML += '<div><span class="boradTableinTie"> Tie Amount </span><span> : $' + tieAmtZigZagBanker + '</span></div>';
    bet.innerHTML += '<div><span>Total Amount : $' + totalBetAmtZigZagBanker + '</span></div>';
  }

  if (totalBetAmtZigZagBanker > Borad[Borad.length - 1].ZigZagBankerGame.MaxBet) {
    maxBetZigZagBanker = totalBetAmtZigZagBanker;
  }

}

/* Perview Next to Next Bet Calculation For  Zig Zag Banker First */
function NextToNextBetCalculation4ZigZagBanker() {

  if (betOnZigZagBanker == 'Player') previewBetOnZigZagBankerWin = 'Banker';
  else previewBetOnZigZagBankerWin = 'Player';

  previewBetOnZigZagBankerLoss = previewBetOnZigZagBankerWin;

  // - progression
  if (isPositiveProgression == 0) {
    previewBetUnitZigZagBankerWin = parseInt(amountSelection[0]);

    if (BrakeModeOnInPlayZigZagBanker == 1) {
      var tempAmountSelectionIndexZigZagBanker = Borad[Borad.length - 1].ZigZagBankerGame.AmountSelectionIndex + 1;
      if (amountSelection.length == Borad[Borad.length - 1].ZigZagBankerGame.AmountSelectionIndex + 1) {
        tempAmountSelectionIndexZigZagBanker = 0;
      }
      previewBetUnitZigZagBankerWin = parseInt(amountSelection[tempAmountSelectionIndexZigZagBanker]);
    }

    if (AmountSelectionIndexZigZagBanker + 1 < amountSelection.length) {
      previewBetUnitZigZagBankerLoss = parseInt(amountSelection[AmountSelectionIndexZigZagBanker + 1]);
    } else {
      previewBetUnitZigZagBankerLoss = parseInt(amountSelection[0]);
    }

    if (Borad[Borad.length - 1].ZigZagBankerGame.BrakeCount + 1 >= brakeNo && brakeNo != 0) {
      previewBetUnitZigZagBankerLoss = 0;

    }
  } else {
    previewBetUnitZigZagBankerLoss = parseInt(amountSelection[0]);

    if (BrakeModeOnInPlayZigZagBanker == 1) {
      var tempAmountSelectionIndexZigZagBanker = Borad[Borad.length - 1].ZigZagBankerGame.AmountSelectionIndex + 1;
      if (amountSelection.length == Borad[Borad.length - 1].ZigZagBankerGame.AmountSelectionIndex + 1) {
        tempAmountSelectionIndexZigZagBanker = 0;
      }
      previewBetUnitZigZagBankerLoss = parseInt(amountSelection[tempAmountSelectionIndexZigZagBanker]);
    }

    if (AmountSelectionIndexZigZagBanker + 1 < amountSelection.length) {
      previewBetUnitZigZagBankerWin = parseInt(amountSelection[AmountSelectionIndexZigZagBanker + 1]);
    } else {
      previewBetUnitZigZagBankerWin = parseInt(amountSelection[0]);
    }

    if (Borad[Borad.length - 1].ZigZagBankerGame.BrakeCount + 1 >= brakeNo && brakeNo != 0) {
      previewBetUnitZigZagBankerWin = 0;
    }
  }

  if (selectedGameModeInMultipleMode['ZigZagBanker'] == 1) {
    if (previewBetOnZigZagBankerWin == 'Banker') {
      previewBetUnitBankerWinINMM += previewBetUnitZigZagBankerWin;
      previewBetUnitBankerLossINMM += previewBetUnitZigZagBankerLoss;
      previewBetOnBankerWin = 1;
      previewBetOnBankerLoss = 1;
    } else {
      previewBetUnitPlayerWinINMM += previewBetUnitZigZagBankerWin;
      previewBetUnitPlayerLossINMM += previewBetUnitZigZagBankerLoss;
      previewBetOnPlayerWin = 1;
      previewBetOnPlayerLoss = 1;
    }
  }

  if (gameMode == 'ZigZag Banker First') {

    preview.innerHTML = 'Win(W) : ' + previewBetOnZigZagBankerWin + ' $' + previewBetUnitZigZagBankerWin * PerUnit + '<br>Loss(L) : ' + previewBetOnZigZagBankerLoss + ' $' + previewBetUnitZigZagBankerLoss * PerUnit;
  }

}


/* 
*
6 :- SOW 
*
*/

function NextBetCalculation4SOW() {

  if (Borad[Borad.length - 1].actualWinner == 'Tie' && statusOfSOWGame == 0) {
    vaildLengthToStartGame++;
    setTimeout(() => console.log("hi"), 10);
  }

  // 1st 2 hand bets 
  if (Borad.length < vaildLengthToStartGame) {

    sameAsWinSOW = null, oppositeOfWinSOW = null;
    oppositeOfWinActualWinSOW = -1, sameAsWinActualWinSOW = -1;
    betOnWhichPartySOW = -1;
    AmountSelectionIndexSOW = 0;
    betUnitSOW = 0;
    totalBetAmtSOW = betUnitSOW * PerUnit;

    if (gameMode == 'SOW') {
      bet.innerHTML = '<div><span> -- </span><span> : $ -- </span></div>';
      preview.innerHTML = 'Win(W) : -- $ -- <br>  Loss(L) : -- $ -- ';
    }

  }
  // after 2nd bet calculation
  else {

    // Set Same AS Bet And Opposite Bet 
    sameAsWinSOW = Borad[Borad.length - 2].actualWinner;

    if (Borad[Borad.length - 2].actualWinner == "Player") oppositeOfWinSOW = "Banker";
    else if (Borad[Borad.length - 2].actualWinner == "Banker") oppositeOfWinSOW = "Player";
    else oppositeOfWinSOW = null;

    // if tie came in last 2nd position 
    if (Borad[Borad.length - 2].actualWinner == 'Tie') {

      // let tempWinner = Borad[Borad.length - 3].actualWinner;
      // sameAsWinSOW = tempWinner;

      // if (tempWinner == "Player") oppositeOfWinSOW = "Banker";
      // else if (tempWinner == "Banker") oppositeOfWinSOW = "Player";
      // else oppositeOfWinSOW = null;

      // try with while loop
      let tempTOCalculateTieWin = 3;
      while (1) {

        if (Borad[Borad.length - tempTOCalculateTieWin].actualWinner != 'Tie') {
          let tempWinner = Borad[Borad.length - tempTOCalculateTieWin].actualWinner;
          sameAsWinSOW = tempWinner;

          if (tempWinner == "Player") oppositeOfWinSOW = "Banker";
          else if (tempWinner == "Banker") oppositeOfWinSOW = "Player";
          else oppositeOfWinSOW = null;

          break;
        }

        tempTOCalculateTieWin++;

        // if(Borad.)
      }

      // 

    }
    // 1 for Same as Winner 
    // 0 for Opposite of winner 

    // Set bet unit and bet on which ?? 
    if (Borad.length > vaildLengthToStartGame) {

      statusOfSOWGame = 1;

      // set bet on and which party we bet 
      if (Borad[Borad.length - 1].SOW.win == 3) {
        betOnSOW = Borad[Borad.length - 1].SOW.betOn;
        betOnWhichPartySOW = Borad[Borad.length - 1].SOW.betOnWhichParty;
      } else if (Borad[Borad.length - 1].actualWinner == 'Tie') {

        betOnWhichPartySOW = Borad[Borad.length - 1].SOW.betOnWhichParty;
        if (betOnWhichPartySOW == 0) betOnSOW = oppositeOfWinSOW;
        else if (betOnWhichPartySOW == 1) betOnSOW = sameAsWinSOW;

      } else if (Borad[Borad.length - 1].SOW.win == 1) {

        betOnWhichPartySOW = Borad[Borad.length - 1].SOW.betOnWhichParty;
        if (betOnWhichPartySOW == 0) betOnSOW = oppositeOfWinSOW;
        else if (betOnWhichPartySOW == 1) betOnSOW = sameAsWinSOW;

      } else if (Borad[Borad.length - 1].SOW.win == 0) {

        if (Borad[Borad.length - 1].SOW.betOnWhichParty == 0) betOnWhichPartySOW = 1;
        else if (Borad[Borad.length - 1].SOW.betOnWhichParty == 1) betOnWhichPartySOW = 0;

        if (betOnWhichPartySOW == 0) betOnSOW = oppositeOfWinSOW;
        else if (betOnWhichPartySOW == 1) betOnSOW = sameAsWinSOW;

      } else if (Borad[Borad.length - 1].actualWinner == Borad[Borad.length - 1].SOW.sameAsWin) {
        betOnWhichPartySOW = 1;
        betOnSOW = sameAsWinSOW;
      } else if (Borad[Borad.length - 1].actualWinner == Borad[Borad.length - 1].SOW.oppositeOfWin) {
        betOnWhichPartySOW = 0;
        betOnSOW = oppositeOfWinSOW;
      }

      // set bet unit 
      // - progess
      if (isPositiveProgression == 0) {
        if (Borad[Borad.length - 1].SOW.win == 1 || Borad[Borad.length - 1].SOW.win == 2) {

          AmountSelectionIndexSOW = 0;
          betUnitSOW = parseInt(amountSelection[AmountSelectionIndexSOW]);

          if (Borad[Borad.length - 1].SOW.BrakeModeOnInPlay == 1) {
            AmountSelectionIndexSOW = Borad[Borad.length - 1].SOW.AmountSelectionIndex + 1;
            if (amountSelection.length == Borad[Borad.length - 1].SOW.AmountSelectionIndex + 1) {
              AmountSelectionIndexSOW = 0;
            }
            betUnitSOW = parseInt(amountSelection[AmountSelectionIndexSOW]);
            BrakeModeOnInPlaySOW = 0;
          }
        } else if (Borad[Borad.length - 1].SOW.win == 3) {
          betUnitSOW = parseInt(Borad[Borad.length - 1].SOW.betUnit);
        } else {

          if (Borad[Borad.length - 1].SOW.AmountSelectionIndex + 1 < amountSelection.length) {
            AmountSelectionIndexSOW = Borad[Borad.length - 1].SOW.AmountSelectionIndex + 1;
            betUnitSOW = parseInt(amountSelection[AmountSelectionIndexSOW]);
          } else {
            AmountSelectionIndexSOW = 0;
            betUnitSOW = parseInt(amountSelection[AmountSelectionIndexSOW]);
          }

          if (Borad[Borad.length - 1].SOW.BrakeCount >= brakeNo && brakeNo != 0) {
            betUnitSOW = 0;
            AmountSelectionIndexSOW = Borad[Borad.length - 1].SOW.AmountSelectionIndex;
            BrakeModeOnInPlaySOW = 1;
          }


        }
      } else {
        if (Borad[Borad.length - 1].SOW.win == 1 || Borad[Borad.length - 1].SOW.win == 2) {

          if (Borad[Borad.length - 1].SOW.AmountSelectionIndex + 1 < amountSelection.length) {
            AmountSelectionIndexSOW = Borad[Borad.length - 1].SOW.AmountSelectionIndex + 1;
            betUnitSOW = parseInt(amountSelection[AmountSelectionIndexSOW]);
          } else {
            AmountSelectionIndexSOW = 0;
            betUnitSOW = parseInt(amountSelection[AmountSelectionIndexSOW]);
          }

          if (Borad[Borad.length - 1].SOW.BrakeModeOnInPlay == 1) {
            AmountSelectionIndexSOW = Borad[Borad.length - 1].SOW.AmountSelectionIndex + 1;
            if (amountSelection.length == Borad[Borad.length - 1].SOW.AmountSelectionIndex + 1) {
              AmountSelectionIndexSOW = 0;
            }
            betUnitSOW = parseInt(amountSelection[AmountSelectionIndexSOW]);
            BrakeModeOnInPlaySOW = 0;
          }
        } else if (Borad[Borad.length - 1].SOW.win == 3) {
          betUnitSOW = parseInt(Borad[Borad.length - 1].SOW.betUnit);
        } else {

          AmountSelectionIndexSOW = 0;
          betUnitSOW = parseInt(amountSelection[AmountSelectionIndexSOW]);

          if (Borad[Borad.length - 1].SOW.BrakeCount >= brakeNo && brakeNo != 0) {
            betUnitSOW = 0;
            AmountSelectionIndexSOW = Borad[Borad.length - 1].SOW.AmountSelectionIndex;
            BrakeModeOnInPlaySOW = 1;
          }

        }
      }

      if (Borad.length == vaildLengthToStartGame + 1) {
        AmountSelectionIndexSOW = 0;
        betUnitSOW = parseInt(amountSelection[AmountSelectionIndexSOW]);
      }


    }

    totalBetAmtSOW = betUnitSOW * PerUnit;

    /* Tie Amt Calculation  */
    if (tieMode == 1 && betUnitSOW > Borad[Borad.length - 1].SOW.betUnit) {
      tieAmtSOW = Math.floor(PerUnit * betUnitSOW / 8);
      tieUnitSOW = Math.floor(tieAmtSOW / PerUnit);
      BetOnTieSOW = 1;
      totalBetAmtSOW += tieAmtSOW;
    }

    // Display in preview and bet 
    if (gameMode == 'SOW' && Borad.length > vaildLengthToStartGame) {
      if (betOnSOW == 'Player') bet.innerHTML = '<div><span class="boradTableinPlayer">' + betOnSOW + '</span><span> : $' + betUnitSOW * PerUnit + '</span></div>';
      if (betOnSOW == 'Banker') bet.innerHTML = '<div><span class="boradTableinBanker">' + betOnSOW + '</span><span> : $' + betUnitSOW * PerUnit + '</span></div>';

      if (BetOnTieSOW != 0) bet.innerHTML += '<div><span class="boradTableinTie"> Tie Amount </span><span> : $' + tieAmtSOW + '</span></div>';
      bet.innerHTML += '<div><span>Total Amount : $' + totalBetAmtSOW + '</span></div>';

    }

    // Multi mode Bet Calculation
    if (selectedGameModeInMultipleMode['SOW'] == 1) {
      if (betOnSOW == 'Player') {
        multipleBetUnitOnPlayer += betUnitSOW;
        multipleBetOnPlayer = 1;
      } else if (betOnSOW == 'Banker') {
        multipleBetUnitOnBanker += betUnitSOW;
        multipleBetOnBanker = 1;
      }
      if (BetOnTieSOW == 1) {
        multipleBetOnTie = 1;
        multipleBetUnitOnTie += tieUnitSOW;
        multipleBetAmountOnTie += tieAmtSOW;
      }
    }

    if (totalBetAmtSOW > Borad[Borad.length - 1].SOW.MaxBet) {
      maxBetSOW = totalBetAmtSOW;
    }



  }

}

// Preview bet 
function NextToNextBetCalculation4SOW() {

  if (Borad.length < vaildLengthToStartGame + 1) return;

  // For same as party preview bet on 
  if (betOnWhichPartySOW == 1) {

    previewBetOnSOWWin = Borad[Borad.length - 1].actualWinner;

    if (Borad[Borad.length - 1].actualWinner == "Player") previewBetOnSOWLoss = "Banker";
    else if (Borad[Borad.length - 1].actualWinner == "Banker") previewBetOnSOWLoss = "Player";

    if (Borad[Borad.length - 1].actualWinner == 'Tie') {
      let tempWinner = Borad[Borad.length - 2].actualWinner;
      previewBetOnSOWWin = tempWinner;

      if (tempWinner == "Player") previewBetOnSOWLoss = "Banker";
      else if (tempWinner == "Banker") previewBetOnSOWLoss = "Player";
      else previewBetOnSOWLoss = null;
    }

  }
  // For opposite party preview bet on 
  else if (betOnWhichPartySOW == 0) {

    if (Borad[Borad.length - 1].actualWinner == "Player") previewBetOnSOWWin = "Banker";
    else if (Borad[Borad.length - 1].actualWinner == "Banker") previewBetOnSOWWin = "Player";

    previewBetOnSOWLoss = Borad[Borad.length - 1].actualWinner;

    if (Borad[Borad.length - 1].actualWinner == 'Tie') {
      let tempWinner = Borad[Borad.length - 2].actualWinner;
      previewBetOnSOWLoss = tempWinner;

      if (tempWinner == "Player") previewBetOnSOWWin = "Banker";
      else if (tempWinner == "Banker") previewBetOnSOWWin = "Player";
      else previewBetOnSOWLoss = null;
    }
  }


  // Preview for bet unit 
  //- progress 
  if (isPositiveProgression == 0) {
    previewBetUnitSOWWin = parseInt(amountSelection[0]);

    if (BrakeModeOnInPlaySOW == 1) {
      var tempAmountSelectionIndexSOW = Borad[Borad.length - 1].SOW.AmountSelectionIndex + 1;
      if (amountSelection.length == Borad[Borad.length - 1].SOW.AmountSelectionIndex + 1) {
        tempAmountSelectionIndexSOW = 0;
      }
      previewBetUnitSOWWin = parseInt(amountSelection[tempAmountSelectionIndexSOW]);
    }

    if (AmountSelectionIndexSOW + 1 < amountSelection.length) {
      previewBetUnitSOWLoss = parseInt(amountSelection[AmountSelectionIndexSOW + 1]);
    } else {
      previewBetUnitSOWLoss = parseInt(amountSelection[0]);
    }

    if (Borad[Borad.length - 1].SOW.BrakeCount + 1 >= brakeNo && brakeNo != 0) {
      previewBetUnitSOWLoss = 0;
    }
  } else {
    previewBetUnitSOWLoss = parseInt(amountSelection[0]);

    if (BrakeModeOnInPlaySOW == 1) {
      var tempAmountSelectionIndexSOW = Borad[Borad.length - 1].SOW.AmountSelectionIndex + 1;
      if (amountSelection.length == Borad[Borad.length - 1].SOW.AmountSelectionIndex + 1) {
        tempAmountSelectionIndexSOW = 0;
      }
      previewBetUnitSOWLoss = parseInt(amountSelection[tempAmountSelectionIndexSOW]);
    }

    if (AmountSelectionIndexSOW + 1 < amountSelection.length) {
      previewBetUnitSOWWin = parseInt(amountSelection[AmountSelectionIndexSOW + 1]);
    } else {
      previewBetUnitSOWWin = parseInt(amountSelection[0]);
    }

    if (Borad[Borad.length - 1].SOW.BrakeCount + 1 >= brakeNo && brakeNo != 0) {
      previewBetUnitSOWWin = 0;
    }

  }
  // multi mode preview
  if (selectedGameModeInMultipleMode['SOW'] == 1) {
    if (previewBetOnSOWWin == 'Banker') {
      previewBetUnitBankerWinINMM += previewBetUnitSOWWin;
      previewBetOnBankerWin = 1;
    } else {
      previewBetUnitPlayerWinINMM += previewBetUnitSOWWin;
      previewBetOnPlayerWin = 1;
    }

    if (previewBetOnSOWLoss == 'Banker') {
      previewBetUnitBankerLossINMM += previewBetUnitSOWLoss;
      previewBetOnBankerLoss = 1;
    } else {
      previewBetUnitPlayerLossINMM += previewBetUnitSOWLoss;
      previewBetOnPlayerLoss = 1;
    }
  }



  // Display Preview 
  if (gameMode == 'SOW') {
    preview.innerHTML = 'Win(W) : ' + previewBetOnSOWWin + ' $' + previewBetUnitSOWWin * PerUnit + '<br>Loss(L) : ' + previewBetOnSOWLoss + ' $' + previewBetUnitSOWLoss * PerUnit;
  }


}


/* 
*
7 :- Differential Management
*
*/
/* In This Mode Count Contine is ramaine for brake */
/* Next Bet Calculation For Differential */
function NextBetCalculation4Differential() {

  if (betUnitBanker - betUnitPlayer == 0) {
    betUnitDifferential = 1;
    betOnDifferential = 'Banker';

  } else {
    if (betUnitBanker > betUnitPlayer) {
      betUnitDifferential = betUnitBanker - betUnitPlayer;
      betOnDifferential = 'Banker';
    } else {
      betUnitDifferential = betUnitPlayer - betUnitBanker;
      betOnDifferential = 'Player';
    }
  }

  if (Borad[Borad.length - 1].differential.BrakeCount >= brakeNo && brakeNo != 0) {
    betUnitDifferential = 0;
    betOnDifferential = 'Banker';
  }


  totalBetAmtDifferential = betUnitDifferential * PerUnit;
  /* Tie Amt Calculation  */
  if (tieMode == 1 && betUnitDifferential > Borad[Borad.length - 1].differential.betUnit) {
    tieAmtDifferential = Math.floor(PerUnit * betUnitDifferential / 8);
    tieUnitDifferential = Math.floor(tieAmtDifferential / PerUnit);
    BetOnTieDifferential = 1;
    totalBetAmtDifferential += tieAmtDifferential;
  }

  if (gameMode == 'Differential') {
    if (betOnDifferential == 'Player') {
      bet.innerHTML = '<div><span class="boradTableinPlayer"> Player </span><span>: $' + betUnitDifferential * PerUnit + '</span></div>';
    } else {
      bet.innerHTML = '<div><span class="boradTableinBanker"> Banker</span><span> : $' + betUnitDifferential * PerUnit + '</span></div>';
    }
    if (BetOnTieDifferential != 0) bet.innerHTML += '<div><span class="boradTableinTie"> Tie Amount </span><span> : $' + tieAmtDifferential + '</span></div>';
    bet.innerHTML += '<div><span> Total Amount : $' + totalBetAmtDifferential + '</span></div>';
  }

  if (totalBetAmtDifferential > Borad[Borad.length - 1].differential.MaxBet) {
    maxBetDifferential = totalBetAmtDifferential;
  }

}

/* Perview Next to Next Bet Calculation For Differential */
function NextToNextBetCalculation4Differential() {

  if (betOnDifferential == 'Banker') {
    if (previewBetUnitBankerWin - previewBetUnitPlayerLoss == 0) {
      previewBetUnitDifferentialWin = 1;
      previewBetOnDifferentialWin = 'Banker';
    } else {
      if (previewBetUnitBankerWin > previewBetUnitPlayerLoss) {
        previewBetUnitDifferentialWin = previewBetUnitBankerWin - previewBetUnitPlayerLoss;
        previewBetOnDifferentialWin = 'Banker';
      } else {
        previewBetUnitDifferentialWin = previewBetUnitPlayerLoss - previewBetUnitBankerWin;
        previewBetOnDifferentialWin = 'Player';
      }
    }


    if (previewBetUnitBankerLoss - previewBetUnitPlayerWin == 0) {
      previewBetUnitDifferentialLoss = 1;
      previewBetOnDifferentialtLoss = 'Banker';
    } else {
      if (previewBetUnitBankerLoss > previewBetUnitPlayerWin) {
        previewBetUnitDifferentialLoss = previewBetUnitBankerLoss - previewBetUnitPlayerWin;
        previewBetOnDifferentialtLoss = 'Banker';
      } else {
        previewBetUnitDifferentialLoss = previewBetUnitPlayerWin - previewBetUnitBankerLoss;
        previewBetOnDifferentialtLoss = 'Player';
      }
    }


  }

  if (betOnDifferential == 'Player') {

    if (previewBetUnitBankerLoss - previewBetUnitPlayerWin == 0) {
      previewBetUnitDifferentialWin = 1;
      previewBetOnDifferentialWin = 'Banker';
    } else {
      if (previewBetUnitBankerLoss > previewBetUnitPlayerWin) {
        previewBetUnitDifferentialWin = previewBetUnitBankerLoss - previewBetUnitPlayerWin;
        previewBetOnDifferentialWin = 'Banker';
      } else {
        previewBetUnitDifferentialWin = previewBetUnitPlayerWin - previewBetUnitBankerLoss;
        previewBetOnDifferentialWin = 'Player';
      }
    }


    if (previewBetUnitBankerWin - previewBetUnitPlayerLoss == 0) {
      previewBetUnitDifferentialLoss = 1;
      previewBetOnDifferentialtLoss = 'Banker';
    } else {
      if (previewBetUnitBankerWin > previewBetUnitPlayerLoss) {
        previewBetUnitDifferentialLoss = previewBetUnitBankerWin - previewBetUnitPlayerLoss;
        previewBetOnDifferentialtLoss = 'Banker';
      } else {
        previewBetUnitDifferentialLoss = previewBetUnitPlayerLoss - previewBetUnitBankerWin;
        previewBetOnDifferentialtLoss = 'Player';
      }
    }
  }

  if (Borad[Borad.length - 1].differential.BrakeCount + 1 >= brakeNo && brakeNo != 0) {
    previewBetUnitDifferentialLoss = 0;
    previewBetOnDifferentialtLoss = 'Banker';
  }

  if (gameMode == 'Differential') {
    preview.innerHTML = 'Win(W) : ' + previewBetOnDifferentialWin + ' $' + previewBetUnitDifferentialWin * PerUnit + '<br> Loss(L) : ' + previewBetOnDifferentialtLoss + ' $' + previewBetUnitDifferentialLoss * PerUnit;
  }

}

/* 
*
8 :- MVD Management
*
*/

function NextBetCalculation4MVD() {

  /** Checking Bet On */

  if (Borad[Borad.length - 1].actualWinner == 'Tie') {
    betOnMVD = Borad[Borad.length - 1].MVD.betOn;
  } else {

    // Cal for history 
    historyChecking4MVD();

  }

  /** */

  // Bet Unit cal
  if (startGameMVD == 1) {

    // - progress
    if (isPositiveProgression == 0) {
      if (Borad[Borad.length - 1].MVD.win == 1 || Borad[Borad.length - 1].MVD.win == 2 || Borad[Borad.length - 1].MVD.startGameMVD == 0) {

        AmountSelectionIndexMVD = 0;
        betUnitMVD = parseInt(amountSelection[AmountSelectionIndexMVD]);

        if (Borad[Borad.length - 1].MVD.BrakeModeOnInPlay == 1) {
          AmountSelectionIndexMVD = Borad[Borad.length - 1].MVD.AmountSelectionIndex + 1;
          if (amountSelection.length == Borad[Borad.length - 1].MVD.AmountSelectionIndex + 1) {
            AmountSelectionIndexMVD = 0;
          }
          betUnitMVD = parseInt(amountSelection[AmountSelectionIndexMVD]);
          BrakeModeOnInPlayMVD = 0;
        }

      } else if (Borad[Borad.length - 1].MVD.win == 3) {
        betUnitMVD = parseInt(Borad[Borad.length - 1].MVD.betUnit);
      } else {

        if (Borad[Borad.length - 1].MVD.AmountSelectionIndex + 1 < amountSelection.length) {
          AmountSelectionIndexMVD = Borad[Borad.length - 1].MVD.AmountSelectionIndex + 1;
          betUnitMVD = parseInt(amountSelection[AmountSelectionIndexMVD]);
        } else {
          AmountSelectionIndexMVD = 0;
          betUnitMVD = parseInt(amountSelection[AmountSelectionIndexMVD]);
        }

        if (Borad[Borad.length - 1].MVD.BrakeCount >= brakeNo && brakeNo != 0) {
          betUnitMVD = 0;
          AmountSelectionIndexMVD = Borad[Borad.length - 1].MVD.AmountSelectionIndex;
          BrakeModeOnInPlayMVD = 1;
        }


      }

    } else {
      if (Borad[Borad.length - 1].MVD.win == 1 || Borad[Borad.length - 1].MVD.win == 2 || Borad[Borad.length - 1].MVD.startGameMVD == 0) {

        if (Borad[Borad.length - 1].MVD.AmountSelectionIndex + 1 < amountSelection.length) {
          AmountSelectionIndexMVD = Borad[Borad.length - 1].MVD.AmountSelectionIndex + 1;
          betUnitMVD = parseInt(amountSelection[AmountSelectionIndexMVD]);
        } else {
          AmountSelectionIndexMVD = 0;
          betUnitMVD = parseInt(amountSelection[AmountSelectionIndexMVD]);
        }

        // nothing neccary ...
        if (Borad[Borad.length - 1].MVD.startGameMVD == 0) {
          AmountSelectionIndexMVD = 0;
          betUnitMVD = parseInt(amountSelection[AmountSelectionIndexMVD]);
        }

        if (Borad[Borad.length - 1].MVD.BrakeModeOnInPlay == 1) {
          AmountSelectionIndexMVD = Borad[Borad.length - 1].MVD.AmountSelectionIndex + 1;
          if (amountSelection.length == Borad[Borad.length - 1].MVD.AmountSelectionIndex + 1) {
            AmountSelectionIndexMVD = 0;
          }
          betUnitMVD = parseInt(amountSelection[AmountSelectionIndexMVD]);
          BrakeModeOnInPlayMVD = 0;
        }

      } else if (Borad[Borad.length - 1].MVD.win == 3) {
        betUnitMVD = parseInt(Borad[Borad.length - 1].MVD.betUnit);
      } else {

        AmountSelectionIndexMVD = 0;
        betUnitMVD = parseInt(amountSelection[AmountSelectionIndexMVD]);

        if (Borad[Borad.length - 1].MVD.BrakeCount >= brakeNo && brakeNo != 0) {
          betUnitMVD = 0;
          AmountSelectionIndexMVD = Borad[Borad.length - 1].MVD.AmountSelectionIndex;
          BrakeModeOnInPlayMVD = 1;
        }


      }

    }

    totalBetAmtMVD = PerUnit * betUnitMVD;

    /* Tie Amt Calculation  */
    if (tieMode == 1 && betUnitMVD > Borad[Borad.length - 1].MVD.betUnit) {
      tieAmtMVD = Math.floor(PerUnit * betUnitMVD / 8);
      tieUnitMVD = Math.floor(tieAmtMVD / PerUnit);
      BetOnTieMVD = 1;
      totalBetAmtMVD += tieAmtMVD;
    }
  }
  //  else {
  //   betUnitMVD = '--';
  // }

  // Cal To Multi mode
  if (startGameMVD == 1 && selectedGameModeInMultipleMode['MVD'] == 1) {
    if (betOnMVD == 'Player') {
      multipleBetUnitOnPlayer += betUnitMVD;
      multipleBetOnPlayer = 1;
    } else {
      multipleBetUnitOnBanker += betUnitMVD;
      multipleBetOnBanker = 1;
    }
    if (BetOnTieMVD == 1) {
      multipleBetOnTie = 1;
      multipleBetUnitOnTie += tieUnitMVD;
      multipleBetAmountOnTie += tieAmtMVD;
    }
  }

  if (startGameMVD == 0 && gameMode == "MVD") {
    bet.innerHTML = '<div><span> -- </span><span> : $ -- </span></div>';
  } else if (gameMode == 'MVD') {
    bet.innerHTML = `<div> ${betOnMVD}<span> : $ -- </span></div>`;
    if (betOnMVD == 'Player') bet.innerHTML = '<div><span class="boradTableinPlayer">' + betOnMVD + '</span><span> : $' + betUnitMVD * PerUnit + ' </span></div>';
    if (betOnMVD == 'Banker') bet.innerHTML = '<div><span class="boradTableinBanker">' + betOnMVD + '</span><span> : $' + betUnitMVD * PerUnit + ' </span></div>';

    if (BetOnTieMVD != 0) bet.innerHTML += '<div><span class="boradTableinTie"> Tie Amount </span><span> : $' + tieAmtMVD + '</span></div>';
    bet.innerHTML += '<div><span>Total Amount : $' + totalBetAmtMVD + '</span></div>';

  }

  if (startGameMVD == 1 && totalBetAmtMVD > Borad[Borad.length - 1].MVD.MaxBet) {
    maxBetMVD = totalBetAmtMVD;
  }


}

function historyChecking4MVD() {

  typePatten = Borad[Borad.length - 1].actualWinner;

  // Find Patten length 
  lengthOfFindPatten = 1;
  let i = Borad.length, j = 1;

  while (i != j) {

    if (i - 1 != 0 && (typePatten == Borad[i - j - 1].actualWinner || Borad[i - j - 1].actualWinner == 'Tie')) {
      if (Borad[i - j - 1].actualWinner != 'Tie') lengthOfFindPatten++;
      j++;
    } else {
      break;
    }

  }

  lengthOfPatten = lengthOfFindPatten;

  // if (Borad.length >= 7) {
  //   console.log(typePatten);
  //   console.log(lengthOfPatten);
  // }

  betOnMVD = "";
  let findMatchSuccessfully = 0;

  // less the starting patten form total length
  i = Borad.length - lengthOfPatten;
  //console.log(i);

  // for staring sequence 4 contious B & P 
  if (i == 0) {
    if (lengthOfPatten == 4) {
      startGameMVD = 1;
      betOnMVD = typePatten;
    } else if (lengthOfFindPatten > 4) {
      betOnMVD = typePatten;
    }
  }

  while (i) {

    if (Borad[i - 1].actualWinner == typePatten || Borad[i - 1].actualWinner == 'Tie') {

      let tempToSaveStartingOfLength = i;
      // Counting For length
      let countSameResult = 0, k = 0;

      while (i - k - 1 != -1) {
        // for (let k = 0; k < lengthOfPatten; k++) {

        // if (i - k - 1 == -1) break;

        if (Borad[i - k - 1].actualWinner == typePatten || Borad[i - k - 1].actualWinner == 'Tie') {


          if (Borad[i - k - 1].actualWinner != 'Tie') countSameResult++;
          // else 

          if (countSameResult == lengthOfPatten) {

            startGameMVD = 1;

            if (Borad[tempToSaveStartingOfLength].actualWinner != 'Tie') betOnMVD = Borad[tempToSaveStartingOfLength].actualWinner;
            else {
              while (tempToSaveStartingOfLength <= Borad.length - lengthOfPatten) {

                if (Borad[tempToSaveStartingOfLength].actualWinner != 'Tie') {
                  betOnMVD = Borad[tempToSaveStartingOfLength].actualWinner;
                  break;
                }

                tempToSaveStartingOfLength++;
              }
            }

            // if (i - k - 2 != -1 && Borad[i - k - 2].actualWinner == typePatten) betOnMVD = typePatten;


            if (i - k - 2 != -1) {
              if (Borad[i - k - 2].actualWinner != 'Tie') {
                if (Borad[i - k - 2].actualWinner == typePatten) {
                  betOnMVD = typePatten;
                }
              } else {
                let tempToCalAboveTieWinner = i - k - 2;
                while (tempToCalAboveTieWinner != -1) {
                  if (Borad[tempToCalAboveTieWinner].actualWinner != 'Tie') {
                    if (Borad[tempToCalAboveTieWinner].actualWinner == typePatten) {
                      betOnMVD = typePatten;
                    }

                    break;
                  }
                  tempToCalAboveTieWinner--;
                }
              }
            }
            // if (Borad.length >= 7) console.log("find");
            findMatchSuccessfully = 1;
            // To rset the checking last condition
            setBanker1stTime = 0;
            // If match got then brake the For loop
            break;
          }

          k++;

          //continue ;
        } else {
          k = i;
          break;
        }

      }

    }

    // If match got then brake the while loop 
    if (findMatchSuccessfully == 1) break;

    i--;

    // If Borad length if completing
    if (i == 0) {

      if (startGameMVD == 1) {
        if (Borad[Borad.length - 1].MVD.setBanker1stTime == 0) {
          betOnMVD = 'Banker';
          setBanker1stTime = 1;
        }
        else {
          betOnMVD = Borad[Borad.length - 1].actualWinner;
        }
      }

      // if (Borad.length >= 7) console.log("not find");
    }

  }

}


/* Perview Next to Next Bet Calculation For MVD */
function NextToNextBetCalculation4MVD() {

  if (startGameMVD == 0 && gameMode == 'MVD') {
    preview.innerHTML = 'Win(W) : -- $ -- <br>  Loss(L) : -- $ -- ';
    return;
  }

  // Cal Preview Bet On 
  previewBetOnMVDWin = "-#";
  previewBetOnMVDLoss = "-#"

  let tempToSaveOriginBetOn = betOnMVD;
  let tempToSaveOriginSetBanker1stTime = setBanker1stTime;

  if (betOnMVD == 'Player') calculation4PerviewBetOnMVD('Banker');
  else calculation4PerviewBetOnMVD('Player');
  previewBetOnMVDLoss = betOnMVD;

  setBanker1stTime = tempToSaveOriginSetBanker1stTime;
  betOnMVD = tempToSaveOriginBetOn;
  calculation4PerviewBetOnMVD(betOnMVD);
  previewBetOnMVDWin = betOnMVD;

  setBanker1stTime = tempToSaveOriginSetBanker1stTime;
  betOnMVD = tempToSaveOriginBetOn;

  // Cal Preview Bet unit
  // - progress
  if (isPositiveProgression == 0) {
    previewBetUnitMVDWin = parseInt(amountSelection[0]);

    if (BrakeModeOnInPlayMVD == 1) {
      var tempAmountSelectionIndexMVD = Borad[Borad.length - 1].MVD.AmountSelectionIndex + 1;
      if (amountSelection.length == Borad[Borad.length - 1].MVD.AmountSelectionIndex + 1) {
        tempAmountSelectionIndexMVD = 0;
      }
      previewBetUnitMVDWin = parseInt(amountSelection[tempAmountSelectionIndexMVD]);
    }

    if (AmountSelectionIndexMVD + 1 < amountSelection.length) {
      previewBetUnitMVDLoss = parseInt(amountSelection[AmountSelectionIndexMVD + 1]);
    } else {
      previewBetUnitMVDLoss = parseInt(amountSelection[0]);
    }

    if (Borad[Borad.length - 1].MVD.BrakeCount + 1 >= brakeNo && brakeNo != 0) {
      previewBetUnitMVDLoss = 0;

    }
  } else {
    previewBetUnitMVDLoss = parseInt(amountSelection[0]);

    if (BrakeModeOnInPlayMVD == 1) {
      var tempAmountSelectionIndexMVD = Borad[Borad.length - 1].MVD.AmountSelectionIndex + 1;
      if (amountSelection.length == Borad[Borad.length - 1].MVD.AmountSelectionIndex + 1) {
        tempAmountSelectionIndexMVD = 0;
      }
      previewBetUnitMVDLoss = parseInt(amountSelection[tempAmountSelectionIndexMVD]);
    }

    if (AmountSelectionIndexMVD + 1 < amountSelection.length) {
      previewBetUnitMVDWin = parseInt(amountSelection[AmountSelectionIndexMVD + 1]);
    } else {
      previewBetUnitMVDWin = parseInt(amountSelection[0]);
    }

    if (Borad[Borad.length - 1].MVD.BrakeCount + 1 >= brakeNo && brakeNo != 0) {
      previewBetUnitMVDWin = 0;

    }
  }


  if (selectedGameModeInMultipleMode['MVD'] == 1) {
    if (previewBetOnMVDWin == 'Banker') {
      previewBetUnitBankerWinINMM += previewBetUnitMVDWin;
      previewBetUnitBankerLossINMM += previewBetUnitMVDLoss;
      previewBetOnBankerWin = 1;
      previewBetOnBankerLoss = 1;
    } else {
      previewBetUnitPlayerWinINMM += previewBetUnitMVDWin;
      previewBetUnitPlayerLossINMM += previewBetUnitMVDLoss;
      previewBetOnPlayerWin = 1;
      previewBetOnPlayerLoss = 1;
    }
  }

  if (gameMode == 'MVD') {
    preview.innerHTML = 'Win(W) : ' + previewBetOnMVDWin + ' $' + previewBetUnitMVDWin * PerUnit + '<br>Loss(L) : ' + previewBetOnMVDLoss + ' $' + previewBetUnitMVDLoss * PerUnit;
  }

}

function calculation4PerviewBetOnMVD(tempToSaveBetOn) {

  let tempToAddObjInBorad = {
    actualWinner: tempToSaveBetOn,
    MVD: {
      betOn: betOnMVD,
      setBanker1stTime: setBanker1stTime
    }
  }

  Borad.push(tempToAddObjInBorad);

  historyChecking4MVD();
  // setTimeout(() => console.log("Waiting For Above Function To Complete those excution"), 9000);

  Borad.pop();

}

