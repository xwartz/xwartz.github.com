/// <reference path="js/jquery-1.2.6.js" />
/// <reference path="js/MicrosoftAjax.js" />

function appViewEngine() {
        appViewEngine.initializeBase(this);

        this._app;

        this.timeLineCanvas = timeLineCanvas;
        this.timeLineContext = timeLineContext;
        this.font_size = 12;

        this.demandBoundCanvas = demandBoundCanvas;
        this.demandBoundContext = demandBoundContext;

        this._width = 550; //Note: width height of the tGraph canvas
        this._height = 620;
        this._offset_x = 30;

        //Timeline representation
        this._barWidth = 10;
        this._step_x = 10; //timline granularity: 1 C <-> _step_x on x-axis
        this._step_y = 25;  //TODO: calc y-axis granularity considering this._height

        this._offset_timeLine = 40;
        this._offset_parallelNumber = 0;
        this._offset_demandFunc = 40;

        this._step_y_demandFunc = 5;
        this._step_x_demandFunc = 10;
        this._tail_x_demandFunc = 20;
        this._max_height_demandFunc = 60;


        this._flowcolor = ["tomato", "gold", /*"darkorange",*/ "darkturquoise", "plum", "greenyellow", "lightgreen"]; //6
    }

    appViewEngine.prototype = {
        init_ViewEngine: function(app) {
            if (!Application.isInstanceOfType(app))
                throw Error.argumentType("app");

            appViewEngine.callBaseMethod(this, 'init_ViewEngine', [app]);
            this._app = app;

            this.clearDemandBoundFunc();

            this.calTimeLineGranularity();

            $('#Panel').tabs("select", 0); //show the application tab
            this.showAppParams();
            this._populate_select_flows();
            this._populate_select_partitions();

            //$('#a-create-window').val("");
            $('#f-text-opt').val("");

            //update mode option interface
            $('input[name="opt-goal-option"]')[this._app.mode_opt_goal - 1].checked = true; //enum values start from 1. convert to 0-based index
            $('input[name="mode-d-set-option"]')[this._app.mode_set_deadline - 1].checked = true;
            //$('input[name=mode-d-set-option]:checked').val(this._app.mode_set_deadline); //This is wrong! It will set the checked radio to another value!
            //$('input[name=opt-goal-option]:checked').val(this._app.mode_opt_goal);
            $('#f-select-mode-heuristics').val(this._app.mode_heuristics);

            if(this._app.mode_opt_fixed_partial==Mode_Fixed_Partial.NOT_FIXED_PARTIAL)
                $('input[name=f-mode-fixed-partial]').attr('checked',true);
            else
                $('input[name=f-mode-fixed-partial]').removeAttr('checked');

        },
        
        drawLine: function (context, fromX, fromY, toX, toY, lineWidth, strokeStyle) {
            context.beginPath();
            context.moveTo(fromX, fromY);
            context.lineTo(toX, toY);
            context.lineWidth = lineWidth;
            context.strokeStyle = strokeStyle;
            context.stroke();
        },

        drawText: function (context, text, posX, posY, textBase, fontStyle, fillStyle) {
            context.beginPath();
            context.textBaseline = textBase;
            context.font = fontStyle;
            context.fillStyle = fillStyle;
            context.fillText(text, posX, posY);
        },

        clearGroupTimeLine: function () {
            var context = this.timeLineContext;
            var canvas = this.timeLineCanvas;
            context.clearRect(0, 0, canvas.width, canvas.height);
        },

        clearDemandBoundFunc: function () {
            var context = this.demandBoundContext;
            var canvas = this.demandBoundCanvas;
            context.clearRect(0, 0, canvas.width, canvas.height);
        },
        
        
        calTimeLineGranularity: function() {

            this._step_x = (this._width) / this._app.D; //this._app.parallelC;

            this._tail_x_demandFunc = 20;
            this._step_x_demandFunc = (this._width - this._tail_x_demandFunc) / this._app.D; //_tail_x for the final part of the function (> D)

        },

        calTimeLineGranularity_demand: function(maxC) {
            var step = this._max_height_demandFunc / maxC;
            return (step > this._step_y_demandFunc) ? this._step_y_demandFunc : step; //no more than this._step_y_demandFunc = 5;
        },

        _calc_coord_step: function(range) { //range: value range of the property

            var coord_step = 0;
            var tmp = range; var count = 0;
            if (tmp >= 1) {
                while (tmp >= 1) {
                    count++;
                    tmp = tmp / 10;
                }
                if (tmp >= 0.7)  //TODO: when maxC = 110 (too sparse) or 900 (too dense)
                    coord_step = Math.pow(10, count - 1);
                else if (tmp <= 0.2)
                    coord_step = Math.pow(10, count - 2);
                else
                    coord_step = Math.pow(10, count - 2) * 5;
                if (count == 1)
                    count = 1; //when maxC==10, need 0.5
                else
                    count = 0;
            } else {
                while (tmp < 1) {
                    count++;
                    tmp = tmp * 10;
                }
                if (tmp >= 7)
                    coord_step = Math.pow(10, -(count + 1));
                else if (tmp <= 2)
                    coord_step = Math.pow(10, -(count + 2));
                else
                    coord_step = Math.pow(10, -(count + 2)) * 5;
                count = count + 1;
            }

            return [coord_step, count];
        },
        drawTimeLineRepresentation: function() {
            if (this._app.hasCycle == true)
                return;

            this.clearGroupTimeLine();
            this.drawTimeLine();
        },

        drawDashedLine: function(context, x, y, x2, y2, dashArray) {
            if (!dashArray) dashArray=[1,5];
            if (dashLength==0) dashLength = 0.001; // Hack for Safari
            var dashCount = dashArray.length;
            context.moveTo(x, y);
            var dx = (x2-x), dy = (y2-y);
            var slope = dx ? dy/dx : 1e15;
            var distRemaining = Math.sqrt( dx*dx + dy*dy );
            var dashIndex=0, draw=true;
            while (distRemaining>=0.1){
              var dashLength = dashArray[dashIndex++%dashCount];
              if (dashLength > distRemaining) dashLength = distRemaining;
              var xStep = Math.sqrt( dashLength*dashLength / (1 + slope*slope) );
              if (dx<0) xStep = -xStep;
              x += xStep
              y += slope*xStep;
              context[draw ? 'lineTo' : 'moveTo'](x,y);
              distRemaining -= dashLength;
              draw = !draw;
            }
        },

        drawTimeLine: function () {
            var context = this.timeLineContext;
            var t_axis = { 'lineWidth': 0.5, 'strokeStyle': "black" };
            var t_text = { 'textBase': "middle", 'fontStyle': "bold 12px Arial", 'fillStyle': "black" };
            var t_bar = { 'strokeStyle': "red" };
            var t_dashline = { 'lineWidth': 0.4, 'strokeStyle': "black" };
            var length = this._app.tasks.length;

            for(var i = 0; i < length; i++) {
                //x-axis
                this.drawLine(context, this._offset_timeLine, (i + 1) * this._step_y, this._width + this._offset_timeLine, (i + 1) * this._step_y, t_axis.lineWidth, t_axis.strokeStyle);
                
                //text
                this.drawText(context, this._app.tasks[i].id, 0, (i + 1) * this._step_y - 5, t_text.textBase, t_text.fontStyle, t_text.fillStyle);
                
                //draw bar
                var task = this._app.tasks[i];
                this.drawLine(context, (task.fin - task.C) * this._step_x + this._offset_timeLine, (i + 1) * this._step_y - this._barWidth / 2, task.fin * this._step_x + this._offset_timeLine, (i + 1) * this._step_y - this._barWidth / 2, this._barWidth, t_bar.strokeStyle);

                //dashline
                if (task.fin > 0) {
                    var x = (task.fin) * this._step_x;
                    context.beginPath();
                    this.drawDashedLine(context, x + this._offset_timeLine, (i + 1) * this._step_y,x + this._offset_timeLine, length * this._step_y, [3,1,0,1]);
                    context.lineWidth = t_dashline.lineWidth;
                    context.strokeStyle = t_dashline.strokeStyle;
                    context.stroke();
                }
            }
            //y-axis
            this.drawLine(context, this._offset_timeLine, 0, this._offset_timeLine, i * this._step_y, t_axis.lineWidth, t_axis.strokeStyle);

            //in case WCET is large, this makes the x coordinates less dense
            var maxC = this._app.D; //this._app.parallelC;
            var curX = 0;
            var maxX = maxC * this._step_x;
            var x_coord_step = this._calc_coord_step(this._app.D)[0];
            var count = this._calc_coord_step(this._app.D)[1];

            while (curX <= maxX) {
                var x = curX;
                var y = length * this._step_y;
                //bottom dashline
                this.drawLine(context, x + this._offset_timeLine, y, x + this._offset_timeLine, y + 5, t_dashline.lineWidth, t_dashline.strokeStyle);
                
                //bottom text
                this.drawText(context, (curX / this._step_x).toFixed(count), x + this._offset_timeLine - 4, y + 10, t_text.textBase, t_text.fontStyle, t_text.fillStyle);
                
                curX = curX + this._step_x * x_coord_step;
            }

            this._offset_parallelNumber = length * this._step_y + 10 + this.font_size;



        },

        drawParallelNumberFunction: function () {
            if (this._app.hasCycle == true)
                return;

            var context = this.timeLineContext;
            var p_line = { 'lineWidth': 1, 'strokeStyle': "blue" };
            var p_axis = { 'lineWidth': 0.5, 'strokeStyle': "black" };
            var p_text = { 'textBase': "middle", 'fontStyle': "bold 12px Arial", 'fillStyle': "black" };
            var y = this._step_y * (this._app.maxParallelNumber);

            //x-axis bottom
            this.drawLine(context, this._offset_timeLine, y + this._offset_parallelNumber, this._width + this._offset_timeLine, y + this._offset_parallelNumber, p_axis.lineWidth, p_axis.strokeStyle);

            //y-axis
            this.drawLine(context, this._offset_timeLine, y + this._offset_parallelNumber, this._offset_timeLine, this._offset_parallelNumber - 22, p_axis.lineWidth, p_axis.strokeStyle);
            
            //y-text
            for (i = 0; i <= this._app.maxParallelNumber; i++) {

                this.drawText(context, i.toString(), this._offset_timeLine - this.font_size, y + this._offset_parallelNumber - i * this._step_y, p_text.textBase, p_text.fontStyle, p_text.fillStyle);
            }

            //parallel
            for (var i = 0; i < this._app.parallelNumbers.length - 1; i++) {
                var curX = this._step_x * this._app.parallelNumbers[i][0] + this._offset_timeLine;
                var nextX = this._step_x * this._app.parallelNumbers[i + 1][0] + this._offset_timeLine;
                var curY = y - this._step_y * this._app.parallelNumbers[i][1] + this._offset_parallelNumber;
                var nextY = y - this._step_y * this._app.parallelNumbers[i + 1][1] + this._offset_parallelNumber;

                //
                this.drawLine(context, curX, curY, nextX, curY, p_line.lineWidth, p_line.strokeStyle);

                //the vertical connecting line
                if (i != this._app.parallelNumbers.length - 2){
                    this.drawLine(context, nextX, curY, nextX, nextY, p_line.lineWidth, p_line.strokeStyle);
                }
            }

        },

        drawDemandBoundFunction: function () {
            var context = this.demandBoundContext;
            var d_axis = { 'lineWidth': 0.5, 'strokeStyle': "black" };
            var d_line = { 'lineWidth': 1, 'strokeStyle': "blue" };
            var d_text = { 'textBase': "middle", 'fontStyle': "bold 12px Arial", 'fillStyle': "black" };
            var d_coord = { 'textBase': "middle", 'fontStyle': "bold 12px Arial", 'fillStyle': "black" };

            var flows = this._app.flows;
            var offset_y_cur = 0;

            for (var i = 0; i < flows.length; i++) {
                var step_y = this.calTimeLineGranularity_demand(flows[i].C);

                offset_y_cur += Math.max(flows[i].C * step_y + this._step_y, 35);//at least 35, see text(alpha,... y-25) in drawServer()
                y = offset_y_cur;

                //x-axis
                this.drawLine(context, this._offset_demandFunc, y, this._width + this._offset_demandFunc, y, d_axis.lineWidth, d_axis.strokeStyle);

                //text
                this.drawText(context, this._app.flows[i].id, 0, y, d_text.textBase, d_text.fontStyle, d_text.fillStyle);

                //y-axis
                //this._step_y/2 : a little over the max C
                this.drawLine(context, this._offset_demandFunc, y, this._offset_demandFunc, y - flows[i].C * step_y - this._step_y / 2, d_axis.lineWidth, d_axis.strokeStyle);

                //the function
                var demand = flows[i].demandBound;

                for (var j = 0; j < demand.length; j++) {

                    var curX = this._step_x_demandFunc * demand[j][0] + this._offset_demandFunc;
                    var curY = y - step_y * demand[j][1];
                    if (j + 1 < demand.length) {
                        var nextX = this._step_x_demandFunc * demand[j + 1][0] + this._offset_demandFunc;
                        var nextY = y - step_y * demand[j + 1][1];
                    } else {
                        var finalX = curX + demand[0][0] * this._step_x_demandFunc; //what if demand[0][0]==0 (some WCET = 0)
                        if (finalX > this._width)
                            finalX = this._width + this._offset_demandFunc;
                        var nextX = finalX;
                        var nextY = curY;
                    }

                    //Horizontal line
                    this.drawLine(context, curX, curY, nextX, curY, d_line.lineWidth, d_line.strokeStyle);

                    //x-coord
                    this.drawText(context, demand[j][0].toFixed(1), curX - 5, y + 10, d_coord.textBase, d_coord.fontStyle, d_coord.fillStyle);

                    //y-coord
                    this.drawText(context, demand[j][1].toFixed(1), curX - 5, curY - this._step_y_demandFunc / 2 - 5, d_coord.textBase, d_coord.fontStyle, d_coord.fillStyle);

                    //the vertical connecting line
                    if (j == 0) { //first time
                        this.drawLine(context, curX, curY, curX, y, d_line.lineWidth, d_line.strokeStyle);
                    }
                    if (j < demand.length - 1) {
                        this.drawLine(context, nextX, curY, nextX, nextY, d_line.lineWidth, d_line.strokeStyle);
                    }
                }
            }
        },

        
        drawAlphaDeltaServer: function (argument) {
            var context = this.demandBoundContext;
            var a_line = {'lineWidth': 0.5, 'strokeStyle': "red" };
            var a_delta = { 'lineWidth': 5, 'strokeStyle': "blue" };
            var a_text = { 'textBase': "middle", 'fontStyle': "bold 8px Arial", 'fillStyle': "black" };

            var server = new AlphaDeltaServer(this._app.k);//Note:always use app.sigma
            offset_y_cur = 0;
            var flows = this._app.flows;
            if (flows.length > 0)
                $('#mrr-logwindow').append('====alpha-Delta====\n');
            for (var i = 0; i < flows.length; i++) {
                var step_y = this.calTimeLineGranularity_demand(flows[i].C);
                
                offset_y_cur += Math.max(flows[i].C * step_y + this._step_y, 35); //at least 35, see text(alpha,... y-25) in drawServer()
                y = offset_y_cur;

                var demand = this._app.flows[i].demandBound;
                server.demandBoundFunc = demand;
                //server.k = this._app.flows[i].k; //Note:always use app.sigma
                server.init();

                var result = server.solve();

                if (result) {
                    var alpha = server.solution[0];
                    var delta = server.solution[1];
                    var height = flows[i].C * step_y; // * 2;
                    var x1 = delta * this._step_x_demandFunc + this._offset_demandFunc;
                    //var x2 = x1 + flows[i].C / Math.tan(alpha) * this._step_x_demandFunc; // * 2;
                    var x2 = x1 + height / alpha * this._step_x_demandFunc / step_y; // * 2; //Note: 1)flows[i].C = height / step_y; 2) alpha is the tan value!
                    var y1 = y;
                    var y2 = y1 - height;
                    $('#mrr-logwindow').append(String.format("alpha{0}={1}\ndelta{2}={3}\n---------------------------\n", i, alpha, i, delta));
                    //
                    this.drawLine(context, x1, y1, x2, y2, a_line.lineWidth, a_line.strokeStyle);
                    //delta
                    this.drawLine(context, this._offset_demandFunc, y, x1, y, a_delta.lineWidth, a_delta.strokeStyle);
                    //delta text
                    this.drawText(context, String.format("Delta={0}", delta.toFixed(2)), x1, y - 15, a_text.textBase, a_text.fontStyle, a_text.fillStyle);

                    //alpha text
                    this.drawText(context, String.format("Alpha={0}", alpha.toFixed(2)), x1, y - 25, a_text.textBase, a_text.fontStyle, a_text.fillStyle);

                    var cost = server.cost(alpha,delta);

                    //cost text
                    this.drawText(context, String.format("Cost={0}", cost.toFixed(2)), this._width - this._offset_x , y - 10, a_text.textBase, a_text.fontStyle, a_text.fillStyle);

                } else {
                    $('#mrr-logwindow').html("No feasible solution found");
                }
            }


        },

        
        drawFlows: function() {
            for (var i = 0; i < this.get_nodeNumber(); i++) {
                var node = this.get_nodes()[i];
                //var node = this._app.get_node(vnode.id);
                if (node.flow != null){
                    node.fillColor = this._flowcolor[this._app._parseFlowIndex(node.flow.id) % this._flowcolor.length];
                }else{
                    node.fillColor = "ghostwhite";
                }
            }
            this.drawGraph();
        },
        drawAll: function() {
            this.initGraph();
            this.drawFlows();
            this.drawTimeLineRepresentation();
            this.drawParallelNumberFunction();

            this.clearDemandBoundFunc();
            this.drawDemandBoundFunction();
            this.drawAlphaDeltaServer();
            
            
        },
        /* events */
        showAppParams: function() {
            var p = $('#pnl-app');
            $('#a-a', p).val(this._app.a);
            $('#a-T', p).val(this._app.T);
            $('#a-D', p).val(this._app.D);
            $('#a-k', p).val(this._app.k);
            $('#a-sC', p).html(this._app.sequentialC.toString()); //if C is less 1, may use toFixed()
            $('#a-pC', p).html(this._app.parallelC.toString());
            $('#a-maxNn', p).html(this._app.maxParallelNumber.toString());
        },
        setAppParams: function() {
            var p = $('#pnl-app');

            //see Application.set_Params(params)
            this._app.set_Params([parseFloat($('#a-D', p).val()),
                                 parseFloat($('#a-a', p).val()),
                                 parseFloat($('#a-T', p).val()),
                                 parseFloat($('#a-k', p).val())]
                                 )
        },
        _clear_select_flows: function() {
            $('#f-select-flows >option').remove();
            $('#f-select-flows').append($('<option> </option>').attr({ disabled: "disabled", value:-1, selected: "selected" }).html("--Select--")); //Note: disabled/selected not working in IE
        },
        _populate_select_flows: function() { /* recreate the whole dropdown list */
            this._clear_select_flows();
            for (var i = 0; i < this._app.flows.length; i++) {
                var flow = this._app.flows[i];
                $('#f-select-flows').append($('<option> </option>').val(flow.id).html(flow.id)
                                            .css("background", this._flowcolor[this._app._parseFlowIndex(flow.id) % this._flowcolor.length]));
            }
        },
        clearFlowInfo: function() {
            var p = $('#pnl-flow');
            $('#f-id', p).html("");
            $('#f-L', p).html("");
            $('#f-C', p).html("");
            $('#f-k', p).val("");

            $('#f-btn-set').attr("disabled", "disabled");
            $('#f-btn-remove').attr("disabled", "disabled");
        },

        onSelectFlowClick: function(select_elm) {
            var id = select_elm.val();
            this.clearSelectNodes();
            var flow = this._app.get_flow(id);
            for (var i = 0, len=flow.tasks.length; i < len; i++) {
                var node = flow.tasks[i];
                this.getSelectNode(node);
            }
            $('#f-btn-remove').removeAttr("disabled");
            this.drawGraph();
        },
        _clear_select_partitions: function() {
            $('#f-select-partitions >option').remove();
            $('#f-select-partitions').append($('<option> </option>').attr({ disabled: "disabled", value:-1, selected: "selected" }).html("--Select--")); //Note: disabled/selected not working in IE
        },
        _populate_select_partitions: function() { /* recreate the whole dropdown list */
            for (var i = 0; i < this._app.partitions.length; i++) {
                $('#f-select-partitions').append($('<option> </option>').val(i).html("partition"+i.toString())
                                            .css("background-color", this._flowcolor[i % this._flowcolor.length]));
            }
        },
        on_selectPartition_change: function(id) {
            if(id<0) //click on --Select--
                return;

            var partition = this._app.get_partition(id);
            Array.clear(this._app.flows);
            this._app.parse_partition(Array.parse(partition));

            this.drawFlows();

            this._populate_select_flows();

            this.update_view_after_flow_changed();
        },
        on_showAppParams_click: function() {
            this._app.init_Application();
            this.showAppParams();
        },
        on_setAppParams_click: function() {
            this.setAppParams();
        },

        on_removeFlow_click: function(){
            if (this._selectedNodes.length < 1)
                return;

            for (var i = 0; i < this._selectedNodes.length; i++) {
                var id = this._selectedNodes[i].id;
                var task = this._app.get_node(id);
                if (task.flow == null)
                    continue;
                task.flow.remove_task(task);
            }
            this._app.clean_emtpyFlows();
            this.drawFlows();

            this._populate_select_flows(); //TODO: more efficient way
            this.clearFlowInfo();
        },

        onTopologicalClick: function() {
            this._app.init_Application();

            if (this._app.hasCycle == true)
                return;

            var array = this._app.topologicalOrderedArray;
            for (var i = 0; i < array.length; i++) {
                $.log(array[i].id + " ");
            }
        },

        onCriticalPathClick: function() {
            this.unselectRelation();
            this.unhighlightRelations();
            this.clearSelectNodes();

            this._app.init_Application();

            if (this._app.hasCycle == true)
                return;

            var array = this._app.criticalPath;
            for (var i = 0; i < array.length; i++) {
                var relation = array[i];
                this.highlightRelation(relation);
            }
            this.drawGraph();
        },

        on_drawDemand_click: function() {

            this._app.mode_set_deadline=$('input[name=mode-d-set-option]:checked').val();

            this._app.init_Application();

            if (this._app.hasCycle == true)
                return;

            this.calTimeLineGranularity();

            this.clearDemandBoundFunc();
            this.drawDemandBoundFunction();
            this.drawAlphaDeltaServer();
            
        },
        openApp: function(string) {
            var input = Array.parse(string);
            if (!Array.isInstanceOfType(input) || input.length < 1)
                return;

            this._app.parse(input);
            this._app.init_Application();

            pView.init_ViewEngine(this._app);

            this.drawAll();
        },
        on_appCreate_click: function() {
            var string = $('#a-create-window').val();
            //var array = $.makeArray(string);
            //var array2 = Array.parse(string);

            this.openApp(string);
        },
        on_appSave_click: function() {
            var string = this._app.serialize();
            $('#a-create-window').val(string);
            var appName = $('#pGraph-subtitle').html() + '.txt';

            var blob = new Blob([string], {type: "text/plain;charset=utf-8"});
            saveAs(blob, appName);

        },

        update_search_cost: function(cost) {

            $('#cost-B').html('').html(cost[0]);
            $('#cost-beta').html('').html(cost[1]);
        },
        update_heuristic_cost: function(cost) {
            $('#cost-B').html('').html(cost[0]);
            $('#cost-beta').html('').html(cost[1]);
        },
        on_Search_click_callback: function(data){
            this.server_callback(data);
            this.update_search_cost(Array.parse(data['cost']));
        },
        on_Heuristic_click_callback: function(data){
            this.server_callback(data);
            this.update_heuristic_cost(Array.parse(data['cost']));
        },
        clean_last_server_result: function(){
            $('#cost-B').html('');
            $('#cost-beta').html('');
            $('#f-text-opt').val('');
            Array.clear(this._app.partitions);
            this._clear_select_partitions();
        },
        server_callback: function(data){
            if(data['error']=='number_tasks'){
                $('#f-text-opt').val('Current Version of the Server-based tool supports no more than 9 tasks for search and 50 tasks for heuristic.\nFor more tasks, check \'Using fixed partial partition\' or download the standalone version.');
                return;
            }

            //app.opt_partition = data['1'];
            $('#f-text-opt').val(data['partitions']);

            if (!String.isInstanceOfType(data['partitions']))
                throw Error.argumentType("String");

            var partitions = data['partitions'].split("\n");
            //Array.clear(this._app.partitions);
            for(var i=0;i<partitions.length;i++){
                this._app.add_partition(partitions[i]);
            }
            this._populate_select_partitions();

            if(this._app.partitions.length>0){
                this.on_selectPartition_change('0');
                $('#f-select-partitions').val('0');
            }
        },
        on_createFlow_click: function() {
            if (this._selectedNodes.length < 1)
                return;

            var flow = new Flow();
            flow.k = this._app.k;

            for (var i = 0; i < this._selectedNodes.length; i++) {
                var id = this._selectedNodes[i].id;
                var task = this._app.get_node(id);
                
                flow.add_task(task);
            }

            flow.init_flow(); //only need to calc flow.C, flow.demand can not be calc because deadlines/arrivals are not set yet
            this._app.add_flow(flow);
            this._app.clean_emtpyFlows();

            this.drawFlows();

            this._populate_select_flows(); //TODO: more efficient way as follow

        },
        on_mode_d_assignment_change: function() {
            this.update_view_after_flow_changed();
            this.updatePanelAfterSelectNode(); //task arrival and deadline may be changed
        },
        on_mode_opt_goal_change: function() {
            this._app.mode_opt_goal=$('input[name=opt-goal-option]:checked').val();
        },
        on_mode_opt_fixed_partial_change: function() {
            this._app.mode_opt_fixed_partial= $('input[name=f-mode-fixed-partial]').is(':checked') ?  Mode_Fixed_Partial.NOT_FIXED_PARTIAL : Mode_Fixed_Partial.FIXED_PARTIAL;
        },
        on_mode_heuristics_change: function() {
            this._app.mode_heuristics= $('#f-select-mode-heuristics').val();
        },

        /* override */
        addNode: function() {
            var task = new Task();
            this._pGraph.add_node(task);
            // this.drawNode(task);
            this.drawGraph();
        },
        update_view_after_app_changed: function() {
            this._app.mode_set_deadline=$('input[name=mode-d-set-option]:checked').val();

            this._app.init_Application();
            this.showAppParams();

            if (this._app.hasCycle == true)
                return;

            this.calTimeLineGranularity();

            this.clearGroupTimeLine();
            this.clearDemandBoundFunc();


            this.drawTimeLineRepresentation();
            this.drawParallelNumberFunction();
            this.drawDemandBoundFunction();
            
            this.drawAlphaDeltaServer();
            
        },
        update_view_after_flow_changed: function() { //TODO: always need init_Application()?
            this._app.mode_set_deadline=$('input[name=mode-d-set-option]:checked').val();

            this._app.init_Application();
            this.showAppParams();

            if (this._app.hasCycle == true)
                return;

            this.calTimeLineGranularity();

            this.clearDemandBoundFunc();

            this.drawDemandBoundFunction();
            

            this.drawAlphaDeltaServer();
            
        }


    }

    appViewEngine.registerClass('appViewEngine',pGraphViewEngine);
