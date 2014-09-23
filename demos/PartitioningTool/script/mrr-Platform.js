/// <reference path="js/jquery-1.2.6.js" />
/// <reference path="js/MicrosoftAjax.js" />

var epsilon = 0.0000000000001;

; (function($) {
    $.DBL_EQUAL = function(a, b) {
        if (Math.abs(a - b) < epsilon)
            return true;
        else
            return false;
    }
})(jQuery);

; (function($) {
    $.log = function(content) { $("#mrr-logwindow").append(content + "<br />"); };
    $.clearlog = function() { $("#mrr-logwindow").html(''); };
    $.sortNumber = function sortNumber(a, b) {
//        if (Math.abs(a - b) < epsilon)
//            return 0;
//        else
            return a - b;
    };
    $.sortTimes_byTime = function sortTimes_byTime(a, b) { return $.sortNumber(a[0], b[0]); };
    $.sortTasksInFlow_byDeadline = function sortTasksInFlow_byDeadline(a, b) { return $.sortNumber(a.D, b.D); };
    $.sortTasks_byId = function(a,b){
        if(a.id.length < b.id.length) //if a is short than b, then its index is smaller
            return -1;
        else if(a.id.length > b.id.length)
            return 1;
        else
            return ( (a.id < b.id)?-1:1); //compare two string with same length
    }
})(jQuery);

Array.getById = function(array, id) {
    for (var i = 0; i < array.length; i++) {
        if (array[i].id == id) //the array element need a member id
            return array[i];
    }
};

; (function($) {
    $.test_coercion = function() {
        var i = 0;
        var j;
        var k = null;
        var l = new Array();
        var m = new Array();
        m[0] = 1;
        m[1] = 0;
        if (!i || !j || !k || !l || !m || !m[0] || ![2]) {
            alert("true, true, true, false, false, false, true");
        }
    }
})(jQuery);

