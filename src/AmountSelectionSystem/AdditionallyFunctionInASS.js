/* 
*
1 :- Stop Loss , Stop Profit , Max Bet , Max Hand
*
*/

/* Max Hand Chnage */
function changeMaxHand() {
  if (document.getElementById('MaxHandId').value > 1) maxHandNo = document.getElementById('MaxHandId').value;
  else if (document.getElementById('MaxHandId').value == 0) maxHandNo = 0;
  else document.getElementById('MaxHandId').value = 1, maxHandNo = 1;

  maxHnadNotices = 0;
  previewBet();
}

/* Change in Stop Loss */
function changeStopLoss() {
  if (document.getElementById('StopLossID').value >= 0) {
    stopLossNo = -1 * document.getElementById('StopLossID').value;
  } else {
    stopLossNo = document.getElementById('StopLossID').value;
  }
  stopLossNotices = 0, stopLossIN = null;
  previewBet();

}

/* Change in Stop Profit */
function changeStopProfit() {

  if (document.getElementById("StopProfitID").value > 0) {
    stopProfitNo = document.getElementById("StopProfitID").value;
  } else {
    document.getElementById("StopProfitID").value = 1;
    stopProfitNo = document.getElementById("StopProfitID").value;
  }
  stopProfitNotices = 0, stopProfitIN = null;
  previewBet();

}

/* Change in Max Bet Unit */
function changeMaxBet() {
  if (document.getElementById('MaxBetID').value > 0) {
    maxBetNo = document.getElementById('MaxBetID').value;
  } else {
    document.getElementById('MaxBetID').value = 1;
    maxBetNo = document.getElementById('MaxBetID').value;
  }
  maxBetNotices = 0, maxBetIN = null;
  previewBet();

}

// check Max Hand 
function checkMaxHand() {

  if (hand >= maxHandNo) {

    if (statusIsFileUpload == 0 && maxHnadNotices == 0) {

      document.getElementById("oc").innerHTML = '<h4>You have about to exceed your max hand(' + hand + ').</h4><br> <h3> So you want play continue !? </h3>';
      document.getElementById("oc").innerHTML += ` <br><br>
           <button type="button" class="btn btn-success" onclick='closeNav()'>Yes</button>
           <button type="button" class="btn btn-danger" onclick='stopGame()'>No</button>
           <button type="button" class="btn btn-primary" onclick="nextNotices('nextNoticesMaxHnad')">You Want Next Notices !? </button>
           `;
      maxHnadNotices = 1;
      openNav();
    } else if (maxHnadNotices == 0) {

      if (statusOfRSMode1 == 1 || statusOfRSMode2 == 1) {

        stopGameInRS = 1;

      } else {

        tempWinnerToSaveWinnerName = excelRows[startNumber - 1]['Hand ' + count4ShoesHand];
        excelRows[startNumber - 1]['Hand ' + count4ShoesHand] = "null";
      }


    }
  }
}

/* Check For Stop Loss */
function checkStopLoss() {

  stopLossIN = null;
  if (stopLossNo > 0) {
    stopLossNo = -1 * stopLossNo;
  }

  if (stopLossNo >= Borad[Borad.length - 1].playerGame.netProfit - betUnitPlayer - tieUnitPlayer && ('Player' == gameMode
    || (selectedGameModeInMultipleMode['Player'] == 1 && gameMode == "Multiple Mode"))) {
    stopLossIN = 'Player';
    netStopLoss = Borad[Borad.length - 1].playerGame.netProfit - betUnitPlayer - tieUnitPlayer;
  }

  if (stopLossNo >= Borad[Borad.length - 1].BankerGame.netProfit - betUnitBanker - tieUnitBanker && ('Banker' == gameMode
    || (selectedGameModeInMultipleMode['Banker'] == 1 && gameMode == "Multiple Mode"))) {
    stopLossIN = 'Banker';
    netStopLoss = Borad[Borad.length - 1].BankerGame.netProfit - betUnitBanker - tieUnitBanker;
  }

  if (stopLossNo >= Borad[Borad.length - 1].differential.netProfit - betUnitDifferential - tieUnitDifferential && ('Differential' == gameMode
    || (selectedGameModeInMultipleMode['Differential'] == 1 && gameMode == "Multiple Mode"))) {
    stopLossIN = 'Differential';
    netStopLoss = Borad[Borad.length - 1].differential.netProfit - betUnitDifferential - tieUnitDifferential;
  }

  // if (stopLossNo >= BoradForMultiMode[BoradForMultiMode.length - 1].netProfit - multipleBetUnitOnPlayer - multipleBetUnitOnTie + multipleBetUnitOnBanker && (gameMode == "Multiple Mode")) {
  //   stopLossIN = "Multiple Mode";
  //   netStopLoss = BoradForMultiMode[BoradForMultiMode.length - 1].netProfit - multipleBetUnitOnPlayer - multipleBetUnitOnTie + multipleBetUnitOnBanker;
  // }

  // if (stopLossNo >= BoradForMultiMode[BoradForMultiMode.length - 1].netProfit + multipleBetUnitOnPlayer - multipleBetUnitOnTie - multipleBetUnitOnBanker && (gameMode == "Multiple Mode")) {
  //   stopLossIN = "Multiple Mode";
  //   netStopLoss = BoradForMultiMode[BoradForMultiMode.length - 1].netProfit + multipleBetUnitOnPlayer - multipleBetUnitOnTie - multipleBetUnitOnBanker;
  // }

  if (stopLossNo >= Borad[Borad.length - 1].ZigZagPlayerGame.netProfit - betUnitZigZagPlayer - tieUnitZigZagPlayer && (gameMode == 'ZigZag Player First'
    || (selectedGameModeInMultipleMode['ZigZagPlayerFirst'] == 1 && gameMode == "Multiple Mode"))) {
    stopLossIN = 'ZigZag Player First';
    netStopLoss = Borad[Borad.length - 1].ZigZagPlayerGame.netProfit - betUnitZigZagPlayer - tieUnitZigZagPlayer;
  }

  if (stopLossNo >= Borad[Borad.length - 1].ZigZagBankerGame.netProfit - betUnitZigZagBanker - tieUnitZigZagBanker && (gameMode == 'ZigZag Banker First'
    || (selectedGameModeInMultipleMode['ZigZagBankerFirst'] == 1 && gameMode == "Multiple Mode"))) {
    stopLossIN = 'ZigZag Banker First';
    netStopLoss = Borad[Borad.length - 1].ZigZagBankerGame.netProfit - betUnitZigZagBanker - tieUnitZigZagBanker;
  }

  if (stopLossNo >= Borad[Borad.length - 1].SOW.netProfit - betUnitSOW - tieUnitSOW && (gameMode == 'SOW'
    || (selectedGameModeInMultipleMode['SOW'] == 1 && gameMode == "Multiple Mode"))) {
    stopLossIN = 'SOW';
    netStopLoss = Borad[Borad.length - 1].SOW.netProfit - betUnitSOW - tieUnitSOW;
  }

  if (stopLossNo >= Borad[Borad.length - 1].MVD.netProfit - betUnitMVD - tieUnitMVD && (gameMode == 'MVD'
    || (selectedGameModeInMultipleMode['MVD'] == 1 && gameMode == "Multiple Mode"))) {
    stopLossIN = 'MVD';
    netStopLoss = Borad[Borad.length - 1].MVD.netProfit - betUnitMVD - tieUnitMVD;
  }

  if (stopLossIN != null && (gameMode == "Multiple Mode" || stopLossNotices == 0) && statusIsFileUpload == 0) {
    document.getElementById("oc").innerHTML = '<h4>Your Net Loss is Now Become Less than Stop Loss.<br/>Your Net Loss is ' + netStopLoss + '</h4><br> <h3> So you want play continue !? </h3>';

    document.getElementById("oc").innerHTML += ` <br><br>
       <button type="button" class="btn btn-success" onclick='closeNav()'>Yes</button>
       <button type="button" class="btn btn-danger" onclick='stopGame()'>No</button>
       <button type="button" class="btn btn-primary" onclick="nextNotices('nextNoticesStopLoss')">You Want Next Notices !? </button>
       `;

    if (gameMode == "Multiple Mode") {
      document.getElementById("oc").innerHTML = `<h4>Your Net Loss is Now Become Less than Stop Loss in ${stopLossIN}.
        Your Net Loss is  ${netStopLoss} </h4><br> <h3> So you want to play continue With ${stopLossIN} !? </h3>`;

      document.getElementById("oc").innerHTML += ` <br><br>
       <button type="button" class="btn btn-success" onclick='closeNav()'>Yes</button>
       <button type="button" class="btn btn-danger" onclick='stopGameInMultiModeStopLoss()'>No</button>
       `;

    }
    stopLossNotices = 1;
    openNav();

  }

  if (stopLossIN != null && statusIsFileUpload == 1) {

    if (statusOfRS == 1) {

      stopGameInRS = 1;

    } else {

      tempWinnerToSaveWinnerName = excelRows[startNumber - 1]['Hand ' + count4ShoesHand];
      excelRows[startNumber - 1]['Hand ' + count4ShoesHand] = "null";
    }

  }

}

