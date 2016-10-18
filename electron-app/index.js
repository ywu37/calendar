
const electron = require("electron");
var fs = require('fs');
const data = require("../data/events.json");

const Menu = electron.Menu;

let mainWindow;

const constructorMethod = () => {
  // Module to control application life.
  const app = electron.app;

  // Module to create native browser window.
  const BrowserWindow = electron.BrowserWindow;

  // Keep a global reference of the window object, if you don't, the window will
  // be closed automatically when the JavaScript object is garbage collected.

  function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
      width: 1200, height: 900, minWidth: 310, minHeight: 380, webPreferences: {
        nodeIntegration: false
      }
    });
    const dialog = electron.dialog;
    var menu = Menu.buildFromTemplate([
      {
        label: 'Electron',
        submenu: [
          {
            label: 'Prefs',
            click: function () {

            }
          },
        ]
      },
      {
        label: 'Modes',
        submenu: [
          {
            label: 'Change to tablet',
            click: function () {
              mainWindow.setSize(1000, 800);
            }
          },
          {
            label: 'Change to Desktop',
            click: function () {
              mainWindow.setSize(1200, 1001);
            }
          },
          {
            label: 'Change to Mobile Phone',
            click: function () {
              mainWindow.setSize(400, 500);
            }
          }
        ]
      },
      {
        label: 'File',
        submenu: [
          {
            label: 'Save Calendar',
            click: function () {

              dialog.showSaveDialog({
                filters: [

                  { name: 'calendar', extensions: ['json'] }

                ]
              }, function (fileName) {
                if (fileName === undefined) {
                  dialog.showMessageBox({
                    message: "The file has not been saved! :-)",

                    buttons: ["OK"]
                  });

                  return;
                }
                // fileName is a string that contains the path and filename created in the save file dialog.  
                fs.writeFile(fileName, JSON.stringify(data), function (err) {
                  if (err) {
                    dialog.showErrorBox("File Save Error", err.message);

                  }

                  dialog.showMessageBox({
                    message: "The file has been saved! :-)",

                    buttons: ["OK"]
                  });
                });
              });
            }
          },
          {
            label: 'Upload Calendar',
            click: function () {
              dialog.showOpenDialog({
                filters: [

                  { name: 'calendar', extensions: ['json'] }

                ]
              }, function (fileNames) {

                if (fileNames === undefined) {
                  dialog.showMessageBox({
                    message: "The file has not been uploaded! :-)",

                    buttons: ["OK"]
                  });

                  return;
                }

                var fileName = fileNames[0];

                fs.readFile(fileName, 'utf-8', function (err, data) {

                  if (err) {
                    dialog.showErrorBox("File upload Error", err.message);

                  }
                  fs.writeFileSync('data/events.json', data);
                  dialog.showMessageBox({
                    message: "The file has been uploaded! :-)",

                    buttons: ["OK"]
                  });

                });

              });
            }
          },
        ]
      }

    ]);
    Menu.setApplicationMenu(menu);

    mainWindow.loadURL('http://localhost:3000/');
    //mainWindow.webContents.openDevTools();
    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      mainWindow = null;
    })
  }

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow)

  // Quit when all windows are closed.
  app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
      createWindow()
    }
  })

  // In this file you can include the rest of your app's specific main process
  // code. You can also put them in separate files and require them here.
};

module.exports = constructorMethod;