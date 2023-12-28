var hand = 0, WholeWinAmountP = 0, WholeLossAmountP = 0, saveMaxContiuneWinP = 0, saveMaxContiuneLossP = 0;
var WholeWinAmountB = 0, WholeLossAmountB = 0, saveMaxContiuneWinB = 0, saveMaxContiuneLossB = 0;
var WholeWinAmountD = 0, WholeLossAmountD = 0, saveMaxContiuneWinD = 0, saveMaxContiuneLossD = 0;
var WholeWinAmountTarget = 0, WholeLossAmountTarget = 0, saveMaxContiuneWinTarget = 0, saveMaxContiuneLossTarget = 0;
statusOfRS = 0;
var bet = document.getElementById("bet");
if (statusIsFileUpload == 0) previewBet();
if (statusIsFileUpload == 0) displayTable();
if (statusIsFileUpload == 0) displayBaccaratBorad();
// if (statusIsFileUpload == 0) displayvariableTable();
document.getElementById('variableTable').style.display = 'none';



/* Round Off */
function roundOff(num, places = 2) {
  const x = Math.pow(10, places);
  return Math.round(num * x) / x;
}


/* 
*
0.1 :- Change In Game Mode  (Bet Game , Tie Mode , 2 play , 3 play , Normal Play , Max Single Win )
*
*/

/* Change Bet Game */
function betchange(bettype) {

  selectedText = bettype.options[bettype.selectedIndex].innerHTML;
  document.getElementById('singleWinId').style.display = "block";

  if (selectedText == 'SOW' || selectedText == 'ZigZag Banker First' || selectedText == 'ZigZag Player First') {
    document.getElementById('singleWinId').style.display = "none";
  }

  if (selectedText == "Multiple Mode") {
    if (IschangePreferencesOn == 0) document.getElementById('multipleModeOption').style.display = 'Block';
    else document.getElementById('multipleModeOptionINCP').style.display = 'Block';
  } else {
    if (IschangePreferencesOn == 0) document.getElementById('multipleModeOption').style.display = 'none';
    else document.getElementById('multipleModeOptionINCP').style.display = 'none';
  }

  if (selectedText == 'MVD' && statusIsFileUpload == 0) changeDataTable();
  if (statusIsFileUpload == 0) displayTable();
  if (statusIsFileUpload == 0) previewBet();
  if (statusIsFileUpload == 0 && statusOfVariableTableShow == 1) displayvariableTable();


}

/* Change In Tie MOde */
function chnageTieMode() {

  if (IschangePreferencesOn == 1) {
    var tieCheckBox1 = document.getElementById('flexCheckDefaultINCP');
    if (tieCheckBox1.checked == true) {
      tieMode = 1;
    }
    else
      tieMode = 0;

    changeDataTable();
  } else {
    var tieCheckBox1 = document.getElementById('flexCheckDefault');
    if (tieCheckBox1.checked == true) {
      tieMode = 1;
    }
    else
      tieMode = 0;

    if (statusIsFileUpload == 0) previewBet();
  }

}

/* noraml Play */
function normalPlay() {

  Play2Mode = 0;
  Play3Mode = 0;
  Play4Mode = 0, Play5Mode = 0;
  document.getElementById('singleWinId').style.display = 'block';
  singlePlayer = document.getElementById('esingleP').value;
  singleBanker = singlePlayer;
  //if (statusIsFileUpload == 0) previewBet();
  if (statusIsFileUpload == 0) changeDataTable();

}

/* Change In 2 nd Play */
function chnage2ndPlay() {
  Play3Mode = 0;
  Play2Mode = 1;
  Play4Mode = 0, Play5Mode = 0;
  singlePNo = 0; singleBNo = 0;
  singlePlayer = 0; singleBanker = 0;
  document.getElementById('singleWinId').style.display = 'none';
  if (Borad.length >= 1) Borad[Borad.length - 1].playerGame.SetBet = 0;
  setBet0B = 0;
  //if (statusIsFileUpload == 0) previewBet();
  if (statusIsFileUpload == 0) changeDataTable();

}

/* Change In 3 rd Play */
function chnage3rdPlay() {
  Play2Mode = 1;
  Play3Mode = 1;
  Play4Mode = 0, Play5Mode = 0;
  singlePNo = 0; singleBNo = 0;
  singlePlayer = 0; singleBanker = 0;
  document.getElementById('singleWinId').style.display = 'none';
  if (Borad.length >= 1) Borad[Borad.length - 1].playerGame.SetBet = 0;
  setBet0B = 0;
  //if (statusIsFileUpload == 0) previewBet();
  if (statusIsFileUpload == 0) changeDataTable();

}

/* Change in Max Single Win */
function changeP() {

  if (IschangePreferencesOn == 0) {
    if (document.getElementById('esingleP').value >= 0) {
      singlePlayer = document.getElementById('esingleP').value;
    } else {
      document.getElementById('esingleP').value = 0;
      singlePlayer = document.getElementById('esingleP').value;
    }

    singleBanker = singlePlayer;
    if (statusIsFileUpload == 0) previewBet();
  }

  if(IschangePreferencesOn == 1){
    if (document.getElementById('esinglePINCP').value >= 0) {
      singlePlayer = document.getElementById('esinglePINCP').value;
    } else {
      document.getElementById('esinglePINCP').value = 0;
      singlePlayer = document.getElementById('esinglePINCP').value;
    }
    singleBanker = singlePlayer;
    changeDataTable();
  }


}

/* Change In Brake */
function changeBrake() {

  if (document.getElementById('brakeId').value >= 0) {
    brakeValue = document.getElementById('brakeId').value;
  } else {
    document.getElementById('brakeId').value = 0;
    brakeValue = document.getElementById('brakeId').value;
  }

  if (statusIsFileUpload == 0) previewBet();

}

/* Change In 4 TH Play */
function chnage4thPlay() {
  Play2Mode = 1;
  Play3Mode = 1;
  Play4Mode = 1, Play5Mode = 0;
  singlePNo = 0; singleBNo = 0;
  singlePlayer = 0; singleBanker = 0;
  document.getElementById('singleWinId').style.display = 'none';
  if (Borad.length >= 1) Borad[Borad.length - 1].playerGame.SetBet = 0;
  setBet0B = 0;
  //if (statusIsFileUpload == 0) previewBet();
  if (statusIsFileUpload == 0) changeDataTable();
}

/* Change in 5 th play */
function chnage5thPlay() {
  Play2Mode = 1;
  Play3Mode = 1;
  Play4Mode = 1, Play5Mode = 1;
  singlePNo = 0; singleBNo = 0;
  singlePlayer = 0; singleBanker = 0;
  document.getElementById('singleWinId').style.display = 'none';
  if (Borad.length >= 1) Borad[Borad.length - 1].playerGame.SetBet = 0;
  setBet0B = 0;
  //if (statusIsFileUpload == 0) previewBet();
  if (statusIsFileUpload == 0) changeDataTable();
}

/* Change In Play Type */
function ChangePlayType(select) {

  if (IschangePreferencesOn == 1) tempSelection = select.options[PlayTypeIdINCP.selectedIndex].innerHTML;
  else tempSelection = select.options[PlayTypeId.selectedIndex].innerHTML;

  if (tempSelection == "Normal") {
    normalPlay();
  }

  if (tempSelection == "2nd Play") {
    chnage2ndPlay();
  }

  if (tempSelection == "3rd Play") {
    chnage3rdPlay();
  }

  if (tempSelection == "4th Play") {
    chnage4thPlay();
  }

  if (tempSelection == "5th Play") {
    chnage5thPlay();
  }


}

/* change In Dispaly preview */
function chnageDisplayPreviewBet() {
  var previewBetBox = document.getElementById('displayPreviewBetId');
  if (previewBetBox.checked == true) {
    displayPreview = 1;
  }
  else
    displayPreview = 0;

  if (statusIsFileUpload == 0) previewBet();
}

/* 
*
0.2 :- Main Game
*
*/


/* Preview Bet */
function previewBet() {

  totalBetAmtP = 0, totalBetAmtB = 0, totalBetAmtD = 0, totalBetAmtTarget = 0;
  tieAmtP = 0, tieAmtB = 0, tieAmtD = 0, tieAmtTarget = 0;
  BetOnTieP = 0, BetOnTieB = 0, BetOnTieD = 0, BetOnTieTarget = 0;
  tieUnitP = 0, tieUnitB = 0, tieUnitD = 0, tieUnitTarget = 0;
  totalBetAmtSOW = 0, tieAmtSOW = 0, BetOnTieSOW = 0, tieUnitSOW = 0;


  // MultiMode Set Up
  multipleBetUnitOnPlayer = 0, multipleBetUnitOnBanker = 0;
  multipleBetOnTie = 0, multipleBetUnitOnTie = 0, multipleBetAmountOnTie = 0;
  multipleBetOnPlayer = 0, multipleBetOnBanker = 0;
  TotalBetAmountInMultipleMode = 0;
  previewBetUnitBankerLossINMM = 0; previewBetUnitBankerWinINMM = 0;
  previewBetOnPlayerWin = 0, previewBetOnBankerWin = 0;
  previewBetOnPlayerLoss = 0, previewBetOnBankerLoss = 0;
  previewBetUnitPlayerWinINMM = 0; previewBetUnitPlayerLossINMM = 0;

  // ZigZag Player AND Zigzag Banker
  totalBetAmtZigZagPlayer = 0, tieAmtZigZagPlayer = 0, BetOnTieZigZagPlayer = 0, tieUnitZigZagPlayer = 0;
  totalBetAmtZigZagBanker = 0, tieAmtZigZagBanker = 0, BetOnTieZigZagBanker = 0, tieUnitZigZagBanker = 0;

  // MVD
  totalBetAmtMVD = 0, tieAmtMVD = 0, BetOnTieMVD = 0, tieUnitMVD = 0;


  // For Length Zero 
  if (Borad.length == 0 && BoradForMultiMode.length == 0) {

    betonDiff = 'Banker'; betUnitD = 1; totalBetAmtD = PerUnit, maxBetD = PerUnit, WholeBetAmountD = 1;
    totalBetAmtB = PerUnit; betUnitB = 1, maxBetB = PerUnit, WholeBetAmountB = 1;
    betonTarget = 'Banker'; totalBetAmtTarget = PerUnit; betUnitTargetB = 1; betUnitTargetP = 0;
    maxBetTarget = PerUnit, WholeBetAmountTarget = 1;
    totalBetAmtP = PerUnit; betUnitP = 1, maxBetP = PerUnit, WholeBetAmountP = 1;
    betUnitSOW = 0; betOnSOW = null; totalBetAmtSOW = 0;
    betUnitMVD = 0; betOnMVD = null; totalBetAmtMVD = 0;

    totalBetAmtZigZagPlayer = 1 * PerUnit; betUnitZigZagPlayer = 1;
    maxBetZigZagPlayer = 1 * PerUnit; WholeBetUnitZigZagPlayer = 1;

    totalBetAmtZigZagBanker = 1 * PerUnit; betUnitZigZagBanker = 1;
    maxBetZigZagBanker = 1 * PerUnit; WholeBetUnitZigZagBanker = 1;


    if (selectedText == 'Differential') {
      bet.innerHTML = '<div><span class="boradTableinBanker"> Banker</span><span> : $' + PerUnit + '</span></div>';
      bet.innerHTML += '<div><span> Total Amount : $' + totalBetAmtD + '</span></div>';
      preview.innerHTML = 'Win(W) : Banker $' + PerUnit + '<br> Loss(L) : Banker $' + PerUnit;
    } else if (selectedText == 'Banker') {

      bet.innerHTML = '<div><span class="boradTableinBanker"> Banker</span><span> : $' + PerUnit + '</span></div>';
      bet.innerHTML += '<div><span> Total Amount : $' + totalBetAmtB + '</span></div>';
      preview.innerHTML = 'Win(W) : Banker $' + PerUnit + '<br> Loss(L) : Banker $' + PerUnit;


    } else if (selectedText == 'Target') {

      bet.innerHTML = '<div><span class="boradTableinBanker"> Banker</span><span> : $' + PerUnit + '</span></div>';
      bet.innerHTML += '<div><span> Total Amount : $' + totalBetAmtTarget + '</span></div>';
      preview.innerHTML = 'Win(W) : Banker $' + PerUnit + '<br>';
      preview.innerHTML += 'Loss(L) : Player $' + 2 * PerUnit;

    } else if (selectedText == 'Player') {
      bet.innerHTML = '<div><span class="boradTableinPlayer"> Player </span><span> : $' + PerUnit + '</span></div>';
      bet.innerHTML += '<div><span> Total Amount : $' + totalBetAmtP + '</span></div>';
      preview.innerHTML = 'Win(W) : Player $' + PerUnit + ' <br> Loss(L) : Player $' + PerUnit;
    } else if (selectedText == 'SOW') {
      bet.innerHTML = '<div><span> -- </span><span> : $ -- </span></div>';
      preview.innerHTML = 'Win(W) : -- $ -- <br>  Loss(L) : -- $ -- ';
    } else if (selectedText == 'ZigZag Player First') {
      bet.innerHTML = '<div><span class="boradTableinPlayer"> Player </span><span> : $' + betUnitZigZagPlayer * PerUnit + '</span></div>';
      bet.innerHTML += '<div><span> Total Amount : $' + totalBetAmtZigZagPlayer + '</span></div>';
      preview.innerHTML = 'Win(W) : Banker $' + betUnitZigZagPlayer * PerUnit + ' <br> Loss(L) : Banker $' + 1 * PerUnit;

    } else if (selectedText == 'ZigZag Banker First') {
      bet.innerHTML = '<div><span class="boradTableinBanker"> Banker </span><span> : $' + betUnitZigZagBanker * PerUnit + '</span></div>';
      bet.innerHTML += '<div><span> Total Amount : $' + totalBetAmtZigZagBanker + '</span></div>';
      preview.innerHTML = 'Win(W) : Player $' + betUnitZigZagBanker * PerUnit + ' <br> Loss(L) : Player $' + 1 * PerUnit;
    } else if (selectedText == "MVD") {
      bet.innerHTML = '<div><span> -- </span><span> : $ -- </span></div>';
      preview.innerHTML = 'Win(W) : -- $ -- <br>  Loss(L) : -- $ -- ';
    }



    // Starting of multi mode 

    if (selectedGameModeInMultipleMode['Player'] == 1) {
      multipleBetUnitOnPlayer += betUnitP;
      multipleBetOnPlayer = 1;
      previewBetOnPlayerLoss = 1, previewBetOnPlayerWin = 1;
      previewBetUnitPlayerWinINMM += 1, previewBetUnitPlayerLossINMM += 1;
    }

    if (selectedGameModeInMultipleMode['Banker'] == 1) {
      multipleBetUnitOnBanker += betUnitB;
      multipleBetOnBanker = 1;
      previewBetUnitBankerLossINMM += 1;
      previewBetOnBankerLoss = 1;
      previewBetUnitBankerWinINMM += 1;
      previewBetOnBankerWin = 1;
    }

    if (selectedGameModeInMultipleMode['Differential'] == 1) {
      multipleBetUnitOnBanker += betUnitD;
      multipleBetOnBanker = 1;
      previewBetUnitBankerLossINMM += 1;
      previewBetOnBankerLoss = 1;
      previewBetUnitBankerWinINMM += 1;
      previewBetOnBankerWin = 1;
    }

    if (selectedGameModeInMultipleMode['Target'] == 1) {
      multipleBetUnitOnBanker += betUnitTargetB;
      multipleBetOnBanker = 1;
      previewBetUnitBankerWinINMM += 1;
      previewBetOnBankerWin = 1;
      previewBetOnPlayerLoss = 1, previewBetUnitPlayerLossINMM += 1;
    }

    if (selectedGameModeInMultipleMode['SOW'] == 1) {
      //    YOU WANT TO ADD 
    }

    if (selectedGameModeInMultipleMode['MVD'] == 1) {
      //    YOU WANT TO ADD 
    }

    if (selectedGameModeInMultipleMode['ZigZagPlayer'] == 1) {
      multipleBetUnitOnPlayer += 1;
      multipleBetOnPlayer = 1;
      wholeBetUnitINMM += 1;

      previewBetUnitBankerLossINMM += 1;
      previewBetOnBankerLoss = 1;
      previewBetUnitBankerWinINMM += 1;
      previewBetOnBankerWin = 1;
    }

    if (selectedGameModeInMultipleMode['ZigZagBanker'] == 1) {
      multipleBetUnitOnBanker += 1;
      multipleBetOnBanker = 1;
      wholeBetUnitINMM += 1;

      previewBetOnPlayerLoss = 1, previewBetOnPlayerWin = 1;
      previewBetUnitPlayerWinINMM += 1;
      previewBetUnitPlayerLossINMM += 1;
    }

    displayPreviewBet();

    // check whether display preview status 
    if (displayPreview == 0) {
      preview.innerHTML = "";
    }

    return;
  }

  //  Stop Profit //
  if (IschangePreferencesOn == 0) checkStopProfit();

  // Max Hand //
  if (IschangePreferencesOn == 0) checkMaxHand();

  // Perview Bet for Player //
  if (statusIsFileUpload == 0 || (statusIsFileUpload == 1 && (selectedText == 'Player' || selectedText == 'Differential' || 'Multiple Mode' == selectedText))) NextBetCalculation4Player();
  if (statusIsFileUpload == 0) NextToNextBetCalculation4Player();

  // Perview Bet for Banker //
  if (statusIsFileUpload == 0 || (statusIsFileUpload == 1 && (selectedText == 'Banker' || selectedText == 'Differential' || 'Multiple Mode' == selectedText))) NextBetCalculation4Banker();
  if (statusIsFileUpload == 0) NextToNextBetCalculation4Banker();

  // Preview For Differential //
  if (statusIsFileUpload == 0 || (statusIsFileUpload == 1 && selectedText == 'Differential' || 'Multiple Mode' == selectedText)) NextBetCalculation4Differential();
  if (statusIsFileUpload == 0) NextToNextBetCalculation4Differential();

  // Preview For Target //
  if (statusIsFileUpload == 0 || (statusIsFileUpload == 1 && selectedText == 'Target' || 'Multiple Mode' == selectedText)) NextBetCalculation4Target();
  if (statusIsFileUpload == 0) NextToNextBetCalculation4Target();

  // Perview Bet for SOW //
  if (statusIsFileUpload == 0 || (statusIsFileUpload == 1 && (selectedText == 'SOW' || 'Multiple Mode' == selectedText))) NextBetCalculation4SOW();
  if (statusIsFileUpload == 0) NextToNextBetCalculation4SOW();

  // Perview Bet for Zig Zag Player //
  if (statusIsFileUpload == 0 || (statusIsFileUpload == 1 && (selectedText == 'ZigZag Player First' || 'Multiple Mode' == selectedText))) NextBetCalculation4ZigZagPlayer();
  if (statusIsFileUpload == 0) NextToNextBetCalculation4ZigZagPlayer();

  // Perview Bet for Zig Zag Banker //
  if (statusIsFileUpload == 0 || (statusIsFileUpload == 1 && (selectedText == 'ZigZag Banker First' || 'Multiple Mode' == selectedText))) NextBetCalculation4ZigZagBanker();
  if (statusIsFileUpload == 0) NextToNextBetCalculation4ZigZagBanker();

  // Preview Bet For MVD //
  if (statusIsFileUpload == 0 || (statusIsFileUpload == 1 && (selectedText == 'MVD' || 'Multiple Mode' == selectedText))) NextBetCalculation4MVD();
  if (statusIsFileUpload == 0) NextToNextBetCalculation4MVD();



  //  Max Bet Unit //
  if (IschangePreferencesOn == 0) checkMaxBet();

  //  Stop Loss //
  if (IschangePreferencesOn == 0) checkStopLoss();


  displayPreviewBet();

  WholeBetAmountD = betUnitD + tieUnitD + parseInt(Borad[Borad.length - 1].differential.WholeBetAmount);
  if (betonTarget == 'Player') {
    WholeBetAmountTarget = betUnitTargetP + tieUnitTarget + parseInt(Borad[Borad.length - 1].Target.WholeBetAmount);
  } else if (betonTarget == 'Banker') {
    WholeBetAmountTarget = betUnitTargetB + tieUnitTarget + parseInt(Borad[Borad.length - 1].Target.WholeBetAmount);
  }
  WholeBetAmountP = betUnitP + tieUnitP + parseInt(Borad[Borad.length - 1].playerGame.WholeBetAmount);
  WholeBetAmountB = betUnitB + tieUnitB + parseInt(Borad[Borad.length - 1].BankerGame.WholeBetAmount);
  WholeBetUnitSOW = betUnitSOW + tieUnitSOW + parseInt(Borad[Borad.length - 1].SOW.WholeBetUnit);
  WholeBetUnitZigZagBanker = betUnitZigZagBanker + tieUnitZigZagBanker + parseInt(Borad[Borad.length - 1].ZigZagBankerGame.WholeBetUnit);
  WholeBetUnitZigZagPlayer = betUnitZigZagPlayer + tieUnitZigZagPlayer + parseInt(Borad[Borad.length - 1].ZigZagPlayerGame.WholeBetUnit);
  WholeBetUnitMVD = betUnitMVD + tieUnitMVD + parseInt(Borad[Borad.length - 1].MVD.WholeBetUnit);


  // check whether display preview status 
  if (displayPreview == 0) {
    preview.innerHTML = "";
  }

}

