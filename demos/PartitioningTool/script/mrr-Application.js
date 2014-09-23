/// <reference path="js/jquery-1.2.6.js" />
/// <reference path="js/MicrosoftAjax.js" />

//why after reference mrr-pGraphViewEngine.js, intellisense is useless?

/* class Task */
Task = function() {
Task.initializeBase(this);

    this.C = 1;
    this.D = 1;
    this.a = 0;

    //finish time, for criticalPath
    this.fin = 0;

    //flow
    this.flow = null; //pointer to the flow
};

Task.registerClass('Task', Node);

///* class Path */
//Path = function() {
//}
//Path.registerClass('Path');

// directly add latency to Relation in PrecedenceGraph
// /* class Precedence */
// Precedence = function() {
//     Precedence.initializeBase(this);
//     this.latency = 0.0;
// };

// Precedence.registerClass('Precedence', Relation);

/* class Flow */
Flow = function() {
    this.id = null;

    this.C = null; //flow computation time
    this.tasks = new Array();
    this.demandBound = new Array();

    this.k = 0; //context switch overhead, used in optimization of (alpha,delta)
};

Flow.prototype = {
    init_flow: function() {

        this.C = 0;
        for (var i = 0; i < this.tasks.length; i++) {
            this.C += this.tasks[i].C;
        }

        //sort tasks by deadlines, for demand function
        this.tasks.sort($.sortTasksInFlow_byDeadline);

        this._calc_demandBound();
    },
    clear: function() {
        for (var i = 0; i < this.tasks.length; i++) {
            this.remove_task(this.tasks[i]);
        }
        Array.clear(this.tasks);

        Array.clear(this.demandBound);

        this.id = null;
        this.C = null;
    },
    get_length: function() {
        return this.tasks.length;
    },
    add_task: function(task) {
        if (!Task.isInstanceOfType(task))
            throw Error.argumentType("task");

        //check if already in another flow
        if (task.flow != null) {
            var flow = task.flow;
            flow.remove_task(task);
        }

        task.flow = this;
        Array.add(this.tasks, task);
    },
    remove_task: function(task) {
        if (!Task.isInstanceOfType(task))
            throw Error.argumentType("task");

        task.flow = null;
        Array.remove(this.tasks, task);

        //if ( this.tasks.length == 0) : consider in Application._calFlowPosition & init_Application() calling clean_emtpyFlows()
    },
    contains: function(task) {
        return Array.contains(this.tasks, task);
    },
    _calc_demandBound_t1: function(t1, flow) {
        if (!Flow.isInstanceOfType(flow)) {
            throw Error.argumentType("flow");
        }

        var demand = new Array();

        var curD = t1 - 1; //ensure to add the first deadline even if == t1
        var element;
        var curC = 0;
        for (var i = 0; i < flow.tasks.length; i++) {
            var task = flow.tasks[i];
            if (task.a < t1)
                continue;
            if (task.D > curD) {
                curD = task.D;
                element = new Array(2);
                element[0] = curD - t1; //important!
                element[1] = curC + task.C;
                curC = element[1];
                Array.add(demand, element);
            } else if (task.D == curD) {
                element[1] += task.C;
                curC = element[1];
            }
        }

        return demand;
    },
    _calc_demandBound: function() { //assume flow.tasks already sorted calling flow.init_flow() in this._calc_criticalFlow()

        Array.clear(this.demandBound);

        var i = 0;
        var arrTimes = new Array();

        var flow = this;

        //get all arrival times
        for (i = 0; i < flow.tasks.length; i++) { //or use $.unique()
            var a = flow.tasks[i].a;
            if (!Array.contains(arrTimes, a))
                Array.add(arrTimes, a);
        }

        var demandBounds = new Array();
        for (i = 0; i < arrTimes.length; i++) {
            Array.add(demandBounds, this._calc_demandBound_t1(arrTimes[i], flow));
        }

        //see merge algorithm (demo-merge)  : TODO: better merge? -> see MRR-Search
        //get the minimun deadline and start with it
        var minD = Number.MAX_VALUE;
        var pointer_j = new Array(); //a pointer to each demandBounds
        for (i = 0; i < demandBounds.length; i++) {
            var element = demandBounds[i][0]; //first element of each demandBounds
            Array.add(pointer_j, 0); //first point to the first element

            if (element[0] < minD)
                minD = element[0];
        }

        var count = pointer_j.length; //0: all demandBounds are finished
        var secondMinD = Number.MAX_VALUE;
        var curC = 0;
        var preC = -1; //not 0 in case the first demand is 0
        var j = 0;

        while (count > 0) {
            var newelement = new Array(2);
            newelement[0] = minD;
            newelement[1] = curC;

            for (i = 0; i < demandBounds.length; i++) {
                var demandBound = demandBounds[i];
                var j = pointer_j[i];
                if (j >= demandBound.length) //already finished
                    continue;

                var element = demandBound[j];

                if (element[0] == minD) {
                    newelement[1] = Math.max(newelement[1], element[1]);
                    curC = newelement[1];
                    pointer_j[i]++;
                    if (pointer_j[i] >= demandBound.length)  //demandBound[i] is finished
                        count--;
                    else {
                        var next = demandBound[j + 1];
                        if (next[0] < secondMinD)
                            secondMinD = next[0];
                    }
                } else {  //not efficient when only demandBounds.length==1, need search twice -> ??
                    if (element[0] < secondMinD) {
                        secondMinD = element[0];
                    }
                }
            }

            if (newelement[1] != preC) //or use >
                Array.add(this.demandBound, newelement);
            else
                delete newelement;

            preC = newelement[1];

            minD = secondMinD;
            secondMinD = Number.MAX_VALUE;
        }

    }

};

