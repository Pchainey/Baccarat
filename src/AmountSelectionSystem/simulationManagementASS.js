
// Manage Var //
var startNumber = document.getElementById('IdStartNumber').value;
var endNumber = document.getElementById('IdEndNumber').value;
var statusOfShowParameter = 0;

var saveReturn = 0, saveMaxBet = 0, saveWinsInARow = 0, saveLossesInARow = 0, winPercentage = 0;
var totalWinGame = 0, totalLossGame = 0, totalPlayedHand = 0;
var totalSaveWinsInARow = 0, totalSaveLossesInARow = 0;
var lifetimeBalance = 0, largestBet = 0, averagebetlifetime = 0, averagewinlifetime = 0, averagelosslifetime = 0;
var winsintotal = 0, lossesintotal = 0, AverageWinPercentage = 0;
var avgbet = 0, avgwinPerGame = 0, avglossPerGame = 0;
var count4Wins = 0, count4Losses = 0;
var statusOfGameResult = null;
var saveMaxWinsInRow = 0, saveMaxLossesInRow = 0;
maxContiuneWin = 0;
count4Shoes = 0, simulationShoe = [], maxHand = 100;

/* Change In Start Number */
function changeStartNumber() {
    if (parseInt(document.getElementById('IdStartNumber').value) > lastshoeNumberInXlsxFile) {
        startNumber = lastshoeNumberInXlsxFile;
        document.getElementById('IdStartNumber').value = lastshoeNumberInXlsxFile;
    } else if (document.getElementById('IdStartNumber').value >= 1) {
        startNumber = parseInt(document.getElementById('IdStartNumber').value);
    } else {
        document.getElementById('IdStartNumber').value = 1;
        startNumber = 1;
    }

}

/* Change In End Number */
function changeEndNumber() {

    if (parseInt(document.getElementById('IdEndNumber').value) > lastshoeNumberInXlsxFile) {
        endNumber = lastshoeNumberInXlsxFile;
        document.getElementById('IdEndNumber').value = lastshoeNumberInXlsxFile;
    } else if (document.getElementById('IdEndNumber').value >= 1)
        endNumber = parseInt(document.getElementById('IdEndNumber').value);
    else {
        document.getElementById('IdEndNumber').value = 1;
        endNumber = 1;
    }
}

/* Declaring Variable */
function declareVariable() {

    noOfBanker = 0, noOfPlayer = 0;
    if (gameMode == 'Player' || gameMode == 'Differential') {
        balancePlayer = 0, TotalTieWinPlayer = 0;
    }
    if (gameMode == 'Banker' || gameMode == 'Differential') {
        balanceBanker = 0, TotalTieWinBanker = 0, totalBetAmtBanker = 0;
        noOfBanker = 0; tieUnitBanker = 0;
        BetOnTieBanker = 0; tieAmtBanker = 0;
    }
    if (gameMode == 'Differential') {
        balanceDifferential = 0, betOnDifferential = null;
    }

}

async function startExecutingBtn() {

    startNumber = parseInt(document.getElementById('IdStartNumber').value);
    endNumber = parseInt(document.getElementById('IdEndNumber').value);
    gameMode = document.getElementById('GameModeId').options[GameModeId.selectedIndex].innerHTML;
    stopLossNo = document.getElementById('StopLossID').value;
    maxBetNo = document.getElementById('MaxBetID').value;
    stopProfitNo = document.getElementById("StopProfitID").value;
    PerUnit = document.getElementById('PerUnitId').value;
    brakeNo = document.getElementById('BrakeId').value;
    maxHandNo = document.getElementById('MaxHandId').value;


    if (startNumber > endNumber) {
        document.getElementById('Simulation-Shoe').style.display = 'block';
        document.getElementById('Simulation-Shoe').innerHTML = `
        <h3 id='error-title'> You Place Start Number Greater Than End Number. <h3>
        `;
        document.getElementById('lodingSpinner').style.display = 'none';

    } else {
        await startExecuting();

    }
    document.getElementById('back-home').style.display = 'block';
    document.getElementById('mainBackToHome').style.display = 'none';
    document.getElementById('formDisplay').style.display = 'none';


}