// Actual Winner //
function actualWin(clicked_id) {

  actualWinner = document.getElementById(clicked_id).value;


  if (Borad.length == 0) {
    totalBetAmtB = PerUnit; betUnitB = 1;
    betonTarget = 'Banker'; totalBetAmtTarget = PerUnit; betUnitTargetB = 1; betUnitTargetP = 0;
    totalBetAmtP = PerUnit; betUnitP = 1;
  }


  // For Undo //
  if (actualWinner == 'undoWinner') {
    undo();
    return;
  } else {
    if (actualWinner == 'Tie') {
      checkBincre = 2; checkPincre = 2;
      tieWin = 1; TotalTieWin++;
    }
    else if (actualWinner == 'Banker') {
      noOfBanker++;
      checkBincre = 1;
      checkPincre = 0;

    } else {
      noOfPlayer++;
      checkPincre = 1;
      checkBincre = 0;


    }
  }


  TotalbalanceTarget = 0;
  hand = hand + 1;

  if (statusIsFileUpload == 0 || (statusIsFileUpload == 1 && (selectedText == 'Player' || selectedText == 'Differential' || 'Multiple Mode' == selectedText))) {
    if (checkBincre == 0 && Play2Mode == 0) {
      whereSingleP.push(hand);
      if (whereSingleP[whereSingleP.length - 1] != whereSingleP[whereSingleP.length - 2] + 1) {
        singlePNo++;
      }

      if (whereSingleP[whereSingleP.length - 1] == whereSingleP[whereSingleP.length - 2] + 1) {
        singlePNo = 0;
        setBet0 = 0;
      }

    }
  }


  if (statusIsFileUpload == 0 || (statusIsFileUpload == 1 && (selectedText == 'Banker' || selectedText == 'Differential' || 'Multiple Mode' == selectedText))) {
    if (checkPincre == 0 && Play2Mode == 0) {
      whereSingleB.push(hand);
      if (whereSingleB[whereSingleB.length - 1] != whereSingleB[whereSingleB.length - 2] + 1) {
        singleBNo++;
      }
      if (whereSingleB[whereSingleB.length - 1] == whereSingleB[whereSingleB.length - 2] + 1) {
        singleBNo = 0;
        setBet0B = 0;
      }
    }
  }




  if (actualWinner == 'Tie') {

    if (BetOnTieP != 0) {
      netProfitP = Borad[Borad.length - 1].playerGame.netProfit + betUnitP;
      balanceP += (8 * tieAmtP);
      indiviualPlayerBalanceInMM = 8 * tieAmtP;
      winP = 2;
      TotalTieWinP++;
      WholeWinAmountP += tieUnitP;
      maxContiuneWinP++;
      maxContiuneLossP = 0;
      if (Borad.length > 1 && maxContiuneWinP > Borad[Borad.length - 1].playerGame.maxContiuneWin) {
        saveMaxContiuneWinP = maxContiuneWinP;
      }
      brakeCountP = Borad[Borad.length - 1].playerGame.BrakeCount;
      if (balanceP >= saveMaxBalanceP) {
        saveMaxBalanceP = balanceP;
      }
    } else {
      if (Borad.length == 0) {
        netProfitP = 0;
        winP = 3;
        balanceP = 0;
        brakeCountP = 0;
      } else {
        netProfitP = Borad[Borad.length - 1].playerGame.netProfit;
        indiviualPlayerBalanceInMM = 0;
        winP = 3;
        balanceP = Borad[Borad.length - 1].playerGame.balance;
        brakeCountP = Borad[Borad.length - 1].playerGame.BrakeCount;
      }
    }

    balanceP = roundOff(balanceP, 2);

    if (BetOnTieB != 0) {
      netProfitB = Borad[Borad.length - 1].BankerGame.netProfit + betUnitB;
      balanceB += (8 * tieAmtB);
      indiviualBankerBalanceInMM = 8 * tieAmtB;
      winB = 2;
      TotalTieWinB++;
      WholeWinAmountB += tieUnitB;
      maxContiuneWinB++;
      maxContiuneLossB = 0;
      if (Borad.length > 1 && maxContiuneWinB > Borad[Borad.length - 1].BankerGame.maxContiuneWin) {
        saveMaxContiuneWinB = maxContiuneWinB;
      }
      brakeCountB = Borad[Borad.length - 1].BankerGame.BrakeCount;
      if (balanceB >= saveMaxBalanceB) {
        saveMaxBalanceB = balanceB;
      }
    } else {
      if (Borad.length == 0) {
        netProfitB = 0;
        winB = 3;
        balanceB = 0;
        BrakeCountB = 0;
      } else {
        netProfitB = Borad[Borad.length - 1].BankerGame.netProfit;
        winB = 3;
        indiviualBankerBalanceInMM = 0;
        balanceB = Borad[Borad.length - 1].BankerGame.balance;
        brakeCountB = Borad[Borad.length - 1].BankerGame.BrakeCount;
        WholeWinAmountB = Borad[Borad.length - 1].BankerGame.WholeWinAmount;
      }
    }

    balanceB = roundOff(balanceB, 2);

    if (BetOnTieD != 0) {
      netProfitD = Borad[Borad.length - 1].differential.netProfit + betUnitD;
      balanceD += (8 * tieAmtD);
      indiviualDiffBalanceInMM = 8 * tieAmtD;
      balanceD = roundOff(balanceD, 2);
      winD = 2;
      WholeWinAmountD += tieUnitD;
      maxContiuneWinD++;
      maxContiuneLossD = 0;
      if (Borad.length > 1 && maxContiuneWinD > Borad[Borad.length - 1].differential.maxContiuneWin) {
        saveMaxContiuneWinD = maxContiuneWinD;
      }
      brakeCountDiff = Borad[Borad.length - 1].differential.BrakeCount;
      if (balanceD >= saveMaxBalanceDiff) {
        saveMaxBalanceDiff = balanceD;
      }
    } else {
      if (Borad.length == 0) {
        netProfitD = 0;
        winD = 3;
        balanceD = 0;
        brakeCountDiff = 0;
      } else {
        netProfitD = Borad[Borad.length - 1].differential.netProfit;
        winD = 3;
        indiviualDiffBalanceInMM = 0;
        balanceD = Borad[Borad.length - 1].differential.balance;
        brakeCountDiff = Borad[Borad.length - 1].differential.BrakeCount;
      }
    }
    balanceD = roundOff(balanceD, 2);


    if (BetOnTieTarget != 0) {
      if (betUnitTargetB == 0) netProfitTargetB = Borad[Borad.length - 1].Target.netProfitTargetB;
      else {
        netProfitTargetB = Borad[Borad.length - 1].Target.netProfitTargetB + betUnitTargetB;
        balanceTargetB = Borad[Borad.length - 1].Target.balanceTargetB + (8 * tieAmtTarget);
        indiviualTargetBalanceInMM = 8 * tieAmtTarget;
        balanceTargetB = roundOff(balanceTargetB, 2);
        balanceTargetP = Borad[Borad.length - 1].Target.balanceTargetP;
        TotalTieWinTargetB++;
        winTargetB = 2, winTargetP = -1;
        WholeWinAmountTarget += tieUnitTarget;
        maxContiuneWinTarget++;
        maxContiuneLossTarget = 0;
        if (Borad.length > 1 && maxContiuneWinTarget > Borad[Borad.length - 1].Target.maxContiuneWin) {
          saveMaxContiuneWinTarget = maxContiuneWinTarget;
        }
      }
      if (betUnitTargetP == 0) netProfitTargetP = Borad[Borad.length - 1].Target.netProfitTargetP;
      else {
        netProfitTargetP = Borad[Borad.length - 1].Target.netProfitTargetP + betUnitTargetP;
        balanceTargetB = Borad[Borad.length - 1].Target.balanceTargetB;
        balanceTargetP = Borad[Borad.length - 1].Target.balanceTargetP + (8 * tieAmtTarget);
        indiviualTargetBalanceInMM = 8 * tieAmtTarget;
        balanceTargetP = roundOff(balanceTargetP, 2);
        TotalTieWinTargetP++;
        winTargetB = -1, winTargetP = 2;
        WholeWinAmountTarget += tieUnitTarget;
        maxContiuneWinTarget++;
        maxContiuneLossTarget = 0;
        if (Borad.length > 1 && maxContiuneWinTarget > Borad[Borad.length - 1].Target.maxContiuneWin) {
          saveMaxContiuneWinTarget = maxContiuneWinTarget;
        }
      }
      brakeCountTarget = Borad[Borad.length - 1].Target.BrakeCount;

    } else {
      if (Borad.length == 0) {
        netProfitTargetB = 0, netProfitTargetP = 0;
        balanceTargetB = 0; balanceTargetP = 0;
        winTargetB = 3, winTargetP = 3;
        TotalbalanceTarget = 0;
        brakeCountTarget = 0;
      } else {
        netProfitTargetB = Borad[Borad.length - 1].Target.netProfitTargetB;
        netProfitTargetP = Borad[Borad.length - 1].Target.netProfitTargetP;
        balanceTargetB = Borad[Borad.length - 1].Target.balanceTargetB;
        balanceTargetP = Borad[Borad.length - 1].Target.balanceTargetP;
        indiviualTargetBalanceInMM = 0;
        winTargetB = 3, winTargetP = 3;
        brakeCountTarget = Borad[Borad.length - 1].Target.BrakeCount;
        //TotalbalanceTarget = Borad[Borad.length - 1].Target.TotalbalanceTarget ;
      }
    }

    TotalbalanceTarget = roundOff(TotalbalanceTarget, 2);

    // SOW //
    if (BetOnTieSOW != 0) {
      netProfitSOW = Borad[Borad.length - 1].SOW.netProfit + betUnitSOW;
      balanceSOW += (8 * tieAmtSOW);
      indiviualSOWBalanceInMM = 8 * tieAmtSOW;
      winSOW = 2;
      noOfWinsRowInSOW++;
      // TotalTieWinSOW++;
      WholeWinUnitSOW += tieUnitSOW;
      maxContiuneWinSOW++;
      maxContiuneLossSOW = 0;
      if (Borad.length > 1 && maxContiuneWinSOW > Borad[Borad.length - 1].SOW.maxContiuneWin) {
        saveMaxContiuneWinSOW = maxContiuneWinSOW;
      }
      brakeCountSOW = Borad[Borad.length - 1].SOW.BrakeCount;
      if (balanceSOW >= saveMaxBalanceSOW) {
        saveMaxBalanceSOW = balanceSOW;
      }
    } else {
      if (Borad.length == 0) {
        netProfitSOW = 0;
        winSOW = 3;
        balanceSOW = 0;
        brakeCountSOW = 0;
      } else {
        netProfitSOW = Borad[Borad.length - 1].SOW.netProfit;
        winSOW = 3;
        indiviualSOWBalanceInMM = 0;
        balanceSOW = Borad[Borad.length - 1].SOW.balance;
        brakeCountSOW = Borad[Borad.length - 1].SOW.BrakeCount;
      }
    }

    balanceSOW = roundOff(balanceSOW, 2);

    // Zig Zag Player 
    if (BetOnTieZigZagPlayer != 0) {
      netProfitZigZagPlayer = Borad[Borad.length - 1].ZigZagPlayerGame.netProfit + betUnitZigZagPlayer;
      balanceZigZagPlayer += (8 * tieAmtZigZagPlayer);
      indiviualZigZagPlayerBalanceInMM = 8 * tieAmtZigZagPlayer;
      winZigZagPlayer = 2;
      noOfWinsRowInZigZagPlayer++;
      TotalTieWinZigZagPlayer++;
      WholeWinUnitZigZagPlayer += tieUnitZigZagPlayer;
      maxContiuneWinZigZagPlayer++;
      maxContiuneLossZigZagPlayer = 0;
      if (Borad.length > 1 && maxContiuneWinZigZagPlayer > Borad[Borad.length - 1].ZigZagPlayerGame.maxContiuneWin) {
        saveMaxContiuneWinZigZagPlayer = maxContiuneWinZigZagPlayer;
      }
      brakeCountZigZagPlayer = Borad[Borad.length - 1].ZigZagPlayerGame.BrakeCount;
      if (balanceZigZagPlayer >= saveMaxBalanceZigZagPlayer) {
        saveMaxBalanceZigZagPlayer = balanceZigZagPlayer;
      }
    } else {
      if (Borad.length == 0) {
        netProfitZigZagPlayer = 0;
        winZigZagPlayer = 3;
        balanceZigZagPlayer = 0;
        brakeCountZigZagPlayer = 0;
      } else {
        netProfitZigZagPlayer = Borad[Borad.length - 1].ZigZagPlayerGame.netProfit;
        winZigZagPlayer = 3;
        indiviualZigZagPlayerBalanceInMM = 0;
        balanceZigZagPlayer = Borad[Borad.length - 1].ZigZagPlayerGame.balance;
        brakeCountZigZagPlayer = Borad[Borad.length - 1].ZigZagPlayerGame.BrakeCount;
      }
    }

    balanceZigZagPlayer = roundOff(balanceZigZagPlayer);

    // ZigZag Banker 
    if (BetOnTieZigZagBanker != 0) {
      netProfitZigZagBanker = Borad[Borad.length - 1].ZigZagBankerGame.netProfit + betUnitZigZagBanker;
      balanceZigZagBanker += (8 * tieAmtZigZagBanker);
      indiviualZigZagBankerBalanceInMM = 8 * tieAmtZigZagBanker;
      winZigZagBanker = 2;
      noOfWinsRowInZigZagBanker++;
      TotalTieWinZigZagBanker++;
      WholeWinUnitZigZagBanker += tieUnitZigZagBanker;
      maxContiuneWinZigZagBanker++;
      maxContiuneLossZigZagBanker = 0;
      if (Borad.length > 1 && maxContiuneWinZigZagBanker > Borad[Borad.length - 1].ZigZagBankerGame.maxContiuneWin) {
        saveMaxContiuneWinZigZagBanker = maxContiuneWinZigZagBanker;
      }
      brakeCountZigZagBanker = Borad[Borad.length - 1].ZigZagBankerGame.BrakeCount;
      if (balanceZigZagBanker >= saveMaxBalanceZigZagBanker) {
        saveMaxBalanceZigZagBanker = balanceZigZagBanker;
      }
    } else {
      if (Borad.length == 0) {
        netProfitZigZagBanker = 0;
        winZigZagBanker = 3;
        balanceZigZagBanker = 0;
        brakeCountZigZagBanker = 0;
      } else {
        netProfitZigZagBanker = Borad[Borad.length - 1].ZigZagBankerGame.netProfit;
        winZigZagBanker = 3;
        indiviualZigZagBankerBalanceInMM = 0;
        balanceZigZagBanker = Borad[Borad.length - 1].ZigZagBankerGame.balance;
        brakeCountZigZagBanker = Borad[Borad.length - 1].ZigZagBankerGame.BrakeCount;
      }
    }

    balanceZigZagBanker = roundOff(balanceZigZagBanker);

    // MVD
    if (BetOnTieMVD != 0) {

      if (Borad[Borad.length - 1].MVD.SetBet == 1) {
        if (Borad[Borad.length - 1].MVD.win == 1 || Borad[Borad.length - 1].MVD.win == 2) {
          singleMVDNo = 0;
          setBet0MVD = 0;
        }
      }

      netProfitMVD = Borad[Borad.length - 1].MVD.netProfit + betUnitMVD;
      balanceMVD += (8 * tieAmtMVD);
      indiviualMVDBalanceInMM = 8 * tieAmtMVD;
      winMVD = 2;
      noOfWinsRowInMVD++;
      TotalTieWinMVD++;
      WholeWinUnitMVD += tieUnitMVD;
      maxContiuneWinMVD++;
      maxContiuneLossMVD = 0;
      if (Borad.length > 1 && maxContiuneWinMVD > Borad[Borad.length - 1].MVD.maxContiuneWin) {
        saveMaxContiuneWinMVD = maxContiuneWinMVD;
      }
      brakeCountMVD = Borad[Borad.length - 1].MVD.BrakeCount;
      if (balanceMVD >= saveMaxBalanceMVD) {
        saveMaxBalanceMVD = balanceMVD;
      }
    } else {
      if (Borad.length == 0) {
        singleMVDNo = 0;
        netProfitMVD = 0;
        winMVD = 3;
        balanceMVD = 0;
        brakeCountMVD = 0;
      } else {
        netProfitMVD = Borad[Borad.length - 1].MVD.netProfit;
        winMVD = 3;
        indiviualMVDBalanceInMM = 0;
        balanceMVD = Borad[Borad.length - 1].MVD.balance;
        brakeCountMVD = Borad[Borad.length - 1].MVD.BrakeCount;
      }
    }

    balanceMVD = roundOff(balanceMVD);

  } else if (actualWinner == 'Player') {


    if (statusIsFileUpload == 0 || (statusIsFileUpload == 1 && (selectedText == 'Player' || selectedText == 'Differential' || 'Multiple Mode' == selectedText))) {
      netProfitP += betUnitP;
      winP = 1;
      balanceP += PerUnit * betUnitP;
      indiviualPlayerBalanceInMM = PerUnit * betUnitP;
      if (BetOnTieP != 0) {
        balanceP -= tieAmtP;
        indiviualPlayerBalanceInMM -= tieAmtP;
        netProfitP -= tieUnitP;
        WholeLossAmountP += tieUnitP;
      }
      balanceP = roundOff(balanceP, 2);
      WholeWinAmountP += betUnitP;
      maxContiuneWinP++;
      maxContiuneLossP = 0;
      if (Borad.length >= 1 && maxContiuneWinP > Borad[Borad.length - 1].playerGame.maxContiuneWin) {
        saveMaxContiuneWinP = maxContiuneWinP;
      }
      if (Borad.length == 0) {
        saveMaxContiuneWinP = maxContiuneWinP;
      }
      brakeCountP = 0;

      if (balanceP >= saveMaxBalanceP) {
        saveMaxBalanceP = balanceP;
      }
      saveWinsAsPlayerP++;
      saveWinsAsBankerP = 0;
    }

    if (statusIsFileUpload == 0 || (statusIsFileUpload == 1 && (selectedText == 'Banker' || selectedText == 'Differential' || 'Multiple Mode' == selectedText))) {
      netProfitB -= betUnitB;
      indiviualBankerBalanceInMM = -1 * PerUnit * betUnitB;
      winB = 0;
      if (BetOnTieB != 0) {
        balanceB -= tieAmtB;
        netProfitB -= tieUnitB;
        indiviualBankerBalanceInMM -= tieAmtB;
        WholeLossAmountB += tieUnitB;
      }
      balanceB -= (PerUnit * betUnitB);
      balanceB = roundOff(balanceB, 2);
      WholeLossAmountB += betUnitB;
      maxContiuneWinB = 0;
      maxContiuneLossB++;
      if (Borad.length >= 1 && maxContiuneLossB > Borad[Borad.length - 1].BankerGame.maxContiuneLoss) {
        saveMaxContiuneLossB = maxContiuneLossB;
      }
      if (Borad.length == 0) {
        saveMaxContiuneLossB = maxContiuneLossB;
      }
      if (Borad.length >= 1) {
        brakeCountB = Borad[Borad.length - 1].BankerGame.BrakeCount + 1;
      } else {
        brakeCountB = 1;
      }
      saveWinsAsPlayerB = 0;
    }

  } else {

    if (statusIsFileUpload == 0 || (statusIsFileUpload == 1 && (selectedText == 'Player' || selectedText == 'Differential' || 'Multiple Mode' == selectedText))) {
      netProfitP -= betUnitP;
      indiviualPlayerBalanceInMM = -1 * PerUnit * betUnitP;
      winP = 0;
      if (BetOnTieP != 0) {
        balanceP -= tieAmtP;
        netProfitP -= tieUnitP;
        indiviualPlayerBalanceInMM -= tieAmtP;
        WholeLossAmountP += tieUnitP;
      }
      balanceP -= PerUnit * betUnitP;
      balanceP = roundOff(balanceP, 2);
      WholeLossAmountP += betUnitP;
      maxContiuneWinP = 0;
      maxContiuneLossP++;
      if (Borad.length >= 1 && maxContiuneLossP > Borad[Borad.length - 1].playerGame.maxContiuneLoss) {
        saveMaxContiuneLossP = maxContiuneLossP;
      }
      if (Borad.length >= 1) {
        brakeCountP = Borad[Borad.length - 1].playerGame.BrakeCount + 1;
      } else {
        brakeCountP = 1;
        saveMaxContiuneLossP = maxContiuneLossP;
      }
      saveWinsAsBankerP = 0;
    }

    if (statusIsFileUpload == 0 || (statusIsFileUpload == 1 && (selectedText == 'Banker' || selectedText == 'Differential' || 'Multiple Mode' == selectedText))) {

      netProfitB = netProfitB + betUnitB;
      balanceB += PerUnit * (comission4B * betUnitB / 100);
      indiviualBankerBalanceInMM = PerUnit * (comission4B * betUnitB / 100);
      if (BetOnTieB != 0) {
        balanceB -= tieAmtB;
        netProfitB -= tieUnitB;
        indiviualPlayerBalanceInMM -= tieAmtB;
        WholeLossAmountB += tieUnitB;
      }
      balanceB = roundOff(balanceB, 2);
      winB = 1;
      WholeWinAmountB += betUnitB;
      maxContiuneWinB++;
      maxContiuneLossB = 0;
      if (Borad.length >= 1 && maxContiuneWinB > Borad[Borad.length - 1].BankerGame.maxContiuneWin) {
        saveMaxContiuneWinB = maxContiuneWinB;
      }
      if (Borad.length == 0) {
        saveMaxContiuneWinB = maxContiuneWinB;
      }
      brakeCountB = 0;
      if (balanceB >= saveMaxBalanceB) {
        saveMaxBalanceB = balanceB;
      }
      saveWinsAsBankerB++;
    }


  }


  // Differential management
  if (statusIsFileUpload == 0 || (statusIsFileUpload == 1 && selectedText == 'Differential' || 'Multiple Mode' == selectedText)) {
    indiviualDiffBalanceInMM = 0;
    if (betonDiff == actualWinner && actualWinner != 'Tie') {


      if (BetOnTieD != 0) {
        balanceD -= tieAmtD;
        netProfitD -= tieUnitD;
        WholeLossAmountD += tieUnitD;
        indiviualDiffBalanceInMM -= tieAmtD;
      }

      if (betonDiff == 'Banker') {
        netProfitD = netProfitD + betUnitD;
        balanceD += PerUnit * (comission4B * betUnitD / 100);
        indiviualDiffBalanceInMM += PerUnit * (comission4B * betUnitD / 100);
        balanceD = roundOff(balanceD, 2);
        saveWinsAsBankerDiff++;
      } else {
        netProfitD += betUnitD;
        balanceD += PerUnit * (betUnitD);
        indiviualDiffBalanceInMM += PerUnit * (betUnitD);
        balanceD = roundOff(balanceD, 2);
        saveWinsAsPlayerDiff++;
      }

      WholeWinAmountD += betUnitD;
      maxContiuneWinD++;
      maxContiuneLossD = 0;
      if (Borad.length >= 1 && maxContiuneWinD > Borad[Borad.length - 1].differential.maxContiuneWin) {
        saveMaxContiuneWinD = maxContiuneWinD;
      }
      if (Borad.length == 0) {
        saveMaxContiuneWinD = maxContiuneWinD;
      }
      winD = 1;
      brakeCountDiff = 0;

      if (balanceD >= saveMaxBalanceDiff) {
        saveMaxBalanceDiff = balanceD;
      }
    } else if (actualWinner != 'Tie') {

      netProfitD -= betUnitD;
      winD = 0;
      if (BetOnTieD != 0) {
        balanceD -= tieAmtD;
        netProfitD -= tieUnitD;
        WholeLossAmountD += tieUnitD;
        indiviualDiffBalanceInMM -= tieAmtD;
      }
      balanceD -= (PerUnit * (betUnitD));
      balanceD = roundOff(balanceD, 2);
      indiviualDiffBalanceInMM -= (PerUnit * (betUnitD));


      WholeLossAmountD += betUnitD;
      maxContiuneWinD = 0;
      maxContiuneLossD++;
      if (Borad.length >= 1 && maxContiuneLossD > Borad[Borad.length - 1].differential.maxContiuneLoss) {
        saveMaxContiuneLossD = maxContiuneLossD;
      }

      if (Borad.length >= 1) {
        brakeCountDiff = Borad[Borad.length - 1].differential.BrakeCount + 1;
      } else {
        brakeCountDiff = 1;
        saveMaxContiuneLossD = maxContiuneLossD;
      }
    }


  }


  // Target Management 
  if (statusIsFileUpload == 0 || (statusIsFileUpload == 1 && selectedText == 'Target' || 'Multiple Mode' == selectedText)) {

    indiviualTargetBalanceInMM = 0;
    if (betonTarget == actualWinner && actualWinner != 'Tie') {


      if (betonTarget == 'Banker') {

        netProfitTargetB += betUnitTargetB;
        balanceTargetB += PerUnit * (comission4B * betUnitTargetB / 100);
        indiviualTargetBalanceInMM += PerUnit * (comission4B * betUnitTargetB / 100);
        saveWinsAsBankerTarget++;
        if (BetOnTieTarget != 0) {
          balanceTargetB -= tieAmtTarget;
          netProfitTargetB -= tieUnitTarget;
          WholeLossAmountTarget += tieUnitTarget;
          indiviualTargetBalanceInMM -= tieAmtTarget;
        }

        balanceTargetB = roundOff(balanceTargetB, 2);
        winTargetB = 1; winTargetP = -1;
        if (Borad.length == 0) balanceTargetP = 0;
        else balanceTargetP = Borad[Borad.length - 1].Target.balanceTargetP;

        WholeWinAmountTarget += betUnitTargetB;
        maxContiuneWinTarget++;
        maxContiuneLossTarget = 0;
        if (Borad.length >= 1 && maxContiuneWinTarget > Borad[Borad.length - 1].Target.maxContiuneWin) {
          saveMaxContiuneWinTarget = maxContiuneWinTarget;
        }
        if (Borad.length == 0) {
          saveMaxContiuneWinTarget = maxContiuneWinTarget;
        }

      } else {
        netProfitTargetP += betUnitTargetP;
        balanceTargetP += PerUnit * betUnitTargetP;
        indiviualTargetBalanceInMM += PerUnit * betUnitTargetP;

        if (BetOnTieTarget != 0) {
          balanceTargetP -= tieAmtTarget;
          netProfitTargetP -= tieUnitTarget;
          WholeLossAmountTarget += tieUnitTarget;
          indiviualTargetBalanceInMM -= tieAmtTarget;
        }
        balanceTargetP = roundOff(balanceTargetP, 2);
        if (Borad.length == 0) balanceTargetB = 0;
        else balanceTargetB = Borad[Borad.length - 1].Target.balanceTargetB;
        winTargetB = -1; winTargetP = 1;

        WholeWinAmountTarget += betUnitTargetP;
        maxContiuneWinTarget++;
        maxContiuneLossTarget = 0;
        if (Borad.length >= 1 && maxContiuneWinTarget > Borad[Borad.length - 1].Target.maxContiuneWin) {
          saveMaxContiuneWinTarget = maxContiuneWinTarget;
        }
        if (Borad.length == 0) {
          saveMaxContiuneWinTarget = maxContiuneWinTarget;
        }
        saveWinsAsPlayerTarget++;
      }
      brakeCountTarget = 0;

    } else if (actualWinner != 'Tie') {


      if (actualWinner == 'Banker') {
        netProfitTargetP -= betUnitTargetP;
        balanceTargetP -= PerUnit * betUnitTargetP;
        indiviualTargetBalanceInMM -= PerUnit * betUnitTargetP;
        if (BetOnTieTarget != 0) {
          balanceTargetP -= tieAmtTarget;
          netProfitTargetP -= tieUnitTarget;
          WholeLossAmountTarget += tieUnitTarget;
          indiviualTargetBalanceInMM -= tieAmtTarget;
        }
        balanceTargetP = roundOff(balanceTargetP, 2);
        if (Borad.length == 0) balanceTargetB = 0;
        else balanceTargetB = Borad[Borad.length - 1].Target.balanceTargetB;
        winTargetB = -1; winTargetP = 0;

        WholeLossAmountTarget += betUnitTargetP;
        maxContiuneWinTarget = 0;
        maxContiuneLossTarget++;
        if (Borad.length >= 1 && maxContiuneLossTarget > Borad[Borad.length - 1].Target.maxContiuneLoss) {
          saveMaxContiuneLossTarget = maxContiuneLossTarget;
        }
        if (Borad.length == 0) {
          saveMaxContiuneLossTarget = maxContiuneLossTarget;
        }

      } else {
        netProfitTargetB -= betUnitTargetB;
        balanceTargetB -= PerUnit * betUnitTargetB;
        indiviualTargetBalanceInMM -= PerUnit * betUnitTargetB;
        if (BetOnTieTarget != 0) {
          balanceTargetB -= tieAmtTarget;
          netProfitTargetB -= tieUnitTarget;
          WholeLossAmountTarget += tieUnitTarget;
          indiviualTargetBalanceInMM -= tieAmtTarget;
        }
        balanceTargetB = roundOff(balanceTargetB, 2);
        if (Borad.length == 0) balanceTargetP = 0;
        else balanceTargetP = Borad[Borad.length - 1].Target.balanceTargetP;
        winTargetB = 0; winTargetP = -1;

        WholeLossAmountTarget += betUnitTargetB;
        maxContiuneWinTarget = 0;
        maxContiuneLossTarget++;
        if (Borad.length >= 1 && maxContiuneLossTarget > Borad[Borad.length - 1].Target.maxContiuneLoss) {
          saveMaxContiuneLossTarget = maxContiuneLossTarget;
        }
        if (Borad.length == 0) {
          saveMaxContiuneLossTarget = maxContiuneLossTarget;
        }
      }

      if (Borad.length >= 1) {
        brakeCountTarget = Borad[Borad.length - 1].Target.BrakeCount + 1;
      } else {
        brakeCountTarget = 1;
      }
    }

    TotalbalanceTarget = balanceTargetB + balanceTargetP;

    TotalbalanceTarget = roundOff(TotalbalanceTarget, 2);

    if (TotalbalanceTarget > saveMaxBalanceTarget) {
      saveMaxBalanceTarget = TotalbalanceTarget;
    }

  }

  // SOW MANAGEMENT 
  if (statusIsFileUpload == 0 || (statusIsFileUpload == 1 && (selectedText == 'SOW' || 'Multiple Mode' == selectedText))) {

    indiviualSOWBalanceInMM = 0;
    // calculation in 1st 2 hand 
    if (Borad.length < vaildLengthToStartGame + 1) {
      winSOW = -1; betOnSOW = null, betUnitSOW = 0;
      netProfitSOW = 0;
    }
    // after 2nd hand 
    else {

      if (betOnSOW == actualWinner && actualWinner != 'Tie') {

        netProfitSOW += betUnitSOW;
        winSOW = 1;

        // Balance
        if (actualWinner == 'Player') {
          balanceSOW += betUnitSOW * PerUnit;
          indiviualSOWBalanceInMM += PerUnit * betUnitSOW;
        } else if (actualWinner == 'Banker') {
          balanceSOW += PerUnit * (comission4B * betUnitSOW / 100);
          indiviualSOWBalanceInMM += PerUnit * (comission4B * betUnitSOW / 100);
          saveWinsAsBankerSOW++;
        }
        if (BetOnTieSOW != 0) {
          balanceSOW -= tieAmtSOW;
          netProfitSOW -= tieUnitSOW;
          WholeLossUnitSOW += tieUnitSOW;
          indiviualSOWBalanceInMM -= tieAmtSOW;
        }
        balanceSOW = roundOff(balanceSOW);
        noOfWinsRowInSOW++;

        // Variable Table
        WholeWinUnitSOW += betUnitSOW;
        maxContiuneWinSOW++;
        maxContiuneLossBanker = 0;
        if (Borad.length >= 1 && maxContiuneWinSOW > Borad[Borad.length - 1].SOW.maxContiuneWin) {
          saveMaxContiuneWinSOW = maxContiuneWinSOW;
        }
        if (Borad.length == 0) {
          saveMaxContiuneWinSOW = maxContiuneWinSOW;
        }
        brakeCountSOW = 0;

        if (balanceSOW >= saveMaxBalanceSOW) {
          saveMaxBalanceSOW = balanceSOW;
        }
        if (betOnSOW == 'Player') saveWinsAsSOWPlayer++;

      } else if (actualWinner != 'Tie') {
        winSOW = 0;
        netProfitSOW -= betUnitSOW;
        indiviualSOWBalanceInMM -= betUnitSOW * PerUnit;

        balanceSOW -= betUnitSOW * PerUnit;
        if (BetOnTieSOW != 0) {
          balanceSOW -= tieAmtSOW;
          netProfitSOW -= tieUnitSOW;
          WholeLossUnitSOW += tieUnitSOW;
          indiviualSOWBalanceInMM -= tieAmtSOW;
        }
        balanceSOW = roundOff(balanceSOW);

        WholeLossUnitSOW += betUnitSOW;
        maxContiuneWinSOW = 0;
        maxContiuneLossSOW++;
        if (Borad.length >= 1 && BrakeModeOnInPlaySOW == 1) {
          maxContiuneLossSOW--;
        }
        if (Borad.length >= 1 && maxContiuneLossSOW > Borad[Borad.length - 1].SOW.maxContiuneLoss) {
          saveMaxContiuneLossSOW = maxContiuneLossSOW;
        }
        if (Borad.length >= 1) {
          brakeCountSOW = Borad[Borad.length - 1].SOW.BrakeCount + 1;
        } else {
          brakeCountSOW = 1;
          saveMaxContiuneLossSOW = maxContiuneLossSOW;
        }
      }

    }


  }

  // Zig Zag Player MANAGEMENT
  if (statusIsFileUpload == 0 || (statusIsFileUpload == 1 && (selectedText == "ZigZag Player First" || 'Multiple Mode' == selectedText))) {

    indiviualZigZagPlayerBalanceInMM = 0;
    if (betOnZigZagPlayer == actualWinner && actualWinner != 'Tie') {

      netProfitZigZagPlayer += betUnitZigZagPlayer;
      winZigZagPlayer = 1;
      noOfWinsRowInZigZagPlayer++;
      if (betOnZigZagPlayer == 'Player') {
        balanceZigZagPlayer += PerUnit * betUnitZigZagPlayer;
        indiviualZigZagPlayerBalanceInMM += PerUnit * betUnitZigZagPlayer;
      }
      else if (betOnZigZagPlayer == 'Banker') {
        balanceZigZagPlayer += PerUnit * (betUnitZigZagPlayer * comission4B / 100);
        indiviualZigZagPlayerBalanceInMM += PerUnit * (betUnitZigZagPlayer * comission4B / 100);
        saveWinsAsBankerZigZagPlayer++;
      }

      if (BetOnTieZigZagPlayer != 0) {
        balanceZigZagPlayer -= tieAmtZigZagPlayer;
        indiviualZigZagPlayerBalanceInMM -= tieAmtZigZagPlayer;
        netProfitZigZagPlayer -= tieUnitZigZagPlayer;
        WholeLossUnitZigZagPlayer += tieUnitZigZagPlayer;
      }

      balanceZigZagPlayer = roundOff(balanceZigZagPlayer, 2);
      WholeWinUnitZigZagPlayer += betUnitZigZagPlayer;
      maxContiuneWinZigZagPlayer++;
      maxContiuneLossPlayer = 0;
      if (Borad.length >= 1 && maxContiuneWinZigZagPlayer > Borad[Borad.length - 1].ZigZagPlayerGame.maxContiuneWin) {
        saveMaxContiuneWinZigZagPlayer = maxContiuneWinZigZagPlayer;
      }
      if (Borad.length == 0) {
        saveMaxContiuneWinZigZagPlayer = maxContiuneWinZigZagPlayer;
      }
      brakeCountZigZagPlayer = 0;

      if (balanceZigZagPlayer >= saveMaxBalanceZigZagPlayer) {
        saveMaxBalanceZigZagPlayer = balanceZigZagPlayer;
      }
      if (betOnZigZagPlayer == 'Player') saveWinsAsZigZagPlayerPlayer++;

    } else if (actualWinner != 'Tie') {
      netProfitZigZagPlayer -= betUnitZigZagPlayer;
      winZigZagPlayer = 0;
      if (BetOnTieZigZagPlayer != 0) {
        balanceZigZagPlayer -= tieAmtZigZagPlayer;
        netProfitZigZagPlayer -= tieUnitZigZagPlayer;
        indiviualZigZagPlayerBalanceInMM -= tieAmtZigZagPlayer;
        WholeLossUnitZigZagPlayer += tieUnitZigZagPlayer;
      }
      balanceZigZagPlayer -= PerUnit * betUnitZigZagPlayer;
      indiviualZigZagPlayerBalanceInMM -= PerUnit * betUnitZigZagPlayer;
      balanceZigZagPlayer = roundOff(balanceZigZagPlayer, 2);
      WholeLossUnitZigZagPlayer += betUnitZigZagPlayer;
      maxContiuneWinZigZagPlayer = 0;
      maxContiuneLossZigZagPlayer++;
      if (Borad.length >= 1 && BrakeModeOnInPlayZigZagPlayer == 1) {
        maxContiuneLossZigZagPlayer--;
      }
      if (Borad.length >= 1 && maxContiuneLossZigZagPlayer > Borad[Borad.length - 1].ZigZagPlayerGame.maxContiuneLoss) {
        saveMaxContiuneLossZigZagPlayer = maxContiuneLossZigZagPlayer;
      }
      if (Borad.length >= 1) {
        brakeCountZigZagPlayer = Borad[Borad.length - 1].ZigZagPlayerGame.BrakeCount + 1;
      } else {
        brakeCountZigZagPlayer = 1;
        saveMaxContiuneLossZigZagPlayer = maxContiuneLossZigZagPlayer;
      }
    }
  }

  // Zigzag Banker MANAGEMENT
  if (statusIsFileUpload == 0 || (statusIsFileUpload == 1 && (selectedText == "ZigZag Banker First" || 'Multiple Mode' == selectedText))) {

    indiviualZigZagBankerBalanceInMM = 0;
    if (betOnZigZagBanker == actualWinner && actualWinner != 'Tie') {

      netProfitZigZagBanker += betUnitZigZagBanker;
      winZigZagBanker = 1;
      noOfWinsRowInZigZagBanker++;
      if (betOnZigZagBanker == 'Player') {
        balanceZigZagBanker += PerUnit * betUnitZigZagBanker;
        indiviualZigZagBankerBalanceInMM += PerUnit * betUnitZigZagBanker;
      }
      else if (betOnZigZagBanker == 'Banker') {
        balanceZigZagBanker += PerUnit * (betUnitZigZagBanker * comission4B / 100);
        indiviualZigZagBankerBalanceInMM += PerUnit * (betUnitZigZagBanker * comission4B / 100);
        saveWinsAsBankerZigZagBanker++;
      }

      if (BetOnTieZigZagBanker != 0) {
        balanceZigZagBanker -= tieAmtZigZagBanker;
        indiviualZigZagBankerBalanceInMM -= tieAmtZigZagBanker;
        netProfitZigZagBanker -= tieUnitZigZagBanker;
        WholeLossUnitZigZagBanker += tieUnitZigZagBanker;
      }
      balanceZigZagBanker = roundOff(balanceZigZagBanker, 2);
      WholeWinUnitZigZagBanker += betUnitZigZagBanker;
      maxContiuneWinZigZagBanker++;
      maxContiuneLossBanker = 0;
      if (Borad.length >= 1 && maxContiuneWinZigZagBanker > Borad[Borad.length - 1].ZigZagBankerGame.maxContiuneWin) {
        saveMaxContiuneWinZigZagBanker = maxContiuneWinZigZagBanker;
      }
      if (Borad.length == 0) {
        saveMaxContiuneWinZigZagBanker = maxContiuneWinZigZagBanker;
      }
      brakeCountZigZagBanker = 0;

      if (balanceZigZagBanker >= saveMaxBalanceZigZagBanker) {
        saveMaxBalanceZigZagBanker = balanceZigZagBanker;
      }
      if (betOnZigZagBanker == 'Player') saveWinsAsZigZagBankerPlayer++;

    } else if (actualWinner != 'Tie') {
      netProfitZigZagBanker -= betUnitZigZagBanker;
      winZigZagBanker = 0;
      if (BetOnTieZigZagBanker != 0) {
        balanceZigZagBanker -= tieAmtZigZagBanker;
        netProfitZigZagBanker -= tieUnitZigZagBanker;
        indiviualZigZagBankerBalanceInMM -= tieAmtZigZagBanker;
        WholeLossUnitZigZagBanker += tieUnitZigZagBanker;
      }
      balanceZigZagBanker -= PerUnit * betUnitZigZagBanker;
      indiviualZigZagBankerBalanceInMM -= PerUnit * betUnitZigZagBanker;
      balanceZigZagBanker = roundOff(balanceZigZagBanker, 2);

      WholeLossUnitZigZagBanker += betUnitZigZagBanker;
      maxContiuneWinZigZagBanker = 0;
      maxContiuneLossZigZagBanker++;
      if (Borad.length >= 1 && BrakeModeOnInPlayZigZagBanker == 1) {
        maxContiuneLossZigZagBanker--;
      }
      if (Borad.length >= 1 && maxContiuneLossZigZagBanker > Borad[Borad.length - 1].ZigZagBankerGame.maxContiuneLoss) {
        saveMaxContiuneLossZigZagBanker = maxContiuneLossZigZagBanker;
      }
      if (Borad.length >= 1) {
        brakeCountZigZagBanker = Borad[Borad.length - 1].ZigZagBankerGame.BrakeCount + 1;
      } else {
        brakeCountZigZagBanker = 1;
        saveMaxContiuneLossZigZagBanker = maxContiuneLossZigZagBanker;
      }
    }
  }

  // MVD MANAGEMENT
  if (statusIsFileUpload == 0 || (statusIsFileUpload == 1 && (selectedText == "MVD" || 'Multiple Mode' == selectedText))) {

    indiviualMVDBalanceInMM = 0;
    if (betOnMVD == actualWinner && actualWinner != 'Tie') {

      if (Borad[Borad.length - 1].MVD.SetBet == 1) {
        if (Borad[Borad.length - 1].MVD.win == 1 || Borad[Borad.length - 1].MVD.win == 2) {
          singleMVDNo = 0;
          setBet0MVD = 0;
        }
      }

      netProfitMVD += betUnitMVD;
      winMVD = 1;
      noOfWinsRowInMVD++;
      if (betOnMVD == 'Player') {
        balanceMVD += PerUnit * betUnitMVD;
        indiviualMVDBalanceInMM += PerUnit * betUnitMVD;
      }
      else if (betOnMVD == 'Banker') {
        balanceMVD += PerUnit * (betUnitMVD * comission4B / 100);
        indiviualMVDBalanceInMM += PerUnit * (betUnitMVD * comission4B / 100);
        saveWinsAsBankerMVD++;
      }

      if (BetOnTieMVD != 0) {
        balanceMVD -= tieAmtMVD;
        netProfitMVD -= tieUnitMVD;
        indiviualMVDBalanceInMM -= tieAmtMVD;
        WholeLossUnitMVD += tieUnitMVD;
      }

      balanceMVD = roundOff(balanceMVD, 2);
      WholeWinUnitMVD += betUnitMVD;
      maxContiuneWinMVD++;
      maxContiuneLossMVD = 0;
      if (Borad.length >= 1 && maxContiuneWinMVD > Borad[Borad.length - 1].MVD.maxContiuneWin) {
        saveMaxContiuneWinMVD = maxContiuneWinMVD;
      }
      if (Borad.length == 0) {
        saveMaxContiuneWinMVD = maxContiuneWinMVD;
      }
      brakeCountMVD = 0;

      if (balanceMVD >= saveMaxBalanceMVD) {
        saveMaxBalanceMVD = balanceMVD;
      }
      if (betOnMVD == 'Player') saveWinsAsMVDPlayer++;

    } else if (actualWinner != 'Tie') {
      if (Borad.length >= 1 && startGameMVD == 1) singleMVDNo = Borad[Borad.length - 1].MVD.SingleWin + 1;
      netProfitMVD -= betUnitMVD;
      winMVD = 0;
      if (BetOnTieMVD != 0) {
        balanceMVD -= tieAmtMVD;
        netProfitMVD -= tieUnitMVD;
        WholeLossUnitMVD += tieUnitMVD;
        indiviualMVDBalanceInMM -= tieAmtMVD

      }

      indiviualMVDBalanceInMM -= PerUnit * betUnitMVD;
      balanceMVD -= PerUnit * betUnitMVD;
      balanceMVD = roundOff(balanceMVD, 2);
      WholeLossUnitMVD += betUnitMVD;
      maxContiuneWinMVD = 0;
      if (startGameMVD == 1) maxContiuneLossMVD++;
      if (Borad.length >= 1 && BrakeModeOnInPlayMVD == 1) {
        maxContiuneLossMVD--;
      }
      if (Borad.length >= 1 && maxContiuneLossMVD > Borad[Borad.length - 1].MVD.maxContiuneLoss) {
        saveMaxContiuneLossMVD = maxContiuneLossMVD;
      }
      if (Borad.length >= 1) {
        brakeCountMVD = Borad[Borad.length - 1].MVD.BrakeCount + 1;
      } else {
        brakeCountMVD = 1;
        saveMaxContiuneLossMVD = maxContiuneLossMVD;
      }
    }
  }

  // Push in Table //
  pushInBoradTable();

  // For multi mode 
  if (statusIsFileUpload == 0) calindividualBalance(actualWinner);
  if (statusIsFileUpload == 0) displayAmtInLable();

  balanceManagemrnt(actualWinner);
  pushInTableINMultiMode();
  displayTable();

  if (statusIsFileUpload == 0) addInBaccaratBorad();
  if (statusIsFileUpload == 0) displayBaccaratBorad();
  if (statusIsFileUpload == 0) previewBet();
  if ((statusIsFileUpload == 0) && statusOfVariableTableShow == 1) displayvariableTable();

}

