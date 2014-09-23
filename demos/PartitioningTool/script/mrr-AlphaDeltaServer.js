/// <reference path="js/jquery-1.2.6.js" />
/// <reference path="js/MicrosoftAjax.js" />

Constraint = function(index, t, w, k) {
    this.index = index;
    this.t = t;
    this.w = w;
    this.k = k;
};

Constraint.prototype = {
    is_violated: function(alpha, delta) {
        // -1: alpha+k*(1-alpha)/delta <= 1 ; -2: alpha<=1 ; -3: delta>=0;
        if (this.t == -1) {
            if (alpha + this.k * (1 - alpha) / delta < 1 + epsilon)  //TODO: Note: <= 1
                return false;
            else
                return true;
        } else if (this.t == -2) {
            if (alpha <= 1)
                return false;
            else
                return true;
        } else if (this.t == -3) {
            if (delta >= 0)
                return false;
            else
                return true;
        } else {
            if (alpha * (this.t - delta) > this.w - epsilon) { //TODO: Note: >= w
                return false;
            } else {
                return true;
            }
        }
    }
};

Constraint.registerClass('Constraint');


AlphaDeltaServer = function(k, demand) {
    this.k = (!k) ? 0 : k;
    this.solution = new Array(2);

    this.baseConstraints = new Array();
    this.nonBaseConstraints = new Array();

    this.demandBoundFunc = (!demand) ? (new Array()) : demand;
    this.dbf_is_legal = true;

    this.MAX_ITERATION = 10000;
};

