// For define Var for Form //

var bet = document.getElementById("Bet");
var preview = document.getElementById("Preview");
var gameMode = document.getElementById('GameModeId').options[GameModeId.selectedIndex].innerHTML;
var stopLossNo = document.getElementById('StopLossID').value;
var maxBetNo = document.getElementById('MaxBetID').value;
var stopProfitNo = document.getElementById("StopProfitID").value;
var PerUnit = document.getElementById('PerUnitId').value;
var brakeNo = document.getElementById('BrakeId').value;
var maxHandNo = document.getElementById('MaxHandId').value;

// Amount Selection 
var tempAmountSelection, amountSelection = [];
var listOFWinnerTOresetData = [], winnerInSimulation = null;

// Game 
var Borad = [];
var actualWinner, tieWin = 0, TotalTieWin = 0;
var noOfBanker = 0, noOfPlayer = 0, hand = 0;
var statusIsFileUpload = 0, statusOfRS = 0, statusOfVariableTableShow = 0;
var tieMode = 0, comission4Banker = 95; // ****
var statusOfRSMode1 = 0, statusOfRSMode2 = 0;
var excelRows, startNumber, count4ShoesHand;
var whenTieModeOn = [];
var isPositiveProgression = 0 ;
var displayPreview = 1;

// Var For Player 
var totalBetAmtPlayer, betUnitPlayer, maxBetPlayer;
var BetOnTiePlayer = 0, netProfitPlayer = 0, betUnitPlayer = 0;
var balancePlayer = 0, tieAmtPlayer = 0, winPlayer = 0, TotalTieWinPlayer = 0;
var WholeWinUnitPlayer = 0, tieUnitPlayer = 0, maxContiuneWinPlayer = 0, maxContiuneLossPlayer = 0;
var saveMaxContiuneWinPlayer = 0, brakeCountPlayer = 0, saveMaxBalancePlayer = 0;
var WholeLossUnitPlayer = 0, saveWinsAsPlayerPlayer = 0, saveMaxContiuneLossPlayer = 0;
var AmountSelectionIndexPlayer = 0, previewBetUnitPlayerWin = 0, previewBetUnitPlayerLoss = 0;
var BrakeModeOnInPlayPlayer = 0 , WholeBetUnitPlayer = 0 ;
var saveWinsAsBankerP = 0 ;


// Var For Banker 
var totalBetAmtBanker, betUnitBanker, maxBetBanker;
var BetOnTieBanker = 0, netProfitBanker = 0, betUnitBanker = 0;
var balanceBanker = 0, tieAmtBanker = 0, winBanker = 0, TotalTieWinBanker = 0;
var WholeWinUnitBanker = 0, tieUnitBanker = 0, maxContiuneWinBanker = 0, maxContiuneLossBanker = 0;
var saveMaxContiuneWinBanker = 0, brakeCountBanker = 0, saveMaxBalanceBanker = 0;
var WholeLossUnitBanker = 0, saveWinsAsPlayerBanker = 0, saveMaxContiuneLossBanker = 0;
var AmountSelectionIndexBanker = 0, previewBetUnitBankerWin = 0, previewBetUnitBankerLoss = 0;
var BrakeModeOnInPlayBanker = 0 , WholeBetUnitBanker = 0 ;
var saveWinsAsBankerB = 0 ;



// var For Differential
var totalBetAmtDifferential, betOnDifferential, maxBetDifferential;
var BetOnTieDifferential = 0, netProfitDifferential = 0, betUnitDifferential = 0;
var balanceDifferential = 0, tieAmtDifferential = 0, winDifferential = 0, TotalTieWinDifferential = 0;
var WholeWinUnitDifferential = 0, tieUnitDifferential = 0, maxContiuneWinDifferential = 0, maxContiuneLossDifferential = 0;
var saveMaxContiuneWinDifferential = 0, brakeCountDifferential = 0, saveMaxBalanceDifferential = 0;
var WholeLossUnitDifferential = 0, saveWinsAsPlayerDifferential = 0, saveMaxContiuneLossDifferential = 0;
var AmountSelectionIndexDifferential = 0, previewBetUnitDifferentialWin = 0, previewBetUnitDifferentialLoss = 0;
var previewBetUnitDifferentialWin = 0, previewBetOnDifferentialWin = null;
var previewBetUnitDifferentialLoss = 0, previewBetOnDifferentialtLoss = null;
var BrakeModeOnInPlayDifferential = 0 ;
var saveWinsAsBankerDiff = 0 ;