/* Push In Borad Table */
function pushInBoradTable() {

  var temp = {
    "hand": hand,
    "Play2On": Play2Mode,
    "Play3On": Play3Mode,
    Play5On: Play5Mode,
    Play4On: Play4Mode,
    "TieMode": tieMode,
    "actualWinner": actualWinner,
    "playerGame": {
      "betOn": 'Player',
      "betUnit": betUnitP,
      "netProfit": netProfitP,
      "win": winP,
      "TotalBetUnit": totalBetUnitP,
      "SingleWin": singlePNo,
      "SetBet": setBet0,
      "balance": balanceP,
      "BetOnTie": BetOnTieP,
      "TieAmount": tieAmtP,
      "TieUnit": tieUnitP,
      "TotalBetAmount": totalBetAmtP,
      "TotalTieWin": TotalTieWinP,
      "MaxBet": maxBetP,
      "WholeBetAmount": WholeBetAmountP,
      "WholeWinAmount": WholeWinAmountP,
      "WholeLossAmount": WholeLossAmountP,
      "maxContiuneWin": saveMaxContiuneWinP,
      "maxContiuneLoss": saveMaxContiuneLossP,
      "BrakeCount": brakeCountP,
      "MaxBalance": saveMaxBalanceP,
      "WinsAsPlayer": saveWinsAsPlayerP,
      "WinsAsBanker": saveWinsAsBankerP
    },
    "BankerGame": {
      "betOn": 'Banker',
      "betUnit": betUnitB,
      "netProfit": netProfitB,
      "win": winB,
      "TotalBetUnit": totalBetUnitB,
      "SingleWin": singleBNo,
      "SetBet": setBet0B,
      "balance": balanceB,
      "BetOnTie": BetOnTieB,
      "TieAmount": tieAmtB,
      "TieUnit": tieUnitB,
      "TotalBetAmount": totalBetAmtB,
      "TotalTieWin": TotalTieWinB,
      "MaxBet": maxBetB,
      "WholeBetAmount": WholeBetAmountB,
      "WholeWinAmount": WholeWinAmountB,
      "WholeLossAmount": WholeLossAmountB,
      "maxContiuneWin": saveMaxContiuneWinB,
      "maxContiuneLoss": saveMaxContiuneLossB,
      "BrakeCount": brakeCountB,
      "MaxBalance": saveMaxBalanceB,
      "WinsAsPlayer": saveWinsAsPlayerB,
      "WinsAsBanker": saveWinsAsBankerB
    },
    "differential": {
      "betOn": betonDiff,
      "betUnit": betUnitD,
      "netProfit": netProfitD,
      "win": winD,
      "TotalBetUnit": totalBetUnitD,
      "balance": balanceD,
      "BetOnTie": BetOnTieD,
      "TieUnit": tieUnitD,
      "TieAmount": tieAmtD,
      "TotalBetAmount": totalBetAmtD,
      "MaxBet": maxBetD,
      "WholeBetAmount": WholeBetAmountD,
      "WholeWinAmount": WholeWinAmountD,
      "WholeLossAmount": WholeLossAmountD,
      "maxContiuneWin": saveMaxContiuneWinD,
      "maxContiuneLoss": saveMaxContiuneLossD,
      "BrakeCount": brakeCountDiff,
      "MaxBalance": saveMaxBalanceDiff,
      "WinsAsPlayer": saveWinsAsPlayerDiff,
      "WinsAsBanker": saveWinsAsBankerDiff
    },
    "Target": {
      "betOn": betonTarget,
      "betUnitTargetB": betUnitTargetB,
      "netProfitTargetB": netProfitTargetB,
      "TotalTieWinTargetB": TotalTieWinTargetB,
      "winTargetB": winTargetB,
      "balanceTargetB": balanceTargetB,
      "betUnitTargetP": betUnitTargetP,
      "netProfitTargetP": netProfitTargetP,
      "winTargetP": winTargetP,
      "balanceTargetP": balanceTargetP,
      "TotalTieWinTargetP": TotalTieWinTargetP,
      "BetOnTie": BetOnTieTarget,
      "TieUnit": tieUnitTarget,
      "TieAmount": tieAmtTarget,
      "totalBetAmtTarget": totalBetAmtTarget,
      "TotalbalanceTarget": TotalbalanceTarget,
      "MaxBet": maxBetTarget,
      "WholeBetAmount": WholeBetAmountTarget,
      "WholeWinAmount": WholeWinAmountTarget,
      "WholeLossAmount": WholeLossAmountTarget,
      "maxContiuneWin": saveMaxContiuneWinTarget,
      "maxContiuneLoss": saveMaxContiuneLossTarget,
      "BrakeCount": brakeCountTarget,
      "MaxBalance": saveMaxBalanceTarget,
      "WinsAsPlayer": saveWinsAsPlayerTarget,
      "WinsAsBanker": saveWinsAsBankerTarget,

    },
    "SOW": {
      betOn: betOnSOW,
      betUnit: betUnitSOW,
      // SetBet : setBetSOW ,
      noOfWinsRowIn: noOfWinsRowInSOW,
      BetOnTie: BetOnTieSOW,
      TieAmount: tieAmtSOW,
      TieUnit: tieUnitSOW,
      TotalBetAmount: totalBetAmtSOW,
      netProfit: netProfitSOW,
      balance: balanceSOW,
      win: winSOW,
      sameAsWin: sameAsWinSOW,
      oppositeOfWin: oppositeOfWinSOW,
      betOnWhichParty: betOnWhichPartySOW,
      BrakeCount: brakeCountSOW,
      BrakeModeOnInPlay: BrakeModeOnInPlaySOW,
      "TotalTieWin": TotalTieWinSOW,
      "MaxBet": maxBetSOW,
      "WholeBetUnit": WholeBetUnitSOW,
      "WholeWinUnit": WholeWinUnitSOW,
      "WholeLossUnit": WholeLossUnitSOW,
      "maxContiuneWin": saveMaxContiuneWinSOW,
      "maxContiuneLoss": saveMaxContiuneLossSOW,
      "MaxBalance": saveMaxBalanceSOW,
      "WinsAsPlayer": saveWinsAsSOWPlayer,
      "WinsAsBanker": saveWinsAsBankerSOW,
      vaildLengthToStartGame: vaildLengthToStartGame

    },
    "ZigZagPlayerGame": {
      "betOn": betOnZigZagPlayer,
      "betUnit": betUnitZigZagPlayer,
      noOfWinsRowIn: noOfWinsRowInZigZagPlayer,
      "netProfit": netProfitZigZagPlayer,
      "win": winZigZagPlayer,
      "balance": balanceZigZagPlayer,
      "BetOnTie": BetOnTieZigZagPlayer,
      "TieAmount": tieAmtZigZagPlayer,
      "TieUnit": tieUnitZigZagPlayer,
      "TotalBetAmount": totalBetAmtZigZagPlayer,
      "TotalTieWin": TotalTieWinZigZagPlayer,
      "MaxBet": maxBetZigZagPlayer,
      "WholeBetUnit": WholeBetUnitZigZagPlayer,
      "WholeWinUnit": WholeWinUnitZigZagPlayer,
      "WholeLossUnit": WholeLossUnitZigZagPlayer,
      "maxContiuneWin": saveMaxContiuneWinZigZagPlayer,
      "maxContiuneLoss": saveMaxContiuneLossZigZagPlayer,
      "BrakeCount": brakeCountZigZagPlayer,
      "MaxBalance": saveMaxBalanceZigZagPlayer,
      "WinsAsPlayer": saveWinsAsZigZagPlayerPlayer,
      "WinsAsBanker": saveWinsAsBankerZigZagPlayer,
      // "AmountSelectionIndex": AmountSelectionIndexZigZagPlayer,
      BrakeModeOnInPlay: BrakeModeOnInPlayZigZagPlayer,
    },
    "ZigZagBankerGame": {
      "betOn": betOnZigZagBanker,
      "betUnit": betUnitZigZagBanker,
      "netProfit": netProfitZigZagBanker,
      noOfWinsRowIn: noOfWinsRowInZigZagBanker,
      "win": winZigZagBanker,
      "balance": balanceZigZagBanker,
      "BetOnTie": BetOnTieZigZagBanker,
      "TieAmount": tieAmtZigZagBanker,
      "TieUnit": tieUnitZigZagBanker,
      "TotalBetAmount": totalBetAmtZigZagBanker,
      "TotalTieWin": TotalTieWinZigZagBanker,
      "MaxBet": maxBetZigZagBanker,
      "WholeBetUnit": WholeBetUnitZigZagBanker,
      "WholeWinUnit": WholeWinUnitZigZagBanker,
      "WholeLossUnit": WholeLossUnitZigZagBanker,
      "maxContiuneWin": saveMaxContiuneWinZigZagBanker,
      "maxContiuneLoss": saveMaxContiuneLossZigZagBanker,
      "BrakeCount": brakeCountZigZagBanker,
      "MaxBalance": saveMaxBalanceZigZagBanker,
      "WinsAsPlayer": saveWinsAsZigZagBankerPlayer,
      "WinsAsBanker": saveWinsAsBankerZigZagBanker,
      // "AmountSelectionIndex": AmountSelectionIndexZigZagBanker,
      BrakeModeOnInPlay: BrakeModeOnInPlayZigZagBanker,
    },
    MVD: {
      betOn: betOnMVD,
      SetBet: setBet0MVD,
      SingleWin: singleMVDNo,
      startGameMVD: startGameMVD,
      setBanker1stTime: setBanker1stTime,
      "betUnit": betUnitMVD,
      noOfWinsRowIn: noOfWinsRowInMVD,
      "netProfit": netProfitMVD,
      "win": winMVD,
      "balance": balanceMVD,
      "BetOnTie": BetOnTieMVD,
      "TieAmount": tieAmtMVD,
      "TieUnit": tieUnitMVD,
      "TotalBetAmount": totalBetAmtMVD,
      "TotalTieWin": TotalTieWinMVD,
      "MaxBet": maxBetMVD,
      "WholeBetUnit": WholeBetUnitMVD,
      "WholeWinUnit": WholeWinUnitMVD,
      "WholeLossUnit": WholeLossUnitMVD,
      "maxContiuneWin": saveMaxContiuneWinMVD,
      "maxContiuneLoss": saveMaxContiuneLossMVD,
      "BrakeCount": brakeCountMVD,
      "MaxBalance": saveMaxBalanceMVD,
      "WinsAsPlayer": saveWinsAsMVDPlayer,
      "WinsAsBanker": saveWinsAsBankerMVD,
      BrakeModeOnInPlay: BrakeModeOnInPlayMVD,
    }

  }

  Borad.push(temp);


}