/* Check For Stop Profit */
function checkStopProfit() {

  stopProfitIN = null;
  if (stopProfitNo <= Borad[Borad.length - 1].playerGame.netProfit && 'Player' == gameMode) {
    stopProfitIN = 'Player';
    netStopProfit = Borad[Borad.length - 1].playerGame.netProfit;
  }

  if (stopProfitNo <= Borad[Borad.length - 1].BankerGame.netProfit && 'Banker' == gameMode) {
    stopProfitIN = 'Banker';
    netStopProfit = Borad[Borad.length - 1].BankerGame.netProfit;
  }

  if (stopProfitNo <= Borad[Borad.length - 1].differential.netProfit && 'Differential' == gameMode) {
    stopProfitIN = 'Differential';
    netStopProfit = Borad[Borad.length - 1].differential.netProfit;
  }

  if (stopProfitNo <= BoradForMultiMode[BoradForMultiMode.length - 1].netProfit && gameMode == "Multiple Mode") {
    stopProfitIN = 'Multiple Mode';
    netStopProfit = BoradForMultiMode[BoradForMultiMode.length - 1].netProfit;
  }

  if (stopProfitNo <= Borad[Borad.length - 1].ZigZagPlayerGame.netProfit && gameMode == 'ZigZag Player First') {
    stopProfitIN = 'ZigZag Player First';
    netStopProfit = Borad[Borad.length - 1].ZigZagPlayerGame.netProfit;
  }

  if (stopProfitNo <= Borad[Borad.length - 1].ZigZagBankerGame.netProfit && gameMode == 'ZigZag Banker First') {
    stopProfitIN = 'ZigZag Banker First';
    netStopProfit = Borad[Borad.length - 1].ZigZagBankerGame.netProfit;
  }

  if (stopProfitNo <= Borad[Borad.length - 1].SOW.netProfit && gameMode == 'SOW') {
    stopProfitIN = 'SOW';
    netStopProfit = Borad[Borad.length - 1].SOW.netProfit;
  }

  if (stopProfitNo <= Borad[Borad.length - 1].MVD.netProfit && gameMode == 'MVD') {
    stopProfitIN = 'MVD';
    netStopProfit = Borad[Borad.length - 1].MVD.netProfit;
  }

  if (stopProfitIN != null && stopProfitNotices == 0 && statusIsFileUpload == 0) {
    document.getElementById("oc").innerHTML = '<h4>Your Net Profit is Now Greater than Take Profit.<br/>Your Net Profit is ' + netStopProfit + '</h4><br> <h3> So you want play continue !? </h3>';
    document.getElementById("oc").innerHTML += ` <br><br>
      <button type="button" class="btn btn-success" onclick='closeNav()'>Yes</button>
      <button type="button" class="btn btn-danger" onclick='stopGame()'>No</button>
      <button type="button" class="btn btn-primary" onclick="nextNotices('nextNoticesStopProfit')">You Want Next Notices !? </button>
      `;
    stopProfitNotices = 1;
    openNav();

  }

  if (stopProfitIN != null && statusIsFileUpload == 1) {

    if (statusOfRS == 1) {

      stopGameInRS = 1;

    } else {
      tempWinnerToSaveWinnerName = excelRows[startNumber - 1]['Hand ' + count4ShoesHand];
      excelRows[startNumber - 1]['Hand ' + count4ShoesHand] = "null";

    }

  }

}

/* Check For Max Bet */
function checkMaxBet() {

  maxBetIN = null;
  if (maxBetNo < (betUnitPlayer + tieUnitPlayer) && 'Player' == gameMode) {
    maxBetIN = 'Player';
    netMaxBet = betUnitPlayer + tieUnitPlayer;
  }

  if (maxBetNo < (betUnitBanker + tieUnitBanker) && 'Banker' == gameMode) {
    maxBetIN = 'Banker';
    netMaxBet = betUnitBanker + tieUnitBanker;
  }

  if (maxBetNo < (betUnitDifferential + tieUnitDifferential) && 'Differential' == gameMode) {
    maxBetIN = 'Differential';
    netMaxBet = betUnitDifferential + tieUnitDifferential;
  }

  if (maxBetNo < (multipleBetUnitOnPlayer + multipleBetUnitOnBanker + multipleBetUnitOnTie) && 'Multiple Mode' == gameMode) {
    maxBetIN = 'Multiple Mode';
    netMaxBet = multipleBetUnitOnPlayer + multipleBetUnitOnBanker + multipleBetUnitOnTie;
  }

  if (maxBetNo < betUnitZigZagPlayer + tieUnitZigZagPlayer && gameMode == 'ZigZag Player First') {
    maxBetIN = 'ZigZag Player First';
    netMaxBet = betUnitZigZagPlayer + tieUnitZigZagPlayer;
  }

  if (maxBetNo < betUnitZigZagBanker + tieUnitZigZagBanker && gameMode == 'ZigZag Banker First') {
    maxBetIN = 'ZigZag Banker First';
    netMaxBet = betUnitZigZagBanker + tieUnitZigZagBanker;
  }

  if (maxBetNo < betUnitSOW + tieUnitSOW && gameMode == 'SOW') {
    maxBetIN = 'SOW';
    netMaxBet = betUnitSOW + tieUnitSOW;
  }

  if (maxBetNo < betUnitMVD + tieUnitMVD && gameMode == 'MVD') {
    maxBetIN = 'MVD';
    netMaxBet = betUnitMVD + tieUnitMVD;
  }

  if (maxBetIN != null && maxBetNotices == 0 && statusIsFileUpload == 0) {
    document.getElementById("oc").innerHTML = '<h4>Your Bet Unit is Now Less than Max Bet.<br/>Your Bet Unit is ' + netMaxBet + '</h4><br> <h3> So you want play continue !? </h3>';
    document.getElementById("oc").innerHTML += ` <br><br>
        <button type="button" class="btn btn-success" onclick='closeNav()'>Yes</button>
        <button type="button" class="btn btn-danger" onclick='stopGame()'>No</button>
        <button type="button" class="btn btn-primary" onclick="nextNotices('nextNoticesMaxBet')">You Want Next Notices !? </button>
        `;
    maxBetNotices = 1;
    openNav();

  }

  if (maxBetIN != null && statusIsFileUpload == 1) {

    if (statusOfRS == 1) {

      stopGameInRS = 1;

    } else {

      tempWinnerToSaveWinnerName = excelRows[startNumber - 1]['Hand ' + count4ShoesHand];
      excelRows[startNumber - 1]['Hand ' + count4ShoesHand] = "null";

    }


  }


}

