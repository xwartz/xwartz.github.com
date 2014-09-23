
$(function(){

	var ENTER_KEY = 13;

  // Todo Model
  
  var Todo = Backbone.Model.extend({

    // Default attributes
    defaults: function() {
      return {
        title: '',
        order: Todos.nextOrder(),
        done: false
      };
    },

    // Toggle the `done` state of this todo item.
    toggle: function() {
      this.save({done: !this.get("done")});
    }

  });

  // Todo Collection
  // ---------------

  // 使用localStorage保存

  var TodoList = Backbone.Collection.extend({

    model: Todo,

    // 保存到"todos-backbone"
    localStorage: new Backbone.LocalStorage("todos-backbone"),

    // 筛选出已完成
    done: function() {
      return this.where({done: true});
    },

    remaining: function() {
      return this.where({done: false});
    },

    //按插入先后排序
    nextOrder: function() {
      if (!this.length){
      	return 1;
      }else{
      	return this.last().get('order') + 1;
      }
    },
    //排序法则
    comparator: 'order'

  });

  // 创建一个全局的Todo Collection
  var Todos = new TodoList();


  // Todo Item View
  // --------------

  var TodoView = Backbone.View.extend({

    tagName:  "li",

    // 使用underscroe的_.template()
    template: _.template($('#item-template').html()),

    // 定义事件
    events: {
      "click .toggle"   : "toggleDone",
      "dblclick .view"  : "edit",
      "click a.destroy" : "clear",
      "keypress .edit"  : "updateOnEnter",
      "blur .edit"      : "close",
      "keydown .edit"   : "escKeyDown"
    },

    
    initialize: function() {
    	//绑定事件
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },

    //el为'li'
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      this.$el.toggleClass('done', this.model.get('done'));//切换样式,true添加,false移除
      this.input = this.$('.edit');
      return this;
    },

    toggleDone: function() {
      this.model.toggle();
    },

    edit: function() {
      this.$el.addClass("editing");
      this.input.focus();
    },

    close: function() {
      var value = this.input.val();
      if (!value) {
        this.clear();
      } else {
        this.model.save({title: value});
        this.$el.removeClass("editing");
      }
    },

    updateOnEnter: function(e) {
    	// var oEvent = e || window.event
      if (e.keyCode == ENTER_KEY) 
        this.close();
    },

    clear: function() {
      this.model.destroy();
    },

    escKeyDown: function (e) {
      if (e.keyCode == 27) {
        this.close();
      }
    }

  });



  // The Application
  // ---------------

  var AppView = Backbone.View.extend({

    //直接设置el
    el: $("#todoapp"),

    statsTemplate: _.template($('#stats-template').html()),

    
    events: {
      "keypress #new-todo":  "createOnEnter",
      "click #clear-completed": "clearCompleted",
      "click #toggle-all": "toggleAllComplete"
    },

    
    initialize: function() {

      this.input = this.$("#new-todo");
      this.allCheckbox = this.$("#toggle-all")[0];

      this.listenTo(Todos, 'add', this.addOne);
      this.listenTo(Todos, 'reset', this.addAll);   
      this.listenTo(Todos, 'all', this.render);   //任意改动都触发render

      this.footer = this.$('footer');
      this.main = $('#main');

      //从服务器(LocalStorage)获取然后调用reset重置app
      Todos.fetch();
    },

    
    render: function() {
      var done = Todos.done().length;
      var remaining = Todos.remaining().length;

      if (Todos.length) {
        this.main.show();
        this.footer.show();
        this.footer.html(this.statsTemplate({done: done, remaining: remaining}));
      } else {
        this.main.hide();
        this.footer.hide();
      }

      this.allCheckbox.checked = !remaining;
    },

    //添加model
    addOne: function(todo) {
      var view = new TodoView({model: todo});
      this.$("#todo-list").append(view.render().el);
    },

    //reset
    addAll: function() {
      Todos.each(this.addOne, this);
    },

    
    createOnEnter: function(e) {
    	// var oEvent = e || window.event;
      if (e.keyCode != ENTER_KEY || !this.input.val())
      	return;

      Todos.create({title: this.input.val()});
      this.input.val('');
    },

    //清除掉完成的
    clearCompleted: function() {
      _.invoke(Todos.done(), 'destroy');  //每个done执行destroy
      return false;
    },

    toggleAllComplete: function () {
      var done = this.allCheckbox.checked;
      Todos.each(function (todo) { todo.save({'done': done}); });
    }

  });

  //创建AppView
  var App = new AppView();

});
