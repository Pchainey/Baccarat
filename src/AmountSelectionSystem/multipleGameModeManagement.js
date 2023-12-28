var bet = document.getElementById("bet");
multipleBetUnitOnPlayer = 0, multipleBetUnitOnBanker = 0;
multipleBetOnTie = 0, multipleBetUnitOnTie = 0, multipleBetAmountOnTie = 0;
multipleBetOnPlayer = 0, multipleBetOnBanker = 0;
var saveMaxContiuneWinINMM = 0, saveMaxContiuneLossIMM = 0;
balanceMultipleMode = 0;

// For noticifation to change in game modes
setChangeByNewAddMethodInGame = 0;

//Checking Player Is Selected Or Not 
function selectPlayer() {

    // if (selectedGameModeInMultipleMode['All'] == 1) return;

    document.getElementById('displayNoOptionSelected').style.display = "none";

    if (IschangePreferencesOn == 1) var checkingPlayerIsSelected = document.getElementById('MaltipleGameModeOnPlayerINCP');
    else var checkingPlayerIsSelected = document.getElementById('MaltipleGameModeOnPlayer');

    if (checkingPlayerIsSelected.checked == true) {
        selectedGameModeInMultipleMode['Player'] = 1;
    } else {
        selectedGameModeInMultipleMode['Player'] = 0;

        if (selectedGameModeInMultipleMode["Player"] == 0 && selectedGameModeInMultipleMode["Banker"] == 0 &&
            selectedGameModeInMultipleMode['ZigZagPlayer'] == 0 && selectedGameModeInMultipleMode['ZigZagBanker'] == 0
            && selectedGameModeInMultipleMode["SOW"] == 0 && selectedGameModeInMultipleMode['All'] == 0
            && selectedGameModeInMultipleMode['MVD'] == 0) {

            document.getElementById('displayNoOptionSelected').style.display = "Block";
            document.getElementById('bottonOfWinners').style.display = "none";
            return;
        }
    }
    if (statusIsFileUpload == 1) {
        return;
    }

    // setChangeByNewAddMethodInGame = 1;
    // changeDataTable();
    // setChangeByNewAddMethodInGame = 0;
    if (IschangePreferencesOn == 1) changeDataTable();
    else previewBet();

    document.getElementById('bottonOfWinners').style.display = "Block";


}

// Checking Banker Is Selected Or Not 
function selectBanker() {

    // if (selectedGameModeInMultipleMode['All'] == 1) return;

    document.getElementById('displayNoOptionSelected').style.display = "none";
    if (IschangePreferencesOn == 1) var checkingBankerIsSelected = document.getElementById('MaltipleGameModeOnBankerINCP');
    else var checkingBankerIsSelected = document.getElementById('MaltipleGameModeOnBanker');

    if (checkingBankerIsSelected.checked == true) {
        selectedGameModeInMultipleMode['Banker'] = 1;

    } else {
        selectedGameModeInMultipleMode['Banker'] = 0;

        if (selectedGameModeInMultipleMode["Player"] == 0 && selectedGameModeInMultipleMode["Banker"] == 0 &&
            selectedGameModeInMultipleMode['ZigZagPlayer'] == 0 && selectedGameModeInMultipleMode['ZigZagBanker'] == 0
            && selectedGameModeInMultipleMode["SOW"] == 0 && selectedGameModeInMultipleMode['All'] == 0
            && selectedGameModeInMultipleMode['MVD'] == 0) {

            document.getElementById('displayNoOptionSelected').style.display = "Block";
            document.getElementById('bottonOfWinners').style.display = "none";

            return;
        }

    }
    if (statusIsFileUpload == 1) {
        return;
    }

    // setChangeByNewAddMethodInGame = 1;
    // changeDataTable();
    // setChangeByNewAddMethodInGame = 0;

    if (IschangePreferencesOn == 1) changeDataTable();
    else previewBet();

    document.getElementById('bottonOfWinners').style.display = "Block";

}

