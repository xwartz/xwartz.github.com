/// <reference path="js/jquery-1.2.6.js" />
/// <reference path="js/MicrosoftAjax.js" />

/* class ViewNode */
ViewNode = function() {
    this.X = 20;
    this.Y = 20;
};

ViewNode.registerClass('ViewNode');

/* class ViewRelation */
ViewRelation = function() {
    
};

ViewRelation.registerClass('ViewRelation');

/* class Node */
Node = function() {
    Node.initializeBase(this);

    this.id = null;
    this._predecessors = new Array();
    this._successors = new Array();
    this._outgoingRelations = new Array();
    this._incomingRelations = new Array();

    //for search & critical search
    this.visited = false;
    this.finished = false;
    this.isSelected = false;
    this.fillColor = 'ghostwhite';
};

Node.prototype = {
    add_predecessor: function(node) {
        Array.add(this._predecessors, node);
    },
    remove_predecessor: function(node) {
        Array.remove(this._predecessors, node);
    },
    add_successor: function(node) {
        Array.add(this._successors, node);
    },
    remove_successor: function(node) {
        Array.remove(this._successors, node);
    },
    get_predecessor: function(id) {
        return Array.getById(this._predecessors, id);
    },
    get_successor: function(id) {
        return Array.getById(this._successors, id);
    },
    get_predecessors: function() {
        return this._predecessors;
    },
    get_successors: function() {
        return this._successors;
    },
    get_outgoingRelations: function() {
        return this._outgoingRelations;
    },
    get_incomingRelations: function() {
        return this._incomingRelations;
    },
    add_outgoingRelation: function(relation) {
        Array.add(this._outgoingRelations, relation);
    },
    add_incomingRelation: function(relation) {
        Array.add(this._incomingRelations, relation);
    },
    remove_outgoingRelation: function(relation) {
        Array.remove(this._outgoingRelations, relation);
    },
    remove_incomingRelation: function(relation) {
        Array.remove(this._incomingRelations, relation);
    }
};

//Node.registerClass('Node');
Node.registerClass('Node',ViewNode);

/* class relation */
Relation = function() {
    Relation.initializeBase(this);

    this.id= null;
    this._srcNode = null;
    this._desNode = null;

    this.latency = 0.0;

    //for search
    this.deleted = false;
    this.isSelected = false;
};

Relation.prototype = {
    get_srcNode: function() {
        return this._srcNode;
    },
    set_srcNode: function(value) {
        this._srcNode = value;
    },
    get_desNode: function() {
        return this._desNode;
    },
    set_desNode: function(value) {
        this._desNode = value;
    }
};

//Relation.registerClass('Relation');
Relation.registerClass('Relation',ViewRelation);


/* class PrecedenceGraph */
PrecedenceGraph = function() {
    this._id_prefix_node = "node";
    this._id_prefix_relation = "relation";
    this._nodes = new Array();
    this._relations = new Array();
    this._arrows = [];
};