/* for Next Notices */
function nextNotices(thisid) {
  document.getElementById("oc").innerHTML = '<h3>Next Notices</h3><br><br>';
  if (thisid == 'nextNoticesMaxBet') {
    document.getElementById("oc").innerHTML += ` <div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label">Enter Next Max Bet Unit :</label>
      <input type="text" class="form-control" id="setNo" placeholder="Enter Next Max Bet Unit" style=" width: 50%; margin : 0 25%;">
      <br>`;
    document.getElementById("oc").innerHTML += `<button class="btn btn-primary" onclick="setMaxBet()" type="button">Submit</button></div>`;
  } else if (thisid == 'nextNoticesStopLoss') {
    document.getElementById("oc").innerHTML += ` <div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label">Enter Next Net Loss Where To Stop:</label>
      <input type="text" class="form-control" id="setNo" placeholder="Enter Next Net Loss Where To Stop" style=" width: 50%; margin : 0 25%;">
      <br>`;
    document.getElementById("oc").innerHTML += `<button class="btn btn-primary" onclick="setStopLoss()" type="button">Submit</button></div>`;
  } else if (thisid == 'nextNoticesMaxHnad') {
    document.getElementById("oc").innerHTML += ` <div class="mb-3">
    <label for="exampleFormControlInput1" class="form-label">Enter Next Max Hand Where To Stop:</label>
    <input type="text" class="form-control" id="setNo" placeholder="Enter Next Max Hand Where To Stop" style=" width: 50%; margin : 0 25%;">
    <br>`;
    document.getElementById("oc").innerHTML += `<button class="btn btn-primary" onclick="setMaxHand()" type="button">Submit</button></div>`;
  }
  else {
    document.getElementById("oc").innerHTML += ` <div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label">Enter Next Take Profit Where To Stop :</label>
      <input type="text" class="form-control" id="setNo" placeholder="Enter Next Take Profit Where To Stop" style=" width: 50%; margin : 0 25%;">
      <br>`;
    document.getElementById("oc").innerHTML += `<button class="btn btn-primary" onclick="setStopProfit()" type="button">Submit</button></div>`;
  }

}

// Set Max Hand 
function setMaxHand() {
  var temp = parseInt(document.getElementById('setNo').value);
  if (temp > maxHandNo) {
    maxHandNo = temp;
    document.getElementById("MaxHandId").value = maxHandNo;
    maxHnadNotices = 0;

    closeNav();
  }
  else {
    if (temp == '') {
      stopGame();
    }
    else {
      document.getElementById("oc").innerHTML = '<h4 class="text-danger">Enter Vaild Number .....</h4><br><br>';
      document.getElementById("oc").innerHTML += `
        <button type="button" class="btn btn-primary" onclick="nextNotices('nextNoticesMaxHnad')">Try Again </button>
        <button type="button" class="btn btn-danger" onclick='stopGame()'>Stop Game</button>`;
    }

  }

  previewBet();


}

/* NEW Stop Loss after notices */
function setStopLoss() {
  var temp = parseInt(document.getElementById('setNo').value);

  if ((temp >= 0 && temp > stopLossNo / -1) || (temp < 0 && temp < stopLossNo)) {
    stopLossNo = temp;
    document.getElementById('StopLossID').value = stopLossNo;
    stopLossNotices = 0;
    stopLossIN = null;

    closeNav();
  }
  else {
    if (temp == '') {
      stopGame();
    }
    else {
      document.getElementById("oc").innerHTML = '<h4 class="text-danger">Enter Vaild Number .....</h4><br><br>';
      document.getElementById("oc").innerHTML += `
        <button type="button" class="btn btn-primary" onclick="nextNotices('nextNoticesStopLoss')">Try Again </button>
        <button type="button" class="btn btn-danger" onclick='stopGame()'>Stop Game</button>`;
    }

  }

  previewBet();

}

/* NEW Max Bet Unit after notices */
function setMaxBet() {
  var temp = parseInt(document.getElementById('setNo').value);
  if (temp > maxBetNo) {
    maxBetNo = temp;
    document.getElementById('MaxBetID').value = maxBetNo;
    maxBetNotices = 0;
    maxVBetIN = null;

    closeNav();
  }
  else {
    if (temp == '') {
      stopGame();
    }
    else {
      document.getElementById("oc").innerHTML = '<h4 class="text-danger">Enter Vaild Number .....</h4><br><br>';
      document.getElementById("oc").innerHTML += `
        <button type="button" class="btn btn-primary" onclick="nextNotices('nextNoticesMaxBet')">Try Again </button>
        <button type="button" class="btn btn-danger" onclick='stopGame()'>Stop Game</button>`;
    }

  }

  previewBet();

}

/* NEW Stop Profit after notices */
function setStopProfit() {

  var temp = parseInt(document.getElementById('setNo').value);
  if (temp > stopProfitNo) {
    stopProfitNo = temp;
    document.getElementById("StopProfitID").value = stopProfitNo;
    stopProfitNotices = 0;
    stopProfitIN = null;

    closeNav();
  }
  else {
    if (temp == '') {
      stopGame();
    }
    else {
      document.getElementById("oc").innerHTML = '<h4 class="text-danger">Enter Vaild Number .....</h4><br><br>';
      document.getElementById("oc").innerHTML += `
        <button type="button" class="btn btn-primary" onclick="nextNotices('nextNoticesStopProfit')">Try Again </button>
        <button type="button" class="btn btn-danger" onclick='stopGame()'>Stop Game</button>`;
    }

  }

  previewBet();

}


/* Open when someone clicks on the span element */
function openNav() {
  document.getElementById("myNav").style.width = "50%";
}


/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
  document.getElementById("myNav").style.width = "0%";
  // document.getElementById("closebtn").innerHTML = "&times;";
}

function stopGameInMultiModeStopLoss() {

  if (stopLossIN == 'Zig Zag Player') {
    stopLossIN = 'ZigZagPlayer';
  }

  if (stopLossIN == 'Zig Zag Banker') {
    stopLossIN = 'ZigZagBanker';
  }

  selectedGameModeInMultipleMode[stopLossIN] = 0;

  document.getElementById('MaltipleGameModeOn' + stopLossIN).checked = false;

  previewBet();
  closeNav();
}