async function loadLoderFun() {
    document.getElementById('lodingSpinner').style.display = 'block';
    setTimeout(startExecutingBtn, 5);
}

/* Start Executing */
async function startExecuting() {

    declareVariable();

    while (startNumber <= endNumber) {
        count4ShoesHand = 1;

        while (count4ShoesHand <= maxHandNo) {

            previewBet();
            winnerInSimulation = excelRows[startNumber - 1]['Hand ' + count4ShoesHand];
            if (winnerInSimulation == 'P') actualWin('actualWinPlayer');
            else if (winnerInSimulation == 'B') actualWin('actualWinBanker');
            else if (winnerInSimulation == 'T') {
                actualWin('tieWinner');
            }
            else {
                excelRows[startNumber - 1]['Hand ' + count4ShoesHand] = tempWinnerToSaveWinnerName;
                tempWinnerToSaveWinnerName = null;
                break;
            }
            count4ShoesHand++;
        }

        saveSimulationShoe();
        clearTable();
        startNumber++;

    }

    document.getElementById('lodingSpinner').style.display = 'none';
    displaySimulationShoe();

}

/* Save Simualtion */
function saveSimulationShoe() {

    statusOfGameResult = null;
    if (gameMode == 'Player') {

        avgbet = Borad[Borad.length - 1].playerGame.WholeBetUnit / (count4ShoesHand - 1);
        avgbet = roundOff(avgbet, 4);


        avgwinPerGame = Borad[Borad.length - 1].playerGame.WholeWinUnit / (count4ShoesHand - 1);
        avgwinPerGame = roundOff(avgwinPerGame, 4);


        avglossPerGame = Borad[Borad.length - 1].playerGame.WholeLossUnit / (count4ShoesHand - 1);
        avglossPerGame = roundOff(avglossPerGame, 4);

        if (Borad[Borad.length - 1].playerGame.balance >= 0) {
            statusOfGameResult = 'WIN';
            totalWinGame++;
            if (simulationShoe.length > 1 && simulationShoe[simulationShoe.length - 1].GameResult == 'WIN') {
                count4Losses = 0;
                count4Wins++;
            } else {
                count4Losses = 0;
                count4Wins++;
            }

        } else {
            statusOfGameResult = 'LOSS';
            totalLossGame++;
            if (simulationShoe.length > 1 && simulationShoe[simulationShoe.length - 1].GameResult == 'LOSS') {
                count4Losses++;
                count4Wins = 0;
            } else {
                count4Losses++;
                count4Wins = 0;
            }
        }

        winPercentage = (Borad[Borad.length - 1].playerGame.WholeWinUnit * 100) / (Borad[Borad.length - 1].playerGame.WholeWinUnit + Borad[Borad.length - 1].playerGame.WholeLossUnit);
        saveReturn = Borad[Borad.length - 1].playerGame.balance;
        saveMaxBet = Borad[Borad.length - 1].playerGame.MaxBet;
        saveWinsInARow = Borad[Borad.length - 1].playerGame.maxContiuneWin;
        saveLossesInARow = Borad[Borad.length - 1].playerGame.maxContiuneLoss;

    } else if (gameMode == 'Banker') {

        avgbet = Borad[Borad.length - 1].BankerGame.WholeBetUnit / (count4ShoesHand - 1);
        avgbet = roundOff(avgbet, 4);


        avgwinPerGame = Borad[Borad.length - 1].BankerGame.WholeWinUnit / (count4ShoesHand - 1);
        avgwinPerGame = roundOff(avgwinPerGame, 4);


        avglossPerGame = Borad[Borad.length - 1].BankerGame.WholeLossUnit / (count4ShoesHand - 1);
        avglossPerGame = roundOff(avglossPerGame, 4);


        if (Borad[Borad.length - 1].BankerGame.balance >= 0) {
            statusOfGameResult = 'WIN';
            totalWinGame++;
            if (simulationShoe.length > 1 && simulationShoe[simulationShoe.length - 1].GameResult == 'WIN') {
                count4Losses = 0;
                count4Wins++;
            } else {
                count4Losses = 0;
                count4Wins++;
            }

        } else {
            statusOfGameResult = 'LOSS';
            totalLossGame++;
            if (simulationShoe.length > 1 && simulationShoe[simulationShoe.length - 1].GameResult == 'LOSS') {
                count4Losses++;
                count4Wins = 0;
            } else {
                count4Losses++;
                count4Wins = 0;
            }

        }

        winPercentage = (Borad[Borad.length - 1].BankerGame.WholeWinUnit * 100) / (Borad[Borad.length - 1].BankerGame.WholeWinUnit + Borad[Borad.length - 1].BankerGame.WholeLossUnit);

        saveReturn = Borad[Borad.length - 1].BankerGame.balance;
        saveMaxBet = Borad[Borad.length - 1].BankerGame.MaxBet;
        saveWinsInARow = Borad[Borad.length - 1].BankerGame.maxContiuneWin;
        saveLossesInARow = Borad[Borad.length - 1].BankerGame.maxContiuneLoss;

    } else if (gameMode == 'Differential') {

        if (Borad[Borad.length - 1].differential.balance >= 0) {
            statusOfGameResult = 'WIN';
            totalWinGame++;
            if (simulationShoe.length > 1 && simulationShoe[simulationShoe.length - 1].GameResult == 'WIN') {
                count4Losses = 0;
                count4Wins++;
            } else {
                count4Losses = 0;
                count4Wins++;
            }
        } else {
            statusOfGameResult = 'LOSS';
            totalLossGame++;
            if (simulationShoe.length > 1 && simulationShoe[simulationShoe.length - 1].GameResult == 'LOSS') {
                count4Losses++;
                count4Wins = 0;
            } else {
                count4Losses++;
                count4Wins = 0;
            }

        }

        winPercentage = (Borad[Borad.length - 1].differential.WholeWinUnit * 100) / (Borad[Borad.length - 1].differential.WholeWinUnit + Borad[Borad.length - 1].differential.WholeLossUnit);

        avgbet = Borad[Borad.length - 1].differential.WholeBetUnit / (count4ShoesHand - 1);
        avgbet = roundOff(avgbet, 4);


        avgwinPerGame = Borad[Borad.length - 1].differential.WholeWinUnit / (count4ShoesHand - 1);
        avgwinPerGame = roundOff(avgwinPerGame, 4);


        avglossPerGame = Borad[Borad.length - 1].differential.WholeLossUnit / (count4ShoesHand - 1);
        avglossPerGame = roundOff(avglossPerGame, 4);

        saveReturn = Borad[Borad.length - 1].differential.balance;
        saveMaxBet = Borad[Borad.length - 1].differential.MaxBet;
        saveWinsInARow = Borad[Borad.length - 1].differential.maxContiuneWin;
        saveLossesInARow = Borad[Borad.length - 1].differential.maxContiuneLoss;

    } else if (gameMode == "Multiple Mode") {

        if (BoradForMultiMode[BoradForMultiMode.length - 1].balance >= 0) {
            statusOfGameResult = 'WIN';
            totalWinGame++;
            if (simulationShoe.length > 1 && simulationShoe[simulationShoe.length - 1].GameResult == 'WIN') {
                count4Losses = 0;
                count4Wins++;
            } else {
                count4Losses = 0;
                count4Wins++;
            }

        } else {
            statusOfGameResult = 'LOSS';
            totalLossGame++;
            if (simulationShoe.length > 1 && simulationShoe[simulationShoe.length - 1].GameResult == 'LOSS') {
                count4Losses++;
                count4Wins = 0;
            } else {
                count4Losses++;
                count4Wins = 0;
            }
        }

        winPercentage = (BoradForMultiMode[BoradForMultiMode.length - 1].WholeWinUnit * 100) / (BoradForMultiMode[BoradForMultiMode.length - 1].WholeWinUnit + BoradForMultiMode[BoradForMultiMode.length - 1].WholeLossUnit);

        avgbet = BoradForMultiMode[BoradForMultiMode.length - 1].wholeBetUnit / (count4ShoesHand - 1);
        avgbet = roundOff(avgbet);


        avgwinPerGame = BoradForMultiMode[BoradForMultiMode.length - 1].WholeWinUnit / (count4ShoesHand - 1);
        avgwinPerGame = roundOff(avgwinPerGame);


        avglossPerGame = BoradForMultiMode[BoradForMultiMode.length - 1].WholeLossUnit / (count4ShoesHand - 1);
        avglossPerGame = roundOff(avglossPerGame);

        saveReturn = BoradForMultiMode[BoradForMultiMode.length - 1].balance;
        saveMaxBet = BoradForMultiMode[BoradForMultiMode.length - 1].maxBet;
        saveWinsInARow = BoradForMultiMode[BoradForMultiMode.length - 1].maxContiuneWin;
        saveLossesInARow = BoradForMultiMode[BoradForMultiMode.length - 1].maxContiuneLoss;

    } else if (gameMode == 'ZigZag Player First') {

        avgbet = Borad[Borad.length - 1].ZigZagPlayerGame.WholeBetUnit / (count4ShoesHand - 1);
        avgbet = roundOff(avgbet, 4);


        avgwinPerGame = Borad[Borad.length - 1].ZigZagPlayerGame.WholeWinUnit / (count4ShoesHand - 1);
        avgwinPerGame = roundOff(avgwinPerGame, 4);


        avglossPerGame = Borad[Borad.length - 1].ZigZagPlayerGame.WholeLossUnit / (count4ShoesHand - 1);
        avglossPerGame = roundOff(avglossPerGame, 4);

        if (Borad[Borad.length - 1].ZigZagPlayerGame.balance >= 0) {
            statusOfGameResult = 'WIN';
            totalWinGame++;
            if (simulationShoe.length > 1 && simulationShoe[simulationShoe.length - 1].GameResult == 'WIN') {
                count4Losses = 0;
                count4Wins++;
            } else {
                count4Losses = 0;
                count4Wins++;
            }

        } else {
            statusOfGameResult = 'LOSS';
            totalLossGame++;
            if (simulationShoe.length > 1 && simulationShoe[simulationShoe.length - 1].GameResult == 'LOSS') {
                count4Losses++;
                count4Wins = 0;
            } else {
                count4Losses++;
                count4Wins = 0;
            }
        }

        winPercentage = (Borad[Borad.length - 1].ZigZagPlayerGame.WholeWinUnit * 100) / (Borad[Borad.length - 1].ZigZagPlayerGame.WholeWinUnit + Borad[Borad.length - 1].ZigZagPlayerGame.WholeLossUnit);
        saveReturn = Borad[Borad.length - 1].ZigZagPlayerGame.balance;
        saveMaxBet = Borad[Borad.length - 1].ZigZagPlayerGame.MaxBet;
        saveWinsInARow = Borad[Borad.length - 1].ZigZagPlayerGame.maxContiuneWin;
        saveLossesInARow = Borad[Borad.length - 1].ZigZagPlayerGame.maxContiuneLoss;

    } else if (gameMode == 'ZigZag Banker First') {

        avgbet = Borad[Borad.length - 1].ZigZagBankerGame.WholeBetUnit / (count4ShoesHand - 1);
        avgbet = roundOff(avgbet, 4);


        avgwinPerGame = Borad[Borad.length - 1].ZigZagBankerGame.WholeWinUnit / (count4ShoesHand - 1);
        avgwinPerGame = roundOff(avgwinPerGame, 4);


        avglossPerGame = Borad[Borad.length - 1].ZigZagBankerGame.WholeLossUnit / (count4ShoesHand - 1);
        avglossPerGame = roundOff(avglossPerGame, 4);

        if (Borad[Borad.length - 1].ZigZagBankerGame.balance >= 0) {
            statusOfGameResult = 'WIN';
            totalWinGame++;
            if (simulationShoe.length > 1 && simulationShoe[simulationShoe.length - 1].GameResult == 'WIN') {
                count4Losses = 0;
                count4Wins++;
            } else {
                count4Losses = 0;
                count4Wins++;
            }

        } else {
            statusOfGameResult = 'LOSS';
            totalLossGame++;
            if (simulationShoe.length > 1 && simulationShoe[simulationShoe.length - 1].GameResult == 'LOSS') {
                count4Losses++;
                count4Wins = 0;
            } else {
                count4Losses++;
                count4Wins = 0;
            }
        }

        winPercentage = (Borad[Borad.length - 1].ZigZagBankerGame.WholeWinUnit * 100) / (Borad[Borad.length - 1].ZigZagBankerGame.WholeWinUnit + Borad[Borad.length - 1].ZigZagBankerGame.WholeLossUnit);
        saveReturn = Borad[Borad.length - 1].ZigZagBankerGame.balance;
        saveMaxBet = Borad[Borad.length - 1].ZigZagBankerGame.MaxBet;
        saveWinsInARow = Borad[Borad.length - 1].ZigZagBankerGame.maxContiuneWin;
        saveLossesInARow = Borad[Borad.length - 1].ZigZagBankerGame.maxContiuneLoss;

    } else if (gameMode == 'SOW') {

        avgbet = Borad[Borad.length - 1].SOW.WholeBetUnit / (count4ShoesHand - 1);
        avgbet = roundOff(avgbet, 4);


        avgwinPerGame = Borad[Borad.length - 1].SOW.WholeWinUnit / (count4ShoesHand - 1);
        avgwinPerGame = roundOff(avgwinPerGame, 4);


        avglossPerGame = Borad[Borad.length - 1].SOW.WholeLossUnit / (count4ShoesHand - 1);
        avglossPerGame = roundOff(avglossPerGame, 4);

        if (Borad[Borad.length - 1].SOW.balance >= 0) {
            statusOfGameResult = 'WIN';
            totalWinGame++;
            if (simulationShoe.length > 1 && simulationShoe[simulationShoe.length - 1].GameResult == 'WIN') {
                count4Losses = 0;
                count4Wins++;
            } else {
                count4Losses = 0;
                count4Wins++;
            }

        } else {
            statusOfGameResult = 'LOSS';
            totalLossGame++;
            if (simulationShoe.length > 1 && simulationShoe[simulationShoe.length - 1].GameResult == 'LOSS') {
                count4Losses++;
                count4Wins = 0;
            } else {
                count4Losses++;
                count4Wins = 0;
            }
        }

        winPercentage = (Borad[Borad.length - 1].SOW.WholeWinUnit * 100) / (Borad[Borad.length - 1].SOW.WholeWinUnit + Borad[Borad.length - 1].SOW.WholeLossUnit);
        saveReturn = Borad[Borad.length - 1].SOW.balance;
        saveMaxBet = Borad[Borad.length - 1].SOW.MaxBet;
        saveWinsInARow = Borad[Borad.length - 1].SOW.maxContiuneWin;
        saveLossesInARow = Borad[Borad.length - 1].SOW.maxContiuneLoss;

    } else if (gameMode == 'MVD') {

        avgbet = Borad[Borad.length - 1].MVD.WholeBetUnit / (count4ShoesHand - 1);
        avgbet = roundOff(avgbet, 4);


        avgwinPerGame = Borad[Borad.length - 1].MVD.WholeWinUnit / (count4ShoesHand - 1);
        avgwinPerGame = roundOff(avgwinPerGame, 4);


        avglossPerGame = Borad[Borad.length - 1].MVD.WholeLossUnit / (count4ShoesHand - 1);
        avglossPerGame = roundOff(avglossPerGame, 4);

        if (Borad[Borad.length - 1].MVD.balance >= 0) {
            statusOfGameResult = 'WIN';
            totalWinGame++;
            if (simulationShoe.length > 1 && simulationShoe[simulationShoe.length - 1].GameResult == 'WIN') {
                count4Losses = 0;
                count4Wins++;
            } else {
                count4Losses = 0;
                count4Wins++;
            }

        } else {
            statusOfGameResult = 'LOSS';
            totalLossGame++;
            if (simulationShoe.length > 1 && simulationShoe[simulationShoe.length - 1].GameResult == 'LOSS') {
                count4Losses++;
                count4Wins = 0;
            } else {
                count4Losses++;
                count4Wins = 0;
            }
        }

        winPercentage = (Borad[Borad.length - 1].MVD.WholeWinUnit * 100) / (Borad[Borad.length - 1].MVD.WholeWinUnit + Borad[Borad.length - 1].MVD.WholeLossUnit);
        saveReturn = Borad[Borad.length - 1].MVD.balance;
        saveMaxBet = Borad[Borad.length - 1].MVD.MaxBet;
        saveWinsInARow = Borad[Borad.length - 1].MVD.maxContiuneWin;
        saveLossesInARow = Borad[Borad.length - 1].MVD.maxContiuneLoss;
    }


    winPercentage = roundOff(winPercentage, 4);
    count4Shoes++;

    var saveTemp = {
        "Id": count4Shoes,
        "Borad": Borad,
        "Return": saveReturn,
        "SmapleShoeIndex": startNumber,
        "GameResult": statusOfGameResult,
        "TotalHandsPlayed": count4ShoesHand - 1,
        "MaxBet": saveMaxBet,
        "AverageBet": avgbet,
        "AverageWinPerGame": avgwinPerGame,
        "AverageLossPerGame": avglossPerGame,
        "Wins": count4Wins,
        "Losses": count4Losses,
        "WinsInARow": saveWinsInARow,
        "LossesInARow": saveLossesInARow,
        "WinPercentage": winPercentage
    }
    simulationShoe.push(saveTemp);

    totalPlayedHand = totalPlayedHand + count4ShoesHand - 1;
    if (saveMaxWinsInRow < saveWinsInARow) {
        saveMaxWinsInRow = saveWinsInARow;
    }
    if (saveMaxLossesInRow < saveLossesInARow) {
        saveMaxLossesInRow = saveLossesInARow;
    }
    totalSaveWinsInARow = totalSaveWinsInARow + saveWinsInARow;
    totalSaveLossesInARow = totalSaveLossesInARow + saveLossesInARow;
    lifetimeBalance = lifetimeBalance + saveReturn;
    if (largestBet < saveMaxBet) {
        largestBet = saveMaxBet;
    }
    averagebetlifetime = avgbet + averagebetlifetime;
    averagewinlifetime += avgwinPerGame;
    averagelosslifetime += avglossPerGame;
    if (winsintotal < count4Wins) {
        winsintotal = count4Wins;
    }
    if (lossesintotal < count4Losses) {
        lossesintotal = count4Losses;
    }
    AverageWinPercentage += winPercentage;
}