PrecedenceGraph.prototype = {
    _parseNodeIndex: function(id) {
        return parseInt(id.slice(this._id_prefix_node.length, id.length));
    },
    _parseRelationIndex: function(id) {
        return parseInt(id.slice(this._id_prefix_relation.length, id.length));
    },
    _calNodePosition: function() {
        var node = null; var id = null;
        for (var i = 0; i < this._nodes.length; i++) {
            node = this._nodes[i];
            id = node.id;

            var index = this._parseNodeIndex(id);

            if (i < index)
                return i;
        }

        return i; //for the first node
    },
    _calRelationPosition: function() {
        var relation = null; var id = null;
        for (var i = 0; i < this._relations.length; i++) {
            relation = this._relations[i];
            id = relation.id; // id = relation.get_id();

            var index = this._parseRelationIndex(id);

            if (i < index)
                return i;
        }

        return i;
    },
    get_nodeNumber: function() {
        return this._nodes.length;
    },
    get_nodes: function() {
        return this._nodes;
    },
    get_node: function(id) {
        return Array.getById(this._nodes, id);
    },
    add_node: function(node) {
        if (!Node.isInstanceOfType(node))
            throw Error.argumentType("node");

        var position = this._calNodePosition();
        Array.insert(this._nodes, position, node);
        //set id
        node.id = this._id_prefix_node + position;
    },
    remove_node: function(node) {
        if (!Node.isInstanceOfType(node))
            throw Error.argumentType("node");

        var ins = node.get_incomingRelations();
        for (var i = ins.length - 1; i >= 0; i--) {//Note: if using i=0, i++, after remove a relation, the ins.length will decrease
            this.remove_relation(ins[i]);
        }
        var outs = node.get_outgoingRelations();
        for (var i = outs.length - 1; i >= 0; i--) {
            this.remove_relation(outs[i]);
        }

        Array.remove(this._nodes, node);
        delete node;
    },
    get_relationNumber: function() {
        return this._relations.length;
    },
    get_relations: function() {
        return this._relations;
    },
    get_relation: function(id) {
        return Array.getById(this._relations, id);
    },
    add_relation: function(relation) {
        if (!Relation.isInstanceOfType(relation))
            throw Error.argumentType("relation");

        var position = this._calRelationPosition();
        Array.insert(this._relations, position, relation);
        //set id
        relation.id = this._id_prefix_relation + position;

        //add arrow
        var arrow = {};
        var pre_task = relation._srcNode;
        var suc_task = relation._desNode;
        arrow.X = (pre_task.X + suc_task.X) / 2;
        arrow.Y = (pre_task.Y + suc_task.Y) / 2;
        arrow.id = position;
        this.add_arrow(arrow);
    },

    add_arrow: function (arrow) {
        this._arrows.push(arrow);
    },

    get_arrowNumber: function () {
          return this._arrows.length;
    },

    get_arrows: function () {
        return this._arrows;
    },

    getArrowById: function (id) {
        return Array.getById(this._arrows, id);
    },

    remove_arrow: function (arrow) {
        Array.remove(this._arrows, arrow);
        delete arrow;
    },

    clearArrows: function () {
      Array.clear(this._arrows);
    },

    getRelationIndex: function (id) {
        return parseInt(id.slice('relation'.length, id.length));
    },


    remove_relation: function(relation) {
        if (!Relation.isInstanceOfType(relation))
            throw Error.argumentType("relation");

        var srcNode = relation.get_srcNode();
        var desNode = relation.get_desNode();

        srcNode.remove_successor(desNode);
        srcNode.remove_outgoingRelation(relation);
        desNode.remove_predecessor(srcNode);
        desNode.remove_incomingRelation(relation);

        Array.remove(this._relations, relation);
        delete relation;

        var id = this.getRelationIndex(relation.id);
        var arrow = this.getArrowById(id);
        this.remove_arrow(arrow);
    },
    has_relation: function(node1, node2) {
        if (!Node.isInstanceOfType(node1))
            throw Error.argumentType("node1");
        if (!Node.isInstanceOfType(node2))
            throw Error.argumentType("node2");

        var relation = null;
        for (var i = 0; i < this._relations.length; i++) {
            relation = this._relations[i];
            var srcnode = relation.get_srcNode();
            var desnode = relation.get_desNode();

            if (srcnode == node1 && desnode == node2) //relation: node1 -> node2
                return 1;
            else if (srcnode == node2 && desnode == node1) //relation: node1 <- node2
                return 2;
        }

        return 0;
    },
    has_relationById: function(id1, id2) {
        return this.has_relation(this.get_node(id1), this.get_node(id2));
    },
    addPrecedence: function(predecessor, successor) {
        if (!Node.isInstanceOfType(successor))
            throw Error.argumentType("successor");
        if (!Node.isInstanceOfType(predecessor))
            throw Error.argumentType("predecessor");

        successor.add_predecessor(predecessor);
        predecessor.add_successor(successor);

        var relation = new Relation();
        relation.set_srcNode(predecessor);
        relation.set_desNode(successor);
        this.add_relation(relation);

        successor.add_incomingRelation(relation);
        predecessor.add_outgoingRelation(relation);

        return relation;
    },
    addPrecedenceById: function(pre_id, suc_id) {
        return this.addPrecedence(this.get_node(pre_id), this.get_node(suc_id));
    },
    removePrecedence: function(id) {
        if (!Node.isInstanceOfType(successor))
            throw Error.argumentType("successor");
        if (!Node.isInstanceOfType(predecessor))
            throw Error.argumentType("predecessor");

        var relation = this.get_relation(id);
        predecessor = relation.get_srcNode();
        successor = relation.get_desNode();
        successor.remove_predecessor(predecessor);
        predecessor.remove_successor(successor);
        successor.remove_incomingRelation(relation);
        predecessor.remove_outgoingRelation(relation);

        this.remove_relation(relation);
    }
};

PrecedenceGraph.registerClass('PrecedenceGraph');
