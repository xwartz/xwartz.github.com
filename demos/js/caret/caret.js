var settings = {
  isIE: navigator.userAgent.toLowerCase().match(/trident/) !== null,
  isFirefox: navigator.userAgent.toLowerCase().match(/firefox/) !== null
}
var Caret = {
  $el: $('.editor')
};
Caret.hasUserSelection = function (argument) {
  var userSelection;
  if (window.getSelection) {
    userSelection = window.getSelection();
  } else if (document.selection) {
    //低版本ie
    userSelection = document.selection.createRange();
  }
   return userSelection;
};

Caret.getLength = function (selection, node) {
   var anchorNode, parentNode, range;
   if (selection !== null) {
     if (node == 'anchorNode') {
         anchorNode = selection.anchorNode, anchorOffset = selection.anchorOffset;
       }else{
         anchorNode = selection.focusNode, anchorOffset = selection.focusOffset;
       }

       //设置range对象
       parentNode = this.$el.get(0);
       range = document.createRange();
       if (parentNode != null) {
         range.setStartBefore(parentNode);
       }
       if (anchorNode != null) {
         range.setEnd(anchorNode, anchorOffset);
       }
       if (settings.isIE) {
         //@todo ie bug 会计算回车在内，但是点击行首又不算在内
         return range.toString().replace(/\n/g,'').length;
       }
       return range.toString().length;
   }else{
     return 0;
   }
 };

Caret.showEditor = function(event) {
   var length, startPosition, endPosition;
   var editor = this.$el.get(0);
   var userSelection = Caret.hasUserSelection();
   var userSelectionText = userSelection;
   if (!((event != null) && $(event.target).is('a'))) {
     //for 低版本ie
     if (document.selection) {
       userSelectionText = userSelection.text;
     }
     if (userSelectionText !== undefined && userSelectionText.toString().length) {
       // 选中文字
       this.$el.show();
       startPosition = this.getLength(userSelection, 'anchorNode');
       endPosition = this.getLength(userSelection, 'focusNode');
         if (startPosition < endPosition) {
           editor.setSelectionRange(startPosition, endPosition);
         }else{
           editor.setSelectionRange(endPosition, startPosition);
         }
         if (settings.isFirefox) {
           // firefox 需要获取焦点，不然不会显示选中高亮
           editor.focus();
         }
     }else{
       // 点击
       length = this.getLength(userSelection, 'anchorNode');
       this.$el.show();
       if (event != null) {
         if (settings.isFirefox) {
           this.$el.focus();
         }
         this.simulateCaret(length);
       }
     }
   }
 };

 $('.editor').blur(function (){
   $('.editor').hide();
 })


 $('.viewer').click(function (){
   Caret.showEditor()
 })
