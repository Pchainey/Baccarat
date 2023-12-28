var bet = document.getElementById("bet");
var preview = document.getElementById("preview") ;

var actualWinner = null , TotalTieWin = 0 , comission4B = 95 , maxHnadNotices = 0 ;
var netProfitP = 0 , netProfitB = 0 , netProfitD = 0;
var noOfBanker = 0 , noOfPlayer = 0;
var betUnit = 1 , betUnitP = 1, betUnitB  = 1 , betUnitD = 1;
var Borad = [] ;
var win = 0 , winB = 0 , winP = 0 , winD = 0;
var selectedText = document.getElementById('bettype').options[bettype.selectedIndex].innerHTML , betonDiff ;

var  stopProfitNotices = 0 , netStopProfit;
var stopLossNotices = 0 , netStopLoss  , netStopLoss1 , stopLossNotices1 = 0;
var tempNet = 0 ;
var stopProfitIN = null , stopLossIN = null , stopLossIN1 = null;
var whereSingleP = [] , whereSingleB = [];
var stopLoss1 = document.getElementById('estopLoss1').value; 
var stopLoss =   document.getElementById('estopLoss').value; 
var stopProfit = document.getElementById("estopProfit").value ;
var singlePlayer = document.getElementById('esingleP').value; 
var PerUnit = document.getElementById('perUnit').value;
var brakeValue = document.getElementById('brakeId').value;
var brakeCountB = 0 , brakeCountP = 0 , brakeCountDiff = 0 , brakeCountTarget = 0;

var checkBincre = 0 , checkPincre = 0 , singlePNo = 0 , setBet0 = 0 ;
var singleBanker = singlePlayer ,  singleBNo = 0 , setBet0B = 0 ;

var totalBetUnitP = 1 , totalBetUnitB = 1 , totalBetUnitD = 1; 
var balanceB = 0 , balanceD = 0  , balanceP = 0;

var Play2Mode = 0 , Play3Mode = 0 ;
var Play4Mode = 0 , Play5Mode = 0 ;
var tieMode = 0 , BetOnTieP = 0 , BetOnTieB = 0 , BetOnTieD = 0  ;
var tieUnitP = 0 , tieUnitB = 0 , tieUnitD = 0 ;
var lastSingleWin = singlePlayer;
var totalBetAmtP = 0 , totalBetAmtB = 0 , totalBetAmtD = 0;
var tieAmtP = 0 , tieAmtB = 0 , tieAmtD = 0 ;
var tieWin = 0 , TotalTieWinB = 0 , TotalTieWinP = 0  ;
var lastWinner = null ;

var i = 0 , j =0 ;
var baccaratBoradTable =  new Array(6);
for(i = 0 ; i < baccaratBoradTable.length  ; i++){
  baccaratBoradTable[i] = new Array(100) ;
  for(j = 0 ; j < baccaratBoradTable[i].length ; j++){
    baccaratBoradTable[i][j] = {
      "winner" : 'nathing' ,
      "color" : 'Black' ,
      "filled" : 0 ,
      "hand" : -1 ,
      "lastWinner" : null 
    }
  }
}

var displayPreview = 1 ;

var saveWinsAsBankerP = 0 , saveWinsAsBankerB = 0 ,  saveWinsAsBankerDiff = 0  ;

// Target Mode //
var betonTarget = null , totalBetAmtTarget = 0 ;
var betUnitTargetB = 1 , betUnitTargetP = 0 ;
var netProfitTargetB = 0 , netProfitTargetP = 0 ;
var balanceTargetB = 0 , balanceTargetP = 0 ;
var winTargetB = 0 , winTargetP = 0 ; 
var previewBetOnTargetWin , previewBetOnTargetLoss ;
var previewBetUnitTargetWin , previewBetUnitTargetLoss ;
var TotalbalanceTarget = 0  ;
var BetOnTieTarget = 0 ,tieAmtTarget = 0 , tieUnitTarget = 0 ;
var TotalTieWinTargetB = 0  , TotalTieWinTargetP = 0  ;
var saveWinsAsBankerTarget = 0 ;

var previewBetUnitBankerLoss = 0 ;
var previewBetUnitBankerWin = 0 ;

var previewBetUnitPlayerWin = 0 ;
var previewBetUnitPlayerLoss = 0 ;

// For display demo portion //
// var displayDemo = 1 ;
var demo = document.getElementById('demo');


