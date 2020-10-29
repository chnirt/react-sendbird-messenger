const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const isDev = require('electron-is-dev')

let mainWindow

const image = electron.nativeImage.createFromPath(
    app.getAppPath() + isDev ? 'public/icon.png' : './icon.png'
)
app.dock.setIcon(image)

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 414,
        height: 816,
        icon: __dirname + '/icon.png',
    })
    mainWindow.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, '../build/index.html')}`
    )
    mainWindow.on('closed', () => (mainWindow = null))
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})
