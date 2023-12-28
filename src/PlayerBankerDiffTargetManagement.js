/* 
*
1 :- Player Management
*
*/

/* Next Bet Calculation For Player */
function NextBetCalculation4Player() {

  if (Borad.length == 0) {
    betUnitP = 1;
    return;
  }

  if (Borad[Borad.length - 1].playerGame.win == 1 || Borad[Borad.length - 1].playerGame.win == 2) {

    betUnitP = 0;

    if (Borad[Borad.length - 1].playerGame.SetBet == 0) {
      betUnitP = (noOfPlayer + 1 + TotalTieWinP) - (Borad[Borad.length - 1].playerGame.netProfit);
    }

  } else if (Borad[Borad.length - 1].playerGame.win == 3) {
    betUnitP = Borad[Borad.length - 1].playerGame.betUnit;
  } else {
    betUnitP = 1;

    if (singlePlayer <= singlePNo && singlePlayer != 0) {
      betUnitP = 0;
      setBet0 = 1;
    }

    /* 2 nd Play */
    if (Play2Mode == 1 && Borad.length >= 2 && Borad[Borad.length - 1].playerGame.betUnit >= 1 && Borad[Borad.length - 2].playerGame.win == 1 && Borad[Borad.length - 1].playerGame.win == 0) {
      betUnitP = (noOfPlayer + 1 + TotalTieWinP) - (Borad[Borad.length - 1].playerGame.netProfit);
    }

    /* 3 rd Play */
    if (Play3Mode == 1 && Borad.length >= 3 && Borad[Borad.length - 1].playerGame.betUnit >= 1 && Borad[Borad.length - 3].playerGame.win == 1 && Borad[Borad.length - 2].playerGame.win == 0 && Borad[Borad.length - 1].playerGame.win == 0) {
      betUnitP = (noOfPlayer + 1 + TotalTieWinP) - (Borad[Borad.length - 1].playerGame.netProfit);
    }

    /* 4th Play */
    if (Play4Mode == 1 && Borad.length >= 4 && Borad[Borad.length - 1].playerGame.betUnit >= 1 && Borad[Borad.length - 4].playerGame.win == 1 &&
      Borad[Borad.length - 3].playerGame.win == 0 && Borad[Borad.length - 2].playerGame.win == 0 && Borad[Borad.length - 1].playerGame.win == 0) {
      betUnitP = (noOfPlayer + 1 + TotalTieWinP) - (Borad[Borad.length - 1].playerGame.netProfit);
    }

    /* 5th Play */
    if (Play5Mode == 1 && Borad.length >= 5 && Borad[Borad.length - 1].playerGame.betUnit >= 1 && Borad[Borad.length - 5].playerGame.win == 1 &&
      Borad[Borad.length - 4].playerGame.win == 0 && Borad[Borad.length - 3].playerGame.win == 0 && Borad[Borad.length - 2].playerGame.win == 0 && Borad[Borad.length - 1].playerGame.win == 0) {
      betUnitP = (noOfPlayer + 1 + TotalTieWinP) - (Borad[Borad.length - 1].playerGame.netProfit);
    }

    if (Borad[Borad.length - 1].playerGame.BrakeCount >= brakeValue && brakeValue != 0) {
      betUnitP = 0;
    }


  }

  totalBetAmtP = PerUnit * betUnitP;

  /* Tie Amt Calculation  */
  if (tieMode == 1 && betUnitP > Borad[Borad.length - 1].playerGame.betUnit) {
    tieAmtP = Math.floor(PerUnit * betUnitP / 8);
    tieUnitP = Math.floor(tieAmtP / PerUnit);
    BetOnTieP = 1;
    totalBetAmtP += tieAmtP;
  }

  if (selectedGameModeInMultipleMode['Player'] == 1) {
    multipleBetUnitOnPlayer += betUnitP;
    multipleBetOnPlayer = 1;
    if (BetOnTieP == 1) {
      multipleBetOnTie = 1;
      multipleBetUnitOnTie += tieUnitP;
      multipleBetAmountOnTie += tieAmtP;
    }
  }

  if (selectedText == 'Player') {
    bet.innerHTML = '<div><span class="boradTableinPlayer"> Player </span><span> : $' + betUnitP * PerUnit + '</span></div>';
    if (BetOnTieP != 0) bet.innerHTML += '<div><span class="boradTableinTie"> Tie Amount </span><span> : $' + tieAmtP + '</span></div>';
    bet.innerHTML += '<div><span>Total Amount : $' + totalBetAmtP + '</span></div>';
  }

  if (totalBetAmtP > Borad[Borad.length - 1].playerGame.MaxBet) {
    maxBetP = totalBetAmtP;
  }


}