// Checking Zig Zag Player First Is Selected Or Not 
function selectZigZagPlayer() {

    // if (selectedGameModeInMultipleMode['All'] == 1) return;

    document.getElementById('displayNoOptionSelected').style.display = "none";

    if (IschangePreferencesOn == 1) var checkingPlayerIsSelected = document.getElementById('MaltipleGameModeOnZigZagPlayerINCP');
    else var checkingPlayerIsSelected = document.getElementById('MaltipleGameModeOnZigZagPlayer');

    if (checkingPlayerIsSelected.checked == true) {
        selectedGameModeInMultipleMode['ZigZagPlayer'] = 1;
    } else {
        selectedGameModeInMultipleMode['ZigZagPlayer'] = 0;

        if (selectedGameModeInMultipleMode["Player"] == 0 && selectedGameModeInMultipleMode["Banker"] == 0 &&
            selectedGameModeInMultipleMode['ZigZagPlayer'] == 0 && selectedGameModeInMultipleMode['ZigZagBanker'] == 0
            && selectedGameModeInMultipleMode["SOW"] == 0 && selectedGameModeInMultipleMode['All'] == 0
            && selectedGameModeInMultipleMode['MVD'] == 0) {

            document.getElementById('displayNoOptionSelected').style.display = "Block";
            document.getElementById('bottonOfWinners').style.display = "none";
            return;
        }
    }

    if (statusIsFileUpload == 1) {
        return;
    }

    // setChangeByNewAddMethodInGame = 1;
    // changeDataTable();
    // setChangeByNewAddMethodInGame = 0;
    if (IschangePreferencesOn == 1) changeDataTable();
    else previewBet(); previewBet();

    document.getElementById('bottonOfWinners').style.display = "Block";

}

// Checking Zig Zag Banker Is Selected Or Not 
function selectZigZagBanker() {

    // if (selectedGameModeInMultipleMode['All'] == 1) return;

    document.getElementById('displayNoOptionSelected').style.display = "none";

    if (IschangePreferencesOn == 1) var checkingPlayerIsSelected = document.getElementById('MaltipleGameModeOnZigZagBankerINCP');
    else var checkingPlayerIsSelected = document.getElementById('MaltipleGameModeOnZigZagBanker');


    if (checkingPlayerIsSelected.checked == true) {
        selectedGameModeInMultipleMode['ZigZagBanker'] = 1;
    } else {
        selectedGameModeInMultipleMode['ZigZagBanker'] = 0;

        if (selectedGameModeInMultipleMode["Player"] == 0 && selectedGameModeInMultipleMode["Banker"] == 0 &&
            selectedGameModeInMultipleMode['ZigZagPlayer'] == 0 && selectedGameModeInMultipleMode['ZigZagBanker'] == 0
            && selectedGameModeInMultipleMode["SOW"] == 0 && selectedGameModeInMultipleMode['All'] == 0
            && selectedGameModeInMultipleMode['MVD'] == 0) {

            document.getElementById('displayNoOptionSelected').style.display = "Block";
            document.getElementById('bottonOfWinners').style.display = "none";
            return;
        }
    }

    if (statusIsFileUpload == 1) {
        return;
    }

    // setChangeByNewAddMethodInGame = 1;
    // changeDataTable();
    // setChangeByNewAddMethodInGame = 0;

    if (IschangePreferencesOn == 1) changeDataTable();
    else previewBet();

    document.getElementById('bottonOfWinners').style.display = "Block";

}

// Checking SOW is selected or not 
function selectSOW() {

    // if (selectedGameModeInMultipleMode['All'] == 1) return;

    document.getElementById('displayNoOptionSelected').style.display = "none";
    if (IschangePreferencesOn == 1) var checkingSOWIsSelected = document.getElementById('MaltipleGameModeOnSOWINCP');
    else var checkingSOWIsSelected = document.getElementById('MaltipleGameModeOnSOW');

    if (checkingSOWIsSelected.checked == true) {
        selectedGameModeInMultipleMode['SOW'] = 1;
    } else {
        selectedGameModeInMultipleMode['SOW'] = 0;

        if (selectedGameModeInMultipleMode["Player"] == 0 && selectedGameModeInMultipleMode["Banker"] == 0 &&
            selectedGameModeInMultipleMode['ZigZagPlayer'] == 0 && selectedGameModeInMultipleMode['ZigZagBanker'] == 0
            && selectedGameModeInMultipleMode["SOW"] == 0 && selectedGameModeInMultipleMode['All'] == 0
            && selectedGameModeInMultipleMode['MVD'] == 0) {

            document.getElementById('displayNoOptionSelected').style.display = "Block";
            document.getElementById('bottonOfWinners').style.display = "none";
            return;
        }
    }
    if (statusIsFileUpload == 1) {
        return;
    }

    // setChangeByNewAddMethodInGame = 1;
    // changeDataTable();
    // setChangeByNewAddMethodInGame = 0;

    if (IschangePreferencesOn == 1) changeDataTable();
    else previewBet();

    document.getElementById('bottonOfWinners').style.display = "Block";



}

