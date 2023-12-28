
excelRows = null;
statusOfRS = 1;

var statusOfShowParameter = 0;
function randomPlayFun() {

    document.getElementById('displayBtnForRandomShoe').innerHTML = `
    <button type="button" class="btn btn-dark" onclick="openForm4RandomShoe()" id="upload">Start Simulation</button>
    `;

}

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

function openForm4RandomShoe() {

    document.getElementById('displayBtnForRandomShoe').style.display = "none";
    document.getElementById('selectPlayModeOfRandomShoe').style.display = "none";
    document.getElementById('formDisplayInRS').style.display = 'block';
    statusOfRSMode1 = 1;
    statusOfRSMode2 = 0;
}

function startRandomShoe() {

    document.getElementById('Borad-list').style.display = 'block';
    document.getElementById('mainBackToHome').style.display = 'none';


    selectedText = bettype.options[bettype.selectedIndex].innerHTML;
    PerUnit = document.getElementById('perUnit').value;
    stopLoss1 = -1 * document.getElementById('estopLoss1').value;
    stopProfit = document.getElementById("estopProfit").value;
    stopLoss = document.getElementById('estopLoss').value;
    maxHand = document.getElementById('maxHandId').value;

    var count4ShoesHand = 1;

    statusIsFileUpload = 1;
    declareVariable();

    if (statusOfRSMode1 == 1) {

        while (maxHand) {

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
            maxHand--;

        }
    }
    else {

        if (statusOfPlayAgain == 0) {

            randomNo = Math.floor(Math.random() * (lastshoeNumberInXlsxFile - 0 + 1) + 0);

            startNumber = randomNo;
        } else {
            startNumber = document.getElementById('RSNo').value;
        }

        while (count4ShoesHand <= maxHand) {

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

    document.getElementById('perUnit').disabled = false;
    document.getElementById('esingleP').disabled = false;
    document.getElementById('flexCheckDefault').disabled = false;
    document.getElementById('bettype').disabled = false;
    document.getElementById('estopProfit').disabled = false;
    document.getElementById('estopLoss').disabled = false;
    document.getElementById('estopLoss1').disabled = false;
    document.getElementById('brakeId').disabled = false;
    document.getElementById('maxHandId').disabled = false;

    document.getElementById('MaltipleGameModeOnPlayer').disabled = false;
    document.getElementById('MaltipleGameModeOnBanker').disabled = false;
    document.getElementById('MaltipleGameModeOnDifferential').disabled = false;
    document.getElementById('MaltipleGameModeOnTarget').disabled = false;
    document.getElementById('MaltipleGameModeOnAll').disabled = false;
    document.getElementById('PlayMethodInMultiMode').disabled = false;
    document.getElementById('MaltipleGameModeOnZigZagBanker').disabled = false;
    document.getElementById('MaltipleGameModeOnZigZagPlayer').disabled = false;
    document.getElementById('MaltipleGameModeOnSOW').disabled = false;
    document.getElementById('MaltipleGameModeOnMVD').disabled = false;
    document.getElementById('PlayTypeId').disabled = false;





}

function showParameterRS() {

    if (statusOfShowParameter == 0) {
        document.getElementById('formDisplayInRS').style.display = 'block';
        document.getElementById('form-title').style.display = 'none';
        document.getElementById('startExecutingId').style.display = 'none';
        document.getElementById('showParameterBtn').innerText = 'Hide Parameters';

        if (statusOfRSMode1 == 1) {

            document.getElementById('perUnit').disabled = true;
            document.getElementById('esingleP').disabled = true;
            document.getElementById('flexCheckDefault').disabled = true;
            document.getElementById('bettype').disabled = true;
            document.getElementById('estopProfit').disabled = true;
            document.getElementById('estopLoss').disabled = true;
            document.getElementById('estopLoss1').disabled = true;
            document.getElementById('brakeId').disabled = true;
            document.getElementById('maxHandId').disabled = true;

            document.getElementById('MaltipleGameModeOnPlayer').disabled = true;
            document.getElementById('MaltipleGameModeOnBanker').disabled = true;
            document.getElementById('MaltipleGameModeOnDifferential').disabled = true;
            document.getElementById('MaltipleGameModeOnTarget').disabled = true;
            document.getElementById('MaltipleGameModeOnAll').disabled = true;
            document.getElementById('MaltipleGameModeOnZigZagBanker').disabled = true;
            document.getElementById('MaltipleGameModeOnZigZagPlayer').disabled = true;
            document.getElementById('MaltipleGameModeOnSOW').disabled = true;
            document.getElementById('MaltipleGameModeOnMVD').disabled = true;

            document.getElementById('PlayMethodInMultiMode').disabled = true;
            document.getElementById('PlayTypeId').disabled = true;





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


function playAgainInRS() {

    clearTable();
    stopGameInRS = 0;
    document.getElementById('showParameterBtn').innerText = 'Show Parameters';

    statusOfPlayAgain = 1;
    startRandomShoe();
}

function validityCheck4RSNO() {
    if (parseInt(document.getElementById('RSNo').value) <= 0) {
        document.getElementById('RSNo').value = 1;
    }
    else if (parseInt(document.getElementById('RSNo').value) >= lastshoeNumberInXlsxFile) {
        document.getElementById('RSNo').value = lastshoeNumberInXlsxFile;
    }

}
