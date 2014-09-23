$(document).ready(function() {
	$('#enable-tooltips').change(function(){
		if($(this).is(':checked'))
			$(".tooltip").show();
		else
			$(".tooltip").hide();
		//$(this).val() is always 'on'
	});

	// $('#enable-tooltips').attr('checked','');
	$(".tooltip").hide();


	$.fn.qtip.styles.mystyle = {
		width: 320,
		background: '#A2D959',
		color: 'black',
		'font-size': 12,
		border: {
		  width: 7,
		  radius: 5,
		  color: '#A2D959'
		},
		tip: 'bottomRight',
		name: 'dark' // Inherit the rest of the attributes from the preset dark style
	};

	var myposition = { corner: {
				target: 'topLeft',
				tooltip: 'bottomRight'
	}};

	$('#tip-a-param').qtip({
		content: "Set/Show the application parameters. <br/> Remember to click [Set Params] button to take effect.",
		style: 'mystyle',
		position: myposition,
	});

	$('#tip-a-config').qtip({
		content: "Choose which method to use for deadline assignment.",
		style: 'mystyle',
		position: myposition,
	});

	$('#tip-a').qtip({
		content: "<ul><li>[Create] a new application. </li> \
		          <li>[Save] the current application into a file on your local machine. </li> \
				  <li>[Load] an application from a file.</li>\
				  </ul>",
		style: 'mystyle',
		position: myposition,
	});

	$('#tip-n-param').qtip({
		content: "Set/Show parameters of a task. Choose the task in the precedence graph first. <br/> \
				Remember to click [Set Params] button to take effect.",
		style: 'mystyle',
		position: myposition,
	});

	$('#tip-n').qtip({
		content: "<ul><li>[Add] new task to the application. </li> \
		          <li>[Remove] a task from the application. Choose the task in the precedence graph first. </li> \
				  </ul>",
		style: 'mystyle',
		position: myposition,
	});

	$('#tip-r').qtip({
		content: "Set/Show the information of a precedence relation. Choose the precedence relation in the precedence graph first.\
				<ul><li>[Set] precedence relation between 2 tasks. Choose two tasks in the precedence graph first. </li> \
		          <li>[Remove] the precedence relation between 2 tasks. Choose the precedence relation in the precedence graph first. </li> \
				  </ul>",
		style: 'mystyle',
		position: myposition,
	});

	$('#tip-a-utility').qtip({
		content: "<ul><li>Show [Topogical] order  Output is under the {Log} tab. </li> \
		          <li>Show [Critical Path] of the application. It is highlighted in the precedence graph. </li> \
				  </ul>",
		style: 'mystyle',
		position: myposition,
	});

	$('#tip-f-goal').qtip({
		content: "Choose the optimization goal<br/>\
				<ul><li>Total bandwidth: the sum of bandwidth of each flow</li>\
					<li>Fragmentation: smaller value means more compactness of flows. See reference for more details.</li>\
				</ul>",
		style: 'mystyle',
		position: myposition,
	});

	$('#tip-f-method').qtip({
		content: "<ul><li>[Search]: calculate the optimal partitioning using branch & bound search</li>\
					<li>[Heuristic]: calculate the partitioning using heuristic method</li>\
				</ul>",
		style: 'mystyle',
		position: myposition,
	});

	$('#tip-f-manual').qtip({
		content: "Manually create partitions.\
				<ul><li>[Create]: select tasks in the precedence graph and create a flow to contain them.</li>\
					<li>[Remove]: select tasks in the precedence graph and move them out of the flow. You can also select a flow from the dropdown list.</li>\
				</ul>",
		style: 'mystyle',
		position: myposition,
	});

});