// Checking MVD is selected or not 
function selectMVD() {
    // if (selectedGameModeInMultipleMode['All'] == 1) return;

    document.getElementById('displayNoOptionSelected').style.display = "none";
    if (IschangePreferencesOn == 1) var checkingPlayerIsSelected = document.getElementById('MaltipleGameModeOnMVDINCP');
    else var checkingPlayerIsSelected = document.getElementById('MaltipleGameModeOnMVD');

    if (checkingPlayerIsSelected.checked == true) {
        selectedGameModeInMultipleMode['MVD'] = 1;
    } else {
        selectedGameModeInMultipleMode['MVD'] = 0;

        if (selectedGameModeInMultipleMode["Player"] == 0 && selectedGameModeInMultipleMode["Banker"] == 0 &&
            selectedGameModeInMultipleMode['ZigZagPlayer'] == 0 && selectedGameModeInMultipleMode['ZigZagBanker'] == 0
            && selectedGameModeInMultipleMode["SOW"] == 0 && selectedGameModeInMultipleMode['MVD'] == 0 && selectedGameModeInMultipleMode['All'] == 0) {

            document.getElementById('displayNoOptionSelected').style.display = "Block";
            document.getElementById('bottonOfWinners').style.display = "none";
            return;
        }
    }

    if (statusIsFileUpload == 1) {
        return;
    }

    // setChangeByNewAddMethodInGame = 1;
    // changeDataTable();
    // setChangeByNewAddMethodInGame = 0;

    if (IschangePreferencesOn == 1) changeDataTable();
    else previewBet();

    document.getElementById('bottonOfWinners').style.display = "Block";
}

// Checkin All Is selected or not
function selectAllMode() {

    document.getElementById('displayNoOptionSelected').style.display = "none";

    if (IschangePreferencesOn == 1) var checkingSOWIsSelected = document.getElementById('MaltipleGameModeOnAllINCP');
    else var checkingSOWIsSelected = document.getElementById('MaltipleGameModeOnAll');

    if (checkingSOWIsSelected.checked == true) {

        selectedGameModeInMultipleMode['All'] = 1;

        selectedGameModeInMultipleMode['Player'] = 1;
        document.getElementById('MaltipleGameModeOnPlayer').checked = true;
        selectedGameModeInMultipleMode['SOW'] = 1;
        document.getElementById('MaltipleGameModeOnSOW').checked = true;
        selectedGameModeInMultipleMode['Banker'] = 1;
        document.getElementById('MaltipleGameModeOnBanker').checked = true;
        selectedGameModeInMultipleMode['ZigZagPlayer'] = 1;
        document.getElementById('MaltipleGameModeOnZigZagPlayer').checked = true;
        selectedGameModeInMultipleMode['ZigZagBanker'] = 1;
        document.getElementById('MaltipleGameModeOnZigZagBanker').checked = true;
        selectedGameModeInMultipleMode['MVD'] = 1;
        document.getElementById('MaltipleGameModeOnMVD').checked = true;

    } else {
        selectedGameModeInMultipleMode['All'] = 0;


        selectedGameModeInMultipleMode['Player'] = 0;
        document.getElementById('MaltipleGameModeOnPlayer').checked = false;
        selectedGameModeInMultipleMode['SOW'] = 0;
        document.getElementById('MaltipleGameModeOnSOW').checked = false;
        selectedGameModeInMultipleMode['Banker'] = 0;
        document.getElementById('MaltipleGameModeOnBanker').checked = false;
        selectedGameModeInMultipleMode['ZigZagPlayer'] = 0;
        document.getElementById('MaltipleGameModeOnZigZagPlayer').checked = false;
        selectedGameModeInMultipleMode['ZigZagBanker'] = 0;
        document.getElementById('MaltipleGameModeOnZigZagBanker').checked = false;
        selectedGameModeInMultipleMode['MVD'] = 0;
        document.getElementById('MaltipleGameModeOnMVD').checked = false;


        if (selectedGameModeInMultipleMode["Player"] == 0 && selectedGameModeInMultipleMode["Banker"] == 0 &&
            selectedGameModeInMultipleMode['ZigZagPlayer'] == 0 && selectedGameModeInMultipleMode['ZigZagBanker'] == 0
            && selectedGameModeInMultipleMode["SOW"] == 0 && selectedGameModeInMultipleMode['All'] == 0
            && selectedGameModeInMultipleMode['MVD'] == 0) {

            document.getElementById('displayNoOptionSelected').style.display = "Block";
            document.getElementById('bottonOfWinners').style.display = "none";
            return;
        }

        // To Check which strategy is on to reset those
        // selectZigZagBanker();
        // selectSOW();
        // selectPlayer();
        // selectBanker();
        // selectZigZagPlayer();
    }

    if (statusIsFileUpload == 1) {
        return;
    }

    // setChangeByNewAddMethodInGame = 1;
    // changeDataTable();
    // setChangeByNewAddMethodInGame = 0;

    if (IschangePreferencesOn == 1) changeDataTable();
    else previewBet();

    document.getElementById('bottonOfWinners').style.display = "Block";
}