// Display Board //
function displayTable() {

  if (selectedText == "Multiple Mode") {
    displayTableINMultiMode();
    return;
  }

  let html = "<table class = 'table' id = 'borad-table' >";
  html += `<thead>  <tr>
            <th class = "col-xs-1">Hand</th>
            <th class = "col-xs-6 bet-width">Bet</th>
            <th class = "col-xs-2">Amount</th>
            <th class = "col-xs-2">Tie Amount</th>
            <th class = "col-xs-2">Total Amount</th>
            <th class = "col-xs-1">Results</th>
            <th class = "col-xs-1">Balance</th>
         </tr></thead>` ;

  for (var i = Borad.length - 1; i > -1; i--) {
    html += "<tr>";

    html += "<td >" + Borad[i].hand;
    if (Borad[i].Play5On == 1) {
      html += "<span class='play5'>*</span>";
    } else if (Borad[i].Play4On == 1) {
      html += "<span class='play4'>*</span>";
    } else if (Borad[i].Play2On == 1 && Borad[i].Play3On == 1) {
      html += "<span class='play3'>*</span>";
    } else if (Borad[i].Play2On == 1 && Borad[i].Play3On == 0) {
      html += "<span class='play2'>*</span>";
    }

    if (Borad[i].TieMode == 1) {
      html += "<span class='super-script'>T</span>";
    }
    html += "</td>";
    if (selectedText == 'Player') {
      html += "<td class='boradTableinPlayer'>P</td>";
      html += "<td>" + PerUnit * Borad[i].playerGame.betUnit + "</td>";
      html += "<td>" + Borad[i].playerGame.TieAmount + "</td>";
      html += "<td>" + Borad[i].playerGame.TotalBetAmount + "</td>";

      if (Borad[i].actualWinner == 'Player') {
        html += "<td class='boradTableinPlayer'>P</td>";
      } else if (Borad[i].actualWinner == 'Tie') {
        html += "<td class='boradTableinTie'>T</td>";
      }
      else {
        html += "<td class='boradTableinBanker'>B</td>";
      }
      if (0 > Borad[i].playerGame.balance) html += "<td class='boradTableinBanker'>" + Borad[i].playerGame.balance + "</td>";
      else html += "<td>" + Borad[i].playerGame.balance + "</td>";
    }
    else if (selectedText == 'Banker') {
      html += "<td class='boradTableinBanker'>B</td>";
      html += "<td>" + PerUnit * Borad[i].BankerGame.betUnit + "</td>";
      html += "<td>" + Borad[i].BankerGame.TieAmount + "</td>";
      html += "<td>" + Borad[i].BankerGame.TotalBetAmount + "</td>";

      if (Borad[i].actualWinner == 'Player') {
        html += "<td class='boradTableinPlayer'>P</td>";
      } else if (Borad[i].actualWinner == 'Tie') {
        html += "<td class='boradTableinTie'>T</td>";
      }
      else {
        html += "<td class='boradTableinBanker'>B</td>";
      }
      if (0 > Borad[i].BankerGame.balance) html += "<td class='boradTableinBanker'>" + Borad[i].BankerGame.balance + "</td>";
      else html += "<td>" + Borad[i].BankerGame.balance + "</td>";
    }
    else if (selectedText == 'Differential') {
      if (Borad[i].differential.betOn == 'Player') {
        html += "<td class='boradTableinPlayer'>P</td>";
      } else {
        html += "<td class='boradTableinBanker'>B</td>";
      }
      html += "<td>" + PerUnit * Borad[i].differential.betUnit + "</td>";
      html += "<td>" + Borad[i].differential.TieAmount + "</td>";
      html += "<td>" + Borad[i].differential.TotalBetAmount + "</td>";

      if (Borad[i].actualWinner == 'Player') {
        html += "<td class='boradTableinPlayer'>P</td>";
      } else if (Borad[i].actualWinner == 'Tie') {
        html += "<td class='boradTableinTie'>T</td>";
      }
      else {
        html += "<td class='boradTableinBanker'>B</td>";
      }
      if (0 > Borad[i].differential.balance) html += "<td class='boradTableinBanker'>" + Borad[i].differential.balance + "</td>";
      else html += "<td>" + Borad[i].differential.balance + "</td>";
    } else if (selectedText == 'Target') {
      if (Borad[i].Target.betOn == 'Player') {
        html += "<td class='boradTableinPlayer'>P</td>";
        html += "<td>" + PerUnit * Borad[i].Target.betUnitTargetP + "</td>";
      } else {
        html += "<td class='boradTableinBanker'>B</td>";
        html += "<td>" + PerUnit * Borad[i].Target.betUnitTargetB + "</td>";
      }

      html += "<td>" + Borad[i].Target.TieAmount + "</td>";
      html += "<td>" + Borad[i].Target.totalBetAmtTarget + "</td>";

      if (Borad[i].actualWinner == 'Player') {
        html += "<td class='boradTableinPlayer'>P</td>";
      } else if (Borad[i].actualWinner == 'Tie') {
        html += "<td class='boradTableinTie'>T</td>";
      }
      else {
        html += "<td class='boradTableinBanker'>B</td>";
      }

      if (0 > Borad[i].Target.TotalbalanceTarget) html += "<td class='boradTableinBanker'>" + Borad[i].Target.TotalbalanceTarget + "</td>";
      else html += "<td>" + Borad[i].Target.TotalbalanceTarget + "</td>";
    }  // SOW //
    else if (selectedText == 'SOW') {
      if (Borad[i].SOW.betOn == 'Player') html += "<td class='boradTableinPlayer'>P</td>";
      else if (Borad[i].SOW.betOn == 'Banker') html += "<td class='boradTableinBanker'>B</td>";
      else html += "<td> -- </td>";

      html += "<td>" + PerUnit * Borad[i].SOW.betUnit + "</td>";
      html += "<td>" + Borad[i].SOW.TieAmount + "</td>";
      html += "<td>" + Borad[i].SOW.TotalBetAmount + "</td>";


      if (Borad[i].actualWinner == 'Player') {
        html += "<td class='boradTableinPlayer'>P</td>";
      } else if (Borad[i].actualWinner == 'Tie') {
        html += "<td class='boradTableinTie'>T</td>";
      }
      else {
        html += "<td class='boradTableinBanker'>B</td>";
      }

      if (0 > Borad[i].SOW.balance) html += "<td class='boradTableinBanker'>" + Borad[i].SOW.balance + "</td>";
      else html += "<td>" + Borad[i].SOW.balance + "</td>";

      if (displayRugth == 1) {
        html += `<td> ${Borad[i].SOW.vaildLengthToStartGame} </td>`
        html += "<td>" + Borad[i].SOW.sameAsWin + " </td>";
        html += "<td>" + Borad[i].SOW.betOnWhichParty + "</td>";
      }

    } else if (selectedText == 'ZigZag Player First') {
      if (Borad[i].ZigZagPlayerGame.betOn == 'Player') html += "<td class='boradTableinPlayer'>P</td>";
      else html += "<td class='boradTableinBanker'>B</td>";
      html += "<td>" + PerUnit * Borad[i].ZigZagPlayerGame.betUnit + "</td>";
      html += "<td>" + Borad[i].ZigZagPlayerGame.TieAmount + "</td>";
      html += "<td>" + Borad[i].ZigZagPlayerGame.TotalBetAmount + "</td>";

      if (Borad[i].actualWinner == 'Player') {
        html += "<td class='boradTableinPlayer'>P</td>";
      } else if (Borad[i].actualWinner == 'Tie') {
        html += "<td class='boradTableinTie'>T</td>";
      }
      else {
        html += "<td class='boradTableinBanker'>B</td>";
      }
      if (0 > Borad[i].ZigZagPlayerGame.balance) html += "<td class='boradTableinBanker'>" + Borad[i].ZigZagPlayerGame.balance + "</td>";
      else html += "<td>" + Borad[i].ZigZagPlayerGame.balance + "</td>";

    } else if (selectedText == 'ZigZag Banker First') {
      if (Borad[i].ZigZagBankerGame.betOn == 'Player') html += "<td class='boradTableinPlayer'>P</td>";
      else html += "<td class='boradTableinBanker'>B</td>";
      html += "<td>" + PerUnit * Borad[i].ZigZagBankerGame.betUnit + "</td>";
      html += "<td>" + Borad[i].ZigZagBankerGame.TieAmount + "</td>";
      html += "<td>" + Borad[i].ZigZagBankerGame.TotalBetAmount + "</td>";

      if (Borad[i].actualWinner == 'Player') {
        html += "<td class='boradTableinPlayer'>P</td>";
      } else if (Borad[i].actualWinner == 'Tie') {
        html += "<td class='boradTableinTie'>T</td>";
      }
      else {
        html += "<td class='boradTableinBanker'>B</td>";
      }
      if (0 > Borad[i].ZigZagBankerGame.balance) html += "<td class='boradTableinBanker'>" + Borad[i].ZigZagBankerGame.balance + "</td>";
      else html += "<td>" + Borad[i].ZigZagBankerGame.balance + "</td>";

      if (displayRugth == 1) {
        html += "<td>" + Borad[i].ZigZagBankerGame.netProfit + "</td>";
        html += "<td>" + Borad[i].ZigZagBankerGame.noOfWinsRowIn + "</td>";
      }

    } else if (selectedText == "MVD") {
      if (Borad[i].MVD.betOn == 'Player') html += "<td class='boradTableinPlayer'>P</td>";
      else if (Borad[i].MVD.betOn == 'Banker') html += "<td class='boradTableinBanker'>B</td>";
      else html += "<td> -- </td>";

      html += "<td>" + PerUnit * Borad[i].MVD.betUnit + "</td>";
      html += "<td>" + Borad[i].MVD.TieAmount + "</td>";
      html += "<td>" + Borad[i].MVD.TotalBetAmount + "</td>";

      if (Borad[i].actualWinner == 'Player') {
        html += "<td class='boradTableinPlayer'>P</td>";
      } else if (Borad[i].actualWinner == 'Tie') {
        html += "<td class='boradTableinTie'>T</td>";
      } else {
        html += "<td class='boradTableinBanker'>B</td>";
      }

      if (0 > Borad[i].MVD.balance) html += "<td class='boradTableinBanker'>" + Borad[i].MVD.balance + "</td>";
      else html += "<td>" + Borad[i].MVD.balance + "</td>";

    }


    html += "</tr>";

  }
  html += "</table>";

  if (IschangePreferencesOn == 1) document.getElementById("Borad-listINCP").innerHTML = html;
  else document.getElementById("Borad-list").innerHTML = html;

}

