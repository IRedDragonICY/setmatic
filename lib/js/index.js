const path = require("path");
const { app, BrowserWindow } = require("electron");

let splash;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 700,
    autoHideMenuBar: true,
    icon: "./lib/img/icon.png",
    show: false, 
    resizable: false,
    maximizable: false,
    roundedCorners: true,
    webPreferences: {
      preload: path.join(__dirname, "./lib/js/preload.js"),
      nativeWindowOpen: false
    },
  });

  splash = new BrowserWindow({
    width: 400,
    height: 300,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    resizable: false,
    maximizable: false,
    minimizable: false,
    fullscreenable: false,
    transparent: true,
    frame: false,
    roundedCorners: true, 
    autoHideMenuBar: true,

    webPreferences: {
      nodeIntegration: true, 
      nativeWindowOpen: false
    },
  });
  
  splash.loadFile("splash.html");
  win.loadFile("index.html");

  win.webContents.on("did-finish-load", () => {
    win.show();
    splash.destroy();
  });
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});