function balanceManagemrnt(winner) {


    if (BoradForMultiMode.length == 0) {
        balanceMultipleMode = 0;
    }

    if (winner == 'Player') {
        balanceMultipleMode += multipleBetUnitOnPlayer * PerUnit;
        balanceMultipleMode -= multipleBetUnitOnBanker * PerUnit;
        netProfitMultiMode += multipleBetUnitOnPlayer;
        netProfitMultiMode -= multipleBetUnitOnBanker;

        WholeWinUnitINMM += multipleBetUnitOnPlayer;
        WholeLossUnitINMM += multipleBetUnitOnBanker;
        if (multipleBetOnPlayer == 1 && multipleBetUnitOnPlayer >= multipleBetUnitOnBanker) winASPlayerINMM++;

        // brake mode is on 
        if (BoradForMultiMode.length >= 1 && BoradForMultiMode[BoradForMultiMode.length - 1].BrakeCount >= brakeNo) {
            if (DummymultipleBetUnitOnPlayer >= DummymultipleBetUnitOnBanker) {
                brakeCountMultiMode = 0;
            }
        }

        // brake count
        else if (multipleBetUnitOnPlayer <= multipleBetUnitOnBanker) {
            if (BoradForMultiMode.length >= 1) {
                brakeCountMultiMode = BoradForMultiMode[BoradForMultiMode.length - 1].BrakeCount + 1;
            } else {
                brakeCountMultiMode = 1;
            }
        } else {
            brakeCountMultiMode = 0;
        }
    }



    if (winner == "Banker") {
        balanceMultipleMode += multipleBetUnitOnBanker * (PerUnit * comission4Banker / 100);
        balanceMultipleMode -= multipleBetUnitOnPlayer * PerUnit;
        netProfitMultiMode -= multipleBetUnitOnPlayer;
        netProfitMultiMode += multipleBetUnitOnBanker;

        WholeWinUnitINMM += multipleBetUnitOnBanker;
        WholeLossUnitINMM += multipleBetUnitOnPlayer;

        if (multipleBetOnBanker == 1 && multipleBetUnitOnPlayer <= multipleBetUnitOnBanker) winASBankerINMM++;

        // brake mode is on 
        if (BoradForMultiMode.length >= 1 && BoradForMultiMode[BoradForMultiMode.length - 1].BrakeCount >= brakeNo) {
            if (DummymultipleBetUnitOnPlayer <= DummymultipleBetUnitOnBanker) {
                brakeCountMultiMode = 0;
            }
        }

        // brake count
        else if (multipleBetUnitOnPlayer >= multipleBetUnitOnBanker) {
            if (BoradForMultiMode.length >= 1) {
                brakeCountMultiMode = BoradForMultiMode[BoradForMultiMode.length - 1].BrakeCount + 1;
            } else {
                brakeCountMultiMode = 1;
            }
        } else {
            brakeCountMultiMode = 0;
        }


    }



    if (winner == 'Tie') {
        if (multipleBetOnTie == 1) {
            balanceMultipleMode += multipleBetAmountOnTie * 8;
            netProfitMultiMode += multipleBetUnitOnTie;

            WholeWinUnitINMM += multipleBetUnitOnTie;

        }
    }


    if (multipleBetOnTie == 1 && winner != 'Tie') {
        balanceMultipleMode -= multipleBetAmountOnTie;
        netProfitMultiMode -= multipleBetUnitOnTie;
        WholeLossUnitINMM += multipleBetUnitOnTie;
    }


    balanceMultipleMode = roundOff(balanceMultipleMode, 2);

    if (saveMaxBalanceINMM < balanceMultipleMode) {
        saveMaxBalanceINMM = balanceMultipleMode;
    }

    if (BoradForMultiMode.length != 0) {

        if (balanceMultipleMode > BoradForMultiMode[BoradForMultiMode.length - 1].balance) {
            maxContiuneWinINMM++;
            maxContiuneLossINMM = 0;
        } else {
            maxContiuneLossINMM++;
            maxContiuneWinINMM = 0;
        }


        if (maxContiuneWinINMM > BoradForMultiMode[BoradForMultiMode.length - 1].maxContiuneWin) {
            saveMaxContiuneWinINMM = maxContiuneWinINMM;
        }

        if (maxContiuneLossINMM > BoradForMultiMode[BoradForMultiMode.length - 1].maxContiuneLoss) {
            saveMaxContiuneLossIMM = maxContiuneLossINMM;
        }

    } else {
        if (balanceMultipleMode > 0) {
            maxContiuneWinINMM++;
            maxContiuneLossINMM = 0;
            saveMaxContiuneWinINMM = maxContiuneWinINMM;

        } else {
            maxContiuneLossINMM++;
            maxContiuneWinINMM = 0;

            saveMaxContiuneLossIMM = maxContiuneLossINMM;

        }
    }

}

