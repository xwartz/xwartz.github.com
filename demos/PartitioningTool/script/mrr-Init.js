$(document).ready(function() {

	//jQuery UI
	function runToggle(ele){
		options={};
		ele.toggle('blind',options,500);
	};
	function changeToggleButton(ele){
		ele.toggleClass('ui-icon-plus', 0);
	};
	$("#btn-toggle-pGraph").click(function() {
		runToggle($("#pGraphCanvas"));
		changeToggleButton($("#btn-toggle-pGraph"));
		return false;
	});
	$("#btn-toggle-timeLine").click(function() {
		runToggle($("#timeLineCanvas"));
		changeToggleButton($("#btn-toggle-timeLine"));
		return false;
	});
	$("#btn-toggle-dbf").click(function() {
		runToggle($("#dbfCanvas"));
		changeToggleButton($("#btn-toggle-dbf"));
		return false;
	});

	$('#pGraph-subtitle').editable({editClass:'editable-input-text'});


	$('#Panel').tabs();
	$('#Panel').draggable({ handle: '#Panel-title' });
	//$('#Log').draggable({ handle: '#Log-title'}); //text not selectable

	function changeContainerSiez (width) {
		$('#container_pGraph').width(width);
	  $('#container_timeline').width(width);
	}

	$('#pGraphCanvas').resizable({
		maxWidth: 900,
		minHeight: $('#pGraphCanvas').height(),
		minWidth: $('#pGraphCanvas').width(),
		resize: function(event,ui) {
			$('#drawGraph').attr('height', ui.size.height - 7);
			$('#drawGraph').attr('width', ui.size.width - 7);
			$('#drawGraph').trigger('changeSiez');  //re-draw canvas
			$('#container_pGraph').width(ui.size.width);
			// changeContainerSiez(ui.size.width);
			// $('#timeLineCanvas').width(ui.size.width);
			// $('#drawTimeLine').attr('width', ui.size.width);
		}
	});

	$('#timeLineCanvas').resizable({
		maxWidth: 900,
		minHeight: $('#timeLineCanvas').height(),
		minWidth: $('#timeLineCanvas').width(),
		resize: function(event,ui) {
			$('#drawTimeLine').attr('height', ui.size.height - 20);
			$('#drawTimeLine').attr('width', ui.size.width);
			$('#drawTimeLine').trigger('changeTimeLineSiez');
			$('#container_timeline').width(ui.size.width);
			// changeContainerSiez(ui.size.width);
			// $('#pGraphCanvas').width(ui.size.width);
			// $('#drawGraph').attr('height', ui.size.width - 7);
		}
	});

	$('#dbfCanvas').resizable({
		maxWidth: 900,
		minHeight: $('#dbfCanvas').height(),
		minWidth: $('#dbfCanvas').width(),
		resize: function(event,ui) {
			$('#drawDemand').attr({
				'height': ui.size.height,
				'width': ui.size.width
			}).trigger('changeDemandSiez');
			$('#container_dbf').width(ui.size.width);
		}
	});

	$('#dialog').dialog({ autoOpen: false, width: 600, position: 'center',
		buttons: { "Ok": function() { $(this).dialog("close");},
				   "Cancel": function() { $(this).dialog("close");}
	}});
	$('#dialog_link').click(function() {
		$('#dialog').dialog('open');
		return false;
	});

	$('#dialog-load').dialog({ autoOpen: false, width: 400, position: 'center',
		buttons: { "Close": function() { $(this).dialog("close");} },
		modal: true
	});
	$('#a-btn-load').bind('click', function(event) { $('#dialog-load').dialog('open');return false; });
	// $('#form-load-app').ajaxForm({
	// 		dataType:'json',
	// 		success: function (data) {
	// 			pView.openApp(data);
	// 			$('#a-create-window').val("");
	// 			$('#dialog-load').dialog('close');
	// 			pView.update_title($('#load-file-name').val());
	// 		}
	// });
  
   uploadAndOpenApp = function() {
  	var form = $('#form-load-app')[0];
  	var file = $('#uploadfile')[0];
  	if (file.files.length) {
	        var reader = new FileReader();
	        if (/text\/\w+/.test(file.files[0].type)) {
	            reader.onload = function() {
	            	var data = this.result;
	            	pView.openApp(data);
	            	$('#a-create-window').val("");
	            	$('#dialog-load').dialog('close');
	            	pView.update_title($('#load-file-name').val());
	            }
	            reader.readAsText(file.files[0]);
	        }
  	    }
  };

	$('#uploadfile').change(function(){
		var fullname = $(this).val();
		var index = fullname.lastIndexOf('/');
		if(index == -1)
			index = fullname.lastIndexOf('\\');
		index = index == -1 ? 0:index;
		index_dot = fullname.lastIndexOf('.');
		index_dot = index_dot < index ? fullname.length:index_dot;
		var filename = fullname.substring(index+1, index_dot);
		$('#load-file-name').val(filename);
	});

	graphCanvas = $('#drawGraph')[0];
	graphContext = graphCanvas.getContext("2d");

	timeLineCanvas = $('#drawTimeLine')[0];
	timeLineContext = timeLineCanvas.getContext('2d');

	demandBoundCanvas = $('#drawDemand')[0];
	demandBoundContext = demandBoundCanvas.getContext('2d');

	initApplication();
	init_pGraphViewEngine();

	});

	function initApplication() {
		/* initiate application */
		app = new Application([25, 0]);

		app.parse(Array.parse("[[[4],[1],[5],[2],[3]],[[0,1],[0,3],[1,4],[1,2],[3,4]],[],[20,0,0,0.1]]"));
		app.init_Application();
	}

	function init_pGraphViewEngine() {
		on_Canvas_timeLine_load();
	}

	function on_Canvas_timeLine_load() {
		init_appViewEngine();
	}

	function init_appViewEngine() {
		pView = new appViewEngine(); //make it global
		pView.init_ViewEngine(app);

		pView.drawAll();

		$('#drawGraph').on('changeSiez',function () {
			pView.drawAll();
		});

		$('#drawTimeLine').on('changeTimeLineSiez', function(){
			pView.drawAll();
		})

		$('#drawDemand').on('changeDemandSiez', function(){
			pView.drawAll();
		})

		$('#pGraphCanvas').imgAreaSelect({
			handles: false,
			autoHide: true,
			onSelectEnd: function(ele, selection, event) {
				pView.onDragSelectNodes(selection, event)
			},
			shift: 'resize'
		});

		/* events */
		//$('#pGraphCanvas').attr('onmousemove','pView.now_drag(event)'); //does not work in Safari/chrome
		// $('#pGraphCanvas').bind('mousemove',function(event) { pView.now_drag(event); });

		$('#n-btn-remove').bind('click', function(event) {
			pView.removeNodes();
			pView.update_view_after_app_changed();
		});

		$('#n-btn-add').bind('click', function(event) {
			pView.addNode();
			pView.update_view_after_app_changed();
		});
		//$('#n-btn-set').bind('click', function(event) { pView.setNodeParam(); pView.update_view_after_app_changed();});
		$('#n-C').bind('blur', function(event) {
			pView.setNodeParam();
			pView.update_view_after_app_changed();
		});

		$('#n-btn-conn').bind('click', function(event) { pView.addPrecedenceToSelectedNodes(); pView.update_view_after_app_changed(); });
		$('#r-btn-remove').bind('click', function(event) { pView.removeRelation(); pView.update_view_after_app_changed();});

		$('#r-c').bind('blur', function(event) {
			pView.setRelationParam();
			pView.update_view_after_app_changed();
		});

		$('#f-select-flows').change( function() { pView.onSelectFlowClick($(this)); });
		//$('#f-btn-set').bind('click', function(event) { pView.on_setFlowParams_click(); pView.on_drawDemand_click(); });
		$('#f-btn-flow').bind('click', function(event) { pView.on_createFlow_click(); pView.on_drawDemand_click(); });
		//$('#n-btn-unflow').bind('click', function(event) { pView.on_cancelFlow_click(); });
		$('#f-btn-remove').bind('click', function(event) { pView.on_removeFlow_click(); pView.on_drawDemand_click(); });
		$('#f-btn-opt').click(function() {
			//pView.on_optPartition_click(); //TODO: this causes wrong behavior of the callback function in getJSON()
			pView.clean_last_server_result();
			$('#cost-B').html('<img src="pic/ajax-loader.gif" />');
			$('#cost-beta').html('<img src="pic/ajax-loader.gif" />');
			app.serialize();
			//don't pass manual partition info to save'bandwidth, when fixed partial mode is not used
			var post_app = $('input[name=f-mode-fixed-partial]').is(':checked') ? app.serialized_app : app.serialized_app_with_partition;
			$.post('../cgi-bin/cgi-script.py',{method: "search", app:post_app,},
				function(data){
					pView.on_Search_click_callback(data);
				},'json'); //getJSON only issues GET method, the amount of the send data may be limited (by brower)
		});
		$('#f-btn-h1').click(function() {
			pView.clean_last_server_result();
			$('#cost-B').html('<img src="pic/ajax-loader.gif" />');
			$('#cost-beta').html('<img src="pic/ajax-loader.gif" />');
			app.serialize();
			$.post('../cgi-bin/cgi-script.py',{method:"heuristics", app:app.serialized_app}, //don't pass manual partition
																  //info to save'bandwidth
				function(data){
					pView.on_Heuristic_click_callback(data);
				},'json'); //getJSON only issues GET method, the amount of the send data may be limited (by brower)
		});
		$('#f-select-partitions').change(function() {
			var id = $(this).val(); pView.on_selectPartition_change(id);
		});
		//$('#f-btn-save').bind('click', function(event) { pView.on_partitionSave_click(); });


		//$('#a-btn-show').bind('click', function(event) { pView.on_showAppParams_click(); });
		$('#a-btn-set').bind('click', function(event) { pView.on_setAppParams_click(); pView.update_view_after_app_changed(); });
		$('#a-btn-topo').bind('click', function(event) {
			pView.onTopologicalClick();
		});
		$('#a-btn-path').bind('click', function(event) {
			pView.onCriticalPathClick();
		});
		//$('#a-btn-timeline').bind('click', function(event) { pView.on_drawTimeLine_click(); });
		//$('#a-btn-demand').bind('click', function(event) { pView.on_drawDemand_click(); });
		$('#a-btn-create').bind('click', function(event) {
			pView.on_appCreate_click();
		});
		$('#a-btn-save').bind('click', function(event) { pView.on_appSave_click(); });
		$("input[name='mode-d-set-option']").change(function(){ pView.on_mode_d_assignment_change(); });
		$("input[name='opt-goal-option']").change(function(){ pView.on_mode_opt_goal_change(); });
		$("input[name='f-mode-fixed-partial']").change(function(){ pView.on_mode_opt_fixed_partial_change(); });
		$('#f-select-mode-heuristics').change(function(){ pView.on_mode_heuristics_change(); });



		$('#l-btn-clear').bind('click', function(event) { $.clearlog(); });

		$('#dialog-app1').dialog({ autoOpen: false, width: 500, position: 'right', modal: true,
			buttons: { "Create": function() { 	pView.openApp("[[[2,90,176],[3,209,183],[6,295,184],[3,208,261],[5,210,36],[3,297,260],[5,209,109],[6,291,110],[4,415,173]],\
															[[0,1],[1,2],[0,6],[0,3],[0,4],[6,7],[2,8],[7,8],[3,5],[5,8]],\
															[],\
															[20,0,20,0.1]]");
												$(this).dialog("close");
												pView.update_title($('#ui-dialog-title-dialog-app1').html());
											},
					   "Cancel": function() { $(this).dialog("close"); }
		}});
		$('#a-btn-app1').click(function() {
			$('#dialog-app1').dialog('open');
			return false;
		});

		$('#dialog-app2').dialog({ autoOpen: false, width: 500, position: 'right', modal: true,
			buttons: { "Create": function() { 	pView.openApp("[[[2,50,142],[3,137,98],[6,224,153],[3,128,196],[5,292,197],[3,305,101],[5,229,56],[6,221,250],[4,416,144]],\
															[[0,1],[3,2],[3,7],[1,6],[4,8],[3,4],[0,5],[5,8]],\
															[],\
															[15,0,15,0.1]]");
												$(this).dialog("close");
												pView.update_title($('#ui-dialog-title-dialog-app2').html());
											},
					   "Cancel": function() { $(this).dialog("close"); }
		}});
		$('#a-btn-app2').click(function() {
			$('#dialog-app2').dialog('open');
			return false;
		});

	}
