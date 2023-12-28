excelRows = null, maxContiuneWinTarget = 0, maxContiuneLossTarget = 0;
/* 
*
1 :- Stop Loss , Stop Profit , Max Bet , Max Hand
*
*/

/* Max Hand Chnage */
function changeMH() {
  if (document.getElementById('maxHandId').value > 1) maxHand = document.getElementById('maxHandId').value;
  else document.getElementById('maxHandId').value = 1, maxHand = 1;

  maxHnadNotices = 0;
  previewBet();
}

function checkMaxHand() {

  if (hand >= maxHand) {
    if (statusIsFileUpload == 0 && maxHnadNotices == 0) {
      document.getElementById("oc").innerHTML = '<h4>You have about to exceed your max hand(' + hand + '). </h4><br> <h3> So you want play continue !? </h3>';
      document.getElementById("oc").innerHTML += ` <br><br>
         <button type="button" class="btn btn-success" onclick='closeNav()'>Yes</button>
         <button type="button" class="btn btn-danger" onclick='stopGame()'>No</button>
         <button type="button" class="btn btn-primary" onclick="nextNotices('nextNoticesMaxHnad')">You Want Next Notices !? </button>
         `;
      maxHnadNotices = 1;
      openNav();
    } else if (statusIsFileUpload == 1) {

      if (statusOfRSMode1 == 1 || statusOfRSMode2 == 1) {

        stopGameInRS = 1;

      } else {

        tempWinner = excelRows[startNumber - 1]['Hand ' + count4ShoesHand];
        excelRows[startNumber - 1]['Hand ' + count4ShoesHand] = "null";
      }


    }
  }
}

/* Change in Stop Loss */
function changeSL1() {
  if (document.getElementById('estopLoss1').value >= 0) {
    stopLoss1 = -1 * document.getElementById('estopLoss1').value;
  } else {
    stopLoss1 = document.getElementById('estopLoss1').value;
  }
  stopLossNotices1 = 0; stopLossIN1 = null;
  previewBet();
}

/* Change in Stop Profit */
function changeSP() {

  if (document.getElementById("estopProfit").value > 0) {
    stopProfit = document.getElementById("estopProfit").value;
  } else {
    document.getElementById("estopProfit").value = 1;
    stopProfit = document.getElementById("estopProfit").value;
  }
  stopProfitNotices = 0; stopProfitIN = null;
  previewBet();
}

/* Change in Max Bet Unit */
function changeSL() {
  if (document.getElementById('estopLoss').value > 0) {
    stopLoss = document.getElementById('estopLoss').value;
  } else {
    document.getElementById('estopLoss').value = 1;
    stopLoss = document.getElementById('estopLoss').value;
  }
  stopLossNotices = 0; stopLossIN = null;
  previewBet();
}

/* for Next Notices */
function nextNotices(thisid) {
  document.getElementById("oc").innerHTML = '<h3>Next Notices</h3><br><br>';
  if (thisid == 'nextNoticesLoss') {
    document.getElementById("oc").innerHTML += ` <div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label">Enter Next Max Bet Unit :</label>
      <input type="text" class="form-control" id="setNo" placeholder="Enter Next Max Bet Unit" style=" width: 50%; margin : 0 25%;">
      <br>`;
    document.getElementById("oc").innerHTML += `<button class="btn btn-primary" onclick="setLoss()" type="button">Submit</button></div>`;
  } else if (thisid == 'nextNoticesLoss1') {
    document.getElementById("oc").innerHTML += ` <div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label">Enter Next Net Loss Where To Stop:</label>
      <input type="text" class="form-control" id="setNo" placeholder="Enter Next Net Loss Where To Stop" style=" width: 50%; margin : 0 25%;">
      <br>`;
    document.getElementById("oc").innerHTML += `<button class="btn btn-primary" onclick="setLoss1()" type="button">Submit</button></div>`;
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
    document.getElementById("oc").innerHTML += `<button class="btn btn-primary" onclick="setProfit()" type="button">Submit</button></div>`;
  }

}