function pushInTableINMultiMode() {

    tempSaveObject = [];

    tempSaveObject[0] = selectedGameModeInMultipleMode['Player'];
    tempSaveObject[1] = selectedGameModeInMultipleMode['Banker'];
    tempSaveObject[2] = selectedGameModeInMultipleMode['ZigZagPlayer'];
    tempSaveObject[3] = selectedGameModeInMultipleMode['ZigZagBanker'];
    tempSaveObject[4] = selectedGameModeInMultipleMode['SOW'];
    tempSaveObject[5] = selectedGameModeInMultipleMode['MVD'];



    let tempToSaveData = {
        hand: hand,
        TieMode: tieMode,
        BrakeCount: brakeCountMultiMode,
        actualWinner: actualWinner,
        selectedGameMode: tempSaveObject,
        BetOnPlayer: multipleBetOnPlayer,
        BetOnBanker: multipleBetOnBanker,
        BetUnitOnPlayer: multipleBetUnitOnPlayer,
        BetUnitOnBanker: multipleBetUnitOnBanker,
        BetOnTie: multipleBetOnTie,
        BetUnitOnTie: multipleBetUnitOnTie,
        BetAmountOnTie: multipleBetAmountOnTie,
        TotalBetAmount: TotalBetAmountInMultipleMode,
        netProfit: netProfitMultiMode,
        balance: balanceMultipleMode,
        wholeBetUnit: wholeBetUnitINMM,
        WholeWinUnit: WholeWinUnitINMM,
        WholeLossUnit: WholeLossUnitINMM,
        maxContiuneWin: saveMaxContiuneWinINMM,
        maxContiuneLoss: saveMaxContiuneLossIMM,
        maxBet: saveMaxBetINMM,
        maxBalance: saveMaxBalanceINMM,
        winASPlayer: winASPlayerINMM,
        WinsAsBanker: winASBankerINMM,
        // Dummy data 
        DummyBetOnPlayer: DummymultipleBetOnPlayer,
        DummyBetOnBanker: DummymultipleBetOnBanker,
        DummyBetUnitOnPlayer: DummymultipleBetUnitOnPlayer,
        DummyBetUnitOnBanker: DummymultipleBetUnitOnBanker,
    }

    // console.log(selectedGameModeInMultipleMode);
    BoradForMultiMode.push(tempToSaveData);

}