/* 
*
2 :- Change in Per Unit Size
*
*/
function changePerUnit() {

  if (document.getElementById('PerUnitId').value > 0) {
    PerUnit = document.getElementById('PerUnitId').value;
    if (statusIsFileUpload == 1) {
      return;
    }
    changeDataTable();
    return;

  } else {
    document.getElementById('PerUnitId').value = 1;
    PerUnit = document.getElementById('PerUnitId').value;
    if (statusIsFileUpload == 1) {
      return;
    }
    changeDataTable();
    return;
  }

  if (statusIsFileUpload == 1) {
    return;
  }

  Borad[0].playerGame.MaxBet = parseInt(amountSelection[0]) * PerUnit;
  Borad[0].BankerGame.MaxBet = parseInt(amountSelection[0]) * PerUnit;
  Borad[0].differential.MaxBet = parseInt(amountSelection[0]) * PerUnit;
  Borad[0].playerGame.MaxBalance = 0;
  Borad[0].BankerGame.MaxBalance = 0;
  Borad[0].differential.MaxBalance = 0;

  for (i = 0; i < Borad.length; i++) {

    /* For Player */
    Borad[i].playerGame.balance = 0;
    Borad[i].playerGame.TotalBetAmount = PerUnit * Borad[i].playerGame.betUnit;
    if (Borad[i].playerGame.BetOnTie != 0) {
      Borad[i].playerGame.TieAmount = Math.floor(PerUnit * Borad[i].playerGame.betUnit / 8);
      Borad[i].playerGame.TotalBetAmount += Borad[i].playerGame.TieAmount;
    }


    if (i != 0) {
      Borad[i].playerGame.MaxBet = Borad[i - 1].playerGame.MaxBet;

      if (Borad[i].playerGame.TotalBetAmount > Borad[i - 1].playerGame.MaxBet) {
        Borad[i].playerGame.MaxBet = Borad[i].playerGame.TotalBetAmount;
      }

    }

    if (Borad[i].playerGame.win == 1) {

      if (i != 0) {
        Borad[i].playerGame.balance = (PerUnit * Borad[i].playerGame.betUnit) + Borad[i - 1].playerGame.balance;
        if (Borad[i].playerGame.BetOnTie != 0) {
          Borad[i].playerGame.balance -= Borad[i].playerGame.TieAmount;
        }
        Borad[i].playerGame.balance = roundOff(Borad[i].playerGame.balance, 2);
      } else {
        Borad[i].playerGame.balance = (PerUnit * Borad[i].playerGame.betUnit)
        Borad[i].playerGame.balance = roundOff(Borad[i].playerGame.balance, 2);
      }

    } else if (Borad[i].playerGame.win == 3) {
      if (i != 0) {
        Borad[i].playerGame.balance = Borad[i - 1].playerGame.balance;
        Borad[i].playerGame.balance = roundOff(Borad[i].playerGame.balance, 2);
      } else {
        Borad[i].playerGame.balance = 0;
        Borad[i].playerGame.balance = roundOff(Borad[i].playerGame.balance, 2);
      }

    }
    else if (Borad[i].playerGame.win == 2) {
      Borad[i].playerGame.balance = Borad[i - 1].playerGame.balance + (8 * Borad[i].playerGame.TieAmount);
      Borad[i].playerGame.balance = roundOff(Borad[i].playerGame.balance, 2);
    }
    else {
      if (i != 0) {
        Borad[i].playerGame.balance = Borad[i - 1].playerGame.balance - Borad[i].playerGame.TotalBetAmount;
        Borad[i].playerGame.balance = roundOff(Borad[i].playerGame.balance, 2);
      } else {
        Borad[i].playerGame.balance = Borad[i].playerGame.balance - Borad[i].playerGame.TotalBetAmount;
        Borad[i].playerGame.balance = roundOff(Borad[i].playerGame.balance, 2);
      }
    }


    if (i != 0) {
      Borad[i].playerGame.MaxBalance = Borad[i - 1].playerGame.MaxBalance;

      if (Borad[i].playerGame.balance > Borad[i - 1].playerGame.MaxBalance) {
        Borad[i].playerGame.MaxBalance = Borad[i].playerGame.balance;
      }

    }
    balancePlayer = Borad[Borad.length - 1].playerGame.balance;

    /* For Banker */
    Borad[i].BankerGame.balance = 0;
    Borad[i].BankerGame.TotalBetAmount = PerUnit * Borad[i].BankerGame.betUnit;
    if (Borad[i].BankerGame.BetOnTie != 0) {
      Borad[i].BankerGame.TieAmount = Math.floor(PerUnit * Borad[i].BankerGame.betUnit / 8);
      Borad[i].BankerGame.TotalBetAmount += Borad[i].BankerGame.TieAmount;
    }


    if (i != 0) {
      Borad[i].BankerGame.MaxBet = Borad[i - 1].BankerGame.MaxBet;

      if (Borad[i].BankerGame.TotalBetAmount > Borad[i - 1].BankerGame.MaxBet) {
        Borad[i].BankerGame.MaxBet = Borad[i].BankerGame.TotalBetAmount;
      }

    }

    if (Borad[i].BankerGame.win == 1) {

      if (i != 0) {
        Borad[i].BankerGame.balance = (PerUnit * Borad[i].BankerGame.betUnit * comission4Banker / 100) + Borad[i - 1].BankerGame.balance;
        if (Borad[i].BankerGame.BetOnTie != 0) {
          Borad[i].BankerGame.balance -= Borad[i].BankerGame.TieAmount;
        }
        Borad[i].BankerGame.balance = roundOff(Borad[i].BankerGame.balance, 2);
      }
      else {
        Borad[i].BankerGame.balance = (PerUnit * Borad[i].BankerGame.betUnit * comission4Banker / 100);
        Borad[i].BankerGame.balance = roundOff(Borad[i].BankerGame.balance, 2);
      }

    } else if (Borad[i].BankerGame.win == 2) {
      Borad[i].BankerGame.balance = Borad[i - 1].BankerGame.balance + (8 * Borad[i].BankerGame.TieAmount);
      Borad[i].BankerGame.balance = roundOff(Borad[i].BankerGame.balance, 2);
    }
    else if (Borad[i].BankerGame.win == 3) {
      if (i != 0) {
        Borad[i].BankerGame.balance = Borad[i - 1].BankerGame.balance;
      } else {
        Borad[i].BankerGame.balance = 0;
      }
      Borad[i].BankerGame.balance = roundOff(Borad[i].BankerGame.balance, 2);
    }
    else {
      if (i != 0) {
        Borad[i].BankerGame.balance = Borad[i - 1].BankerGame.balance - Borad[i].BankerGame.TotalBetAmount;
        Borad[i].BankerGame.balance = roundOff(Borad[i].BankerGame.balance, 2);
      } else {
        Borad[i].BankerGame.balance = Borad[i].BankerGame.balance - Borad[i].BankerGame.TotalBetAmount;
        Borad[i].BankerGame.balance = roundOff(Borad[i].BankerGame.balance, 2);
      }
    }

    if (i != 0) {
      Borad[i].BankerGame.MaxBalance = Borad[i - 1].BankerGame.MaxBalance;

      if (Borad[i].BankerGame.balance > Borad[i - 1].BankerGame.MaxBalance) {
        Borad[i].BankerGame.MaxBalance = Borad[i].BankerGame.balance;
      }

    }
    balanceBanker = Borad[Borad.length - 1].BankerGame.balance;

    /* For Differential */
    Borad[i].differential.balance = 0;
    Borad[i].differential.TotalBetAmount = PerUnit * Borad[i].differential.betUnit;
    if (Borad[i].differential.BetOnTie != 0) {
      Borad[i].differential.TieAmount = Math.floor(PerUnit * Borad[i].differential.betUnit / 8);
      Borad[i].differential.TotalBetAmount += Borad[i].differential.TieAmount;
    }

    if (i != 0) {
      Borad[i].differential.MaxBet = Borad[i - 1].differential.MaxBet;

      if (Borad[i].differential.TotalBetAmount > Borad[i - 1].differential.MaxBet) {
        Borad[i].differential.MaxBet = Borad[i].differential.TotalBetAmount;
      }

    }

    if (Borad[i].differential.win == 1) {
      if (Borad[i].actualWinner == 'Player') {

        if (i != 0) {
          Borad[i].differential.balance = (PerUnit * Borad[i].differential.betUnit) + Borad[i - 1].differential.balance;
          if (Borad[i].differential.BetOnTie != 0) {
            Borad[i].differential.balance -= Borad[i].differential.TieAmount;
          }
          Borad[i].differential.balance = roundOff(Borad[i].differential.balance, 2);
        } else {
          Borad[i].differential.balance = (PerUnit * Borad[i].differential.betUnit);
          Borad[i].differential.balance = roundOff(Borad[i].differential.balance, 2);
        }

      }
      else {
        if (i != 0) {
          Borad[i].differential.balance = (PerUnit * Borad[i].differential.betUnit * comission4Banker / 100) + Borad[i - 1].differential.balance;
          if (Borad[i].differential.BetOnTie != 0) {
            Borad[i].differential.balance -= Borad[i].differential.TieAmount;
          }
        } else {
          Borad[i].differential.balance = (PerUnit * Borad[i].differential.betUnit * comission4Banker / 100);
        }
        Borad[i].differential.balance = roundOff(Borad[i].differential.balance, 2);
      }


    } else if (Borad[i].differential.win == 2) {
      Borad[i].differential.balance = Borad[i - 1].differential.balance + (8 * Borad[i].differential.TieAmount);
    } else if (Borad[i].differential.win == 3) {
      if (i != 0) {
        Borad[i].differential.balance = Borad[i - 1].differential.balance;
      } else {
        Borad[i].differential.balance = 0;
      }
    }
    else {
      if (i != 0) {
        Borad[i].differential.balance = Borad[i - 1].differential.balance - Borad[i].differential.TotalBetAmount;
      } else {
        Borad[i].differential.balance = Borad[i].differential.balance - Borad[i].differential.TotalBetAmount;
      }
      Borad[i].differential.balance = roundOff(Borad[i].differential.balance, 2);
    }


    if (i != 0) {
      Borad[i].differential.MaxBalance = Borad[i - 1].differential.MaxBalance;

      if (Borad[i].differential.balance > Borad[i - 1].differential.MaxBalance) {
        Borad[i].differential.MaxBalance = Borad[i].differential.balance;
      }

    }
    balanceDifferential = Borad[Borad.length - 1].differential.balance;


  }

  displayTable();
  previewBet();
  if ((statusIsFileUpload == 0 || statusOfRS == 1) && statusOfVariableTableShow == 1) displayvariableTable();

  maxBetPlayer = Borad[Borad.length - 1].playerGame.MaxBet;
  maxBetBanker = Borad[Borad.length - 1].BankerGame.MaxBet;
  maxBetDifferential = Borad[Borad.length - 1].differential.MaxBet;

  saveMaxBalanceBanker = Borad[Borad.length - 1].BankerGame.MaxBalance;
  saveMaxBalancePlayer = Borad[Borad.length - 1].playerGame.MaxBalance;
  saveMaxBalanceDifferential = Borad[Borad.length - 1].differential.MaxBalance;



}