// Var For Zig Zag Player First 
var totalBetAmtZigZagPlayer , betUnitZigZagPlayer, maxBetZigZagPlayer , betOnZigZagPlayer = 'Player';
var BetOnTieZigZagPlayer = 0, netProfitZigZagPlayer = 0, betUnitZigZagPlayer = 0;
var balanceZigZagPlayer = 0, tieAmtZigZagPlayer = 0, winZigZagPlayer = 0, TotalTieWinZigZagPlayer = 0;
var WholeWinUnitZigZagPlayer = 0, tieUnitZigZagPlayer = 0, maxContiuneWinZigZagPlayer = 0, maxContiuneLossZigZagPlayer = 0;
var saveMaxContiuneWinZigZagPlayer = 0, brakeCountZigZagPlayer = 0, saveMaxBalanceZigZagPlayer = 0;
var WholeLossUnitZigZagPlayer = 0, saveWinsAsZigZagPlayerPlayer = 0, saveMaxContiuneLossZigZagPlayer = 0;
var AmountSelectionIndexZigZagPlayer = 0, previewBetUnitZigZagPlayerWin = 0, previewBetUnitZigZagPlayerLoss = 0;
var BrakeModeOnInPlayZigZagPlayer = 0 , WholeBetUnitZigZagPlayer = 0 ;
var previewBetOnZigZagPlayerWin = 'Banker';
var saveWinsAsBankerZigZagPlayer = 0 ;

//  Var For Zig Zag Banker First 
var totalBetAmtZigZagBanker , betUnitZigZagBanker, maxBetZigZagBanker , betOnZigZagBanker = 'Banker';
var BetOnTieZigZagBanker = 0, netProfitZigZagBanker = 0, betUnitZigZagBanker = 0;
var balanceZigZagBanker = 0, tieAmtZigZagBanker = 0, winZigZagBanker = 0, TotalTieWinZigZagBanker = 0;
var WholeWinUnitZigZagBanker = 0, tieUnitZigZagBanker = 0, maxContiuneWinZigZagBanker = 0, maxContiuneLossZigZagBanker = 0;
var saveMaxContiuneWinZigZagBanker = 0, brakeCountZigZagBanker = 0, saveMaxBalanceZigZagBanker = 0;
var WholeLossUnitZigZagBanker = 0, saveWinsAsZigZagBankerPlayer = 0, saveMaxContiuneLossZigZagBanker = 0;
var AmountSelectionIndexZigZagBanker = 0, previewBetUnitZigZagBankerWin = 0, previewBetUnitZigZagBankerLoss = 0;
var BrakeModeOnInPlayZigZagBanker = 0 , WholeBetUnitZigZagBanker = 0 ;
var saveWinsAsBankerZigZagBanker = 0 ;

// Var For SOW 
var totalBetAmtSOW , betUnitSOW, maxBetSOW = 0 ;
var BetOnTieSOW = 0, netProfitSOW = 0,  betUnitSOW = 0;
var balanceSOW = 0, tieAmtSOW = 0, winSOW = 0, TotalTieWinSOW = 0;
var WholeWinUnitSOW = 0, tieUnitSOW = 0, maxContiuneWinSOW = 0, maxContiuneLossSOW = 0;
var saveMaxContiuneWinSOW = 0, brakeCountSOW = 0, saveMaxBalanceSOW = 0;
var WholeLossUnitSOW = 0, saveWinsAsSOWSOW = 0, saveMaxContiuneLossSOW = 0;
var AmountSelectionIndexSOW = 0, previewBetUnitSOWWin = 0, previewBetUnitSOWLoss = 0;
var BrakeModeOnInPlaySOW = 0 , WholeBetUnitSOW = 0 ;
var saveWinsAsSOWPlayer = 0 ;
var sameAsWinSOW = null , oppositeOfWinSOW = null ; 
var oppositeOfWinActualWinSOW = -1 , sameAsWinActualWinSOW = -1 ;
var betOnWhichPartySOW = -1 ;
var vaildLengthToStartGame = 2  , statusOfSOWGame = 0 ;
var previewBetOnSOWWin = null , previewBetOnSOWLoss = null ;
var saveWinsAsBankerSOW = 0 ;

// MVD
var betOnMVD = "" , startGameMVD = 0  , setBanker1stTime = 0 ;
var betUnitMVD = -1 ;
var totalBetAmtMVD , maxBetMVD = 0;
var BetOnTieMVD = 0, netProfitMVD = 0 ;
var balanceMVD = 0, tieAmtMVD = 0, winMVD = 0, TotalTieWinMVD = 0;
var WholeWinUnitMVD = 0, tieUnitMVD = 0, maxContiuneWinMVD = 0, maxContiuneLossMVD = 0;
var saveMaxContiuneWinMVD = 0, brakeCountMVD = 0, saveMaxBalanceMVD = 0;
var WholeLossUnitMVD = 0, saveWinsAsMVDPlayer = 0, saveMaxContiuneLossMVD = 0;
var noOfWinsRowInMVD = 0, previewBetUnitMVDWin = 0, previewBetUnitMVDLoss = 0;
var BrakeModeOnInPlayMVD = 0 , WholeBetUnitMVD = 0 ;
var previewBetOnMVDWin , previewBetOnMVDLoss ;
var AmountSelectionIndexMVD = 0 ;
var saveWinsAsBankerMVD = 0 ;