function displayTableINMultiMode() {
    let html = "<table class = 'table' id = 'borad-table' >";
    html += `<thead>  <tr>
              <th class = "col-xs-1">Hand</th>
              <th class = "col-xs-3">Bet</th>
              <th class = "col-xs-2">Amount</th>
              <th class = "col-xs-2">Tie Amount</th>
              <th class = "col-xs-2">Total Amount</th>
              <th class = "col-xs-1">Results</th>
              <th class = "col-xs-1">Balance</th>
           </tr></thead>` ;

    for (var i = BoradForMultiMode.length - 1; i > -1; i--) {
        html += "<tr>";

        html += "<td >" + BoradForMultiMode[i].hand;
        if (BoradForMultiMode[i].Play2On == 1 && BoradForMultiMode[i].Play3On == 1) {
            html += "<span class='play3'>*</span>";
        } else if (BoradForMultiMode[i].Play2On == 1 && BoradForMultiMode[i].Play3On == 0) {
            html += "<span class='play2'>*</span>";
        }
        if (BoradForMultiMode[i].TieMode == 1) {
            html += "<span class='super-script'>T</span>";
        }
        html += "</td>";

        if (BoradForMultiMode[i].BetOnPlayer == 1 && BoradForMultiMode[i].BetOnBanker == 1) {
            html += "<td><span  class='boradTableinPlayer'>P</span><spna>/</span><span class='boradTableinBanker'>B</span></td>";
            html += "<td>" + BoradForMultiMode[i].BetUnitOnPlayer * PerUnit + "/" + BoradForMultiMode[i].BetUnitOnBanker * PerUnit + "</td>";
        } else if (BoradForMultiMode[i].BetOnPlayer == 1) {
            html += "<td class='boradTableinPlayer'>P</td>";
            html += "<td>" + BoradForMultiMode[i].BetUnitOnPlayer * PerUnit + "</td>";
        } else if (BoradForMultiMode[i].BetOnBanker == 1) {
            html += "<td class='boradTableinBanker'>B</td>";
            html += "<td>" + BoradForMultiMode[i].BetUnitOnBanker * PerUnit + "</td>";

        } else {
            html += "<td> -- </td>"
            html += "<td> 0 </td>"
        }

        html += "<td>" + BoradForMultiMode[i].BetAmountOnTie + "</td>";
        html += "<td>" + BoradForMultiMode[i].TotalBetAmount + "</td>";

        if (BoradForMultiMode[i].actualWinner == 'Player') {
            html += "<td class='boradTableinPlayer'>P</td>";
        } else if (BoradForMultiMode[i].actualWinner == 'Tie') {
            html += "<td class='boradTableinTie'>T</td>";
        } else {
            html += "<td class='boradTableinBanker'>B</td>";
        }

        if (0 > BoradForMultiMode[i].balance) html += "<td class='boradTableinBanker'>" + BoradForMultiMode[i].balance + "</td>";
        else html += "<td>" + BoradForMultiMode[i].balance + "</td>";

        // html += "<td>" + BoradForMultiMode[i].wholeBetUnit + "</td>";
        html += "</tr>";
    }

    html += "</table>";

    if (IschangePreferencesOn == 1) document.getElementById("Borad-listINCP").innerHTML = html;
    else document.getElementById("Borad-list").innerHTML = html;
}