// Start Simulation //
var statusIsFileUpload = 0 ;
var excelRows ; 
var count4ShoesHand = 0 ;
var winnerInSimulation ;
var maxHand = 100 ;
var maxBetP = 0 , WholeBetAmountP = PerUnit , WholeWinAmountP = 0 , WholeLossAmountP  = 0 , maxContiuneWinP = 0 , maxContiuneLossP = 0  ;
var maxBetB = 0 , WholeBetAmountB = PerUnit , WholeWinAmountB = 0 , WholeLossAmountB  = 0 , maxContiuneWinB = 0 , maxContiuneLossB =  0 ;
var maxBetD = 0 , WholeBetAmountD = PerUnit , WholeWinAmountD = 0 , WholeLossAmountD  = 0 , maxContiuneWinD = 0 , maxContiuneLossD =  0 ;
var maxBetTarget = 0 , WholeBetAmountTarget = PerUnit , WholeWinAmountTarget = 0 , WholeLossAmountTarget  = 0 , maxContiuneWinTarget = 0 , maxContiuneLossTarget =  0 ;
var tempWinner = null  , lastshoeNumberInXlsxFile = 0 ;
var saveSimulationResult = [];

// Shoe Table //
var simulationShoe = [] ;
var statusOfGameResult , count4Shoes = 0 ; 

// Random Shoe //
var randomNo , statusOfRSMode1 = 0 , statusOfRSMode2 = 0  ; 
var stopGameInRS = 0  , statusOfRS = 0 ;
 

var statusOfPlayAgain = 0 ;
var saveMaxBalanceP = 0 , saveMaxBalanceTarget = 0 , saveMaxBalanceDiff = 0 , saveMaxBalanceB = 0 ;
var saveWinsAsPlayerP = 0 , saveWinsAsPlayerDiff = 0 , saveWinsAsPlayerB = 0 , saveWinsAsPlayerTarget = 0 ;

var statusOfVariableTableShow = 0 ;

// Multiple Game Mode //
var selectedGameModeInMultipleMode = [];
selectedGameModeInMultipleMode['Player'] = 1 ;
selectedGameModeInMultipleMode['SOW'] = 1 ;
selectedGameModeInMultipleMode['Banker'] = 1 ;
selectedGameModeInMultipleMode['Differential'] = 1 ;
selectedGameModeInMultipleMode['Target'] = 1 ;
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
var listOfWinner = [] , whenPlay2ndOn = [] , whenPlay3rdOn =  [];
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

// Var For SOW 
var totalBetAmtSOW = 0 , betUnitSOW = 0 , maxBetSOW = 0 ;
var BetOnTieSOW = 0, netProfitSOW = 0,  betUnitSOW = 0;
var balanceSOW = 0, tieAmtSOW = 0, winSOW = 0, TotalTieWinSOW = 0;
var WholeWinUnitSOW = 0, tieUnitSOW = 0, maxContiuneWinSOW = 0, maxContiuneLossSOW = 0;
var saveMaxContiuneWinSOW = 0, brakeCountSOW = 0, saveMaxBalanceSOW = 0;
var WholeLossUnitSOW = 0, saveWinsAsSOWSOW = 0, saveMaxContiuneLossSOW = 0;
var noOfWinsRowInSOW = 0, previewBetUnitSOWWin = 0, previewBetUnitSOWLoss = 0;
var BrakeModeOnInPlaySOW = 0 , WholeBetUnitSOW = 0 ;
var saveWinsAsSOWPlayer = 0 ;
var sameAsWinSOW = null , oppositeOfWinSOW = null ; 
var oppositeOfWinActualWinSOW = -1 , sameAsWinActualWinSOW = -1 ;
var betOnWhichPartySOW = -1 ;
var vaildLengthToStartGame = 2  , statusOfSOWGame = 0 ;
var previewBetOnSOWWin = null , previewBetOnSOWLoss = null 
var setBetSOW = 0 , saveWinsAsBankerSOW = 0 ;