/* Perview Next to Next Bet Calculation For Player */
function NextToNextBetCalculation4Player() {

  var lastset0P = setBet0;
  totalBetUnitP += betUnitP;

  hand++;
  whereSingleP.push(hand);
  if (whereSingleP[whereSingleP.length - 1] != whereSingleP[whereSingleP.length - 2] + 1) {
    singlePNo++;
  }

  if (whereSingleP[whereSingleP.length - 1] == whereSingleP[whereSingleP.length - 2] + 1) {
    singlePNo = 0;
    setBet0 = 0;
  }

  previewBetUnitPlayerWin = (noOfPlayer + 2 + TotalTieWinP) - (Borad[Borad.length - 1].playerGame.netProfit + betUnitP);
  if (setBet0 == 1) {
    previewBetUnitPlayerWin = 0;
  }

  whereSingleP.pop();
  hand--;
  singlePNo = Borad[Borad.length - 1].playerGame.SingleWin;
  setBet0 = lastset0P;

  previewBetUnitPlayerLoss = 1;
  if (singlePlayer <= singlePNo && singlePlayer != 0) {
    previewBetUnitPlayerLoss = 0;
  }
  if (Play2Mode == 1 && Borad.length >= 1 && betUnitP >= 1 && Borad[Borad.length - 1].playerGame.win == 1) {
    previewBetUnitPlayerLoss = (noOfPlayer + 1 + TotalTieWinP) - (Borad[Borad.length - 1].playerGame.netProfit - betUnitP);
  }

  if (Play3Mode == 1 && Borad.length >= 2 && betUnitP >= 1 && Borad[Borad.length - 2].playerGame.win == 1 && Borad[Borad.length - 1].playerGame.win == 0) {
    previewBetUnitPlayerLoss = (noOfPlayer + 1 + TotalTieWinP) - (Borad[Borad.length - 1].playerGame.netProfit - betUnitP);
  }

  if (Play4Mode == 1 && Borad.length >= 3 && betUnitP >= 1 && Borad[Borad.length - 3].playerGame.win == 1
    && Borad[Borad.length - 2].playerGame.win == 0 && Borad[Borad.length - 1].playerGame.win == 0) {
    previewBetUnitPlayerLoss = (noOfPlayer + 1 + TotalTieWinP) - (Borad[Borad.length - 1].playerGame.netProfit - betUnitP);
  }

  if (Play5Mode == 1 && Borad.length >= 4 && betUnitP >= 1 && Borad[Borad.length - 4].playerGame.win == 1
    && Borad[Borad.length - 3].playerGame.win == 0 && Borad[Borad.length - 2].playerGame.win == 0 && Borad[Borad.length - 1].playerGame.win == 0) {
    previewBetUnitPlayerLoss = (noOfPlayer + 1 + TotalTieWinP) - (Borad[Borad.length - 1].playerGame.netProfit - betUnitP);
  }

  if (Borad[Borad.length - 1].playerGame.BrakeCount + 1 >= brakeValue && brakeValue != 0) {
    previewBetUnitPlayerLoss = 0;
  }

  if (selectedGameModeInMultipleMode['Player'] == 1) {
    previewBetUnitPlayerWinINMM += previewBetUnitPlayerWin;
    previewBetUnitPlayerLossINMM += previewBetUnitPlayerLoss;
    previewBetOnPlayerWin = 1;
    previewBetOnPlayerLoss = 1;
  }

  if (selectedText == 'Player') {
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

  if (Borad.length == 0) {
    betUnitB = 1;
    return;
  }

  if (Borad[Borad.length - 1].BankerGame.win == 1 || Borad[Borad.length - 1].BankerGame.win == 2) {

    betUnitB = 0;
    if (Borad[Borad.length - 1].BankerGame.SetBet == 0) {
      betUnitB = (noOfBanker + 1 + TotalTieWinB) - (Borad[Borad.length - 1].BankerGame.netProfit);
    }

  } else if (Borad[Borad.length - 1].BankerGame.win == 3) {
    betUnitB = Borad[Borad.length - 1].BankerGame.betUnit;
  } else {
    betUnitB = 1;

    if (singleBanker <= singleBNo && singleBanker != 0) {
      betUnitB = 0;
      setBet0B = 1;
    }

    /* 2 nd Play */
    if (Play2Mode == 1 && Borad.length >= 2 && Borad[Borad.length - 1].BankerGame.betUnit >= 1 && Borad[Borad.length - 2].BankerGame.win == 1 && Borad[Borad.length - 1].BankerGame.win == 0) {
      betUnitB = (noOfBanker + 1 + TotalTieWinB) - (Borad[Borad.length - 1].BankerGame.netProfit);
    }

    /* 3 rd Play */
    if (Play3Mode == 1 && Borad.length >= 3 && Borad[Borad.length - 1].BankerGame.betUnit >= 1 && Borad[Borad.length - 3].BankerGame.win == 1 && Borad[Borad.length - 2].BankerGame.win == 0 && Borad[Borad.length - 1].BankerGame.win == 0) {
      betUnitB = (noOfBanker + 1 + TotalTieWinB) - (Borad[Borad.length - 1].BankerGame.netProfit);
    }

    /* 4 th  Play */
    if (Play4Mode == 1 && Borad.length >= 4 && Borad[Borad.length - 1].BankerGame.betUnit >= 1 &&
      Borad[Borad.length - 4].BankerGame.win == 1 && Borad[Borad.length - 3].BankerGame.win == 0 && Borad[Borad.length - 2].BankerGame.win == 0 && Borad[Borad.length - 1].BankerGame.win == 0) {
      betUnitB = (noOfBanker + 1 + TotalTieWinB) - (Borad[Borad.length - 1].BankerGame.netProfit);
    }

    /* 5 th  Play */
    if (Play5Mode == 1 && Borad.length >= 5 && Borad[Borad.length - 1].BankerGame.betUnit >= 1 &&
      Borad[Borad.length - 5].BankerGame.win == 1 && Borad[Borad.length - 4].BankerGame.win == 0 && Borad[Borad.length - 3].BankerGame.win == 0
      && Borad[Borad.length - 2].BankerGame.win == 0 && Borad[Borad.length - 1].BankerGame.win == 0) {
      betUnitB = (noOfBanker + 1 + TotalTieWinB) - (Borad[Borad.length - 1].BankerGame.netProfit);
    }

    if (Borad[Borad.length - 1].BankerGame.BrakeCount >= brakeValue && brakeValue != 0) {
      betUnitB = 0;
    }

  }

  totalBetAmtB = PerUnit * betUnitB;

  /* Tie Amt Calculation */
  if (tieMode == 1 && betUnitB > Borad[Borad.length - 1].BankerGame.betUnit) {
    tieAmtB = Math.floor(PerUnit * betUnitB / 8);
    tieUnitB = Math.floor(tieAmtB / PerUnit);
    BetOnTieB = 1;
    totalBetAmtB += tieAmtB;
  }

  if (selectedGameModeInMultipleMode['Banker'] == 1) {
    multipleBetUnitOnBanker += betUnitB;
    multipleBetOnBanker = 1;
    if (BetOnTieB == 1) {
      multipleBetOnTie = 1;
      multipleBetUnitOnTie += tieUnitB;
      multipleBetAmountOnTie += tieAmtB;
    }
  }

  if (selectedText == 'Banker') {
    bet.innerHTML = '<div><span class="boradTableinBanker"> Banker</span><span> : $' + betUnitB * PerUnit + '</span></div>';
    if (BetOnTieB != 0) bet.innerHTML += '<div><span class="boradTableinTie"> Tie Amount </span><span> : $' + tieAmtB + '</span></div>';
    bet.innerHTML += '<div><span> Total Amount : $' + totalBetAmtB + '</span></div>';
  }

  if (totalBetAmtB > Borad[Borad.length - 1].BankerGame.MaxBet) {
    maxBetB = totalBetAmtB;
  }


  saveBetUnitB = betUnitB;

}

/* Perview Next to Next Bet Calculation For Banker */
function NextToNextBetCalculation4Banker() {

  var lastset0B = setBet0B;

  totalBetUnitB += betUnitB;
  hand++;
  whereSingleB.push(hand);
  if (whereSingleB[whereSingleB.length - 1] != whereSingleB[whereSingleB.length - 2] + 1) {
    singleBNo++;
  }
  if (whereSingleB[whereSingleB.length - 1] == whereSingleB[whereSingleB.length - 2] + 1) {
    singleBNo = 0;
    setBet0B = 0;
  }

  previewBetUnitBankerWin = (noOfBanker + 2 + TotalTieWinB) - (Borad[Borad.length - 1].BankerGame.netProfit + betUnitB);
  if (setBet0B == 1) {
    previewBetUnitBankerWin = 0;
  }
  whereSingleB.pop();
  hand--;
  singleBNo = Borad[Borad.length - 1].BankerGame.SingleWin;
  setBet0B = lastset0B;

  previewBetUnitBankerLoss = 1;
  if (singleBanker <= singleBNo && singleBanker != 0) {
    previewBetUnitBankerLoss = 0;
  }

  if (Play2Mode == 1 && Borad.length >= 1 && betUnitB >= 1 && Borad[Borad.length - 1].BankerGame.win == 1) {
    previewBetUnitBankerLoss = (noOfBanker + 1 + TotalTieWinB) - (Borad[Borad.length - 1].BankerGame.netProfit - betUnitB);
  }

  if (Play3Mode == 1 && Borad.length >= 2 && betUnitB >= 1 && Borad[Borad.length - 2].BankerGame.win == 1 && Borad[Borad.length - 1].BankerGame.win == 0) {
    previewBetUnitBankerLoss = (noOfBanker + 1 + TotalTieWinB) - (Borad[Borad.length - 1].BankerGame.netProfit - betUnitB);
  }

  /* 4 th  Play */
  if (Play4Mode == 1 && Borad.length >= 3 && betUnitB >= 1 && Borad[Borad.length - 3].BankerGame.win == 1 && Borad[Borad.length - 2].BankerGame.win == 0 && Borad[Borad.length - 1].BankerGame.win == 0) {
    previewBetUnitBankerLoss = (noOfBanker + 1 + TotalTieWinB) - (Borad[Borad.length - 1].BankerGame.netProfit - betUnitB);
  }

  /* 5 th  Play */
  if (Play5Mode == 1 && Borad.length >= 4 && betUnitB >= 1 && Borad[Borad.length - 4].BankerGame.win == 1
    && Borad[Borad.length - 3].BankerGame.win == 0 && Borad[Borad.length - 2].BankerGame.win == 0 && Borad[Borad.length - 1].BankerGame.win == 0) {
    previewBetUnitBankerLoss = (noOfBanker + 1 + TotalTieWinB) - (Borad[Borad.length - 1].BankerGame.netProfit - betUnitB);
  }

  if (Borad[Borad.length - 1].BankerGame.BrakeCount + 1 >= brakeValue && brakeValue != 0) {
    previewBetUnitBankerLoss = 0;
  }

  if (selectedGameModeInMultipleMode['Banker'] == 1) {
    previewBetUnitBankerWinINMM += previewBetUnitBankerWin;
    previewBetUnitBankerLossINMM += previewBetUnitBankerLoss;
    previewBetOnBankerWin = 1;
    previewBetOnBankerLoss = 1;
  }

  if (selectedText == 'Banker') {
    preview.innerHTML = 'Win(W) : Banker  $' + previewBetUnitBankerWin * PerUnit + '<br> Loss(L) : Banker  $' + previewBetUnitBankerLoss * PerUnit;
  }


}





/* 
*
3 :- Differential Management
*
*/

/* Next Bet Calculation For Differential */
function NextBetCalculation4Differential() {

  if (Borad.length == 0) {
    betUnitD = 1;
    betonDiff = 'Banker';
    return;
  }

  if (betUnitB - betUnitP == 0) {
    betUnitD = 1;
    betonDiff = 'Banker';

  } else {
    if (betUnitB > betUnitP) {
      betUnitD = betUnitB - betUnitP;
      betonDiff = 'Banker';
    } else {
      betUnitD = betUnitP - betUnitB;
      betonDiff = 'Player';
    }
  }

  if (Borad[Borad.length - 1].differential.BrakeCount >= brakeValue && brakeValue != 0) {
    betUnitD = 0;
    betonDiff = 'Banker';
  }

  totalBetUnitD += betUnitD;
  totalBetAmtD = betUnitD * PerUnit;
  /* Tie Amt Calculation  */
  if (tieMode == 1 && betUnitD > Borad[Borad.length - 1].differential.betUnit) {
    tieAmtD = Math.floor(PerUnit * betUnitD / 8);
    tieUnitD = Math.floor(tieAmtD / PerUnit);
    BetOnTieD = 1;
    totalBetAmtD += tieAmtD;
  }

  if (selectedGameModeInMultipleMode['Differential'] == 1) {
    if (betonDiff == 'Player') {
      multipleBetUnitOnPlayer += betUnitD;
      multipleBetOnPlayer = 1;
    } else if (betonDiff == 'Banker') {
      multipleBetUnitOnBanker += betUnitD;
      multipleBetOnBanker = 1;
    }
    if (BetOnTieD == 1) {
      multipleBetOnTie = 1;
      multipleBetUnitOnTie += tieUnitD;
      multipleBetAmountOnTie += tieAmtD;
    }
  }

  if (selectedText == 'Differential') {
    if (betonDiff == 'Player') {
      bet.innerHTML = '<div><span class="boradTableinPlayer"> Player </span><span>: $' + betUnitD * PerUnit + '</span></div>';
    } else {
      bet.innerHTML = '<div><span class="boradTableinBanker"> Banker</span><span> : $' + betUnitD * PerUnit + '</span></div>';
    }
    if (BetOnTieD != 0) bet.innerHTML += '<div><span class="boradTableinTie"> Tie Amount </span><span> : $' + tieAmtD + '</span></div>';
    bet.innerHTML += '<div><span> Total Amount : $' + totalBetAmtD + '</span></div>';
  }


  if (totalBetAmtD > Borad[Borad.length - 1].differential.MaxBet) {
    maxBetD = totalBetAmtD;
  }

}

/* Perview Next to Next Bet Calculation For Differential */
function NextToNextBetCalculation4Differential() {

  var previewBetUnitDifferentialWin = 0, previewBetOnDifferentialWin = null;
  var previewBetUnitDifferentialLoss = 0, previewBetOnDifferentialtLoss = null;
  if (betonDiff == 'Banker') {
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

  if (betonDiff == 'Player') {

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

  if (Borad[Borad.length - 1].differential.BrakeCount + 1 >= brakeValue && brakeValue != 0) {
    previewBetUnitDifferentialLoss = 0;
    previewBetOnDifferentialtLoss = 'Banker';
  }

  if (selectedGameModeInMultipleMode['Differential'] == 1) {
    if (previewBetOnDifferentialtLoss == "Banker") {
      previewBetUnitBankerLossINMM += previewBetUnitBankerLoss;
      previewBetOnBankerLoss = 1;
    } else {
      previewBetUnitPlayerLossINMM += previewBetUnitPlayerLoss;
      previewBetOnPlayerLoss = 1;
    }

    if (previewBetOnDifferentialWin == 'Banker') {
      previewBetUnitBankerWinINMM += previewBetUnitBankerWin;
      previewBetOnBankerWin = 1;
    } else {
      previewBetUnitPlayerWinINMM += previewBetUnitPlayerWin;
      previewBetOnPlayerWin = 1;
    }

  }

  if (selectedText == 'Differential') {
    preview.innerHTML = 'Win(W) : ' + previewBetOnDifferentialWin + ' $' + previewBetUnitDifferentialWin * PerUnit + '<br> Loss(L) : ' + previewBetOnDifferentialtLoss + ' $' + previewBetUnitDifferentialLoss * PerUnit;
  }

}




/* 
*
4 :- Target Management
*
*/

/* Next Bet Calculation For Target */
function NextBetCalculation4Target() {

  if (((Borad[Borad.length - 1].Target.winTargetB == 1 || Borad[Borad.length - 1].Target.winTargetB == 2) && Borad[Borad.length - 1].Target.winTargetP == -1) ||
    (Borad[Borad.length - 1].Target.winTargetB == -1 && Borad[Borad.length - 1].Target.winTargetP == 0)) {

    betUnitTargetB = (noOfBanker + 1 + TotalTieWinTargetB) - (Borad[Borad.length - 1].Target.netProfitTargetB);
    betUnitTargetP = 0;
    betonTarget = 'Banker';


  } else if ((Borad[Borad.length - 1].Target.winTargetB == 0 && Borad[Borad.length - 1].Target.winTargetP == -1) ||
    (Borad[Borad.length - 1].Target.winTargetB == -1 && (Borad[Borad.length - 1].Target.winTargetP == 1 || Borad[Borad.length - 1].Target.winTargetP == 2))) {

    betUnitTargetP = (noOfPlayer + 1 + TotalTieWinTargetP) - (Borad[Borad.length - 1].Target.netProfitTargetP);
    betUnitTargetB = 0;
    betonTarget = 'Player';


  } else if (Borad[Borad.length - 1].Target.winTargetP == 3 && Borad[Borad.length - 1].Target.winTargetB == 3) {
    betUnitTargetP = Borad[Borad.length - 1].Target.betUnitTargetP;
    betUnitTargetB = Borad[Borad.length - 1].Target.betUnitTargetB;
    betonTarget = Borad[Borad.length - 1].Target.betOn;
  }

  if (Borad.length >= 2 && Borad[Borad.length - 1].Target.betOn == 'Banker') {
    /* 2 nd Play */
    if (Play2Mode == 1 && Borad[Borad.length - 1].Target.betUnitTargetB >= 1 && (Borad[Borad.length - 2].Target.winTargetB == 1 || Borad[Borad.length - 2].Target.winTargetB == -1)
      && (Borad[Borad.length - 1].Target.winTargetB == 0 || Borad[Borad.length - 1].Target.winTargetB == -1)) {
      betUnitTargetB = (noOfBanker + 1 + TotalTieWinTargetB) - (Borad[Borad.length - 1].Target.netProfitTargetB);
      betUnitTargetP = 0;
      betonTarget = 'Banker';
    }

    /* 3 rd Play */
    if (Play3Mode == 1 && Borad.length >= 3 && Borad[Borad.length - 1].Target.betUnitTargetB >= 1 && (Borad[Borad.length - 3].Target.winTargetB == 1 || Borad[Borad.length - 3].Target.winTargetB == -1) &&
      (Borad[Borad.length - 2].Target.winTargetB == 0 || Borad[Borad.length - 2].Target.winTargetB == -1) && (Borad[Borad.length - 1].Target.winTargetB == 0 || Borad[Borad.length - 1].Target.winTargetB == -1)) {
      betUnitTargetB = (noOfBanker + 1 + TotalTieWinTargetB) - (Borad[Borad.length - 1].Target.netProfitTargetB);
      betUnitTargetP = 0;
      betonTarget = 'Banker';
    }

    /* 4 th Play */
    if (Play4Mode == 1 && Borad.length >= 4 && Borad[Borad.length - 1].Target.betUnitTargetB >= 1 && (Borad[Borad.length - 4].Target.winTargetB == 1 || Borad[Borad.length - 4].Target.winTargetB == -1) &&
      (Borad[Borad.length - 3].Target.winTargetB == 0 || Borad[Borad.length - 3].Target.winTargetB == -1) &&
      (Borad[Borad.length - 2].Target.winTargetB == 0 || Borad[Borad.length - 2].Target.winTargetB == -1) && (Borad[Borad.length - 1].Target.winTargetB == 0 || Borad[Borad.length - 1].Target.winTargetB == -1)) {
      betUnitTargetB = (noOfBanker + 1 + TotalTieWinTargetB) - (Borad[Borad.length - 1].Target.netProfitTargetB);
      betUnitTargetP = 0;
      betonTarget = 'Banker';
    }

    /* 5 th Play */
    if (Play5Mode == 1 && Borad.length >= 5 && Borad[Borad.length - 1].Target.betUnitTargetB >= 1 && (Borad[Borad.length - 5].Target.winTargetB == 1 || Borad[Borad.length - 5].Target.winTargetB == -1) &&
      (Borad[Borad.length - 4].Target.winTargetB == 0 || Borad[Borad.length - 4].Target.winTargetB == -1) && (Borad[Borad.length - 3].Target.winTargetB == 0 || Borad[Borad.length - 3].Target.winTargetB == -1) &&
      (Borad[Borad.length - 2].Target.winTargetB == 0 || Borad[Borad.length - 2].Target.winTargetB == -1) && (Borad[Borad.length - 1].Target.winTargetB == 0 || Borad[Borad.length - 1].Target.winTargetB == -1)) {
      betUnitTargetB = (noOfBanker + 1 + TotalTieWinTargetB) - (Borad[Borad.length - 1].Target.netProfitTargetB);
      betUnitTargetP = 0;
      betonTarget = 'Banker';

    }
  }

  if (Borad.length >= 2 && Borad[Borad.length - 1].Target.betOn == 'Player') {
    /* 2 nd Play */
    if (Play2Mode == 1 && Borad[Borad.length - 1].Target.betUnitTargetP >= 1 && (Borad[Borad.length - 2].Target.winTargetP == 1 || Borad[Borad.length - 2].Target.winTargetP == -1)
      && (Borad[Borad.length - 1].Target.winTargetP == 0 || Borad[Borad.length - 1].Target.winTargetP == -1)) {
      betUnitTargetP = (noOfPlayer + 1 + TotalTieWinTargetP) - (Borad[Borad.length - 1].Target.netProfitTargetP);
      betUnitTargetB = 0;
      betonTarget = 'Player';
    }

    /* 3 rd Play */
    if (Play3Mode == 1 && Borad.length >= 3 && Borad[Borad.length - 1].Target.betUnitTargetP >= 1 && (Borad[Borad.length - 3].Target.winTargetP == 1 || Borad[Borad.length - 3].Target.winTargetP == -1) &&
      (Borad[Borad.length - 2].Target.winTargetP == 0 || Borad[Borad.length - 2].Target.winTargetP == -1) && (Borad[Borad.length - 1].Target.winTargetP == 0 || Borad[Borad.length - 1].Target.winTargetP == -1)) {
      betUnitTargetP = (noOfPlayer + 1 + TotalTieWinTargetP) - (Borad[Borad.length - 1].Target.netProfitTargetP);
      betUnitTargetB = 0;
      betonTarget = 'Player';
    }

    /* 4 th Play */
    if (Play4Mode == 1 && Borad.length >= 4 && Borad[Borad.length - 1].Target.betUnitTargetP >= 1 && (Borad[Borad.length - 4].Target.winTargetP == 1 || Borad[Borad.length - 4].Target.winTargetP == -1) &&
      (Borad[Borad.length - 3].Target.winTargetP == 0 || Borad[Borad.length - 3].Target.winTargetP == -1) &&
      (Borad[Borad.length - 2].Target.winTargetP == 0 || Borad[Borad.length - 2].Target.winTargetP == -1) && (Borad[Borad.length - 1].Target.winTargetP == 0 || Borad[Borad.length - 1].Target.winTargetP == -1)) {
      betUnitTargetP = (noOfPlayer + 1 + TotalTieWinTargetP) - (Borad[Borad.length - 1].Target.netProfitTargetP);
      betUnitTargetB = 0;
      betonTarget = 'Player';
    }

    /* 5 th Play */
    if (Play5Mode == 1 && Borad.length >= 5 && Borad[Borad.length - 1].Target.betUnitTargetP >= 1 && (Borad[Borad.length - 5].Target.winTargetP == 1 || Borad[Borad.length - 5].Target.winTargetP == -1) &&
      (Borad[Borad.length - 4].Target.winTargetP == 0 || Borad[Borad.length - 4].Target.winTargetP == -1) && (Borad[Borad.length - 3].Target.winTargetP == 0 || Borad[Borad.length - 3].Target.winTargetP == -1) &&
      (Borad[Borad.length - 2].Target.winTargetP == 0 || Borad[Borad.length - 2].Target.winTargetP == -1) && (Borad[Borad.length - 1].Target.winTargetP == 0 || Borad[Borad.length - 1].Target.winTargetP == -1)) {
      betUnitTargetP = (noOfPlayer + 1 + TotalTieWinTargetP) - (Borad[Borad.length - 1].Target.netProfitTargetP);
      betUnitTargetB = 0;
      betonTarget = 'Player';
    }

  }

  if (Borad[Borad.length - 1].Target.BrakeCount >= brakeValue && brakeValue != 0) {
    betUnitTargetB = 0;
    betonTarget = 'Banker';
    balanceTargetP = 0;
  }

  if (betonTarget == 'Player') {
    totalBetAmtTarget = betUnitTargetP * PerUnit;
  } else if (betonTarget == 'Banker') {
    totalBetAmtTarget = betUnitTargetB * PerUnit;
  }

  /* Tie Amt Calculation */
  if (tieMode == 1 && ((Borad[Borad.length - 1].Target.betUnitTargetB != 0 && totalBetAmtTarget / PerUnit > Borad[Borad.length - 1].Target.betUnitTargetB) ||
    (Borad[Borad.length - 1].Target.betUnitTargetP != 0 && totalBetAmtTarget / PerUnit > Borad[Borad.length - 1].Target.betUnitTargetP))) {
    tieAmtTarget = Math.floor(totalBetAmtTarget / 8);
    tieUnitTarget = Math.floor(tieAmtTarget / PerUnit);
    BetOnTieTarget = 1;
    totalBetAmtTarget += tieAmtTarget;
  }

  if (selectedGameModeInMultipleMode['Target'] == 1) {

    if (betonTarget == 'Player') {
      multipleBetUnitOnPlayer += betUnitTargetP;
      multipleBetOnPlayer = 1;
    } else if (betonTarget == 'Banker') {
      multipleBetUnitOnBanker += betUnitTargetB;
      multipleBetOnBanker = 1;
    }
    if (BetOnTieTarget == 1) {
      multipleBetOnTie = 1;
      multipleBetUnitOnTie += tieUnitTarget;
      multipleBetAmountOnTie += tieAmtTarget;
    }
  }

  if (selectedText == 'Target') {
    if (betonTarget == 'Player') {
      bet.innerHTML = '<div><span class="boradTableinPlayer"> Player </span><span> : $' + betUnitTargetP * PerUnit + '</span></div>';
      WholeBetAmountTarget = betUnitTargetP + tieUnitTarget + parseInt(Borad[Borad.length - 1].Target.WholeBetAmount);
    } else if (betonTarget == 'Banker') {
      bet.innerHTML = '<div><span class="boradTableinBanker"> Banker</span><span> : $' + betUnitTargetB * PerUnit + '</span></div>';
      WholeBetAmountTarget = betUnitTargetB + tieUnitTarget + parseInt(Borad[Borad.length - 1].Target.WholeBetAmount);
    }
    if (BetOnTieTarget != 0) bet.innerHTML += '<div><span class="boradTableinTie"> Tie Amount </span><span>: $' + tieAmtTarget + '</span></div>';
    bet.innerHTML += '<div><span> Total Amount : $' + totalBetAmtTarget + '</span></div>';
  }

  if (totalBetAmtTarget > Borad[Borad.length - 1].Target.MaxBet) {
    maxBetTarget = totalBetAmtTarget;
  }


}

/* Perview Next to Next Bet Calculation For Differential */
function NextToNextBetCalculation4Target() {

  if (betUnitTargetP == 0) {
    previewBetUnitTargetWin = (noOfBanker + 2 + TotalTieWinTargetB) - (Borad[Borad.length - 1].Target.netProfitTargetB + betUnitTargetB);
    previewBetOnTargetWin = 'Banker';
    previewBetUnitTargetLoss = (noOfPlayer + 2 + TotalTieWinTargetP) - (Borad[Borad.length - 1].Target.netProfitTargetP);
    previewBetOnTargetLoss = 'Player';
  } else if (betUnitTargetB == 0) {
    previewBetUnitTargetWin = (noOfPlayer + 2 + TotalTieWinTargetP) - (Borad[Borad.length - 1].Target.netProfitTargetP + betUnitTargetP);
    previewBetOnTargetWin = 'Player';
    previewBetUnitTargetLoss = (noOfBanker + 2 + TotalTieWinTargetB) - (Borad[Borad.length - 1].Target.netProfitTargetB);
    previewBetOnTargetLoss = 'Banker';
  }

  if (betonTarget == 'Banker') {
    if (Play2Mode == 1 && Borad.length >= 1 && betUnitTargetB >= 1 && (Borad[Borad.length - 1].Target.winTargetB == 1 || Borad[Borad.length - 2].Target.winTargetB == -1)) {
      previewBetUnitTargetLoss = (noOfBanker + 1 + TotalTieWinTargetB) - (Borad[Borad.length - 1].Target.netProfitTargetB - betUnitTargetB);
      previewBetOnTargetLoss = 'Banker';
    }

    if (Play3Mode == 1 && Borad.length >= 2 && betUnitTargetB >= 1 && (Borad[Borad.length - 2].Target.winTargetB == 1 || Borad[Borad.length - 2].Target.winTargetB == -1) &&
      (Borad[Borad.length - 1].Target.winTargetB == 0 || Borad[Borad.length - 1].Target.winTargetB == -1)) {
      previewBetUnitTargetLoss = (noOfBanker + 1 + TotalTieWinTargetB) - (Borad[Borad.length - 1].Target.netProfitTargetB - betUnitTargetB);
      previewBetOnTargetLoss = 'Banker';
    }

    if (Play4Mode == 1 && Borad.length >= 3 && betUnitTargetB >= 1 && (Borad[Borad.length - 3].Target.winTargetB == 1 || Borad[Borad.length - 3].Target.winTargetB == -1) &&
      (Borad[Borad.length - 2].Target.winTargetB == 0 || Borad[Borad.length - 2].Target.winTargetB == -1) &&
      (Borad[Borad.length - 1].Target.winTargetB == 0 || Borad[Borad.length - 1].Target.winTargetB == -1)) {
      previewBetUnitTargetLoss = (noOfBanker + 1 + TotalTieWinTargetB) - (Borad[Borad.length - 1].Target.netProfitTargetB - betUnitTargetB);
      previewBetOnTargetLoss = 'Banker';
    }

    if (Play5Mode == 1 && Borad.length >= 4 && betUnitTargetB >= 1 && (Borad[Borad.length - 4].Target.winTargetB == 1 || Borad[Borad.length - 4].Target.winTargetB == -1) &&
      (Borad[Borad.length - 3].Target.winTargetB == 0 || Borad[Borad.length - 3].Target.winTargetB == -1) && (Borad[Borad.length - 2].Target.winTargetB == 0 || Borad[Borad.length - 2].Target.winTargetB == -1) &&
      (Borad[Borad.length - 1].Target.winTargetB == 0 || Borad[Borad.length - 1].Target.winTargetB == -1)) {
      previewBetUnitTargetLoss = (noOfBanker + 1 + TotalTieWinTargetB) - (Borad[Borad.length - 1].Target.netProfitTargetB - betUnitTargetB);
      previewBetOnTargetLoss = 'Banker';
    }

  }

  if (betonTarget == 'Player') {
    if (Play2Mode == 1 && Borad.length >= 1 && betUnitTargetP >= 1 && (Borad[Borad.length - 1].Target.winTargetP == 1 || Borad[Borad.length - 1].Target.winTargetP == -1)) {
      previewBetUnitTargetLoss = (noOfPlayer + 1 + TotalTieWinTargetP) - (Borad[Borad.length - 1].Target.netProfitTargetP - betUnitTargetP);
      previewBetOnTargetLoss = 'Player';
    }

    if (Play3Mode == 1 && Borad.length >= 2 && betUnitTargetP >= 1 && (Borad[Borad.length - 2].Target.winTargetP == 1 || Borad[Borad.length - 2].Target.winTargetP == -1) &&
      (Borad[Borad.length - 1].Target.winTargetP == 0 || Borad[Borad.length - 1].Target.winTargetP == -1)) {
      previewBetUnitTargetLoss = (noOfPlayer + 1 + TotalTieWinTargetP) - (Borad[Borad.length - 1].Target.netProfitTargetP - betUnitTargetP);
      previewBetOnTargetLoss = 'Player';
    }

    if (Play4Mode == 1 && Borad.length >= 3 && betUnitTargetP >= 1 && (Borad[Borad.length - 3].Target.winTargetP == 1 || Borad[Borad.length - 3].Target.winTargetP == -1) &&
      (Borad[Borad.length - 2].Target.winTargetP == 0 || Borad[Borad.length - 2].Target.winTargetP == -1) &&
      (Borad[Borad.length - 1].Target.winTargetP == 0 || Borad[Borad.length - 1].Target.winTargetP == -1)) {
      previewBetUnitTargetLoss = (noOfPlayer + 1 + TotalTieWinTargetP) - (Borad[Borad.length - 1].Target.netProfitTargetP - betUnitTargetP);
      previewBetOnTargetLoss = 'Player';
    }

    if (Play5Mode == 1 && Borad.length >= 4 && betUnitTargetP >= 1 && (Borad[Borad.length - 4].Target.winTargetP == 1 || Borad[Borad.length - 4].Target.winTargetP == -1) &&
      (Borad[Borad.length - 3].Target.winTargetP == 0 || Borad[Borad.length - 3].Target.winTargetP == -1) && (Borad[Borad.length - 2].Target.winTargetP == 0 || Borad[Borad.length - 2].Target.winTargetP == -1) &&
      (Borad[Borad.length - 1].Target.winTargetP == 0 || Borad[Borad.length - 1].Target.winTargetP == -1)) {
      previewBetUnitTargetLoss = (noOfPlayer + 1 + TotalTieWinTargetP) - (Borad[Borad.length - 1].Target.netProfitTargetP - betUnitTargetP);
      previewBetOnTargetLoss = 'Player';
    }

  }

  if (Borad[Borad.length - 1].Target.BrakeCount + 1 >= brakeValue && brakeValue != 0) {
    previewBetOnTargetLoss = 'Banker';
    previewBetUnitTargetLoss = 0;
  }

  if (selectedGameModeInMultipleMode['Target'] == 1) {
    if (previewBetOnTargetLoss == "Banker") {
      previewBetUnitBankerLossINMM += previewBetUnitTargetLoss;
      previewBetOnBankerLoss = 1;
    } else {
      previewBetUnitPlayerLossINMM += previewBetUnitTargetLoss;
      previewBetOnPlayerLoss = 1;
    }

    if (previewBetOnTargetWin == 'Banker') {
      previewBetUnitBankerWinINMM += previewBetUnitTargetWin;
      previewBetOnBankerWin = 1;
    } else {
      previewBetUnitPlayerWinINMM += previewBetUnitTargetWin;
      previewBetOnPlayerWin = 1;
    }

  }

  if (selectedText == 'Target') {
    preview.innerHTML = 'Win(W) : ' + previewBetOnTargetWin + ' $' + previewBetUnitTargetWin * PerUnit + '<br> Loss(L) : ' + previewBetOnTargetLoss + ' $' + previewBetUnitTargetLoss * PerUnit;
  }

}


/* 
*
5 :- SOW 
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

    if (selectedText == 'SOW') {
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
      if (Borad[Borad.length - 1].SOW.win == 3 || Borad[Borad.length - 1].SOW.win == 2) {
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
      if (Borad[Borad.length - 1].SOW.win == 1 || Borad[Borad.length - 1].SOW.win == 2) {
        betUnitSOW = (noOfWinsRowInSOW + 1) - (Borad[Borad.length - 1].SOW.netProfit);
      } else if (Borad[Borad.length - 1].SOW.win == 3) {
        betUnitSOW = parseInt(Borad[Borad.length - 1].SOW.betUnit);
      } else {
        betUnitSOW = 1;

        /* 2 nd Play */
        if (Play2Mode == 1 && Borad.length >= 2 && Borad[Borad.length - 1].SOW.betUnit >= 1 && Borad[Borad.length - 2].SOW.win == 1 && Borad[Borad.length - 1].SOW.win == 0) {
          betUnitSOW = (noOfWinsRowInSOW + 1) - (Borad[Borad.length - 1].SOW.netProfit);
        }

        /* 3 rd Play */
        if (Play3Mode == 1 && Borad.length >= 3 && Borad[Borad.length - 1].SOW.betUnit >= 1 && Borad[Borad.length - 3].SOW.win == 1 && Borad[Borad.length - 2].SOW.win == 0 && Borad[Borad.length - 1].SOW.win == 0) {
          betUnitSOW = (noOfWinsRowInSOW + 1) - (Borad[Borad.length - 1].SOW.netProfit);
        }

        /* 4 th play */
        if (Play4Mode == 1 && Borad.length >= 4 && Borad[Borad.length - 1].SOW.betUnit >= 1 && Borad[Borad.length - 4].SOW.win == 1 &&
          Borad[Borad.length - 3].SOW.win == 0 && Borad[Borad.length - 2].SOW.win == 0 && Borad[Borad.length - 1].SOW.win == 0) {
          betUnitSOW = (noOfWinsRowInSOW + 1) - (Borad[Borad.length - 1].SOW.netProfit);
        }

        /* 5 th play */
        if (Play5Mode == 1 && Borad.length >= 5 && Borad[Borad.length - 1].SOW.betUnit >= 1 && Borad[Borad.length - 5].SOW.win == 1 &&
          Borad[Borad.length - 4].SOW.win == 0 && Borad[Borad.length - 3].SOW.win == 0 && Borad[Borad.length - 2].SOW.win == 0 && Borad[Borad.length - 1].SOW.win == 0) {
          betUnitSOW = (noOfWinsRowInSOW + 1) - (Borad[Borad.length - 1].SOW.netProfit);
        }

        if (Borad[Borad.length - 1].SOW.BrakeCount >= brakeValue && brakeValue != 0) {
          betUnitSOW = 0;
        }

      }

      if (Borad.length == vaildLengthToStartGame + 1) {
        betUnitSOW = 1;
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
    if (selectedText == 'SOW' && Borad.length > vaildLengthToStartGame) {
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

  // return ;

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
  previewBetUnitSOWWin = (noOfWinsRowInSOW + 2) - (Borad[Borad.length - 1].SOW.netProfit + betUnitSOW);

  previewBetUnitSOWLoss = 1;

  if (Play2Mode == 1 && Borad.length >= 1 && betUnitSOW >= 1 && Borad[Borad.length - 1].SOW.win == 1) {
    previewBetUnitSOWLoss = (noOfWinsRowInSOW + 1) - (Borad[Borad.length - 1].SOW.netProfit - betUnitSOW);
  }

  if (Play3Mode == 1 && Borad.length >= 2 && betUnitSOW >= 1 && Borad[Borad.length - 2].SOW.win == 1 && Borad[Borad.length - 1].SOW.win == 0) {
    previewBetUnitSOWLoss = (noOfWinsRowInSOW + 1) - (Borad[Borad.length - 1].SOW.netProfit - betUnitSOW);
  }

  if (Play4Mode == 1 && Borad.length >= 3 && betUnitSOW >= 1 && Borad[Borad.length - 3].SOW.win == 1 && Borad[Borad.length - 2].SOW.win == 0 && Borad[Borad.length - 1].SOW.win == 0) {
    previewBetUnitSOWLoss = (noOfWinsRowInSOW + 1) - (Borad[Borad.length - 1].SOW.netProfit - betUnitSOW);
  }

  if (Play5Mode == 1 && Borad.length >= 4 && betUnitSOW >= 1 && Borad[Borad.length - 4].SOW.win == 1 && Borad[Borad.length - 3].SOW.win == 0 && Borad[Borad.length - 2].SOW.win == 0 && Borad[Borad.length - 1].SOW.win == 0) {
    previewBetUnitSOWLoss = (noOfWinsRowInSOW + 1) - (Borad[Borad.length - 1].SOW.netProfit - betUnitSOW);
  }

  if (Borad[Borad.length - 1].SOW.BrakeCount + 1 >= brakeValue && brakeValue != 0) {
    previewBetUnitSOWLoss = 0;
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
  if (selectedText == 'SOW') {
    preview.innerHTML = 'Win(W) : ' + previewBetOnSOWWin + ' $' + previewBetUnitSOWWin * PerUnit + '<br>Loss(L) : ' + previewBetOnSOWLoss + ' $' + previewBetUnitSOWLoss * PerUnit;
  }


}


/* 
*
6 :- Zig Zag Player Management
*
*/

function NextBetCalculation4ZigZagPlayer() {

  // Bet On cal
  if (Borad[Borad.length - 1].ZigZagPlayerGame.betOn == 'Player') {
    betOnZigZagPlayer = 'Banker';
  } else {
    betOnZigZagPlayer = 'Player';
  }


  // Bet Unit cal
  if (Borad[Borad.length - 1].ZigZagPlayerGame.win == 1 || Borad[Borad.length - 1].ZigZagPlayerGame.win == 2) {

    betUnitZigZagPlayer = (noOfWinsRowInZigZagPlayer + 1) - Borad[Borad.length - 1].ZigZagPlayerGame.netProfit;

  } else if (Borad[Borad.length - 1].ZigZagPlayerGame.win == 3) {
    betUnitZigZagPlayer = parseInt(Borad[Borad.length - 1].ZigZagPlayerGame.betUnit);
  } else {

    betUnitZigZagPlayer = 1;

    /* 2 nd Play */
    if (Play2Mode == 1 && Borad.length >= 2 && Borad[Borad.length - 1].ZigZagPlayerGame.betUnit >= 1 && Borad[Borad.length - 2].ZigZagPlayerGame.win == 1 && Borad[Borad.length - 1].ZigZagPlayerGame.win == 0) {
      betUnitZigZagPlayer = (noOfWinsRowInZigZagPlayer + 1) - (Borad[Borad.length - 1].ZigZagPlayerGame.netProfit);
    }

    /* 3 rd Play */
    if (Play3Mode == 1 && Borad.length >= 3 && Borad[Borad.length - 1].ZigZagPlayerGame.betUnit >= 1 && Borad[Borad.length - 3].ZigZagPlayerGame.win == 1 && Borad[Borad.length - 2].ZigZagPlayerGame.win == 0 && Borad[Borad.length - 1].ZigZagPlayerGame.win == 0) {
      betUnitZigZagPlayer = (noOfWinsRowInZigZagPlayer + 1) - (Borad[Borad.length - 1].ZigZagPlayerGame.netProfit);
    }

    /* 4 th Play */
    if (Play4Mode == 1 && Borad.length >= 4 && Borad[Borad.length - 1].ZigZagPlayerGame.betUnit >= 1 && Borad[Borad.length - 4].ZigZagPlayerGame.win == 1 && Borad[Borad.length - 3].ZigZagPlayerGame.win == 0 && Borad[Borad.length - 2].ZigZagPlayerGame.win == 0 && Borad[Borad.length - 1].ZigZagPlayerGame.win == 0) {
      betUnitZigZagPlayer = (noOfWinsRowInZigZagPlayer + 1) - (Borad[Borad.length - 1].ZigZagPlayerGame.netProfit);
    }

    /* 5 th Play */
    if (Play5Mode == 1 && Borad.length >= 5 && Borad[Borad.length - 1].ZigZagPlayerGame.betUnit >= 1 && Borad[Borad.length - 5].ZigZagPlayerGame.win == 1 && Borad[Borad.length - 4].ZigZagPlayerGame.win == 0 && Borad[Borad.length - 3].ZigZagPlayerGame.win == 0 && Borad[Borad.length - 2].ZigZagPlayerGame.win == 0 && Borad[Borad.length - 1].ZigZagPlayerGame.win == 0) {
      betUnitZigZagPlayer = (noOfWinsRowInZigZagPlayer + 1) - (Borad[Borad.length - 1].ZigZagPlayerGame.netProfit);
    }

    if (Borad[Borad.length - 1].ZigZagPlayerGame.BrakeCount >= brakeValue && brakeValue != 0) {
      betUnitZigZagPlayer = 0;
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

  if (selectedText == 'ZigZag Player First') {
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

  previewBetOnZigZagPlayerLoss = previewBetOnZigZagPlayerWin;

  previewBetUnitZigZagPlayerWin = (noOfWinsRowInZigZagPlayer + 2) - (Borad[Borad.length - 1].ZigZagPlayerGame.netProfit + betUnitZigZagPlayer);

  previewBetUnitZigZagPlayerLoss = 1;

  if (Play2Mode == 1 && Borad.length >= 1 && betUnitZigZagPlayer >= 1 && Borad[Borad.length - 1].ZigZagPlayerGame.win == 1) {
    previewBetUnitZigZagPlayerLoss = (noOfWinsRowInZigZagPlayer + 1) - (Borad[Borad.length - 1].ZigZagPlayerGame.netProfit - betUnitZigZagPlayer);
  }

  if (Play3Mode == 1 && Borad.length >= 2 && betUnitZigZagPlayer >= 1 && Borad[Borad.length - 2].ZigZagPlayerGame.win == 1 && Borad[Borad.length - 1].ZigZagPlayerGame.win == 0) {
    previewBetUnitZigZagPlayerLoss = (noOfWinsRowInZigZagPlayer + 1) - (Borad[Borad.length - 1].ZigZagPlayerGame.netProfit - betUnitZigZagPlayer);
  }

  if (Play4Mode == 1 && Borad.length >= 3 && betUnitZigZagPlayer >= 1 && Borad[Borad.length - 3].ZigZagPlayerGame.win == 1 && Borad[Borad.length - 2].ZigZagPlayerGame.win == 0 && Borad[Borad.length - 1].ZigZagPlayerGame.win == 0) {
    previewBetUnitZigZagPlayerLoss = (noOfWinsRowInZigZagPlayer + 1) - (Borad[Borad.length - 1].ZigZagPlayerGame.netProfit - betUnitZigZagPlayer);
  }

  if (Play5Mode == 1 && Borad.length >= 4 && betUnitZigZagPlayer >= 1 && Borad[Borad.length - 4].ZigZagPlayerGame.win == 1 && Borad[Borad.length - 3].ZigZagPlayerGame.win == 0 && Borad[Borad.length - 2].ZigZagPlayerGame.win == 0 && Borad[Borad.length - 1].ZigZagPlayerGame.win == 0) {
    previewBetUnitZigZagPlayerLoss = (noOfWinsRowInZigZagPlayer + 1) - (Borad[Borad.length - 1].ZigZagPlayerGame.netProfit - betUnitZigZagPlayer);
  }

  if (Borad[Borad.length - 1].ZigZagPlayerGame.BrakeCount + 1 >= brakeValue && brakeValue != 0) {
    previewBetUnitZigZagPlayerLoss = 0;
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

  if (selectedText == 'ZigZag Player First') {
    preview.innerHTML = 'Win(W) : ' + previewBetOnZigZagPlayerWin + ' $' + previewBetUnitZigZagPlayerWin * PerUnit + '<br>Loss(L) : ' + previewBetOnZigZagPlayerLoss + ' $' + previewBetUnitZigZagPlayerLoss * PerUnit;
  }

}



/* 
*
7 :- Zig Zag Banker Management
*
*/

function NextBetCalculation4ZigZagBanker() {

  // Where To bet 
  if (Borad[Borad.length - 1].ZigZagBankerGame.betOn == 'Player') {
    betOnZigZagBanker = 'Banker';
  } else {
    betOnZigZagBanker = 'Player';
  }

  // How much bet unit
  if (Borad[Borad.length - 1].ZigZagBankerGame.win == 1 || Borad[Borad.length - 1].ZigZagBankerGame.win == 2) {

    betUnitZigZagBanker = (noOfWinsRowInZigZagBanker + 1) - Borad[Borad.length - 1].ZigZagBankerGame.netProfit;

  } else if (Borad[Borad.length - 1].ZigZagBankerGame.win == 3) {
    betUnitZigZagBanker = parseInt(Borad[Borad.length - 1].ZigZagBankerGame.betUnit);
  } else {

    betUnitZigZagBanker = 1;

    /* 2 nd Play */
    if (Play2Mode == 1 && Borad.length >= 2 && Borad[Borad.length - 1].ZigZagBankerGame.betUnit >= 1 && Borad[Borad.length - 2].ZigZagBankerGame.win == 1 && Borad[Borad.length - 1].ZigZagBankerGame.win == 0) {
      betUnitZigZagBanker = (noOfWinsRowInZigZagBanker + 1) - (Borad[Borad.length - 1].ZigZagBankerGame.netProfit);
    }

    /* 3 rd Play */
    if (Play3Mode == 1 && Borad.length >= 3 && Borad[Borad.length - 1].ZigZagBankerGame.betUnit >= 1 && Borad[Borad.length - 3].ZigZagBankerGame.win == 1 && Borad[Borad.length - 2].ZigZagBankerGame.win == 0 && Borad[Borad.length - 1].ZigZagBankerGame.win == 0) {
      betUnitZigZagBanker = (noOfWinsRowInZigZagBanker + 1) - (Borad[Borad.length - 1].ZigZagBankerGame.netProfit);
    }

    /* 4 th Play */
    if (Play4Mode == 1 && Borad.length >= 4 && Borad[Borad.length - 1].ZigZagBankerGame.betUnit >= 1 && Borad[Borad.length - 4].ZigZagBankerGame.win == 1 && Borad[Borad.length - 3].ZigZagBankerGame.win == 0 && Borad[Borad.length - 2].ZigZagBankerGame.win == 0 && Borad[Borad.length - 1].ZigZagBankerGame.win == 0) {
      betUnitZigZagBanker = (noOfWinsRowInZigZagBanker + 1) - (Borad[Borad.length - 1].ZigZagBankerGame.netProfit);
    }

    /* 5 th Play */
    if (Play5Mode == 1 && Borad.length >= 5 && Borad[Borad.length - 1].ZigZagBankerGame.betUnit >= 1 && Borad[Borad.length - 5].ZigZagBankerGame.win == 1 && Borad[Borad.length - 4].ZigZagBankerGame.win == 0 && Borad[Borad.length - 3].ZigZagBankerGame.win == 0 && Borad[Borad.length - 2].ZigZagBankerGame.win == 0 && Borad[Borad.length - 1].ZigZagBankerGame.win == 0) {
      betUnitZigZagBanker = (noOfWinsRowInZigZagBanker + 1) - (Borad[Borad.length - 1].ZigZagBankerGame.netProfit);
    }

    if (Borad[Borad.length - 1].ZigZagBankerGame.BrakeCount >= brakeValue && brakeValue != 0) {
      betUnitZigZagBanker = 0;
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

  if (selectedText == 'ZigZag Banker First') {
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

  previewBetUnitZigZagBankerWin = (noOfWinsRowInZigZagBanker + 2) - (Borad[Borad.length - 1].ZigZagBankerGame.netProfit + betUnitZigZagBanker);

  previewBetUnitZigZagBankerLoss = 1;

  if (Play2Mode == 1 && Borad.length >= 1 && betUnitZigZagBanker >= 1 && Borad[Borad.length - 1].ZigZagBankerGame.win == 1) {
    previewBetUnitZigZagBankerLoss = (noOfWinsRowInZigZagBanker + 1) - (Borad[Borad.length - 1].ZigZagBankerGame.netProfit - betUnitZigZagBanker);
  }

  if (Play3Mode == 1 && Borad.length >= 2 && betUnitZigZagBanker >= 1 && Borad[Borad.length - 2].ZigZagBankerGame.win == 1 && Borad[Borad.length - 1].ZigZagBankerGame.win == 0) {
    previewBetUnitZigZagBankerLoss = (noOfWinsRowInZigZagBanker + 1) - (Borad[Borad.length - 1].ZigZagBankerGame.netProfit - betUnitZigZagBanker);
  }

  if (Play4Mode == 1 && Borad.length >= 3 && betUnitZigZagBanker >= 1 && Borad[Borad.length - 3].ZigZagBankerGame.win == 1 && Borad[Borad.length - 2].ZigZagBankerGame.win == 0 && Borad[Borad.length - 1].ZigZagBankerGame.win == 0) {
    previewBetUnitZigZagBankerLoss = (noOfWinsRowInZigZagBanker + 1) - (Borad[Borad.length - 1].ZigZagBankerGame.netProfit - betUnitZigZagBanker);
  }

  if (Play5Mode == 1 && Borad.length >= 4 && betUnitZigZagBanker >= 1 && Borad[Borad.length - 4].ZigZagBankerGame.win == 1 && Borad[Borad.length - 3].ZigZagBankerGame.win == 0 && Borad[Borad.length - 2].ZigZagBankerGame.win == 0 && Borad[Borad.length - 1].ZigZagBankerGame.win == 0) {
    previewBetUnitZigZagBankerLoss = (noOfWinsRowInZigZagBanker + 1) - (Borad[Borad.length - 1].ZigZagBankerGame.netProfit - betUnitZigZagBanker);
  }

  if (Borad[Borad.length - 1].ZigZagBankerGame.BrakeCount + 1 >= brakeValue && brakeValue != 0) {
    previewBetUnitZigZagBankerLoss = 0;
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

  if (selectedText == 'ZigZag Banker First') {

    preview.innerHTML = 'Win(W) : ' + previewBetOnZigZagBankerWin + ' $' + previewBetUnitZigZagBankerWin * PerUnit + '<br>Loss(L) : ' + previewBetOnZigZagBankerLoss + ' $' + previewBetUnitZigZagBankerLoss * PerUnit;
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


    if (Borad[Borad.length - 1].MVD.startGameMVD == 0) {
      betUnitMVD = 1;
    }
    else if (Borad[Borad.length - 1].MVD.win == 1 || Borad[Borad.length - 1].MVD.win == 2) {

      betUnitMVD = 0;

      if (Borad[Borad.length - 1].MVD.SetBet == 0) {
        betUnitMVD = (noOfWinsRowInMVD + 1) - Borad[Borad.length - 1].MVD.netProfit;
      }

    } else if (Borad[Borad.length - 1].MVD.win == 3) {
      betUnitMVD = parseInt(Borad[Borad.length - 1].MVD.betUnit);
    } else {

      betUnitMVD = 1;

      // Single Win 
      if (singlePlayer <= Borad[Borad.length - 1].MVD.SingleWin && singlePlayer != 0) {
        betUnitMVD = 0;
        setBet0MVD = 1;
      }


      /* 2 nd Play */
      if (Play2Mode == 1 && Borad.length >= 2 && Borad[Borad.length - 1].MVD.betUnit >= 1 && Borad[Borad.length - 2].MVD.win == 1 && Borad[Borad.length - 1].MVD.win == 0) {
        betUnitMVD = (noOfWinsRowInMVD + 1) - (Borad[Borad.length - 1].MVD.netProfit);
      }

      /* 3 rd Play */
      if (Play3Mode == 1 && Borad.length >= 3 && Borad[Borad.length - 1].MVD.betUnit >= 1 && Borad[Borad.length - 3].MVD.win == 1 && Borad[Borad.length - 2].MVD.win == 0 && Borad[Borad.length - 1].MVD.win == 0) {
        betUnitMVD = (noOfWinsRowInMVD + 1) - (Borad[Borad.length - 1].MVD.netProfit);
      }

      /* 4 th Play */
      if (Play4Mode == 1 && Borad.length >= 4 && Borad[Borad.length - 1].MVD.betUnit >= 1 && Borad[Borad.length - 4].MVD.win == 1 && Borad[Borad.length - 3].MVD.win == 0 && Borad[Borad.length - 2].MVD.win == 0 && Borad[Borad.length - 1].MVD.win == 0) {
        betUnitMVD = (noOfWinsRowInMVD + 1) - (Borad[Borad.length - 1].MVD.netProfit);
      }

      /* 5 th Play */
      if (Play5Mode == 1 && Borad.length >= 5 && Borad[Borad.length - 1].MVD.betUnit >= 1 && Borad[Borad.length - 5].MVD.win == 1 && Borad[Borad.length - 4].MVD.win == 0 && Borad[Borad.length - 3].MVD.win == 0 && Borad[Borad.length - 2].MVD.win == 0 && Borad[Borad.length - 1].MVD.win == 0) {
        betUnitMVD = (noOfWinsRowInMVD + 1) - (Borad[Borad.length - 1].MVD.netProfit);
      }

      if (Borad[Borad.length - 1].MVD.BrakeCount >= brakeValue && brakeValue != 0) {
        betUnitMVD = 0;
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

  if (startGameMVD == 0 && selectedText == "MVD") {
    bet.innerHTML = '<div><span> -- </span><span> : $ -- </span></div>';
  } else if (selectedText == 'MVD') {
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

  // if (Borad.length >= 1) {
  //   console.log(typePatten);
  //   console.log(lengthOfPatten);
  // }


  betOnMVD = "";
  let findMatchSuccessfully = 0;

  // less the starting patten form total length
  i = Borad.length - lengthOfPatten;
  // console.log(i);


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
            if (Borad.length >= 7) console.log("find");
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

      if (Borad.length >= 7) console.log("not find");
    }

  }


}


/* Perview Next to Next Bet Calculation For MVD */
function NextToNextBetCalculation4MVD() {

  if (startGameMVD == 0 && selectedText == 'MVD') {
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
  previewBetUnitMVDWin = (noOfWinsRowInMVD + 2) - (Borad[Borad.length - 1].MVD.netProfit + betUnitMVD);

  previewBetUnitMVDLoss = 1;

  if (Play2Mode == 1 && Borad.length >= 1 && betUnitMVD >= 1 && Borad[Borad.length - 1].MVD.win == 1) {
    previewBetUnitMVDLoss = (noOfWinsRowInMVD + 1) - (Borad[Borad.length - 1].MVD.netProfit - betUnitMVD);
  }

  if (Play3Mode == 1 && Borad.length >= 2 && betUnitMVD >= 1 && Borad[Borad.length - 2].MVD.win == 1 && Borad[Borad.length - 1].MVD.win == 0) {
    previewBetUnitMVDLoss = (noOfWinsRowInMVD + 1) - (Borad[Borad.length - 1].MVD.netProfit - betUnitMVD);
  }

  if (Play4Mode == 1 && Borad.length >= 3 && betUnitMVD >= 1 && Borad[Borad.length - 3].MVD.win == 1 && Borad[Borad.length - 2].MVD.win == 0 && Borad[Borad.length - 1].MVD.win == 0) {
    previewBetUnitMVDLoss = (noOfWinsRowInMVD + 1) - (Borad[Borad.length - 1].MVD.netProfit - betUnitMVD);
  }

  if (Play5Mode == 1 && Borad.length >= 5 && betUnitMVD >= 1 && Borad[Borad.length - 4].MVD.win == 1 && Borad[Borad.length - 3].MVD.win == 0 && Borad[Borad.length - 2].MVD.win == 0 && Borad[Borad.length - 1].MVD.win == 0) {
    previewBetUnitMVDLoss = (noOfWinsRowInMVD + 1) - (Borad[Borad.length - 1].MVD.netProfit - betUnitMVD);
  }

  if (Borad[Borad.length - 1].MVD.BrakeCount + 1 >= brakeValue && brakeValue != 0) {
    previewBetUnitMVDLoss = 0;
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

  if (selectedText == 'MVD') {
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