Flow.registerClass('Flow');

/* Deadline assignment Alogrithm */
Mode_Deadline_Assignment = function() {
    throw Error.notImplemented();
}
Mode_Deadline_Assignment.prototype = {
    CHETTO_STAR: 1,
    CHETTO: 2
}
Mode_Deadline_Assignment.registerEnum('Mode_Deadline_Assignment');

/* Optimization Objective */
Mode_Opt_Goal = function(){
    throw Error.notImplemented();
}
Mode_Opt_Goal.prototype = {
    FRAGMENTATION: 1,
    TOTAL_BANDWIDTH: 2
}
Mode_Opt_Goal.registerEnum('Mode_Opt_Goal');

/* Heuristic Algorithm */ //Not used yet
Mode_Heuristic = function() {
    throw Error.notImplemented();
}
Mode_Heuristic.prototype = {
    MULTI_CRITICAL_PATH_FIT_ALL_CP: 1,
    MULTI_CRITICAL_PATH: 2,
    SINGLE_CRITICAL_PATH: 3,
    NO_CRITICAL_PATH: 4
}
Mode_Heuristic.registerEnum('Mode_Heuristic');

/* Using Fixed Partial Partition or Not  */
Mode_Fixed_Partial = function() {
    throw Error.notImplemented();
}
Mode_Fixed_Partial.prototype = {
    NOT_FIXED_PARTIAL: 1, // e.g., EXHUASTIVE
    FIXED_PARTIAL: 2
}
Mode_Fixed_Partial.registerEnum('Mode_Fixed_Partial');

/* class Application */
Application = function(params) {
    Application.initializeBase(this);
    this._id_prefix_node = "Task";
    this._id_prefix_flow = "flow";
    this.tasks = this._nodes; //give another name

    this.set_Params(params);
    this.set_Config([]);

    this.flows = new Array();
    this.partitions = new Array(); //array of string
    this.opt_partition = "";

    this.serialized_app = "";
    this.serialized_app_with_partition = "";
    this.serialized_partition = "";

    this.criticalPath = new Array(); //Array of relations, //TODO: now assumes no separated region
    this.criticalFlow = null; //TODO: could be more than 1 ,remember also change clear_Application()
    this.criticalPathNodes = new Array(); //nodes on criticalPath, can also access using relation.get_srcNode() & relation.get_desNode()
    this.topologicalOrderedArray = new Array();
    this.sequentialC = 0; //Sequential Execution Time == sum(all C)
    this.parallelC = 0; //Parallel Execution Time == sum(all C in criticalPath)
    this.parallelNumbers = new Array(); //used for flow function
    this.maxParallelNumber = 0; //max of flow function
    //this.demandBounds = new Array(); //used for demand bound function //Array of Array, each Array is demandBound function for a flow

    this.maxParallelFlows = 0; //no use?

    this.hasCycle = false; // set in this._calc_topologicalOrderedArray();
};