// Var For Zig Zag Player First 
var totalBetAmtZigZagPlayer , betUnitZigZagPlayer, maxBetZigZagPlayer , betOnZigZagPlayer = 'Player';
var BetOnTieZigZagPlayer = 0, netProfitZigZagPlayer = 0, betUnitZigZagPlayer = 0;
var balanceZigZagPlayer = 0, tieAmtZigZagPlayer = 0, winZigZagPlayer = 0, TotalTieWinZigZagPlayer = 0;
var WholeWinUnitZigZagPlayer = 0, tieUnitZigZagPlayer = 0, maxContiuneWinZigZagPlayer = 0, maxContiuneLossZigZagPlayer = 0;
var saveMaxContiuneWinZigZagPlayer = 0, brakeCountZigZagPlayer = 0, saveMaxBalanceZigZagPlayer = 0;
var WholeLossUnitZigZagPlayer = 0, saveWinsAsZigZagPlayerPlayer = 0, saveMaxContiuneLossZigZagPlayer = 0;
var noOfWinsRowInZigZagPlayer = 0, previewBetUnitZigZagPlayerWin = 0, previewBetUnitZigZagPlayerLoss = 0;
var BrakeModeOnInPlayZigZagPlayer = 0 , WholeBetUnitZigZagPlayer = 0 ;
var previewBetOnZigZagPlayerWin = 'Banker' , saveWinsAsBankerZigZagPlayer = 0 ;

//  Var For Zig Zag Banker First 
var totalBetAmtZigZagBanker , betUnitZigZagBanker, maxBetZigZagBanker , betOnZigZagBanker = 'Banker';
var BetOnTieZigZagBanker = 0, netProfitZigZagBanker = 0, betUnitZigZagBanker = 0;
var balanceZigZagBanker = 0, tieAmtZigZagBanker = 0, winZigZagBanker = 0, TotalTieWinZigZagBanker = 0;
var WholeWinUnitZigZagBanker = 0, tieUnitZigZagBanker = 0, maxContiuneWinZigZagBanker = 0, maxContiuneLossZigZagBanker = 0;
var saveMaxContiuneWinZigZagBanker = 0, brakeCountZigZagBanker = 0, saveMaxBalanceZigZagBanker = 0;
var WholeLossUnitZigZagBanker = 0, saveWinsAsZigZagBankerPlayer = 0, saveMaxContiuneLossZigZagBanker = 0;
var noOfWinsRowInZigZagBanker = 0, previewBetUnitZigZagBankerWin = 0, previewBetUnitZigZagBankerLoss = 0;
var BrakeModeOnInPlayZigZagBanker = 0 , WholeBetUnitZigZagBanker = 0 , saveWinsAsBankerZigZagBanker = 0 ;

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
var setBet0MVD = 0 , singleMVDNo = 0 , saveWinsAsBankerMVD = 0  ;

var displayRugth = 0 ;



// cal indiviual mode 
var indiviualPlayerBalanceInMM = 0 , indiviualBankerBalanceInMM = 0 ; 
var indiviualDiffBalanceInMM = 0 , indiviualTargetBalanceInMM = 0 ; 
var indiviualMVDBalanceInMM = 0 , indiviualSOWBalanceInMM = 0 ; 
var indiviualZigZagPlayerBalanceInMM = 0 , indiviualZigZagBankerBalanceInMM = 0 ; 
var totalBalanceInMMInPlayer = 0 , totalBalanceInMMInBanker = 0 ;
var totalBalanceInMMInDiff = 0 , totalBalanceInMMInTarget = 0 ;
var totalBalanceInMMInMVD = 0 , totalBalanceInMMInSOW = 0 ;
var totalBalanceInMMInZigZagPlayer = 0 , totalBalanceInMMInZigZagBanker = 0 ;

// Dummy screen 
var IschangePreferencesOn = 0 ;
var storeMainBorad ;
var storeIsVariableShow , storeBrakeValue ;
var storePlayMethodINMM , storeBoradForMultiMode , storeSelectedText, storePlayType , storeTieMode;
var storePlayMethodINMM ;
var storeSelectedGameModeInMultipleMode = [];
storeSelectedGameModeInMultipleMode['Player'] = 1 ;
storeSelectedGameModeInMultipleMode['SOW'] = 1 ;
storeSelectedGameModeInMultipleMode['Banker'] = 1 ;
storeSelectedGameModeInMultipleMode['Differential'] = 1 ;
storeSelectedGameModeInMultipleMode['Target'] = 1 ;
storeSelectedGameModeInMultipleMode['ZigZagPlayer'] = 1 ;
storeSelectedGameModeInMultipleMode['ZigZagBanker'] = 1 ;
storeSelectedGameModeInMultipleMode['All'] = 1 ;
storeSelectedGameModeInMultipleMode['MVD'] = 1 ;
var IsTakeTieFormOldMOde = 0 ;
var storeOldTieHands = [ ] ;
var storelistOfSelectedGameMode = [] ;
var storeMaxSingleWin ;