/* 
*
3 :- Clear Table 
*
*/

function clearTable() {

  hand = 0, tieWin = 0;
  noOfBanker = 0; noOfPlayer = 0; TotalTieWin = 0;
  noOfBanker = 0, noOfPlayer = 0, hand = 0;
  // statusOfVariableTableShow = 0;


  // PLAYER RESET //
  totalBetAmtPlayer = 0, betUnitPlayer = 0, maxBetPlayer = 0;
  BetOnTiePlayer = 0, netProfitPlayer = 0, betUnitPlayer = 0;
  balancePlayer = 0, tieAmtPlayer = 0, winPlayer = 0, TotalTieWinPlayer = 0;
  WholeWinUnitPlayer = 0, tieUnitPlayer = 0, maxContiuneWinPlayer = 0, maxContiuneLossPlayer = 0;
  saveMaxContiuneWinPlayer = 0, brakeCountPlayer = 0, saveMaxBalancePlayer = 0;
  WholeLossUnitPlayer = 0, saveWinsAsPlayerPlayer = 0, saveMaxContiuneLossPlayer = 0;
  AmountSelectionIndexPlayer = 0, previewBetUnitPlayerWin = 0, previewBetUnitPlayerLoss = 0;
  saveWinsAsBankerP = 0;

  // Banker RESET //
  totalBetAmtBanker, betUnitBanker, maxBetBanker;
  BetOnTieBanker = 0, netProfitBanker = 0, betUnitBanker = 0;
  balanceBanker = 0, tieAmtBanker = 0, winBanker = 0, TotalTieWinBanker = 0;
  WholeWinUnitBanker = 0, tieUnitBanker = 0, maxContiuneWinBanker = 0, maxContiuneLossBanker = 0;
  saveMaxContiuneWinBanker = 0, brakeCountBanker = 0, saveMaxBalanceBanker = 0;
  WholeLossUnitBanker = 0, saveWinsAsPlayerBanker = 0, saveMaxContiuneLossBanker = 0;
  AmountSelectionIndexBanker = 0, previewBetUnitBankerWin = 0, previewBetUnitBankerLoss = 0;
  saveWinsAsBankerB = 0;

  // Diff Reset //
  totalBetAmtDifferential, betOnDifferential, maxBetDifferential;
  BetOnTieDifferential = 0, netProfitDifferential = 0, betUnitDifferential = 0;
  balanceDifferential = 0, tieAmtDifferential = 0, winDifferential = 0, TotalTieWinDifferential = 0;
  WholeWinUnitDifferential = 0, tieUnitDifferential = 0, maxContiuneWinDifferential = 0, maxContiuneLossDifferential = 0;
  saveMaxContiuneWinDifferential = 0, brakeCountDifferential = 0, saveMaxBalanceDifferential = 0;
  WholeLossUnitDifferential = 0, saveWinsAsPlayerDifferential = 0, saveMaxContiuneLossDifferential = 0;
  AmountSelectionIndexDifferential = 0, previewBetUnitDifferentialWin = 0, previewBetUnitDifferentialLoss = 0;
  previewBetUnitDifferentialWin = 0, previewBetOnDifferentialWin = null;
  previewBetUnitDifferentialLoss = 0, previewBetOnDifferentialtLoss = null;
  saveWinsAsBankerDiff = 0;

  // Zig Zag Player First //
  totalBetAmtZigZagPlayer, betUnitZigZagPlayer, maxBetZigZagPlayer, betOnZigZagPlayer = 'Player';
  BetOnTieZigZagPlayer = 0, netProfitZigZagPlayer = 0, betUnitZigZagPlayer = 0;
  balanceZigZagPlayer = 0, tieAmtZigZagPlayer = 0, winZigZagPlayer = 0, TotalTieWinZigZagPlayer = 0;
  WholeWinUnitZigZagPlayer = 0, tieUnitZigZagPlayer = 0, maxContiuneWinZigZagPlayer = 0, maxContiuneLossZigZagPlayer = 0;
  saveMaxContiuneWinZigZagPlayer = 0, brakeCountZigZagPlayer = 0, saveMaxBalanceZigZagPlayer = 0;
  WholeLossUnitZigZagPlayer = 0, saveWinsAsZigZagPlayerPlayer = 0, saveMaxContiuneLossZigZagPlayer = 0;
  AmountSelectionIndexZigZagPlayer = 0, previewBetUnitZigZagPlayerWin = 0, previewBetUnitZigZagPlayerLoss = 0;
  BrakeModeOnInPlayZigZagPlayer = 0, WholeBetUnitZigZagPlayer = 0;
  saveWinsAsBankerZigZagPlayer = 0;

  // Zig Zag Banker First //
  totalBetAmtZigZagBanker, betUnitZigZagBanker, maxBetZigZagBanker, betOnZigZagBanker = 'Banker';
  BetOnTieZigZagBanker = 0, netProfitZigZagBanker = 0, betUnitZigZagBanker = 0;
  balanceZigZagBanker = 0, tieAmtZigZagBanker = 0, winZigZagBanker = 0, TotalTieWinZigZagBanker = 0;
  WholeWinUnitZigZagBanker = 0, tieUnitZigZagBanker = 0, maxContiuneWinZigZagBanker = 0, maxContiuneLossZigZagBanker = 0;
  saveMaxContiuneWinZigZagBanker = 0, brakeCountZigZagBanker = 0, saveMaxBalanceZigZagBanker = 0;
  WholeLossUnitZigZagBanker = 0, saveWinsAsZigZagBankerPlayer = 0, saveMaxContiuneLossZigZagBanker = 0;
  AmountSelectionIndexZigZagBanker = 0, previewBetUnitZigZagBankerWin = 0, previewBetUnitZigZagBankerLoss = 0;
  BrakeModeOnInPlayZigZagBanker = 0, WholeBetUnitZigZagBanker = 0;
  saveWinsAsBankerZigZagBanker = 0;

  //  For SOW //
  totalBetAmtSOW = 0, betUnitSOW = 0, maxBetSOW = 0;
  BetOnTieSOW = 0, netProfitSOW = 0, betUnitSOW = 0;
  balanceSOW = 0, tieAmtSOW = 0, winSOW = 0, TotalTieWinSOW = 0;
  WholeWinUnitSOW = 0, tieUnitSOW = 0, maxContiuneWinSOW = 0, maxContiuneLossSOW = 0;
  saveMaxContiuneWinSOW = 0, brakeCountSOW = 0, saveMaxBalanceSOW = 0;
  WholeLossUnitSOW = 0, saveWinsAsSOWSOW = 0, saveMaxContiuneLossSOW = 0;
  AmountSelectionIndexSOW = 0, previewBetUnitSOWWin = 0, previewBetUnitSOWLoss = 0;
  BrakeModeOnInPlaySOW = 0, WholeBetUnitSOW = 0;
  saveWinsAsSOWPlayer = 0;
  sameAsWinSOW = null, oppositeOfWinSOW = null;
  betOnWhichPartySOW = -1;
  vaildLengthToStartGame = 2, statusOfSOWGame = 0;
  previewBetOnSOWWin = null, previewBetOnSOWLoss = null;
  saveWinsAsBankerSOW = 0;

  // MVD
  betOnMVD = "", startGameMVD = 0, setBanker1stTime = 0;
  betUnitMVD = -1;
  totalBetAmtMVD, maxBetMVD = 0;
  BetOnTieMVD = 0, netProfitMVD = 0;
  balanceMVD = 0, tieAmtMVD = 0, winMVD = 0, TotalTieWinMVD = 0;
  WholeWinUnitMVD = 0, tieUnitMVD = 0, maxContiuneWinMVD = 0, maxContiuneLossMVD = 0;
  saveMaxContiuneWinMVD = 0, brakeCountMVD = 0, saveMaxBalanceMVD = 0;
  WholeLossUnitMVD = 0, saveWinsAsMVDPlayer = 0, saveMaxContiuneLossMVD = 0;
  noOfWinsRowInMVD = 0, previewBetUnitMVDWin = 0, previewBetUnitMVDLoss = 0;
  BrakeModeOnInPlayMVD = 0, WholeBetUnitMVD = 0;
  previewBetOnMVDWin = " ", previewBetOnMVDLoss = "", AmountSelectionIndexMVD = 0;
  saveWinsAsBankerMVD = 0;



  // Addition Function 
  maxHnadNotices = 0, stopGameInRS = 0, tempWinnerToSaveWinnerName = null;
  stopLossNotices = 0, stopLossIN = null, netStopLoss = 0;
  maxBetNotices = 0, maxBetIN = null, netMaxBet = 0;
  stopProfitNotices = 0, stopProfitIN = null, netStopProfit = 0;
  tempNet = 0;

  // multi mode  
  balanceMultipleMode = 0, BoradForMultiMode = [];
  netProfitMultiMode = 0;
  wholeBetUnitINMM = 0, WholeWinUnitINMM = 0, WholeLossUnitINMM = 0;
  saveMaxContiuneWinINMM = 0, saveMaxContiuneLossIMM = 0;
  maxContiuneWinINMM = 0, maxContiuneLossINMM = 0;
  saveMaxBetINMM = 0, saveMaxBalanceINMM = 0;
  winASPlayerINMM = 0;
  winASBankerINMM = 0;

  totalBalanceInMMInPlayer = 0, totalBalanceInMMInBanker = 0;
  totalBalanceInMMInDiff = 0, totalBalanceInMMInTarget = 0;
  totalBalanceInMMInMVD = 0, totalBalanceInMMInSOW = 0;
  totalBalanceInMMInZigZagPlayer = 0, totalBalanceInMMInZigZagBanker = 0;


  // RESTART FUNCTION 
  Borad.length = 0;


  if (statusIsFileUpload == 0) {
    for (i = 0; i < baccaratBoradTable.length; i++) {
      baccaratBoradTable[i] = new Array(100);
      for (j = 0; j < baccaratBoradTable[i].length; j++) {
        baccaratBoradTable[i][j] = {
          "winner": 'nathing',
          "color": 'Black',
          "filled": 0,
          "hand": -1,
          "lastWinner": null,
          "noOfTie": 0
        }
      }
    }
  }
  if (statusIsFileUpload == 0) actualWinner = null;
  if (statusIsFileUpload == 0) previewBet();
  if (statusIsFileUpload == 0) displayTable();
  if (statusIsFileUpload == 0) displayBaccaratBorad();
  if (statusIsFileUpload == 0 && statusOfVariableTableShow == 1) displayvariableTable();
  if (statusIsFileUpload == 0) displayAmtInLable();
}