/* Dispaly Simulation Shoe */
function displaySimulationShoe() {

    document.getElementById('Simulation-Shoe').style.display = 'block';

    let html = "<table class = 'table' id = 'simulation-table' >";

    html += `<tr>
    <th class = "col-xs-1">Played Shoes </th>
    <th class = "col-xs-2">Total Winnig</th>
    <th class = "col-xs-2">Total Lossing</th>
    <th class = "col-xs-8">Total hands played lifetime out of all hands</th>
    <th class = "col-xs-2">Wins in a row average lifetime</th>
    <th class = "col-xs-2">Losses in a row average lifetime</th>
    <th class = "col-xs-2">Lifetime Balance</th>
    <th class = "col-xs-2">Largest Bet</th>
    <th class = "col-xs-3">Average bet lifetime</th>
    <th class = "col-xs-3">Average win lifetime</th>
    <th class = "col-xs-3">Average loss lifetime</th>
    <th class = "col-xs-2">Wins in total</th>
    <th class = "col-xs-2">Losses in total</th>
    <th class = "col-xs-2">Average Win %</th>
    `;

    html += '</tr>';

    html += '<tr>';
    html += '<td>' + count4Shoes + '</td>';
    html += '<td>' + totalWinGame + '</td>';
    html += '<td>' + totalLossGame + '</td>';
    html += '<td>' + totalPlayedHand + '</td>';
    html += '<td>' + roundOff(totalSaveWinsInARow / count4Shoes, 2) + ' / ' + saveMaxWinsInRow + '</td>';
    html += '<td>' + roundOff(totalSaveLossesInARow / count4Shoes, 2) + ' / ' + saveMaxLossesInRow + '</td>';
    html += '<td>' + roundOff(lifetimeBalance, 2) + '</td>';
    html += '<td>' + largestBet + '</td>';
    html += '<td>' + roundOff(averagebetlifetime / count4Shoes, 2) + '</td>';
    html += '<td>' + roundOff(averagewinlifetime / count4Shoes, 2) + '</td>';
    html += '<td>' + roundOff(averagelosslifetime / count4Shoes, 2) + '</td>';
    html += '<td>' + winsintotal + '</td>';
    html += '<td>' + lossesintotal + '</td>';
    html += '<td>' + roundOff(AverageWinPercentage / count4Shoes, 2) + '</td>';
    html += '</tr>';

    html += `  <tr id='headerOfTable'>
            <th class = "col-xs-1">No</th>
            <th class = "col-xs-2">Sample shoe index</th>
            <th class = "col-xs-2">Game Result</th>
            <th class = "col-xs-8">Total hands played per game</th>
            <th class = "col-xs-2">Wins in a row</th>
            <th class = "col-xs-2">Losses in a row</th>
            <th class = "col-xs-2">Return</th>
            <th class = "col-xs-2">Max Stake</th>
            <th class = "col-xs-3">Average Bet</th>
            <th class = "col-xs-3">Average Win Per Game</th>
            <th class = "col-xs-3">Average Loss Per Game</th>
            <th class = "col-xs-2">Wins</th>
            <th class = "col-xs-2">Losses</th>
            <th class = "col-xs-2">Win %</th>
         </tr>` ;

    for (let i = 0; simulationShoe.length > i; i++) {

        if (simulationShoe[i].GameResult == 'LOSS') {
            html += "<tr id='lossbackground'>";

            html += "<td>" + simulationShoe[i].Id + "</td>";
            html += "<td>" + simulationShoe[i].SmapleShoeIndex + "</td>";
            html += "<td>" + simulationShoe[i].GameResult + "</td>";
            html += "<td>" + simulationShoe[i].TotalHandsPlayed + "</td>";
            html += "<td>" + simulationShoe[i].WinsInARow + "</td>";
            html += "<td>" + simulationShoe[i].LossesInARow + "</td>";
            html += "<td>" + simulationShoe[i].Return + "</td>";
            html += "<td>" + simulationShoe[i].MaxBet + "</td>";
            html += "<td>" + simulationShoe[i].AverageBet + "</td>";
            html += "<td>" + simulationShoe[i].AverageWinPerGame + "</td>";
            html += "<td>" + simulationShoe[i].AverageLossPerGame + "</td>";
            html += "<td>" + simulationShoe[i].Wins + "</td>";
            html += "<td>" + simulationShoe[i].Losses + "</td>";
            html += "<td>" + simulationShoe[i].WinPercentage + "</td>";

            html += "</tr>";
        } else {
            html += "<tr>";

            html += "<td>" + simulationShoe[i].Id + "</td>";
            html += "<td>" + simulationShoe[i].SmapleShoeIndex + "</td>";
            html += "<td>" + simulationShoe[i].GameResult + "</td>";
            html += "<td>" + simulationShoe[i].TotalHandsPlayed + "</td>";
            html += "<td>" + simulationShoe[i].WinsInARow + "</td>";
            html += "<td>" + simulationShoe[i].LossesInARow + "</td>";
            html += "<td>" + simulationShoe[i].Return + "</td>";
            html += "<td>" + simulationShoe[i].MaxBet + "</td>";
            html += "<td>" + simulationShoe[i].AverageBet + "</td>";
            html += "<td>" + simulationShoe[i].AverageWinPerGame + "</td>";
            html += "<td>" + simulationShoe[i].AverageLossPerGame + "</td>";
            html += "<td>" + simulationShoe[i].Wins + "</td>";
            html += "<td>" + simulationShoe[i].Losses + "</td>";
            html += "<td>" + simulationShoe[i].WinPercentage + "</td>";

            html += "</tr>";
        }

    }

    html += "</table>";

    document.getElementById('Simulation-Shoe').innerHTML = html;

}

