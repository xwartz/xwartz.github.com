'use strict'

const remote = require('remote')
const Tray = remote.require('tray')
const Menu = remote.require('menu')
const path = require('path')


let trayIcon;
if(!trayIcon) {
    trayIcon = new Tray(path.join(__dirname, '/img/icon_16.png'))
}


const trayMenuTemplate = [{
    label: 'About'
}]

var trayMenu = Menu.buildFromTemplate(trayMenuTemplate)
trayIcon.setContextMenu(trayMenu)