AlphaDeltaServer.prototype = {
    init: function() {
        Array.clear(this.solution);
        Array.clear(this.baseConstraints);
        Array.clear(this.nonBaseConstraints);

        if (!this._dbf_is_legal()) {
            alert("Demand Bound Function of this flow is not proper.\nMake sure utilization is no greater than 1.");
            return;
        }

        for (var i = 0; i < this.demandBoundFunc.length; i++) {
            var demand = this.demandBoundFunc[i];
            var constraint = new Constraint(i, demand[0], demand[1], this.k);
            Array.add(this.nonBaseConstraints, constraint);
        }

        //add constraints where t=-1,-2,-3
        //-1: alpha+k*(1-alpha)/delta <= 1 ; -2: alpha<=1 ; -3: delta>=0;
        Array.add(this.nonBaseConstraints, new Constraint(i++, -1, -1, this.k));
        Array.add(this.nonBaseConstraints, new Constraint(i++, -2, -2, this.k));
        Array.add(this.nonBaseConstraints, new Constraint(i++, -3, -3, this.k));
    },
    _dbf_is_legal: function() {
        for (var i = 0; i < this.demandBoundFunc.length; i++) {
            var t = this.demandBoundFunc[i][0];
            var w = this.demandBoundFunc[i][1];

            if (t < w) {
                this.dbf_is_legal = false;
                return false;
            }
        }
        this.dbf_is_legal = true;
        return true;
    },
    _get_constraint: function(array, index) {
        for (var i = 0; i < array.length; i++) {
            var cons = array[i];
            if (cons.index == index) {
                return cons;
            }
        }
    },
    _put_B: function(constraint) {
        Array.add(this.baseConstraints, constraint);
        Array.remove(this.nonBaseConstraints, constraint);
    },
    _take_B: function(constraint) {
        Array.remove(this.baseConstraints, constraint);
        Array.add(this.nonBaseConstraints, constraint);
    },
    _solve_1_constraint: function(constraint) {
        var t = constraint.t;
        var w = constraint.w;

        if (t == w || t == -1 || t == -2 || t == -3)
            return [1, 0];
        else {
            var k = this.k;

            var tmp = (w - k) / k / (t - w);

            var delta = (Math.sqrt(1 + t * tmp) - 1) / tmp;
            var alpha = w / (t - delta);
            return [alpha, delta];
        }
    },
    _solve_2_constraints: function(constraint1, constraint2) {
        var t1 = constraint1.t;
        var t2 = constraint2.t;
        var w1 = constraint1.w;
        var w2 = constraint2.w;

        var alpha, delta;
        if (t1 == -2 || t2 == -2 || t1 == -3 || t2 == -3) {
            alpha = 1;
            delta = 0;
        } else if (t1 == -1) {
            delta = this.k;
            alpha = w2 / (t2 - this.k);
        } else if (t2 == -1) {
            delta = this.k;
            alpha = w1 / (t1 - this.k);
        } else {
            alpha = (w1 - w2) / (t1 - t2);
            delta = t1 - w1 / alpha;
        }

        return [alpha, delta];
    },
    _is_feasible: function(solution) {
        var alpha = solution[0]
        var delta = solution[1];

        for (var i = 0; i < this.nonBaseConstraints.length; i++) {
            var constraint = this.nonBaseConstraints[i];
            if (constraint.is_violated(alpha, delta)) {
                return constraint;
            }
        }

        return -1;
    },
    cost: function(alpha, delta) {
		if(this.k==0)
			return alpha;
		else if (delta == 0)
            return 1;
        else if (alpha == 0)
            return 0;
        else
            return alpha + this.k * (1 - alpha) / delta;
    },
    solve: function() {
        if (!this.dbf_is_legal) {
            return;
        }

        if (this.k == 0) { //TODO: correct?
            var max_alpha = 0;
            for (var i = 0; i < this.demandBoundFunc.length; i++) {
                var demand = this.demandBoundFunc[i];
                max_alpha = Math.max(max_alpha, demand[1] / demand[0]);
            }

            this.solution[0] = max_alpha;
            this.solution[1] = 0;
            return true;
        }

        this._put_B(this._get_constraint(this.nonBaseConstraints, 0));
        var sol;
        if (this.baseConstraints.length == 1) {
            var cons = this.baseConstraints[0];
            sol = this._solve_1_constraint(cons);
        } else if (this.baseConstraints.length == 2) {
            var cons1 = this.baseConstraints[0];
            var cons2 = this.baseConstraints[1];
            sol = this._solve_2_constraints(cons1, cons2);
        }

        var iter = 0;
        while (iter < this.MAX_ITERATION) {
            iter++;

            var result = this._is_feasible(sol);
            if (result == -1) {
                this.solution[0] = sol[0];
                this.solution[1] = sol[1];
                return true; // feasible solution found
            } else {
                //if (iter > this.MAX_ITERATION)
                //    return false;
                if (this.baseConstraints.length == 1) {
                    var cons_B = this.baseConstraints[0];
                    var cons_violated = result; //this.nonBaseConstraints[result];

                    var sol1 = this._solve_1_constraint(cons_violated);
                    var sol2 = this._solve_2_constraints(cons_B, cons_violated);

                    var v1 = this.cost(sol1[0], sol1[1]);
                    var v2 = this.cost(sol2[0], sol2[1]);

                    var pick = -1;
                    if (cons_B.is_violated(sol1[0], sol1[1]))
                        pick = 1;
                    else {
                        if (v1 <= v2)
                            pick = 0;
                        else
                            pick = 1;
                    }
                    if (pick == 0) {
                        this._take_B(cons_B);
                        this._put_B(cons_violated);
                        sol = sol1;
                    } else {
                        this._put_B(cons_violated);
                        sol = sol2;
                    }

                    //                    if (v1 <= v2) { //v1 is better
                    //                        this._take_B(cons_B);
                    //                        this._put_B(cons_violated);
                    //                        sol = sol1;
                    //                    } else {
                    //                        this._put_B(cons_violated);
                    //                        sol = sol2;
                    //                    }
                } else if (this.baseConstraints.length == 2) {
                    var sols = new Array(3);
                    var v = new Array(3);
                    var cons_B_1 = this.baseConstraints[0];
                    var cons_B_2 = this.baseConstraints[1];
                    var cons_violated = result; //this.nonBaseConstraints[result];

                    sols[0] = this._solve_1_constraint(cons_violated);
                    sols[1] = this._solve_2_constraints(cons_B_1, cons_violated);
                    sols[2] = this._solve_2_constraints(cons_B_2, cons_violated);

                    var min = -1;
                    var pick = -1;
                    v[0] = this.cost(sols[0][0], sols[0][1]);
                    v[1] = this.cost(sols[1][0], sols[1][1]);
                    v[2] = this.cost(sols[2][0], sols[2][1]);
                    for (var i = 0; i < 3; i++) {
                        if (!cons_B_1.is_violated(sols[i][0], sols[i][1]) && !cons_B_2.is_violated(sols[i][0], sols[i][1])) {
                            if (min == -1) {
                                min = v[i];
                                pick = i;
                            }
                            else {
                                if (v[i] < min) {
                                    min = v[i];
                                    pick = i;
                                }
                            }
                        }
                    }                    
                    //                    if (v1 <= v2) {
                    //                        if (v1 <= v3) {
                    //                            min = 1;
                    //                        } else {
                    //                            min = 3;
                    //                        }
                    //                    } else {
                    //                        if (v2 <= v3) {
                    //                            min = 2;
                    //                        } else {
                    //                            min = 3;
                    //                        }
                    //                    }

                    if (pick == 0) {
                        this._take_B(cons_B_1);
                        this._take_B(cons_B_2);
                        this._put_B(cons_violated);
                    } else if (pick == 1) {
                        this._take_B(cons_B_2);
                        this._put_B(cons_violated);
                    } else {
                        this._take_B(cons_B_1);
                        this._put_B(cons_violated);
                    }
                    sol[0] = sols[pick][0];
                    sol[1] = sols[pick][1];
                }
            }
        }
        ;
    },
    printout: function() {
        $('#mrr-logwindow').html(String.format("alpha={0},delta={1}", this.solution[0], this.solution[1]));
    }
};

AlphaDeltaServer.registerClass('AplhaDeltaServer');