// Addition Function 
var maxHnadNotices = 0, stopGameInRS = 0, tempWinnerToSaveWinnerName = null;
var stopLossNotices = 0, stopLossIN = null, netStopLoss = 0;
var maxBetNotices = 0, maxBetIN = null, netMaxBet = 0;
var stopProfitNotices = 0, stopProfitIN = null, netStopProfit = 0;
var tempNet = 0, statusOfPlayAgain = 0;

// Baccarat Borad //
var lastWinner = null;
var i = 0, j = 0;
var baccaratBoradTable = new Array(6);
for (i = 0; i < baccaratBoradTable.length; i++) {
  baccaratBoradTable[i] = new Array(100);
  for (j = 0; j < baccaratBoradTable[i].length; j++) {
    baccaratBoradTable[i][j] = {
      "winner": 'nathing',
      "color": 'Black',
      "filled": 0,
      "hand": -1,
      "lastWinner": null
    }
  }
}

// simualtion //

var lastshoeNumberInXlsxFile;
var simulationShoe = [], saveSimulationResult = [];


// Multi Game Mode 

var selectedGameModeInMultipleMode = [];
selectedGameModeInMultipleMode['Player'] = 1 ;
selectedGameModeInMultipleMode['SOW'] = 1 ;
selectedGameModeInMultipleMode['Banker'] = 1 ;
selectedGameModeInMultipleMode['ZigZagPlayer'] = 1 ;
selectedGameModeInMultipleMode['ZigZagBanker'] = 1 ;
selectedGameModeInMultipleMode['All'] = 1 ;
selectedGameModeInMultipleMode['MVD'] = 1 ;

selectedMethodType = "Differential";
var brakeCountMultiMode = 0 ;

var multipleBetUnitOnPlayer = 0 , multipleBetUnitOnBanker = 0 ;
var multipleBetOnTie = 0 , multipleBetUnitOnTie = 0 , multipleBetAmountOnTie = 0 ;
var multipleBetOnPlayer = 0 , multipleBetOnBanker = 0  ;
var TotalBetAmountInMultipleMode = 0 , balanceMultipleMode = 0  ;
var BoradForMultiMode = [];
var previewBetUnitBankerLossINMM = 0 ;
var previewBetUnitBankerWinINMM = 0 ;
var previewBetOnPlayerWin = 0 , previewBetOnBankerWin = 0 ;
var previewBetOnPlayerLoss = 0 , previewBetOnBankerLoss = 0 ;
var previewBetUnitPlayerWinINMM = 0 ;
var previewBetUnitPlayerLossINMM = 0 ;
var netProfitMultiMode = 0 ;
var listOfWinner = [];
var listOfSelectedGameMode = [];
var whenTieModeOn = []; 

var wholeBetUnitINMM = 0 , WholeWinUnitINMM = 0 ,  WholeLossUnitINMM = 0  ; 
var saveMaxContiuneWinINMM = 0 , saveMaxContiuneLossIMM = 0 ;
var maxContiuneWinINMM = 0 , maxContiuneLossINMM = 0 ;
var saveMaxBetINMM = 0 , saveMaxBalanceINMM = 0 ;
var winASPlayerINMM = 0 , winASBankerINMM = 0 ;

// Dummy data in multi mode
DummymultipleBetOnPlayer = 0 , DummymultipleBetOnBanker = 0 ;
DummymultipleBetUnitOnPlayer = 0 , DummymultipleBetUnitOnBanker = 0 ;

var displayRugth = 0 ;


// cal indiviual mode 
var indiviualPlayerBalanceInMM = 0 , indiviualBankerBalanceInMM = 0 ; 
var indiviualMVDBalanceInMM = 0 , indiviualSOWBalanceInMM = 0 ; 
var indiviualZigZagPlayerBalanceInMM = 0 , indiviualZigZagBankerBalanceInMM = 0 ; 
var totalBalanceInMMInPlayer = 0 , totalBalanceInMMInBanker = 0 ;
var totalBalanceInMMInMVD = 0 , totalBalanceInMMInSOW = 0 ;
var totalBalanceInMMInZigZagPlayer = 0 , totalBalanceInMMInZigZagBanker = 0 ;


// change Preferences
var IschangePreferencesOn = 0 ;
var storeMainBorad ;
var storeIsVariableShow , storebrakeNo ;
var storePlayMethodINMM , storeBoradForMultiMode , storeSelectedText, storePlayType , storeTieMode;
var storePlayMethodINMM ;
var storeSelectedGameModeInMultipleMode = [];
storeSelectedGameModeInMultipleMode['Player'] = 1 ;
storeSelectedGameModeInMultipleMode['SOW'] = 1 ;
storeSelectedGameModeInMultipleMode['Banker'] = 1 ;
storeSelectedGameModeInMultipleMode['ZigZagPlayer'] = 1 ;
storeSelectedGameModeInMultipleMode['ZigZagBanker'] = 1 ;
storeSelectedGameModeInMultipleMode['All'] = 1 ;
storeSelectedGameModeInMultipleMode['MVD'] = 1 ;
var IsTakeTieFormOldMOde = 0 ;
var storeOldTieHands = [ ] ;
var storelistOfSelectedGameMode = [] ;
var storeIsPositiveProgression ;