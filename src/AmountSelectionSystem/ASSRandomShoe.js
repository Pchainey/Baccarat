// Manage Variable 
excelRows = null;
statusOfRS = 1;
var statusOfShowParameter = 0, statusOfPlayAgain = 0;
statusIsFileUpload = 1;


// Random Play Fun 
function randomPlayFun() {

    document.getElementById('displayBtnForRandomShoe').innerHTML = `
    <button type="button" class="btn btn-dark" onclick="openForm4RandomShoe()" id="upload">Start Simulation</button>
    `;

}

// Select Xlsx File 
function selcetXlsxFileFun() {

    document.getElementById('displayBtnForRandomShoe').innerHTML = `
        <div id="removeDIV" class="uploadPart">
        <h5>Upload Xlsx File </h5>
        <input type="file" id="fileUpload" />
        <button type="button" class="btn btn-primary" onclick="Upload()" id="upload">Upload</button>
        <hr />
        </div>
    `;

    //document.getElementById('formDisplayInRS').style.display = 'block';

}

// Oprn Form For Simulation 
function openForm4RandomShoe() {

    document.getElementById('displayBtnForRandomShoe').style.display = "none";
    document.getElementById('selectPlayModeOfRandomShoe').style.display = "none";
    document.getElementById('formDisplayInRS').style.display = 'block';
    statusOfRSMode1 = 1;
    statusOfRSMode2 = 0;
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

// Start Simulation 
function startRandomShoe() {

    document.getElementById('Borad-list').style.display = 'block';
    document.getElementById('mainBackToHome').style.display = 'none';

    gameMode = document.getElementById('GameModeId').options[GameModeId.selectedIndex].innerHTML;
    stopLossNo = document.getElementById('StopLossID').value;
    maxBetNo = document.getElementById('MaxBetID').value;
    stopProfitNo = document.getElementById("StopProfitID").value;
    PerUnit = document.getElementById('PerUnitId').value;
    brakeNo = document.getElementById('BrakeId').value;
    maxHandNo = document.getElementById('MaxHandId').value;

    count4ShoesHand = 1;

    statusIsFileUpload = 1;
    declareVariable();

    if (statusOfRSMode1 == 1) {

        while (maxHandNo) {

            randomNo = Math.floor(Math.random() * 100) + 1;

            previewBet();
            if (stopGameInRS == 1) {
                break;
            }
            if (randomNo <= 40) {
                actualWin('actualWinPlayer');
            } else {
                actualWin('actualWinBanker');
            }
            maxHandNo--;

        }
    }
    else {

        if (statusOfPlayAgain == 0) {

            randomNo = Math.floor(Math.random() * (lastshoeNumberInXlsxFile - 0 + 1) + 0);

            startNumber = randomNo;
        } else {
            startNumber = document.getElementById('RSNo').value;
        }

        while (count4ShoesHand <= maxHandNo) {

            previewBet();
            if (stopGameInRS == 1) {
                break;
            }
            winnerInSimulation = excelRows[startNumber - 1]['Hand ' + count4ShoesHand];
            if (winnerInSimulation == 'P') actualWin('actualWinPlayer');
            else if (winnerInSimulation == 'B') actualWin('actualWinBanker');
            else if (winnerInSimulation == 'T') actualWin('tieWinner');
            else {
                break;
            }
            count4ShoesHand++;

        }

        document.getElementById('DisplayShoeNumber').style.display = 'block';

        document.getElementById('RSNo').value = startNumber;

    }

    document.getElementById('variableTable').style.display = 'block';
    document.getElementById('Borad-list').style.display = 'block';
    document.getElementById('formDisplayInRS').style.display = 'none';
    document.getElementById('back-home').style.display = 'block';
    document.getElementById('back-home').style.display = 'block';
}

// Next Simulation 
function nextSimulationRS() {

    clearTable();
    statusOfPlayAgain = 0;
    stopGameInRS = 0;
    document.getElementById('variableTable').style.display = 'none';
    document.getElementById('mainBackToHome').style.display = 'block';
    document.getElementById('DisplayShoeNumber').style.display = 'none';
    document.getElementById('formDisplayInRS').style.display = 'block';
    document.getElementById('form-title').style.display = 'block';
    document.getElementById('startExecutingId').style.display = 'block';
    document.getElementById('back-home').style.display = 'none';
    document.getElementById('Borad-list').style.display = 'none';
    document.getElementById('showParameterBtn').innerText = 'Show Parameters';

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
    document.getElementById('MaltipleGameModeOnAll').disabled = false;
    document.getElementById('PlayMethodInMultiMode').disabled = false;
    document.getElementById('MaltipleGameModeOnSOW').disabled = false;
    document.getElementById('MaltipleGameModeOnMVD').disabled = false;
    document.getElementById('ProgressionDropDownId').disabled = false;

}

// Show Parameters 
function showParameterRS() {

    if (statusOfShowParameter == 0) {
        document.getElementById('formDisplayInRS').style.display = 'block';
        document.getElementById('form-title').style.display = 'none';
        document.getElementById('startExecutingId').style.display = 'none';
        document.getElementById('showParameterBtn').innerText = 'Hide Parameters';

        if (statusOfRSMode1 == 1) {

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
            document.getElementById('MaltipleGameModeOnAll').disabled = true;
            document.getElementById('PlayMethodInMultiMode').disabled = true;
            document.getElementById('MaltipleGameModeOnSOW').disabled = true;
            document.getElementById('MaltipleGameModeOnMVD').disabled = true;
            document.getElementById('ProgressionDropDownId').disabled = true;



        } else {

        }

        statusOfShowParameter = 1;

    } else {

        document.getElementById('formDisplayInRS').style.display = 'none';
        document.getElementById('form-title').style.display = 'block';
        document.getElementById('startExecutingId').style.display = 'block';
        document.getElementById('showParameterBtn').innerText = 'Show Parameters';
        statusOfShowParameter = 0;


    }
}

// Play Again 
function playAgainInRS() {

    clearTable();
    stopGameInRS = 0;
    document.getElementById('showParameterBtn').innerText = 'Show Parameters';

    statusOfPlayAgain = 1;
    startRandomShoe();
}

// validty 4 Enter Shoe Number
function validityCheck4RSNO() {
    if (parseInt(document.getElementById('RSNo').value) <= 0) {
        document.getElementById('RSNo').value = 1;
    }
    else if (parseInt(document.getElementById('RSNo').value) >= lastshoeNumberInXlsxFile) {
        document.getElementById('RSNo').value = lastshoeNumberInXlsxFile;
    }

}