/* Undo Function */
function undo() {


  Borad.pop();
  if (Borad.length == 0) {
    clearTable();
    displayTable();
    return;
  }
  changeDataTable();

  if (document.getElementById('flexCheckDefault').checked == true) {
    tieMode = 1;
  }

  return;

}

// Display Variable Table //
function displayvariableTable() {

  document.getElementById('showVaribleTableBtn').innerHTML = `
<button type="button" class="btn btn-dark" onclick="hideVariableTable()" id="quit">Hide Variable Table</button>
`;

  if (statusOfRS == 1) {
    document.getElementById('showVaribleTableBtn').innerHTML = `
  <button type="button" class="btn btn-dark" onclick="hideVariableTable()">Hide Variable Table</button>
  `;

  }

  html = "<table class = 'table' id = 'startGameDataTable' >";

  html += `<tr>
  <th class = "col-1">Player Wins</th>
  <th class = "col-1">Banker Wins</th>
  <th class = "col-1">Wins As Player/Banker</th>
  <th class = "col-1">Max Stake</th>
  <th class = "col-1">Max Balance</th>
  <th class = "col-1">Return</th>
  `;

  html += '</tr>';
  html += '<tr>';

  if (Borad.length == 0) {
    html += '<td>' + 0 + '</td>';
    html += '<td>' + 0 + '</td>';
    html += '<td>' + 0 + '/0</td>';
    html += '<td>' + 0 + '</td>';
    html += '<td>' + 0 + '</td>';
    html += '<td>' + 0 + '</td>';
  } else {

    html += '<td>' + noOfPlayer + '</td>';
    html += '<td>' + noOfBanker + '</td>';
    if (selectedText == 'Player') {
      html += '<td>' + Borad[Borad.length - 1].playerGame.WinsAsPlayer + '/' + Borad[Borad.length - 1].playerGame.WinsAsBanker + '</td>';
      // html += '<td>' + 0 + '</td>';
      html += '<td>' + Borad[Borad.length - 1].playerGame.MaxBet + '</td>';
      html += '<td>' + Borad[Borad.length - 1].playerGame.MaxBalance + '</td>';
      html += '<td>' + Borad[Borad.length - 1].playerGame.balance + '</td>';
    } else if (selectedText == 'Banker') {

      html += '<td>' + Borad[Borad.length - 1].BankerGame.WinsAsPlayer + '/' + Borad[Borad.length - 1].BankerGame.WinsAsBanker + '</td>';
      // html += '<td>' + 0 + '</td>';
      html += '<td>' + Borad[Borad.length - 1].BankerGame.MaxBet + '</td>';
      html += '<td>' + Borad[Borad.length - 1].BankerGame.MaxBalance + '</td>';
      html += '<td>' + Borad[Borad.length - 1].BankerGame.balance + '</td>';

    } else if (selectedText == 'Differential') {

      html += '<td>' + Borad[Borad.length - 1].differential.WinsAsPlayer + '/' + Borad[Borad.length - 1].differential.WinsAsBanker + '</td>';
      // html += '<td>' + 0 + '</td>';
      html += '<td>' + Borad[Borad.length - 1].differential.MaxBet + '</td>';
      html += '<td>' + Borad[Borad.length - 1].differential.MaxBalance + '</td>';
      html += '<td>' + Borad[Borad.length - 1].differential.balance + '</td>';

    } else if (selectedText == 'Target') {

      html += '<td>' + Borad[Borad.length - 1].Target.WinsAsPlayer + '/' + Borad[Borad.length - 1].Target.WinsAsBanker + '</td>';
      html += '<td>' + Borad[Borad.length - 1].Target.MaxBet + '</td>';
      html += '<td>' + Borad[Borad.length - 1].Target.MaxBalance + '</td>';
      html += '<td>' + Borad[Borad.length - 1].Target.TotalbalanceTarget + '</td>';

    } else if (selectedText == "Multiple Mode") {

      html += '<td>' + BoradForMultiMode[BoradForMultiMode.length - 1].winASPlayer + '/' + BoradForMultiMode[BoradForMultiMode.length - 1].WinsAsBanker + '</td>';
      html += '<td>' + BoradForMultiMode[BoradForMultiMode.length - 1].maxBet + '</td>';
      html += '<td>' + BoradForMultiMode[BoradForMultiMode.length - 1].maxBalance + '</td>';
      html += '<td>' + BoradForMultiMode[BoradForMultiMode.length - 1].balance + '</td>';

    } else if (selectedText == 'SOW') {
      html += '<td>' + Borad[Borad.length - 1].SOW.WinsAsPlayer + '/' + Borad[Borad.length - 1].SOW.WinsAsBanker + '</td>';
      html += '<td>' + Borad[Borad.length - 1].SOW.MaxBet + '</td>';
      html += '<td>' + Borad[Borad.length - 1].SOW.MaxBalance + '</td>';
      html += '<td>' + Borad[Borad.length - 1].SOW.balance + '</td>';

    } else if (selectedText == 'ZigZag Player First') {

      html += '<td>' + Borad[Borad.length - 1].ZigZagPlayerGame.WinsAsPlayer + '/' + Borad[Borad.length - 1].ZigZagPlayerGame.WinsAsBanker + '</td>';
      html += '<td>' + Borad[Borad.length - 1].ZigZagPlayerGame.MaxBet + '</td>';
      html += '<td>' + Borad[Borad.length - 1].ZigZagPlayerGame.MaxBalance + '</td>';
      html += '<td>' + Borad[Borad.length - 1].ZigZagPlayerGame.balance + '</td>';

    } else if (selectedText == 'ZigZag Banker First') {

      html += '<td>' + Borad[Borad.length - 1].ZigZagBankerGame.WinsAsPlayer + '/' + Borad[Borad.length - 1].ZigZagBankerGame.WinsAsBanker + '</td>';
      html += '<td>' + Borad[Borad.length - 1].ZigZagBankerGame.MaxBet + '</td>';
      html += '<td>' + Borad[Borad.length - 1].ZigZagBankerGame.MaxBalance + '</td>';
      html += '<td>' + Borad[Borad.length - 1].ZigZagBankerGame.balance + '</td>';

    } else if (selectedText == 'MVD') {

      html += '<td>' + Borad[Borad.length - 1].MVD.WinsAsPlayer + '/' + Borad[Borad.length - 1].MVD.WinsAsBanker + '</td>';
      html += '<td>' + Borad[Borad.length - 1].MVD.MaxBet + '</td>';
      html += '<td>' + Borad[Borad.length - 1].MVD.MaxBalance + '</td>';
      html += '<td>' + Borad[Borad.length - 1].MVD.balance + '</td>';

    }

  }


  html += `</tr><tr>
  <th class = "col-1">Wins In A Row</th>
  <th class = "col-1">Losses In A Row</th>
  <th class = "col-1">Average Bet</th>
  <th class = "col-1">Average Win Per Game</th>
  <th class = "col-1">Average Loss Per Game</th>
  <th class = "col-1">Win %</th>
  `;


  html += '</tr>';
  html += '<tr>';

  if (Borad.length == 0) {
    html += '<td>' + 0 + '</td>';
    html += '<td>' + 0 + '</td>';
    html += '<td>' + 0 + '</td>';
    html += '<td>' + 0 + '</td>';
    html += '<td>' + 0 + '</td>';
    html += '<td>' + 0 + '</td>';
  } else {

    if (selectedText == 'Player') {
      html += '<td>' + Borad[Borad.length - 1].playerGame.maxContiuneWin + '</td>';
      html += '<td>' + Borad[Borad.length - 1].playerGame.maxContiuneLoss + '</td>';
      html += '<td>' + roundOff(Borad[Borad.length - 1].playerGame.WholeBetAmount / hand, 2) + '</td>';
      html += '<td>' + roundOff(Borad[Borad.length - 1].playerGame.WholeWinAmount / hand, 2) + '</td>';
      html += '<td>' + roundOff(Borad[Borad.length - 1].playerGame.WholeLossAmount / hand, 2) + '</td>';
      html += '<td>' + roundOff((Borad[Borad.length - 1].playerGame.WholeWinAmount * 100) / (Borad[Borad.length - 1].playerGame.WholeWinAmount + Borad[Borad.length - 1].playerGame.WholeLossAmount), 2) + '</td>';

    } else if (selectedText == 'Banker') {

      html += '<td>' + Borad[Borad.length - 1].BankerGame.maxContiuneWin + '</td>';
      html += '<td>' + Borad[Borad.length - 1].BankerGame.maxContiuneLoss + '</td>';
      html += '<td>' + roundOff(Borad[Borad.length - 1].BankerGame.WholeBetAmount / hand, 2) + '</td>';
      html += '<td>' + roundOff(Borad[Borad.length - 1].BankerGame.WholeWinAmount / hand, 2) + '</td>';
      html += '<td>' + roundOff(Borad[Borad.length - 1].BankerGame.WholeLossAmount / hand, 2) + '</td>';
      html += '<td>' + roundOff((Borad[Borad.length - 1].BankerGame.WholeWinAmount * 100) / (Borad[Borad.length - 1].BankerGame.WholeWinAmount + Borad[Borad.length - 1].BankerGame.WholeLossAmount), 2) + '</td>';


    } else if (selectedText == 'Differential') {

      html += '<td>' + Borad[Borad.length - 1].differential.maxContiuneWin + '</td>';
      html += '<td>' + Borad[Borad.length - 1].differential.maxContiuneLoss + '</td>';
      html += '<td>' + roundOff(Borad[Borad.length - 1].differential.WholeBetAmount / hand, 2) + '</td>';
      html += '<td>' + roundOff(Borad[Borad.length - 1].differential.WholeWinAmount / hand, 2) + '</td>';
      html += '<td>' + roundOff(Borad[Borad.length - 1].differential.WholeLossAmount / hand, 2) + '</td>';
      html += '<td>' + roundOff((Borad[Borad.length - 1].differential.WholeWinAmount * 100) / (Borad[Borad.length - 1].differential.WholeWinAmount + Borad[Borad.length - 1].differential.WholeLossAmount), 2) + '</td>';


    } else if (selectedText == 'Target') {

      html += '<td>' + Borad[Borad.length - 1].Target.maxContiuneWin + '</td>';
      html += '<td>' + Borad[Borad.length - 1].Target.maxContiuneLoss + '</td>';
      html += '<td>' + roundOff(Borad[Borad.length - 1].Target.WholeBetAmount / hand, 2) + '</td>';
      html += '<td>' + roundOff(Borad[Borad.length - 1].Target.WholeWinAmount / hand, 2) + '</td>';
      html += '<td>' + roundOff(Borad[Borad.length - 1].Target.WholeLossAmount / hand, 2) + '</td>';
      html += '<td>' + roundOff((Borad[Borad.length - 1].Target.WholeWinAmount * 100) / (Borad[Borad.length - 1].Target.WholeWinAmount + Borad[Borad.length - 1].Target.WholeLossAmount), 2) + '</td>';

    } else if (selectedText == "Multiple Mode") {
      html += '<td>' + BoradForMultiMode[BoradForMultiMode.length - 1].maxContiuneWin + '</td>';
      html += '<td>' + BoradForMultiMode[BoradForMultiMode.length - 1].maxContiuneLoss + '</td>';
      html += '<td>' + roundOff(BoradForMultiMode[BoradForMultiMode.length - 1].wholeBetUnit / hand) + '</td>';
      html += '<td>' + roundOff(BoradForMultiMode[BoradForMultiMode.length - 1].WholeWinUnit / hand) + '</td>';
      html += '<td>' + roundOff(BoradForMultiMode[BoradForMultiMode.length - 1].WholeLossUnit / hand) + '</td>';
      html += '<td>' + roundOff((BoradForMultiMode[BoradForMultiMode.length - 1].WholeWinUnit * 100) / (BoradForMultiMode[BoradForMultiMode.length - 1].WholeWinUnit + BoradForMultiMode[BoradForMultiMode.length - 1].WholeLossUnit), 2) + '</td>';
    } else if (selectedText == 'SOW') {

      html += '<td>' + Borad[Borad.length - 1].SOW.maxContiuneWin + '</td>';
      html += '<td>' + Borad[Borad.length - 1].SOW.maxContiuneLoss + '</td>';
      html += '<td>' + roundOff(Borad[Borad.length - 1].SOW.WholeBetUnit / hand, 2) + '</td>';
      html += '<td>' + roundOff(Borad[Borad.length - 1].SOW.WholeWinUnit / hand, 2) + '</td>';
      html += '<td>' + roundOff(Borad[Borad.length - 1].SOW.WholeLossUnit / hand, 2) + '</td>';
      html += '<td>' + roundOff((Borad[Borad.length - 1].SOW.WholeWinUnit * 100) / (Borad[Borad.length - 1].SOW.WholeWinUnit + Borad[Borad.length - 1].SOW.WholeLossUnit), 2) + '</td>';

    } else if (selectedText == 'ZigZag Player First') {

      html += '<td>' + Borad[Borad.length - 1].ZigZagPlayerGame.maxContiuneWin + '</td>';
      html += '<td>' + Borad[Borad.length - 1].ZigZagPlayerGame.maxContiuneLoss + '</td>';
      html += '<td>' + roundOff(Borad[Borad.length - 1].ZigZagPlayerGame.WholeBetUnit / hand, 2) + '</td>';
      html += '<td>' + roundOff(Borad[Borad.length - 1].ZigZagPlayerGame.WholeWinUnit / hand, 2) + '</td>';
      html += '<td>' + roundOff(Borad[Borad.length - 1].ZigZagPlayerGame.WholeLossUnit / hand, 2) + '</td>';
      html += '<td>' + roundOff((Borad[Borad.length - 1].ZigZagPlayerGame.WholeWinUnit * 100) / (Borad[Borad.length - 1].ZigZagPlayerGame.WholeWinUnit + Borad[Borad.length - 1].ZigZagPlayerGame.WholeLossUnit), 2) + '</td>';

    } else if (selectedText == 'ZigZag Banker First') {

      html += '<td>' + Borad[Borad.length - 1].ZigZagBankerGame.maxContiuneWin + '</td>';
      html += '<td>' + Borad[Borad.length - 1].ZigZagBankerGame.maxContiuneLoss + '</td>';
      html += '<td>' + roundOff(Borad[Borad.length - 1].ZigZagBankerGame.WholeBetUnit / hand, 2) + '</td>';
      html += '<td>' + roundOff(Borad[Borad.length - 1].ZigZagBankerGame.WholeWinUnit / hand, 2) + '</td>';
      html += '<td>' + roundOff(Borad[Borad.length - 1].ZigZagBankerGame.WholeLossUnit / hand, 2) + '</td>';
      html += '<td>' + roundOff((Borad[Borad.length - 1].ZigZagBankerGame.WholeWinUnit * 100) / (Borad[Borad.length - 1].ZigZagBankerGame.WholeWinUnit + Borad[Borad.length - 1].ZigZagBankerGame.WholeLossUnit), 2) + '</td>';

    } else if (selectedText == 'MVD') {

      html += '<td>' + Borad[Borad.length - 1].MVD.maxContiuneWin + '</td>';
      html += '<td>' + Borad[Borad.length - 1].MVD.maxContiuneLoss + '</td>';
      html += '<td>' + roundOff(Borad[Borad.length - 1].MVD.WholeBetUnit / hand, 2) + '</td>';
      html += '<td>' + roundOff(Borad[Borad.length - 1].MVD.WholeWinUnit / hand, 2) + '</td>';
      html += '<td>' + roundOff(Borad[Borad.length - 1].MVD.WholeLossUnit / hand, 2) + '</td>';
      html += '<td>' + roundOff((Borad[Borad.length - 1].MVD.WholeWinUnit * 100) / (Borad[Borad.length - 1].MVD.WholeWinUnit + Borad[Borad.length - 1].MVD.WholeLossUnit), 2) + '</td>';

    }
  }

  if (IschangePreferencesOn == 1) {
    document.getElementById('variableTableINCP').innerHTML = html;
    document.getElementById('variableTableINCP').style.display = 'block';
  } else {
    document.getElementById('variableTable').innerHTML = html;
    statusOfVariableTableShow = 1;
    document.getElementById('variableTable').style.display = 'block';
  }

}