/* 
*
4 :- Stop Game 
*
*/

function stopGame() {

  if (gameMode == 'Differential') {
    if (Borad.length == 0) {
      tempNet = 0;
    } else
      tempNet = Borad[Borad.length - 1].differential.balance;
  } else if (gameMode == 'Player') {
    if (Borad.length == 0) {
      tempNet = 0;
    } else
      tempNet = Borad[Borad.length - 1].playerGame.balance;
  } else if (gameMode == 'Banker') {
    if (Borad.length == 0) {
      tempNet = 0;
    } else
      tempNet = Borad[Borad.length - 1].BankerGame.balance;
  } else if (gameMode == 'ZigZag Banker First') {
    if (Borad.length == 0) {
      tempNet = 0;
    } else
      tempNet = Borad[Borad.length - 1].ZigZagBankerGame.balance;
  } else if (gameMode == 'ZigZag Player First') {
    if (Borad.length == 0) {
      tempNet = 0;
    } else
      tempNet = Borad[Borad.length - 1].ZigZagPlayerGame.balance;
  } else if (gameMode == "Multiple Mode") {
    if (Borad.length == 0) {
      tempNet = 0;
    } else
      tempNet = BoradForMultiMode[BoradForMultiMode.length - 1].balance;
  } else if (gameMode == 'SOW') {
    if (Borad.length == 0) {
      tempNet = 0;
    } else
      tempNet = Borad[Borad.length - 1].SOW.balance;
  } else if (gameMode == 'MVD') {
    if (Borad.length == 0) {
      tempNet = 0;
    } else
      tempNet = Borad[Borad.length - 1].MVD.balance;
  }

  var tempText = null;
  if (tempNet >= 0) {
    tempText = 'Profit';
  }
  else {
    tempText = 'Loss';
  }
  document.getElementById("GameResultDisplayId").innerHTML = `<div style="width : 100% ; text-align: center; "><h4 class="text-danger">This Game is Stop. </h4>
    <h3> Net ${tempText} = ${tempNet} $ </h3>
    <a class="btn btn-primary" href="ASSNormalPlay.html" role="button">Play Again</a> <a class="btn btn-primary" href="../../index.html" role="button">Back To Home</a> 
    </div>` ;
  document.getElementById('bottonOfWinners').innerHTML = '';
  closeNav();
}


// show individual Unit

// // for multiMode 
// function showIndividualUnitBtn() {
//   openNav();

