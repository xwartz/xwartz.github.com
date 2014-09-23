/// <reference path="js/jquery-1.2.6.js" />
/// <reference path="js/MicrosoftAjax.js" />

//IViewNode.registerInterface('IViewNode');


/* class vPrecedenceGraph */
pGraphViewEngine = function() {
    this._pGraph = null;
    this.canvas = graphCanvas;
    this.context = graphContext;
    this._diameter = 20;
    this._margin = 50; // the margin of the top-left node to the canvas
    this._disStep = 100; //step of distance between nodes
    this._arrowLength = 20; //length of the arrow head
    this._arrowWidth = 28; //width of the arrow head
    this._arrowBarWidth = 10; //length of the arrow bar

    //mouse event related
    this._instanceName = "pView"; //name of the instance of the viewengine;
    this._dragger = null;
    this.isDragging = false;
    this._selectedArrow = null;
    this._start_drag = null;
    this._offsetx = null;
    this._offsety = null;
    this._inRelations = new Array(); //of Type array of Relation
    this._outRelations = new Array(); //of Type array of Relation

    this._selectedNodes = new Array(); //of Type array of elm = evt.currentTarget
    this._selectedRelation = null; //of Type elm = evt.currentTarget

    // key event
    this._shiftKey = false;
};

pGraphViewEngine.prototype = {
    init_ViewEngine: function(pGraph) {
        if (!PrecedenceGraph.isInstanceOfType(pGraph)){
          throw Error.argumentType("pGraph");
        }
        this._pGraph = pGraph;
    },

    clearCanvas: function () {
      var canvas = this.canvas;
      var context = this.context;
      context.clearRect(0, 0, canvas.width, canvas.height);
    },

    get_nodeNumber: function() {
        return this._pGraph.get_nodeNumber();
    },
    get_nodes: function() {
        return this._pGraph.get_nodes();
    },
    get_node: function(id) {
        return this._pGraph.get_node(id);
    },
    get_relationNumber: function() {
        return this._pGraph.get_relationNumber();
    },
    get_relations: function() {
        return this._pGraph.get_relations();
    },
    get_relation: function(id) {
        return this._pGraph.get_relation(id);
    },

    get_arrowNumber: function () {
        return this._pGraph.get_arrowNumber();
    },

    get_arrows: function () {
        return this._pGraph.get_arrows();
    },

    get_arrow: function(id) {
      return this._pGraph.get_arrows()[id];
    },

    getArrowById: function (id) {
        return Array.getById(this.get_arrows(), id);
    },

    getRelationIndex: function (id) {
        return parseInt(id.slice('relation'.length, id.length));
    },

    initGraph: function () {
      this.clearCanvas();
      for (var i = 0; i < this.get_nodeNumber(); i++) {
          var node = this.get_nodes()[i];
          if (node.X == 20 && node.Y == 20) { //initial value
              node.X = (i % 3) * this._disStep + this._margin;
              //node.X = (i % 3 + 1) * this._disStep;
              node.Y = (parseInt(i / 3)) * this._disStep + this._margin;
              //node.Y = (parseInt(i / 3) + 1) * this._disStep; //node.Y = ((i / 3) + 1) * this._disStep
          }
          this.drawNode(node);
        }
        // draw relation
        for (var i = 0; i < this.get_relationNumber(); i++) {
            var relation = this.get_relations()[i];
            this.drawRelation(relation);
        }

        // draw text
        for (var i = 0; i < this.get_nodeNumber(); i++) {
            var node = this.get_nodes()[i];
            if (node.X == 20 && node.Y == 20) { //initial value
                node.X = (i % 3) * this._disStep + this._margin;
                //node.X = (i % 3 + 1) * this._disStep;
                node.Y = (parseInt(i / 3)) * this._disStep + this._margin;
            }
            this.drawNodeText(node);
        }

        this.initDrag();
        this.shiftKeyHelp();
    },


    /* drawing graph */
    drawGraph: function() {
        // clear canvas
        this.clearCanvas();

        /* Draw Nodes */ //draw all relations in a group to avoid z-index inversion
        for (var i = 0; i < this.get_nodeNumber(); i++) {
            var node = this.get_nodes()[i];

            this.drawNode(node);
        }

        // draw relation
        for (var i = 0; i < this.get_relationNumber(); i++) {
            var relation = this.get_relations()[i];
            this.drawRelation(relation);
        }

        // draw text
        for (var i = 0; i < this.get_nodeNumber(); i++) {
            var node = this.get_nodes()[i];

            this.drawNodeText(node);
        }

    },

    drawNode: function(node) {

        if (!ViewNode.isInstanceOfType(node)) {
            throw Error.argumentType("ViewNode");
        }
        var id = node.id;

        // Draw the circle.
        var context = this.context;
        context.beginPath();
        context.arc(node.X, node.Y, this._diameter, 0, Math.PI*2);
        context.lineWidth = 1;
        context.fillStyle = node.fillColor;
        context.strokeStyle = "steelblue";

        if (node.isSelected) {
          context.lineWidth = 5;
        }else {
          context.lineWidth = 1;
        }

        context.fill();
        context.stroke();
    },

    drawRelation: function (relation) {
      if (!Relation.isInstanceOfType(relation) || !ViewRelation.isInstanceOfType(relation)) {
          throw Error.argumentType("relation");
      }

      var id = relation.id;

      var context = this.context;
      var i = this.getRelationIndex(id);
      var arrow = this.getArrowById(i);
      var srcNode = relation.get_srcNode();
      var desNode = relation.get_desNode();
      var srcPoint = this.getSrcPoint(srcNode, desNode);
      var desPoint = this.getDesPoint(srcNode, desNode);

      arrow.X = (srcNode.X + desNode.X) / 2;
      arrow.Y = (srcNode.Y + desNode.Y) / 2;

      // draw the line.
      context.beginPath();
      context.moveTo(srcPoint.X, srcPoint.Y);
      context.lineTo(desPoint.X, desPoint.Y);

      //draw arrow
      this.drawArrow(srcNode, arrow);

      // context.globalCompositeOperation = "xor";
      context.lineWidth = 5;

      if (arrow.isSelected) {
          context.strokeStyle = 'goldenrod';
      }else{
          context.strokeStyle = "rgb(0, 128, 0)";
      }
      context.stroke();

    },

    drawNodeText: function (node) {
      var context = this.context;
      context.beginPath();
      context.textBaseline = "middle";
      context.font = "bold 12px Arial";
      context.fillStyle = "black";
      context.fillText(node.id, node.X - 16, node.Y);
    },

    getSrcPoint: function (srcNode, desNode) {
      // var L = Math.sqrt(Math.pow(srcNode.X - desNode.X, 2) + Math.pow(srcNode.Y - desNode.Y， 2))
      // var angle = this.calAngle(srcNode,desNode);
      var srcPoint = {};
      if (desNode.X > srcNode.X) {
        srcPoint.X = srcNode.X + this._diameter * this.cos(srcNode, desNode);
      }else{
        srcPoint.X = srcNode.X - this._diameter * this.cos(srcNode, desNode);
      }
      if (desNode.Y > srcNode.Y) {
        srcPoint.Y = srcNode.Y + this._diameter * this.sin(srcNode, desNode);
      }else{
        srcPoint.Y = srcNode.Y - this._diameter * this.sin(srcNode, desNode);
      }

      return srcPoint;
    },

    getDesPoint: function (srcNode, desNode) {
      // var L = Math.sqrt(Math.pow(srcNode.X - desNode.X, 2) + Math.pow(srcNode.Y - desNode.Y， 2));
      // var angle = this.calAngle(srcNode,desNode);
      var desPoint = {};
      if (desNode.X > srcNode.X) {
        desPoint.X = desNode.X - this._diameter * this.cos(srcNode, desNode);
      }else{
        desPoint.X = desNode.X + this._diameter * this.cos(srcNode, desNode);
      }
      if (desNode.Y > srcNode.Y) {
        desPoint.Y = desNode.Y - this._diameter * this.sin(srcNode, desNode);
      }else{
        desPoint.Y = desNode.Y + this._diameter * this.sin(srcNode, desNode);
      }

      return desPoint;
    },

    sin: function (srcNode, desNode) {
      var l = Math.sqrt(Math.pow(srcNode.X - desNode.X, 2) + Math.pow(srcNode.Y - desNode.Y, 2));
      var y = Math.sqrt(Math.pow(srcNode.Y - desNode.Y, 2));
      return y / l;
    },

    cos: function (srcNode, desNode) {
      var l = Math.sqrt(Math.pow(srcNode.X - desNode.X, 2) + Math.pow(srcNode.Y - desNode.Y, 2));
      var x = Math.sqrt(Math.pow(srcNode.X - desNode.X, 2));
      return x / l;
    },

    calAngle: function (srcNode, desNode) {
      var angle = Math.atan2(desNode.Y - srcNode.Y, desNode.X - srcNode.X);
      return angle;
    },

    drawArrow: function (srcNode, desNode) {
      var headlen = 15;   // length of head in pixels
      var angle = this.calAngle(srcNode,desNode);
      var context = this.context;
      // context.beginPath();
      // context.moveTo(fromx, fromy);
      // context.lineTo(desNode.X, desNode.Y);
      context.moveTo(desNode.X, desNode.Y);
      context.lineTo(desNode.X-headlen*Math.cos(angle-Math.PI/6),desNode.Y-headlen*Math.sin(angle-Math.PI/6));
      context.moveTo(desNode.X, desNode.Y);
      context.lineTo(desNode.X-headlen*Math.cos(angle+Math.PI/6),desNode.Y-headlen*Math.sin(angle+Math.PI/6));
    },

    initDrag: function () {
      var canvas = this.canvas;
      canvas.onmousedown = $.proxy(this.mouseDown,this);
      canvas.onmouseup = $.proxy(this.stopDragging,this);
      canvas.onmouseout = $.proxy(this.stopDragging,this);
      canvas.onmousemove = $.proxy(this.mouseMove,this);
    },
    mouseDown: function (e) {
      var e = e || window.event;
      this.selectNode(e);
      this.selectedArrow(e);
    },

    mouseMove: function (e) {
      var e = e || window.event;
      this.dragNode(e);
      this.changeCursor(e);
    },

    clearSelectNodes: function() {
      if (this._selectedNodes.length == 0)
          return;

      Array.forEach(this._selectedNodes, function(item) {
          item.isSelected = false;
      })
      Array.clear(this._selectedNodes);
      $('#pGraphCanvas').imgAreaSelect({enable: true});
    },

    getSelectNode: function (node) {
      node.isSelected = true;
      this._selectedNodes.push(node);
    },

    selectNode: function (e) {
      var canvas = $(this.canvas);
      var clickX = e.pageX - canvas.offset().left;
      var clickY = e.pageY - canvas.offset().top;
      var nodes = this.get_nodes();
      var hasSelsect = false;

      for(var i = nodes.length - 1; i >= 0; i--) {
        var node = nodes[i];
        var distanceFromCenter = Math.sqrt( Math.pow( node.X - clickX, 2 ) + Math.pow( node.Y - clickY, 2 ) );
        if (distanceFromCenter <= this._diameter) {

          // node.isSelected = true;
          hasSelsect = true;

          if (this._shiftKey) {
              if (Array.contains(this._selectedNodes, node)) {
                  this.clearSelectNodes(node);
              } else {
                this.getSelectNode(node);
              }
          }else{
            if (this._dragger != null){
              this._dragger.isSelected = false;
            }
            this._dragger = node;
            this.unselectRelation();
            this.clearSelectNodes();
            this.getSelectNode(node);
            this.updatePanelAfterSelectNode();
          }


          if (this._selectedArrow != null){
            this._selectedArrow.isSelected = false;
          }
          this.isDragging = true;
          $('#pGraphCanvas').imgAreaSelect({disable: true});

          if(this._selectedNodes.length > 0)
            this.updatePanelAfterSelectNode();
          else
            this.updatePanelAfterUnselectNode();

          this.drawGraph();
          return;
        }else{
            if (this._dragger != null){
            // this._dragger.isSelected = false;
          }
          // this.drawGraph();
        }
      }
      if (!hasSelsect) {
        this.clearSelectNodes();
        this.drawGraph();
        this.updatePanelAfterUnselectNode();
      }
    },

    dragNode: function  (e) {
      var canvas = $(this.canvas);
      var dragNode = this._dragger;
      if (this.isDragging == true) {
        // $('#pGraphCanvas').imgAreaSelect({disabled: true});
        // Make sure there really is a circle object (just in case).
        if (dragNode != null) {
          // Find the new position of the mouse.
          var x = e.pageX - canvas.offset().left;
          var y = e.pageY - canvas.offset().top;

          // Move the circle to that position.
          dragNode.X = parseInt(x);
          dragNode.Y = parseInt(y);

          // Update the canvas.
          this.drawGraph();

        }
      }
    },

    stopDragging: function (e) {
        this.isDragging = false;
        this.updatePanelAfterSelectNode();
    },

    selectRelation: function (relation) {
      this.showRelationInfo(relation);
      this._selectedRelation = relation;

      $('#r-btn-remove').removeAttr("disabled");
      $('#r-c').val(relation.latency.toFixed(2));
    },

    unselectRelation: function() {
      if (this._selectedRelation == null)
          return;

      this._selectedRelation = null;

      this.clearRelationInfo();
      $('#r-btn-remove').attr("disabled", "disabled");
      $('#r-c').val('');
    },

    clearRelationInfo: function() {
        var p = $('#pnl-node');
        $('#r-id', p).html("");
        $('#r-pre', p).html("");
        $('#r-suc', p).html("");
    },

    showRelationInfo: function(relation) {
        if (!Relation.isInstanceOfType(relation)) {
            throw Error.argumentType("relation");
        }

        var p = $('#pnl-node');
        $('#r-id', p).html(relation.id);
        $('#r-pre', p).html(relation.get_srcNode().id);
        $('#r-suc', p).html(relation.get_desNode().id);
        $('#r-c', p).html(relation.latency);
    },

    updatePanelAfterSelectNode: function(){

        var selectNodesNumber = this._selectedNodes.length;

        if (selectNodesNumber > 0)
            $('#n-btn-remove').removeAttr("disabled");
        else
            $('#n-btn-remove').attr("disabled", "disabled");

        if (selectNodesNumber == 1) {
            $('#n-btn-set').removeAttr("disabled");
            $('#n-btn-conn').attr("disabled", "disabled");

            //var node = this.get_node(elm.getAttribute('id'));
            var node = this.get_node(this._selectedNodes[0].id);
            this.showNodeInfo(node);
        } else {
            $('#n-btn-set').attr("disabled", "disabled");
            //this.clearRelation();
            this.clearNodeInfo();

            if (selectNodesNumber == 2 &&
                this._pGraph.has_relationById(this._selectedNodes[0].id, this._selectedNodes[1].id) == 0)
                $('#n-btn-conn').removeAttr("disabled");
            else
                $('#n-btn-conn').attr("disabled", "disabled");
        }

        $('#f-btn-flow').removeAttr("disabled");
        $('#f-btn-remove').removeAttr("disabled");
    },

    updatePanelAfterUnselectNode: function(){
        $('#n-btn-set').attr("disabled", "disabled");
        $('#n-btn-remove').attr("disabled", "disabled");
        $('#n-btn-conn').attr("disabled", "disabled");
        $('#f-btn-flow').attr("disabled", "disabled");
        $('#f-btn-remove').attr("disabled", "disabled");
        this.clearNodeInfo();

        //flow panel
        $('#f-select-flows').val(-1);
        this.clearFlowInfo();
    },

    selectedArrow: function (e) {
       // select arrow
      var canvas = $(this.canvas);
      var clickX = e.pageX - canvas.offset().left;
      var clickY = e.pageY - canvas.offset().top;
      var arrows = this.get_arrows();
      var hasSelsect = false;
      var relations = this.get_relations();

       for(var i = arrows.length - 1; i >= 0; i--) {
         var arrow = arrows[i];
         var relation = relations[i];
         var distanceFromArrow = Math.sqrt( Math.pow( arrow.X - clickX, 2 ) + Math.pow( arrow.Y - clickY, 2 ) );
         if (distanceFromArrow <= this._diameter) {
           if (this._selectedArrow != null){
             this._selectedArrow.isSelected = false;
           }
           this._selectedArrow = arrow;
           arrow.isSelected = true;
           relation.isSelected = true;

           this.selectRelation(relation);
           this.clearSelectNodes();

           hasSelsect = true;
           if (this._dragger != null){
             this._dragger.isSelected = false;
           }
           this.drawGraph();
           return;
         }else{
             if (this._selectedArrow != null){
             this._selectedArrow.isSelected = false;
           }
         }
       }
       if (!hasSelsect) {
        this.unhighlightRelations();
        // this.drawGraph();
        // this.unselectRelation();
      }
    },

    changeCursor: function (e) {
      var canvas = $(this.canvas);
      var clickX = e.pageX - canvas.offset().left;
      var clickY = e.pageY - canvas.offset().top;
      var tasks = this.get_nodes();
      var arrows = this.get_arrows();

      for(var i = tasks.length - 1; i >= 0; i--) {
        var task = tasks[i];
        var distanceFromCenter = Math.sqrt( Math.pow( task.X - clickX, 2 ) + Math.pow( task.Y - clickY, 2 ) );
        if (distanceFromCenter <= this._diameter) {
          e.target.style.cursor = 'move';
          return;
        }else{
          e.target.style.cursor = 'default';
          // return;
        }
      }

      for(var i = arrows.length - 1; i >= 0; i--) {
        var arrow = arrows[i];
        var distanceFromArrow = Math.sqrt( Math.pow( arrow.X - clickX, 2 ) + Math.pow( arrow.Y - clickY, 2 ) );
        if (distanceFromArrow <= this._diameter) {
          e.target.style.cursor = 'pointer';
          return;
        }
      }
    },

    shiftKeyHelp: function () {
      var _this = this;
      $(window).keydown(function (event) {
        if (event.shiftKey) {
          _this._shiftKey = true;
        }
      })

      $(window).keyup(function (event) {
        // if (event.shiftKey) {
          _this._shiftKey = false;
        // }
      })
    },

    onDragSelectNodes: function(selection, evt) { //with jquery.imgareaselect plugin

        if(selection.width >0 && selection.height>0) {
            var nodes = this._pGraph.get_nodes();

            for ( var i=0, len=nodes.length; i<len; ++i ){
                node = nodes[i];
                var x = node.X;
                var y = node.Y;
                if(x >= selection.x1 && x <= selection.x2 && y >= selection.y1 && y <= selection.y2){
                    if(evt && !evt.shiftKey){
                        this.selectNode(node);
                    } else {
                        if (Array.contains(this._selectedNodes, node)) {
                            this.clearSelectNodes(node);
                        } else {
                          this.getSelectNode(node);
                        }
                    }
                }
            }
        }

        if(this._selectedNodes.length > 0)
          this.updatePanelAfterSelectNode();
        else
          this.updatePanelAfterUnselectNode();

        this.drawGraph();
    },

    clearArrow: function () {
      Array.clear(this.get_arrows());
    },

    clearRelation: function() {
        Array.clear(this._outRelations);
        Array.clear(this._inRelations);
    },

    updateRelation: function(node) {//update in out relations to the 1 selected node

      if (this._selectedRelation == null)
            return;

      this.clearRelation();

      for (var i = 0; i < node.get_outgoingRelations().length; i++) {
          Array.add(this._outRelations, node.get_outgoingRelations()[i]);
      }
      for (var i = 0; i < node.get_incomingRelations().length; i++) {
          Array.add(this._inRelations, node.get_incomingRelations()[i]);
      }
    },

    highlightRelation: function(relation) {
      var id = this.getRelationIndex(relation.id)
      var arrow = this.getArrowById(id);
      arrow.isSelected = true;
    },

    unhighlightRelations: function() {
        for (var i = 0; i < this.get_relationNumber(); i++) {
            var relation = this.get_relations()[i];
            var id = this.getRelationIndex(relation.id)
            var arrow = this.getArrowById(id);
            arrow.isSelected = false;
        }
        this.drawGraph();
    },

    clearNodeInfo: function() {
        var p = $('#pnl-node');
        $('#n-id', p).html("");
        $('#n-X', p).html("");
        $('#n-Y', p).html("");
        $('#n-flow', p).html("");
        $('#n-a', p).html("");
        $('#n-D', p).html("");
        $('#n-C', p).val("");
    },

    showNodeInfo: function(node) {
        if (!Node.isInstanceOfType(node)) {
            throw Error.argumentType("node");
        }
        var p = $('#pnl-node'); //container
        $('#n-id', p).html(node.id);
        $('#n-X', p).html(node.X);
        $('#n-Y', p).html(node.Y);
        //$('#n-flow', p).html(!node.flow ? ("") : node.flow.id);
        if (node.flow != null) {
            var id = node.flow.id;
            $('#n-flow', p).html(id);
            $('#n-flow', p).css("background-color", this._flowcolor[this._pGraph._parseFlowIndex(id)]);
        } else {
            $('#n-flow', p).html("");
        }
        $('#n-a', p).html(node.a.toFixed(2));
        $('#n-D', p).html(node.D.toFixed(2));
        $('#n-C', p).val(node.C.toFixed(2));
    },

    setNodeParam: function() {
        if (this._selectedNodes.length != 1)
            return;

        var p = $('#pnl-node');
        var node = this._selectedNodes[0];
        node.C = parseFloat($('#n-C', p).val());
    },

    setRelationParam: function() {
        if (this._selectedRelation == null)
            return;

        var id = this._selectedRelation.id;
        var relation = this.get_relation(id);

        relation.latency = parseFloat($('#r-c').val());
    },

    addPrecedenceToSelectedNodes: function() {
        if (this._selectedNodes.length == 2) {
            var id1 = this._selectedNodes[0].id;
            var id2 = this._selectedNodes[1].id;
            if (this._pGraph.has_relationById(id1, id2) != 0)
                return;

            var relation = this._pGraph.addPrecedenceById(id1, id2);
            var arrow = {};
            this.get_arrows().push(arrow);
            this.drawRelation(relation);
        }
    },

    removeRelation: function() {
        if (this._selectedRelation == null)
            return;
        // var id = this._selectedRelation.getAttribute('id');
        var relation = this._selectedRelation;
        this._pGraph.remove_relation(relation);

        this.drawGraph();
    },

    removeNodes: function() {
        this.on_removeFlow_click(); //TODO: call subclass method

        for ( var len = this._selectedNodes.length, j = len - 1; j >= 0; j-- ){
            var elm = this._selectedNodes[j];
            var id = elm.id;
            var node = this.get_node(id);

            //remove graphic arrows of relations
            this.updateRelation(node);
            var rel;
            for (var i = this._inRelations.length - 1; i >= 0; i--) {
                var relation = this._inRelations[i];

                Array.remove(this._inRelations, relation);
            }
            for (var i = this._outRelations.length - 1; i >= 0; i--) {
                var relation = this._outRelations[i];

                Array.remove(this._outRelations, relation);
            }

            this._pGraph.remove_node(node);
        }

        Array.clear(this._selectedNodes);
        this.updatePanelAfterSelectNode();
        this.drawGraph();
    },

    update_title: function(title){
        $('#pGraph-subtitle').html(title);
    }
}

pGraphViewEngine.registerClass('pGraphViewEngine');
