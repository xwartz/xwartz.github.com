;(function () {

    var url = 'https://xwartz.github.io'

    var panel = {
        url: url,
        top: 140,
        left: 1000,
        width: 385,
        height: 689,
        focused: true,
        type: 'panel'
    }

    var xwartz = {

        // 创建弹出窗口
        createPanel: function() {
            chrome.windows.create(panel, function(win) {
                localStorage.setItem('win_popout', win.id)
            })
        },

        // 更新窗口
        updatePanel: function(id) {
            chrome.windows.update(id, {
                focused: true
            }, function () {
                if(chrome.runtime.lastError) {
                    localStorage.setItem('win_popout', '')
                    throw new Error(chrome.runtime.lastError.message)
                } else {
                    // update sucess
                    console.log('update sucess')
                }
            })
        },

        // 监听窗口变化
        listenWindow: function() {
            var _this = this
            chrome.windows.onRemoved.addListener(function(id) {
                var wid = localStorage.getItem('win_popout')
                if (wid && id === Number(wid)) {
                    localStorage.setItem('win_popout', '')
                }
            })
            chrome.browserAction.onClicked.addListener(function(tabs) {
                _this.popOut()
            })
        },

        popOut: function() {
            var id = localStorage.getItem('win_popout')
            id ? this.updatePanel(Number(id)) : this.createPanel()
        }

    }

    xwartz.listenWindow()

}())