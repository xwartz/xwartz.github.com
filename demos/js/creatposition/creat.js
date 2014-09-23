// 获取光标位置
	getInputCaretPosition = function(oField) {
	  var iCaretPos = 0;
	  // IE Support
	  if (document.selection) {
	    // Set focus on the element
	    oField.focus ();
	    // To get cursor position, get empty selection range
	    var oSel = document.selection.createRange ();
	    // Move selection start to 0 position
	    oSel.moveStart ('character', -oField.value.length);
	    // The caret position is selection length
	    iCaretPos = oSel.text.length;
	  }
	  // Firefox support
	  else if (oField.selectionStart || oField.selectionStart == '0')
	    iCaretPos = oField.selectionStart;
	  // Return results
	  return (iCaretPos);
	};

	// 设置光标位置
	setInputCaretPosition = function (oField,pos) {
		//Firefox support
	  if (oField.setSelectionRange) {
	    oField.focus();
	    oField.setSelectionRange(pos,pos);
	  }
	  // IE Support
	  else if (oField.createTextRange) {
	    var range = oField.createTextRange();
	    range.collapse(true);
	    range.moveEnd('character',pos);
	    range.moveStart('character',pos);
	    range.select();
	  }
	};
