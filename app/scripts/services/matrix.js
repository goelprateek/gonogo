;(function(){
	angular.module('gonogo').service('Rules',function($http,BASE_URL_SCOR){
	var ViewMode;
	var OutputList = [{'value':'Approved','color':'#43A443'},{'value':'Declined','color':'#E42E28'},
	                  {'value':'Queue','color':'#2196f3'}];
	this.displayRules=function(InstitutionID,id, ruletype, calltype, divID, viewMode, callback)
	{	 var BScoreList=[]; var AScoreList=[];
		 var outcomeList=[]; var RcriteriaList=[];
		 ViewMode = viewMode; 
		 var matrixData={'Ascore':[],'Bscore':[],'outcomeList':[],'RcriteriaList':[]};
		
		 $http({ method : 'POST',
			url : BASE_URL_SCOR+'DecisionRules',
			params:{'INSTITUTION_ID':InstitutionID,'RuleID':id,'RType':ruletype,'CType':calltype},
			headers : {'Content-Type' : 'application/json'}
		}).success(function(data) 
		{ //console.log((ruletype == "Criteria")+" : "+(data.Data !="") +" : "+(typeof data.Data.CRULES != 'undefined'));
			if(data.StatusCode === 101)
			{if((ruletype == "Matrix") && (typeof data.Data != 'undefined' || data.Data != ""))
			  {	$("#rules_table, #Tree_main_container, #Criteria_main_container").hide();
			  	$("#rules_main_container, #Matrix_main_container").slideDown();
				var margin = $('body').height();
					$('#Matrix_field_container').css('margin-top',margin-125);			
					$('#T_LoaderSpinner').hide();
				if(typeof data.Data.BScoreList != 'undefined')
				{ 	BScoreList = data.Data.BScoreList;		 		 
					matrixData.Bscore=data.Data.BScoreList;
				}
				if(typeof data.Data.AScoreList != 'undefined')
				{ 	AScoreList = data.Data.AScoreList;		 	
					matrixData.Ascore=data.Data.AScoreList;
				}
				if(typeof data.Data.Matrix != 'undefined')
				{ 	outcomeList = data.Data.Matrix;		 	
					matrixData.outcomeList=data.Data.Matrix;
				}
				createColumn(divID,BScoreList,AScoreList,outcomeList);
			}else if((ruletype == "Criteria")&& data.Data !="" )
			{ 	RcriteriaList=data.Data.CRULES;				
				matrixData.RcriteriaList=data.Data;
			}
			}else{
				
			}
			callback(matrixData);
		}).error(function(data)
			{	$('#T_LoaderSpinner').hide();
				console.log("We could not process your request......Please try later.")
			});		
	},
	this.createColumn = function(divId,bScoreList,aScoreList,outcomeList)
	{
		createColumn(divId,bScoreList,aScoreList,outcomeList);
	},
	this.generate = function(ids, outcomeList)
	{
		
	}
	
	//create new column to matrix at every transaction	
	function createColumn(divID,BScoreList,AScoreList,outcomeList)
	{   id = '#'+divID+'';
	  try{	 		
		  $(""+id+" #MatrixAScore th").remove();
		  $(""+id+" #MatrixBScore tr:not(:first)").remove();
		  var domstr = '<th style="border: 1px solid white;"></th>';
		  $(""+id+" #MatrixAScore").append(domstr);
		  if((typeof BScoreList != 'undefined')&&(BScoreList.length != 0))
		  {for(var i=0; i<BScoreList.length; i++)
			{	var domstr = '<th style="background-color: #C8E4FE">'+BScoreList[i].Code+'</th>';
				$(""+id+" #MatrixAScore").append(domstr);
			}
		  }else if((AScoreList.length == 0)&&(BScoreList.length == 0))
		  {
			$(""+id+" #MatrixAScore").append('<th>Please Define Decision Condition</th>');	
		  }
		  if((typeof AScoreList != 'undefined')&&(AScoreList.length != 0))
		  {for(var j=0;j<AScoreList.length; j++)
			{ 	var domstr='<tr id="row'+AScoreList[j].Code+'"><th style="background-color: #DDD; width:35px;">'+AScoreList[j].Code+'</th>';
				domstr=domstr+'</tr>';
				$(""+id+" #MatrixBScore").append(domstr); 
				for(var i=0; i<BScoreList.length;i++)
				{	domstr='<th>';
					domstr=domstr+'<select class="trans-select" id="OutCome'+AScoreList[j].Code+BScoreList[i].Code+'" name="'+AScoreList[j].Code+'" title="'+BScoreList[i].Code+'">';
					domstr=domstr+'</select></th>';
					$(""+id+" #row"+AScoreList[j].Code+"").append(domstr);
					generate(AScoreList[j].Code+""+BScoreList[i].Code,outcomeList);
				}
			}
		  }
	  }catch(error)
	  {	console.log(error);}
	}
	
	//create and bind option value to select elemtn in matrix	
	function generate(ids, outcomeList)
	{	var id = "#OutCome"+ids;
		if(ViewMode == true)
		{ $(id).attr("disabled","disabled");}
		var action = false;
		for(var obj in outcomeList)
		{ if(obj.Key === ids)
			{	action = obj.value;
				break;
			}
		}
		$.each(OutputList, function(index, text) 
		{	if(action == text.value)
			{  	$(id).parent().css("background-color",text.color);
				$(id).append( $('<option selected="selected">').text(text.value).attr('value',text.value));
			}
			else if((text.value == "Queue") && (action == false))
			{ 	$(id).parent().css("background-color",text.color);
				$(id).append( $('<option selected="selected">').text(text.value).attr('value',text.value));
			}else{
				$(id).append( $('<option>').text(text.value).attr('value',text.value));
			}
		}); 
	}
});


}).call(this)
