// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const url = require('url')
const XLSX = require('xlsx')

// var XLSX = require("xlsx")
// var dataPathExcel = "Bacarrat_Sample_Shoes.xlsx"
// var wb = XLSX.readFile(dataPathExcel);
// var sheetName = wb.SheetNames[0] 
// var sheetValue = wb.Sheets[sheetName];


var mainWindow;

// //console.log(gb);
// let exceldata = XLSX.utils.sheet_to_json(sheetValue);
// console.log(exceldata) ;

const createWindow = () => {
    // Create the browser window.

    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 800,
        minHeight: 800,
        show: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            enableRemoteModule: false,
            nodeIntegrationInWorker: false
        }
    })

    // and load the index.html of the app.

    mainWindow.loadFile('index.html');

    ipcMain.on("button-clicked", (event, data) =>{
        console.log(data);
        var dataPathExcel = "demo.xlsx"
        var wb = XLSX.readFile(dataPathExcel);
        var sheetName = wb.SheetNames[0]
        var sheetValue = wb.Sheets[sheetName];
        let exceldata = XLSX.utils.sheet_to_json(sheetValue);
        console.log(exceldata);
        event.reply('asynchronous-reply', 'pong')
    } )

   // mainWindow.webContents.openDevTools()
    // ipcMain.on("readXlsxFile", (event, data) => {
    //     var dataPathExcel = "demo.xlsx"
    // var wb = XLSX.readFile(dataPathExcel);
    // var sheetName = wb.SheetNames[0]
    // var sheetValue = wb.Sheets[sheetName];
    // let exceldata = XLSX.utils.sheet_to_json(sheetValue);
    // console.log(exceldata);
    // event.reply('asynchronous-reply', 'pong')
    // mainWindow.webContents.send('xlsxCount', exceldata)


    // })



    //Open the DevTools.
    // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

    
})

app.on(('ready', mainWindow) , () => {
   
    
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.






// async function handleFileOpen() {

//     return new Promise((resolve, reject) => {
//         var dataPathExcel = "demo.xlsx"
//     var wb = XLSX.readFile(dataPathExcel);
//     var sheetName = wb.SheetNames[0]
//     var sheetValue = wb.Sheets[sheetName];
//     let exceldata = XLSX.utils.sheet_to_json(sheetValue);
//     console.log(exceldata);

//     resolve (exceldata) ;
//     })


// }

