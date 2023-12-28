
// Variable Management
amountSelection = [8, 15, 35, 60, 20, 20], whenTieModeOn = [];
statusOfRS = 0;
var bet = document.getElementById("Bet");
netProfitBanker = 0;

if (statusIsFileUpload == 0) previewBet();
if (statusIsFileUpload == 0) displayTable();
if (statusIsFileUpload == 0) displayBaccaratBorad();
document.getElementById('variableTable').style.display = 'none';



/* Round Off */
function roundOff(num, places = 2) {
    const x = Math.pow(10, places);
    return Math.round(num * x) / x;
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

/* Change In Tie MOde */
function chnageTieMode() {

    if (IschangePreferencesOn == 1) {
        var tieCheckBox1 = document.getElementById('TieModeIdINCP');
        if (tieCheckBox1.checked == true) {
            tieMode = 1;
        }
        else
            tieMode = 0;

        changeDataTable();
    } else {
        var tieCheckBox1 = document.getElementById('TieModeId');
        if (tieCheckBox1.checked == true) {
            tieMode = 1;
        }
        else
            tieMode = 0;

        if (statusIsFileUpload == 0) previewBet();
    }

}

/* Change In Brake */
function changeBrake() {

    if (document.getElementById('BrakeId').value >= 0) {
        brakeNo = document.getElementById('BrakeId').value;
    } else {
        document.getElementById('BrakeId').value = 0;
        brakeNo = document.getElementById('BrakeId').value;
    }
    if (statusIsFileUpload == 0) previewBet();
}

/* Change Bet Game */
function GameModeChange(GameModeId) {

    gameMode = GameModeId.options[GameModeId.selectedIndex].innerHTML;

    if (gameMode == "Multiple Mode") {
        if (IschangePreferencesOn == 0) document.getElementById('multipleModeOption').style.display = 'Block';
        else document.getElementById('multipleModeOptionINCP').style.display = 'Block';
    } else {
        if (IschangePreferencesOn == 0) document.getElementById('multipleModeOption').style.display = 'none';
        else document.getElementById('multipleModeOptionINCP').style.display = 'none';
    }

    if (gameMode == 'MVD' && statusIsFileUpload == 0) changeDataTable();
    if (statusIsFileUpload == 0) displayTable();
    if (statusIsFileUpload == 0) previewBet();
    if (statusIsFileUpload == 0 && statusOfVariableTableShow == 1) displayvariableTable();

}

// change in new amount selection change
function chageAmountSelectionSystemInputTakenFrom(AmountSelectionSystemInputTakenFrom) {

    if (AmountSelectionSystemInputTakenFrom.options[AmountSelectionSystemInputTakenFrom.selectedIndex].innerHTML == 'DropDown') {
        tempAmountSelection = document.getElementById('AmountSelectionSystemId').options[AmountSelectionSystemId.selectedIndex].innerHTML;
        dataResetForASS(tempAmountSelection);
    } else {
        tempAmountSelection = document.getElementById('newAmountSelectionID').value;
        dataResetForASS(tempAmountSelection);
    }
}

// Change IN drop down Selection
function changeAmountSelectionSystem(select) {
    tempAmountSelection = select.options[AmountSelectionSystemId.selectedIndex].innerHTML;
    dataResetForASS(tempAmountSelection);
    document.getElementById('AmountSelectionSystemInputTakenFrom').options[0].selected = true;

}

// Create New Amount Selection
function createNewAmountSelection() {

    tempAmountSelection = document.getElementById('newAmountSelectionID').value;
    dataResetForASS(tempAmountSelection);
    document.getElementById('AmountSelectionSystemInputTakenFrom').options[1].selected = true;


}

// Change In Amount Slection System
function dataResetForASS(tempAmountSelection) {

    if (statusIsFileUpload == 1) return;

    amountSelection.length = 0;

    let combineNumber;
    let i = 0;


    if (tempAmountSelection.length == 1) {
        amountSelection.push(tempAmountSelection);

    } else {
        while (i < tempAmountSelection.length) {

            if (tempAmountSelection[i] == ",") {
                amountSelection.push(combineNumber);
                combineNumber = tempAmountSelection[i + 1];
                if (i + 2 == tempAmountSelection.length) {
                    // combineNumber += tempAmountSelection[i];
                    amountSelection.push(combineNumber);
                }
                i += 2;
                continue;
            } else if (i + 1 == tempAmountSelection.length) {
                combineNumber += tempAmountSelection[i];
                amountSelection.push(combineNumber);
                i++;
            } else {
                if (i == 0) {
                    combineNumber = tempAmountSelection[i];
                } else {
                    combineNumber += tempAmountSelection[i];
                }

                if (i - 1 == tempAmountSelection.length) {
                    amountSelection.push(combineNumber);
                }
                i++;
            }
        }

    }


    i = 0;
    while (i < Borad.length) {
        listOFWinnerTOresetData.push(Borad[i].actualWinner);
        whenTieModeOn.push(Borad[i].TieMode);
        i++;
    }

    clearTable();

    i = 0;
    while (i < listOFWinnerTOresetData.length) {
        tieMode = whenTieModeOn[i];
        previewBet();
        winnerInSimulation = listOFWinnerTOresetData[i];
        if (winnerInSimulation == 'Player') actualWin('actualWinPlayer');
        else if (winnerInSimulation == 'Banker') actualWin('actualWinBanker');
        else if (winnerInSimulation == 'Tie') {
            actualWin('tieWinner');
        }
        i++;
    }

    listOFWinnerTOresetData = [];
    whenTieModeOn = [];
    chnageTieMode();
    previewBet();


}

// FIND ??
// change in Progression 
function changeInProgression(select) {
    if (IschangePreferencesOn == 0) tempSelection = select.options[ProgressionDropDownId.selectedIndex].innerHTML;
    if (IschangePreferencesOn == 1) tempSelection = select.options[ProgressionDropDownIdINCP.selectedIndex].innerHTML;
    // dataResetForASS(tempSelection);
    if (tempSelection == 'Negative') {
        isPositiveProgression = 0;
    } else {
        isPositiveProgression = 1;
    }

    changeDataTable();

}

// Preview Bet 
function previewBet() {

    totalBetAmtPlayer = 0, totalBetAmtBanker = 0, totalBetAmtDifferential = 0;
    tieAmtPlayer = 0, tieAmtBanker = 0, tieAmtDifferential = 0;
    BetOnTiePlayer = 0, BetOnTieBanker = 0, BetOnTieDifferential = 0;
    tieUnitPlayer = 0, tieUnitBanker = 0, tieUnitDifferential = 0;
    tieUnitPlayer = 0, tieUnitBanker = 0, tieUnitDifferential = 0;
    totalBetAmtSOW = 0, tieAmtSOW = 0, BetOnTieSOW = 0, tieUnitSOW = 0;
    totalBetAmtZigZagPlayer = 0, tieAmtZigZagPlayer = 0, BetOnTieZigZagPlayer = 0, tieUnitZigZagPlayer = 0;
    totalBetAmtZigZagBanker = 0, tieAmtZigZagBanker = 0, BetOnTieZigZagBanker = 0, tieUnitZigZagBanker = 0;
    totalBetAmtMVD = 0, tieAmtMVD = 0, BetOnTieMVD = 0, tieUnitMVD = 0;

    multipleBetUnitOnPlayer = 0, multipleBetUnitOnBanker = 0;
    multipleBetOnTie = 0, multipleBetUnitOnTie = 0, multipleBetAmountOnTie = 0;
    multipleBetOnPlayer = 0, multipleBetOnBanker = 0;
    TotalBetAmountInMultipleMode = 0;
    previewBetUnitBankerLossINMM = 0; previewBetUnitBankerWinINMM = 0;
    previewBetOnPlayerWin = 0, previewBetOnBankerWin = 0;
    previewBetOnPlayerLoss = 0, previewBetOnBankerLoss = 0;
    previewBetUnitPlayerWinINMM = 0; previewBetUnitPlayerLossINMM = 0;
    wholeBetUnitINMM = 0;

    // For Length Zero 
    if (Borad.length == 0 && BoradForMultiMode.length == 0) {

        betonDifferential = 'Banker'; betUnitDifferential = parseInt(amountSelection[0]);
        totalBetAmtDifferential = parseInt(amountSelection[0]) * PerUnit, maxBetDifferential = parseInt(amountSelection[0]) * PerUnit, WholeBetUnitDifferential = parseInt(amountSelection[0]);

        totalBetAmtBanker = parseInt(amountSelection[0]) * PerUnit; betUnitBanker = parseInt(amountSelection[0]), maxBetBanker = parseInt(amountSelection[0]) * PerUnit;
        WholeBetUnitBanker = parseInt(amountSelection[0]), AmountSelectionIndexBanker = 0;

        totalBetAmtPlayer = parseInt(amountSelection[0]) * PerUnit; betUnitPlayer = parseInt(amountSelection[0]), maxBetPlayer = parseInt(amountSelection[0]) * PerUnit;
        WholeBetUnitPlayer = parseInt(amountSelection[0]), AmountSelectionIndexPlayer = 0;

        totalBetAmtZigZagPlayer = parseInt(amountSelection[0]) * PerUnit; betUnitZigZagPlayer = parseInt(amountSelection[0]), maxBetZigZagPlayer = parseInt(amountSelection[0]) * PerUnit;
        WholeBetUnitZigZagPlayer = parseInt(amountSelection[0]), AmountSelectionIndexZigZagPlayer = 0;

        totalBetAmtZigZagBanker = parseInt(amountSelection[0]) * PerUnit; betUnitZigZagBanker = parseInt(amountSelection[0]), maxBetZigZagBanker = parseInt(amountSelection[0]) * PerUnit;
        WholeBetUnitZigZagBanker = parseInt(amountSelection[0]), AmountSelectionIndexZigZagBanker = 0;

        betUnitSOW = 0; betOnSOW = null; totalBetAmtSOW = 0;
        betUnitMVD = 0; betOnMVD = null; totalBetAmtMVD = 0;


        if (gameMode == 'Banker') {
            bet.innerHTML = '<div><span class="boradTableinBanker"> Banker</span><span> : $' + betUnitBanker * PerUnit + '</span></div>';
            bet.innerHTML += '<div><span> Total Amount : $' + totalBetAmtBanker + '</span></div>';
            preview.innerHTML = 'Win(W) : Banker $' + betUnitBanker * PerUnit + '<br> Loss(L) : Banker $' + parseInt(amountSelection[1]) * PerUnit;
            if (isPositiveProgression == 1) {
                preview.innerHTML = 'Win(W) : Banker $' + parseInt(amountSelection[1]) * PerUnit + '<br> Loss(L) : Banker $' + betUnitBanker * PerUnit;
            }
            if (amountSelection.length == 1) {
                preview.innerHTML = 'Win(W) : Banker $' + betUnitBanker * PerUnit + '<br> Loss(L) : Banker $' + parseInt(amountSelection[0]) * PerUnit;
            }
        } else if (gameMode == 'Player') {
            bet.innerHTML = '<div><span class="boradTableinPlayer"> Player </span><span> : $' + betUnitPlayer * PerUnit + '</span></div>';
            bet.innerHTML += '<div><span> Total Amount : $' + totalBetAmtPlayer + '</span></div>';
            preview.innerHTML = 'Win(W) : Player $' + betUnitPlayer * PerUnit + ' <br> Loss(L) : Player $' + parseInt(amountSelection[1]) * PerUnit;
            if (isPositiveProgression == 1) {
                preview.innerHTML = 'Win(W) : Player $' + parseInt(amountSelection[1]) * PerUnit + ' <br> Loss(L) : Player $' + betUnitPlayer * PerUnit;
            }
            if (amountSelection.length == 1) {
                preview.innerHTML = 'Win(W) : Player $' + betUnitPlayer * PerUnit + ' <br> Loss(L) : Player $' + parseInt(amountSelection[0]) * PerUnit;

            }
        } else if (gameMode == 'ZigZag Player First') {
            bet.innerHTML = '<div><span class="boradTableinPlayer"> Player </span><span> : $' + betUnitZigZagPlayer * PerUnit + '</span></div>';
            bet.innerHTML += '<div><span> Total Amount : $' + totalBetAmtZigZagPlayer + '</span></div>';
            preview.innerHTML = 'Win(W) : Banker $' + betUnitZigZagPlayer * PerUnit + ' <br> Loss(L) : Banker $' + parseInt(amountSelection[1]) * PerUnit;
            if (isPositiveProgression == 1) {
                preview.innerHTML = 'Win(W) : Banker $' + parseInt(amountSelection[1]) * PerUnit + ' <br> Loss(L) : Banker $' + betUnitZigZagPlayer * PerUnit;
            }
            if (amountSelection.length == 1) {
                preview.innerHTML = 'Win(W) : Banker $' + betUnitPlayer * PerUnit + ' <br> Loss(L) : Banker $' + parseInt(amountSelection[0]) * PerUnit;

            }
        } else if (gameMode == 'ZigZag Banker First') {
            bet.innerHTML = '<div><span class="boradTableinBanker"> Banker </span><span> : $' + betUnitZigZagBanker * PerUnit + '</span></div>';
            bet.innerHTML += '<div><span> Total Amount : $' + totalBetAmtZigZagBanker + '</span></div>';
            preview.innerHTML = 'Win(W) : Player $' + betUnitZigZagBanker * PerUnit + ' <br> Loss(L) : Player $' + parseInt(amountSelection[1]) * PerUnit;
            if (isPositiveProgression == 1) {
                preview.innerHTML = 'Win(W) : Player $' + parseInt(amountSelection[1]) * PerUnit + ' <br> Loss(L) : Player $' + betUnitZigZagBanker * PerUnit;
            }
            if (amountSelection.length == 1) {
                preview.innerHTML = 'Win(W) : Player $' + betUnitBanker * PerUnit + ' <br> Loss(L) : Player $' + parseInt(amountSelection[0]) * PerUnit;

            }
        } else if (gameMode == 'SOW') {
            bet.innerHTML = '<div><span> -- </span><span> : $ -- </span></div>';
            preview.innerHTML = 'Win(W) : -- $ -- <br>  Loss(L) : -- $ -- ';

        } else if (gameMode == "MVD") {
            bet.innerHTML = '<div><span> -- </span><span> : $ -- </span></div>';
            preview.innerHTML = 'Win(W) : -- $ -- <br>  Loss(L) : -- $ -- ';
        }

        if (selectedGameModeInMultipleMode['Player'] == 1) {
            multipleBetUnitOnPlayer += betUnitPlayer;
            multipleBetOnPlayer = 1;
            previewBetOnPlayerLoss = 1, previewBetOnPlayerWin = 1;
            previewBetUnitPlayerWinINMM += amountSelection[0], previewBetUnitPlayerLossINMM += amountSelection[1];
            wholeBetUnitINMM += betUnitPlayer;
        }

        if (selectedGameModeInMultipleMode['Banker'] == 1) {
            multipleBetUnitOnBanker += betUnitBanker;
            multipleBetOnBanker = 1;
            previewBetUnitBankerLossINMM += amountSelection[1];
            previewBetOnBankerLoss = 1;
            previewBetUnitBankerWinINMM += amountSelection[0];
            previewBetOnBankerWin = 1;
            wholeBetUnitINMM += betUnitBanker;
        }

        if (selectedGameModeInMultipleMode['ZigZagPlayer'] == 1) {
            multipleBetUnitOnPlayer += betUnitPlayer;
            multipleBetOnPlayer = 1;
            wholeBetUnitINMM += betUnitPlayer;

            previewBetUnitBankerLossINMM += amountSelection[1];
            previewBetOnBankerLoss = 1;
            previewBetUnitBankerWinINMM += amountSelection[0];
            previewBetOnBankerWin = 1;
        }

        if (selectedGameModeInMultipleMode['ZigZagBanker'] == 1) {
            multipleBetUnitOnBanker += betUnitBanker;
            multipleBetOnBanker = 1;
            wholeBetUnitINMM += betUnitBanker;

            previewBetOnPlayerLoss = 1, previewBetOnPlayerWin = 1;
            previewBetUnitPlayerWinINMM += amountSelection[0];
            previewBetUnitPlayerLossINMM += amountSelection[1];

        }

        if (selectedGameModeInMultipleMode['SOW'] == 1) {
            //    YOU WANT TO ADD 
        }

        if (selectedGameModeInMultipleMode['MVD'] == 1) {
            //    YOU WANT TO ADD 
        }


        displayPreviewBet();

        // check whether display preview status 
        if (displayPreview == 0) {
            preview.innerHTML = "";
        }

        return;
    }

    console.log(Borad);
    //  Stop Profit //
    if (IschangePreferencesOn == 0 || Borad.length != 0) checkStopProfit();

    // Max Hand //
    if (IschangePreferencesOn == 0) checkMaxHand();

    // Perview Bet for Player //
    if (statusIsFileUpload == 0 || (statusIsFileUpload == 1 && (gameMode == 'Player' || gameMode == 'Differential' || 'Multiple Mode' == gameMode))) NextBetCalculation4Player();
    if (statusIsFileUpload == 0) NextToNextBetCalculation4Player();

    // Perview Bet for Banker //
    if (statusIsFileUpload == 0 || (statusIsFileUpload == 1 && (gameMode == 'Banker' || gameMode == 'Differential' || 'Multiple Mode' == gameMode))) NextBetCalculation4Banker();
    if (statusIsFileUpload == 0) NextToNextBetCalculation4Banker();

    // Perview Bet for Zig Zag Player //
    if (statusIsFileUpload == 0 || (statusIsFileUpload == 1 && (gameMode == 'ZigZag Player First' || 'Multiple Mode' == gameMode))) NextBetCalculation4ZigZagPlayer();
    if (statusIsFileUpload == 0) NextToNextBetCalculation4ZigZagPlayer();

    // Perview Bet for Zig Zag Banker //
    if (statusIsFileUpload == 0 || (statusIsFileUpload == 1 && (gameMode == 'ZigZag Banker First' || 'Multiple Mode' == gameMode))) NextBetCalculation4ZigZagBanker();
    if (statusIsFileUpload == 0) NextToNextBetCalculation4ZigZagBanker();

    // Perview Bet for SOW //
    if (statusIsFileUpload == 0 || (statusIsFileUpload == 1 && (gameMode == 'SOW' || 'Multiple Mode' == gameMode))) NextBetCalculation4SOW();
    if (statusIsFileUpload == 0) NextToNextBetCalculation4SOW();

    // Preview Bet For MVD //
    if (statusIsFileUpload == 0 || (statusIsFileUpload == 1 && (gameMode == 'MVD' || 'Multiple Mode' == gameMode))) NextBetCalculation4MVD();
    if (statusIsFileUpload == 0) NextToNextBetCalculation4MVD();

    // Preview For Differential //
    if (statusIsFileUpload == 0 || (statusIsFileUpload == 1 && gameMode == 'Differential' || 'Multiple Mode' == gameMode)) NextBetCalculation4Differential();
    if (statusIsFileUpload == 0) NextToNextBetCalculation4Differential();




    //  Max Bet Unit //
    if (IschangePreferencesOn == 0) checkMaxBet();

    //  Stop Loss //
    if (IschangePreferencesOn == 0) checkStopLoss();

    displayPreviewBet();

    WholeBetUnitDifferential = betUnitDifferential + tieUnitDifferential + parseInt(Borad[Borad.length - 1].differential.WholeBetUnit);
    WholeBetUnitPlayer = betUnitPlayer + tieUnitPlayer + parseInt(Borad[Borad.length - 1].playerGame.WholeBetUnit);
    WholeBetUnitBanker = betUnitBanker + tieUnitBanker + parseInt(Borad[Borad.length - 1].BankerGame.WholeBetUnit);
    WholeBetUnitZigZagBanker = betUnitZigZagBanker + tieUnitZigZagBanker + parseInt(Borad[Borad.length - 1].ZigZagBankerGame.WholeBetUnit);
    WholeBetUnitZigZagPlayer = betUnitZigZagPlayer + tieUnitZigZagPlayer + parseInt(Borad[Borad.length - 1].ZigZagPlayerGame.WholeBetUnit);
    WholeBetUnitSOW = betUnitSOW + tieUnitSOW + parseInt(Borad[Borad.length - 1].SOW.WholeBetUnit);
    WholeBetUnitMVD = betUnitMVD + tieUnitMVD + parseInt(Borad[Borad.length - 1].MVD.WholeBetUnit);

    // check whether display preview status 
    if (displayPreview == 0) {
        preview.innerHTML = "";
    }

}

// Actual Win 
function actualWin(clicked_id) {

    actualWinner = document.getElementById(clicked_id).value;

    // For Undo //
    if (actualWinner == 'undoWinner') {
        undo();
        return;
    } else {
        if (actualWinner == 'Tie') {
            tieWin = 1; TotalTieWin++;
        }
        else if (actualWinner == 'Banker') {
            noOfBanker++;
        } else {
            noOfPlayer++;
        }
    }

    hand = hand + 1;


    if (actualWinner == 'Tie') {

        if (BetOnTiePlayer != 0) {
            netProfitPlayer = Borad[Borad.length - 1].playerGame.netProfit + betUnitPlayer;
            balancePlayer += (8 * tieAmtPlayer);
            indiviualPlayerBalanceInMM = 8 * tieAmtPlayer;
            winPlayer = 2;
            TotalTieWinPlayer++;
            WholeWinUnitPlayer += tieUnitPlayer;
            maxContiuneWinPlayer++;
            maxContiuneLossPlayer = 0;
            if (Borad.length > 1 && maxContiuneWinPlayer > Borad[Borad.length - 1].playerGame.maxContiuneWin) {
                saveMaxContiuneWinPlayer = maxContiuneWinPlayer;
            }
            brakeCountPlayer = Borad[Borad.length - 1].playerGame.BrakeCount;
            if (balancePlayer >= saveMaxBalancePlayer) {
                saveMaxBalancePlayer = balancePlayer;
            }
        } else {
            if (Borad.length == 0) {
                netProfitPlayer = 0;
                winPlayer = 3;
                balancePlayer = 0;
                brakeCountPlayer = 0;
            } else {
                netProfitPlayer = Borad[Borad.length - 1].playerGame.netProfit;
                winPlayer = 3;
                indiviualPlayerBalanceInMM = 0;
                balancePlayer = Borad[Borad.length - 1].playerGame.balance;
                brakeCountPlayer = Borad[Borad.length - 1].playerGame.BrakeCount;
            }
        }

        balancePlayer = roundOff(balancePlayer, 2);

        if (BetOnTieBanker != 0) {
            netProfitBanker = Borad[Borad.length - 1].BankerGame.netProfit + betUnitBanker;
            indiviualBankerBalanceInMM = 8 * tieAmtBanker;
            balanceBanker += (8 * tieAmtBanker);
            winBanker = 2;
            TotalTieWinBanker++;
            WholeWinUnitBanker += tieUnitBanker;
            maxContiuneWinBanker++;
            maxContiuneLossBanker = 0;
            if (Borad.length > 1 && maxContiuneWinBanker > Borad[Borad.length - 1].BankerGame.maxContiuneWin) {
                saveMaxContiuneWinBanker = maxContiuneWinBanker;
            }
            brakeCountBanker = Borad[Borad.length - 1].BankerGame.BrakeCount;
            if (balanceBanker >= saveMaxBalanceBanker) {
                saveMaxBalanceBanker = balanceBanker;
            }
        } else {
            if (Borad.length == 0) {
                netProfitBanker = 0;
                winBanker = 3;
                balanceBanker = 0;
                brakeCountBanker = 0;
            } else {
                netProfitBanker = Borad[Borad.length - 1].BankerGame.netProfit;
                winBanker = 3;
                indiviualPlayerBalanceInMM = 0;
                balanceBanker = Borad[Borad.length - 1].BankerGame.balance;
                brakeCountBanker = Borad[Borad.length - 1].BankerGame.BrakeCount;
                WholeWinUnitBanker = Borad[Borad.length - 1].BankerGame.WholeWinUnit;
            }
        }

        balanceBanker = roundOff(balanceBanker, 2);


        if (BetOnTieZigZagPlayer != 0) {
            netProfitZigZagPlayer = Borad[Borad.length - 1].ZigZagPlayerGame.netProfit + betUnitZigZagPlayer;
            balanceZigZagPlayer += (8 * tieAmtZigZagPlayer);
            indiviualZigZagPlayerBalanceInMM = 8 * tieAmtZigZagPlayer;
            winZigZagPlayer = 2;
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



        if (BetOnTieZigZagBanker != 0) {
            netProfitZigZagBanker = Borad[Borad.length - 1].ZigZagBankerGame.netProfit + betUnitZigZagBanker;
            balanceZigZagBanker += (8 * tieAmtZigZagBanker);
            indiviualZigZagBankerBalanceInMM = 8 * tieAmtZigZagBanker;
            winZigZagBanker = 2;
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

        // SOW //
        if (BetOnTieSOW != 0) {
            netProfitSOW = Borad[Borad.length - 1].SOW.netProfit + betUnitSOW;
            balanceSOW += (8 * tieAmtSOW);
            winSOW = 3;
            indiviualSOWBalanceInMM = 8 * tieAmtSOW;
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

        if (BetOnTieDifferential != 0) {
            netProfitDifferential = Borad[Borad.length - 1].differential.netProfit + betUnitDifferential;
            balanceDifferential += (8 * tieAmtDifferential);
            indiviualZigZagPlayerBalanceInMM = 8 * tieAmtZigZagPlayer;
            balanceDifferential = roundOff(balanceDifferential, 2);
            winDifferential = 2;
            WholeWinUnitDifferential += tieUnitDifferential;
            maxContiuneWinDifferential++;
            maxContiuneLossDifferential = 0;
            if (Borad.length > 1 && maxContiuneWinDifferential > Borad[Borad.length - 1].differential.maxContiuneWin) {
                saveMaxContiuneWinDifferential = maxContiuneWinDifferential;
            }
            brakeCountDifferential = Borad[Borad.length - 1].differential.BrakeCount;
            if (balanceDifferential >= saveMaxBalanceDifferential) {
                saveMaxBalanceDifferential = balanceDifferential;
            }
        } else {
            if (Borad.length == 0) {
                netProfitDifferential = 0;
                winDifferential = 3;
                balanceDifferential = 0;
                brakeCountDifferential = 0;
            } else {
                netProfitDifferential = Borad[Borad.length - 1].differential.netProfit;
                winDifferential = 3;
                indiviualZigZagPlayerBalanceInMM = 0;
                balanceDifferential = Borad[Borad.length - 1].differential.balance;
                brakeCountDifferential = Borad[Borad.length - 1].differential.BrakeCount;
            }
        }
        balanceDifferential = roundOff(balanceDifferential, 2);

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

        if (statusIsFileUpload == 0 || (statusIsFileUpload == 1 && (gameMode == 'Player' || 'Multiple Mode' == gameMode))) {
            netProfitPlayer += betUnitPlayer;
            winPlayer = 1;
            indiviualPlayerBalanceInMM = PerUnit * betUnitPlayer;
            balancePlayer += PerUnit * betUnitPlayer;
            if (BetOnTiePlayer != 0) {
                balancePlayer -= tieAmtPlayer;
                netProfitPlayer -= tieUnitPlayer;
                indiviualPlayerBalanceInMM -= tieAmtPlayer;
                WholeLossUnitPlayer += tieUnitPlayer;
            }
            balancePlayer = roundOff(balancePlayer, 2);
            WholeWinUnitPlayer += betUnitPlayer;
            maxContiuneWinPlayer++;
            maxContiuneLossPlayer = 0;
            if (Borad.length >= 1 && maxContiuneWinPlayer > Borad[Borad.length - 1].playerGame.maxContiuneWin) {
                saveMaxContiuneWinPlayer = maxContiuneWinPlayer;
            }
            if (Borad.length == 0) {
                saveMaxContiuneWinPlayer = maxContiuneWinPlayer;
            }
            brakeCountPlayer = 0;

            if (balancePlayer >= saveMaxBalancePlayer) {
                saveMaxBalancePlayer = balancePlayer;
            }
            saveWinsAsPlayerPlayer++;
            saveWinsAsBankerP = 0;
        }


        if (statusIsFileUpload == 0 || (statusIsFileUpload == 1 && (gameMode == 'Banker' || 'Multiple Mode' == gameMode))) {
            netProfitBanker -= betUnitBanker;
            indiviualBankerBalanceInMM = -1 * PerUnit * betUnitBanker;
            winBanker = 0;
            if (BetOnTieBanker != 0) {
                balanceBanker -= tieAmtBanker;
                netProfitBanker -= tieUnitBanker;
                indiviualBankerBalanceInMM -= tieAmtBanker;
                WholeLossUnitBanker += tieUnitBanker;
            }
            balanceBanker -= (PerUnit * betUnitBanker);
            balanceBanker = roundOff(balanceBanker, 2);
            WholeLossUnitBanker += betUnitBanker;
            maxContiuneWinBanker = 0;
            maxContiuneLossBanker++;
            if (Borad.length >= 1 && BrakeModeOnInPlayBanker == 1) {
                maxContiuneLossBanker--;
            }
            if (Borad.length >= 1 && maxContiuneLossBanker > Borad[Borad.length - 1].BankerGame.maxContiuneLoss) {
                saveMaxContiuneLossBanker = maxContiuneLossBanker;
            }
            if (Borad.length == 0) {
                saveMaxContiuneLossBanker = maxContiuneLossBanker;
            }
            if (Borad.length >= 1) {
                brakeCountBanker = Borad[Borad.length - 1].BankerGame.BrakeCount + 1;
            } else {
                brakeCountBanker = 1;
            }
            saveWinsAsPlayerBanker = 0;
        }

    } else {


        if (statusIsFileUpload == 0 || (statusIsFileUpload == 1 && (gameMode == 'Player' || 'Multiple Mode' == gameMode))) {
            netProfitPlayer -= betUnitPlayer;
            indiviualPlayerBalanceInMM = -1 * PerUnit * betUnitPlayer;
            winPlayer = 0;
            if (BetOnTiePlayer != 0) {
                balancePlayer -= tieAmtPlayer;
                netProfitPlayer -= tieUnitPlayer;
                indiviualPlayerBalanceInMM -= tieAmtPlayer;
                WholeLossUnitPlayer += tieUnitPlayer;
            }
            balancePlayer -= PerUnit * betUnitPlayer;
            balancePlayer = roundOff(balancePlayer, 2);
            WholeLossUnitPlayer += betUnitPlayer;
            maxContiuneWinPlayer = 0;
            maxContiuneLossPlayer++;
            if (Borad.length >= 1 && BrakeModeOnInPlayPlayer == 1) {
                maxContiuneLossPlayer--;
            }
            if (Borad.length >= 1 && maxContiuneLossPlayer > Borad[Borad.length - 1].playerGame.maxContiuneLoss) {
                saveMaxContiuneLossPlayer = maxContiuneLossPlayer;
            }
            if (Borad.length >= 1) {
                brakeCountPlayer = Borad[Borad.length - 1].playerGame.BrakeCount + 1;
            } else {
                brakeCountPlayer = 1;
                saveMaxContiuneLossPlayer = maxContiuneLossPlayer;
            }

        }


        if (statusIsFileUpload == 0 || (statusIsFileUpload == 1 && (gameMode == 'Banker' || 'Multiple Mode' == gameMode))) {

            netProfitBanker += betUnitBanker;
            balanceBanker += PerUnit * (comission4Banker * betUnitBanker / 100);
            indiviualBankerBalanceInMM = PerUnit * (comission4Banker * betUnitBanker / 100);

            if (BetOnTieBanker != 0) {
                balanceBanker -= tieAmtBanker;
                netProfitBanker -= tieUnitBanker;
                indiviualPlayerBalanceInMM -= tieAmtBanker;
                WholeLossUnitBanker += tieUnitBanker;
            }
            balanceBanker = roundOff(balanceBanker, 2);
            winBanker = 1;
            WholeWinUnitBanker += betUnitBanker;
            maxContiuneWinBanker++;
            maxContiuneLossBanker = 0;
            if (Borad.length >= 1 && maxContiuneWinBanker > Borad[Borad.length - 1].BankerGame.maxContiuneWin) {
                saveMaxContiuneWinBanker = maxContiuneWinBanker;
            }
            if (Borad.length == 0) {
                saveMaxContiuneWinBanker = maxContiuneWinBanker;
            }
            brakeCountBanker = 0;
            if (balanceBanker >= saveMaxBalanceBanker) {
                saveMaxBalanceBanker = balanceBanker;
            }
            // saveWinsAsPlayerBanker++;
            saveWinsAsBankerB++;
        }


    }

    if (statusIsFileUpload == 0 || (statusIsFileUpload == 1 && (gameMode == "ZigZag Player First" || 'Multiple Mode' == gameMode))) {

        indiviualZigZagPlayerBalanceInMM = 0;
        if (betOnZigZagPlayer == actualWinner && actualWinner != 'Tie') {

            netProfitZigZagPlayer += betUnitZigZagPlayer;
            winZigZagPlayer = 1;
            if (betOnZigZagPlayer == 'Player') {
                balanceZigZagPlayer += PerUnit * betUnitZigZagPlayer;
                indiviualZigZagPlayerBalanceInMM += PerUnit * betUnitZigZagPlayer;
            }
            else if (betOnZigZagPlayer == 'Banker') {
                balanceZigZagPlayer += PerUnit * (betUnitZigZagPlayer * comission4Banker / 100);
                indiviualZigZagPlayerBalanceInMM += PerUnit * (betUnitZigZagPlayer * comission4Banker / 100);
                saveWinsAsBankerZigZagPlayer++;
            }
            if (BetOnTieZigZagPlayer != 0) {
                balanceZigZagPlayer -= tieAmtZigZagPlayer;
                netProfitZigZagPlayer -= tieUnitZigZagPlayer;
                indiviualZigZagPlayerBalanceInMM -= tieAmtZigZagPlayer;
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
            indiviualZigZagPlayerBalanceInMM -= PerUnit * betUnitZigZagPlayer;
            balanceZigZagPlayer -= PerUnit * betUnitZigZagPlayer;
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

    if (statusIsFileUpload == 0 || (statusIsFileUpload == 1 && (gameMode == "ZigZag Banker First" || 'Multiple Mode' == gameMode))) {

        indiviualZigZagBankerBalanceInMM = 0;
        if (betOnZigZagBanker == actualWinner && actualWinner != 'Tie') {

            netProfitZigZagBanker += betUnitZigZagBanker;
            winZigZagBanker = 1;
            if (betOnZigZagBanker == 'Player') {
                balanceZigZagBanker += PerUnit * betUnitZigZagBanker;
                indiviualZigZagBankerBalanceInMM += PerUnit * betUnitZigZagBanker;
            }
            else if (betOnZigZagBanker == 'Banker') {
                balanceZigZagBanker += PerUnit * (betUnitZigZagBanker * comission4Banker / 100);
                indiviualZigZagBankerBalanceInMM += PerUnit * (betUnitZigZagBanker * comission4Banker / 100);
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
            balanceZigZagBanker = roundOff(balanceZigZagBanker, 2);
            indiviualZigZagBankerBalanceInMM -= PerUnit * betUnitZigZagBanker;
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

    // SOW  MANAGEMENT 
    if (statusIsFileUpload == 0 || (statusIsFileUpload == 1 && (gameMode == 'SOW' || 'Multiple Mode' == gameMode))) {

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
                    balanceSOW += PerUnit * (comission4Banker * betUnitSOW / 100);
                    indiviualSOWBalanceInMM += PerUnit * (comission4Banker * betUnitSOW / 100);
                    saveWinsAsBankerSOW++;
                }
                if (BetOnTieSOW != 0) {
                    balanceSOW -= tieAmtSOW;
                    netProfitSOW -= tieUnitSOW;
                    WholeLossUnitSOW += tieUnitSOW;
                    indiviualSOWBalanceInMM -= tieAmtSOW;
                }
                balanceSOW = roundOff(balanceSOW);

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

    // MVD MANAGEMENT
    if (statusIsFileUpload == 0 || (statusIsFileUpload == 1 && (gameMode == "MVD" || 'Multiple Mode' == gameMode))) {

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
                indiviualMVDBalanceInMM += PerUnit * betUnitMVD;
                balanceMVD += PerUnit * betUnitMVD;
            }
            else if (betOnMVD == 'Banker') {
                balanceMVD += PerUnit * (betUnitMVD * comission4Banker / 100);
                indiviualMVDBalanceInMM += PerUnit * (betUnitMVD * comission4Banker / 100);
                saveWinsAsBankerMVD++;
            }
            if (BetOnTieMVD != 0) {
                balanceMVD -= tieAmtMVD;
                netProfitMVD -= tieUnitMVD;
                WholeLossUnitMVD += tieUnitMVD;
                indiviualMVDBalanceInMM -= tieAmtMVD;
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
                indiviualMVDBalanceInMM -= tieAmtMVD;
            }
            balanceMVD -= PerUnit * betUnitMVD;
            indiviualMVDBalanceInMM -= PerUnit * betUnitMVD;
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
    if ((statusIsFileUpload == 0 || statusOfRS == 1) && statusOfVariableTableShow == 1) displayvariableTable();


}

/* Push In Borad Table */
function pushInBoradTable() {

    var temp = {
        "hand": hand,
        "TieMode": tieMode,
        "actualWinner": actualWinner,
        "playerGame": {
            "betOn": 'Player',
            "betUnit": betUnitPlayer,
            "netProfit": netProfitPlayer,
            "win": winPlayer,
            "balance": balancePlayer,
            "BetOnTie": BetOnTiePlayer,
            "TieAmount": tieAmtPlayer,
            "TieUnit": tieUnitPlayer,
            "TotalBetAmount": totalBetAmtPlayer,
            "TotalTieWin": TotalTieWinPlayer,
            "MaxBet": maxBetPlayer,
            "WholeBetUnit": WholeBetUnitPlayer,
            "WholeWinUnit": WholeWinUnitPlayer,
            "WholeLossUnit": WholeLossUnitPlayer,
            "maxContiuneWin": saveMaxContiuneWinPlayer,
            "maxContiuneLoss": saveMaxContiuneLossPlayer,
            "BrakeCount": brakeCountPlayer,
            "MaxBalance": saveMaxBalancePlayer,
            "WinsAsPlayer": saveWinsAsPlayerPlayer,
            "WinsAsBanker": saveWinsAsBankerP,
            "AmountSelectionIndex": AmountSelectionIndexPlayer,
            BrakeModeOnInPlay: BrakeModeOnInPlayPlayer,
        },
        "BankerGame": {
            "betOn": 'Banker',
            "betUnit": betUnitBanker,
            "netProfit": netProfitBanker,
            "win": winBanker,
            "balance": balanceBanker,
            "BetOnTie": BetOnTieBanker,
            "TieAmount": tieAmtBanker,
            "TieUnit": tieUnitBanker,
            "TotalBetAmount": totalBetAmtBanker,
            "TotalTieWin": TotalTieWinBanker,
            "MaxBet": maxBetBanker,
            "WholeBetUnit": WholeBetUnitBanker,
            "WholeWinUnit": WholeWinUnitBanker,
            "WholeLossUnit": WholeLossUnitBanker,
            "maxContiuneWin": saveMaxContiuneWinBanker,
            "maxContiuneLoss": saveMaxContiuneLossBanker,
            "BrakeCount": brakeCountBanker,
            "MaxBalance": saveMaxBalanceBanker,
            "WinsAsPlayer": saveWinsAsPlayerBanker,
            "WinsAsBanker": saveWinsAsBankerB,
            "AmountSelectionIndex": AmountSelectionIndexBanker,
            BrakeModeOnInPlay: BrakeModeOnInPlayBanker
        },
        "differential": {
            "betOn": betonDifferential,
            "betUnit": betUnitDifferential,
            "netProfit": netProfitDifferential,
            "win": winDifferential,
            "balance": balanceDifferential,
            "BetOnTie": BetOnTieDifferential,
            "TieUnit": tieUnitDifferential,
            "TieAmount": tieAmtDifferential,
            "TotalBetAmount": totalBetAmtDifferential,
            "MaxBet": maxBetDifferential,
            "WholeBetUnit": WholeBetUnitDifferential,
            "WholeWinUnit": WholeWinUnitDifferential,
            "WholeLossUnit": WholeLossUnitDifferential,
            "maxContiuneWin": saveMaxContiuneWinDifferential,
            "maxContiuneLoss": saveMaxContiuneLossDifferential,
            "BrakeCount": brakeCountDifferential,
            "MaxBalance": saveMaxBalanceDifferential,
            "WinsAsPlayer": saveWinsAsPlayerDifferential,
            "WinsAsBanker": saveWinsAsBankerDiff
        },
        "ZigZagPlayerGame": {
            "betOn": betOnZigZagPlayer,
            "betUnit": betUnitZigZagPlayer,
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
            "AmountSelectionIndex": AmountSelectionIndexZigZagPlayer,
            BrakeModeOnInPlay: BrakeModeOnInPlayZigZagPlayer,
        },
        "ZigZagBankerGame": {
            "betOn": betOnZigZagBanker,
            "betUnit": betUnitZigZagBanker,
            "netProfit": netProfitZigZagBanker,
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
            "AmountSelectionIndex": AmountSelectionIndexZigZagBanker,
            BrakeModeOnInPlay: BrakeModeOnInPlayZigZagBanker,
        },
        "SOW": {
            betOn: betOnSOW,
            betUnit: betUnitSOW,
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
            AmountSelectionIndex: AmountSelectionIndexSOW,
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
        MVD: {
            betOn: betOnMVD,
            startGameMVD: startGameMVD,
            setBanker1stTime: setBanker1stTime,
            AmountSelectionIndex: AmountSelectionIndexMVD,
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

    if (gameMode == "Multiple Mode") {
        displayTableINMultiMode();
        return;
    }

    let html = "<table class = 'table' id = 'borad-table' >";
    html += `<thead>  <tr>
              <th class = "col-xs-1">Hand</th>
              <th class = "col-xs-2">Bet</th>
              <th class = "col-xs-2">Amount</th>
              <th class = "col-xs-2">Tie Amount</th>
              <th class = "col-xs-2">Total Amount</th>
              <th class = "col-xs-1">Results</th>
              <th class = "col-xs-1">Balance</th>
           </tr></thead>` ;

    for (var i = Borad.length - 1; i > -1; i--) {
        html += "<tr>";

        html += "<td >" + Borad[i].hand;
        if (Borad[i].Play2On == 1 && Borad[i].Play3On == 1) {
            html += "<span class='play3'>*</span>";
        } else if (Borad[i].Play2On == 1 && Borad[i].Play3On == 0) {
            html += "<span class='play2'>*</span>";
        }
        if (Borad[i].TieMode == 1) {
            html += "<span class='super-script'>T</span>";
        }
        html += "</td>";

        if (gameMode == 'Player') {
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

        } else if (gameMode == 'Banker') {
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
        } else if (gameMode == 'ZigZag Player First') {
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

        } else if (gameMode == 'ZigZag Banker First') {
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

        }
        // SOW //
        else if (gameMode == 'SOW') {
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



        } else if (gameMode == "MVD") {
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

// Display Variable Table //
function displayvariableTable() {

    document.getElementById('showVaribleTableBtn').innerHTML = `
  <button type="button" class="btn btn-dark  first-row-btn" onclick="hideVariableTable()">Hide Variable Table</button>
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
        if (gameMode == 'Player') {
            html += '<td>' + Borad[Borad.length - 1].playerGame.WinsAsPlayer + '/' + Borad[Borad.length - 1].playerGame.WinsAsBanker + '</td>';
            // html += '<td>' + 0 + '</td>';
            html += '<td>' + Borad[Borad.length - 1].playerGame.MaxBet + '</td>';
            html += '<td>' + Borad[Borad.length - 1].playerGame.MaxBalance + '</td>';
            html += '<td>' + Borad[Borad.length - 1].playerGame.balance + '</td>';
        } else if (gameMode == 'Banker') {

            html += '<td>' + Borad[Borad.length - 1].BankerGame.WinsAsPlayer + '/' + Borad[Borad.length - 1].BankerGame.WinsAsBanker + '</td>';
            // html += '<td>' + 0 + '</td>';
            html += '<td>' + Borad[Borad.length - 1].BankerGame.MaxBet + '</td>';
            html += '<td>' + Borad[Borad.length - 1].BankerGame.MaxBalance + '</td>';
            html += '<td>' + Borad[Borad.length - 1].BankerGame.balance + '</td>';

        } else if (gameMode == 'ZigZag Player First') {

            html += '<td>' + Borad[Borad.length - 1].ZigZagPlayerGame.WinsAsPlayer + '/' + Borad[Borad.length - 1].ZigZagPlayerGame.WinsAsBanker + '</td>';
            html += '<td>' + Borad[Borad.length - 1].ZigZagPlayerGame.MaxBet + '</td>';
            html += '<td>' + Borad[Borad.length - 1].ZigZagPlayerGame.MaxBalance + '</td>';
            html += '<td>' + Borad[Borad.length - 1].ZigZagPlayerGame.balance + '</td>';

        } else if (gameMode == 'ZigZag Banker First') {

            html += '<td>' + Borad[Borad.length - 1].ZigZagBankerGame.WinsAsPlayer + '/' + Borad[Borad.length - 1].ZigZagBankerGame.WinsAsBanker + '</td>';
            html += '<td>' + Borad[Borad.length - 1].ZigZagBankerGame.MaxBet + '</td>';
            html += '<td>' + Borad[Borad.length - 1].ZigZagBankerGame.MaxBalance + '</td>';
            html += '<td>' + Borad[Borad.length - 1].ZigZagBankerGame.balance + '</td>';

        }
        else if (gameMode == "Multiple Mode") {

            html += '<td>' + BoradForMultiMode[BoradForMultiMode.length - 1].winASPlayer + '/' + BoradForMultiMode[BoradForMultiMode.length - 1].WinsAsBanker + '</td>';
            html += '<td>' + BoradForMultiMode[BoradForMultiMode.length - 1].maxBet + '</td>';
            html += '<td>' + BoradForMultiMode[BoradForMultiMode.length - 1].maxBalance + '</td>';
            html += '<td>' + BoradForMultiMode[BoradForMultiMode.length - 1].balance + '</td>';

        } else if (gameMode == 'SOW') {
            html += '<td>' + Borad[Borad.length - 1].SOW.WinsAsPlayer + '/' + Borad[Borad.length - 1].SOW.WinsAsBanker + '</td>';
            html += '<td>' + Borad[Borad.length - 1].SOW.MaxBet + '</td>';
            html += '<td>' + Borad[Borad.length - 1].SOW.MaxBalance + '</td>';
            html += '<td>' + Borad[Borad.length - 1].SOW.balance + '</td>';
        } else if (gameMode == 'MVD') {

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

        if (gameMode == 'Player') {
            html += '<td>' + Borad[Borad.length - 1].playerGame.maxContiuneWin + '</td>';
            html += '<td>' + Borad[Borad.length - 1].playerGame.maxContiuneLoss + '</td>';
            html += '<td>' + roundOff(Borad[Borad.length - 1].playerGame.WholeBetUnit / hand, 2) + '</td>';
            html += '<td>' + roundOff(Borad[Borad.length - 1].playerGame.WholeWinUnit / hand, 2) + '</td>';
            html += '<td>' + roundOff(Borad[Borad.length - 1].playerGame.WholeLossUnit / hand, 2) + '</td>';
            html += '<td>' + roundOff((Borad[Borad.length - 1].playerGame.WholeWinUnit * 100) / (Borad[Borad.length - 1].playerGame.WholeWinUnit + Borad[Borad.length - 1].playerGame.WholeLossUnit), 2) + '</td>';

        } else if (gameMode == 'Banker') {

            html += '<td>' + Borad[Borad.length - 1].BankerGame.maxContiuneWin + '</td>';
            html += '<td>' + Borad[Borad.length - 1].BankerGame.maxContiuneLoss + '</td>';
            html += '<td>' + roundOff(Borad[Borad.length - 1].BankerGame.WholeBetUnit / hand, 2) + '</td>';
            html += '<td>' + roundOff(Borad[Borad.length - 1].BankerGame.WholeWinUnit / hand, 2) + '</td>';
            html += '<td>' + roundOff(Borad[Borad.length - 1].BankerGame.WholeLossUnit / hand, 2) + '</td>';
            html += '<td>' + roundOff((Borad[Borad.length - 1].BankerGame.WholeWinUnit * 100) / (Borad[Borad.length - 1].BankerGame.WholeWinUnit + Borad[Borad.length - 1].BankerGame.WholeLossUnit), 2) + '</td>';


        } else if (gameMode == 'ZigZag Player First') {

            html += '<td>' + Borad[Borad.length - 1].ZigZagPlayerGame.maxContiuneWin + '</td>';
            html += '<td>' + Borad[Borad.length - 1].ZigZagPlayerGame.maxContiuneLoss + '</td>';
            html += '<td>' + roundOff(Borad[Borad.length - 1].ZigZagPlayerGame.WholeBetUnit / hand, 2) + '</td>';
            html += '<td>' + roundOff(Borad[Borad.length - 1].ZigZagPlayerGame.WholeWinUnit / hand, 2) + '</td>';
            html += '<td>' + roundOff(Borad[Borad.length - 1].ZigZagPlayerGame.WholeLossUnit / hand, 2) + '</td>';
            html += '<td>' + roundOff((Borad[Borad.length - 1].ZigZagPlayerGame.WholeWinUnit * 100) / (Borad[Borad.length - 1].ZigZagPlayerGame.WholeWinUnit + Borad[Borad.length - 1].ZigZagPlayerGame.WholeLossUnit), 2) + '</td>';

        } else if (gameMode == "Multiple Mode") {
            html += '<td>' + BoradForMultiMode[BoradForMultiMode.length - 1].maxContiuneWin + '</td>';
            html += '<td>' + BoradForMultiMode[BoradForMultiMode.length - 1].maxContiuneLoss + '</td>';
            html += '<td>' + roundOff(BoradForMultiMode[BoradForMultiMode.length - 1].wholeBetUnit / hand) + '</td>';
            html += '<td>' + roundOff(BoradForMultiMode[BoradForMultiMode.length - 1].WholeWinUnit / hand) + '</td>';
            html += '<td>' + roundOff(BoradForMultiMode[BoradForMultiMode.length - 1].WholeLossUnit / hand) + '</td>';
            html += '<td>' + roundOff((BoradForMultiMode[BoradForMultiMode.length - 1].WholeWinUnit * 100) / (BoradForMultiMode[BoradForMultiMode.length - 1].WholeWinUnit + BoradForMultiMode[BoradForMultiMode.length - 1].WholeLossUnit), 2) + '</td>';
        } else if (gameMode == 'ZigZag Banker First') {

            html += '<td>' + Borad[Borad.length - 1].ZigZagBankerGame.maxContiuneWin + '</td>';
            html += '<td>' + Borad[Borad.length - 1].ZigZagBankerGame.maxContiuneLoss + '</td>';
            html += '<td>' + roundOff(Borad[Borad.length - 1].ZigZagBankerGame.WholeBetUnit / hand, 2) + '</td>';
            html += '<td>' + roundOff(Borad[Borad.length - 1].ZigZagBankerGame.WholeWinUnit / hand, 2) + '</td>';
            html += '<td>' + roundOff(Borad[Borad.length - 1].ZigZagBankerGame.WholeLossUnit / hand, 2) + '</td>';
            html += '<td>' + roundOff((Borad[Borad.length - 1].ZigZagBankerGame.WholeWinUnit * 100) / (Borad[Borad.length - 1].ZigZagBankerGame.WholeWinUnit + Borad[Borad.length - 1].ZigZagBankerGame.WholeLossUnit), 2) + '</td>';

        } else if (gameMode == 'SOW') {

            html += '<td>' + Borad[Borad.length - 1].SOW.maxContiuneWin + '</td>';
            html += '<td>' + Borad[Borad.length - 1].SOW.maxContiuneLoss + '</td>';
            html += '<td>' + roundOff(Borad[Borad.length - 1].SOW.WholeBetUnit / hand, 2) + '</td>';
            html += '<td>' + roundOff(Borad[Borad.length - 1].SOW.WholeWinUnit / hand, 2) + '</td>';
            html += '<td>' + roundOff(Borad[Borad.length - 1].SOW.WholeLossUnit / hand, 2) + '</td>';
            html += '<td>' + roundOff((Borad[Borad.length - 1].SOW.WholeWinUnit * 100) / (Borad[Borad.length - 1].SOW.WholeWinUnit + Borad[Borad.length - 1].SOW.WholeLossUnit), 2) + '</td>';

        } else if (gameMode == 'MVD') {

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
        statusOfVariableTableShow = 1;
        document.getElementById('variableTableINCP').style.display = 'block';
    } else {
        document.getElementById('variableTable').innerHTML = html;
        statusOfVariableTableShow = 1;
        document.getElementById('variableTable').style.display = 'block';
    }

}

function hideVariableTable() {

    document.getElementById('showVaribleTableBtn').innerHTML = `
    <button type="button" class="btn btn-dark  first-row-btn" onclick="displayvariableTable()" >Show Variable Table</button>
    `;

    if (statusOfRS == 1) {
        document.getElementById('showVaribleTableBtn').innerHTML = `
    <button type="button" class="btn btn-dark" onclick="displayvariableTable()">Show Variable Table</button>
    `;
    }
    document.getElementById('variableTable').style.display = 'none';
    statusOfVariableTableShow = 0;

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

    if (document.getElementById('TieModeId').checked == true) {
        tieMode = 1;
    }

    return;


    if (Borad[Borad.length - 1].actualWinner == 'Banker') {
        noOfBanker--;
    } else if (Borad[Borad.length - 1].actualWinner == 'Player') {
        noOfPlayer--;
    } else if (Borad[Borad.length - 1].actualWinner == 'Tie') {
        TotalTieWin--;
    }

    let i = 0; var k = 0;
    for (j = 0; j < baccaratBoradTable[i].length; j++) {
        for (k = 0; k < baccaratBoradTable.length; k++) {
            if (baccaratBoradTable[k][j].hand == hand) {
                baccaratBoradTable[k][j] = {
                    "winner": 'nathing',
                    "color": 'black',
                    "filled": 0,
                    "hand": -1,
                    "lastWinner": null,
                    "noOfTie": 0
                };
            } else if (baccaratBoradTable[k][j].noOfTie + baccaratBoradTable[k][j].hand == hand) {
                baccaratBoradTable[k][j].noOfTie--;
            }
        }
    }

    Borad.pop();
    if (Borad.length == 0) {
        hand = 0;
        netProfitBanker = 0; netProfitPlayer = 0;
        balanceBanker = 0; balanceDifferential = 0, balancePlayer = 0;
        saveMaxBalancePlayer = 0, saveMaxBalanceDifferential = 0, saveMaxBalanceBanker = 0;
        saveWinsAsPlayerPlayer = 0, saveWinsAsPlayerDifferential = 0, saveWinsAsPlayerBanker = 0;
    } else {
        hand = Borad[Borad.length - 1].hand;
        netProfitPlayer = Borad[Borad.length - 1].playerGame.netProfit;
        netProfitBanker = Borad[Borad.length - 1].BankerGame.netProfit;
        netProfitDifferential = Borad[Borad.length - 1].differential.netProfit;
        balancePlayer = Borad[Borad.length - 1].playerGame.balance;
        balanceBanker = Borad[Borad.length - 1].BankerGame.balance;
        balanceDifferential = Borad[Borad.length - 1].differential.balance;
        TotalTieWinBanker = Borad[Borad.length - 1].BankerGame.TotalTieWin;
        TotalTieWinPlayer = Borad[Borad.length - 1].playerGame.TotalTieWin;

        //simulation Var //
        maxBetPlayer = Borad[Borad.length - 1].playerGame.MaxBet;
        WholeWinUnitPlayer = Borad[Borad.length - 1].playerGame.WholeBetUnit;
        WholeLossUnitPlayer = Borad[Borad.length - 1].playerGame.WholeLossUnit;
        saveMaxContiuneWinPlayer = Borad[Borad.length - 1].playerGame.maxContiuneWin;
        saveMaxContiuneLossPlayer = Borad[Borad.length - 1].playerGame.maxContiuneLoss;

        maxBetBanker = Borad[Borad.length - 1].BankerGame.MaxBet;
        WholeWinUnitBanker = Borad[Borad.length - 1].BankerGame.WholeBetUnit;
        WholeLossUnitBanker = Borad[Borad.length - 1].BankerGame.WholeLossUnit;
        saveMaxContiuneWinBanker = Borad[Borad.length - 1].BankerGame.maxContiuneWin;
        saveMaxContiuneLossBanker = Borad[Borad.length - 1].BankerGame.maxContiuneLoss;

        maxBetDifferential = Borad[Borad.length - 1].differential.MaxBet;
        WholeWinUnitDifferential = Borad[Borad.length - 1].differential.WholeBetUnit;
        WholeLossUnitDifferential = Borad[Borad.length - 1].differential.WholeLossUnit;
        saveMaxContiuneWinDifferential = Borad[Borad.length - 1].differential.maxContiuneWin;
        saveMaxContiuneLossDifferential = Borad[Borad.length - 1].differential.maxContiuneLoss;

        saveMaxBalanceBanker = Borad[Borad.length - 1].playerGame.MaxBalance;
        saveMaxBalancePlayer = Borad[Borad.length - 1].BankerGame.MaxBalance;
        saveMaxBalanceDifferential = Borad[Borad.length - 1].differential.MaxBalance;

        saveWinsAsPlayerPlayer = Borad[Borad.length - 1].playerGame.WinsAsPlayer;
        saveWinsAsPlayerDifferential = Borad[Borad.length - 1].differential.WinsAsPlayer;
        saveWinsAsPlayerBanker = Borad[Borad.length - 1].BankerGame.WinsAsPlayer;

        BrakeModeOnInPlayPlayer = Borad[Borad.length - 1].playerGame.BrakeModeOnInPlay;
        BrakeModeOnInPlayBanker = Borad[Borad.length - 1].BankerGame.BrakeModeOnInPlay;
    }

    displayTable();
    previewBet();
    displayBaccaratBorad();
    if ((statusIsFileUpload == 0 || statusOfRS == 1) && statusOfVariableTableShow == 1) displayvariableTable();


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

    document.getElementById('Baccarat-Borad').innerHTML = html;
    document.getElementById('Baccarat-Borad').scrollLeft = 10000;


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
    document.getElementById('NoofBP').innerHTML = html4NoDisplay;

}


/* 
*
0.4 :- Dispaly Preiew in Multi Mode 
*
*/
function displayPreviewBet() {

    TotalBetAmountInMultipleMode = 0;

    if (gameMode == "Multiple Mode") bet.innerHTML = "";

    if (multipleBetOnPlayer == 0 && multipleBetOnBanker == 0) {

        if (gameMode == "Multiple Mode") {
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
            if (gameMode == "Multiple Mode") bet.innerHTML += '<div><span class="boradTableinPlayer"> Player </span><span>: $' + multipleBetUnitOnPlayer * PerUnit + '</span></div>';
            TotalBetAmountInMultipleMode += multipleBetUnitOnPlayer * PerUnit;
            if (BoradForMultiMode.length != 0) wholeBetUnitINMM += multipleBetUnitOnPlayer;
        }

        if (multipleBetOnBanker == 1) {
            if (gameMode == "Multiple Mode") bet.innerHTML += '<div><span class="boradTableinBanker"> Banker</span><span> : $' + multipleBetUnitOnBanker * PerUnit + '</span></div>';
            TotalBetAmountInMultipleMode += multipleBetUnitOnBanker * PerUnit;
            if (BoradForMultiMode.length != 0) wholeBetUnitINMM += multipleBetUnitOnBanker;
        }


        if (BoradForMultiMode.length > 1 && BoradForMultiMode[BoradForMultiMode.length - 1].BrakeCount >= brakeNo && brakeNo != 0) {
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
            if (gameMode == "Multiple Mode") bet.innerHTML = '<div><span class="boradTableinPlayer"> Player </span><span>: $' + 0 + '</span></div>';
            if (gameMode == "Multiple Mode") bet.innerHTML += '<div><span class="boradTableinBanker"> Banker </span><span>: $' + 0 + '</span></div>';
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
            if (gameMode == "Multiple Mode") bet.innerHTML += '<div><span class="boradTableinPlayer"> Player </span><span>: $' + multipleBetUnitOnPlayer * PerUnit + '</span></div>';
        }
        // Banker High 
        else {
            multipleBetUnitOnBanker -= multipleBetUnitOnPlayer;
            wholeBetUnitINMM += multipleBetUnitOnBanker;
            TotalBetAmountInMultipleMode += multipleBetUnitOnBanker * PerUnit;
            multipleBetOnPlayer = 0; multipleBetUnitOnPlayer = 0;
            if (gameMode == "Multiple Mode") bet.innerHTML += '<div><span class="boradTableinBanker"> Banker</span><span> : $' + multipleBetUnitOnBanker * PerUnit + '</span></div>';
        }

        if (BoradForMultiMode.length > 1 && BoradForMultiMode[BoradForMultiMode.length - 1].BrakeCount >= brakeNo && brakeNo != 0) {
            if (multipleBetUnitOnPlayer > multipleBetUnitOnBanker) {
                wholeBetUnitINMM -= multipleBetUnitOnPlayer;
                DummymultipleBetOnPlayer = 1, DummymultipleBetOnBanker = 0;
                DummymultipleBetUnitOnPlayer = multipleBetUnitOnPlayer, DummymultipleBetUnitOnBanker = 0;
                if (gameMode == "Multiple Mode") bet.innerHTML = '<div><span class="boradTableinPlayer"> Player </span><span>: $' + 0 + '</span></div>';
            }
            else {
                wholeBetUnitINMM -= multipleBetUnitOnBanker;
                DummymultipleBetOnPlayer = 0, DummymultipleBetOnBanker = 1;
                DummymultipleBetUnitOnPlayer = 0, DummymultipleBetUnitOnBanker = multipleBetUnitOnBanker;
                if (gameMode == "Multiple Mode") bet.innerHTML = '<div><span class="boradTableinBanker"> Banker</span><span> : $' + 0 + '</span></div>';
            }
            multipleBetUnitOnPlayer = 0, multipleBetUnitOnBanker = 0;
            TotalBetAmountInMultipleMode = 0;
        }
    }
    if (BoradForMultiMode.length > 1 && BoradForMultiMode[BoradForMultiMode.length - 1].BrakeCount >= brakeNo && brakeNo != 0){
        multipleBetAmountOnTie = 0 ;
    }else if (multipleBetOnTie == 1) {
        if (gameMode == "Multiple Mode") bet.innerHTML += '<div><span class="boradTableinTie"> Tie Amount </span><span>: $' + multipleBetAmountOnTie + '</span></div>';
        TotalBetAmountInMultipleMode += multipleBetAmountOnTie;
        if (BoradForMultiMode.length != 0) wholeBetUnitINMM += multipleBetUnitOnTie;
    }

    if (BoradForMultiMode.length != 0) wholeBetUnitINMM += parseInt(BoradForMultiMode[BoradForMultiMode.length - 1].wholeBetUnit);

    if (gameMode == "Multiple Mode") bet.innerHTML += '<div><span> Total Amount : $' + TotalBetAmountInMultipleMode + '</span></div>';

    // Save max total bet amt 
    if (TotalBetAmountInMultipleMode > saveMaxBetINMM) {
        saveMaxBetINMM = TotalBetAmountInMultipleMode;
    }

    if (gameMode == "Multiple Mode") {

        if (selectedMethodType == "Normal") {

            preview.innerHTML = "Win(W) : ";

            if (previewBetOnPlayerWin == 1) {
                preview.innerHTML += "Player $" + previewBetUnitPlayerWinINMM * PerUnit + " &nbsp;&nbsp;  ";
            }

            if (previewBetOnBankerWin == 1) {
                preview.innerHTML += "Banker $" + previewBetUnitBankerWinINMM * PerUnit;
            }

            preview.innerHTML += "<br>Loss(L) : ";

            if (BoradForMultiMode.length > 1 && BoradForMultiMode[BoradForMultiMode.length - 1].BrakeCount + 1 >= brakeNo && brakeNo != 0) {
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

            if (BoradForMultiMode.length > 1 && BoradForMultiMode[BoradForMultiMode.length - 1].BrakeCount + 1 >= brakeNo && brakeNo != 0) {
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
