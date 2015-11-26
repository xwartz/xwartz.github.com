;(function () {

    var xwartz = {

        // 创建弹出窗口
        createPanel: function() {

            var url = 'https://xwartz.github.io'

            chrome.windows.create({
                url: url,
                top: 140,
                left: 1000,
                width: 385,
                height: 689,
                focused: true,
                type: 'panel'
            }, function(w) {
                localStorage.setItem('win_popout', w.id)
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

        listenWindow: function() {
            chrome.windows.onRemoved.addListener(function(id) {
                var oid = localStorage.getItem('win_popout')
                if (oid && id === Number(oid)) {
                    localStorage.setItem('win_popout', '')
                }
            })
            chrome.browserAction.onClicked.addListener(function(tabs) {
                xwartz.popOut()
            })
        },

        popOut: function() {
            var id = localStorage.getItem('win_popout')
            id ? xwartz.updatePanel(Number(id)) : xwartz.createPanel()
        }

    }

    xwartz.listenWindow()

}())