function hideVariableTable() {

  document.getElementById('showVaribleTableBtn').innerHTML = `
  <button type="button" class="btn btn-dark" onclick="displayvariableTable()" id="quit">Show Variable Table</button>
  `;

  if (statusOfRS == 1) {
    document.getElementById('showVaribleTableBtn').innerHTML = `
  <button type="button" class="btn btn-dark" onclick="displayvariableTable()">Show Variable Table</button>
  `;
  }
  document.getElementById('variableTable').style.display = 'none';
  statusOfVariableTableShow = 0;

}


/* 
*
0.3 :- Baccarat Borad  
*
*/

/* Add in Baccarat Borad */
function addInBaccaratBorad() {

  var count = 0;
  var temp = {
    "winner": actualWinner,
    "color": lastWinner,
    "filled": 1,
    "hand": hand,
    "lastWinner": lastWinner,
    "noOfTie": 0
  }

  if (baccaratBoradTable[0][0].filled == 0) {

    if (temp.winner == 'Tie') {
      temp.noOfTie = 0;
    }
    baccaratBoradTable[0][0] = temp;

  } else {
    i = 0; var k = 0;
    for (j = 0; j < baccaratBoradTable[i].length; j++) {
      for (k = 0; k < baccaratBoradTable.length; k++) {
        if (count == 0 && (baccaratBoradTable[k][j].hand + 1 == temp.hand || baccaratBoradTable[k][j].noOfTie + baccaratBoradTable[k][j].hand + 1 == temp.hand)) {
          count++;

          if ((baccaratBoradTable[k][j].winner == temp.winner) && baccaratBoradTable[k][j].winner != 'Tie') {

            if (k + 1 == 6 || baccaratBoradTable[k + 1][j].filled == 1) {

              baccaratBoradTable[k][j + 1] = temp;
            }
            else {

              if (k != 0 && baccaratBoradTable[k - 1][j].filled == 0) {
                baccaratBoradTable[k][j + 1] = temp;
              }
              else {
                baccaratBoradTable[k + 1][j] = temp;
              }

            }
          }
          else if (temp.winner == 'Tie') {
            baccaratBoradTable[k][j].noOfTie++;
          }
          else {
            var a = j;
            while (baccaratBoradTable[0][a].filled == 0) {
              a--;
            }
            baccaratBoradTable[0][a + 1] = temp;
          }
          break;
        }
      }
    }
  }

  if (actualWinner == 'Banker' || actualWinner == 'Player') {
    lastWinner = actualWinner;
  }

}