// Change DATA iN Table 
function changeDataTable() {

    // if (statusIsFileUpload == 1) return;

    if (Borad.length == 0) {
        previewBet();
        return;
    }

    // push the data into the list
    let i = 0;
    for (i = 0; i < Borad.length; i++) {
        listOfWinner.push(Borad[i].actualWinner);
        if (IschangePreferencesOn == 0) whenTieModeOn.push(Borad[i].TieMode);
        if (setChangeByNewAddMethodInGame == 0 && IschangePreferencesOn == 0) listOfSelectedGameMode.push(BoradForMultiMode[i].selectedGameMode);
    }

    clearTable();

    // restart the game 
    i = 0;
    while (i < listOfWinner.length) {
        if (IschangePreferencesOn == 0) tieMode = whenTieModeOn[i];
        if (IsTakeTieFormOldMOde == 1) tieMode = storeOldTieHands[i];

        if (setChangeByNewAddMethodInGame == 0 && IschangePreferencesOn == 0) {
            selectedGameModeInMultipleMode['Player'] = listOfSelectedGameMode[i][0];
            selectedGameModeInMultipleMode['Banker'] = listOfSelectedGameMode[i][1];
            selectedGameModeInMultipleMode['ZigZagPlayer'] = listOfSelectedGameMode[i][2];
            selectedGameModeInMultipleMode['ZigZagBanker'] = listOfSelectedGameMode[i][3];
            selectedGameModeInMultipleMode['SOW'] = listOfSelectedGameMode[i][4];
            selectedGameModeInMultipleMode['MVD'] = listOfSelectedGameMode[i][5];
        }

        if (setChangeByNewAddMethodInGame == 0 && IschangePreferencesOn == 1 && IsTakeTieFormOldMOde == 1) {
            selectedGameModeInMultipleMode['Player'] = storelistOfSelectedGameMode[i][0];
            selectedGameModeInMultipleMode['Banker'] = storelistOfSelectedGameMode[i][1];
            selectedGameModeInMultipleMode['ZigZagPlayer'] = storelistOfSelectedGameMode[i][2];
            selectedGameModeInMultipleMode['ZigZagBanker'] = storelistOfSelectedGameMode[i][3];
            selectedGameModeInMultipleMode['SOW'] = storelistOfSelectedGameMode[i][4];
            selectedGameModeInMultipleMode['MVD'] = storelistOfSelectedGameMode[i][5];
        }

        previewBet();
        winnerInSimulation = listOfWinner[i];
        if (winnerInSimulation == 'Player') actualWin('actualWinPlayer');
        else if (winnerInSimulation == 'Banker') actualWin('actualWinBanker');
        else if (winnerInSimulation == 'Tie') {
            actualWin('tieWinner');
        }
        i++;
    }

    // clear the list
    listOfWinner = [];
    whenTieModeOn = [];
    listOfSelectedGameMode = [];

    // To reset The game mode array
    // selectZigZagBanker();
    // selectSOW();
    // selectPlayer();
    // selectBanker();
    // selectZigZagPlayer();

    // To reset tie mode 
    if (IschangePreferencesOn == 0) chnageTieMode();

    return;
}

// For selecting method in multi mode game
function ChangePlayMethodInMultiMode(methodTyoe) {
    selectedMethodType = methodTyoe.options[methodTyoe.selectedIndex].innerHTML;
    changeDataTable();
    if (IschangePreferencesOn == 0) previewBet();
}