//   let html = `<div class="container">
//   <div class="row">
//   <table class="table  table-dark">
//   <thead>
//     <tr>
//       <th scope="col">#</th>
//       <th scope="col">Game Mode</th>
//       <th scope="col">Bet Unit</th>
//       <th scope="col">Balance</th>
//     </tr>
//   </thead>
//   <tbody>`;
//   let i = 0;
//   if (selectedGameModeInMultipleMode['Player'] == 1) {
//     i++;
//     html += `<tr>
//     <th scope="row">${i}</th>
//     <td>Player</td>
//     <td>${totalBetAmtPlayer}</td>`;
//     if(Borad.length == 0) html += `<td>0</td>`;
//     else if(0 > Borad[Borad.length - 1].playerGame.balance) html += "<td class='boradTableinBanker'>" + Borad[Borad.length - 1].playerGame.balance + "</td>";
//     else html += "<td>" + Borad[Borad.length - 1].playerGame.balance + "</td>";
//     html += `</tr>`;
//   }
//   if (selectedGameModeInMultipleMode['Banker'] == 1) {
//     i++;
//     html += `<tr>
//     <th scope="row">${i}</th>
//     <td>Banker</td>
//     <td>${totalBetAmtBanker}</td>`;
//     if(Borad.length == 0) html += `<td>0</td>`;
//     else if (0 > Borad[Borad.length - 1].BankerGame.balance) html += "<td class='boradTableinBanker'>" + Borad[Borad.length - 1].BankerGame.balance + "</td>";
//     else html += "<td>" + Borad[Borad.length - 1].BankerGame.balance + "</td>";
//     html += `</tr>`;
//   }
//   if (selectedGameModeInMultipleMode['SOW'] == 1) {
//     i++;
//     html += `<tr>
//     <th scope="row">${i}</th>
//     <td>SOW</td>
//     <td>${totalBetAmtSOW}</td>`;
//     if(Borad.length == 0) html += `<td>0</td>`;
//     else if (0 > Borad[Borad.length - 1].SOW.balance) html += "<td class='boradTableinBanker'>" + Borad[Borad.length - 1].SOW.balance + "</td>";
//     else html += "<td>" + Borad[Borad.length - 1].SOW.balance + "</td>";
//     html += `</tr > `;
//   }
//   if (selectedGameModeInMultipleMode['ZigZagPlayer'] == 1) {
//     i++;
//     html += `<tr>
//     <th scope="row">${i}</th>
//     <td>ZigZag Player</td>
//     <td>${totalBetAmtZigZagPlayer}</td>`;
//     if(Borad.length == 0) html += `<td>0</td>`;
//     else if (0 > Borad[Borad.length - 1].ZigZagPlayerGame.balance) html += "<td class='boradTableinBanker'>" + Borad[Borad.length - 1].ZigZagPlayerGame.balance + "</td>";
//     else html += "<td>" + Borad[Borad.length - 1].ZigZagPlayerGame.balance + "</td>";
//     html += `</tr > `;
//   }
//   if (selectedGameModeInMultipleMode['ZigZagBanker'] == 1) {
//     i++;
//     html += `<tr>
//     <th scope="row">${i}</th>
//     <td>ZigZag Banker</td>
//     <td>${totalBetAmtZigZagPlayer}</td>`;
//     if(Borad.length == 0) html += `<td>0</td>`;
//     else if (0 > Borad[Borad.length - 1].ZigZagBankerGame.balance) html += "<td class='boradTableinBanker'>" + Borad[Borad.length - 1].ZigZagBankerGame.balance + "</td>";
//     else html += "<td>" + Borad[Borad.length - 1].ZigZagBankerGame.balance + "</td>";
//     html += ` </tr > `;
//   }
//   if (selectedGameModeInMultipleMode['MVD'] == 1) {
//     i++;
//     html += `<tr><th scope="row">${i}</th><td>MVD</td>
//     <td>${totalBetAmtMVD}</td>`;
//     if(Borad.length == 0) html += `<td>0</td>`;
//     else if (0 > Borad[Borad.length - 1].MVD.balance) html += "<td class='boradTableinBanker'>" + Borad[Borad.length - 1].MVD.balance + "</td>";
//     else html += "<td>" + Borad[Borad.length - 1].MVD.balance + "</td>";
//     html += `</tr > `;
//   }


//   html += ` </tbody ></table ></div ><button type="button" class="btn btn-primary mt-4" onclick="closeNav()" value="quit"
//   id="showIndividualUnit">Back To Game</button>
//   </div > `;
//   document.getElementById("oc").innerHTML = html;
//   document.getElementById("closebtn").innerHTML = "";
// }


// for multiMode 
function showIndividualUnitBtn() {
  document.getElementById("showIndividualUnitScreenID").style.width = "100%";

  let html = `<div class="container">
  <div class="row">
  <table class="table  table-dark">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Game Mode</th>
      <th scope="col">Bet Unit</th>
      <th scope="col">Balance</th>
    </tr>
  </thead>
  <tbody>`;
  let i = 0;
  if (selectedGameModeInMultipleMode['Player'] == 1) {
    i++;
    html += `<tr>
    <th scope="row">${i}</th>
    <td>Player</td>
    <td>${totalBetAmtPlayer}</td>`;
    if (Borad.length == 0) html += `<td>0</td>`;
    else if (0 > totalBalanceInMMInPlayer) html += "<td class='boradTableinBanker'>" + totalBalanceInMMInPlayer + "</td>";
    else html += "<td>" + totalBalanceInMMInPlayer + "</td>";
    html += `</tr>`;
  }
  if (selectedGameModeInMultipleMode['Banker'] == 1) {
    i++;
    html += `<tr>
    <th scope="row">${i}</th>
    <td>Banker</td>
    <td>${totalBetAmtBanker}</td>`;
    if (Borad.length == 0) html += `<td>0</td>`;
    else if (0 > totalBalanceInMMInBanker) html += "<td class='boradTableinBanker'>" + totalBalanceInMMInBanker + "</td>";
    else html += "<td>" + totalBalanceInMMInBanker + "</td>";
    html += `</tr>`;
  }
  if (selectedGameModeInMultipleMode['SOW'] == 1) {
    i++;
    html += `<tr>
    <th scope="row">${i}</th>
    <td>SOW</td>
    <td>${totalBetAmtSOW}</td>`;
    if (Borad.length == 0) html += `<td>0</td>`;
    else if (0 > totalBalanceInMMInSOW) html += "<td class='boradTableinBanker'>" + totalBalanceInMMInSOW + "</td>";
    else html += "<td>" + totalBalanceInMMInSOW + "</td>";
    html += `</tr > `;
  }
  if (selectedGameModeInMultipleMode['ZigZagPlayer'] == 1) {
    i++;
    html += `<tr>
    <th scope="row">${i}</th>
    <td>ZigZag Player</td>
    <td>${totalBetAmtZigZagPlayer}</td>`;
    if (Borad.length == 0) html += `<td>0</td>`;
    else if (0 > totalBalanceInMMInZigZagPlayer) html += "<td class='boradTableinBanker'>" + totalBalanceInMMInZigZagPlayer + "</td>";
    else html += "<td>" + totalBalanceInMMInZigZagPlayer + "</td>";
    html += `</tr > `;
  }
  if (selectedGameModeInMultipleMode['ZigZagBanker'] == 1) {
    i++;
    html += `<tr>
    <th scope="row">${i}</th>
    <td>ZigZag Banker</td>
    <td>${totalBetAmtZigZagPlayer}</td>`;
    if (Borad.length == 0) html += `<td>0</td>`;
    else if (0 > totalBalanceInMMInZigZagBanker) html += "<td class='boradTableinBanker'>" + totalBalanceInMMInZigZagBanker + "</td>";
    else html += "<td>" + totalBalanceInMMInZigZagBanker + "</td>";
    html += ` </tr > `;
  }
  if (selectedGameModeInMultipleMode['MVD'] == 1) {
    i++;
    html += `<tr><th scope="row">${i}</th><td>MVD</td>
    <td>${totalBetAmtMVD}</td>`;
    if (Borad.length == 0) html += `<td>0</td>`;
    else if (0 > totalBalanceInMMInMVD) html += "<td class='boradTableinBanker'>" + totalBalanceInMMInMVD + "</td>";
    else html += "<td>" + totalBalanceInMMInMVD + "</td>";
    html += `</tr > `;
  }


  html += ` </tbody ></table ></div ><button type="button" class="btn btn-primary mt-4" onclick="closeNavOfScreen2()" value="quit"
  id="showIndividualUnit">Back To Game</button>
  </div > `;
  document.getElementById("ShowIndividualUnit-Content").innerHTML = html;
  // document.getElementById("closebtn").innerHTML = "";
}