function setMaxHand() {
  var temp = parseInt(document.getElementById('setNo').value);
  if (temp > maxHand) {
    maxHand = temp;
    document.getElementById("maxHandId").value = maxHand;
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
function setLoss1() {
  var temp = parseInt(document.getElementById('setNo').value);

  if ((temp >= 0 && temp > stopLoss1 / -1) || (temp < 0 && temp < stopLoss1)) {
    stopLoss1 = temp;
    document.getElementById('estopLoss1').value = stopLoss1;
    stopLossNotices1 = 0;
    stopLossIN1 = null;

    closeNav();
  }
  else {
    if (temp == '') {
      stopGame();
    }
    else {
      document.getElementById("oc").innerHTML = '<h4 class="text-danger">Enter Vaild Number .....</h4><br><br>';
      document.getElementById("oc").innerHTML += `
        <button type="button" class="btn btn-primary" onclick="nextNotices('nextNoticesLoss1')">Try Again </button>
        <button type="button" class="btn btn-danger" onclick='stopGame()'>Stop Game</button>`;
    }

  }

  previewBet();

}

/* NEW Max Bet Unit after notices */
function setLoss() {
  var temp = parseInt(document.getElementById('setNo').value);
  if (temp > stopLoss) {
    stopLoss = temp;
    document.getElementById('estopLoss').value = stopLoss;
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
        <button type="button" class="btn btn-primary" onclick="nextNotices('nextNoticesLoss')">Try Again </button>
        <button type="button" class="btn btn-danger" onclick='stopGame()'>Stop Game</button>`;
    }

  }

  previewBet();

}

/* NEW Stop Profit after notices */
function setProfit() {

  var temp = parseInt(document.getElementById('setNo').value);
  if (temp > stopProfit) {
    stopProfit = temp;
    document.getElementById("estopProfit").value = stopProfit;
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
        <button type="button" class="btn btn-primary" onclick="nextNotices('nextNoticesProfit')">Try Again </button>
        <button type="button" class="btn btn-danger" onclick='stopGame()'>Stop Game</button>`;
    }

  }

  previewBet();


}

/* Check For Stop Loss */
function checkStopLoss() {

  stopLossIN1 = null;
  if (Borad.length == 0) return;
  if (stopLoss1 > 0) {
    stopLoss1 = -1 * stopLoss1;
  }

  if (stopLoss1 >= Borad[Borad.length - 1].playerGame.netProfit - betUnitP - tieUnitP && ('Player' == selectedText
    || (selectedGameModeInMultipleMode['Player'] == 1 && selectedText == "Multiple Mode"))) {
    stopLossIN1 = 'Player';
    netStopLoss1 = Borad[Borad.length - 1].playerGame.netProfit - betUnitP - tieUnitP;
  }

  if (stopLoss1 >= Borad[Borad.length - 1].BankerGame.netProfit - betUnitB - tieUnitB && ('Banker' == selectedText
    || (selectedGameModeInMultipleMode['Banker'] == 1 && selectedText == "Multiple Mode"))) {
    stopLossIN1 = 'Banker';
    netStopLoss1 = Borad[Borad.length - 1].BankerGame.netProfit - betUnitB - tieUnitB;
  }

  if (stopLoss1 >= Borad[Borad.length - 1].differential.netProfit - betUnitD - tieUnitD && ('Differential' == selectedText
    || (selectedGameModeInMultipleMode['Differential'] == 1 && selectedText == "Multiple Mode"))) {
    stopLossIN1 = 'Differential';
    netStopLoss1 = Borad[Borad.length - 1].differential.netProfit - betUnitD - tieUnitD;
  }

  if (stopLoss1 >= Borad[Borad.length - 1].Target.netProfitTargetB - betUnitTargetB - tieUnitTarget && ('Target' == selectedText
    || (selectedGameModeInMultipleMode['Target'] == 1 && selectedText == "Multiple Mode"))) {
    stopLossIN1 = 'Target';
    netStopLoss1 = Borad[Borad.length - 1].Target.netProfitTargetB - betUnitTargetB - tieUnitTarget;
  }

  if (stopLoss1 >= Borad[Borad.length - 1].Target.netProfitTargetP - betUnitTargetP - tieUnitTarget && ('Target' == selectedText
    || (selectedGameModeInMultipleMode['Target'] == 1 && selectedText == "Multiple Mode"))) {
    stopLossIN1 = 'Target';
    netStopLoss1 = Borad[Borad.length - 1].Target.netProfitTargetP - betUnitTargetP - tieUnitTarget;
  }

  // if (stopLoss1 >= BoradForMultiMode[BoradForMultiMode.length - 1].netProfit - multipleBetUnitOnPlayer - multipleBetUnitOnTie + multipleBetUnitOnBanker && (selectedText == "Multiple Mode")) {
  //   stopLossIN1 = "Multiple Mode";
  //   netStopLoss1 = BoradForMultiMode[BoradForMultiMode.length - 1].netProfit - multipleBetUnitOnPlayer - multipleBetUnitOnTie + multipleBetUnitOnBanker;
  // }

  // if (stopLoss1 >= BoradForMultiMode[BoradForMultiMode.length - 1].netProfit + multipleBetUnitOnPlayer - multipleBetUnitOnTie - multipleBetUnitOnBanker && (selectedText == "Multiple Mode")) {
  //   stopLossIN1 = "Multiple Mode";
  //   netStopLoss1 = BoradForMultiMode[BoradForMultiMode.length - 1].netProfit + multipleBetUnitOnPlayer - multipleBetUnitOnTie - multipleBetUnitOnBanker;
  // }

  if (stopLoss1 >= Borad[Borad.length - 1].SOW.netProfit - betUnitSOW - tieUnitSOW && (selectedText == 'SOW'
    || (selectedGameModeInMultipleMode['SOW'] == 1 && selectedText == "Multiple Mode"))) {
    stopLossIN1 = 'SOW';
    netStopLoss1 = Borad[Borad.length - 1].SOW.netProfit - betUnitSOW - tieUnitSOW;
  }

  if (stopLoss1 >= Borad[Borad.length - 1].ZigZagPlayerGame.netProfit - betUnitZigZagPlayer - tieUnitZigZagPlayer && (selectedText == 'ZigZag Player First'
    || (selectedGameModeInMultipleMode['ZigZagPlayer'] == 1 && selectedText == "Multiple Mode"))) {
    stopLossIN1 = 'ZigZag Player First';
    netStopLoss1 = Borad[Borad.length - 1].ZigZagPlayerGame.netProfit - betUnitZigZagPlayer - tieUnitZigZagPlayer;
  }

  if (stopLoss1 >= Borad[Borad.length - 1].ZigZagBankerGame.netProfit - betUnitZigZagBanker - tieUnitZigZagBanker && (selectedText == 'ZigZag Banker First'
    || (selectedGameModeInMultipleMode['ZigZagBanker'] == 1 && selectedText == "Multiple Mode"))) {
    stopLossIN1 = 'ZigZag Banker First';
    netStopLoss1 = Borad[Borad.length - 1].ZigZagBankerGame.netProfit - betUnitZigZagBanker - tieUnitZigZagBanker;
  }

  if (stopLoss1 >= Borad[Borad.length - 1].MVD.netProfit - betUnitMVD - tieUnitMVD && (selectedText == 'MVD'
    || (selectedGameModeInMultipleMode['MVD'] == 1 && selectedText == "Multiple Mode"))) {
    stopLossIN1 = 'MVD';
    netStopLoss1 = Borad[Borad.length - 1].MVD.netProfit - betUnitMVD - tieUnitMVD;
  }

  if (stopLossIN1 != null && (selectedText == "Multiple Mode" || stopLossNotices1 == 0) && statusIsFileUpload == 0) {

    document.getElementById("oc").innerHTML = '<h4>Your Net Loss is Now Become Less than Stop Loss.<br/>Your Net Loss is ' + netStopLoss1 + '</h4><br> <h3> So you want play continue !? </h3>';

    document.getElementById("oc").innerHTML += ` <br><br>
       <button type="button" class="btn btn-success" onclick='closeNav()'>Yes</button>
       <button type="button" class="btn btn-danger" onclick='stopGame()'>No</button>
       <button type="button" class="btn btn-primary" onclick="nextNotices('nextNoticesLoss1')">You Want Next Notices !? </button>
       `;

    if (selectedText == "Multiple Mode") {
      document.getElementById("oc").innerHTML = `<h4>Your Net Loss is Now Become Less than Stop Loss in ${stopLossIN1}.
          Your Net Loss is  ${netStopLoss1} </h4><br> <h3> So you want to play continue With ${stopLossIN1} !? </h3>`;

      document.getElementById("oc").innerHTML += ` <br><br>
         <button type="button" class="btn btn-success" onclick='closeNav()'>Yes</button>
         <button type="button" class="btn btn-danger" onclick='stopGameInMultiModeStopLoss()'>No</button>
         `;

    }
    stopLossNotices1 = 1;
    openNav();

  }

  if (stopLossIN1 != null && statusIsFileUpload == 1) {

    if (statusOfRS == 1) {

      stopGameInRS = 1;

    } else {

      tempWinner = excelRows[startNumber - 1]['Hand ' + count4ShoesHand];
      excelRows[startNumber - 1]['Hand ' + count4ShoesHand] = "null";
    }

  }

}

/* Check For Stop Profit */
function checkStopProfit() {

  stopProfitIN = null;
  if (Borad.length == 0) return;

  if (stopProfit <= Borad[Borad.length - 1].playerGame.netProfit && 'Player' == selectedText) {
    stopProfitIN = 'Player';
    netStopProfit = Borad[Borad.length - 1].playerGame.netProfit;
  }

  if (stopProfit <= Borad[Borad.length - 1].BankerGame.netProfit && 'Banker' == selectedText) {
    stopProfitIN = 'Banker';
    netStopProfit = Borad[Borad.length - 1].BankerGame.netProfit;
  }

  if (stopProfit <= Borad[Borad.length - 1].differential.netProfit && 'Differential' == selectedText) {
    stopProfitIN = 'Differential';
    netStopProfit = Borad[Borad.length - 1].differential.netProfit;
  }

  if (stopProfit <= (Borad[Borad.length - 1].Target.netProfitTargetB + Borad[Borad.length - 1].Target.netProfitTargetP) && 'Target' == selectedText) {
    stopProfitIN = 'Target';
    netStopProfit = Borad[Borad.length - 1].Target.netProfitTargetB + Borad[Borad.length - 1].Target.netProfitTargetP;
  }

  if (stopProfit <= BoradForMultiMode[BoradForMultiMode.length - 1].netProfit && selectedText == "Multiple Mode") {
    stopProfitIN = 'Multiple Mode';
    netStopProfit = BoradForMultiMode[BoradForMultiMode.length - 1].netProfit;
  }

  if (stopProfit <= Borad[Borad.length - 1].SOW.netProfit && selectedText == 'SOW') {
    stopProfitIN = 'SOW';
    netStopProfit = Borad[Borad.length - 1].SOW.netProfit;
  }

  if (stopProfit <= Borad[Borad.length - 1].ZigZagPlayerGame.netProfit && selectedText == 'ZigZag Player First') {
    stopProfitIN = 'ZigZag Player First';
    netStopProfit = Borad[Borad.length - 1].ZigZagPlayerGame.netProfit;
  }

  if (stopProfit <= Borad[Borad.length - 1].ZigZagBankerGame.netProfit && selectedText == 'ZigZag Banker First') {
    stopProfitIN = 'ZigZag Banker First';
    netStopProfit = Borad[Borad.length - 1].ZigZagBankerGame.netProfit;
  }

  if (stopProfit <= Borad[Borad.length - 1].MVD.netProfit && selectedText == 'MVD') {
    stopProfitIN = 'MVD';
    netStopProfit = Borad[Borad.length - 1].MVD.netProfit;
  }


  if (stopProfitIN != null && stopProfitNotices == 0 && statusIsFileUpload == 0) {
    document.getElementById("oc").innerHTML = '<h4>Your Net Profit is Now Greater than Take Profit.<br/>Your Net Profit is ' + netStopProfit + '</h4><br> <h3> So you want play continue !? </h3>';
    document.getElementById("oc").innerHTML += ` <br><br>
      <button type="button" class="btn btn-success" onclick='closeNav()'>Yes</button>
      <button type="button" class="btn btn-danger" onclick='stopGame()'>No</button>
      <button type="button" class="btn btn-primary" onclick="nextNotices('nextNoticesProfit')">You Want Next Notices !? </button>
      `;
    stopProfitNotices = 1;
    openNav();

  }

  if (stopProfitIN != null && statusIsFileUpload == 1) {

    if (statusOfRS == 1) {

      stopGameInRS = 1;

    } else {
      tempWinner = excelRows[startNumber - 1]['Hand ' + count4ShoesHand];
      excelRows[startNumber - 1]['Hand ' + count4ShoesHand] = "null";
    }

  }

}

/* Check For Max Bet */
function checkMaxBet() {

  stopLossIN = null;
  if (Borad.length == 0) return;

  if (stopLoss < (betUnitP + tieUnitP) && 'Player' == selectedText) {
    stopLossIN = 'Player';
    netStopLoss = betUnitP + tieUnitP;
  }

  if (stopLoss < (betUnitB + tieUnitB) && 'Banker' == selectedText) {
    stopLossIN = 'Banker';
    netStopLoss = betUnitB + tieUnitB;
  }

  if (stopLoss < (betUnitD + tieUnitD) && 'Differential' == selectedText) {
    stopLossIN = 'Differential';
    netStopLoss = betUnitD + tieUnitD;
  }

  if ((stopLoss < (betUnitTargetB + tieUnitTarget) || stopLoss < (betUnitTargetP + tieUnitTarget)) && 'Target' == selectedText) {
    stopLossIN = 'Target';
    if (stopLoss < betUnitTargetB) {
      netStopLoss = betUnitTargetB + tieUnitTarget;
    } else {
      netStopLoss = betUnitTargetP + tieUnitTarget;
    }
  }

  if (stopLoss < betUnitSOW + tieUnitSOW && selectedText == 'SOW') {
    stopLossIN = 'SOW';
    netStopLoss = betUnitSOW + tieUnitSOW;
  }

  if (stopLoss < (multipleBetUnitOnPlayer + multipleBetUnitOnBanker + multipleBetUnitOnTie) && 'Multiple Mode' == selectedText) {
    stopLossIN = 'Multiple Mode';
    netStopLoss = multipleBetUnitOnPlayer + multipleBetUnitOnBanker + multipleBetUnitOnTie;
  }

  if (stopLoss < betUnitZigZagPlayer + tieUnitZigZagPlayer && selectedText == 'ZigZag Player First') {
    stopLossIN = 'ZigZag Player First';
    netStopLoss = betUnitZigZagPlayer + tieUnitZigZagPlayer;
  }

  if (stopLoss < betUnitZigZagBanker + tieUnitZigZagBanker && selectedText == 'ZigZag Banker First') {
    stopLossIN = 'ZigZag Banker First';
    netStopLoss = betUnitZigZagBanker + tieUnitZigZagBanker;
  }

  if (stopLoss < betUnitMVD + tieUnitMVD && selectedText == 'MVD') {
    stopLossIN = 'MVD';
    netStopLoss = betUnitMVD + tieUnitMVD;
  }

  if (stopLossIN != null && stopLossNotices == 0 && statusIsFileUpload == 0) {
    document.getElementById("oc").innerHTML = '<h4>Your Bet Unit is Now Less than Max Bet.<br/>Your Bet Unit is ' + netStopLoss + '</h4><br> <h3> So you want play continue !? </h3>';
    document.getElementById("oc").innerHTML += ` <br><br>
        <button type="button" class="btn btn-success" onclick='closeNav()'>Yes</button>
        <button type="button" class="btn btn-danger" onclick='stopGame()'>No</button>
        <button type="button" class="btn btn-primary" onclick="nextNotices('nextNoticesLoss')">You Want Next Notices !? </button>
        `;
    stopLossNotices = 1;
    openNav();

  }

  if (stopLossIN != null && statusIsFileUpload == 1) {

    if (statusOfRS == 1) {

      stopGameInRS = 1;

    } else {

      tempWinner = excelRows[startNumber - 1]['Hand ' + count4ShoesHand];
      excelRows[startNumber - 1]['Hand ' + count4ShoesHand] = "null";

    }


  }


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

  if (stopLossIN1 == 'ZigZag Player First') {
    stopLossIN1 = 'ZigZagPlayer';
  }

  if (stopLossIN1 == 'ZigZag Banker First') {
    stopLossIN1 = 'ZigZagBanker';
  }

  selectedGameModeInMultipleMode[stopLossIN1] = 0;

  document.getElementById('MaltipleGameModeOn' + stopLossIN1).checked = false;

  previewBet();
  closeNav();
}


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
    <td>${totalBetAmtP}</td>`;
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
    <td>${totalBetAmtB}</td>`;
    if (Borad.length == 0) html += `<td>0</td>`;
    else if (0 > totalBalanceInMMInBanker) html += "<td class='boradTableinBanker'>" + totalBalanceInMMInBankere + "</td>";
    else html += "<td>" + totalBalanceInMMInBanker + "</td>";
    html += `</tr>`;
  }
  if (selectedGameModeInMultipleMode['Differential'] == 1) {
    i++;
    html += `<tr>
    <th scope="row">${i}</th>
    <td>Differential</td>
    <td>${totalBetAmtD}</td>`;
    if (Borad.length == 0) html += `<td>0</td>`;
    else if (0 > totalBalanceInMMInDiff) html += "<td class='boradTableinBanker'>" + totalBalanceInMMInDiff + "</td>";
    else html += "<td>" + totalBalanceInMMInDiff + "</td>";
    html += `</tr>`;
  }
  if (selectedGameModeInMultipleMode['Target'] == 1) {
    i++;
    html += `<tr>
    <th scope="row">${i}</th>
    <td>Target</td>
    <td>${totalBetAmtTarget}</td>`;
    if (Borad.length == 0) html += `<td>0</td>`;
    else if (0 > totalBalanceInMMInTarget) html += "<td class='boradTableinBanker'>" + totalBalanceInMMInTarget + "</td>";
    else html += "<td>" + totalBalanceInMMInTarget + "</td>";
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
2 :- Change in Per Unit Size
*
*/
function changeUnit() {

  if (document.getElementById('perUnit').value > 0) {
    PerUnit = document.getElementById('perUnit').value;
    if (statusIsFileUpload == 1) {
      return;
    }
    changeDataTable();
    return;

  } else {
    document.getElementById('perUnit').value = 1;
    PerUnit = document.getElementById('perUnit').value;
    if (statusIsFileUpload == 1) {
      return;
    }
    changeDataTable();
    return;
  }
}





/* 
*
3 :- Clear Table 
*
*/

function clearTable() {

  hand = 0;
  noOfBanker = 0; noOfPlayer = 0; TotalTieWin = 0;
  winB = 0; winD = 0; winP = 0;
  netProfitB = 0; netProfitP = 0; netProfitD = 0;
  totalBetUnitP = 1; totalBetUnitB = 1; totalBetUnitD = 1;
  betUnitP = 1, betUnitB = 1, betUnitD = 1;
  balanceP = 0; balanceB = 0; balanceD = 0;
  BetOnTieP = 0, BetOnTieB = 0, BetOnTieD = 0;
  totalBetAmtP = 0, totalBetAmtB = 0, totalBetAmtD = 0;
  tieAmtP = 0, tieAmtB = 0, tieAmtD = 0;
  tieWin = 0, TotalTieWinP = 0, TotalTieWinB = 0;
  Borad.length = 0;
  //whereSingleB.length = 0;
  singleBNo = 0; singlePNo = 0;
  betonTarget = null, totalBetAmtTarget = 0;
  betUnitTargetB = 1, betUnitTargetP = 1;
  netProfitTargetB = 0, netProfitTargetP = 0;
  balanceTargetB = 0, balanceTargetP = 0;
  winTargetB = 0, winTargetP = 0;
  saveWinsAsBankerTarget = 0, saveWinsAsBankerP = 0, saveWinsAsBankerB = 0, saveWinsAsBankerDiff = 0;
  TotalbalanceTarget = 0;
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
  // multi mode  
  multipleBetUnitOnPlayer = 0, multipleBetUnitOnBanker = 0;
  multipleBetOnTie = 0, multipleBetUnitOnTie = 0, multipleBetAmountOnTie = 0;
  multipleBetOnPlayer = 0, multipleBetOnBanker = 0;
  TotalBetAmountInMultipleMode = 0, balanceMultipleMode = 0;
  balanceMultipleMode = 0, BoradForMultiMode = [];
  netProfitMultiMode = 0;
  wholeBetUnitINMM = 0, WholeWinUnitINMM = 0, WholeLossUnitINMM = 0;
  saveMaxContiuneWinINMM = 0, saveMaxContiuneLossIMM = 0;
  maxContiuneWinINMM = 0, maxContiuneLossINMM = 0;
  saveMaxBetINMM = 0, saveMaxBalanceINMM = 0;
  winASPlayerINMM = 0; winASBankerINMM = 0;
  brakeCountMultiMode = 0;
  DummymultipleBetOnPlayer = 0, DummymultipleBetOnBanker = 0;
  DummymultipleBetUnitOnPlayer = 0, DummymultipleBetUnitOnBanker = 0;

  //  For SOW //
  totalBetAmtSOW = 0, betUnitSOW = 0, maxBetSOW = 0;
  BetOnTieSOW = 0, netProfitSOW = 0, betUnitSOW = 0;
  balanceSOW = 0, tieAmtSOW = 0, winSOW = 0, TotalTieWinSOW = 0;
  WholeWinUnitSOW = 0, tieUnitSOW = 0, maxContiuneWinSOW = 0, maxContiuneLossSOW = 0;
  saveMaxContiuneWinSOW = 0, brakeCountSOW = 0, saveMaxBalanceSOW = 0;
  WholeLossUnitSOW = 0, saveWinsAsSOWSOW = 0, saveMaxContiuneLossSOW = 0;
  noOfWinsRowInSOW = 0, previewBetUnitSOWWin = 0, previewBetUnitSOWLoss = 0;
  BrakeModeOnInPlaySOW = 0, WholeBetUnitSOW = 0;
  saveWinsAsSOWPlayer = 0;
  sameAsWinSOW = null, oppositeOfWinSOW = null;
  betOnWhichPartySOW = -1;
  vaildLengthToStartGame = 2, statusOfSOWGame = 0;
  previewBetOnSOWWin = null, previewBetOnSOWLoss = null;
  setBetSOW = 0; saveWinsAsBankerSOW = 0;

  // Zig Zag Player First //
  totalBetAmtZigZagPlayer, betUnitZigZagPlayer, maxBetZigZagPlayer, betOnZigZagPlayer = 'Player';
  BetOnTieZigZagPlayer = 0, netProfitZigZagPlayer = 0, betUnitZigZagPlayer = 0;
  balanceZigZagPlayer = 0, tieAmtZigZagPlayer = 0, winZigZagPlayer = 0, TotalTieWinZigZagPlayer = 0;
  WholeWinUnitZigZagPlayer = 0, tieUnitZigZagPlayer = 0, maxContiuneWinZigZagPlayer = 0, maxContiuneLossZigZagPlayer = 0;
  saveMaxContiuneWinZigZagPlayer = 0, brakeCountZigZagPlayer = 0, saveMaxBalanceZigZagPlayer = 0;
  WholeLossUnitZigZagPlayer = 0, saveWinsAsZigZagPlayerPlayer = 0, saveMaxContiuneLossZigZagPlayer = 0;
  noOfWinsRowInZigZagPlayer = 0, previewBetUnitZigZagPlayerWin = 0, previewBetUnitZigZagPlayerLoss = 0;
  BrakeModeOnInPlayZigZagPlayer = 0, WholeBetUnitZigZagPlayer = 0; saveWinsAsBankerZigZagPlayer = 0;

  // Zig Zag Banker First //
  totalBetAmtZigZagBanker, betUnitZigZagBanker, maxBetZigZagBanker, betOnZigZagBanker = 'Banker';
  BetOnTieZigZagBanker = 0, netProfitZigZagBanker = 0, betUnitZigZagBanker = 0;
  balanceZigZagBanker = 0, tieAmtZigZagBanker = 0, winZigZagBanker = 0, TotalTieWinZigZagBanker = 0;
  WholeWinUnitZigZagBanker = 0, tieUnitZigZagBanker = 0, maxContiuneWinZigZagBanker = 0, maxContiuneLossZigZagBanker = 0;
  saveMaxContiuneWinZigZagBanker = 0, brakeCountZigZagBanker = 0, saveMaxBalanceZigZagBanker = 0;
  WholeLossUnitZigZagBanker = 0, saveWinsAsZigZagBankerPlayer = 0, saveMaxContiuneLossZigZagBanker = 0;
  noOfWinsRowInZigZagBanker = 0, previewBetUnitZigZagBankerWin = 0, previewBetUnitZigZagBankerLoss = 0;
  BrakeModeOnInPlayZigZagBanker = 0, WholeBetUnitZigZagBanker = 0; saveWinsAsBankerZigZagBanker = 0;

  // MVD
  betOnMVD = "", startGameMVD = 0, setBanker1stTime = 0;
  betUnitMVD = -1;
  totalBetAmtMVD = 0, maxBetMVD = 0;
  BetOnTieMVD = 0, netProfitMVD = 0;
  balanceMVD = 0, tieAmtMVD = 0, winMVD = 0, TotalTieWinMVD = 0;
  WholeWinUnitMVD = 0, tieUnitMVD = 0, maxContiuneWinMVD = 0, maxContiuneLossMVD = 0;
  saveMaxContiuneWinMVD = 0, brakeCountMVD = 0, saveMaxBalanceMVD = 0;
  WholeLossUnitMVD = 0, saveWinsAsMVDPlayer = 0, saveMaxContiuneLossMVD = 0;
  noOfWinsRowInMVD = 0, previewBetUnitMVDWin = 0, previewBetUnitMVDLoss = 0;
  BrakeModeOnInPlayMVD = 0, WholeBetUnitMVD = 0;
  previewBetOnMVDWin = "", previewBetOnMVDLoss = "", setBet0MVD = 0, singleMVDNo = 0; saveWinsAsBankerMVD = 0;

  stopLossIN = null, stopLossIN1 = null, stopProfitIN = null;
  stopLossNotices1 = 0, stopProfitNotices = 0, maxHnadNotices = 0, stopLossNotices = 0;
  maxHnadNotices = 0;
  maxContiuneWinP = 0, saveMaxContiuneWinP = 0, maxContiuneLossP = 0, saveMaxContiuneLossP = 0;
  maxContiuneWinB = 0, saveMaxContiuneWinB = 0, maxContiuneLossB = 0, saveMaxContiuneLossB = 0;
  maxContiuneWinD = 0, saveMaxContiuneWinD = 0, maxContiuneLossD = 0, saveMaxContiuneLossD = 0;
  WholeLossAmountB = 0, WholeLossAmountD = 0, WholeLossAmountP = 0, WholeLossAmountTarget = 0;
  WholeWinAmountB = 0, WholeWinAmountD = 0, WholeWinAmountP = 0, WholeWinAmountTarget = 0;
  maxContiuneWinTarget = 0, maxContiuneLossTarget = 0, saveMaxContiuneLossTarget = 0, saveMaxContiuneWinTarget = 0;
  saveMaxBalanceP = 0, saveMaxBalanceTarget = 0, saveMaxBalanceDiff = 0, saveMaxBalanceB = 0;
  saveWinsAsPlayerP = 0, saveWinsAsPlayerDiff = 0, saveWinsAsPlayerB = 0, saveWinsAsPlayerTarget = 0;

  tieAmtP = 0, tieAmtB = 0, tieAmtD = 0, tieAmtTarget = 0;
  BetOnTieP = 0, BetOnTieB = 0, BetOnTieD = 0, BetOnTieTarget = 0;
  tieUnitP = 0, tieUnitB = 0, tieUnitD = 0, tieUnitTarget = 0;

  totalBalanceInMMInPlayer = 0, totalBalanceInMMInBanker = 0;
  totalBalanceInMMInDiff = 0, totalBalanceInMMInTarget = 0;
  totalBalanceInMMInMVD = 0, totalBalanceInMMInSOW = 0;
  totalBalanceInMMInZigZagPlayer = 0, totalBalanceInMMInZigZagBanker = 0;


  if (statusIsFileUpload == 0) lastWinner = null;
  if (statusIsFileUpload == 0) actualWinner = null;
  if (statusIsFileUpload == 0) previewBet();
  if (statusIsFileUpload == 0) displayTable();
  if (statusIsFileUpload == 0) displayBaccaratBorad();
  // if (statusIsFileUpload == 0) hideVariableTable();
  if (statusIsFileUpload == 0 && statusOfVariableTableShow == 1) displayvariableTable();

  if (statusIsFileUpload == 0) displayAmtInLable();
}




/* 
*
4 :- Stop Game 
*
*/

function stopGame() {

  if (selectedText == 'Differential') {
    if (Borad.length == 0) {
      tempNet = 0;
    } else
      tempNet = Borad[Borad.length - 1].differential.balance;
  } else if (selectedText == 'Player') {
    if (Borad.length == 0) {
      tempNet = 0;
    } else
      tempNet = Borad[Borad.length - 1].playerGame.balance;
  } else if (selectedText == 'Banker') {
    if (Borad.length == 0) {
      tempNet = 0;
    } else
      tempNet = Borad[Borad.length - 1].BankerGame.balance;
  } else if (selectedText == 'Target') {
    if (Borad.length == 0) {
      tempNet = 0;
    } else
      tempNet = Borad[Borad.length - 1].Target.TotalbalanceTarget;

  } else if (selectedText == "Multiple Mode") {
    if (Borad.length == 0) {
      tempNet = 0;
    } else
      tempNet = BoradForMultiMode[BoradForMultiMode.length - 1].balance;
  } else if (selectedText == 'SOW') {
    if (Borad.length == 0) {
      tempNet = 0;
    } else
      tempNet = Borad[Borad.length - 1].SOW.balance;
  } else if (selectedText == 'ZigZag Banker First') {
    if (Borad.length == 0) {
      tempNet = 0;
    } else
      tempNet = Borad[Borad.length - 1].ZigZagBankerGame.balance;
  } else if (selectedText == 'ZigZag Player First') {
    if (Borad.length == 0) {
      tempNet = 0;
    } else
      tempNet = Borad[Borad.length - 1].ZigZagPlayerGame.balance;
  } else if (selectedText == 'MVD') {
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
  document.getElementById("stopGameResult").innerHTML = `< div style = "width : 100% ; text-align: center; " ><h4 class="text-danger">This Game is Stop. </h4>
    <h3> Net ${tempText} = ${tempNet} $ </h3>
    <a class="btn btn-primary" href="gamepage.html" role="button">Play Again</a> <a class="btn btn-primary" href="../index.html" role="button">Back To Home</a> 
    </div > ` ;
  document.getElementById('bottonOfWinners').innerHTML = '';
  closeNav();
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
  storeSelectedText = selectedText;
  if (selectedText == "Player") document.getElementById("bettypeINCP").options[1].selected = true;
  if (selectedText == "Banker") document.getElementById("bettypeINCP").options[0].selected = true;
  if (selectedText == "Differential") document.getElementById("bettypeINCP").options[2].selected = true;
  if (selectedText == "Target") document.getElementById("bettypeINCP").options[3].selected = true;
  if (selectedText == "SOW") document.getElementById("bettypeINCP").options[4].selected = true;
  if (selectedText == "Multiple Mode") {
    document.getElementById("bettypeINCP").options[5].selected = true;
    document.getElementById('multipleModeOptionINCP').style.display = 'block';
  }
  if (selectedText == "ZigZag Player First") document.getElementById("bettypeINCP").options[6].selected = true;
  if (selectedText == "ZigZag Banker First") document.getElementById("bettypeINCP").options[7].selected = true;
  if (selectedText == "MVD") document.getElementById("bettypeINCP").options[8].selected = true;

  // Play type 
  storePlayType = document.getElementById("PlayTypeId").value;
  // console.log(storePlayType);
  if (storePlayType == "Normal") document.getElementById("PlayTypeIdINCP").options[0].selected = true;
  if (storePlayType == "2nd Play") document.getElementById("PlayTypeIdINCP").options[1].selected = true;
  if (storePlayType == "3rd Play") document.getElementById("PlayTypeIdINCP").options[2].selected = true;
  if (storePlayType == "4th Play") document.getElementById("PlayTypeIdINCP").options[3].selected = true;
  if (storePlayType == "5th Play") document.getElementById("PlayTypeIdINCP").options[4].selected = true;


  // brake
  storeBrakeValue = document.getElementById('brakeId').value;
  document.getElementById("brakeIdINCP").value = storeBrakeValue;

  // Tie 
  storeTieMode = tieMode;
  document.getElementById("flexCheckDefaultINCP").checked = storeTieMode;

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
  storeSelectedGameModeInMultipleMode['Differential'] = selectedGameModeInMultipleMode['Differential'];
  storeSelectedGameModeInMultipleMode['Target'] = selectedGameModeInMultipleMode['Target'];
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

  if (storeSelectedGameModeInMultipleMode['Differential'] == 1) {
    document.getElementById("MaltipleGameModeOnDifferentialINCP").checked = true;
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

  if (storeSelectedGameModeInMultipleMode['Target'] == 1) {
    document.getElementById("MaltipleGameModeOnTargetINCP").checked = true;
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

  // Max Single Win
  storeMaxSingleWin = document.getElementById("esingleP").value;
  document.getElementById("esinglePINCP").value = storeMaxSingleWin;

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
  brakeValue = storeBrakeValue;
  document.getElementById('brakeId').value = brakeValue;
  // console.log("brake " + brakeValue);

  // Selected text
  selectedText = storeSelectedText;
  // console.log("setext " + selectedText);

  // Play type 
  console.log(storePlayType);
  if (storePlayType == "Normal") { normalPlay(); console.log("in normal"); }
  else if (storePlayType == "2nd Play") { chnage2ndPlay(); console.log("in 2nd"); }
  else if (storePlayType == "3rd Play") { chnage3rdPlay(); console.log("in 3rd"); }
  else if (storePlayType == "4th Play") { chnage4thPlay(); console.log("in 4th"); }
  else if (storePlayType == "5th Play") { chnage5thPlay(); console.log("in 5th"); }
  // console.log("play : " + Play2Mode + Play3Mode + Play4Mode + Play5Mode);

  // In MM Play Method 
  if (storePlayMethodINMM == 0) selectedMethodType = "Normal";
  if (storePlayMethodINMM == 1) selectedMethodType = "Differential";

  // IN MM Secletion 
  selectedGameModeInMultipleMode['Player'] = storeSelectedGameModeInMultipleMode['Player'];
  selectedGameModeInMultipleMode['SOW'] = storeSelectedGameModeInMultipleMode['SOW'];
  selectedGameModeInMultipleMode['Banker'] = storeSelectedGameModeInMultipleMode['Banker'];
  selectedGameModeInMultipleMode['Differential'] = storeSelectedGameModeInMultipleMode['Differential'];
  selectedGameModeInMultipleMode['Target'] = storeSelectedGameModeInMultipleMode['Target'];
  selectedGameModeInMultipleMode['ZigZagPlayer'] = storeSelectedGameModeInMultipleMode['ZigZagPlayer'];
  selectedGameModeInMultipleMode['ZigZagBanker'] = storeSelectedGameModeInMultipleMode['ZigZagBanker'];
  selectedGameModeInMultipleMode['All'] = storeSelectedGameModeInMultipleMode['All'];
  selectedGameModeInMultipleMode['MVD'] = storeSelectedGameModeInMultipleMode['MVD'];

  // Max Single Win 
  singlePlayer = storeMaxSingleWin;

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
    brakeValue = document.getElementById('brakeIdINCP').value;
  } else {
    document.getElementById('brakeIdINCP').value = 0;
    brakeValue = document.getElementById('brakeIdINCP').value;
  }
  changeDataTable();
}