// display lable 
function displayAmtInLable() {

    html = " Player ";
    if (Borad.length == 0) html += `<span>(0)</span>`;
    else if (0 > totalBalanceInMMInPlayer) html += "<span class='boradTableinBanker'>(" + totalBalanceInMMInPlayer + ")</span>";
    else html += "<span>(" + totalBalanceInMMInPlayer + ")</span>";
    if (IschangePreferencesOn == 0) document.getElementById("playerMMLable").innerHTML = html;
    if (IschangePreferencesOn == 1) document.getElementById("playerMMLableINCP").innerHTML = html;



    html = ` Banker `;
    if (Borad.length == 0) html += `<span>(0)</span>`;
    else if (0 > totalBalanceInMMInBanker) html += "<span class='boradTableinBanker'>(" + totalBalanceInMMInBanker + ")</span>";
    else html += "<span>(" + totalBalanceInMMInBanker + ")</span>";
    if (IschangePreferencesOn == 0) document.getElementById("bankerMMLable").innerHTML = html;
    if (IschangePreferencesOn == 1) document.getElementById("bankerMMLableINCP").innerHTML = html;


    html = ` SOW `;
    if (Borad.length == 0) html += `<span>(0)</span>`;
    else if (0 > totalBalanceInMMInSOW) html += "<span class='boradTableinBanker'>(" + totalBalanceInMMInSOW + ")</span>";
    else html += "<span>(" + totalBalanceInMMInSOW + ")</span>";
    if (IschangePreferencesOn == 0) document.getElementById("SOWMMLable").innerHTML = html;
    if (IschangePreferencesOn == 1) document.getElementById("SOWMMLableINCP").innerHTML = html;


    html = ` ZigZag Player First `;
    if (Borad.length == 0) html += `<span>(0)</span>`;
    else if (0 > totalBalanceInMMInZigZagPlayer) html += "<span class='boradTableinBanker'>(" + totalBalanceInMMInZigZagPlayer + ")</span>";
    else html += "<span>(" + totalBalanceInMMInZigZagPlayer + ")</span>";
    if (IschangePreferencesOn == 0) document.getElementById("ZigZagPlayerFirstMMLable").innerHTML = html;
    if (IschangePreferencesOn == 1) document.getElementById("ZigZagPlayerFirstMMLableINCP").innerHTML = html;



    html = `ZigZag Banker First `;
    if (Borad.length == 0) html += `<span>(0)</span>`;
    else if (0 > totalBalanceInMMInZigZagBanker) html += "<span class='boradTableinBanker'>(" + totalBalanceInMMInZigZagBanker + ")</span>";
    else html += "<span>(" + totalBalanceInMMInZigZagBanker + ")</span>";
    if (IschangePreferencesOn == 0) document.getElementById("ZigZagBankerFirstMMLable").innerHTML = html;
    if (IschangePreferencesOn == 1) document.getElementById("ZigZagBankerFirstMMLableINCP").innerHTML = html;



    html = ` MVD `;
    if (Borad.length == 0) html += `<span>(0)</span>`;
    else if (0 > totalBalanceInMMInMVD) html += "<span class='boradTableinBanker'>(" + totalBalanceInMMInMVD + ")</span>";
    else html += "<span>(" + totalBalanceInMMInMVD + ")</span>";
    if (IschangePreferencesOn == 0) document.getElementById("MVDMMLable").innerHTML = html;
    if (IschangePreferencesOn == 1) document.getElementById("MVDMMLableINCP").innerHTML = html;



}

// cal total induvial balnace 
function calindividualBalance(actualWinner) {

    if (selectedGameModeInMultipleMode['Player'] == 1) {
        totalBalanceInMMInPlayer += indiviualPlayerBalanceInMM;
        totalBalanceInMMInPlayer = roundOff(totalBalanceInMMInPlayer, 2);
    }

    if (selectedGameModeInMultipleMode['Banker'] == 1) {
        totalBalanceInMMInBanker += indiviualBankerBalanceInMM;
        totalBalanceInMMInBanker = roundOff(totalBalanceInMMInBanker, 2);
    }

    if (selectedGameModeInMultipleMode['SOW'] == 1) {
        totalBalanceInMMInSOW += indiviualSOWBalanceInMM;
        totalBalanceInMMInSOW = roundOff(totalBalanceInMMInSOW, 2);
    }
    if (selectedGameModeInMultipleMode['ZigZagPlayer'] == 1) {
        totalBalanceInMMInZigZagPlayer += indiviualZigZagPlayerBalanceInMM;
        totalBalanceInMMInZigZagPlayer = roundOff(totalBalanceInMMInZigZagPlayer, 2);
    }

    if (selectedGameModeInMultipleMode['ZigZagBanker'] == 1) {
        totalBalanceInMMInZigZagBanker += indiviualZigZagBankerBalanceInMM;
        totalBalanceInMMInZigZagBanker = roundOff(totalBalanceInMMInZigZagBanker, 2);
    }
    if (selectedGameModeInMultipleMode['MVD'] == 1) {
        totalBalanceInMMInMVD += indiviualMVDBalanceInMM;
        totalBalanceInMMInMVD = roundOff(totalBalanceInMMInMVD, 2);
    }
}