Application.prototype = {
    get_flow: function(id) {
        return Array.getById(this.flows, id);
    },
    get_partition: function(id) {
        return this.partitions[parseInt(id)];
    },
    add_partition: function(partition) {
        if (!String.isInstanceOfType(partition))
            throw Error.argumentType("String");

        Array.add(this.partitions, partition);
    },
    _parseFlowIndex: function(id) {
        return parseInt(id.slice(this._id_prefix_flow.length, id.length));
    },
    _calFlowPosition: function() {
        var flow = null; var id = null;
        for (var i = 0; i < this.flows.length; i++) {
            flow = this.flows[i];

            if (flow.tasks.length == 0) {
                this.remove_flow(flow);
                return i;
            }

            id = flow.id;

            var index = this._parseFlowIndex(id);

            if (i < index)
                return i;
        }

        return i;
    },
    add_flow: function(flow) {
        if (!Flow.isInstanceOfType(flow))
            throw Error.argumentType("flow");

        var position = this._calFlowPosition();
        Array.insert(this.flows, position, flow);
        //set id
        flow.id = this._id_prefix_flow + position;
    },
    remove_flow: function(flow) {
        if (!Flow.isInstanceOfType(flow))
            throw Error.argumentType("flow");

        for (var i = 0; i < flow.tasks.length; i++) {
            flow.tasks[i].flow = null;
        }
        flow.clear();

        Array.remove(this.flows, flow);
    },
    clean_emtpyFlows: function() {
        //for (var i = 0; i < this.flows.length; i++) {
        for (var i = this.flows.length - 1; i >= 0 ; i--) {
            if (this.flows[i].tasks.length <= 0) {
                Array.remove(this.flows, this.flows[i]);
            }
        }
    },
    isInPath: function(tasks) { //check if in a sequential path, used when create flow
        //now we only consider immediate predecessor & successor
        //TODO: what if 2 disconnected tasks -> still OK for our case

        if (!Array.isInstanceOfType(tasks)) {
            throw Error.argumentType("tasks");
        }

        var i = 0; var j = 0;
        for (var i = 0; i < tasks.length; i++) {
            if (!Task.isInstanceOfType(tasks[i])) {
                throw Error.argumentType(String.format("tasks[{0}]", i));
            }

            var task = tasks[i];

            var count = 0;
            for (j = 0; j < task.get_successors().length; j++) {
                var suc = task.get_successors()[j];
                if (Array.contains(tasks, suc))
                    count++;
            }
            if (count > 1) //more than 1 successor is in the path
                return false;

            var count = 0;
            for (j = 0; j < task.get_predecessors().length; j++) {
                var pre = task.get_predecessors()[j];
                if (Array.contains(tasks, pre))
                    count++;
            }
            if (count > 1) //more than 1 predecessor is in the path
                return false;
        }

        return true;

    },
    init_Application: function() {

        this.hasCycle = false;
        this._calc_topologicalOrderedArray(); //meanwhile identify if there is a cycle

        if (this.hasCycle == true) { //TODO: avoid calculating or plotting when DAG is not sound
            alert("DAG has cycle");
            return;
        }

        //following should be in order
        this._calc_criticalPath();
        this._calc_parallelNumbers();
        this._calcParams();

        this.setDeadlines();
        this.setArrivalTimes();

        this.clean_emtpyFlows();
        //this needs deadlines/arrival times set
        this._calc_criticalFlow();

    },
    clear_Application: function() {
        Array.clear(this.tasks); //this.nodes?
        Array.clear(this._relations);
        Array.clear(this.flows);
        Array.clear(this.partitions);

        Array.clear(this.criticalPath);
        //Array.clear(this.criticalFlow);
        this.criticalFlow = null;
        Array.clear(this.criticalPathNodes);
        Array.clear(this.topologicalOrderedArray);
        Array.clear(this.parallelNumbers);
        //Array.clear(this.demandBounds);

        this.sequentialC = 0;
        this.parallelC = 0;
        this.maxParallelNumber = 0;
        this.maxParallelFlows = 0;

        this.a = 0;
        this.D = 1;
        this.T = this.D;
        this.k = 0;

        this.opt_partition = "";
        this.serialized_app = "";
        this.serialized_app_with_partition = "";
        this.serialized_partition = "";
    },
    set_Params: function(params) {
        if (!Array.isInstanceOfType(params)) {
            this.D = 1;//params; //if params is only 1 number
            this.a = 0;
            this.T = this.D;
            this.k = 0;
            return;
        }

        this.D = (!params[0]) ? 1 : params[0];
        this.a = (!params[1]) ? 0 : params[1];
        this.T = (!params[2]) ? this.D : params[2];
        this.k = (!params[3]) ? 0 : params[3];

        // for (var i = 0; i < this.flows.length; i++) { //Note: all flows use the app.sigma
            // this.flows[i].k = this.k;
    },
    set_Config: function(config) {
        if (!Array.isInstanceOfType(config)) {
            this.mode_set_deadline = Mode_Deadline_Assignment.CHETTO_STAR;
            this.mode_opt_goal = Mode_Opt_Goal.FRAGMENTATION;
            this.mode_heuristics = Mode_Heuristic.MULTI_CRITICAL_PATH_FIT_ALL_CP;
            this.mode_opt_fixed_partial = Mode_Fixed_Partial.NOT_FIXED_PARTIAL;
            return;
        }

        this.mode_set_deadline = (!config[0]) ? Mode_Deadline_Assignment.CHETTO_STAR : config[0];
        this.mode_opt_goal = (!config[1]) ? Mode_Opt_Goal.FRAGMENTATION : config[1];
        this.mode_heuristics = (!config[2]) ? Mode_Heuristic.MULTI_CRITICAL_PATH_FIT_ALL_CP : config[2];
        this.mode_opt_fixed_partial = (!config[3]) ? Mode_Fixed_Partial.NOT_FIXED_PARTIAL : config[3];
    },
    parse_partition: function(flows){
        if (!Array.isInstanceOfType(flows)) {
            throw Error.argumentType("array");
        }

        for (var i = 0; i < flows.length; i++) { //TODO: add flow by id
            var newflow = new Flow();
            newflow.k = this.k;
            var flow = flows[i];
            for (var j = 0; j < flow.length; j++) {
                var task = this.get_node(this._id_prefix_node + flow[j]);
                newflow.add_task(task);
            }
            //newflow.init_flow(); //deadlines have not been set yet
            this.add_flow(newflow);
        }
    },
    parse: function(array) {
        if (!Array.isInstanceOfType(array)) {
            throw Error.argumentType("array");
        }
        if (array.length < 1) {
            throw Error.argumentOutOfRange("array", array.length, "length >= 1");
        }

        this.clear_Application(); //TODO: clear inside parse?

        var tasks = array[0];
        for (var i = 0; i < tasks.length; i++) {
            var newtask = new Task();

            this.add_node(newtask); //Array.add(this.tasks, task);

            newtask.C = tasks[i][0];

            if (tasks[i].length == 3) {
                newtask.X = tasks[i][1];
                newtask.Y = tasks[i][2];
            }
        }

        if (array.length < 2)
            return;

        //重置arrows
        if (this._arrows.length) {
            this.clearArrows();
        }
        
        var relations = array[1];
        for (var i = 0; i < relations.length; i++) {
            var relation = relations[i];
            var pre_id = this._id_prefix_node + relation[0];
            var suc_id = this._id_prefix_node + relation[1];
            var new_relation = this.addPrecedenceById(pre_id, suc_id);
            if (relation.length > 2) {
                new_relation.latency = relation[2];
            };

        }

        if (array.length < 3)
            return;

        var flows = array[2];
        this.parse_partition(flows);

        if (array.length < 4)
            return;

        var params = array[3];
        this.set_Params(params);

        if (array.length <5)
            this.set_Config([]);
        else
            this.set_Config(array[4]);
    },
    compact_nodes: function(){ /* index concern: used when some nodes in the middle of the nodes array */
        this.tasks.sort($.sortTasks_byId);

        for (var i = 0; i < this.tasks.length; i++) {
            if(this._parseNodeIndex(this.tasks[i].id)>i){
                this.tasks[i].id = this._id_prefix_node + i;
            }
        }
    },
    serialize: function() {
        this.compact_nodes();

        var sb = new Sys.StringBuilder("[\n");

        if (this.tasks.length <= 0) {
            sb.append("[]");
        } else {
            sb.append("[");
            sb.append(String.format("[{0},{1},{2}]", this.tasks[0].C, this.tasks[0].X, this.tasks[0].Y));
            for (var i = 1; i < this.tasks.length; i++) {
                sb.append(String.format(",[{0},{1},{2}]", this.tasks[i].C, this.tasks[i].X, this.tasks[i].Y));
            }
            sb.append("]");
        }

        if (this.get_relationNumber() <= 0) {
            sb.append(",\n[]");
        } else {
            sb.append(",\n[");
            var srcNode = this.get_relations()[0].get_srcNode();
            var desNode = this.get_relations()[0].get_desNode();
            sb.append(String.format("[{0},{1}]", this._parseNodeIndex(srcNode.id), this._parseNodeIndex(desNode.id)));
            for (var i = 1; i < this.get_relationNumber(); i++) {
                srcNode = this.get_relations()[i].get_srcNode();
                desNode = this.get_relations()[i].get_desNode();
                sb.append(String.format(",[{0},{1}]", this._parseNodeIndex(srcNode.id), this._parseNodeIndex(desNode.id)));
            }
            sb.append("]");
        }

        //save only the application without partition, to send to server
        //Notice: now we can specify whether to use fixed paritial partition before search
        //        So we always post the whole serialized app
        this.serialized_app = sb.toString() + ",\n[]"
                            + String.format(",\n[{0},{1},{2},{3}]", this.D, this.a, this.T, this.k);
                            //+ "\n]"; //need to append configuration info in the end

        //TODO: rewrite flow serialize
        // if(!includeFlow){//save only the application without partition, to send to server
            // this.serialized_app = sb.toString() + ",\n[]";
        // }else{//include flows, used for save applicaiton
            // var len = this.flows.length;
            // if( len > 0 ){
                // sb.append(",\n[");
                // for(var i=0;i<len;i++){
                    // var flow = this.flows[i];
                    // if(i==0)
                        // sb.append("[");
                    // else
                        // sb.append(",[");
                    // for(var j=0, len2=flow.tasks.length;j<len2;j++){
                        // var task = flow.tasks[j];
                        // if(j>0)
                            // sb.append(",");
                        // sb.append(this._parseNodeIndex(task.id));
                    // }
                    // sb.append("]")
                // }
                // sb.append("]");
            // }
        // }

        if (this.flows.length <= 0) {
            sb.append(",\n[]");
        } else {
            sb.append(",\n[[");
            var flow = this.flows[0];
            if (flow.tasks.length <= 0) { //should be impossible
                sb.append("[]");
            } else {
                sb.append(String.format("{0}", this._parseNodeIndex(flow.tasks[0].id)));
                for (var j = 1; j < flow.tasks.length; j++) {
                    sb.append(String.format(",{0}", this._parseNodeIndex(flow.tasks[j].id)));
                }
            }
            sb.append("]");
            for (var i = 1; i < this.flows.length; i++) {
                sb.append(",[");
                var flow = this.flows[i];
                if (flow.tasks.length <= 0) { //should be impossible
                    sb.append("[]");
                } else {
                    sb.append(String.format("{0}", this._parseNodeIndex(flow.tasks[0].id)));
                    for (var j = 1; j < flow.tasks.length; j++) {
                        sb.append(String.format(",{0}", this._parseNodeIndex(flow.tasks[j].id)));
                    }
                }
                sb.append("]");
            }
            sb.append("]");
        }

        sb.append(String.format(",\n[{0},{1},{2},{3}]", this.D, this.a, this.T, this.k));

        var config = String.format(",\n[{0},{1},{2},{3}]", this.mode_set_deadline, this.mode_opt_goal, this.mode_heuristics, this.mode_opt_fixed_partial);
        sb.append(config);
        this.serialized_app += config + "\n]";

        sb.append("\n]");

        var result = sb.toString();
        this.serialized_app_with_partition = result;

        return result;

    },
//    merge_serialized_partition: function() {
//        /*
//         * add the partition [ ... ] to the serialized_app [ ... ]
//         * the partition from server is in the format of [[flow1],[flow2]...]
//         */
//        var temp = this.serialized_app;
//        var index = temp.indexOf("[]");
//        return temp.substring(1,index)
//                + this.serialized_partition
//                + temp.substring(index+2,temp.length); //+2 to skip "[]"
//    },
    //    isAcyclic: function() {
    //        return true;
    //    },
    _calcParams: function() {
        var i = 0;
        this.sequentialC = 0;
        for (i = 0; i < this.tasks.length; i++) {
            this.sequentialC += this.tasks[i].C;
        }

        this.parallelC = 0;
        for (i = 0; i < this.criticalPathNodes.length; i++) { //Node: == max fin
            this.parallelC += this.criticalPathNodes[i].C;
        }
    },
    _calc_parallelNumbers: function() {
        Array.clear(this.parallelNumbers);

        //sort according to time
        //var times = new Array(2 * this.tasks.length); //Note: after using this, Array.add will add to the end
        var times = new Array();
        var element;
        for (var i = 0; i < this.tasks.length; i++) {
            var task = this.tasks[i];
            element = new Array(2);
            element[0] = task.fin - task.C;
            element[1] = "start";
            Array.add(times, element);
            element = new Array(2);
            element[0] = task.fin;
            element[1] = "fin";
            Array.add(times, element);
        }
        times.sort($.sortTimes_byTime);

        var time;
        var curTime = -1; //assume all tasks begin after 0
        var curCount = 0;
        this.maxParallelNumber = curCount;
        var element = null;
        for (var i = 0; i < times.length; i++) {
            var time = times[i];
            //if (time[0] != curTime) {
            if (!$.DBL_EQUAL(time[0],curTime)) {
                curTime = time[0];
                element = new Array(2);
                element[0] = curTime;
                if (time[1] == "start") {
                    element[1] = curCount + 1;
                } else {
                    element[1] = curCount - 1;
                }
                curCount = element[1];
                Array.add(this.parallelNumbers, element);
            } else {
                if (time[1] == "start") {
                    element[1] = curCount + 1;
                } else {
                    element[1] = curCount - 1;
                }
                curCount = element[1];
            }

            if (this.maxParallelNumber < curCount)
                this.maxParallelNumber = curCount;
        }
        //        var parallelC = this.parallelC;
        //        this.clearSearchState();
        //        var i = 0; var node; var minfin = parallelC;
        //        var curStartTime = 0;
        //        while (curStartTime < parallelC) {  //TODO: complexity is too high?
        //            minfin = parallelC;
        //            var block = new Array(2);
        //            block[0] = -1; //time
        //            block[1] = 0; //parallel number  -> wrong here, some tasks may be still running
        //            for (i = 0; i < this.topologicalOrderedArray.length; i++) {
        //                node = this.topologicalOrderedArray[i];
        //                if (node.visited == true)
        //                    continue;
        //                if (node.fin - node.C == curStartTime) { //start time of the node
        //                    block[0] = curStartTime
        //                    block[1]++;
        //                    node.visited = true;
        //                } else if (node.fin <= minfin) { //find the next finishing time
        //                    minfin = node.fin;
        //                }
        //            }

        //            curStartTime = minfin;
        //        }
    },
    _calc_criticalFlow: function() { //considers only 1 critical flow
        var maxC = 0;
        for (var i = 0; i < this.flows.length; i++) {
            var flow = this.flows[i];
            flow.init_flow();
            if (flow.C >= maxC) {
                maxC = flow.C
                this.criticalFlow = flow;
            }
        }
    },
    flowFunction: function(t) { //TODO
        return 0;
    },
    clearSearchState: function() {
        for (var i = 0; i < this.tasks.length; i++) {
            this.tasks[i].visited = false;
            this.tasks[i].finished = false;
            //this.tasks[i].fin = 0;
        }
    },
    _dfs: function(node, array) {
        if (this.hasCycle == true)
            return;

        node.visited = true;

        for (var i = 0; i < node.get_successors().length; i++) {
            var next = node.get_successors()[i];
            if (next.visited == false)
                this._dfs(next, array);
            //            else if (next.visited == true && next.finished == false) {
            else if (next.finished == false) {
                this.hasCycle = true;
                return; //break;
            }
        }

        node.finished = true;
        Array.insert(array, 0, node);
        //        for (var i = array.length - 1; i >= 0; i--) {
        //            if (array[i] == null) { //actually array[i] === undefined, initially
        //                array[i] = node;
        //                break;
        //            }
        //        }
    },
    _calc_topologicalOrderedArray: function() {
        Array.clear(this.topologicalOrderedArray);

        var i = 0;
        this.clearSearchState();

        //var orderedArray = new Array(this.tasks.length);
        for (i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].visited == false)
                this._dfs(this.tasks[i], this.topologicalOrderedArray);
        }

        return this.topologicalOrderedArray;
    },
    _calc_criticalPath: function() { //can not be defined in class PrecedenceGraph, becaue we need C of tasks
        Array.clear(this.criticalPath);
        Array.clear(this.criticalPathNodes);

        var array = this.topologicalOrderedArray;

        var i = 0; var j = 0;
        for (i = 0; i < array.length; i++) {
            array[i].fin = 0;
        }

        var maxfin = 0; var index = 0;
        var node;
        for (i = 0; i < array.length; i++) {
            node = array[i];

            if (node.get_predecessors().length == 0) //all nodes without predecessor
                node.fin = node.C;

            for (j = 0; j < node.get_successors().length; j++) {
                var next = node.get_successors()[j];
                next.fin = Math.max(next.fin, node.fin + next.C);
            }
            // no need to put in the j loop, because next node will be accessed later in the i loop
            if (node.fin >= maxfin) { //not >, avoid intermediate node. TODO: think deeper
                maxfin = node.fin;
                index = i;
            }
        }

        //index is the node with the highest fin
        node = array[index];

        /* criticalPath is Array of relations */
        while (node.get_incomingRelations().length != 0) {
            var fin = node.fin;
            for (var i = 0; i < node.get_incomingRelations().length; i++) {
                var relation = node.get_incomingRelations()[i];
                var pre = relation.get_srcNode();
                if (pre.fin + node.C == node.fin) { //TODO: what if more than 1 predecessors satisfy ==> more than 1 critical path?
                    Array.insert(this.criticalPath, 0, relation); //Array.add(this.criticalPath, relation);
                    Array.insert(this.criticalPathNodes, 0, node); //Array.add(this.criticalPathNodes, node);
                    node = pre;
                    break;
                }
            }
        }
        Array.insert(this.criticalPathNodes, 0, node); //the first node
    },
    setDeadlines: function() {
        if (this.D < this.parallelC) {
            alert("Application Deadline is smaller than parallel Execution Time.\nNow set to Parallel Execution Time");
            this.D = this.parallelC;
        }

        if (this.mode_set_deadline == Mode_Deadline_Assignment.CHETTO_STAR)
            var U = this.parallelC / this.D;
        else
            var U = 1.0;

        var array = this.topologicalOrderedArray;

        var i = 0; var j = 0;

        for (i = array.length - 1; i >= 0; i--) {
            var node = array[i];

            if (node.get_successors().length == 0) { //all nodes without successors
                node.D = this.D;
                continue;
            }

            var minD = Number.MAX_VALUE;
            for (j = 0; j < node.get_successors().length; j++) {
                var suc = node.get_successors()[j];
                if (suc.D - suc.C / U < minD)
                    minD = suc.D - suc.C / U;
            }
            node.D = minD;
        }
    },
    setArrivalTimes: function() { //considers flows
        var array = this.topologicalOrderedArray;
        var i = 0; var j = 0;

        for (var i = 0; i < array.length; i++) {
            array[i].a = 0;
        }

        for (var i = 0; i < array.length; i++) {
            var a_internal = 0;
            var a_external_max = 0; //Number.MIN_VALUE; //0;

            var task = array[i];
            if (task.get_predecessors().length == 0) { //global root node
                task.a = 0; // = this.a?
                continue;
            }
            for (j = 0; j < task.get_predecessors().length; j++) {
                var pre = task.get_predecessors()[j];
                if (pre.flow == task.flow) //internal predecessor
                    a_internal = pre.a;
                else
                    a_external_max = Math.max(a_external_max, pre.D); //2009-4-30 modified //a_external_max = pre.D;
            }

            task.a = Math.max(a_internal, a_external_max);
        }

    }
};

Application.registerClass('Application', PrecedenceGraph);