/* Display Baccarat Borad */
function displayBaccaratBorad() {

  var html = '<table id="baccaratBoradcss">';
  for (i = 0; i < baccaratBoradTable.length; i++) {
    html += '<tr>';
    for (j = 0; j < baccaratBoradTable[i].length; j++) {
      if (baccaratBoradTable[i][j].winner == 'Banker') {
        if (baccaratBoradTable[i][j].noOfTie == 1) {
          html += '<td class="slash"><div class="circle circleBanker" ></div></td>';
        } else if (baccaratBoradTable[i][j].noOfTie == 0) {
          html += '<td><div class="circle circleBanker"></div></td>';
        } else {
          html += '<td class="slash"><div class="circle circleBanker">' + baccaratBoradTable[i][j].noOfTie + '</div></td>';
        }



      } else if (baccaratBoradTable[i][j].winner == 'Player') {
        if (baccaratBoradTable[i][j].noOfTie == 1) {
          html += '<td class="slash"><div class="circle circlePlayer"></div></td>';
        } else if (baccaratBoradTable[i][j].noOfTie == 0) {
          html += '<td><div class="circle circlePlayer"></div></td>';
        } else {
          html += '<td class="slash"><div class="circle circlePlayer">' + baccaratBoradTable[i][j].noOfTie + '</div></td>';
        }


      } else if (baccaratBoradTable[i][j].winner == 'Tie') {
        if (baccaratBoradTable[i][j].noOfTie == 0) html += '<td class="slash"><div class="tie-1st"></div></td>';
        else {
          var printNumber = baccaratBoradTable[i][j].noOfTie + 1;
          html += '<td class="slash">' + printNumber + '</td>';
        }
      }
      else {
        html += "<td></td>";
      }

    }
    html += '</tr>';
  }
  html += '</table>';

  if (statusIsFileUpload == 0) document.getElementById('Baccarat-Borad').innerHTML = html;
  if (statusIsFileUpload == 0) document.getElementById('Baccarat-Borad').scrollLeft = 10000;

  // window.location.reload(true);

  var html4NoDisplay = `<table id='tableForNoDisplay'><tr>
  <td class='NoDisplay4Borad' style="padding-rigth: 10px;"> #</td>
  <td class='NoDisplay4Borad'>${hand} </td>
  <td><div class="circleForNoOfB" style="background-color:#dc3545;">B</div></td>
  <td class='NoDisplay4Borad'>${noOfBanker}</td>
  <td><div class="circleForNoOfP" style="background-color:#0d6efd;">P</div></td>
  <td class='NoDisplay4Borad'>${noOfPlayer} </td>
  <td><div class="circleForNoOfT" style="background-color:#198754;">T</div></td>
  <td class='NoDisplay4Borad'>${TotalTieWin} </td>
  </tr></table>` ;
  if (statusIsFileUpload == 0) document.getElementById('NoofBP').innerHTML = html4NoDisplay;

}