/* Next Simulation */
function nextSimulation() {

    document.getElementById('mainBackToHome').style.display = 'block';
    document.getElementById('formDisplay').style.display = 'block';
    document.getElementById('form-title').style.display = 'block';
    document.getElementById('startExecutingId').style.display = 'block';
    document.getElementById('back-home').style.display = 'none';
    saveSimulationResult.push(simulationShoe);
    simulationShoe.length = 0;
    document.getElementById('Simulation-Shoe').style.display = 'none';
    count4Shoes = 0;
    count4Losses = 0;
    count4Wins = 0;
    statusOfShowParameter = 0;
    document.getElementById('showParameterBtn').innerText = 'Show Parameters';
    document.getElementById('Simulation-Shoe').style.marginTop = '10px';

    document.getElementById('IdStartNumber').disabled = false;
    document.getElementById('IdEndNumber').disabled = false;
    document.getElementById('PerUnitId').disabled = false;
    document.getElementById('TieModeId').disabled = false;
    document.getElementById('GameModeId').disabled = false;
    document.getElementById('StopProfitID').disabled = false;
    document.getElementById('StopLossID').disabled = false;
    document.getElementById('MaxBetID').disabled = false;
    document.getElementById('BrakeId').disabled = false;
    document.getElementById('MaxHandId').disabled = false;
    document.getElementById('AmountSelectionSystemId').disabled = false;
    document.getElementById('newAmountSelectionID').disabled = false;
    document.getElementById('AmountSelectionSystemInputTakenFrom').disabled = false;
    document.getElementById('MaltipleGameModeOnPlayer').disabled = false;
    document.getElementById('MaltipleGameModeOnBanker').disabled = false;
    document.getElementById('MaltipleGameModeOnZigZagPlayer').disabled = false;
    document.getElementById('MaltipleGameModeOnZigZagBanker').disabled = false;
    document.getElementById('MaltipleGameModeOnMVD').disabled = false;
    document.getElementById('PlayMethodInMultiMode').disabled = false;
    document.getElementById('MaltipleGameModeOnAll').disabled = false;
    document.getElementById('MaltipleGameModeOnSOW').disabled = false;
    document.getElementById('ProgressionDropDownId').disabled = false;




    totalWinGame = 0, totalLossGame = 0, totalPlayedHand = 0;
    totalSaveWinsInARow = 0, totalSaveLossesInARow = 0;
    lifetimeBalance = 0, largestBet = 0, averagebetlifetime = 0, averagewinlifetime = 0, averagelosslifetime = 0;
    winsintotal = 0, lossesintotal = 0, AverageWinPercentage = 0;

}

