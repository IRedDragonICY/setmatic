/*
 * This code creates two windows using the Electron framework: `win` and `splash`.
 * `win` is the main window and `splash` is a splash screen window.
 * `win` is created with a width of 800 pixels, a height of 700 pixels, and various other options such as `autoHideMenuBar`, `resizable`, `maximizable`, `roundedCorners`, and `webPreferences`.
 * `splash` is created with a width of 400 pixels, a height of 300 pixels, and various other options such as `transparent`, `frame`, `alwaysOnTop`, `resizable`, `maximizable`, `minimizable`, `fullscreenable`, `roundedCorners`, `autoHideMenuBar`, and `webPreferences`.
 * Both windows have `nativeWindowOpen` set to `false`.
 * The `splash` window loads a file called "splash.html" and the `win` window loads a file called "index.html".
 * When the `win` window finishes loading, it shows the window and destroys the `splash` window.
 * The `app.whenReady()` function waits for the app to be ready before calling the `createWindow` function.
 * The `app.on("activate")` function checks if there are any windows open and creates a new window if there are none.
 * The `app.on("window-all-closed")` function quits the app if the platform is not macOS.
 */

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