// Display Preview in Multi mode 
function displayPreviewBet() {

  TotalBetAmountInMultipleMode = 0;

  if (selectedText == "Multiple Mode") bet.innerHTML = "";

  if (multipleBetOnPlayer == 0 && multipleBetOnBanker == 0) {

    if (selectedText == "Multiple Mode") {
      bet.innerHTML = '<div><span> -- </span><span> : $ -- </span></div>';
      preview.innerHTML = 'Win(W) : -- $ -- <br>  Loss(L) : -- $ -- ';
    }

    multipleBetUnitOnPlayer = 0, multipleBetUnitOnBanker = 0;

    return;

  }

  // For Normal method cal 
  if (selectedMethodType == "Normal") {

    DummymultipleBetOnPlayer = 1, DummymultipleBetOnBanker = 0;
    DummymultipleBetUnitOnPlayer = 0, DummymultipleBetUnitOnBanker = 0;

    if (multipleBetOnPlayer == 1) {
      if (selectedText == "Multiple Mode") bet.innerHTML += '<div><span class="boradTableinPlayer"> Player </span><span>: $' + multipleBetUnitOnPlayer * PerUnit + '</span></div>';
      TotalBetAmountInMultipleMode += multipleBetUnitOnPlayer * PerUnit;
      wholeBetUnitINMM += multipleBetUnitOnPlayer;
    }

    if (multipleBetOnBanker == 1) {
      if (selectedText == "Multiple Mode") bet.innerHTML += '<div><span class="boradTableinBanker"> Banker</span><span> : $' + multipleBetUnitOnBanker * PerUnit + '</span></div>';
      TotalBetAmountInMultipleMode += multipleBetUnitOnBanker * PerUnit;
      wholeBetUnitINMM += multipleBetUnitOnBanker;

    }

    if (BoradForMultiMode.length > 1 && BoradForMultiMode[BoradForMultiMode.length - 1].BrakeCount >= brakeValue && brakeValue != 0) {
      if (multipleBetOnPlayer == 1) {
        wholeBetUnitINMM -= multipleBetUnitOnPlayer;
        DummymultipleBetOnPlayer = 1
        DummymultipleBetUnitOnPlayer = multipleBetUnitOnPlayer;
      }
      if (multipleBetOnBanker == 1) {
        wholeBetUnitINMM -= multipleBetUnitOnBanker;
        DummymultipleBetOnBanker = 1;
        DummymultipleBetUnitOnBanker = multipleBetUnitOnBanker;
      }
      if (selectedText == "Multiple Mode") bet.innerHTML = '<div><span class="boradTableinPlayer"> Player </span><span>: $' + 0 + '</span></div>';
      if (selectedText == "Multiple Mode") bet.innerHTML += '<div><span class="boradTableinBanker"> Banker </span><span>: $' + 0 + '</span></div>';
      multipleBetUnitOnPlayer = 0, multipleBetUnitOnBanker = 0;
      TotalBetAmountInMultipleMode = 0;
    }
  }

  // For separete cal for differential method
  if (selectedMethodType == "Differential") {

    // Player High 
    if (multipleBetUnitOnPlayer > multipleBetUnitOnBanker) {
      multipleBetUnitOnPlayer -= multipleBetUnitOnBanker;
      wholeBetUnitINMM += multipleBetUnitOnPlayer;
      TotalBetAmountInMultipleMode += multipleBetUnitOnPlayer * PerUnit;
      multipleBetOnBanker = 0; multipleBetUnitOnBanker = 0;
      if (selectedText == "Multiple Mode") bet.innerHTML += '<div><span class="boradTableinPlayer"> Player </span><span>: $' + multipleBetUnitOnPlayer * PerUnit + '</span></div>';
    }

    // Banker High 
    else {
      multipleBetUnitOnBanker -= multipleBetUnitOnPlayer;
      wholeBetUnitINMM += multipleBetUnitOnBanker;
      TotalBetAmountInMultipleMode += multipleBetUnitOnBanker * PerUnit;
      multipleBetOnPlayer = 0; multipleBetUnitOnPlayer = 0;
      if (selectedText == "Multiple Mode") bet.innerHTML += '<div><span class="boradTableinBanker"> Banker</span><span> : $' + multipleBetUnitOnBanker * PerUnit + '</span></div>';
    }

    if (BoradForMultiMode.length > 1 && BoradForMultiMode[BoradForMultiMode.length - 1].BrakeCount >= brakeValue && brakeValue != 0) {
      if (multipleBetUnitOnPlayer > multipleBetUnitOnBanker) {
        wholeBetUnitINMM -= multipleBetUnitOnPlayer;
        DummymultipleBetOnPlayer = 1, DummymultipleBetOnBanker = 0;
        DummymultipleBetUnitOnPlayer = multipleBetUnitOnPlayer, DummymultipleBetUnitOnBanker = 0;
        if (selectedText == "Multiple Mode") bet.innerHTML = '<div><span class="boradTableinPlayer"> Player </span><span>: $' + 0 + '</span></div>';
      }
      else {
        wholeBetUnitINMM -= multipleBetUnitOnBanker;
        DummymultipleBetOnPlayer = 0, DummymultipleBetOnBanker = 1;
        DummymultipleBetUnitOnPlayer = 0, DummymultipleBetUnitOnBanker = multipleBetUnitOnBanker;
        if (selectedText == "Multiple Mode") bet.innerHTML = '<div><span class="boradTableinBanker"> Banker</span><span> : $' + 0 + '</span></div>';
      }
      multipleBetUnitOnPlayer = 0, multipleBetUnitOnBanker = 0;
      TotalBetAmountInMultipleMode = 0;
    }

  }

  if (BoradForMultiMode.length > 1 && BoradForMultiMode[BoradForMultiMode.length - 1].BrakeCount >= brakeValue && brakeValue != 0) { 
    multipleBetAmountOnTie = 0 ;
  }
  else if (multipleBetOnTie == 1) {
    if (selectedText == "Multiple Mode") bet.innerHTML += '<div><span class="boradTableinTie"> Tie Amount </span><span>: $' + multipleBetAmountOnTie + '</span></div>';
    TotalBetAmountInMultipleMode += multipleBetAmountOnTie;
    wholeBetUnitINMM += multipleBetUnitOnTie;
  }

  if (selectedText == "Multiple Mode") bet.innerHTML += '<div><span> Total Amount : $' + TotalBetAmountInMultipleMode + '</span></div>';

  // Save max total bet amt 
  if (TotalBetAmountInMultipleMode > saveMaxBetINMM) {
    saveMaxBetINMM = TotalBetAmountInMultipleMode;
  }


  if (selectedText == "Multiple Mode") {

    if (selectedMethodType == "Normal") {

      preview.innerHTML = "Win(W) : ";

      if (previewBetOnPlayerWin == 1) {
        preview.innerHTML += "Player $" + previewBetUnitPlayerWinINMM * PerUnit + " &nbsp;&nbsp;  ";
      }

      if (previewBetOnBankerWin == 1) {
        preview.innerHTML += "Banker $" + previewBetUnitBankerWinINMM * PerUnit;
      }

      preview.innerHTML += "<br>Loss(L) : ";

      if (BoradForMultiMode.length > 1 && BoradForMultiMode[BoradForMultiMode.length - 1].BrakeCount + 1 >= brakeValue && brakeValue != 0) {
        preview.innerHTML += "Player  $" + 0 + " &nbsp; &nbsp;  ";
        preview.innerHTML += " Banker $" + 0;
      } else {
        if (previewBetOnPlayerLoss == 1) {
          preview.innerHTML += "Player  $" + previewBetUnitPlayerLossINMM * PerUnit + " &nbsp; &nbsp;  ";
        }

        if (previewBetOnBankerLoss == 1) {
          preview.innerHTML += " Banker $" + previewBetUnitBankerLossINMM * PerUnit;
        }
      }
    }

    if (selectedMethodType == "Differential") {

      preview.innerHTML = "Win(W) : ";

      if (previewBetUnitPlayerWinINMM > previewBetUnitBankerWinINMM) {
        previewBetUnitPlayerWinINMM -= previewBetUnitBankerWinINMM;
        previewBetOnBankerWin = 0;
        preview.innerHTML += "Player $" + previewBetUnitPlayerWinINMM * PerUnit + " &nbsp;&nbsp;  ";

      } else {
        previewBetUnitBankerWinINMM -= previewBetUnitPlayerWinINMM;
        previewBetOnPlayerWin = 0;
        preview.innerHTML += "Banker $" + previewBetUnitBankerWinINMM * PerUnit;

      }

      preview.innerHTML += "<br>Loss(L) : ";

      if (BoradForMultiMode.length > 1 && BoradForMultiMode[BoradForMultiMode.length - 1].BrakeCount + 1 >= brakeValue && brakeValue != 0) {
        if (previewBetUnitPlayerLossINMM > previewBetUnitBankerLossINMM) {
          preview.innerHTML += "Player  $" + 0 + " &nbsp; &nbsp;  ";

        } else {
          preview.innerHTML += " Banker $" + 0;
        }
      } else {
        if (previewBetUnitPlayerLossINMM > previewBetUnitBankerLossINMM) {
          previewBetOnPlayerLoss = 0;
          previewBetUnitPlayerLossINMM -= previewBetUnitBankerLossINMM;
          preview.innerHTML += "Player  $" + previewBetUnitPlayerLossINMM * PerUnit + " &nbsp; &nbsp;  ";

        } else {
          previewBetOnBankerLoss = 0;
          previewBetUnitBankerLossINMM -= previewBetUnitPlayerLossINMM;
          preview.innerHTML += " Banker $" + previewBetUnitBankerLossINMM * PerUnit;
        }
      }

    }

  }

}




