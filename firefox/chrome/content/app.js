/*
Firefox plugin for xwartz's Page.
author @xwartz<https://github.com/xwartz>

*/

var XUL = {

    init: function() {
        
        XUL._SRC = 'https://xwartz.github.com';
        XUL._INTER_FACE = null;
        XUL.initInterface();
    },

    initInterface: function() {
        var sidebarBox = document.getElementById("sidebar-box"),
            sidebarTitle = document.getElementById('sidebar-title');

        if(!sidebarBox.hidden && sidebarTitle.value.indexOf('xwartz') != -1) {
            XUL.toggleSidebar();

            /* for firefox restart*/
            XUL.toggleSidebar();
        }

        let firstRunPref = "extensions.xwartz_n.firstRunDone";
        
        if (!Application.prefs.getValue(firstRunPref, null)) {
            Application.prefs.setValue(firstRunPref, true);
            // addToolbarButton;
            XUL.installButton("nav-bar", "xwartz_sidebar_button");
            // The "addon-bar" is available since Firefox 4
            XUL.installButton("addon-bar", "xwartz_sidebar_button");
        }

    },

    /**
     * Installs the toolbar button with the given ID into the given
     * toolbar, if it is not already present in the document.
     *
     * @param {string} toolbarId The ID of the toolbar to install to.
     * @param {string} id The ID of the button to install.
     * @param {string} afterId The ID of the element to insert after. @optional
     */
    installButton: function (toolbarId, id, afterId) {
        if (!document.getElementById(id)) {
            var toolbar = document.getElementById(toolbarId);

            // If no afterId is given, then append the item to the toolbar
            var before = null;
            if (afterId) {
                let elem = document.getElementById(afterId);
                if (elem && elem.parentNode == toolbar)
                    before = elem.nextElementSibling;
            }

            toolbar.insertItem(id, before);
            toolbar.setAttribute("currentset", toolbar.currentSet);
            document.persist(toolbar.id, "currentset");

            if (toolbarId == "addon-bar")
                toolbar.collapsed = false;
        }
    },

    createMenu: function() {
        var menu = document.createElement('menupopup'),
            reload_label = document.createElement('menuitem');

        menu.setAttribute('id', 'x-menu');

        reload_label.setAttribute('label', '刷新');
        
        reload_label.addEventListener('click', function(ev) {
            XUL._INTER_FACE.reload();
        }, true);
        menu.appendChild(reload_label);

        document.getElementById("sidebar-box").appendChild(menu);
    },

    toggleSidebar: function() {
        var sidebarBox = document.getElementById("sidebar-box"),
            sidebarTitle = document.getElementById("sidebar-title"),
            sidebar = top.document.getElementById('sidebar');
        
        toggleSidebar('view_xwartz_sidebar');

        if(!sidebarBox.hidden) {
            if(!XUL._INTER_FACE) {
                var _INTER_FACE = XUL._INTER_FACE = sidebar.cloneNode(true);
                _INTER_FACE.id = 'xwartz_sidebar_holder';
                _INTER_FACE.setAttribute('src', XUL._SRC);
                _INTER_FACE.setAttribute('minwidth', 400);
                _INTER_FACE.setAttribute('type', 'content');
                _INTER_FACE.setAttribute('context', 'x-menu');
                XUL.createMenu();
                sidebarBox.appendChild(_INTER_FACE);
                sidebar.addEventListener("unload", XUL.hideSidebar, true);
            }
            XUL._INTER_FACE.hidden = false;
            sidebar.hidden = true;
        }
    },

    hideSidebar: function() {
        var sidebarTitle = document.getElementById("sidebar-title"),
            sidebar = top.document.getElementById('sidebar');

        if(XUL._INTER_FACE && sidebarTitle.value.indexOf('xwartz') == -1) {
            XUL._INTER_FACE.hidden = true;
            sidebar.hidden = false;
        }
    },

};

window.addEventListener("load", function() { 
    XUL.init(); 
}, false);