function closeNavOfScreen2() {
  document.getElementById('showIndividualUnitScreenID').style.width = '0%';
}


/* 
*
5 :- Change Preferences
*
*/
function showchangePreferences() {


  // storing data 
  storeMainBorad = Borad;
  // console.log(storeMainBorad);

  storeBoradForMultiMode = BoradForMultiMode;
  storeIsVariableShow = statusOfVariableTableShow;

  // Seleted text 
  storegameMode = gameMode;
  if (gameMode == "Player") document.getElementById("bettypeINCP").options[1].selected = true;
  if (gameMode == "Banker") document.getElementById("bettypeINCP").options[0].selected = true;
  if (gameMode == "SOW") document.getElementById("bettypeINCP").options[2].selected = true;
  if (gameMode == "Multiple Mode") {
    document.getElementById("bettypeINCP").options[3].selected = true;
    document.getElementById('multipleModeOptionINCP').style.display = 'block';
  }
  if (gameMode == "ZigZag Player First") document.getElementById("bettypeINCP").options[4].selected = true;
  if (gameMode == "ZigZag Banker First") document.getElementById("bettypeINCP").options[5].selected = true;
  if (gameMode == "MVD") document.getElementById("bettypeINCP").options[6].selected = true;

  // brake
  storebrakeNo = document.getElementById('BrakeId').value;
  document.getElementById("brakeIdINCP").value = storebrakeNo;

  // Tie 
  storeTieMode = tieMode;
  document.getElementById("TieModeIdINCP").checked = storeTieMode;

  // store tie mode & selection array 
  for (let i = 0; i < Borad.length; i++) {
    storeOldTieHands.push(Borad[i].TieMode);
    storelistOfSelectedGameMode.push(BoradForMultiMode[i].selectedGameMode);
  }
  console.log(storeOldTieHands);

  // in MM Play Method 
  storePlayMethodINMM = document.getElementById("PlayMethodInMultiMode").value;
  if (storePlayMethodINMM == 0) document.getElementById("PlayMethodInMultiModeINCP").options[0].selected = true;
  if (storePlayMethodINMM == 1) document.getElementById("PlayMethodInMultiModeINCP").options[1].selected = true;

  // In MM Selection 
  storeSelectedGameModeInMultipleMode['Player'] = selectedGameModeInMultipleMode['Player'];
  storeSelectedGameModeInMultipleMode['SOW'] = selectedGameModeInMultipleMode['SOW'];
  storeSelectedGameModeInMultipleMode['Banker'] = selectedGameModeInMultipleMode['Banker'];
  storeSelectedGameModeInMultipleMode['ZigZagPlayer'] = selectedGameModeInMultipleMode['ZigZagPlayer'];
  storeSelectedGameModeInMultipleMode['ZigZagBanker'] = selectedGameModeInMultipleMode['ZigZagBanker'];
  storeSelectedGameModeInMultipleMode['All'] = selectedGameModeInMultipleMode['All'];
  storeSelectedGameModeInMultipleMode['MVD'] = selectedGameModeInMultipleMode['MVD'];
  // console.log("selection : " + storeSelectedGameModeInMultipleMode['Player'] + storeSelectedGameModeInMultipleMode['SOW'] + storeSelectedGameModeInMultipleMode['Banker'] + storeSelectedGameModeInMultipleMode['Differential']);
  // console.log("2nd : " + storeSelectedGameModeInMultipleMode['Target'] + storeSelectedGameModeInMultipleMode['ZigZagPlayer'] + storeSelectedGameModeInMultipleMode['ZigZagBanker']);
  // console.log("3rd : " + storeSelectedGameModeInMultipleMode['All'] + storeSelectedGameModeInMultipleMode['MVD']);
  if (storeSelectedGameModeInMultipleMode['Player'] == 1) {
    document.getElementById("MaltipleGameModeOnPlayerINCP").checked = true;
  }

  if (storeSelectedGameModeInMultipleMode['SOW'] == 1) {
    document.getElementById("MaltipleGameModeOnSOWINCP").checked = true;
  }

  if (storeSelectedGameModeInMultipleMode['ZigZagPlayer'] == 1) {
    document.getElementById("MaltipleGameModeOnZigZagPlayerINCP").checked = true;
  }

  if (storeSelectedGameModeInMultipleMode['Banker'] == 1) {
    document.getElementById("MaltipleGameModeOnBankerINCP").checked = true;
  }

  if (storeSelectedGameModeInMultipleMode['MVD'] == 1) {
    document.getElementById("MaltipleGameModeOnMVDINCP").checked = true;
  }
  if (storeSelectedGameModeInMultipleMode['ZigZagBanker'] == 1) {
    document.getElementById("MaltipleGameModeOnZigZagBankerINCP").checked = true;
  }
  if (storeSelectedGameModeInMultipleMode['All'] == 1) {
    document.getElementById("MaltipleGameModeOnAllINCP").checked = true;
  }
 
  // Progression
  storeIsPositiveProgression = isPositiveProgression ;
  if(storeIsPositiveProgression == 0) document.getElementById("ProgressionDropDownIdINCP").options[0].selected = true ;
  if(storeIsPositiveProgression == 1) document.getElementById("ProgressionDropDownIdINCP").options[1].selected = true ;


  document.getElementById("changePreferencesId").style.width = "100%";
  document.getElementById("changePreferencesId").style.display = "block";
  IschangePreferencesOn = 1;

  displayAmtInLable();
  displayTable();
  displayvariableTable();

}

function ClosechangePreferences() {

  document.getElementById("changePreferencesId").style.display = "none";
  document.getElementById('multipleModeOptionINCP').style.display = 'none';


  // restore data 
  statusOfVariableTableShow = storeIsVariableShow;

  // brake 
  brakeNo = storebrakeNo;
  document.getElementById('BrakeId').value = brakeNo;
  // console.log("brake " + brakeNo);

  // Selected text
  gameMode = storegameMode;
  // console.log("setext " + gameMode);

  // In MM Play Method 
  if (storePlayMethodINMM == 0) selectedMethodType = "Normal";
  if (storePlayMethodINMM == 1) selectedMethodType = "Differential";

  // IN MM Secletion 
  selectedGameModeInMultipleMode['Player'] = storeSelectedGameModeInMultipleMode['Player'];
  selectedGameModeInMultipleMode['SOW'] = storeSelectedGameModeInMultipleMode['SOW'];
  selectedGameModeInMultipleMode['Banker'] = storeSelectedGameModeInMultipleMode['Banker'];
  selectedGameModeInMultipleMode['ZigZagPlayer'] = storeSelectedGameModeInMultipleMode['ZigZagPlayer'];
  selectedGameModeInMultipleMode['ZigZagBanker'] = storeSelectedGameModeInMultipleMode['ZigZagBanker'];
  selectedGameModeInMultipleMode['All'] = storeSelectedGameModeInMultipleMode['All'];
  selectedGameModeInMultipleMode['MVD'] = storeSelectedGameModeInMultipleMode['MVD'];

  // progression 
  isPositiveProgression = storeIsPositiveProgression ;

  Borad = storeMainBorad;
  // console.log(storeMainBorad);
  BoradForMultiMode = storeBoradForMultiMode;

  IsTakeTieFormOldMOde = 1;
  changeDataTable();
  IsTakeTieFormOldMOde = 0;
  IschangePreferencesOn = 0;

  // tie 
  tieMode = storeTieMode;
  console.log("tie mode " + tieMode);

  displayTable();
  previewBet();
}

// Change Brake in CP 
function changeBrakeINCP() {
  if (document.getElementById('brakeIdINCP').value >= 0) {
    brakeNo = document.getElementById('brakeIdINCP').value;
  } else {
    document.getElementById('brakeIdINCP').value = 0;
    brakeNo = document.getElementById('brakeIdINCP').value;
  }
  changeDataTable();
}
