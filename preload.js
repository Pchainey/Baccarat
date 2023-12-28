// preload.js

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }
  
    for (const dependency of ['chrome', 'node', 'electron']) {
      replaceText(`${dependency}-version`, process.versions[dependency])
    }
  })

  const XLSX = require('xlsx')

  // Preload script
const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("electron", {
    send: (channel, payload) => ipcRenderer.send(channel, payload),
   // readXlsx : () => ipcRenderer.invoke('openXlsxFile') ,
    
    receive: (callback) => ipcRenderer.on('xlsxCount', callback)


})