/* Show Parameter */
function showParameter() {
    if (statusOfShowParameter == 0) {
        document.getElementById('formDisplay').style.display = 'block';
        document.getElementById('form-title').style.display = 'none';
        document.getElementById('startExecutingId').style.display = 'none';
        document.getElementById('showParameterBtn').innerText = 'Hide Parameters';


        document.getElementById('IdStartNumber').disabled = true;
        document.getElementById('IdEndNumber').disabled = true;
        document.getElementById('PerUnitId').disabled = true;
        document.getElementById('TieModeId').disabled = true;
        document.getElementById('GameModeId').disabled = true;
        document.getElementById('StopProfitID').disabled = true;
        document.getElementById('StopLossID').disabled = true;
        document.getElementById('MaxBetID').disabled = true;
        document.getElementById('BrakeId').disabled = true;
        document.getElementById('MaxHandId').disabled = true;
        document.getElementById('AmountSelectionSystemId').disabled = true;
        document.getElementById('newAmountSelectionID').disabled = true;
        document.getElementById('AmountSelectionSystemInputTakenFrom').disabled = true;
        document.getElementById('MaltipleGameModeOnPlayer').disabled = true;
        document.getElementById('MaltipleGameModeOnBanker').disabled = true;

        document.getElementById('MaltipleGameModeOnZigZagPlayer').disabled = true;
        document.getElementById('MaltipleGameModeOnZigZagBanker').disabled = true;
        document.getElementById('MaltipleGameModeOnSOW').disabled = true;
        document.getElementById('MaltipleGameModeOnMVD').disabled = true;
        document.getElementById('PlayMethodInMultiMode').disabled = true;
        document.getElementById('MaltipleGameModeOnAll').disabled = true;
        document.getElementById('ProgressionDropDownId').disabled = true;


        statusOfShowParameter = 1;
    } else {
        document.getElementById('form-title').style.display = 'block';
        document.getElementById('startExecutingId').style.display = 'block';
        document.getElementById('formDisplay').style.display = 'none';
        document.getElementById('showParameterBtn').innerText = 'Show Parameters';
        statusOfShowParameter = 0;
    }

}
