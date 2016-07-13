;(function(){

	'use strict';

	

 var app = angular.module('gonogo');

app.controller("PolicyController" , ['$scope','$rootScope', '$http', '$timeout', 
'$filter', 'Rules', 'Policy', 'Score', 'Decision', 'Validation','APP_CONST','RestService','UserService','AclService',function($scope,$rootScope, $http, $timeout, 
$filter, Rules, Policy, Score, Decision, Validation,APP_CONST,RestService,UserService,AclService) 
{
	var currentUser=UserService.getCurrentUser();
	$scope.can=AclService.can;

	if(currentUser.id){
		$scope.$emit('onSuccessfulLogin', { message: "Hi" });
	}

	var dataset ={'master': []}; 
	var colorList = ['#689f38','#EF3D16','#fb8c00','#8BC34A','#2196F3','#9C27B0','#bdbdbd','#009688','#ffc107','#689f38'];
	var categoryFlag=false, attributeFlag=false, FDataTypesUpdtd=[],FTypes=[], Fname=[], Dname=[],itemcount = 0,error;
	var Catcount = 0, plancount = 0, idcount = 0, ids, flag=0, startAt=0, endOn=0, curr=0, current=0;
	var regex = /^[a-zA-Z0-9 ]+$/,regexNo = /^[0-9 ]+$/;
	$scope.CrRuleUpdate=false;
	var keyerror=0;
	$scope.formula2 =[];

	// if($scope.useremail=="ankur@softcell.com"){
	// 	currentUser.institutionID=4010;
	// } else if($scope.useremail=="ankur1@softcell.com"){
	// 	currentUser.institutionID=4019;
	// }
	
	$scope.category_list = [{value:"Select Category"}];
	$scope.attribute_list = [{value:"Select Attribute"}];
	$scope.field_list = [{value:"Select Field"}];

	$scope.CatArray = dataset.master;
	$scope.contextValueArray = ['-5','-4','-3','-2','-1','0','+1','+2','+3','+4','+5'];
// $scope.WeightValueArray = [1,2,3,4,5];
// $scope.cweight = $scope.WeightValueArray[0];
	$scope.tableList =[];

	$rootScope.template="policy";
	$scope.selectMaster="selectMaster";
	var expressions = { 'NumberExpression' : [{value:'Select','text':'Select Expression (123)'},
	                                          {value:'<','text':'Lest than  <'}, {value:'<=','text':'Less than equal to <='},
	                                          {value:'==','text':'Equal to  =='},{value:'!=','text':'Not equal to  !='},
	                                          {value:'>','text':'Greater than  >'},{value:'>=','text':'Greater than equal to  >='},
	                                          {value:'Between','text':'Between'},{'value':'! Between','text':'Not Between'},
	                                          {value:'null','text':'Not Availeble'}],
                      'StringExpression' :[{value:'Select','text':'Select Expression'},
                                           {value:'is','text':'is'}, {value:'is not','text':'is not'},
                                           {value:'start with','text':'start with'},{value:'end with','text':'end with'},
                                           {value:'contains','text':'contains'},{value:'!contains','text':'does not contains'},
                                           {value:'null','text':'Not Availeble'}
                                           ],
                      'BooleanExpression' :[{value:'Select','text':'Select Expression'},
                                           {value:'is','text':'true'}, {value:'is not','text':'false'},
                                           {value:'null','text':'Not Availeble'}
                                           ],
                      'DateExpression' :[{value:'Select','text':'Select Expression'},
                                         {value:'is','text':'is'}, {value:'is not','text':'is not'},
                                         {value:'Between','text':'Between'}, {value:'! Between','text':'Not Between'},
                                         {value:'null','text':'Not Availeble'}
                                        ],
                      'AggrExpression':[
                                        {value:'MAXIMUM','text':'Maximum'}, {value:'MINIMUM','text':'Minimum'},
                                        {value:'AVERAGE','text':'Average'}, {value:'SUM','text':'Sum'},
                                        {value:'COUNT','text':'Count'}],
                      'AntclDateExpression':[{value:'Select','text':'Select Expression'},
                                            {value:'BEFORE','text':'Before'}, {value:'AFTER','text':'After'},
                                            {value:'BETWEEN','text':'Between'},{value:'DIFF-MONTH','text':'Difference (Month)'},
                                            {value:'DIFF-DAYS','text':'Difference (Days)'},
                                            {value:'IS-NULL','text':'Is Null'},
                                            {value:'IS-NOT-NULL','text':'Is Not Null'}],
	                 'cstmDateExpression':[{value:'Select','text':'Select Expression'},
	                                       {value:'BEFORE','text':'Before'}, {value:'AFTER','text':'After'},
	                                       {value:'BETWEEN','text':'Between'},{value:'DIFF-MONTH','text':'Difference (Month)'},
	                                       {value:'DIFF-DAYS','text':'Difference (Days)'},
	                                       {value:'IS-NULL','text':'Is Null'},
	                                       {value:'IS-NOT-NULL','text':'Is Not Null'}],
                                            
                     'AggrDateExpression':[
                                          {value:'MAXIMUM','text':'Maximum'}, {value:'MINIMUM','text':'Minimum'},
                                          {value:'COUNT','text':'Count'},{value:'MAX-DIFF-MONTH','text':'Max Difference (Months)'},
                                          {value:'MIN-DIFF-MONTH','text':'Min Difference (Months)'},
                                          {value:'MAX-DIFF-DAYS','text':'Max Difference (Days)'},{value:'MIN-DIFF-DAYS','text':'Min Difference (Days)'}],
                     'AggrDPDExpression':[
                                            {value:'MAX-DPD-VAL','text':'Max DPD Value'}, {value:'MIN-DPD_VAL','text':'Min DPD Value'},
                                            {value:'COUNT-DPD-VAL','text':'Count DPD Value'}, {value:'MAX-DPD-DATE','text':'Max DPD Date'},
                                            {value:'MIN-DPD-DATE','text':'Min DPD Date'}],
                     'DPDExpression' : [{value:'Select','text':'Select Expression (123)'},
                                          {value:'<','text':'Lest than  <'}, {value:'<=','text':'Less than equal to <='},
                                          {value:'==','text':'Equal to  =='},{value:'>','text':'Greater than  >'},
                                          {value:'>=','text':'Greater than equal to  >='}
                                          ],
                    'DPDDateExpression':[{value:'Select','text':'Select Expression'},
                                         {value:'BEFORE','text':'Before'}, {value:'AFTER','text':'After'},
                                         {value:'DIFF-MONTH','text':'Difference (Months)'},
                                         {value:'DIFF-DAYS','text':'Difference (Days)'}]
	};	 

	// rules and policy screen
	$scope.OutputList = [{'value':'Approved','color':'#43A443'},{'value':'Declined','color':'#E42E28'},{'value':'Queue','color':'#2196f3'}];
	$scope.BScoreList = []; $scope.AScoreList = [];   $scope.RuleList = [];
	$scope.outcomeList = []; $scope.PcriteriaList = []; $scope.RcriteriaList = [];
	$scope.policyList = [];
	$scope.IffFieldList=[];

	$scope.ElgbltyList=[];
	$scope.selectElgblty = "Select";
	var MField,PActive;
	$scope.ExpressionList = expressions.NumberExpression;
	$scope.Expression = $scope.ExpressionList[0];
	$scope.UpdateFlag = false;
	$scope.PolicyID = true;
	$scope.rule_type="Select";  
	// dummy iff file list

	getInstitutionData();
	// get Institution data from server database
	function getInstitutionData() 
	{ 
		$http({
			method : 'GET',	url : APP_CONST.getConst('BASE_URL_SCORE')+'GetInstitutionData',
			params : {'INSTITUTION_ID': currentUser.institutionID},
			headers : {'Content-Type' : 'application/json'}
		}).success(function(data) 
		{ $('#T_LoaderSpinner').hide();$scope.error = "";
			if (data.StatusCode === 101) 
			{	$scope.AppOptions = data.Data.AppList;
				$scope.ProdOptions = data.Data.ProdList;
				$scope.AggrOptions = data.Data.AggrList;
				process();
			} else 
			{
				$scope.error = "Request failed due to an internal error...Please contact 'System Admin'";
			}
		}).error(function(data) 
		{$('#T_LoaderSpinner').hide();
		console.log("We could not process your request......Please try later.")
		});
	}      

	function process(){
// Policy.getAllpolicy(currentUser.institutionID ,function(data){
// $scope.policyList=data;
// });
		// bind all product to drop down
		if($scope.ProdOptions != undefined)
		bindlist("product_list", $scope.ProdOptions, 'Products');
		// generate app source dropdown
		if($scope.AppOptions != undefined)
		bindlist("AppType_list", $scope.AppOptions, 'Apps');	 
		// generate aggrigation option dropdown
		if($scope.AggrOptions != undefined)
		bindlist("aggr_operator", $scope.AggrOptions, 'Aggr');
		// genearte IFF file for aggrigation
		Update_Master(".IffDrpDwn");                   
	}

	// Tab click function
	$scope.open_tab = function(type)
	{   $scope.ViewMode = false;
		$scope.display_plan_box = false;
		$scope.display_item_box = false;
		$('#scoring_main_container,#AFDisplPanel,#IffFieldPanel,#addIffField').hide();
		$scope.Table = "";
	if(type === 'Scores')
	{		 
		$scope.PolicyID = false;$scope.Rule = false;$scope.ScoreTable = true;$scope.Pmaster = false;$scope.ElgbltyID=false;
		Score.getAll_ScoringTables(currentUser.institutionID ,function(data){
			$scope.tableList=data;
		});
		$('#Scores').css({"text-decoration":"underline","color":"#CB151B","font-weight": "bold"}).siblings().css({"text-decoration":"none","color":"#777","font-weight": "100"});
		$("#rules-container, #policy-container, #Iff-container ,#elgblty-container, #metadataContainer ,#MFTable").hide();
		$("#scoring-container, #scoring_table").show();
	}
	else if(type === 'Rules')
	{ $scope.PolicyID = false;$scope.ScoreTable = false;$scope.Rule = true;$scope.Pmaster = false;$scope.ElgbltyID=false;
	  Decision.getRuleList(currentUser.institutionID,$scope.Rule,function(data){
		  $scope.RuleList=data;
		  // console.log("Rule List="+JSON.stringify($scope.RuleList));
	   });
	// $scope.getRuleList(function(){});
	 $('#Rules').css({"text-decoration":"underline","color":"#CB151B","font-weight": "bold"}).siblings().css({"text-decoration":"none","color":"#777","font-weight": "100"});
  	 $("#policy-container, #rules_main_container,#elgblty-container, #Criteria_main_container, #scoring-container,#Iff-container, #metadataContainer,#MFTable").hide();
	 $("#rules-container, #rules_table").show();  
	}
	else if(type === 'Policy')
	{
		Score.getAll_ScoringTables(currentUser.institutionID ,function(data){ $scope.tableList=data;});
		Policy.getAllpolicy(currentUser.institutionID ,function(data){$scope.policyList=data;});
		$scope.PolicyID = true; $scope.ScoreTable = false;$scope.Rule = false;$scope.Pmaster = false;$scope.ElgbltyID=false;
		$('#Policy').css({"text-decoration":"underline","color":"#CB151B","font-weight": "bold"}).siblings().css({"text-decoration":"none","color":"#777","font-weight": "100"});
		$("#rules-container, #elgblty-container,#policy_main_container, #scoring-container,#Iff-container, #metadataContainer,#MFTable").hide();
		$("#policy-container, #policy_table").show();
	 }else if(type === 'Pmaster')
		{ $scope.PolicyID = false;$scope.ScoreTable = false;$scope.Rule = false;
		  $scope.Pmaster = true;$scope.ElgbltyID=false;
		  $scope.IffFieldList.length=0;
		// $scope.getRuleList(function(){});
		 $('#iff_master').css({"text-decoration":"underline","color":"#CB151B","font-weight": "bold"}).siblings().css({"text-decoration":"none","color":"#777","font-weight": "100"});
	  	 $("#addcstmField,#elgblty-container,#policy-container, #rules-container, #Criteria_main_container, #scoring-container,#metadataContainer,#MFTable,#customFieldPanel").hide();
		 $("#Iff-container, #iff_table").show();  
		 $scope.getMasterList();
		 $scope.THead = [];
		 $scope.trow =[];
		}else if(type === 'Elgblty')
		{	
			$scope.ElgbltyID=true;$scope.PolicyID = false; $scope.ScoreTable = false;$scope.Rule = false;$scope.Pmaster = false;
			$('#Elgblty').css({"text-decoration":"underline","color":"#CB151B","font-weight": "bold"}).siblings().css({"text-decoration":"none","color":"#777","font-weight": "100"});
			$("#policy-container,#rules-container, #policy_main_container, #scoring-container,#Iff-container, #metadataContainer,#MFTable").hide();
			$("#elgblty-container,#elgbltyTables").show();
			$("#ElgbltyDisplay, #elegbltyPanel").hide();
			$scope.getElgbltyList();	
		 }

 }

// ****************************For opening policy tab
// onload****************************
	$scope.open_tab('Policy');
	$scope.Mlist="";
$scope.getMasterList = function()
{
	$http({
		method : 'POST',
		url : APP_CONST.getConst('BASE_URL_SCORE')+'IFFDropDown',
		params : {'INSTITUTION_ID':currentUser.institutionID,'CType':'metadata'},
		headers : {'Content-Type' : 'application/json'}
	}).success(function(data) 
	{   // console.log("master file data :"+JSON.stringify(data));
		$scope.Mlist = data.Data;		
	}).error(function(data)
		{
		console.log("We could not process your request......Please try later.")
		});
}
	// view table contents in detail
	$scope.load_table = function(id, type)
	{  
		var url=APP_CONST.getConst('BASE_URL_SCORE') +"ScoreTable";

		if(type === 'edit')
		{ 
			displayTables(id);
			$scope.ViewMode = false;
		}else if(type === 'delete')
		{	var data = {'ID':id};
			$scope.deleteObject(url,data,"STable");
		}
		else if(type === 'approve')
		{
			var data = {'ID':id,'updatedby':$scope.username,'status':'Approved'};
			$scope.updateStatus(url,data,"STable");
		}else if(type === 'view')
		{
			displayTables(id);
			$scope.ViewMode = true;
		}else 
		{   /*$('#TableError').text("You are not authorised for this action")
			.css("color","red").slideDown().delay(2000).slideUp();}*/
			var data = {'ID':id,'updatedby':$scope.username,'status':'Disabled'};
			$scope.updateStatus(url,data,"STable");
		}
	}
// handle master data display
	$scope.mastervalue = function(id ,type)
	{
		var url=APP_CONST.getConst('BASE_URL_SCORE')+"masterDropDown";

		if(type === 'edit' || type === 'view')
		{
	// displayTables(id);
			displaymasterFields(id);
			$scope.ViewMode = false;
		}
		else if(type === 'delete')
		{	var data = {'ID':id};
			$scope.deleteObject(url,data,"master");
		}
		else if(type === 'approve')
		{
			var data = {'ID':id,'updatedby':$scope.username,'status':'Approved'};
			$scope.updateStatus(url,data,"master");
		}else if(type === 'view')
		{
			$scope.ViewMode = true;
	// displayIffFields(id);
		}else 
		{   /*$('#TableError').text("You are not authorised for this action")
			.css("color","red").slideDown().delay(2000).slideUp();*/
			var data = {'ID':id,'updatedby':$scope.username,'status':'Disabled'};
			$scope.updateStatus(url,data,"master");
		}
	}
	
	// view table contents in detail
	$scope.Load_Iff = function(id, type, filetype)
	{   $scope.selectedFileType = filetype;
		
		var url=APP_CONST.getConst('BASE_URL_SCORE')+"IFFDropDown";
		
		if(type === 'edit'){ 
		
			$scope.ViewMode = false;
		
			displayIffFields(id,filetype);
		
		}else if(type === 'delete'){
			var data = {'ID':id};
			$scope.deleteObject(url,data,"IFF");
		
		}else if(type === 'approve'){

			var data = {'ID':id,'updatedby':$scope.username,'status':'Approved'};
			$scope.updateStatus(url,data,"IFF");
		
		}else if(type === 'view'){

			$scope.ViewMode = true;
			displayIffFields(id,filetype);
		
		}else {

			var data = {'ID':id,'updatedby':$scope.username,'status':'Disabled'};
			$scope.updateStatus(url,data,"IFF");
		
		}
	}
	
	

	
	$scope.deleteAttribute=function(objID)
	{   $scope.AtID=objID;
		var url=APP_CONST.getConst('BASE_URL_SCORE')+"Attribute";
		var data = {'ID':objID};
		$scope.deleteObject(url,data,"DAttr");
	}

	$scope.editAttribute=function(objID)
	{
		$scope.AtID=objID;
		$scope.plan;
		$('#attribute_box').slideToggle().focus();
		for(var obj in $scope.planarrey)
		{
			if(obj.AtID == objID)
			{  $scope.plan = obj;
				break;
			}
		}
// console.log("$scope.plan.name="+$scope.plan.name);
		$("body #attributeName").val($scope.plan.name);
		$("body #attribute_weight").val($scope.plan.weight);
	}

	function displayTables(id)
	{
		$scope.ScoreTable = id;
		$scope.Table = "Table ID : "+id;
		$('#scoring_table, #scoring_main_container').slideToggle();
		$('#T_LoaderSpinner').show();
		$http({
			method : 'GET',	url : APP_CONST.getConst('BASE_URL_SCORE')+'GetCategories',
			params : {'TableID':id,'INSTITUTION_ID':currentUser.institutionID},
			headers : {'Content-Type' : 'application/json'}
		}).success(function(data) 
				{ $('#T_LoaderSpinner').hide();
				if(data.StatusCode === 101)
				{ dataset.master.length = 0;
				$scope.CatArray = [];
				generateCategory(data);
				}		    								
				}).error(function(data)
				{$('#T_LoaderSpinner').hide();
				console.log("We could not process your request......Please try later.");
				});
	}

	function displayIffFields(fileID,filetype)
	{  $('#T_LoaderSpinner').show();
		$scope.IffFileID = fileID;
		$scope.Table = "File ID : "+fileID;
		$scope.mfieldlist=[];
		$scope.THead=[];
		$('#iff_table, #iff_fields_table').slideToggle();
		var url;
		if(filetype =="ANALYTICAL")
		{   $('#addIffField').show();
			url = APP_CONST.getConst('BASE_URL_SCORE')+'Analytical';
		}else if(filetype =="CUSTOM")
		{
			 $('#addcstmField').show();
			 url = APP_CONST.getConst('BASE_URL_SCORE')+"CustomFields";
			 $('#T_LoaderSpinner').hide(1000);
// $scope.IffFieldList = $scope.cstmFieldList;
		}
		else{
			url = APP_CONST.getConst('BASE_URL_SCORE')+'FieldDropDown';
		}
		if(url != "")
		{	 $http({
			method : 'POST',	url : url,
			params : {'FileID':fileID,'INSTITUTION_ID':currentUser.institutionID,'CType':"FindAll"},
			data:{'FileID':fileID},
			headers : {'Content-Type' : 'application/json'}
		  }).success(function(data) 
			{ 	
			  if(data.StatusCode == 101 && data.Data!=null)
			  { $scope.IffFieldList=data.Data;
			  }else
			  { $scope.IffFieldList=[]; }
			  $('#T_LoaderSpinner').hide(1000);	
			}).error(function(data)
			{ console.log("We could not process your request......Please try later.");
			  $('#T_LoaderSpinner').hide();
			});
		}
	}
	
	function fetchData(InstitutionID,fileID){
		
		 $http({
				method : 'GET',	url : APP_CONST.getConst('BASE_URL_SCORE')+'FieldData',
				params : {'FileID':fileID,'INSTITUTION_ID':currentUser.institutionID},
				headers : {'Content-Type' : 'application/json'}
			  }).success(function(data) 
				{ 
				  // console.log("response : "+JSON.stringify(data));
				});
	}
	
	$scope.mfieldlist=[];
	
	$scope.THead=[];
	
	function displaymasterFields(fileID){ 

		$('#T_LoaderSpinner').show();
		
		$scope.IffFileID = fileID;
		
		var divHeight=($(window).height()-($('#header').height() + $('#footer').height()));
		
		divHeight=divHeight-180;
	    
	    $("#MFTable").css({"height" : divHeight});
		
		$scope.Table = "IFF File ID : "+fileID;
		
		$('#master_fields_table  ,#MFTable').show();

		$('#iff_table, #iff_fields_table,#addIffField,#addcstmField').hide();
		
	  $http({
			method : 'GET',	url : APP_CONST.getConst('BASE_URL_SCORE') + 'MFieldDropDown',
			params : {'FileID':fileID,'INSTITUTION_ID':currentUser.institutionID},
			headers : {'Content-Type' : 'application/json'}
		  }).success(function(data) 
			{ 	
			  $('#T_LoaderSpinner').hide(1000);	
// console.log("master field element="+JSON.stringify(data));
			  if(data.StatusCode == 101)
			  { $scope.mfieldlist=data.Data;
// console.log("feildList="+$scope.mfieldlist);

				    $scope.THead=$scope.mfieldlist[0];
				  

// pagging(data.Data);
			  }else
				  {$scope.mfieldlist=[];}
			}).error(function(data)
			{ console.log("We could not process your request......Please try later.");
			  $('#T_LoaderSpinner').hide();
			});
	}
	
	
	
	// view policy contents in detail
	$scope.load_policy = function(id, type)
	{var url=APP_CONST.getConst('BASE_URL_SCORE')+"CreditPolicy"; 
		if(type === 'edit')
		{    createPolicyStructure(id);
		     $scope.ViewMode = false;
		}else if(type === 'delete')
		{    
			var data = {'ID':id};
			$scope.deleteObject(url,data,"CPolicy");
		}else if(type === 'approve')
		{
			var data = {'ID':id,'updatedby':$scope.username,'status':'Approved'};
			$scope.updateStatus(url,data,"CPolicy");
		}else if(type === 'view')
		{ createPolicyStructure(id);
		  $scope.ViewMode = true;
		}else if(type === 'disable')
		{   /*$('#TableError').text("You are not authorised for this action")
			.css("color","red").slideDown().delay(2000).slideUp();*/
			var data = {'ID':id,'updatedby':$scope.username,'status':'Disabled'};
			$scope.updateStatus(url,data,"CPolicy");
		}
	}


	// load rule details and internal content
	$scope.Load_Rules = function(ruleid, calltype, ruletype)
	{ var data;	
	  $scope.ViewMode = false;
	  $scope.error = ''; $scope.BScoreList=[]; $scope.AScoreList=[]; $scope.outcomeList=[];
	  if((calltype === "edit")&&(ruletype == "Matrix"))
	  {  $scope.Rule = ruleid;
	    $scope.Table = "Rule ID : "+ruleid;	
	    Rules.displayRules(currentUser.institutionID,ruleid,"Matrix","Find","decision_matrix",$scope.ViewMode,
	    function(data){
	    	$scope.BScoreList = data.Bscore; 
	    	$scope.AScoreList = data.Ascore;   
	    	$scope.outcomeList = data.outcomeList; 
// 			$scope.RcriteriaList = data.RcriteriaList;
	    	});
	// displayRules(ruleid,"Matrix","Find");
	}
	else if((calltype === "edit")&&(ruletype == "Tree"))
	{	$scope.Rule = ruleid;
		$scope.Table = "Rule ID : "+ruleid;
		$("#rules_table, #Criteria_main_container, #Matrix_main_container").hide();
		$("#rules_main_container, #Tree_main_container").show();
	}
	else if((calltype === "view")&&(ruletype == "Tree"))
	{  $scope.Rule = ruleid;
		$scope.Table = "Rule ID : "+ruleid;
		$("#rules_table, #Criteria_main_container, #Matrix_main_container").hide();
		$("#rules_main_container, #Tree_main_container").show();
	}
	else if((calltype === "edit"||calltype === "view")&&(ruletype == "Criteria"))
	{	$scope.Rule = ruleid;
		$scope.Table = "Rule ID : "+ruleid;
		$("#rules_table, #Tree_main_container, #Matrix_main_container").hide();
		$("#rules_main_container, #Criteria_main_container").show();
		Rules.displayRules(currentUser.institutionID,ruleid,"Criteria","Find","0","",  
		function(data){
			// console.log("data ="+JSON.stringify(data));
	    	$scope.BScoreList = data.Bscore; 
	    	$scope.AScoreList = data.Ascore;   
	    	$scope.outcomeList = data.outcomeList; 
	    	$scope.RcriteriaList = data.RcriteriaList;
// console.log("$scope.RcriteriaList="+$scope.RcriteriaList);
	    });
		if(calltype === "view")
		   $scope.ViewMode = true;
		else
		   $scope.ViewMode = false;	
	}else if(calltype == "delete")
	{   var url=APP_CONST.getConst('BASE_URL_SCORE')+"DecisionRules";
		var data = {'ID':ruleid};
		$scope.deleteObject(url,data,"DRules","ALL");
	}
	else if(calltype === 'approve')
	{
		var url=APP_CONST.getConst('BASE_URL_SCORE')+"DecisionRules";
		var data = {'ID':ruleid,'updatedby':$scope.username,'status':'Approved'};
		$scope.updateStatus(url,data,"DRules",'ALL');
	}else if(calltype === 'disable')
	{
		var url=APP_CONST.getConst('BASE_URL_SCORE')+"DecisionRules";
		var data = {'ID':ruleid,'updatedby':$scope.username,'status':'Disabled'};
		$scope.updateStatus(url,data,"DRules",'ALL');
	}else if(calltype === 'view' && ruletype == "Matrix")
	{   $scope.Rule = ruleid;$scope.Table = "Rule ID : "+ruleid;	
		$scope.ViewMode = true;   
		Rules.displayRules(currentUser.institutionID,ruleid,"Matrix","Find","decision_matrix",$scope.ViewMode,
		function(data){
			// console.log("data="+data)
			$scope.BScoreList = data.Bscore; 
			$scope.AScoreList = data.Ascore;   
			$scope.outcomeList = data.outcomeList; 
// $scope.RcriteriaList = data.RcriteriaList;
		});
		}
	}

	// load attribute_list for clicked categories
	$scope.load_attributes = function(index, plancolor, CatID)
	{   $scope.CatID = CatID;
		$scope.AttributeColor = plancolor;	
		for(var i=0; i<dataset.master.length; i++)
		{if(dataset.master[i].CatID == CatID)
		{ if((typeof dataset.master[i].plan != 'undefined') && (dataset.master[i].plan.length != 0))
		  { $scope.planarrey = dataset.master[i].plan;						
			$scope.fieldarrey = null;
			break;
		  }
		  else {
		delete dataset.master[i].plan;
		$('#A_LoaderSpinner').show();
		$http({
			method : 'GET',
			url : BASE_URL_SCOR+'GetAttributes',
			params : {'CatID':CatID,'INSTITUTION_ID':currentUser.institutionID},
			headers : {'Content-Type' : 'application/json'}
		}).success(function(data) 
				{   $('#A_LoaderSpinner').hide();
				if(data.StatusCode == 101)
					generateAttribute(data);								
				}).error(function(data)
						{console.log("We could not process your request......Please try later.");
						$('#A_LoaderSpinner').hide();
						});
	}
	}			
	}
	    $('#add_attribute_box').parent().find('span').remove();
		categoryFlag=true;
		$scope.display_plan_box = true;
		$scope.display_item_box = false;
	}

	$scope.deleteCategory=function(objID)
	{	$scope.CatID=objID;
	var url=APP_CONST.getConst('BASE_URL_SCORE')+"Category";
	var data = {'ID':objID};
	$scope.deleteObject(url,data,"DCat");
	}
	$scope.editCategory=function(objID)
	{	$scope.CatID=objID;
		$('#Cat_input_box').slideToggle().focus();
		$scope.cat;
		for(var obj in $scope.CatArray)
		{
			if(obj.CatID == objID)
			{  $scope.cat = obj;
				break;
			}
		}
	$("body #CatName").val($scope.cat.name);
	$("body #category_weight").val($scope.cat.weight);
	}


	// load field items for clicked attributes
	$scope.load_field = function(attribute_name, AtID) 
	{ if(!angular.equals(AtID,'undefined'))
	{$scope.AtID = AtID;} 	   
	for (var i = 0; i < dataset.master.length; i++) 
	{  if(dataset.master[i].CatID === $scope.CatID)
	{	for (var j = 0; j < dataset.master[i].plan.length; j++) 
	{  	if (dataset.master[i].plan[j].AtID == AtID)
	{				
// if((typeof dataset.master[i].plan[j].items != 'undefined') &&
// (dataset.master[i].plan[j].items.length != 0))
// { $scope.fieldarrey = dataset.master[i].plan[j].items;
// $scope.display_item_box = true;
// break;
// }
// else{
		delete dataset.master[i].plan[j].items;
		$('#L_LoaderSpinner').show();
		$http({
			method : 'GET',
			url : APP_CONST.getConst('BASE_URL_SCORE')+'GetItems',
			params : {'AtID':AtID, 'INSTITUTION_ID':currentUser.institutionID},
			headers : {'Content-Type' : 'application/json'}
		}).success(function(data) 
				{	$('#L_LoaderSpinner').hide();
				if(data.StatusCode == 101)
				{  
					generateItems(data,"Logic_Create");
				}else{
					$scope.error = "Request failed due to an internal error...Please contact 'System Admin'";
				}
				}).error(function(data)
						{$('#L_LoaderSpinner').hide();
						console.log("We could not process your request......Please try later.")
						});
// }
		break;
	}

	}
	}
	}	
	$scope.logic_panel_name = attribute_name;
	attributeFlag = true;
	$scope.display_item_box = true;

	};

	function createPolicyStructure(id)
	{	$scope.Table = "Policy ID : "+id;
		$scope.PolicyID = id;
		$scope.getElgbltyList();
		Decision.getRuleList(currentUser.institutionID,$scope.Rule,function(data){
		/*
		 * for (var i = 0; i < data.length; i++) {
		 * 
		 * $scope.RuleList.push(data[i]); }
		 */
		$scope.RuleList=data;
// console.log("Data from $scope.RuleList" +JSON.stringify($scope.RuleList));
		/*
		 * }); $scope.getRuleList(function(){
		 */ 
		Score.getAll_ScoringTables(currentUser.institutionID,function(){ 
			$('#policy_table').hide();
			$('#policy_main_container').slideDown();
			for(var obj in $scope.policyList)
			{ if(obj.PolicyID == $scope.PolicyID)
			  { $scope.ProductList = obj.ProdList;
				$scope.AppList = obj.AppList;
				$scope.PcriteriaList = obj.CritList;
				$scope.Ppriority = obj.priority;
				$('#vfrom, #vtill').datepicker({changeMonth: true, changeYear: true, yearRange: "1900:2016", dateFormat: 'dd:mm:yy'});
				if(typeof obj.valid != 'undefined')
				{
					if(obj.valid.val1 && obj.valid.val2)
					{	$("#valid_status").val("between"); 
						$("#vfrom").val(obj.valid.val1).show();
						$("#vtill").val(obj.valid.val2).show();
					}else if(obj.valid.val1 != "")
					{ 	$("#valid_status").val("from"); 
						$("#vfrom").val(obj.valid.val1).show();
						$("#vtill").val("").hide();
					}else if(obj.valid.val2 != "")
					{ 	$("#valid_status").val("till");
						$("#vfrom").val("").hide();
						$("#vtill").val(obj.valid.val2).show();
					}
				}else
				{	$("#valid_status").val("Select");
					$("#vfrom, #vtill").val("").hide();
				}
			if(obj.Active == true)
			{ $("#btnDisable").hide();$("#btnEnable").show();}
			else
			{ $("#btnEnable").hide();$("#btnDisable").show();}
				
			    $scope.PolicyDRule(obj.RuleID);
				$scope.PolicyTable(obj.TableID);
				$scope.PolicyElgblty(obj.ElgbltyID);
// console.log("$scope.tableList="+$scope.tableList);
				// bind all product to drop down
				bindlist("table_list", $scope.tableList, obj.TableID, "TableList");	
				// bind all product to drop down
				bindlist("rule_list", $scope.RuleList, obj.RuleID, "RuleList");	    		      
				$scope.AggrigationLayout(obj.AggrList);
				break;
			}
		}
	 });// end scoring table function
	});// end rules function
}

	// create new table in db
	$scope.submit_table = function()
	{  	      
// console.log("Table Name ="+ $scope.tableName)
		if (regex.test($scope.tableName)){
			var tableSet = {		        			 
					'name': $scope.tableName,
					'createdby':$scope.username		        			 
			}
			$('#T_LoaderSpinner').show();
			$http({	method : 'POST',
				url : APP_CONST.getConst('BASE_URL_SCORE')+'ScoreTable',
				params : {'INSTITUTION_ID':currentUser.institutionID,'CType':'create'},
				data : tableSet,
				headers : {'Content-Type' : 'application/json'}
			}).success(function(data) 
					{      
				$scope.tableName = ''; 
// console.log("Data from ajax="+JSON.stringify(data))
				$('#T_LoaderSpinner').hide();
				if(data.StatusCode === 101)
				{   $scope.tableList.push(data.Data);	
// console.log("$scope.tableList"+JSON.stringify($scope.tableList));
				$('#TableError').text("Successfully Created").css("color","green").slideUp(3000);
				}
				else{
					console.log("We could not process your request......Please try later.")
				}
					}).error(function(data)
							{   $('#T_LoaderSpinner').hide();
							console.log("We could not process your request......Please try later.")
							});
		}
		else{
			$('#TableError').text("Special Character are not allowed").css("color","red").slideDown(3000);	          
		}
	}

	// create new credit Policy in db
	$scope.SaveCreditPolicy = function()
	{   	        
		if (validate_policy(this))
		{ 	var dataset = {'name':this.policyName,'priority':this.priority,'createdby':$scope.username};
		$('#T_LoaderSpinner').show();
		$http({	method : 'POST',
			url : APP_CONST.getConst('BASE_URL_SCORE')+'CreditPolicy',
			params : {'INSTITUTION_ID':currentUser.institutionID,'CType':'Create'},
			data : dataset,
			headers : {'Content-Type' : 'application/json'}
		}).success(function(data) 
			{   $('#T_LoaderSpinner').hide();$scope.error = ""; 
				if(data.StatusCode === 101)
				{   $scope.policyList.push(data.Data);	    									  
					$('#TableError').text("Successfully Created").css("color","green");
				}
				else{
					$scope.error = "Request failed due to an internal error...Please contact 'System Admin'";
				}
			}).error(function(data)
			{   $('#T_LoaderSpinner').hide();
			console.log("We could not process your request......Please try later.")
			});
		this.policyName = '';
		this.priority = '';
		$('#TableError').slideUp(3000);
		}
	}

	// update policy data all fields or create new data
	$scope.savePolicyData = function(callType)
	{	if($("#btnEnable").is(":visible"))
		 PActive = true;
		else
		 PActive = false;
	var jsonData={'PolicyID':$scope.PolicyID,'ProdList':$scope.ProductList,'AppList':$scope.AppList,
			'priority':$scope.Ppriority,'valid':{"val1":$("#vfrom").val(),"val2":$("#vtill").val()},
			'Active':PActive,'CritList':$scope.PcriteriaList,'TableID':$("#table_list option:selected").val(),
			'RuleID':$("#rule_list option:selected").val(),'ElgbltyID':$scope.selectElgblty,'AggrList':$scope.AggrList,'updatedby':$scope.username};
	
	if($scope.ProductList.length == 0)
		$("#perror").text("Please Define Products For this Policy").show();
	else if($scope.AppList.length == 0)
		$("#perror").text("Please Define Application Sources For this Policy").show();
	else if($scope.PcriteriaList.length == 0)
		$("#perror").text("Please Define Criteria For this Policy").show();
	/*	else if(jsonData.TableID == "Select")
	$("#perror").text("Please Define Scoring Table For this Policy").show();*/
//else if(jsonData.RuleID == "Select")
//  $("#perror").text("Please Define Decision Rule For this Policy").show();
else if(jsonData.valid.val1 == "" && jsonData.valid.val2 == "")
	$("#perror").text("Please Define Active Duration For this Policy").show();
else
{	if(jsonData.ElgbltyID=="Select")
	{
	  jsonData.ElgbltyID=0;
	}
   if(jsonData.RuleID=="Select")
	{
		jsonData.RuleID=0;
	}
   if(jsonData.TableID=="Select")
	{
		jsonData.TableID=0;
	}
		$http({	method : 'POST',
			url : BASE_URL_SCOR+'CreditPolicy',
			params : {'INSTITUTION_ID':currentUser.institutionID,'CType':'Update'},
			data : jsonData,	headers : {'Content-Type' : 'application/json'}
		}).success(function(data) 
		 {
			if(data.StatusCode === 101)
			{$('#perror').text("Policy Updated Successfully").css("color","green").show();}
			else{
				$('#perror').text("We could not process your request......Please try later.").show();}
				$('#perror').css("color","red").slideUp(3000);
		}).error(function(data)
			{ $('#perror').text("We could not process your request......Please try later.").show();
			  $('#perror').css("color","red").slideUp(3000);
			});					

	}// end else block
	}
	// validate policy before add new
	function validate_policy(obj)
	{   
		if(!regex.test(obj.policyName)){
			$('#TableError').text("Special Characters are not allowed").show();
			$('#TableError').slideUp(3000);
			return false;
		}else if(!regexNo.test(obj.priority)){
			$('#TableError').text("Priority must be Numeric").show();
			$('#TableError').slideUp(3000);
			return false;
		}else{
			for(var p=0; p< $scope.policyList.length; p++)
			{ if($scope.policyList[p].name === name)
			{ $('#TableError').text("This Policy name is already exist").show();
			$('#TableError').slideUp(3000);
			return false;
			}
			}
		}				
		return true;
	}

	// generic function for populate category list
	function generateCategory(data)
	{ for(var i=0; i<data.Data.length; i++)
	{dataset.master.push(data.Data[i]);
	}	
	$scope.CatArray = dataset.master;
	}

	// generic function for attribute list
	function generateAttribute(data)
	{    var newItem = {'plan' : []};
	for (var i = 0; i < dataset.master.length; i++) 
	{ if (dataset.master[i].CatID == $scope.CatID) 
	   { if (typeof dataset.master[i].plan == 'undefined')
		   $.extend(dataset.master[i],newItem);
	   for(var j=0;j<data.Data.length; j++)
	   {
		dataset.master[i].plan.push(data.Data[j]);	
	   }
	   $scope.planarrey = dataset.master[i].plan;			
	}
	}
	}

	// generic function for item list
	function generateItems(data, calltype)
	{  var newLogic = {'items' : []};
	   for (var i = 0; i < dataset.master.length; i++) 
	   {if(dataset.master[i].CatID === $scope.CatID)
	   	{for(var j=0;j < dataset.master[i].plan.length; j++)
	   	  {if (dataset.master[i].plan[j].AtID == $scope.AtID) 
	   	    { if(calltype === "Logic_Create")
	   	      { if((typeof dataset.master[i].plan[j].items == "undefined"))
				{$.extend(dataset.master[i].plan[j],newLogic);
				}
				for(var k=0; k<data.Data.length; k++)
				{ dataset.master[i].plan[j].items.push(data.Data[k]);
				}
// return false;
	   	      }else if(calltype === "Logic_Update")
	   	      { if ((typeof dataset.master[i].plan[j].items !== "undefined"))
	   	         { 	for(var f=0;f<dataset.master[i].plan[j].items.length;f++)
	   	          {if(dataset.master[i].plan[j].items[f].ItemID === data.Data.ItemID)
	   	            { dataset.master[i].plan[j].items[f].logic = data.Data.logic;
	   	            	break;
	   	            }
	   	          }
	   	         }
// return false;
	   	      }else if(calltype === "Logic_Delete")
	   	       { if ((typeof dataset.master[i].plan[j].items !== "undefined"))
	   	      	  {	for(var f=0;f<dataset.master[i].plan[j].items.length;f++)
	   	      	    {
				     if(dataset.master[i].plan[j].items[f].ItemID === data)
				     { dataset.master[i].plan[j].items.splice(f,1);
				       break;}
				     // remove that element from local cache JSON
				     }
	   	      	  }
// return false;
	   	       }else if(calltype === "Weight_Update")
	   	       { for(var k=0; k<dataset.master[i].plan[j].items.length; k++)
	   	       	  {if(dataset.master[i].plan[j].items[k].ItemID == $scope.ItemID) 
	   	           { dataset.master[i].plan[j].items[k].weight = data.Data;									
	   	           	 break;													 
	   	           }
	   	       	  }
// return false;
	   	       }else if(calltype === "Context_Create")
	   	       { var newContext = {'contextname' : []};
	   	         for(var k=0; k<dataset.master[i].plan[j].items.length; k++)
	   	         { if (dataset.master[i].plan[j].items[k].ItemID == $scope.ItemID) 
	   	          {	if ((typeof dataset.master[i].plan[j].items[k].contextname == "undefined"))
	   	            {
	   	    	     $.extend(dataset.master[i].plan[j].items[k],newContext);
	   	            }
	   	          	dataset.master[i].plan[j].items[k].contextname.push(data.Data);
	   	          	break;												 
	   	          }
	   	         }							
	   	       }else if(calltype === "Context_Update")
   	       		{for(var k=0; k<dataset.master[i].plan[j].items.length; k++)
   	       		 { if (dataset.master[i].plan[j].items[k].ItemID == $scope.ItemID) 
   	       		  {for(var f=0; f<dataset.master[i].plan[j].items[k].contextname.length; f++)  
   	       		    { if(dataset.master[i].plan[j].items[k].contextname[f].field === data.Data.field)
   	       		     {
   	       		    	dataset.master[i].plan[j].items[k].contextname[f] = data.Data;
   	       		    	break;
   	       		     }
   	       		    }
   	       		  }
   	       		 }							
   	       		}
	   	    if(dataset.master[i].plan[j].items.length!=0 && typeof dataset.master[i].plan[j].items!='undefined')
	   	    {  $scope.fieldarrey = dataset.master[i].plan[j].items;}
	   	    else
	   	    {	$scope.fieldarrey=null;}
	   	    	break;
	   	    }
	   	  }
	   	}
	   }
  }

	$scope.create_Category = function()
	{   if($('#CatName').val() != '')
	   {
		$('#C_LoaderSpinner').show();
		var colorcode = colorList[dataset.master.length+1];
		if(typeof colorcode == 'undefined')
		{ colorcode = '#607d8b';
		}
		var DataSet={
				'TableID':$scope.ScoreTable,'name':$('#CatName').val(),'color':colorcode,
				'weight':$("#category_weight").val()	
		}	
		$http({
			method : 'POST',
			url : BASE_URL_SCOR+'CreateCategory',
			params : {'INSTITUTION_ID':currentUser.institutionID},
			data : DataSet,
			headers : {'Content-Type' : 'application/json'}
		}).success(function(data) 
				{$('#C_LoaderSpinner').hide();	
				if(data.StatusCode == 101)
				{  
					generateCategory(data);
					$('#Cat_input_box').slideUp();
					$('#CatName').val('');
					$("#category_weight").val(1);
					$('#main_error').text("").parent().slideUp();
				}else{
					$scope.error = "Request failed due to an internal error...Please contact 'System Admin'";
				}
				}).error(function(data)
						{   $('#C_LoaderSpinner').hide();
						console.log("We could not process your request......Please try later.")
						});
		
	}else{
		$('#main_error').text("Please enter Category Name").parent().slideDown();
	}
	};

	$scope.create_attribute = function() 
	{  if($('#attributeName').val() != "")
	{  $('#A_LoaderSpinner').show();
	   var DataSet = {'CatID' : $scope.CatID,'name' : $('#attributeName').val(),	
			          'weight' : $('#attribute_weight').val(),
			          'color' : $scope.AttributeColor
	   				 }
	
	$http({
		method : 'POST',
		url : APP_CONST.getConst('BASE_URL_SCORE')+'CreateAttribute',
		params:{'INSTITUTION_ID' : currentUser.institutionID},
		data : DataSet,
		headers : {'Content-Type' : 'application/json'}
	}).success(function(data)
		{ $('#A_LoaderSpinner').hide();
		if(data.StatusCode == 101)
		{ 
			generateAttribute(data);
			 $('#attribute_box').slideUp();
			 $('#attributeName').val('');
			 $('#attribute_weight').val(1);
			 $('#main_error').text("").parent().slideUp();
		}else{
			$scope.error = "Request failed due to an internal error...Please contact 'System Admin'";
		}
		}).error(function(data)
		{   $('#A_LoaderSpinner').hide();
		console.log("We could not process your request......Please try later.")
		});	
	}else{
		$('#main_error').text("Please enter Attribute Name").parent().slideDown();
	}
	};

	// update field dropdown at logic panel
	$(document.body).on('change', 'select[id^="logic_IFF_file"]', function()
			{    var value = $(this[this.selectedIndex]).val();
				var type = $(this[this.selectedIndex]).attr("title");
				var ids = $(this).next().attr("id");
				if(value !== "Select")
				{
					Update_Rule_Field(value,ids,type);
					// type added to check analytical fields
					
				}
			});

	// get the value of field dropdown value in addmatrix panel
	// and create score amtrix
	$(document.body).on('change', 'select[id^="logic_field"]',function() 
	{
		// check analytical file
		var FileType=$('select[id^="logic_IFF_file"] option:selected').attr("title");
		$('.logic_panel_row2').remove();
		var title = $(this[this.selectedIndex]).attr("title");
		var value = $(this[this.selectedIndex]).val();
		ids = $(this).attr("id");
// FTypes=FileType;
		if(FileType=="ANALYTICAL" && value != "Select" && (title != "undefined" || typeof title != 'undefined'))
		{	$('#MainBlock').css("opacity","0.17");
			$("#anltclRulePanel").slideDown().focus();
			$scope.createAntclRuleStructure(title);
		}		
		var valid =validate_field(title);
// console.log("Validation : "+valid);
		if(valid)
		 {
			$("#rule_error").text("You have already defined rule for this Field");
		 }else{
			add_new_rule('',ids);
		 }
	});

	// create new category
	$(document.body).on("click",'#add_Cat_box',function() 
			{
				$('#Cat_input_box').slideToggle().focus();
				Catcount = Catcount + 1;
			});
	// create new attribute for selected category
	$(document.body).on("click",'#add_attribute_box',function() 
			{	if(categoryFlag)
			{   $('#attribute_box').slideToggle().focus();
				plancount = plancount + 1;
			}else
			{   $(this).parent().append("<span class='error_msg' style=\"position: relative; display:block; color:red;\">Please select category!</span>");
				$('.error_msg').hide(2000);
			}
			});

	// create new field items for selected attributes
	$(document.body).on("click",'#addScoreField',function() 
			{ if(attributeFlag)
			{  $('.item').hide();
			   Update_Master(".IffDrpDwn");// call to recieve fields
			   $('#logic_panel').show();				 
			   $('#logic_panel_heading').text($scope.logic_panel_name);
			  $(this).hide();	
			}else{ 
				$(this).parent().append("<span class='error_msg' style=\"position: relative;display:block;color:red;\">Please select Attribute!</span>");
			  $('.error_msg').hide(2000);
			}	 
			});

	$scope.createRuleRow = function()
	{
		add_new_rule(FDataTypesUpdtd,ids);
	}

	// create new rule for field
	function add_new_rule(val,id)
	{   $("#rule_error").text("");
		FDataTypesUpdtd = [];			    
		var fieldCount;
		if((val.length == 0)||(typeof val == 'undefined'))
		{   fieldCount = $('div[id^=Field_Container]').length;
			Fname = [];
			Dname = [];
			FTypes = [];
			for(var c=0; c<fieldCount; c++)
			{
				var tempType = $("#logic_IFF_file"+c+" option:selected").attr("title");
				/*
				 * if(tempType=="ANALYTICAL") { Fname.push($("#logic_field"+c+"
				 * option:selected").attr("title")); }else
				 * if(tempType=="CUSTOM") { Fname.push($("#logic_field"+c+"
				 * option:selected").attr("title")); } else {
				 * Fname.push($("#logic_IFF_file"+c+"
				 * option:selected").text()+"$"+$("#logic_field"+c+"
				 * option:selected").attr("title")); }
				 */
				  Fname.push($("#logic_IFF_file"+c+" option:selected").text()+"$"+$("#logic_field"+c+" option:selected").attr("title"));
				  FDataTypesUpdtd.push($("#logic_field"+c+" option:selected").val());
				  Dname.push($("#logic_field"+c+" option:selected").text());
				  FTypes.push(tempType);
			}
		}else{
			FDataTypesUpdtd = val;
			fieldCount = val.length;
		}

		if(validate_rules())
		{   var idcount = $(".logic_panel_row2").length;
			if((idcount === "")||(typeof idcount == 'undefined'))
			{
				idcount = 0;
			}
			var domstr1 = '<div class="row logic_panel_row2" id="Rule'+idcount+'" style="position:relative">';
			domstr1 = domstr1+'<span class="col-md-2" style="position:absolute; right:0px;"><div class="col-md-7">';
			domstr1 = domstr1+'<input id="score'+idcount+'" type="text" class="form-control score" maxlength="3" name="Score" contextmenu="Number"/></div>';
			domstr1 = domstr1+'<div class="col-md-5"><a id="'+idcount+'" class="delete-rule">&times;</a></div></span>';						
			$('#logic_panel_body').append(domstr1);				   
			for(var c=0; c<fieldCount; c++)
			{
				create_structure(idcount, FDataTypesUpdtd[c], c, FTypes[c]);
			}
		}
	};


	function create_structure(rowno, type, index, fldType)
	{
		var  domstr1 = '<span id="Field'+index+'" class="col-md-10">';
		domstr1 = domstr1+'<div class="col-md-3 fname" name="'+fldType+'">'+Dname[index]+'</div>';
		domstr1 = domstr1+'<div class="col-md-3"><select id="condition'+rowno+index+'" class="form-control" name="Condition"></select></div>';
		domstr1 = domstr1+'<div class="col-md-3"><input id="value1'+rowno+index+'" type="text" class="form-control hiden" name="First Value"/></div>';
		domstr1 = domstr1+'<div class="col-md-3"><input id="value2'+rowno+index+'" type="text" class="form-control hiden" name="Second value"/></div></span>';
		$("#Rule"+rowno).append(domstr1);
		var id="#condition"+rowno+index;
		if((type === 'Number') || (type === 'N'))
		{   Exp_Drop_Downs(id,expressions.NumberExpression);
			$("body #value1"+rowno+index+",body #value2"+rowno+index+"").attr("contextmenu","Number");
		} else if((type === 'String') || (type === 'S'))
		{   Exp_Drop_Downs(id,expressions.StringExpression);
			$("body #value1"+rowno+index+",body #value2"+rowno+index+"").attr("contextmenu","String");
		} else if((type === 'Boolean') || (type === 'B'))
		{	Exp_Drop_Downs(id,expressions.BooleanExpression);				   
			$("body #value1"+rowno+index+",body #value2"+rowno+index+"").attr("contextmenu","Boolean");
		} else if((type === 'Date') || (type === 'D'))
		{	Exp_Drop_Downs(id,expressions.DateExpression);
			$(this).next("body #value1"+rowno+index+",body #value2"+rowno+index+"").attr("contextmenu","Date");
			$('#value1'+rowno+index+', #value2'+rowno+index+'').datepicker({changeMonth: true, changeYear: true, yearRange: "1900:2016", dateFormat: 'dd:mm:yy',defaultDate:(new Date(new Date()).getDate())});
		}				 

	}

// $(document.body).find('button[id^="Operator"]').click(function()
			$(document.body).on("click",'button[id^="Operator"]',function()
			{  
// alert("gh");
		var dom = $("div[id^=Field_Container]:last").clone();
			var id = dom.attr("id");
			var count = parseInt(id.slice(-1));
			dom.attr("id",id.slice(0,-1)+(++count));
			$(this).parent().before('<div class="col-md-1 op_and">&&</div>');
			$(this).parent().before(dom);
			$('select',dom).each(function(index,ele)
					{id = $(this).attr("id");
					$(this).attr("id",id.slice(0,-1)+count);
					});

			});

	function validate_field(fieldname)
	{ var error=false;
	  if((fieldname !== "")||(typeof fieldname !== undefined))
	  { for (var i = 0; i < dataset.master.length; i++) 
	  	{ if(dataset.master[i].plan != undefined)
		  {for(var j=0;j < dataset.master[i].plan.length; j++)
	  		{ if(dataset.master[i].plan[j].items != undefined)
			  { for(var f=0;f<dataset.master[i].plan[j].items.length;f++)
	  		 	{
	  			if(dataset.master[i].plan[j].items[f].logic[0].fieldname === fieldname)
	  			 { error = true;
	  			   return false;
	  			 }
	  		    }
			  }
	  		}
	  	  }
	    }
	  }
	if(error)
	{ return true;}
	else
	{ return false;}
	}

	function validate_rules()
	{ var error;
	  $('#logic_panel_body :input').each(function() 
	  { 
		if($(this).is(':visible'))
		{
			var index = $(this).attr("id");
			index = index.slice(-1);
			if(($(this).val() == '') || ($(this).val == undefined))
			{ $("body #rule_error").text("Please enter value of "+$(this).attr('name')+" at row "+(++index)+"");
				error = true;
				return false;
			}else if($(this[this.selectedIndex]).val()=="Select"){
				$("body #rule_error").text("Please Select Condition Expression");
				error = true;
				return false;
			}else if($(this[this.selectedIndex]).val()=="Select")
			{   $("body #rule_error").text("Please Select Field Name");
			error  = true;
			return false;
			}else{
				$("body #rule_error").text("");
				error = false;
			}
		}
			});				
	if(error)
	{return false;
	}else{
		return true;}
	}

	// update exiting rules
	$scope.UpdateScoringRules = function(ItemID)
	{ 	idcount = 0; 
		// use to update item rule
		$scope.Update_ItemID = ItemID;
		$('.item, #addScoreField').hide($('#logic_panel').slideDown());
		for(var i=0; i<$scope.fieldarrey.length;i++)
		{ if($scope.fieldarrey[i].ItemID === ItemID)
		  {   var rulearr = $scope.fieldarrey[i]; }
		}
		$scope.rule_update = true;
		$('#logic_panel_heading').text(rulearr.logic[0].displayname);
		$('#logic_panel_body #first_row').hide();
	
		// ---------------create rows of rule
		// matrix----------------------------------------
		for(var j=0; j<rulearr.logic.length; j++)
		{
			var domstr2 = '<div class="row logic_panel_row2" id="Rule'+j+'" style="position:relative">';
			domstr2 = domstr2+'<span class="col-md-2" style="position:absolute; top:0%; right:0px"><div class="col-md-7">';
			domstr2 = domstr2+'<input id="score'+j+'" type="text" class="form-control score" maxlength="3" name="Score" style="display:block" value="'+rulearr.logic[j].score+'" contextmenu="Number"/></div>';
			domstr2 = domstr2+'<div class="col-md-5"><a id="'+j+'" class="delete-rule">&times;</a></div></span>';						
			$('#logic_panel_body').append(domstr2);				   
			FDataTypesUpdtd = [], Fname=[], Dname =[], FTypes=[];
			create_Update_structure(j, 0 , rulearr.logic[j]);
	
			idcount = idcount+1;
		}
	}// update rules ends


	function create_Update_structure(rowno, index, rule)
	{   Fname.push(rule.fieldname);
		Dname.push(rule.displayname);
		FTypes.push(rule.FType);
		var  domstr1 = '<span id="Field'+index+'" class="col-md-10" rule="'+rule.AFSpec+'">';
		domstr1 = domstr1+'<div class="col-md-3 fname">'+rule.displayname+'</div>';
		domstr1 = domstr1+'<div class="col-md-3"><select id="condition'+rowno+index+'" class="form-control" name="Condition"></select></div>';
		domstr1 = domstr1+'<div class="col-md-3"><input id="value1'+rowno+index+'" type="text" class="form-control" name="First Value" value="'+rule.val1+'"/></div>';
		domstr1 = domstr1+'<div class="col-md-3"><input id="value2'+rowno+index+'" type="text" class="form-control" name="Second value" value="'+rule.val2+'"/></div></span>';
		$("#Rule"+rowno).append(domstr1);
		var Fid="#condition"+rowno+index;
	
		if((rule.exp1 !== rule.exp2)&&(rule.val1 !== "")&&(rule.val2 !== ""))
		{
			var exprsn = rule.exp1=='>='? '<=':rule.exp1 == '>'? '<':rule.exp1=='<='? '>=':rule.exp1=='<'? '>': '>';
			// ---------------bind the operator to dropdown
			getConditionOperator(exprsn, rule.exp2, Fid); 
		}else
		{
			// ---------------bind the operator to dropdown
			getConditionOperator(rule.exp1, rule.exp2, Fid); 
		}
		// --------------show ionput field which have value----------------
		if((rule.val1 !== "")&&(rule.val2 !== ""))
		{
			$("#value1"+rowno+index+", #value2"+rowno+index+"").show();
		}else if((rule.val1 === "")&&(rule.val2 !== "")){
			$("#value1"+rowno+index+"").show().val(rule.val2);
		}		 
		if((rule.ref != 'undefined')&&(rule.ref.length != 0))
		{
	// console.log(JSON.stringify(rule.ref[index]));
			create_Update_structure(rowno, index+1, rule.ref[index]);
		}
	}

	// bind value to drop down in expression
	function Exp_Drop_Downs(id,list,value)
	{   $(""+id+" option").remove();
		$.each(list, function(val, text) 
				{
			if((typeof value != 'undefined')&&(value == text.value))
			{
				$(id).append( $('<option selected="selected">').text(text.text).attr('value',text.value));
			}else{
				$(id).append( $('<option>').text(text.text).attr('value',text.value));
			}
				}); 
	}

	// ---------------bind operator value to scoring field LEVEL
	// rules----------------------------------------
	function getConditionOperator(exp1, exp2, ID, dataType)
	{	var Object;
		var brklp = false;
		var firstTime = true;
		for(var key in expressions)
		{  
			if(dataType!=undefined && dataType!="")
			{ Object=$scope.getExpression(dataType);
			  if(firstTime)
			  { FDataTypesUpdtd.push(dataType); 
			   console.log(ID+" : "+FDataTypesUpdtd);
			  }
			}
		   else
		   { Object=expressions[key];
		     if(firstTime)
			  { FDataTypesUpdtd.push(key.charAt(0)); }
		   }
		 for(var k=0; k< Object.length; k++)
		  {    // console.log(rulearr.logic[j].exp1+" :
			// "+(rulearr.logic[j].exp1 == exp2));
			if((exp1 != "")&&(exp1 == Object[k].value))
			{  if(exp1 == "<=" && exp2=="<")
				{Exp_Drop_Downs(ID,Object,'Between');}
				// select operaor for between condition from list and bind to
				// dropdown
				else if(exp1 == ">=" && exp2 == '>')
				{Exp_Drop_Downs(ID,Object,'! Between');}
				// select operaor/ for !between condition from list and bind to
				// dropdown
				else
				{Exp_Drop_Downs(ID,Object,Object[k].value);}
				// select operaor for other condition from list and bind to
				// dropdown
			
				brklp = true;
				return false;
			}
			firstTime=false;
		  }
			// find second operator if frist operator is not found in list
			if(brklp === false) 
			{for(var k=0; k< Object.length; k++)
			 { if((exp2 != "")&&(exp2 == Object[k].value))
			   { if(exp1 == "<=" && exp2 == '<')
			     {
				   Exp_Drop_Downs(ID,Object,'Between');
				 }else if(exp1 == ">=" && exp1 == '>')
			     {
					 Exp_Drop_Downs(ID,Object,'! Between');
				 }else
			     {
					 Exp_Drop_Downs(ID,Object,Object[k].value);
				 }
// FDataTypesUpdtd.push(key.charAt(0));
			  brklp = true;
			  return false;
			 }
			 firstTime=false;
			}
			}else if(brklp == true)
			{	
				break;
			}
		}
	}

	// bind operator value to dropdown in update panel of rule matrix
	function getConditionOperatorValue(exp1, exp2)
	{
		var brklp = false;
		for(var key in expressions)
		{ for(var k=0; k< expressions[key].length; k++)
		{    
			if((exp1 == "<=")&&(exp2 == '<'))
			{return expressions[key][7];}
			// select operaor for between condition from list and bind to
			// dropdown
			else if((exp1 == ">=")&&(exp1 == '>'))
			{return expressions[key][8];}
			// select operaor for !between condition from list and bind to
			// dropdown
			else if(exp2 == expressions[key][k].value)
			{return expressions[key][k];}
			// select operaor for other condition from list and bind to dropdown
		}

		}
	}

	$scope.DeleteScoringRules = function(ItemID)
	{
		var url=APP_CONST.getConst('BASE_URL_SCORE')+"DeleteFieldRules";
		var data = {"ID":ItemID };
		$scope.deleteObject(url,data,"STableRule");				

	}

	// create other fields inside scor matrix row in scor
	// matrix panel
	$(document.body).on('change', 'select[id^="condition"]', function()
		{   var value = $(this[this.selectedIndex]).val();
			idcount =0;
			
			$(this).parent().nextAll().children("input").hide().val("");
			$(this).parent().nextAll().children("select").hide().val("Select");
			if(value != "Select")
			{   $("#rule_error").text("");
				if(value == "null")
			    {
					$(this).parent().parent().prev().find('input[id^="score"]').show();
			    }else
				{ 
			    	$(this).parent().nextAll().children('input[id^="value1"]').show();
			    	$(this).parent().parent().prev().find('input[id^="score"]').show();
				}
// $(this).parent().parent().prev().children().children('input[id^="score"]').slideDown();
			if((value == "Between") || (value == "! Between"))
			{ $(this).parent().nextAll().children('input[id^="value1"],input[id^="value2"]').show();
			  $(this).parent().parent().prev().find('input[id^="score"]').show();
			} 
			/*
			 * else {
			 * $(this).parent().nextAll().children('input[id^="value2"]').hide().val(""); }
			 */
			}
			/*
			 * else{ $(this).parent().nextAll().children('input[id^="value1"],
			 * input[id^="value2"]').val("").hide();
			 * $(this).parent().parent().prev().children().children('input[id^="score"]').slideDown().val("").hide(); }
			 */
		});

	// build rule matrix json from logic panel
	$scope.saveLogic = function(callType)
	{
		if(!validate_rules())
		{
			return false;
		}
		$('#L_LoaderSpinner').show();
		var newmatrix={'logic':[],'AtID':$scope.AtID};
		var firstcondition, secondcondition, j=-1, val1, val2, type, error=false;
		var count = $('select[id^="condition"]').length;
		var specid="";
		$(".logic_panel_row2").each(function(index, element) 
		 {
			var lastScore = $(this).prev().find('input[id^="score"]').val();
			var curentScore = $(this).find('input[id^=score]').val();
			newmatrix.logic.push({'score' : curentScore ,'operator':'&&'});
			$("span[id^='Field']",$(this)).each(function(findex, element) 
			 {	    var displName = Fname[findex];						
					var dname = Dname[findex];
					var fType = FTypes[findex];
					if((FDataTypesUpdtd[findex] !== 'undefined') && (typeof FDataTypesUpdtd[findex] !== 'undefined') && (FDataTypesUpdtd[findex] !== ''))
					{ 
						type = FDataTypesUpdtd[findex];
						specid = $(this).attr("role");
					}else{
						type = $('#logic_field'+findex+' option:selected').val();
						fType = $('#logic_IFF_file'+findex+' option:selected').attr("title");
					}
					if(fType == "ANALYTICAL")
						{
						 specid = $('#logic_field'+findex+'').attr("role");
						 if(specid=="")
							{ $("body #rule_error").text("Please define the specification for selected field");
							  return false;
							}
						}

					var condition = $(this).find('select[id^="condition"]').val();
					var lastcondition = $(this).prev().find('select[id^="condition"]').val();			  
					var value1 = $(this).find('input[id^="value1"]').val();
					var value2 = $(this).find('input[id^="value2"]').val();

					if((type === 'Number') || (type === 'N')) 
					{ if(condition == "Between") 
					{ firstcondition = '<=';
					  secondcondition = '<';
					if(value2>value1)
					{ val1 = value1;
					  val2 = value2;
					}else{
						val1 = value2;
						val2 = value1;
					}
					} else if (condition == "! Between") 
					{ firstcondition = '>=';
					secondcondition = '>';
					if(value2>value1)
					{ val1 = value2;
					  val2 = value1;
					}else{
						val1 = value1;
						val2 = value2;
					}
					} else if ((condition == '>') || (condition == '>=')) 
					{ 	firstcondition = '';
						secondcondition = condition;
						val1 = '';
						val2 = value1;
					} else if ((condition == '<') || (condition == '<=')) 
					{ 	firstcondition = '';
						secondcondition = condition;
						val1 = '';
						val2 = value1;
					} else if ((condition == '==') || (condition == '!=')) 
					{	firstcondition = '';
						secondcondition = condition;
						val1 = '';
						val2 = value1;
					}
					} else if ((type === 'String') || (type === 'S')) 
					{ if (lastcondition === "is not") 
					{
						$("#rule_error").text("Please add condition 'is not' at last row");
						error = true;
						return false;
					}else if (lastcondition === "!contains") 
					{
						$("#rule_error").text("Please add condition 'Does Not Contains' at last row");
						error = true;
						return false;
					}else
					{	firstcondition = '';
						secondcondition = condition;
						val1 = '';
						val2 = value1;
					}
					} else if((type === 'Boolean') || (type === 'B')) 
					{
						if(lastcondition === 'is not')
						{	$("#rule_error").text("Please add condition 'is not' at last row");
						error= true;
						return false;
						}else
						{ 	firstcondition = '';
						   secondcondition = condition;
						   val1 = '';
						   val2 = value1;
						}
					}else if ((type === 'Date') || (type === 'D')) 
					{ if(lastcondition === 'is not')
					{
						$("#rule_error").text("Please add condition 'is not' at last row");
						error = true;
						return false;
					}else if (condition === "Between") 
					{  firstcondition = '<=';
					secondcondition = '<';
					if(value2>value1)
					{ val1 = value1;
					  val2 = value2;
					}else{
						val1 = value2;
						val2 = value1;
					}
					newmatrix.logic.pop(); // remove last condition for
											// combined rule
					} else if (condition === "! Between") 
					{	firstcondition = '>=';
					secondcondition = '>';
					if(value2>value1)
					{ val1 = value2;
					  val2 = value1;
					}else{
						val1 = value1;
						val2 = value2;
					}
					newmatrix.logic.pop(); // remove last condition for
											// combined rule
					}else
					{   firstcondition = '';
					secondcondition = condition;
					val1 = '';
					val2 = value1;
					}	
					}// date condition end //create rule
					// matrix in local cache variable
					var rule = {'val1':val1.toString().replace(/,/g ,""), 'exp1':firstcondition, 'fieldname':displName,'FType':fType,'AFSpec':specid, 'displayname':dname,
							'exp2':secondcondition, 'val2':val2.toString().replace(/,/g ,""), 'operator':'','ref':[]};
					if(findex === 0)
					{
						$.extend(newmatrix.logic[index],rule);
					}else {										 
						newmatrix.logic[index].operator = '&&';
						newmatrix.logic[index].ref.push(rule);											
					}
// console.log(findex+" : "+JSON.stringify(newmatrix));
					});
				});						
		if(error === false)
		{
			$("#rule_error").text("");
			if((callType === 'Update')&& ($scope.Update_ItemID != undefined))
			{					 				 
				$http({ method : 'POST',
					url : BASE_URL_SCOR+'UpdateFieldRules',
					params:{'INSTITUTION_ID':currentUser.institutionID,'ItemID':$scope.Update_ItemID},
					data : newmatrix,
					headers : {'Content-Type' : 'application/json'}
				}).success(function(data) 
						{	if(data.StatusCode == 101)
						{generateItems(data, "Logic_Update");						    	 	
						}	
						}).error(function(data)
								{console.log("We could not process your request......Please try later.")
								});							    
			}else if(callType === 'Create')
			{		 $http({method : 'POST',
				url : BASE_URL_SCOR+'CreateFieldRules',
				params:{'INSTITUTION_ID':currentUser.institutionID},
				data : JSON.stringify(newmatrix),
				headers : {'Content-Type' : 'application/json'}
			}).success(function(data) 
					{	if(data.StatusCode == 101)
					{generateItems(data, "Logic_Create");						    	 	
					}
					else{
						$scope.error = "Request failed due to an internal error...Please contact 'System Admin'";
					}	
					}).error(function(data)
							{console.log("We could not process your request......Please try later.")
							});
			}
			$('#L_LoaderSpinner').hide();
			close_logic_panel();
		}

	}


	// open context panel on click of add context button
	// click
	$scope.AddContext = function(value)
	{ 
		for(var i=0; i<dataset.master.length; i++)
		{
			$scope.category_list.push({'value':dataset.master[i].name});		    
		}
		$scope.ItemID = value;	  
		$('#context_panel').slideDown();
		$scope.hide_add_context_button = true;
		$('#context_panel_heading').text($scope.logic_panel_name);		
		$('.item').hide();
	};

	// open context panel on click of already existing
	// context field
	$(document.body).on('click', 'span[id^="context"]', function()
			{      $('#context_panel').slideDown();
			$scope.hide_add_context_button = true;
			$("#context_panel").focus();
			$('#context_panel_heading').text($scope.logic_panel_name);
			$('.item').hide();

			});

	// generate attribute drop down list after select master
	$scope.update_attribute_dropdown = function()
	{   var value = $scope.category_dropdown;
	$scope.attribute_list.splice(1,$scope.attribute_list.length-1);
	$scope.attribute_dropdown = $scope.attribute_list[0];
	if(value != "Select Category")
	{	for (var i = 0; i < dataset.master.length; i++) 
	{ if ((dataset.master[i].name == value) && (typeof dataset.master[i].plan != 'undefined'))
	{	for (var j = 0; j < dataset.master[i].plan.length; j++) 
	{	
		$scope.attribute_list.push({value:dataset.master[i].plan[j].name});			
	}		
	}
	}
	}
	};      

	$scope.update_attribute=function()
	{ 
	var jsonData = {'name':$("body #attributeName").val(),'weight':$("body #attribute_weight").val()};
	$http({
		method : 'POST',
		url : APP_CONST.getConst('BASE_URL_SCORE')+'Attribute',
		params:{'INSTITUTION_ID':currentUser.institutionID,'AtID':$scope.AtID,'CType':'Update','CatID':$scope.CatID},
		data:jsonData,
		headers : {	'Content-Type' : 'application/json'}
	}).success(function(Response) 
		{if(Response.StatusCode == 101)
		{ 							
			for(var obj in $scope.planarrey)
			{
				if(obj.AtID == $scope.AtID)
				{  obj.name = jsonData.name;
				   obj.weight=jsonData.weight;
				   break;
				}
			}
			$("body #attributeName").val("");
			$scope.plan="";
			$("body #attribute_weight").val(1);
			$('#attribute_box').slideUp();
		}else{
			$scope.error = "Request failed due to an internal error...Please contact 'System Admin'";
		}
		}).error(function(data){
			$scope.error = "System is under maintenance..Please try later";
		});
	}

	// generate the field drop down after select category
	$scope.update_field_dropdown = function()  
	{   var value = $scope.attribute_dropdown;
	$scope.field_list.splice(1,$scope.field_list.length-1);
	$scope.field_dropdown = $scope.field_list[0];
	if(value != "Select Attribute")
	{  for (var i = 0; i < dataset.master.length; i++) 
	{	if(typeof dataset.master[i].plan != 'undefined')
	{
		for (var j = 0; j < dataset.master[i].plan.length; j++) 
		{ if ((dataset.master[i].plan[j].name == value) && (typeof dataset.master[i].plan[j].items != 'undefined')) 
		{   for (var k = 0; k < dataset.master[i].plan[j].items.length; k++) 
		{   // create new
			// dropdown list
			// as per
			// attribute
			// selected
			$scope.field_list.push({value : dataset.master[i].plan[j].items[k].logic[0].fieldname});
		}
		}
		}
	}
	}		    		
	}
	};   

	$scope.update_category=function()
	{   
		var jsonData={'name':$("body #CatName").val(),'weight':$("body #category_weight").val()};
		$http({
			method : 'POST',
			url : APP_CONST.getConst('BASE_URL_SCORE')+'Category',
			params:{'INSTITUTION_ID':currentUser.institutionID,'CatID':$scope.CatID,
				     'TableID':$scope.ScoreTable,'CType':'Update'},
			data:jsonData,
			headers : {	'Content-Type' : 'application/json'}
		}).success(function(Response) 
			{if(Response.StatusCode == 101)
			{ 							
				for(var obj in $scope.CatArray)
				{
					if(obj.CatID == $scope.CatID)
					{ obj.name = jsonData.name;
					  obj.weight= jsonData.weight;
// console.log(dataset.name+""+dataset["name"]+""+dataset[name]);
					break;
					}
				} 
				$scope.cat="";
				$('#Cat_input_box').slideUp();
				$("body #CatName").val("");
				$("body #category_weight").val(1);
			}else{
				$scope.error = "Request failed due to an internal error...Please contact 'System Admin'";
			}
			}).error(function(data){
				$scope.error = "System is under maintenance..Please try later";
			});
	}


	// To display the scoring matrix inside context frame
	// for add button and existing context
	$scope.update_logic_body = function(fieldname, ItemID, callType) 
	{     if(callType == 'Create')
	{  fieldname = $scope.field_dropdown;
	if(fieldname != "Select Field")
	{	    	 
		$('#context_field_name').text(fieldname);
	}
	}
	for (var i = 0; i < dataset.master.length; i++) 
	{ if(typeof dataset.master[i].plan != 'undefined')
	{  for (var j = 0; j < dataset.master[i].plan.length; j++) 
	{ if(typeof dataset.master[i].plan[j].items != 'undefined')
	{ 	for (var k = 0; k < dataset.master[i].plan[j].items.length; k++) 
	{ if (dataset.master[i].plan[j].items[k].logic[0].fieldname == fieldname)
	{						
		$('#context_panel_row2').slideDown();
		$scope.context_score_matrix = dataset.master[i].plan[j].items[k].logic;
	}
	if(dataset.master[i].plan[j].items[k].ItemID === ItemID)
	{for(var f=0; dataset.master[i].plan[j].items[k].contextname.length; f++)
	{if(dataset.master[i].plan[j].items[k].contextname[f].field === fieldname)
	{$scope.context_array = dataset.master[i].plan[j].items[k].contextname[f].val;	
	$scope.ContextColor = dataset.master[i].plan[j].items[k].contextname[f].color;
	break;
	}
	}
	}
	else{
		$scope.context_array = 6;	
		$scope.ContextColor = dataset.master[i].plan[j].items[k].color;					
	}
	}
	}
	if(callType == 'Update')
	{	$scope.ItemID = ItemID;
	$scope.update_context = true;
	$scope.field_dropdown = fieldname;
	}	
	}
	}
	}			

	$("#context_Smatrix_panel").html('');
	$.each($scope.context_score_matrix, function(counter, text) 
			{	          
		var domstr = '<div class="row logic" ng-repeat="data in context_score_matrix" id="C_Smatrix'+counter+'"><div class="col-md-8">';
		domstr = domstr+'<div id="context_logic_expression">';
		domstr = domstr+'<span class="logic_matrix" style="width: 15%;text-align: left">'+text.val1+'</span>';
		domstr = domstr+'<span class="logic_matrix" style="width: 12%;text-align: left">'+text.exp1+'</span>';
		domstr = domstr+'<span class="logic_matrix" style="width: 33%;text-align: left">'+text.fieldname+'</span>';
		domstr = domstr+'<span class="logic_matrix" style="width: 12%;text-align: left">'+text.exp2+'</span>';
		domstr = domstr+'<span class="logic_matrix" style="width: 15%;text-align: left">'+text.val2+'</span>';
		domstr = domstr+'</div></div><div class="col-md-4">';
		domstr = domstr+'<select id="context_value'+counter+'" class="form-control context_value" style="text-align: center;"></select></div></div>';
		$("#context_Smatrix_panel").append(domstr);
		var idcount = counter;

		$.each( $scope.contextValueArray, function(count, text) 
				{	          
			if($scope.context_array[idcount] == $scope.contextValueArray[count])
				$('#context_value'+idcount+'').append('<option selected="selected">'+text+'</option>');
			else
				$('#context_value'+idcount+'').append('<option>'+text+'</option>');
				});	
			});
	};   

	$scope.save_context = function(calltype)
	{  $('#L_LoaderSpinner').show();
	var newContext={'field': $scope.field_dropdown,'color':$scope.AttributeColor,'ItemID':$scope.ItemID, 'AtID':$scope.AtID};	
	var count = $('select[id^="context_value"]').length;	
	var newItem={'val':[]};
	for(var i=0; i<count; i++)
	{ newItem.val.push($('#context_value'+i+'').val());
	}
	$.extend(newContext,newItem);

	if($scope.field_dropdown === undefined)// validate
		// input
	{
		$scope.context_error = "Please Select Field Name";

	}
	$scope.close_context_panel();
	if(calltype === 'Create')
	{	 			$scope.context_error = "";
	$http({ method : 'POST',
		url : APP_CONST.getConst('BASE_URL_SCORE')+'CreateAdjustment',
		params:{'INSTITUTION_ID':currentUser.institutionID},
		data : newContext,
		headers : {'Content-Type' : 'application/json'}
	}).success(function(data) 
			{$('#L_LoaderSpinner').hide();
			if(data.Statuscode === 101)
			{ 
				generateItems(data, "Context_Create");
			}else{
				$scope.error = "Request failed due to an internal error...Please contact 'System Admin'";
			}
			}).error(function(data)
					{console.log("We could not process your request......Please try later.")
					});
	}else if(calltype === 'Update')
	{
		$scope.context_error = "";
		$http({ method : 'POST',
			url : APP_CONST.getConst('BASE_URL_SCORE')+'UpdateAdjustment',
			params:{'INSTITUTION_ID':currentUser.institutionID},
			data : newContext,
			headers : {'Content-Type' : 'application/json'}
		}).success(function(data) 
				{$('#L_LoaderSpinner').hide();
				if(data.Statuscode === 101)
				{ 
					generateItems(data, "Context_Update");
				}else{
					$scope.error = "Request failed due to an internal error...Please contact 'System Admin'";
				}
				}).error(function(data)
						{console.log("We could not process your request......Please try later.")
						});
	}
	};


	// close context panel and reset values
	$scope.close_context_panel = function()
	{ 
		$scope.category_list.splice(1,$scope.category_list.length-1);
		$scope.category_dropdown = $scope.category_list[0];
		$scope.attribute_list.splice(1,$scope.attribute_list.lemgth-1);
		$scope.attribute_dropdown = $scope.attribute_list[0];
		$scope.field_list.splice(1,$scope.field_list.length-1);
		$scope.field_dropdown = $scope.field_list[0];
		$scope.update_context = false;
		$scope.hide_add_context_button =false;
		$scope.context_score_matrix = null;
		$('#context_panel, #context_panel_row2').hide();
		$('button[id=add_context], .item').show();
	}


	$(document.body).on('change', 'select[id^="weight"]', function()
			{ 	var weight = {'weight':$(this[this.selectedIndex]).val(),'AtID':$scope.AtID,'ItemID':$(this).attr("accesskey")}; 
			$('#L_LoaderSpinner').show();
			$http({ method : 'POST',
				url : APP_CONST.getConst('BASE_URL_SCORE')+'UpdateWeight',
				params:{'INSTITUTION_ID':currentUser.institutionID},
				data : weight,
				headers : {'Content-Type' : 'application/json'}
			}).success(function(data) 
					{
				$('#L_LoaderSpinner').hide();
				generateItems(data, "Weight_Update");
					}).error(function(data)
							{
						console.log("We could not process your request......Please try later.")
							});
			});


	// ---------------other---------------------------
	$('#add_item_level_rule').click(function() 
	{ $('#item_box').slideDown();	  
	});

	$(document.body).on('click', '.delete-rule', function()
			{
		$(this).parents('.logic_panel_row2').remove();
			});
	$(document).on('click', '.close', function(e) {
		$("#scoreTree").text("");
	});

// $('#close_logic_panel').click(function()
	$(document.body).on("click","#close_logic_panel",function()	   
			{
				close_logic_panel();  
			});


	function close_logic_panel()
	{ 
		$("body #rule_error").text("");
		$('.logic_panel_row2, .logic_panel_row1, div[id^="Field_Container"]:not(:first), .op_and').remove();
		$('select[id^="logic_field"]').removeAttr("role");
		$('select[id^="logic_field"] option:not(:first)').remove();
		$('#logic_panel select').val("Select");
		idcount = 0;
		$('#logic_panel_body #first_row').show();
		$('#logic_panel, #L_LoaderSpinner').hide($('.item, #addScoreField').show());
		$scope.rule_update = false;
		FDataTypesUpdtd = [];
		Dname=[]; Fname=[];
	}


	// create new rule of rule list
	$scope.submit_Rule = function()
	{	
		var data = {'name':this.rule_name,'type':this.rule_type,'createdby':$scope.username};
		if(!regex.test(this.rule_name))
			$('#TableError').text("Special Characters are not allowed").show().slideUp(3000);
		else if(this.rule_type == "Select" ||typeof this.rule_type == "undefined")
			$('#TableError').text("Please Select Rule Type").show().slideUp(3000);
		else{
			$('#T_LoaderSpinner').show();
			$http({ method : 'POST',
				url : APP_CONST.getConst('BASE_URL_SCORE')+'DecisionRules',
				params:{'INSTITUTION_ID':currentUser.institutionID,'RType':'ALL','CType':"Create"},
				data : data,
				headers : {'Content-Type' : 'application/json'}
			}).success(function(data) 
					{if(data.StatusCode === 101)
					{ 
						$scope.RuleList.push(data.Data);
					}else{
						$scope.error = "Request failed due to an internal error...Please contact 'System Admin'";
					}
					$('#T_LoaderSpinner').hide(1000); $scope.error = ""; 
					}).error(function(data)
							{$('#T_LoaderSpinner').hide(1000);
							console.log("We could not process your request......Please try later.")
							});
			this.rule_name = '';
			$scope.rule_type = "Select";
		}
	}


	// open BScore And Ascore add panel in matrix container
	$scope.Open_Add_panel = function(field, id)
	{	MField = field;
		if(field == "AScore")
		{	$("#BScore-block").hide();
			if($scope.AScoreList.length == 0)
				$scope.MFieldCode = 1;
			else
				$scope.MFieldCode = parseInt($scope.AScoreList[$scope.AScoreList.length-1].Code+1);
		}else if(field == "BScore"){
			$("#AScore-block").hide();
			if($scope.BScoreList.length == 0)
				$scope.MFieldCode = 'A';
			else{
				var charCode = parseInt($scope.BScoreList[$scope.BScoreList.length-1].Code.charCodeAt(0)+1);
				$scope.MFieldCode = String.fromCharCode(charCode);
			}
		}
// alert(id);
		if(id != null)
		{
			$("#add-matrixField-panel input").val("").hide();
		}
		if((id != null)&&(field == "AScore"))
		{ $scope.UpdateFlag = true;
		for(var obj in $scope.AScoreList)
		{
			if(obj.Code == id)
			{
				$scope.MFieldCode = obj.Code;
				if((obj.exp1 != '')&&(obj.exp2 != ''))
				{
					$scope.Expression = getConditionOperatorValue(obj.exp1,obj.exp2);
					$timeout(function(){
						$("#MFValue1").show().val(obj.val1);
						$("#MFValue2").show().val(obj.val2);
					});
					break;
				}
				else
					$scope.Expression = getConditionOperatorValue(obj.exp1,obj.exp2);
				$("#MFValue1").show().val(obj.val2);
			}
		}
		}else if((id != null)&&(field == "BScore"))
		{ $scope.UpdateFlag = true;
		  for(var obj in $scope.BScoreList)
		   {
			if(obj.Code == id)
			{
				$scope.MFieldCode = obj.Code;
				if((obj.exp1 != '')&&(obj.exp2 != ''))
				{
					$scope.Expression = getConditionOperatorValue(obj.exp1,obj.exp2);
					$timeout(function(){
						$("#MFValue1").show().val(obj.val1);
						$("#MFValue2").show().val(obj.val2);
					});
					break;
				}
				else
					$scope.Expression = getConditionOperatorValue(obj.exp1,obj.exp2);
				$("#MFValue1").show().val(obj.val2);
			}
		}
		}
		$("#MFieldCode").text($scope.MFieldCode);
		$("#add-matrixField-panel").show();
	}


	// validate input for add matrix column
	function validateMatrixRule()
	{ var error=false;
	   $('input:visible','select:visible','#add-matrixField-panel').each(function(index, ele)
	    {  
		  if(($(this).val() == "")||($(this).val() == 'undefined'))
			  { $('body #rule_error').text("Please enter "+$(this).attr("placeholder"));
			  	error =true;
			  	$(this).css("border-color","red");
			  	return false;
			  }else if($(this).val() == "Select"||$(this).val() == "select")
			  { $('body #rule_error').text("Please select "+$(this).attr("name"));
				error=true;  
			  	$(this).css("border-color","red");
			    return false;
			  }else{
				  error=false; 
    		      $(this).css("border-color","green");
    		      $('body #rule_error').text("");
			  }
	    });
		if(error)
		{ return false;}
		else
		{ return true;}
	}
	
	
	// create and save new matrix condotion in matrix container
	 $scope.add_MField = function(calltype)
	 {
	 	if(calltype =="add")
	 	 { if(validateMatrixRule())
		 	{
	 		var value1 = $("#MFValue1").val();
	 	    var value2 = $("#MFValue2").val();
		 	var Data = createMatrixJson(value1,value2,$scope.Expression.value,MField,MField,"N","","","");
	 		$http({ method : 'POST',
				url : APP_CONST.getConst('BASE_URL_SCORE')+'DecisionRules',
				params:{'INSTITUTION_ID':currentUser.institutionID,'RuleID':$scope.Rule,'RType':'Matrix','FType':MField,'CType':'Create'},
				data : Data,
				headers : {'Content-Type' : 'application/json'}
			}).success(function(data) 
			 {$('#T_LoaderSpinner').hide(1000); $scope.error = ""; 
				if(data.StatusCode === 101)
				{ 
				 if(MField == "AScore")
				    	{ $scope.AScoreList.push(data.Data);
				   		}else if(MField == "BScore")
		    			{ $scope.BScoreList.push(data.Data);
		    			}
				  Rules.createColumn("decision_matrix",$scope.BScoreList,$scope.AScoreList,$scope.outcomeList);
				  $scope.CloseFieldPanel();
				}else{
					$scope.error = "Request failed due to an internal error...Please contact 'System Admin'";
				}
			 }).error(function(data)
				{
				 $('#T_LoaderSpinner').hide(1000);
				 console.log("We could not process your request......Please try later.");
				});
		 	}
	 	 }else if(calltype == 'delete')
	 		 { var data ="{'Code':"+$scope.MFieldCode+"}";
		 		$http({ method : 'POST',
					url : APP_CONST.getConst('BASE_URL_SCORE')+'DecisionRules',
					params:{'INSTITUTION_ID':currentUser.institutionID,'RuleID':$scope.Rule,'RType':'Matrix','FType':MField,'CType':'Delete'},
					data : data,
					headers : {'Content-Type' : 'application/json'}
				  }).success(function(data) 
				  { $('#T_LoaderSpinner').hide(1000); $scope.error = ""; 
					  if(data.StatusCode === 101)
					{ 
					  if(MField == "BScore")
				    	{ $scope.BScoreList = $.grep($scope.BScoreList, function(e) { return e.Code != $scope.MFieldCode});
				   		}else if(MField == "AScore")
						{  $scope.AScoreList = $.grep($scope.AScoreList, function(e) { return e.Code != $scope.MFieldCode});
						}
					  Rules.createColumn("decision_matrix",$scope.BScoreList,$scope.AScoreList,$scope.outcomeList);
					  $scope.CloseFieldPanel();
					}else{
						$scope.error = "Request failed due to an internal error...Please contact 'System Admin'";
					}
				  }).error(function(data)
					{
					 $('#T_LoaderSpinner').hide(1000);
					 console.log("We could not process your request......Please try later.");
					});
	 		 }
	 		 else if(calltype == 'update')
		    	{  if(validateMatrixRule())
			 	  {
		    		var value1 = $("#MFValue1").val();
		    		var value2 = $("#MFValue2").val();
		    	    var Data = createMatrixJson(value1,value2,$scope.Expression.value,MField,MField,"N","","","");
	 		 	     $http({ method : 'POST',
					   url : APP_CONST.getConst('BASE_URL_SCORE')+'DecisionRules',
					   params:{'INSTITUTION_ID':currentUser.institutionID,'RuleID':$scope.Rule,'RType':'Matrix','FType':MField,'CType':'Update'},
					   data : Data,
					   headers : {'Content-Type' : 'application/json'}
	 		 	     }).success(function(data) 
	 		 	    		 {$('#T_LoaderSpinner').hide(1000); $scope.error = ""; 
	 		 	    		 if(data.StatusCode === 101)
	 		 	    		 { 
	 		 	    		  if(MField == "BScore")
	 		 	    		   { 
	 		 	    			 for(var i=0; i<$scope.BScoreList.length; i++)
	 		 	    		     {
		 						  if($scope.BScoreList[i].Code == $scope.MFieldCode)
		 							{
		 							 
		 							 $scope.BScoreList[i] = Data;
		 							}
		 					}
				   		}else if(MField == "AScore")
						{  
				    	   for(var i=0; i<$scope.AScoreList.length; i++)
			 				{
			 				 if($scope.AScoreList[i].Code == $scope.MFieldCode)
			 					{ 
			 					  $scope.AScoreList[i] = Data;
			 					}
			 				}
						}
					  Rules.createColumn("decision_matrix",$scope.BScoreList,$scope.AScoreList,$scope.outcomeList);
					  $scope.CloseFieldPanel();
					}else{
						$scope.error = "Request failed due to an internal error...Please contact 'System Admin'";
					}
				  }).error(function(data)
					{
					 $('#T_LoaderSpinner').hide(1000);
					 console.log("We could not process your request......Please try later.");
					});
			 	  }
		    	}
	 }
	 
	 // create rule json for matrix
	 function createMatrixJson(value1,value2,condition,displName,fdname,DataType,FType,FSpecID,oprtr,expEvalType)
	 {
// console.log("inside JSON : "+value1,value2,DataType)
		
		 if(condition=="Select")
		 { condition = ""; 
		 }
	   var firstcondition, secondcondition;
	   if ((DataType === 'Number') || (DataType === 'N')) 
	   {  
		  if(condition  == "Between") 
	      { firstcondition = '<=';
			secondcondition = '<';
			if(Number(value2.replace(/,/g ,""))>Number(value1.replace(/,/g ,"")))
		 	{ val1 = value1;
			  val2 = value2;
			}else{
				val1 = value2;
				val2 = value1;
			}
		  } else if (condition  == "! Between") 
		    { firstcondition = '>=';
			  secondcondition = '>';
			 if(Number(value2.replace(/,/g ,""))>Number(value1.replace(/,/g ,"")))
		 	 { val1 = value2;
			  val2 = value1;
			 }else{
				val1 = value1;
				val2 = value2;
			 }
		    } else if ((condition  == '>') || (condition  == '>=')) 
		      { firstcondition = '';
		     	secondcondition = condition ;
		     	val1 = '';
		     	val2 = value1;
		      } else if ((condition  == '<') || (condition  == '<=')) 
		      	{ firstcondition = '';
		      	  secondcondition = condition ;
		      	  val1 = '';
		      	  val2 = value1;
		      	} else if ((condition  == '==') || (condition  == '!=')) 
		      	  {	firstcondition = '';
		      	  	secondcondition = condition ;
		      	  	val1 = '';
		      	  	val2 = value1;
		      	  }else{
		      		firstcondition = '';
		      	  	secondcondition = condition ;
		      	  	val1 = '';
		      	  	val2 = value1;
		      	  }
	 		}else if ((DataType === 'String') || (DataType === 'S')) 
				{ firstcondition = '';
				  secondcondition = condition;
				  val1 = '';
				  val2 = value1;
				} 
	 		else if((DataType === 'Boolean') || (DataType === 'B')) 
			  { firstcondition = '';
			 	secondcondition = condition;
			 	val1 = '';
			 	val2 = value1;
			  }
	 		else if ((DataType === 'Date') || (DataType === 'D')) 
		 	   { if (condition === "Between") 
		 		 {  firstcondition = '<=';
		 			secondcondition = '<';
		 			val1 = value1;
		 			val2 = value2;
		 		 } else if (condition === "! Between") 
		 		 	{	firstcondition = '>=';
		 		 		secondcondition = '>';
		 		 		val1 = value1;
		 		 		val2 = value2;
		 		 	}else
	 		 		{  firstcondition = '';
	 		 		   secondcondition = condition;
	 		 		   val1 = '';
	 		 		   val2 = value1;
	 		 		}	
			 	}else if ((DataType === 'DPD') || (DataType === 'DPD')) 
				{ firstcondition = '';
				  secondcondition = condition;
				  val1 = '';
				  val2 = value1;
				} 
 		var result = {'val1':val1,'exp1':firstcondition,'fieldname':displName,'displayname':fdname,"ExpType":expEvalType,
 				'FType':FType,'DType':DataType,'AFSpec':FSpecID,'exp2':secondcondition,'val2':val2,'Code':$scope.MFieldCode,
 				'operator':(oprtr=="undefined"?"":oprtr)};
 		return result;
	 }
	
	// change outcoe of selected condition
	$(document.body).on('change', 'select[id^="OutCome"]', function()
			{ 
		var value = $(this[this.selectedIndex]).val();
		var select = $(this).parent();
		var data ={'Key':$(this).attr("name")+$(this).attr("title"),'value':value};
		$http({ method : 'POST',
			url : APP_CONST.getConst('BASE_URL_SCORE')+'DecisionRules',
			params:{'INSTITUTION_ID':currentUser.institutionID,'RuleID':$scope.Rule,'RType':'Matrix','CType':'OutCome'},
			data : data,
			headers : {'Content-Type' : 'application/json'}
		}).success(function(data) 
				{
			if(data.StatusCode === 101)
			{ 
				for(var obj in $scope.OutputList)
				{
					if(obj.value == value)
						select.css("background-color",obj.color);
				}
			}else{
				$scope.error = "Request failed due to an internal error...Please contact 'System Admin'";
			}
				}).error(function(data)
						{
					console.log("We could not process your request......Please try later.");
						});
		// value ascore+bscore send in call
// $scope.save_outcome(value, $(this).attr("name")+$(this).attr("title"));
			});


	// expresson change in add matrix column or BScore and Ascore
	$scope.expChange=false;
	$scope.Expression_change = function()
	{
		$scope.expChange=true;		
		if($scope.Expression.value == "Select")
		{
			$("#MFValue1, #MFValue2").slideUp().val("");
		}else if(($scope.Expression.value == 'Between')||($scope.Expression.value == '! Between')){
			$("#MFValue1, #MFValue2").show().val("");
		}else{
			$("#MFValue2").hide().val("");
			$("#MFValue1").show().val("");
		}
	}

	/*
	 * $scope.load_criteria = function(criteriaid, calltype) { if(calltype ===
	 * "view") { for(var i=0; i<$scope.RcriteriaList.length; i++)
	 * {if($scope.RcriteriaList[i].criteriaID === criteriaid) {
	 * $scope.criteriaRules = $scope.RcriteriaList[i].rules; } }
	 * $("#criteria-table-div").hide($("#criteria-rule-matrix").slideDown());
	 * }else{ alert("You are not authorised for "+calltype+" operation"); } }
	 */
	// get all master for drop down list
	function Update_Master(id)
	{
		$http({
			method : 'POST',
			url : APP_CONST.getConst('BASE_URL_SCORE')+'IFFDropDown',
			params : {'INSTITUTION_ID':currentUser.institutionID,'CType':'FindAll'},
			headers : {'Content-Type' : 'application/json'}
		}).success(function(data) 
		{   
// console.log("IFF :"+JSON.stringify(data));
			if(data.StatusCode == 101 && data.Data != null)
			{ $scope.IFFList = data.Data;
			  $("body "+id+"").each(function() 
				  {  var obj = $(this);
				     $(this).find('option:not(:first)').remove();
				     $.each(data.Data, function(val, text) 
				     {
			    	  // add file type to select drop down and bind list
				     if(text.status=="Approved")
				      { $(obj).append('<option value="'+text.FileID+'" title="'+text.Type+'">'+text.Name+'</option>');}
					 });
				  });
			}else
				{
				  $scope.IFFList = [];
				}
		}).error(function(data)
			{
				console.log("We could not process your request......Please try later.")
			});
	}// end master
	
	// select file in criteria panel rule row
	 $(document.body).on('change', 'select[id^="IFF_File_first"], select[id^="IFF_File_second"], select[id="aggr_file"]', function()
	 		{ 	$("body #rule_error").text("");
	 			var value = $(this[this.selectedIndex]).val();
	 			var type = $(this[this.selectedIndex]).attr("title");
	 			if(value != "Select")
	 				{
	 				// alert($(this).next().attr("id"));
	 				if($(this).next().next().attr("id") != undefined)
	 				    Update_Rule_Field(value, $(this).next().next().attr("id"),type);
	 				else
	 					Update_Rule_Field(value, $(this).parent().next().children("select").attr("id"),type);
	 				}
	 		});
	

	 $(document.body).on('change', 'select[id^="IFF_Field_first"]', function()
	    		{ 	 $("body #rule_error").text("");
 	 				var value = $(this[this.selectedIndex]).text();
	    			var fieldType = $(this[this.selectedIndex]).val();
	    			var title = $(this[this.selectedIndex]).attr("title");
	    			var FileType = $(this).prev().prev().find("option:selected").attr("title");
	    			ids = $(this).attr("id");
	    			var idno = ids.slice(-2);
	    			$('#expression'+idno+' option').remove();
	    			$("#ExpType"+idno+"").val("Value");
	    			$("#ExpValueFirst"+idno+"").hide();
	    			$(this).parent().find(".hiden").removeAttr("readonly contextmenu").removeClass("hasDatepicker").hide();
	    			$(this).parent().find("input").text("");
	    			 $("div[id^='ui-datepicker-div']").remove();
	    			if(value != "Select Field" || value != "Select")
	    				{
	    				if(FileType=="ANALYTICAL" && (title != "undefined" || typeof title != 'undefined'))
	    				{	$('#MainBlock').css("opacity","0.17");
	    					$("#anltclRulePanel").slideDown().focus();
	    					$scope.createAntclRuleStructure(title);
	    				}
	    				if((fieldType === 'Number') || (fieldType === 'N'))
				  	    {   $("body #firstValue"+idno+",body #secondValue"+idno+"").attr("contextmenu","Number");
				  	    	$("#ExpType"+idno+" option[value='Fraction']").attr("disabled",false);
	    					Exp_Drop_Downs('#expression'+idno,expressions.NumberExpression);
						   		} else if((fieldType === 'String') || (fieldType === 'S'))
						   		    {$("#ExpType"+idno+" option[value='Fraction']").attr("disabled","disabled");
						   			 $("body #firstValue"+idno+",body #secondValue"+idno+"").attr("contextmenu","String");
						   			 Exp_Drop_Downs('#expression'+idno,expressions.StringExpression);				   			
						   		    } else if((fieldType === 'Boolean') || (fieldType === 'B'))
						   		        {$("#ExpType"+idno+" option[value='Fraction']").attr("disabled","disabled");
						   		    	 Exp_Drop_Downs('#expression'+idno,expressions.BooleanExpression);				   			
						   		        } else if((fieldType === 'Date') || (fieldType === 'D'))
						   		           {$("#ExpType"+idno+" option[value='Fraction']").attr("disabled","disabled");
						   		        	Exp_Drop_Downs('#expression'+idno,expressions.DateExpression);
						   		            $('#firstValue'+idno+', #secondValue'+idno+'').datepicker({changeMonth: true, changeYear: true, 
						   		            	yearRange: "1900:2016",dateFormat: 'dd:mm:yy',defaultDate:(new Date(new Date()).getDate())}).attr('readonly','readonly');
						   		           }	
	    				}
	    			
	    		});
	 /* $('#vfrom, #vtill').datepicker({changeMonth: true, changeYear: true, yearRange: "1900:2016",
			dateFormat: 'dd:mm:yy',defaultDate:(new Date(new Date()).getDate())}).attr('readonly','readonly');
*/

	// expression change in criteria panel ule row
    $(document.body).on('change', 'select[id^="expression"]', function()
	    		{ $("body #rule_error").text("");
 	   		  	  var value = $(this[this.selectedIndex]).val();
	    		  var idno = $(this).attr("id");
// var CompareType = $(this).prev().children("div :visible").attr("title");
	    		  var CompareType = $(this).prevUntil("select[id^='ExpType'] option:selected","select").val();
	    		  idno = idno.slice(-2);
	    		  $(this).nextAll("input").val("").hide();
	    		  $(this).nextAll("select").val("Select").hide();
	    		  /*
					 * if((value == "select")||(value == "Select")) {
					 * $('#firstValue'+idno+',
					 * #secondValue'+idno+'').hide().val('');
					 * $('#IFF_File_second'+idno+',
					 * #IFF_Field_second'+idno+'').val("Select").hide(); }
					 */
	    		  if(value != "Select" && value !="select" && value != "null")
	    		  { if(CompareType == "Field")
 				    { if(value == "Between" || value == "! Between")
 				    	{
 				    	  alert("Between for Field comparision is not allowed");
 				    	}else
			    		{
	// $('#firstValue'+idno+', #secondValue'+idno+'').hide().val('');
	 				  	 $('#IFF_File_second'+idno+', #IFF_Field_second'+idno+'').val("Select").show();
			    		}
 				    }else if(CompareType == "Fraction")
					  { 
// $('#firstValue'+idno+', #secondValue'+idno+'').hide().val('');
	 				  	$('#IFF_File_second'+idno+', #IFF_Field_second'+idno+'').val("Select").show();
	 				  	if((value == "Between")||(value == "! Between"))
	    				  {
	 				  		$('#ExpValueMin'+idno+',#ExpValueMax'+idno+'').show().val('');
	    				  }
// else{
// $('#ExpValueMax'+idno+'').hide().val("");
// $('#ExpValueMin'+idno+'').show().val("");
// }
					  }else if(CompareType == "Value")
					  {		    			  
		    			  if((value == "Between")||(value == "! Between"))
		    			  {
		    				  	$('#firstValue'+idno+', #secondValue'+idno+'').show().val('');
		    			  }else{
		    				  $("#firstValue"+idno+"").show().val("");
		    			  }
					  }
	    		  }
	    		});


	// update rulke field dropdown in criteria panel
	function Update_Rule_Field(IFF_File, id, iffType)
	  {    var fieldtype = $("#IFF_Field_first"+id.slice(-2)+" option:selected").val(); // get
																						// type
																						// of
																						// first
																						// field
																						// in
																						// criteria
	       $http({
					method : 'POST',
					url : BASE_URL_SCOR+'FieldDropDown',
					params : {'FileID':IFF_File,'INSTITUTION_ID':currentUser.institutionID,"FileType":iffType},
					headers : {'Content-Type' : 'application/json'}
				  }).success(function(data) 
					{ 		
					  if(data.StatusCode == 101 && data.Data != null)
					  { $('#'+id+' option:not(:first)').remove();
					    $.each(data.Data, function(val, text) 
					       {    
						    if(text.ACTIVE == 1)
						     { if(fieldtype != undefined && id == "IFF_Field_second"+id.slice(-2))
						         {$('#'+id).append( $('<option>').text(text.DISPLAY_NAME).attr({'value':text.FIELD_TYPE,'title':text.FIELD_NAME,'disabled':(text.ACTIVE == 1)&&(fieldtype != text.FIELD_TYPE)?true:false}));}
					  		   else if(id == "aggr_field")
					  		     {$('#'+id).append( $('<option>').text(text.DISPLAY_NAME).attr({'value':text.FIELD_TYPE,'title':text.FIELD_NAME,'disabled':(text.FIELD_TYPE == 'N')||(text.FIELD_TYPE == 'Number')?false:true}));}
					  		   else if($("#"+id+"").attr("contextmenu")=="N")
					  		     { if(text.FIELD_TYPE=="N"||text.FIELD_TYPE=="Number")
					  			   { $('#'+id).append( $('<option>').text(text.DISPLAY_NAME).attr({'value':text.FIELD_TYPE,'title':text.FIELD_NAME}));}
					  		     }
					  		  else if($("#"+id+"").attr("contextmenu")=="D")
				  		       { if(text.FIELD_TYPE=="D"||text.FIELD_TYPE=="Date")
				  			     { $('#'+id).append( $('<option>').text(text.DISPLAY_NAME).attr({'value':text.FIELD_TYPE,'title':text.FIELD_NAME}));}
				  		       }
					  		 else if($("#"+id+"").attr("contextmenu")=="S")
				  		       { if(text.FIELD_TYPE=="S"||text.FIELD_TYPE=="String")
				  			     { $('#'+id).append( $('<option>').text(text.DISPLAY_NAME).attr({'value':text.FIELD_TYPE,'title':text.FIELD_NAME}));}
				  		       }
					  		   else
					  		     {$('#'+id).append( $('<option>').text(text.DISPLAY_NAME).attr({'value':text.FIELD_TYPE,'title':text.FIELD_NAME}));}
						      }
				             });
					    if(iffType=="ANALYTICAL")
					    { $scope.AntclFieldList=data.Data;}
					    if(iffType=="CUSTOM")
					    { $scope.cstmFieldList=data.Data;}
					  }else
						{}
					}).error(function(data)
					{console.log("We could not process your request......Please try later.");});
	    	   	
	  }
	
	// validate rules in criteria panel
	 function validate_criteriaRule(id)
      {  var error=false;
   	
   		  $('input[type="text"]:visible, select:visible', '#'+id+'').each(function(index, ele)
   		  {   var idno = $(this).attr("id");
   			  if(($(this).val() == "")||($(this).val() == 'undefined'))
   			  { $("body #rule_error").text("Please enter "+$(this).attr("placeholder")+" at Rule no "+idno.slice(-2)+"");
   			  	error =true;
   			  	$(this).css("border-color","red").focus();
   			  	return false;
   			  }else if($(this).val() == "Select"||$(this).val() == "select")
   			  { $("body #rule_error").text("Please select "+$(this).attr("name")+" at Rule no "+idno.slice(-2)+"");
   				error=true;  
   			  	$(this).css("border-color","red").focus();
   			    return false;
   			  }else{
   				  error=false; 
	    		  $(this).css("border-color","green");
   			  }
   		  });
   		 
   	  if(error === true)
   		  {
   		  return false;
   		  }else{
   			  $("body #rule_error").text("");
   			  return true;
   		  }
      }
	
	$(document.body).on("click","#BScore, #AScore",function(){
		MField = $(this).attr("id");
		$(this).toggleClass("glyphicon-plus glyphicon-minus");
		$scope.Open_Add_panel(MField,null);
	});

	$scope.CloseFieldPanel = function()
	{    $("#BScore,#AScore").removeClass("glyphicon-minus").addClass("glyphicon-plus");
		$("#add-matrixField-panel").hide();
		$("#add-matrixField-panel input").val("").hide();
		$("#AScore-block, #BScore-block").show();    
		$timeout(function()
		{   $scope.Expression = $scope.ExpressionList[0];
			$scope.error = '';
			$scope.UpdateFlag = false;
		});
	};

	
	
	$(document.body).on("click","#add_criteria",function(){
		 $("#criteria-table-div").hide();
		 $("#add-criteria-panel").show();
		 $scope.CrRuleUpdate=false;
		 $scope.cruleID='';
// Update_Master("IFF_File_first00");
// Update_Master("IFF_File_second00");
	 });
	 
	$scope.editCriteriaRule=function(ruleId)
	{$("#criteria-table-div").hide();
// $("#crit_box").append($("#add-criteria-panel").clone().attr("id","add-criteria-panel1"));
// $("#add-criteria-panel1").find("#COutcome, #CQueue, .OUTOperator,
// #criteria_name, #criteria_priority").remove();
	 $("#add-criteria-panel").show(500);
	 $scope.cruleID=ruleId;
	 $scope.CrRuleUpdate=true;
// $("#crule").hide();
	   for(var obj in $scope.RcriteriaList)
		 {
		 if(obj.CriteriaID == ruleId)
			 {
			 $("#COutcome").val(obj.Outcome);
			 $("#criteria_name").val(obj.cname);
			 if(obj.remark)
			 { $("#cRemark").val(obj.remark).show(); }
			 for(var v=0; v<obj.rules.length; v++)
				{ var t=v-1;  
				 if(v != 0)
					  { 
						create_outer("#add-criteria-panel",$("#add-criteria-panel").find("button.OUTOperator[value='"+obj.rules[0].outOperator+"']"));
	// create_inner("#add-criteria-panel",$("#add-criteria-panel").find("button[value='"+obj.rules[0].operator+"'][class='INOperator']"));
					  }
				 	var div = $("#add-criteria-panel").find("#criteriaRule"+v+"0:visible");
				 	$(div).find("#expression"+v+"0 option, #FieldObj").remove();
				 	getConditionOperator(obj.rules[v].exp1,obj.rules[v].exp2,"#expression"+v+"0",obj.rules[v].DType);
				 	$(div).find("#IFF_File_first"+v+"0").hide().after("<span id='FieldObj' class='equal' name='"+obj.rules[v].fieldname+"'>"+obj.rules[v].displayname+"</span>");
				 	$(div).find("#IFF_Field_first"+v+"0").hide();
				 	$(div).find("#FieldObj").attr("role",obj.rules[v].FType);
				 	if(obj.rules[v].val1 && obj.rules[v].val2)
					 	{$(div).find("#firstValue"+v+"0").val(obj.rules[v].val1).show();
				 		 $(div).find("#secondValue"+v+"0").val(obj.rules[v].val2).show();}
				 	if(obj.rules[v].val1)
				 		{$(div).find("#firstValue"+v+"0").val(obj.rules[v].val1).show();}
				 	if(obj.rules[v].val2)
				 		{$(div).find("#firstValue"+v+"0").val(obj.rules[v].val2).show();}
				 	for(var h=0; h< obj.rules[v].ref.length; h++)
				 		{   var m=h+1;
				 			create_inner("#add-criteria-panel",$("#criteria_rule_body"+v).find("button.INOperator[value='"+obj.rules[v].operator+"']"));
				 	
					 		var div = $("#add-criteria-panel").find("#criteriaRule"+v+""+m+":visible");
						 	$(div).find("#expression"+v+""+m+" option, #FieldObj").remove();
						 	getConditionOperator(obj.rules[v].ref[h].exp1,obj.rules[v].ref[h].exp2,"#expression"+v+""+m,obj.rules[v].ref[h].DType);
						 	$(div).find("#IFF_File_first"+v+""+m).hide().after("<span id='FieldObj' class='equal' name='"+obj.rules[v].ref[h].fieldname+"'>"+obj.rules[v].ref[h].displayname+"</span>");
						 	$(div).find("#IFF_Field_first"+v+""+m).hide();
						 	$(div).find("#FieldObj").attr("role",obj.rules[v].ref[h].FType);
						 	if(obj.rules[v].ref[h].val1 && obj.rules[v].ref[h].val2)
							 	{$(div).find("#firstValue"+v+""+m).val(obj.rules[v].ref[h].val1).show();
						 		 $(div).find("#secondValue"+v+""+m).val(obj.rules[v].ref[h].val2).show();}
						 	if(obj.rules[v].ref[h].val1)
						 		{$(div).find("#firstValue"+v+""+m).val(obj.rules[v].ref[h].val1).show();}
						 	if(obj.rules[v].ref[h].val2)
						 		{$(div).find("#firstValue"+v+""+m).val(obj.rules[v].ref[h].val2).show();}
				 		}
				 }
			 break;
			 }
		 }
	}
	
	 $(document.body).on("click","#criteria_panel_close", function()
	    {  if($(document.body).find("#add-criteria-panel1").is(":visible"))
	       {	$scope.closeCriteriaPanel(); 
	       } 
		 });


	 $scope.closeCriteriaPanel = function()
	 {	 $("#add-criteria-panel").hide();
	 	 $("body #rule_error").text("");
	     $("#add-criteria-panel1,#add-criteria-panel #FieldObj").remove();
		 $("#criteria-table-div").show(500);
		 $("#add-criteria-panel .criteria_rule_body:not(:first)").remove();
		 $("#add-criteria-panel .criteriaRules:not(:first)").remove();
		 $("#crule, button.INOperator, button.OUTOperator, #IFF_File_first00,#IFF_Field_first00").show();
		 $("#add-criteria-panel input, #add-criteria-panel1 input").val("");
		 $("span[id^='INOp_Value'], span[id^='OUTOp_Value']").text("").hide();
		 $("#add-criteria-panel input,#add-criteria-panel select").css("border-color","#CCC");
		 $("#add-criteria-panel .hiden").hide();
		 $("#add-criteria-panel select:not(select[id^='ExpType'])").val("Select");
		 $("select[id^='IFF_Field'] option:not(:first), select[id^='expression'] option:not(:first)").remove();
		 FDataTypesUpdtd=[];
	 };
	
	// change field and value slider button
	 $(document.body).on('change', 'select[id^="ExpType"]', function()
	 {	 var value = $(this[this.selectedIndex]).val();
			if(value == "Value"){
				$(this).prev().prev().val("").hide();
				$(this).nextAll("input, select:not(:first)").hide();
				$(this).nextAll("select[id^='expression']").val("Select").children("option[value='Between'], option[value='! Between']").attr("disabled","disabled");
			} else if(value == "Field")
			{	$(this).nextAll("input,select:not(:first)").hide();
				$(this).prev().prev().val("").hide();
				$(this).nextAll("select[id^='expression']").val("Select").children("option").attr("disabled",false);
			} else if(value == "Fraction")
			{	$(this).nextAll("input,select:not(:first)").hide();
			    $(this).prev().prev().val("").show();
				$(this).nextAll("select[id^='expression']").val("Select").children("option").attr("disabled",false);
			}					 
	 });

	
	// change field and value slider button
	 $(document.body).on('click', '.radio_inner_div', function()
	 {  if(! $scope.ViewMode){
		var type = $(this).attr("title");
		if(type == "Value"){
			$(this).hide();
			$(this).next().show();
			$(this).parent().nextAll("input, select:not(:first)").hide();
			$(this).parent().next("select[id^='expression']").val("Select").children("option[value='Between'], option[value='! Between']").attr("disabled","disabled");
// $(this).parent().nextAll("select").show();
		} else
		{
			$(this).hide();
			$(this).prev().show();
			$(this).parent().nextAll("select:not(:first)").hide();
			$(this).parent().next("select[id^='expression']").val("Select").children("option").attr("disabled",false);
// $(this).parent().nextAll("input").show();
			}
	 }
	 });
	

	$(document.body).on('click',"button.INOperator", function()
	{   
	  var id = create_inner($(this).parents("div[id^='add-criteria-panel']"),this);
	  $(document.body).find(id).find("select[id^='IFF_File_first'], select[id^='IFF_Field_first']").show();
	  $(document.body).find(id).find("#FieldObj").remove();
	  $(document.body).find(id).find("select[id^='expression']").val("Select");
	  $(document.body).find(id).find("input, select").css("border-color","#CCC");
	});

	function create_inner(mainelement, element)
	{
		var containerID = $(element).parents("div[id^='criteria_rule_body']:visible").attr("id");
		var prevObj = $("#"+containerID).find("div[id^='criteriaRule']:visible:last");	
		if(validate_criteriaRule(prevObj.attr("id"))) 
	    {    $(element).siblings().hide();
// $(element).prev().hide();
// var prevObj = $(element).parents("div .row").prev("div[id^='criteriaRule']");
			 var dom = $(prevObj).clone();
			 var id = dom.attr("id");
			 var count = parseInt(id.slice(-1));
			 $(dom).find("input, select[id^='IFF_File_second'], select[id^='IFF_Field_second']").hide().removeAttr("role");
			 $(prevObj).find("span[id^='INOp_Value']").text($(element).text()).attr({"id":"INOp_Value"+count+"","name":$(element).attr("value")}).show();
			 $(dom).find("span[id^='INOp_Value']").text("").attr({"id":"INOp_Value"+count+"","name":""}).hide();
		     dom.attr("id",id.slice(0,-1)+(++count));
   		     $(prevObj).after(dom);
   		     $('select, input',dom).each(function(index,ele)
   		    		{id = $(this).attr("id");
   		    		 $(this).attr("id",id.slice(0,-1)+count);
   		    		 $(this).removeAttr("role");
   		    		 $(this).removeAttr("readOnly");
   		    		 if(id.slice(0,-1)=="IFF_Field_first"||id.slice(0,-1)=="expression"||id.slice(0,-1)=="IFF_Field_second")
   		    		 {
   		    	 		$(this).find("option:not(:first)").remove();
   		    		 }
   		    		});
   		     return dom;
		}
	}
	
	$(document.body).on('click',"button.OUTOperator", function()
	{    
		var id = create_outer($(this).parents("div[id^='add-criteria-panel']"),this);
		  $(id).find("select[id^='IFF_File_first'], select[id^='IFF_Field_first']").show();
		  $(id).find("#FieldObj").remove();
		  $(id).find("select[id^='expression']").val("Select");
		  $(id).find("input, select").css("border-color","#CCC");
		
	});
 function create_outer(mainelement, element)
 {
	 var prevObj = $("div[id^='criteria_rule_body']:visible:last");
		if(validate_criteriaRule(prevObj.attr("id"))) 
	    {        $(element).siblings().hide();
				 var dom = prevObj.clone();
				 var id = dom.attr("id");
				 var count = parseInt(id.slice(-1));
				 $(prevObj).find("span[id^='OUTOp_Value']").text($(element).text()).attr({"id":"OUTOp_Value"+count+"","name":$(element).attr("value")}).show();
// $(dom).find("span[id^='OUTOp_Value']").attr("id","OUTOp_Value"+count+"");
			     dom.attr("id",id.slice(0,-1)+(++count));
			     $(dom).children("div[id^='criteriaRule']:not(:first)").remove();
			     $(dom).find("button.INOperator").show();
			     $(dom).find("span[id^='OUTOp_Value']").text("").attr("name","").hide();
			     var innerDom = $(dom).find("div[id^='criteriaRule']");
			     innerDom.attr("id","criteriaRule"+count+"0");
	   		     $(innerDom).find("input, select[id^='IFF_File_second'], select[id^='IFF_Field_second']").hide();
	   		     $(innerDom).find("#INOp_Value0").text("").attr("name","");
	   		     $(prevObj).after(dom);
	   		      $('select, input',innerDom).each(function(index,ele)
   		    		{    id = $(this).attr("id");
	   		    		 $(this).attr("id",id.slice(0,-2)+count+"0");
	   		    		 $(this).css("border-color","#CCC");
	   		    		 $(this).removeAttr("role");
	   		    		$(this).removeAttr("readOnly");
	   		    		if(id.slice(0,-1)=="IFF_Field_first"||id.slice(0,-1)=="expression"||id.slice(0,-1)=="IFF_Field_second")
	   		    		 {
	   		    	 		$(this).find("option:not(:first)").remove();
	   		    		 }
   		    		});
	   		   return dom;
	    }
 }
// save criteria rule or update criteria rules
	 $scope.createcriteriaRule = function(mode)
     {  					 
		 var firstcondition, secondcondition, j=-1, val1, val2, type, error, value1, value2;
		 $(".criteria_rule_body:visible").each(function(index, mainelement) 
			{	error = validate_criteriaRule($(this).attr("id"));
			});
		 if(error == true) 
		 {  if($("#add-criteria-panel").is(':visible'))
		   {
				 if($("#criteria_name").val() == "")
				  {    error = false;
				       $("body #rule_error").text("Please Enter Criteria Name");
				       $("#criteria_name").focus();
				       return false;
				   }else if($("#COutcome").val()!="Approved" && $("#cRemark").val()=="")	
					   {
					   error = false;
				       $("body #rule_error").text("Please Select Outcome or Enter valid remarks");
				       $("#COutcome").focus();
				       return false;
					   }
				  var newmatrix={'cname':$("#criteria_name").val(),
						         'Outcome':$("#COutcome").val(),
						         'remark':$("#cRemark").val(),
						         'rules':[],
						         'CriteriaID':$scope.cruleID
				                };							
						$(".criteria_rule_body:visible").each(function(index, mainelement) 
						{						
							var outOprtr = $(this).find("span[id^='OUTOp_Value']").attr("name");
							 if(typeof outOprtr == 'undefined')									 
							 {   outOprtr = '';}					  		  
							$(".criteriaRules:visible",mainelement).each(function(findex, element) 
								{// console.log($(this).attr("id"));
								 var rule =  create_criteria_rule(index, findex, element,mode);
								  if(findex === 0)
									  {
									  	$.extend(rule, {"outOperator":outOprtr,"ref":[]});
									    newmatrix.rules.push(rule);
									  }else 
									  {
							  			  newmatrix.rules[index].outOperator = outOprtr;
									      newmatrix.rules[index].ref.push(rule);											
							          }
		// console.log(findex+" : "+JSON.stringify(newmatrix));
								});
				       });
						// console.log(JSON.stringify(newmatrix));
						$http({ method : 'POST',
							url : APP_CONST.getConst('BASE_URL_SCORE')+'DecisionRules',
							params:{'INSTITUTION_ID':currentUser.institutionID,'RuleID':$scope.Rule,'RType':'Criteria','CType':mode},
							data:newmatrix,
							headers : {'Content-Type' : 'application/json'}
						}).success(function(data) 
						 {$('#T_LoaderSpinner').hide(1000); $scope.error = ""; 
							if(data.StatusCode === 101)
							{
							 // console.log("Rsponse:"+JSON.stringify(data));
							 if(mode=="Create")
					 		 { $scope.RcriteriaList.push(data.Data);}
							 else if(mode=="Update")
							  {
								 for(var i=0;i<$scope.RcriteriaList.length;i++)
									 {
									  if($scope.RcriteriaList[i].CriteriaID==data.Data.CriteriaID)
										  {
										  $scope.RcriteriaList[i]=data.Data;
										  }
									 }
							  }	 
					 		 }
						 }).error(function(data)
							{$('#T_LoaderSpinner').hide(1000);
							 console.log("We could not process your request......Please try later.");
							});			 
// }
// console.log(JSON.stringify(newmatrix));
				}// block for panel end
			    else if($(document.body).find("#add-criteria-panel1").is(':visible'))
				{
		    	  var rules = [];
// var newmatrix={'rules':[]};
			    	$(".criteria_rule_body:visible").each(function(index, mainelement) 
					{ 	$(".criteriaRules:visible",mainelement).each(function(findex, element) 
						{ 	
							rules.push(create_criteria_rule(index, findex, element,mode));
						});
					   $scope.PcriteriaList = rules;
					});
// closeCriteriaPanel();
				   }
		  		$scope.closeCriteriaPanel();
		   	 }
		    }// function end save
	

	 // create criteria decision rule ofr all rows
	 function create_criteria_rule(index, findex, element,mode)
	 {	var fDataType, fieldname, displayname, displayname1, expValue, expValueMin, expValueMax, val1="",val2="";
	    var firstcondition="",secondcondition="",field="",fType="";
	 	fieldname = $(element).find("#FieldObj").attr("name");
	 	displayname = $(element).find("#FieldObj").text();
	    if(typeof fieldname == 'undefined' || fieldname == "") 
	    	{ fieldname = $(element).find('select[id^="IFF_File_first"] option:selected').text()+
					"$"+$(element).find('select[id^="IFF_Field_first"] option:selected').attr("title");
	    	}
		  if(typeof displayname == 'undefined' || displayname == "") 
	       {  displayname = $(element).find('select[id^="IFF_Field_first"] option:selected').text();}
	    
		  fDataType = $(element).find('select[id^="IFF_Field_first"] option:selected').val();
		  console.log($(element).find('select[id^="expression"]').attr("id")+" : "+FDataTypesUpdtd[0]);
	      if(typeof fDataType == 'undefined' || fDataType == ""||fDataType == "Select")
		   {  fDataType = FDataTypesUpdtd[0]; 
		      FDataTypesUpdtd.splice(0,1);
		   }
		
	     field = $(element).find('select[id^="ExpType"] option:selected').val();
	     fType = $(element).find('select[id^="IFF_File_first"] option:selected').attr("title");
	    if(typeof fType == 'undefined' || fType == undefined)
	    	{
	    	 fType = $(element).find("#FieldObj").attr("role");
	    	}
	    var afspecid = $(element).find('select[id^="IFF_Field_first"]').attr("role");
	    if(typeof afspecid == 'undefined' || afspecid == undefined)
	    	{
	    	  afspecid="";
	    	}
		var condition = $(element).find('select[id^="expression"] option:selected').val();
		var innrOprtr =  $(element).find("span[id^='INOp_Value']").attr("name");		
		if(field == "Value")
			  {
			   value1 = $(element).find('input[id^="firstValue"]').val();
			   value2 = $(element).find('input[id^="secondValue"]').val();
			  }else if(field == "Field"){
			        value1 = $(element).find('select[id^="IFF_File_second"] option:selected').text()+
			  			"$"+$(element).find('select[id^="IFF_Field_second"] option:selected').attr("title");
			        displayname1 = $(element).find('select[id^="IFF_Field_second"] option:selected').text();
			  	  }else if(field == "Fraction"){
			        value1 = $(element).find('select[id^="IFF_File_second"] option:selected').text()+
			  			"$"+$(element).find('select[id^="IFF_Field_second"] option:selected').attr("title");
			        value2 = $(element).find('select[id^="IFF_File_second"] option:selected').text()+
		  			"$"+$(element).find('select[id^="IFF_Field_second"] option:selected').attr("title");
			        displayname1 = $(element).find('select[id^="IFF_Field_second"] option:selected').text();
			        expValue = $(element).find('input[id^="ExpValueFirst"]').val();
			        expValueMin = $(element).find('input[id^="ExpValueMin"]').val();
			        expValueMax = $(element).find('input[id^="ExpValueMax"]').val();
			  	  }
		/*
		 * createMatrixJson(value1,value2,condition,displName,fdname,DataType,FType,FSpecID,oprtr,expEvalType)
		 */
		if((fDataType === 'Number') || (fDataType === 'N')) 
		{ if(condition == "Between") 
		   { firstcondition = '<=';
				secondcondition = '<';
				val1 = value1;
				val2 = value2;
			  } else if (condition == "! Between") 
			    { firstcondition = '>=';
				  secondcondition = '>';
				  val1 = value1;
				  val2 = value2;
			    } else if ((condition == '>') || (condition == '>=')) 
			      { firstcondition = '';
			     	secondcondition = condition;
			     	val1 = '';
			     	val2 = value1;
			      } else if ((condition == '<') || (condition == '<=')) 
			      	{ firstcondition = '';
			      	  secondcondition = condition;
			      	  val1 = '';
			      	  val2 = value1;
			      	} else if ((condition == '==') || (condition == '!=')) 
			      	  {	firstcondition = '';
			      	  	secondcondition = condition;
			      	  	val1 = '';
			      	  	val2 = value1;
			      	  }
			} else if ((fDataType === 'String') || (fDataType === 'S')) 
			{ firstcondition = '';
			  secondcondition = condition;
			  val1 = '';
			  val2 = value1;
			} else if((fDataType === 'Boolean') || (fDataType === 'B')) 
			  { firstcondition = '';
			 	secondcondition = condition;
			 	val1 = '';
			 	val2 = value1;
			  }else if ((fDataType === 'Date') || (fDataType === 'D')) 
			 	{   if (condition === "Between") 
			 		 {  firstcondition = '<=';
			 			secondcondition = '<';
			 			val1 = value1;
			 			val2 = value2;
			 		 } else if (condition === "! Between") 
			 		 	{	firstcondition = '>=';
			 		 		secondcondition = '>';
			 		 		val1 = value1;
			 		 		val2 = value2;
			 		 	}else
			 		 		{  firstcondition = '';
			 		 		   secondcondition = condition;
			 		 		   val1 = '';
			 		 		   val2 = value1;
			 		 		}	
			 	}// date condition end //create rule matrix in local cache
					// variable
				  var rule = {"val1":val1.toString().replace(/,/g , ""), "exp1":firstcondition, 
						      "fieldname":fieldname, "displayname":displayname,
						      "FType":fType,"DType":fDataType,"AFSpec":afspecid,
						      "displayname1":displayname1, "exp2":secondcondition,
						  	  "val2":val2.toString().replace(/,/g , ""),
						  	  'expType':field,'expValue1':expValue,
						  	  'expValue2':expValueMin,'expValue3':expValueMax,
						  	  'operator':''};
				  if(innrOprtr != undefined || typeof innrOprtr !="undefined")
				  { rule.operator = innrOprtr;}
				  else
				  { rule.operator = "";}
				  return rule;					 
		}
	 
		 $scope.deleteCritRules = function(mongId)
		 {
			$('#T_LoaderSpinner').show();
			$("#confirm-title, #delete, #Approve").removeClass("btn-success").addClass("btn-danger");
			$("#confirm-msg").text("This item will not be recovered after succesfully deleted.");
			$("#delete, #Approve").text("Delete").attr("id","delete");
			$('#confirm').modal({ backdrop: 'static', keyboard: false }).one('click', '#delete', function (e) 
		    {if(mongId!="" || mongId!=undefined) 
		      {	$http({ method : 'POST',
					url : APP_CONST.getConst('BASE_URL_SCORE')+'DecisionRules',
					params:{'INSTITUTION_ID':currentUser.institutionID,'RuleID':$scope.Rule,'RType':'Criteria','CType':'Delete'},
					data:mongId,
					headers : {'Content-Type' : 'application/json'}
				}).success(function(data) 
				 {$('#T_LoaderSpinner').hide(1000);
				  $scope.error = ""; 
					if(data.StatusCode === 101)
					{
						$scope.RcriteriaList = $.grep($scope.RcriteriaList, function(e) { return e.CriteriaID != data.Data});
					
			 		 }else{
			 			$scope.error = "Your rule has not been deleted"; 
			 		 }
				 }).error(function(data)
					{$('#T_LoaderSpinner').hide(1000);
					 console.log("We could not process your request......Please try later.");
					});	
		      }else
		    	  {
		    	    console.log("We could not process your request......Please try later.");
		    	  }
		    });
		 }
		 
		 $(document.body).on("click","#criteria_add",function(){
			 $("#add-criteria-panel1").remove();
			 $("#crit_box").append($("#add-criteria-panel").clone().attr("id","add-criteria-panel1"));
			 $("#add-criteria-panel1").find("#COutcome, #CQueue, .OUTOperator, #criteria_name, #criteria_priority").remove();
			 $("#add-criteria-panel1").slideDown();
			 $("#crule").hide();
		 });
	 

		 $(document.body).on("click","#criteria_edit",function(){
			 $("#crit_box").append($("#add-criteria-panel").clone().attr("id","add-criteria-panel1"));
			 $("#add-criteria-panel1").find("#COutcome, #CQueue, .OUTOperator, #criteria_name, #criteria_priority").remove();
			 $("#add-criteria-panel1").slideDown();
			 $("#crule").hide();

			   $timeout(function(){
			   for(var obj in $scope.policyList)
				 {
				 if(obj.PolicyID == $scope.PolicyID)
					 {
					 for(var v=0; v<obj.CritList.length; v++)
						 {if(v != 0)
						   { create_inner("#add-criteria-panel1",$("#add-criteria-panel1").find("button[value='"+obj.CritList[0].operator+"']"));}
						 	var div = $("#add-criteria-panel1").find("#criteriaRule0"+v+":visible");
						 	$(div).find("#expression0"+v+" option, #FieldObj").remove();
						 	getConditionOperator(obj.CritList[v].exp1,obj.CritList[v].exp2,"#expression0"+v);
						 	$(div).find("#IFF_File_first0"+v).hide().after("<span id='FieldObj' class='equal' name='"+obj.CritList[v].fieldname+"'>"+obj.CritList[v].displayname+"</span>");
						 	$(div).find("#IFF_Field_first0"+v).hide();
						 	if(obj.CritList[v].val1 && obj.CritList[v].val2)
							 	{$(div).find("#firstValue0"+v).val(obj.CritList[v].val1).show();
						 		 $(div).find("#secondValue0"+v).val(obj.CritList[v].val2).show();}
						 	if(obj.CritList[v].val1)
						 		{$(div).find("#firstValue0"+v).val(obj.CritList[v].val1).show();}
						 	if(obj.CritList[v].val2)
						 		{$(div).find("#firstValue0"+v).val(obj.CritList[v].val2).show();}
						 }
					 break;
					 }
				 }
			});
		 });
		 
		 $(document.body).on("click",".deleteRule", function(){
			 var role = $(this).attr("role");
			 var $component=$(this).closest("."+role+":visible");
			 var id = $component.attr("id");
			 var count = parseInt(id.slice(-1));
			 var hasnext = $component.next().hasClass(role);
			 var parentIndex = $component.closest(".panel_body").find("."+role).index($component);
			 if(count != 0)
			 { if(!hasnext) // delete if next row not avail
			   { $(this).parent().prev().find("span[id^='INOp_Value'],span[id^='Oprtr']").attr("name","").text(""); }
			   $(this).closest("."+role).remove();
			   FDataTypesUpdtd.splice(parentIndex,1);
			 }else{
				 $(this).css("display","none");
			 }
		 });	 

	$(document.body).on("click","#product",function(){
		$("#product_panel").slideToggle();
		$("#product").toggleClass("glyphicon-plus glyphicon-minus");
	});
	$(document.body).on("click","#AppType",function(){
		$("#AppType_panel").slideToggle();
		$("#AppType").toggleClass("glyphicon-plus glyphicon-minus");
	});
	$(document.body).on("click","#Add_Aggrigation",function(){
		$("#Aggrigation_panel, #Add_Aggrigation").slideToggle();
	});
	$(document.body).on("click","#Edit_Aggrigation", function(){
		$("#Add_Aggrigation, td.hiden, #Edit_Aggrigation").slideToggle();

	});
	$("#add-Product").click(function(){
		var value = $("#product_list").val();error=false;
		if(value != "Select")
		{
			for(var obj in $scope.ProductList)
			{ if(obj.value == value)
			{ $("#perror").text("This Product has already Added").show();
			error =true;break;
			}
			}
			if(error != true)
			{ $scope.ProductList.push({"name":$("#product_list option:selected").text(), 'value':value});
			$scope.$apply();$("#product_panel").slideToggle();
			$("#product").toggleClass("glyphicon-minus glyphicon-plus");
			}
		}else{
			$("#perror").text("Please select Product Type").show();
		}
		$("#perror").slideUp(3000);
	});

	$scope.UpdateProdList = function(key)
	{ $("#confirm-title, #delete").removeClass("btn-primary").addClass("btn-danger");
	$("#confirm-msg").text("This item will not be recovered after succesfully deleted.");
	$("#delete").text("Delete").attr("id","delete");
	$('#confirm').modal({ backdrop: 'static', keyboard: false }).one('click', '#delete', function (e) 
			{ $scope.$apply(function(){
				for(var i=0; i<$scope.ProductList.length; i++)
				{ if($scope.ProductList[i].value == key)
				{ $("#perror").text("This Product has been Deleted").show();
				$scope.ProductList.splice(i,1);break;
				}
				}
			});
			});
	$("#perror").slideUp(3000);
	}

	$(document.body).on("click","#criteria_panel_add",function(){
		if($(document.body).find("#add-criteria-panel1").is(":visible"))
	      {
			$scope.createcriteriaRule();
			$scope.$apply();
	      }
	})

	$(document.body).on("change","#COutcome", function(){
		if($(this).val() == "Queue" || $(this).val() == "Declined")
			$("#cRemark").show().val("");
		else
			$("#cRemark").hide().val("");  
	});
	
	
	$("#add-AppType").click(function(){
		var value = $("#AppType_list").val();error=false;
		if(value != "Select")
		{ for(var obj in $scope.AppList)
		{ if(obj.value == value)
		{ $("#perror").text("This Application Source has already Added").show();
		error =true;break;
		}
		}
		if(error != true)
		{ $scope.AppList.push({"name":$("#AppType_list option:selected").text(), 'value':value});
		$scope.$apply(); $("#AppType_panel").slideToggle();
		$("#AppType").toggleClass("glyphicon-minus glyphicon-plus");
		}
		}else{
			$("#perror").text("Please select Application Source").show();
		}
		$("#perror").slideUp(3000);
	});
	$scope.UpdateAppList = function(key)
	{ 
		$("#confirm-title, #delete").removeClass("btn-primary").addClass("btn-danger");
		$("#confirm-msg").text("This item will not be recovered after succesfully deleted.");
		$("#delete").text("Delete").attr("id","delete"); 
		$('#confirm').modal({ backdrop: 'static', keyboard: false }).one('click', '#delete', function (e) 
				{ $scope.$apply(function(){		    
					for(var i=0; i<$scope.AppList.length; i++)
					{ if($scope.AppList[i].value == key)
					{ $("#perror").text("This Application source has been Deleted").show();
					$scope.AppList.splice(i,1);break;
					}
					}
				});
				});
		$("#perror").slideUp(3000);
	}

	$(document.body).on('change', 'select[id^="valid_status"]', function()
			{ 
		$('#vfrom, #vtill').datepicker({changeMonth: true, changeYear: true, yearRange: "1900:2016", dateFormat: 'dd:mm:yy'});
		var value = $(this[this.selectedIndex]).val();
		if(value == "Select")
		{
			$("#vfrom, #vtill").val("").slideUp();
		}else if(value == "from")
		{
			$("#vtill").val("").hide();
			$("#vfrom").val("").show();
		}else if(value == "till")
		{
			$("#vfrom").val("").hide();
			$("#vtill").val("").show();
		}else if(value == "between"){
			$("#vfrom, #vtill").val("").show();
		}
			});
	$(document.body).on('change', 'select[id^="table_list"]', function()
	{ 
		var value = $(this[this.selectedIndex]).val();
		$scope.PolicyTable(value);
		$scope.$apply();
	});

	$(document.body).on('change', 'select[id^="rule_list"]', function()
	{ 	var value = $(this[this.selectedIndex]).val();
		$scope.PolicyDRule(value);
		$scope.$apply();
	});
	
	// function for set decision rule value in policy screen
	$scope.PolicyTable = function(value)
	{  if((value == "Select")||(typeof value == 'undefined'))
	{	$scope.TableDesc = "";
	$scope.Tstatus = "";
	$scope.TCreatedBy = "";
	}else{
		for(var obj in $scope.tableList)
		{ if(obj.TableID == value)
		{$scope.TableDesc = obj.name;
		$scope.Tstatus = "Status : "+obj.status;
		$scope.TCreatedBy = "Created By : "+obj.createdby;
		break;
		}}
	}
	}
	// function for set table value in policy screen
	$scope.PolicyDRule = function(value)
	{ if((value == "Select")||(typeof value == 'undefined'))
	{	$scope.RuleDesc = "";
		$scope.RuleType = "";
		$scope.Rstatus = "";
		$scope.RCreatedBy = "";
	}else{
		for(var obj in $scope.RuleList)
		{ if(obj.RuleID == value)
		{   $scope.RuleDesc = obj.name;
			$scope.RuleType = "Type : "+ obj.type;
			$scope.Rstatus = "Status : "+obj.status;
			$scope.RCreatedBy = "Created By : "+obj.createdby;
			break;
		}}
	}
	}
	
	// function for set table value in policy screen
	$scope.PolicyElgblty = function(value)
	{ if((value == "Select")||(typeof value == 'undefined'))
	{	$scope.ElgbltyDName = "";
		$scope.ElgbltyStatus = "";
		$scope.ElgbltyCreatedBy = "";
		$scope.selectElgblty="Select";
	}else{
		for(var obj in $scope.ElgbltyList)
		{ if(obj.ElgbltyID == value)
		{   $scope.ElgbltyDName = obj.name;
			$scope.ElgbltyStatus = "Status : "+obj.status;
			$scope.ElgbltyCreatedBy = "Created By : "+obj.createdby;
			$scope.selectElgblty=value;
			break;
		}}
	}
	}

	// function for set aggrigation table in policy
	// screen
	$scope.AggrigationLayout= function(list)
	{	$scope.AggrList = list;
	$("#aggr_table_body tr:not(:first)").remove();
	for(var obj in  list)
	{  var domstr = '<tr><td>'+obj.name+'</td><td>'+obj.value+'</td><td class="hiden">';
	domstr = domstr+'<a class="TC_Button DltAggr" id="'+obj.key+'">Delete</a></td></tr>';
	$("#aggr_table_body").append(domstr);
	}
	}

	// add new aggrigation field to AggrList
	$scope.Add_Aggrigation = function()
	{	 $scope.AggrList.push({"key":$("#aggr_file option:selected").text()+"$"+$("#aggr_field option:selected").attr('title'),
		"name":$("#aggr_field option:selected").text(),"value":$("#aggr_operator").val()});
	$scope.AggrigationLayout($scope.AggrList);// update
	// aggrigation
	// table
	// layout
	$("#Aggrigation_panel, #Edit_Aggrigation").slideToggle();
	$("td.hiden, #Add_Aggrigation").hide();
	}

	$(document.body).on("click","a.DltAggr",function()
			{ for(var i=0;i<$scope.AggrList.length;i++)
			{if($scope.AggrList[i].key == $(this).attr("id"))
			{$scope.AggrList.splice(i,1);
			$scope.AggrigationLayout($scope.AggrList);// update aggrigation
														// table layout
			}
			} 
			});

	// function for create new down list
	function bindlist(id, valuelist, value, callType)
	{	 
		$('#'+id+' option:not(:first)').remove();
		$.each(valuelist, function(val, text) 
				{ if(callType == "TableList")
				{
// console.log("Value List in Table List ="+valuelist);
					if(value == text.TableID)
						$('#'+id+'').append( $('<option selected="selected">').text(text.TableID).attr('value',text.TableID));
					else  
						$('#'+id+'').append( $('<option>').text(text.TableID).attr('value',text.TableID));
				}
				else if(callType == "RuleList")
				{if(value == text.RuleID)
					$('#'+id+'').append( $('<option selected="selected">').text(text.RuleID).attr('value',text.RuleID));
				else
					$('#'+id+'').append( $('<option>').text(text.RuleID).attr('value',text.RuleID));
				}
				else if(value == text.value)
					$('#'+id+'').append( $('<option selected="selected">').text(text.value).attr('value',text.value));
				else 
					$('#'+id+'').append( $('<option>').text(text.text).attr('value',text.value));
				});
	}	

	$scope.deleteObject = function(url,dataObj,calltype,actionType)
	{ $("#confirm-title, #delete, #Approve").removeClass("btn-success").addClass("btn-danger");
	  $("#confirm-msg").text("This item will not be recovered after succesfully deleted.");
	  $("#delete, #Approve").text("Delete").attr("id","delete");
	  $('#confirm').modal({ backdrop: 'static', keyboard: false }).one('click', '#delete', function (e) 
			{				    		 
		$http({
			method : 'POST', url : url,
			params : {'INSTITUTION_ID': currentUser.institutionID, 'CType':'delete','CatID':$scope.CatID,
				'AtID':$scope.AtID,'ItemID':dataObj["ID"],'RType':actionType,'TableID':$scope.ScoreTable},
				 data:dataObj, headers : {'Content-Type' : 'application/json'}
		}).success(function(data) 
				{ $('#T_LoaderSpinner').hide(1000); $scope.error = ""; 
// console.log("Response:"+JSON.stringify(data))
				if (data.StatusCode === 101) 
				{ if(calltype == "STable")
				  {
					$scope.tableList =  $.grep($scope.tableList, function(e) { return e.TableID != data.Data.id});
				  }else if(calltype == "CPolicy")
				  {
					$scope.policyList =  $.grep($scope.policyList, function(e) { return e.PolicyID != data.Data.id});
				  }else if(calltype == "DRules")
				  {
					$scope.RuleList =  $.grep($scope.RuleList, function(e) { return e.RuleID != data.Data.id});
				  }else if(calltype == "STableRule")
				  {
					generateItems(data.Data, "Logic_Delete");	
				  }else if(calltype == "IFF")
				  {
					 $scope.IFFList =  $.grep($scope.IFFList, function(e) { return e.FileID != data.Data.id});
				  }else if(calltype == "master")
				  {
						 $scope.Mlist =  $.grep($scope.Mlist, function(e) { return e.FileID != data.Data.id});
				  }else if(calltype == "IffField")
				  {
					 $scope.IffFieldList =  $.grep($scope.IffFieldList, function(e) { return e.FIELD_ID != data.Data.id});
				  }else if(calltype == "ELGBLTY")
				  {
					 $scope.ElgbltyList =  $.grep($scope.ElgbltyList, function(e) { return e.ElgbltyID != data.Data.id});
				  }else if(calltype == "DAttr")
				   {
					 for (var i = 0; i < dataset.master.length; i++) 
					  	{ if(dataset.master[i].plan != undefined)
						  {for(var j=0;j < dataset.master[i].plan.length; j++)
					  		{ 
					  		  if(dataset.master[i].plan[j].AtID === data.Data.id)
					  			{ dataset.master[i].plan.splice(j,1); 
					  			  $scope.planarrey = dataset.master[i].plan;
					  			  return false;
					  			}
					  		}
						  }
					  	}
// $scope.planarrey = $.grep($scope.planarrey, function(e) { return e.AtID !=
// data.Data.id});
					$scope.fieldarrey = null;
					$scope.display_item_box = false;
				}else if(calltype == "DCat")
				{
					for (var i = 0; i < dataset.master.length; i++) 
				  	{  
			  		  if(dataset.master[i].CatID === data.Data.id)
			  			{  dataset.master.splice(i,1); 
			  			   $scope.CatArray = dataset.master;
			  			  break;
			  			}
				   	}
// $scope.CatArray = $.grep($scope.CatArray, function(e) { return e.CatID !=
// data.Data.id});
					$scope.planarrey = null;
					$scope.fieldarrey = null;
					$scope.display_plan_box=false;
				}
				} else{
					$scope.error = "Request failed due to an internal error...Please contact 'System Admin'";
				}
				}).error(function(data) 
						{ $('#T_LoaderSpinner').hide(1000);
						console.log("We could not process your request......Please try later.")
						});
			});
	}

	$scope.updateStatus = function(url,dataObj,calltype,ruletype)
	{ $("#confirm-title, #delete").removeClass("btn-danger").addClass("btn-success");
	  if(dataObj.status=="Approved")
	  { $("#confirm-msg").text("This Rule will be activated from Now");
	    $("#delete,#Approve").text("Approve").attr("id","Approve");
	  }else
	  {
	    $("#confirm-msg").text("This Rule will be de-activated from Now");
	    $("#delete,#Approve").text("Disable").attr("id","Approve");
	  }
	  $('#confirm').modal({ backdrop: 'static', keyboard: false }).one('click', '#Approve', function (e) 
	  {				    		 
		$http({
			method : 'POST', url : url,
			params : {'INSTITUTION_ID': currentUser.institutionID, 'CType':'status','RType':ruletype},
			data:dataObj, headers : {'Content-Type' : 'application/json'}
		 }).success(function(data) 
			{ $('#T_LoaderSpinner').hide(1000); $scope.error = ""; 
// console.log(JSON.stringify(data));
				if (data.StatusCode === 101) 
				{ if(calltype == "STable")
				  { for(var i=0; i<$scope.tableList.length; i++)
				    {  if($scope.tableList[i].TableID == data.Data.ID)
				       {$scope.tableList[i].status = data.Data.status;
				        $scope.tableList[i].updatedby = data.Data.updatedby;
				        break;
				        }
				    }	 
				}else if(calltype == "CPolicy")
				{ for(var i=0; i<$scope.policyList.length; i++)
					{  if($scope.policyList[i].PolicyID == data.Data.ID)
					 {$scope.policyList[i].status = data.Data.status;
					  $scope.policyList[i].updatedby = data.Data.updatedby;
					  break; 
					 }
					}
				}else if(calltype == "DRules")
				{
					for(var i=0; i<$scope.RuleList.length; i++)
					{  if($scope.RuleList[i].RuleID == data.Data.ID)
					  {$scope.RuleList[i].status = data.Data.status;
					   $scope.RuleList[i].updatedby = data.Data.updatedby;
					   break; 
					  }
					}
				}else if(calltype == "ELGBLTY")
				{
					for(var i=0; i<$scope.ElgbltyList.length; i++)
					{  if($scope.ElgbltyList[i].ElgbltyID == data.Data.ID)
					  {$scope.ElgbltyList[i].status = data.Data.status;
					   $scope.ElgbltyList[i].updatedby = data.Data.updatedby;
					   break; 
					  }
					}
				}else if(calltype == "IFF")
				{
					for(var i=0; i<$scope.IFFList.length; i++)
					{  if($scope.IFFList[i].FileID == data.Data.ID)
					  {$scope.IFFList[i].status = data.Data.status;
					   $scope.IFFList[i].updatedby = data.Data.updatedby;
					   break; 
					  }
					}
					Update_Master(".IffDrpDwn"); 
				}
			  }else{
					$scope.error = "Request failed due to an internal error...Please contact 'System Admin'";
				}
				}).error(function(data) 
				{ $('#T_LoaderSpinner').hide(1000);
				  console.log("We could not process your request......Please try later.")
				});
			});
	}
//	enable or disable fields in iff and master section
	$scope.iffFieldStatus = function(fieldid,status)
	{  var url;
		if($scope.selectedFileType=="ANALYTICAL")
		{
			url=APP_CONST.getConst('BASE_URL_SCORE')+"Analytical";
		}else if($scope.selectedFileType=="CUSTOM")
		{
			url=APP_CONST.getConst('BASE_URL_SCORE')+"CustomFields";
		}else{
			url=APP_CONST.getConst('BASE_URL_SCORE')+'IFFDropDown';	
		}
		
	  $("#confirm-title, #delete").removeClass("btn-danger").addClass("btn-success");
	  if(status==1)
	  { $("#confirm-msg").text("This Field will be active from Tomorrow");
	    $("#delete,#Approve").text("Enable").attr("id","Approve");
	  }else{
		$("#confirm-msg").text("This Field will be In-Active from Tomorrow");
		$("#delete,#Approve").text("Disable").attr("id","Approve");
	  }
	  
	  $('#confirm').modal({ backdrop: 'static', keyboard: false }).one('click', '#Approve', function (e) 
	   {	
		 var Data = "{'FileID':"+$scope.IffFileID+",'FieldID':"+fieldid+",'status':"+status+"}";
		 $http({ method : 'POST',
			url : url,
			params:{'INSTITUTION_ID':currentUser.institutionID,'CType':'FStatus'},
			data:Data,
			headers : {'Content-Type' : 'application/json'}
		 }).success(function(data) 
		 { $('#T_LoaderSpinner').hide(1000);
		   $scope.error = ""; 
			if(data.StatusCode === 101)
			{
// 				console.log("Rsponse: "+JSON.stringify(data));
// 				$scope.RcriteriaList.push(data.Data);
				 for(var i=0; i<=$scope.IffFieldList.length; i++)
				 { if($scope.IffFieldList[i].FIELD_ID==fieldid)
					 {
					 	$scope.IffFieldList[i].ACTIVE = status;
					 	break;
					 }
				 }
	 		}
		 }).error(function(data)
			{$('#T_LoaderSpinner').hide(1000);
			 console.log("We could not process your request......Please try later.");
			});				
		 });	
	}
	
	$scope.iffFieldDelete = function(fieldid)
	{
		var data = {'ID':$scope.IffFileID,'FieldID':fieldid};
		var url = BASE_URL_SCOR+'IFFDropDown';
		$scope.deleteObject(url,data,"IffField","Field");
	}
		
	$(document.body).on("keyup",'input',function(e)
	{	
		var val=$(this).val();
		val = val.trim();
		if(($(this).attr("contextmenu")=="Number")) 
		{			    	
			if(!/^[0-9,.-\d]+$/.test(val))
			{
				$(this).css("border","1px solid red");
				$scope.error = " Enter only numeric value in "+$(this).attr("name")+"";
			}
			else {
				$scope.error = "";
				$(this).val(Validation.NoWithComma(val));
				$(this).css("border","1px solid green");
			}
		}else if(($(this).attr("contextmenu")=="String")) 
		{			    	
			if(!(/^[a-zA-Z0-9\s]+$/.test(val)))
			{
				$(this).css("border","1px solid red");
				$('body #rule_error').text("Please Enter only String or Alpha-Numeric value");
			}
			else {
				$(this).css("border","1px solid green");
				$('body #rule_error').text("");
			}
		}
	});
	
	/* code for analytical field creation */
	$(document.body).on("click",'#addIffField',function(e)
	{	
		$("#iff_fields_table, #addIffField").hide();
		$("#IffFieldPanel").slideDown();		
	});
	
	$(document.body).on("click",'#addcstmField',function(e)
	{	
		$("#iff_fields_table, #addcstmField").hide();
		$("#customFieldPanel").show();		
	});

	
	$(".btn-toggle").click(function(){
		$(this).find('.btn').toggleClass('active');  	     
		if ($(this).find('.btn-success').size()>0) {
			$(this).find('.btn').toggleClass('btn-success');
		}
		$(this).find('.btn').toggleClass('btn-default');       

		if($(this).find(".active").text()=="Ratio")
		{ 	$("#analytical_field_body0").hide();	
			$("#analytical_field_body1").show();
		}else{
			$("#analytical_field_body1").hide();
			$("#analytical_field_body0").show();
		}
	});

	// close anlytical field rule specification panel
	$scope.closeAmtclRulePnl=function(){
// $('body #IffFieldPanel').slideUp();
// $('#iff_fields_table,#addIffField').show();
// $('#anltclFieldName').val("");
		$('#MainBlock').css("opacity","1");
		$("#anltclRulePanel").slideUp();
		$("#AntclRuleFltr,#AntclRuleGrp,#AntclRuleRatio,#ARBSField,#AROptr,#ARField").text("");
	};
	
	// select file in criteria panel rule row
	 $(document.body).on('change', 'select[id^="AntclBaseFile"], select[id^="AntclFltrFile"], select[id^="AntclGrpFile"],select[id^="AntclRatioFile"],select[id^="AntclFile"],select[id^="AIffFile"],#AntclCmprFile', function()
	{ 	$("body #rule_error").text("");
		var value = $(this[this.selectedIndex]).val();
		var type = $(this[this.selectedIndex]).attr("title");
		if(value != "Select File" || value != "Select")
			{
			if($(this).next().attr("id") != undefined)
			    Update_Rule_Field(value, $(this).next().attr("id"),type);
// else
// Update_Rule_Field(value,
// $(this).parent().next().children("select").attr("id"));
			}
	});
	 
	// file upload function
	   $scope.onFileSelect = function($files) 
	   {       
		   $scope.status = '';					// $files: an array of files
												// selected, each file has
	  			for (var i = 0; i < $files.length; i++) 
	  			{    	
	  				displName=$files[0].name
	  		    	var re = /(\.csv)$/i;
	  		    	if(!re.exec(displName))
	  		    	{
	  		    	alert("File extension not supported!");
	  		    	break;
	  		    	}
	  				var $file = $files[i];					
	  					$rootScope.data_obj = new FormData();
	  					$rootScope.data_obj.append('file', $file);				
	  					// console.log($files[i].name);
	  			}
	   }
	   
	   
	   function validateFileUpload()
	   {  var error;
	    $('#master_upload_panel :input[type!="file"]').each(function() 
	     { 
		   if($(this).is(':visible'))
		   {
			   if(($(this).val() == '') || (typeof $(this).val == 'undefined'))
			   { $("body #FileDropZone").text("Please enter value of "+$(this).attr('name')+"").css("color","red");
			   	 error = true;
			   	 $(this).focus();
			     return false;
			   }else if($(this[this.selectedIndex]).val()=="Select")
			   {
				   $("body #FileDropZone").text("Please Select "+$(this).attr('name')+"").css("color","red");
				   error = true;
				   $(this).focus();
				   return false;
			   }else{
				   $("body #FileDropZone").text("");
				   error = false;
			   }
		   }
	   });				
	   if(error)
	   { return false;
	   }else
	   { return true;
	   }
	}

$(document.body).on("click",'#Upload_Master_File',function()
{	if(typeof $rootScope.data_obj == 'undefined')
	{
		$('body #FileDropZone').text("Please Select File to Upload.").css("color","red").show();
	}
	else if(validateFileUpload())
	{	
   		$rootScope.data_obj.append('Type', $("#IffFileType option:selected").val());
   		 if($("#IffFileType option:selected").val() == "MASTER DATA")
   		 {  $rootScope.data_obj.append('Name', $("#masterFileName option:selected").val());
   		 	var id;
   		 for(i in $scope.IFFList)
					{
					if($scope.IFFList[i].Name == $("#masterFileName").val())
						{
						id=$scope.IFFList[i].FileID; 
						// for getting master file structure ID against which we
						// are going to upload data file
						}
					}
			   	$http({
	  	       	method : 'POST',
	  	       	url: APP_CONST.getConst('BASE_URL_SCORE')+'UploadMASTER_File',
	  	       	params:{'INSTITUTION_ID':currentUser.institutionID,'user':$scope.username ,'STRID': id},
	  	       	data : $rootScope.data_obj,transformRequest: angular.identity,
	  	        headers: {'Content-Type': undefined}
 	       }).success(function (data) 
 	    	{ // console.log("After file uploading getting
				// data"+JSON.stringify(data));
 	    	  if(data.StatusCode == 101) 
 	    		  { $('body #FileDropZone').text(data.detail).css("color","green").show();
 	    		    Update_Master(".IffDrpDwn");
 	    		   $scope.getMasterList();
// close_file_panel();
// $('.col-md-10').css("opacity","1");
 	    		  }
 	    	  else if(data.StatusCode == 501)
 	    		  {
 	    		   $('body #FileDropZone').text(data.detail).css("color","red");
 	    		  }
 	    	  else
 	    		 $('body #FileDropZone').text("The request failed due to an internal error.").css("color","red");
 	       }).error(function(data)
 	       { console.log("error"+data);
 	    	 $('#FileDropZone').text("We could not process your request......Please try later.").css("color","red");
 	       });
   			 
// ***************************** end***************
   		 }
   		 else
   			 {
   			$rootScope.data_obj.append('Name', $("#master_name").val());
// console.log($("#IffFileType option:selected").val());
  	   $http({
	  	       	method : 'POST',
	  	       	url: APP_CONST.getConst('BASE_URL_SCORE')+'UploadIFF_File',
	  	       	params:{'INSTITUTION_ID':currentUser.institutionID,'user':$scope.username},
	  	       	data : $rootScope.data_obj,transformRequest: angular.identity,
	  	        headers: {'Content-Type': undefined}
  	       }).success(function (data) 
  	    	{ // console.log("After file uploading getting
				// data"+JSON.stringify(data));
  	    	  if(data.StatusCode == 101) 
  	    		  { $('body #FileDropZone').text("File Uploaded Successfully").css("color","green").show();
  	    		    Update_Master(".IffDrpDwn");
// close_file_panel();
// $('.col-md-10').css("opacity","1");
  	    		  }
  	    	  else if(data.StatusCode == 501)
  	    		  {
  	    		   $('body #FileDropZone').text(data.detail).css("color","red");
  	    		  }
  	    	  else
  	    		 $('body #FileDropZone').text("The request failed due to an internal error.").css("color","red");
  	       }).error(function(data)
  	       { console.log("error"+data);
  	    	 $('#FileDropZone').text("We could not process your request......Please try later.").css("color","red");
  	       });
      }}
});
	
    $(document.body).on("click",'#master',function()
	{
		// console.log("click upload panel");
		$('body #master_upload_panel').slideDown();
		$('.item').hide();
		$('#MainBlock').css("opacity","0.15");
	})
							
	$('#CloseUploadMaster').click(function() 
	{
		close_file_panel();
	});
			
    $(document.body).on('click','button.AntclINOp',function() 
	{
      var parent = $scope.createInnerBlock($(this));
      $timeout(function(){
      $(document.body).find(parent).find("select[id^='elgbltyFileOne'], select[id^='elgbltyFieldOne']").show();
      $(document.body).find(parent).find("#FieldObj").remove();
      $(document.body).find(parent).find("select[id^='elgbltyExp']").val("Select");
      $(document.body).find(parent).find("input, select").css("border-color","#CCC");
      });
	});
	
    $scope.createInnerBlock=function(element)
    {
      if(validateAntclField("#"+$(element).parent().prev().attr("id"),"input,select","antcl_error","elgblty_error"))
  	  {
  		$(element).siblings("button").hide();
  		var dom = $(element).parent().prev().clone();
  		var count = parseInt(dom.attr("id"));
  		dom.remove('span[id^="Oprtr"]');
  		dom.addClass("Clone");
  		dom.find("select").val("Select");
  		dom.find("input").val("");
  		dom.find(".hiden").hide();
  		$(element).parent().prev().append('<span class="inopr" id="Oprtr'+count+'" name='+$(element).attr("value")+'><span class="left-braces"></span> '+$(element).text()+'</span>');
  		dom.attr("id",(++count));
  		$('select,input',dom).each(function(index,ele)
  		{  var id = $(this).attr("id");
  		  $(this).attr("id",id.slice(0,-1)+count);
// console.log("itemid"+index);
  		  if(index==1 && $(this).is("select"))
		  {
		   $(this).find("option:not(:first)").remove().attr("role","");
// $(""+this+" option:not(:first)").remove();
// $(""+this+" option:not(:first)").remove();
		  }
  		  else if($(this).is("input"))
		  {
		   $(this).removeAttr("readonly");
		  }
  		});
  		$(element).parent().before(dom);
  		return dom;
  	  }
    }
    
	$(document.body).on('click',"button.AntclOUTOp", function()
	  {    
		var id=$scope.createOuterBlock($(this));
//		uncomplete method.....reset field code need
	  });
	
	$scope.createOuterBlock=function(element)
	{
		var prevObj = $(element).parent().prev();
		   if(validateAntclField("#"+prevObj.attr("id"),"input,select","antcl_error")) 
	        {    $(element).siblings("button").hide();
				 var dom = $(prevObj).clone();
				 var id=dom.attr("id");
				 var count = parseInt(id.slice(-1));
				 dom.addClass("Clone");
				 $(dom).remove('span[id^="OutOprtr"]');
				 $(prevObj).append('<span class="outopr" id="OutOprtr'+count+'" name='+$(element).attr("value")+'>'+$(element).text()+' <span class="right-braces"></span></span>');
// $(dom).find("span[id^='OUTOp_Value']").attr("id","OUTOp_Value"+count+"");
				 dom.attr("id",id.slice(0,-1)+(++count));
			     $(dom).children("div:not(:first)").remove();
			     var innerDom = $(dom).find(".AntclFltrRow,.AntclGrpRow");
			     innerDom.attr("id","0");
	   		     $(dom).find("button.AntclINOp").show();
	   		     $(innerDom).find("select").val("Select");
	   		     $(innerDom).find("#Oprtr0").remove();
	   		      $('select, input',innerDom).each(function(index,ele)
	   		    		{id = $(this).attr("id");
	   		    		 $(this).attr("id",id.slice(0,-2)+count+"0");
	   		    		if(index==1)
						  {
						   $(dom).find("#AntclFltrField"+count+"0 option:not(:first)").remove().attr("role","");
						   $(dom).find("#AntclGrpField"+count+"0 option:not(:first)").remove().attr("role","");
// 						   $(dom).find("#AntclRatioField"+count+"0 option:not(:first)").remove();
						  }
	   		    		});
	   		   $(prevObj).after(dom);
	   		   return dom.attr("id");
	    }
	}
	
	
		
	// to update the list of aggrigation operator Analytical Fields
	 $(document.body).on('change', '#AntclBaseField', function()
	 { 
		var value = $(this[this.selectedIndex]).val();
		$("#AntclAggrOprtr option:not(:first)").remove();
		if(value != "Select")
			{
			 if(value=="Number"||value=="N")
			 {   $.each(expressions.AggrExpression, function(val, text) 
				 {
		    	   $("#AntclAggrOprtr").append('<option value='+text.value+'>'+text.text+'</option>');
				 });
				$("#AntclAggrOprtr option:last").prop('disabled', false);
			 }else if(value=="String"||value=="S")
			   {
				 $.each(expressions.AggrExpression, function(val, text) 
			     {
		    	   $("#AntclAggrOprtr").append('<option value='+text.value+'>'+text.text+'</option>');
				 });
				 $("#AntclAggrOprtr option:not(:last)").prop('disabled', true);				 
			   }else if(value=="Date"||value=="D")
				 {
				    $.each(expressions.AggrDateExpression, function(val, text) 
				     {
			    	   $("#AntclAggrOprtr").append('<option value='+text.value+'>'+text.text+'</option>');
					 });
				 }else if(value=="DPD")
				 {
					 $.each(expressions.AggrDPDExpression, function(val, text) 
				     {
			    	   $("#AntclAggrOprtr").append('<option value='+text.value+'>'+text.text+'</option>');
					 });
				 }
			}
	});
	 

	 // validate form before add new analytical field
	 function validateAntclField(container,elements,errid,errid2)
	 {
	    var error;
	    errid=$("body #"+errid+"").is(":visible")?errid:errid2;
	    $(document.body).find(container+":visible").children(elements).each(function() 
	     { // console.log("inside validation : "+container+" :
			// "+$(this).attr("id"));
	       if($(this).is(":visible"))
	       {   if(($(this).val() == '') || (typeof $(this).val == 'undefined'))
			   { $("body #"+errid+"").text("Please enter value of "+$(this).attr('name')+"");
			   	 error = true;
			   	 $(this).focus();
			     return false;
			   }else if($(this[this.selectedIndex]).val()=="Select")
			   {
				   $("body #"+errid+"").text("Please Select "+$(this).attr('name')+"");
				   error = true;
				   $(this).focus();
				   return false;
			   }else{
				   $("body #"+errid+"").text("");
				   error = false;
			   }
	       }
	   });				
	   if(error)
	   { return false;
	   }else
	   { return true;
	   }
	}
	
	$scope.addNewAntclField = function() 
	{
	  if(validateAntclField("#IffFieldPanel","input","antcl_error"))
	  { var fieldName = $("#anltclFName").val();
		var fieldType;
		var deffType = $("#AntclFldType").find(".active").text();
		var aggrOp = "", baseFName = "", baseDName = "", bsDType = "";
		var aspecId="";
		var bsFType = "",cmprfield="",cmprfname="",cmprfvalue="",cmprType="",cmprDType="";
		var fltrFields = [];
		var grpFields = [];
		var ratioFields = [];
		if(deffType=="Field")
		 {  
			 aggrOp = $("#AntclAggrOprtr option:selected").val();
			 bsDType = $("#AntclBaseField option:selected").val();
			 bsFType = $("#AntclBaseFile option:selected").attr("title");
			 baseFName = $("#AntclBaseFile option:selected").text()+"$"+$("#AntclBaseField option:selected").attr("title");
			 baseDName = $("#AntclBaseField option:selected").text();
			 if(aggrOp=="MAX-DIFF-MONTH"||aggrOp=="MAX-DIFF-DAYS"||aggrOp=="MIN-DIFF-MONTH"||aggrOp=="MIN-DIFF-DAYS")
			 { cmprfield = $("#AntclCmprFile option:selected").text()+"$"+$("#AntclCmprField option:selected").attr("title");
			   cmprfname = $("#AntclCmprField option:selected").text();
			   cmprfvalue = $("#AntclCmprValue").text();
			   cmprType = $("#AntclCType option:selected").val();
			   cmprDType = $("#AntclCmprField option:selected").val();
			 }
			/*
			 * if(bsFType =="ANALYTICAL") { baseFName = $("#AntclBaseField
			 * option:selected").attr("title");} else if(bsFType =="CUSTOM") {
			 * baseFName = $("#AntclBaseField option:selected").attr("title");}
			 * else { baseFName = $("#AntclBaseFile
			 * option:selected").text()+"$"+$("#AntclBaseField
			 * option:selected").attr("title"); }
			 */
			 fieldType="N";

			$(".AntclFltrBody").each(function(Bindex, mainelement) 
		    {  
				var outOprtr = $(this).find("span[id^='OutOprtr']").attr("name");
				if(typeof outOprtr == 'undefined')									 
				{   outOprtr = '';}
			    $(".AntclFltrRow",mainelement).each(function(index, element) 
			    { var fldName = "",fldType="";
				   fldType = $(this).find("select[id^='AntclFltrFile'] option:selected").attr("title");
				   /*
					 * if(fldType=="ANALYTICAL" || fldType=="CUSTOM") { fldName =
					 * $(this).find("select[id^='AntclFltrField']
					 * option:selected").attr("title"); }else { fldName =
					 * $(this).find("select[id^='AntclFltrFile']
					 * option:selected").text()+"$"+
					 * $(this).find("select[id^='AntclFltrField']
					 * option:selected").attr("title"); }
					 */
				   fldName = $(this).find("select[id^='AntclFltrFile'] option:selected").text()+"$"+
		   					 $(this).find("select[id^='AntclFltrField'] option:selected").attr("title");
				  var data={"fieldname":fldName,
						    "FType":fldType,
						    "DType":$(this).find("select[id^='AntclFltrField'] option:selected").val(),
						    "displayname":$(this).find("select[id^='AntclFltrField'] option:selected").text(),
							"operator":$(this).find("span[id^='Oprtr']").attr("name"),
							"AFSpec":$(this).find("select[id^='AntclFltrField']").attr("role")
							};
				  if(data.displayname!="Select Field" && data.displayname!="undefined")
				  { if(index==0)
					 {  $.extend(data, {"outOperator":outOprtr,"ref":[]});
					    fltrFields.push(data);
					 }else{
						fltrFields[Bindex].ref.push(data);
					 }
				  }
			     });
// fltrFields.push(data);
		    });
			$(".AntclGrpBody").each(function(Bindex, mainelement) 
		    {  
				var outOprtr = $(this).find("span[id^='OutOprtr']").attr("name");
				if(typeof outOprtr == 'undefined')									 
				{   outOprtr = '';}
			    $(".AntclGrpRow",mainelement).each(function(index, element) 
			    {  var fldName = "",fldType="";
				   fldType = $(this).find("select[id^='AntclGrpFile'] option:selected").attr("title");
				   /*
					 * if(fldType=="ANALYTICAL" || fldType=="CUSTOM") { fldName =
					 * $(this).find("select[id^='AntclGrpField']
					 * option:selected").attr("title"); }else { fldName =
					 * $(this).find("select[id^='AntclGrpFile']
					 * option:selected").text()+"$"+
					 * $(this).find("select[id^='AntclGrpField']
					 * option:selected").attr("title"); }
					 */
				   fldName = $(this).find("select[id^='AntclGrpFile'] option:selected").text()+"$"+
		   			 		 $(this).find("select[id^='AntclGrpField'] option:selected").attr("title");
			    	var data={"fieldname":fldName,
						    "FType":fldType,
						    "DType":$(this).find("select[id^='AntclGrpField'] option:selected").val(),
						    "displayname":$(this).find("select[id^='AntclGrpField'] option:selected").text(),
							"operator":$(this).find("span[id^='Oprtr']").attr("name"),
							"AFSpec":$(this).find("select[id^='AntclGrpField']").attr("role")
						  };
			    if(data.displayname!="Select Field" && data.displayname!="undefined")
			     {    if(index==0)
					 {	$.extend(data, {"outOperator":outOprtr,"ref":[]});
					    grpFields.push(data);
					 }else{
						grpFields[Bindex].ref.push(data);
					 }
			     }
			   });
// grpFields.push(data);
		    });
		 }else{
			 fieldType="N";
			 $(".AntclRatioRow").each(function(index, element) 
			 { var fldName = "",fldType="";
			   fldType = $("#AntclRatioFile"+$(this).attr("id")+" option:selected").attr("title");
			   /*
				 * if(fldType=="ANALYTICAL" || fldType=="CUSTOM") { fldName =
				 * $("#AntclRatioField"+$(this).attr("id")+"
				 * option:selected").attr("title"); }else { fldName =
				 * $("#AntclRatioFile"+$(this).attr("id")+"
				 * option:selected").text()+"$"+
				 * $("#AntclRatioField"+$(this).attr("id")+"
				 * option:selected").attr("title"); }
				 */
			    fldName = $("#AntclRatioFile"+$(this).attr("id")+" option:selected").text()+"$"+
	   			 		 $("#AntclRatioField"+$(this).attr("id")+" option:selected").attr("title");
				 var data={"fieldname":fldName,
						   "FType":fldType,
						   "DType":$("#AntclRatioField"+$(this).attr("id")+" option:selected").val(),
						   "displayname":$("#AntclRatioField"+$(this).attr("id")+" option:selected").text(),
						   "operator":$(".AntclRatioRow #Oprtr"+$(this).attr("id")+"").attr("name"),
						   "AFSpec":$(this).find("select[id^='AntclRatioField']").attr("role")
						  };
				 ratioFields.push(data);
			 });
		 }
		var dataSet = {"FIELD_NAME":fieldName.toString().replace(/ /g,"_"),"DISPLAY_NAME":fieldName.toString().replace(/ /g,"_"),
				"FIELD_TYPE":fieldType,"DEFF_TYPE":deffType, "BASE_FIELD":baseFName, "BASE_FNAME":baseDName,
				"BASE_FTYPE":bsFType,"BASE_DTYPE":bsDType,"OPERATOR":aggrOp,"COMPR_TYPE":cmprType,"COMPR_FIELD":cmprfield,
				"COMPR_FNAME":cmprfname,"COMPR_VALUE":cmprfvalue,"COMPR_DTYPE":cmprDType,
				"FILTER":fltrFields,"GROUP":grpFields,"RATIO":ratioFields,"OCCURENCE":1,"createdby":$scope.username};

		$.extend(dataSet,{"FileID":$scope.IffFileID});
		// console.log("A Def: "+JSON.stringify(dataSet));
		// close panel
		$scope.closeAntclDefPnl();
		 $http({ method : 'POST',
				url : APP_CONST.getConst('BASE_URL_SCORE')+'Analytical',
				params:{'INSTITUTION_ID':currentUser.institutionID,'CType':'AddField'},
				data:dataSet,
				headers : {'Content-Type' : 'application/json'}
			 }).success(function(data) 
			 { $('#T_LoaderSpinner').hide(1000);
			   $scope.error = ""; 
				if(data.StatusCode === 101 && data.Data != null)
				{
				 // console.log("Rsponse: "+JSON.stringify(data));
// $scope.RcriteriaList.push(data.Data);
				 $scope.IffFieldList.push(data.Data);
		 		}
			 }).error(function(data)
				{$('#T_LoaderSpinner').hide(1000);
				 console.log("We could not process your request......Please try later.");
				});				
	  }
	};
	// function to close add new analytical field panel
	$scope.closeAntclDefPnl=function()
	{
		$('body #IffFieldPanel, .hiden').slideUp();
		$('#iff_fields_table, #addIffField, #IffFieldPanel button').show();
		$('#anltclFName').val("");
		 $("select[id^='AntclFltrField'] option:not(:first)").remove().attr("role","");
		 $("select[id^='AntclGrpField'] option:not(:first)").remove().attr("role","");
		 $("#AntclRatioField0 option:not(:first),#AntclRatioField1 option:not(:first)").remove().attr("role","");
		 $("#AntclBaseField option:not(:first)").remove();
		 $("div.AntclFltrRow:not(:first), .AntclFltrBody .inopr").remove();
		 $("div.AntclGrpRow:not(:first), .AntclGrpBody .inopr").remove();
		 $("div.AntclFltrBody:not(:first), div.AntclGrpBody:not(:first), #IffFieldPanel .outopr").remove();
		 $(".IffDrpDwn, #AntclAggrOprtr").val("Select");

	}
	// close master/IFF upload panel
	function close_file_panel()
	   {
	       $('#FileDropZone').text("");
	       $('#master_name, #master_file').val("");
		   $('body #master_upload_panel').slideUp();
		   $('.item').show();
		   $('#MainBlock').css("opacity","1");
	   }
	
	// add new range for Analytical field rule
	$scope.createAntclRuleStructure = function(field)
	{  var data=null;
		for(var i=0;i<$scope.AntclFieldList.length;i++)
		{if($scope.AntclFieldList[i].FIELD_NAME==field)
			{
			 data = $scope.AntclFieldList[i];
			 break;
			}
		}
		if(data != null)
		{ $("#ARField").attr("name",data.FIELD_NAME).text(data.DISPLAY_NAME);
		  $("#AROptr").text(data.OPERATOR);
		  $("#ARBSField").attr({"name":data.BASE_FIELD,"title":data.BASE_FTYPE}).text(data.BASE_FNAME);
		  $("#ARBSField").attr("role",data.BASE_DTYPE);
		  $("#ARCMPField").text((data.COMPR_FNAME==""?data.COMPR_VALUE:data.COMPR_FNAME));
		  $("#AROptr").attr({"title":data.COMPR_FIELD,"lang":data.COMPR_FNAME,"name":data.COMPR_VALUE});
		  $("#AROptr").attr({"role":data.COMPR_TYPE,"accesskey":data.COMPR_DTYPE});
	      $scope.Filters = data.FILTER;
		  $scope.Groups = data.GROUP;
		  $scope.Ratio = data.RATIO;
		  $scope.$apply();
		  for(var i=0;i<data.FILTER.length;i++)
		  {
			 var domstr1='<div style="border-bottom:2px solid #CEC6C6" class="AntclRuleFltrBody" name="'+data.FILTER[i].outOperator+'"></div>';
// domstr1=domstr1+'<span class="outopr"
// id="OutOprtr">'+data.FILTER[i].outOperator+'<span
// class="right-braces"></span></span></div>';
			 $("#AntclRuleFltr").append(domstr1);
			 createStructure(i+"f","AntclRuleFltrBody",data.FILTER[i],"");
			 if(typeof data.FILTER[i].ref != 'undefined')
			 	{for(var j=0;j<data.FILTER[i].ref.length;j++)
				  {
					createStructure(i+"f"+j,"AntclRuleFltrBody",data.FILTER[i].ref[j],"ref");		
				  }
			 	}
		  }
		  for(var i=0;i<data.GROUP.length;i++)
		  {
			  var domstr1='<div style="border-bottom:2px solid #CEC6C6" class="AntclRuleGrpBody" name="'+data.GROUP[i].outOperator+'"><div>';
// domstr1=domstr1+'<span class="outopr"
// id="OutOprtr">'+data.GROUP[i].outOperator+'<span
// class="right-braces"></span></span></div>';
		      $("#AntclRuleGrp").append(domstr1);
			  createStructure(i+"g","AntclRuleGrpBody",data.GROUP[i],"");
			  if(typeof data.GROUP[i].ref != 'undefined')
			 	{for(var j=0;j<data.GROUP[i].ref.length;j++)
				  {
					createStructure(i+"g"+j,"AntclRuleGrpBody",data.GROUP[i].ref[j],"ref");		
				  }
			 	}
		  }
		  for(var i=0;i<data.RATIO.length;i++)
		  {
			  var domstr1='<div style="border-bottom:2px solid #CEC6C6" class="AntclRuleRatioBody"><div>';
// domstr1=domstr1+'<span class="outopr"
// id="OutOprtr">'+data.GROUP[i].outOperator+'<span
// class="right-braces"></span></span></div>';
		      $("#AntclRuleRatio").append(domstr1);
			  createStructure(i+"r","AntclRuleRatioBody",data.RATIO[i],"");
			  $(".AntclRuleRatioBody input,.AntclRuleRatioBody select,.AntclRuleRatioBody .ARuleRange").hide();
		  }
		}
		function createStructure(index,id,object,container)
		{
		 var domstr='<div class="AntclRuleRow" id="'+index+'" style="padding:5px; border-bottom:1px dashed #CEC6C6">';
		 domstr=domstr+'<span class="hiden" id="hide'+index+'" name="'+object.FType+'" title="'+object.operator+'" role="'+object.DType+'"></span>';
		 domstr=domstr+'<label class="form-label equal afname" id="AField'+index+'" name="'+object.fieldname+'" role="'+object.AFSpec+'">'+object.displayname+'</label>';
		 domstr=domstr+'<select class="form-control equal hiden" id="DPDCType'+index+'">';
	 	 domstr=domstr+'<option value="Select" selected="selected">Operation Type</option><option value="DPD-VALUE">DPD Value</option><option value="DPD-DATE">DPD DATE</option></select>';
		 domstr=domstr+'<select class="form-control equal" id="AExp'+index+'" name="Expression" title="'+object.DType+'"></select>';
		 domstr=domstr+'<select class="form-control equal hiden" id="CType'+index+'" style="width:60px">';
	 	 domstr=domstr+'<option value="Select" selected="selected">Type</option><option value="Value">Value</option><option value="Field">Field</option></select>';
		 domstr=domstr+'<input class="form-control equal hiden" id="AFieldOne'+index+'" placeholder="Minimum Value" />';
	 	 domstr=domstr+'<input class="form-control equal hiden" id="AFieldTwo'+index+'" placeholder="Maximum Value" />';
	 	 domstr=domstr+'<select class="form-control equal hiden IffDrpDwn" id="AIffFile'+index+'">';
	 	 domstr=domstr+'<option value="Select" selected="selected">Select File</option></select>';
	 	 domstr=domstr+'<select class="form-control equal hiden" id="AIffField'+index+'"  contextmenu="D">';
	 	 domstr=domstr+'<option value="Select" selected="selected">Select Field</option></select>';
	 	 domstr=domstr+'<select class="form-control equal hiden" id="fcmprexp'+index+'" style="width:70px"></select>';
	 	 domstr=domstr+'<input class="form-control equal hiden" id="fcmprval'+index+'" placeholder="Difference" style="width:60px" contextmenu="Number"/>';
// domstr=domstr+'<span class="outopr" id="Oprtr"><span
// class="right-braces"></span> '+object.operator+'</span>';
	 	 domstr=domstr+'</div><a class="float-right ARuleRange" style="margin-top:-28px">Add Range</a>';
	 	 if(container!="ref")
	 	 {  $("."+id+":last").append(domstr);	 	 
	 	 }else{
	 		$("."+id+":last").append(domstr);
	 	 }
	 	 if((object.DType === 'Number') || (object.DType === 'N'))
  	     {   $("."+id+" #AFieldOne"+index+",."+id+" #AFieldTwo"+index+"").attr("contextmenu","Number");
			 Exp_Drop_Downs('.'+id+' #AExp'+index,expressions.NumberExpression);
		   		} else if((object.DType === 'String') || (object.DType === 'S'))
		   		    {
		   			 $("."+id+"  #AFieldOne"+index+",."+id+" #AFieldTwo"+index+"").attr("contextmenu","String");
		   			 Exp_Drop_Downs('.'+id+' #AExp'+index,expressions.StringExpression);				   			
		   		    } else if((object.DType === 'Boolean') || (object.DType === 'B'))
		   		        {
		   		    	 Exp_Drop_Downs('.'+id+' #AExp'+index,expressions.BooleanExpression);				   			
		   		        } else if((object.DType === 'Date') || (object.DType === 'D'))
		   		           {
		   		        	Exp_Drop_Downs('.'+id+' #AExp'+index,expressions.AntclDateExpression);
		   		        	Exp_Drop_Downs('.'+id+' #fcmprexp'+index,expressions.DPDExpression);
		   		            $('.'+id+' #AFieldOne'+index+', .'+id+' #AFieldTwo'+index+'').datepicker({changeMonth: true, changeYear: true, 
		   		            	yearRange: "1900:2016",dateFormat: 'dd:mm:yy',defaultDate:(new Date(new Date()).getDate())}).attr({'readonly':'readonly','placeholder':'Enter Date'});
		   		           }else if((object.DType === 'DPD') || (object.DType === 'Dpd'))
		   		           {
		   		        	$("."+id+":last").find("#DPDCType"+index+"").show();
		   		        	$("."+id+":last").find("#AExp"+index+"").hide();
		   		           }
		}
	}
	
	// save new specification rule for analytical field
	$scope.saveAntclFieldRule=function()
	{
     if(validateAntclField("#anltclRulePanel","input,select","antclRuleErr"))
	  {
		var fieldName = $("#ARField").attr("name");
		var displayName = $("#ARField").text();
		var aggrOp = $("#AROptr").text();
		var baseFName = $("#ARBSField").attr("name");
		var baseDName = $("#ARBSField").text();
		var baseType = $("#ARBSField").attr("title");
		var baseDType = $("#ARBSField").attr("role");
		var fltrFields = [], grpFields = [], ratioFields = [];
		var val1,val2,exp,fDataType,field, displName, comprfield="",comprfname="",comprvalue="",comprtype="",comprDType="";
	    var fieldIffType, Foprtr, AFSpecID, ExpType, diff="",diffoprtr="";
	    if(aggrOp=="MAX-DIFF-MONTH"||aggrOp=="MAX-DIFF-DAYS"||aggrOp=="MIN-DIFF-MONTH"||aggrOp=="MIN-DIFF-DAYS")
	    { 
	      comprfield=$("#AROptr").attr("title");
		  comprfname=$("#AROptr").attr("lang");
		  comprvalue=$("#AROptr").attr("name");
		  comprtype = $("#AROptr").attr("role");
		  comprDType = $("#AROptr").attr("accesskey");
	    }
	    // create rule for filter(inner opertr and outer oprtr both)
		$("#AntclRuleFltr .AntclRuleFltrBody").each(function(Bindex, mainelement) 
		 {
			var outOprtr = $(this).attr("name");
			if(typeof outOprtr == 'undefined')									 
			{   outOprtr = '';
			}
			 $(".AntclRuleRow",mainelement).each(function(index, element) 
			  {  ExpType=$(this).find("select[id^='CType'] option:selected").val();
				 exp = $(this).find("select[id^='AExp'] option:selected").val();				
				 fDataType = $(this).find("select[id^='AExp']").attr("title");
				 if(ExpType =="Value")
				 { if(fDataType=="D"||fDataType=="Date"||fDataType=="DPD")
				   { val1 = $(this).find("input[id^='AFieldOne']").val();
				     val2 = $(this).find("input[id^='AFieldTwo']").val();
				     diff =$(this).find("input[id^='fcmprval']").val();
				     if(diff!="")
				     {  diffoprtr=$(this).find("select[id^='fcmprexp'] option:selected").val();}
				   }else{
					   val1 = $(this).find("input[id^='AFieldOne']").val();
					   val2 = $(this).find("input[id^='AFieldTwo']").val();
				   }
				 }else if(ExpType == "Field")
				 { if(fDataType=="D"||fDataType=="Date"||fDataType=="DPD")
				   { val1 = $(this).find("select[id^='AIffFile'] option:selected").text()+"$"+
					 	  $(this).find("select[id^='AIffField'] option:selected").attr("title");
					 val2 = "";
					 diff =$(this).find("input[id^='fcmprval']").val();
					 if(diff!="")
				     {  diffoprtr=$(this).find("select[id^='fcmprexp'] option:selected").val();}
				   }else{
					 val1 = $(this).find("select[id^='AIffFile'] option:selected").text()+"$"+
					 	  $(this).find("select[id^='AIffField'] option:selected").attr("title");
					 val2 = "";
				   }
				 }else{
					 ExpType="Value";
					 val1 = $(this).find("input[id^='AFieldOne']").val();
					 val2 = $(this).find("input[id^='AFieldTwo']").val();
					 if(fDataType=="DPD")
					 { diff =$(this).find("input[id^='fcmprval']").val();
					   if(diff!="")
				       {  diffoprtr=$(this).find("select[id^='fcmprexp'] option:selected").val();}
					 }
				 }
					 
			     field=$(this).find("label[id^='AField']").attr("name");
			     displName=$(this).find("label[id^='AField']").text();
			     fieldIffType=$(this).find("span[id^='hide']").attr("name");
			     Foprtr=$(this).find("span[id^='hide']").attr("title");
			     AFSpecID=$(this).find("label[id^='AField']").attr("role");
			     // console.log(val1+" : "+val2+" : "+exp+" : "+displName+" :
					// "+field+" : "+fDataType+" : "+fieldIffType+" : "+Foprtr+"
					// : "+ExpType);
			    var data = createMatrixJson(val1,val2,exp,field,displName,fDataType,fieldIffType,AFSpecID,Foprtr,ExpType);
			    $.extend(data,{"Difference":diff,"DiffOpr":diffoprtr});
			    if(index==0)
				 {  $.extend(data, {"outOperator":outOprtr,"ref":[]});
				 	fltrFields.push(data);
				 }else{
					fltrFields[Bindex].ref.push(data);
				 }
			 });
		 });
	    // create rule for grp(inner opertr and outer oprtr both)
		 $("#AntclRuleGrp .AntclRuleGrpBody").each(function(Bindex, mainelement) 
		  {
			 var outOprtr = $(this).attr("name");
			 if(typeof outOprtr == 'undefined')									 
			 {   outOprtr = '';}
			$(".AntclRuleRow",mainelement).each(function(index, element) 
			 {
				 ExpType=$(this).find("select[id^='CType'] option:selected").val();
				 if(ExpType =="Value")
				 { if(fDataType=="D"||fDataType=="Date")
				   { val1 = $(this).find("input[id^='AFieldOne']").val();
				     val2 = $(this).find("input[id^='AFieldTwo']").val();
				     diff =$(this).find("input[id^='fcmprval']").val();
				     if(diff!="")
				     {  diffoprtr=$(this).find("select[id^='fcmprexp'] option:selected").val();}
				   }else{
					   val1 = $(this).find("input[id^='AFieldOne']").val();
					   val2 = $(this).find("input[id^='AFieldTwo']").val();
// diff="";
				   }
				 }else if(ExpType == "Field")
				 { if(fDataType=="D"||fDataType=="Date")
				   { val1 = $(this).find("select[id^='AIffFile'] option:selected").text()+"$"+
					 	  $(this).find("select[id^='AIffField'] option:selected").attr("title");
					 val2 = "";
					 diff =$(this).find("input[id^='fcmprval']").val();
					 if(diff!="")
				     {  diffoprtr=$(this).find("select[id^='fcmprexp'] option:selected").val();}
				   }else{
					 val1 = $(this).find("select[id^='AIffFile'] option:selected").text()+"$"+
					 	  $(this).find("select[id^='AIffField'] option:selected").attr("title");
					 val2 = "";
// diff="";
				   }
				 }else{
					 ExpType="Value";
					 val1 = $(this).find("input[id^='AFieldOne']").val();
					 val2 = $(this).find("input[id^='AFieldTwo']").val();
				 }
			     exp = $(this).find("select[id^='AExp'] option:selected").val();
			     fDataType=$(this).find("select[id^='AExp']").attr("title");
			     field=$(this).find("label[id^='AField']").attr("name");
			     displName=$(this).find("label[id^='AField']").text();
			     fieldIffType=$(this).find("span[id^='hide']").attr("name");
			     Foprtr=$(this).find("span[id^='hide']").attr("title");
			     AFSpecID=$(this).find("label[id^='AField']").attr("role");
				 // console.log(val1+" : "+val2+" : "+exp+" : "+displName+" :
					// "+field+" : "+fDataType+" : "+fieldIffType+" : "+Foprtr+"
					// : "+ExpType);
			     var data = createMatrixJson(val1,val2,exp,field,displName,fDataType,fieldIffType,AFSpecID,Foprtr,ExpType);
			     $.extend(data,{"Difference":diff,"DiffOpr":diffoprtr});
			    if(index==0)
				 {  $.extend(data, {"outOperator":outOprtr,"ref":[]});
				 	grpFields.push(data);
				 }else{
					grpFields[Bindex].ref.push(data);
				 }
			 });
		  });
		   $("#AntclRuleRatio .AntclRuleRatioBody").each(function(Bindex, mainelement) 
				  {
					 var outOprtr = $(this).attr("name");
					 if(typeof outOprtr == 'undefined')									 
					 {   outOprtr = '';}
					$(".AntclRuleRow",mainelement).each(function(index, element) 
					 {
						 ExpType=$(this).find("select[id^='CType'] option:selected").val();
						 if(ExpType =="Value")
						 { val1 = $(this).find("input[id^='AFieldOne']").val();
						   val2 = $(this).find("input[id^='AFieldTwo']").val();
						 }else if(ExpType == "Field"){
							 val1 = $(this).find("select[id^='AIffFile'] option:selected").text()+"$"+
						 	   	  $(this).find("select[id^='AIffField'] option:selected").attr("title");
							 val2 = "";
						 }else{
							 ExpType="Value";
							 val1 = $(this).find("input[id^='AFieldOne']").val();
							 val2 = $(this).find("input[id^='AFieldTwo']").val();
						 }
					     exp = $(this).find("select[id^='AExp'] option:selected").val();
					     fDataType=$(this).find("select[id^='AExp']").attr("title");
					     field=$(this).find("label[id^='AField']").attr("name");
					     displName=$(this).find("label[id^='AField']").text();
					     fieldIffType=$(this).find("span[id^='hide']").attr("name");
					     Foprtr=$(this).find("span[id^='hide']").attr("title");
					     AFSpecID=$(this).find("label[id^='AField']").attr("role");
					     if(exp=="Select")
					     {
					    	 Foprtr="", val1="", val2="",exp=="";
					     }
						 // console.log(val1+" : "+val2+" : "+exp+" :
							// "+displName+" : "+field+" : "+fDataType+" :
							// "+fieldIffType+" : "+Foprtr+" : "+ExpType);
					     var data = createMatrixJson(val1,val2,exp,field,displName,fDataType,fieldIffType,AFSpecID,Foprtr,ExpType);
					    if(index==0)
						 {  $.extend(data, {"outOperator":outOprtr,"ref":[]});
						 	ratioFields.push(data);
						 }else{
							ratioFields[Bindex].ref.push(data);
						 }
					 });
				  });

		var dataSet={"FIELD_NAME":fieldName,"DISPLAY_NAME":displayName,"BASE_FIELD":baseFName,"BASE_FNAME":baseDName,
				     "BASE_FTYPE":baseType,"BASE_DTYPE":baseDType,"OPERATOR":aggrOp,"COMPR_TYPE":comprtype,
				     "COMPR_FIELD":comprfield,"COMPR_FNAME":comprfname,"COMPR_VALUE":comprvalue,"COMPR_DTYPE":comprDType,
				     "FILTER":fltrFields,"GROUP":grpFields,"RATIO":ratioFields,"createdby":$scope.username};
		
// console.log("Antcl Rule:"+JSON.stringify(dataSet));
		$scope.closeAmtclRulePnl();
		$http({ method : 'POST',
			url : BASE_URL_SCOR+'Analytical',
			params:{'INSTITUTION_ID':currentUser.institutionID,'CType':'AddFieldSpec'},
			data:dataSet,
			headers : {'Content-Type' : 'application/json'}
		 }).success(function(data) 
		 { $('#T_LoaderSpinner').hide(1000);
		   $scope.error = ""; 
			if(data.StatusCode === 101 && data.Data != null)
			{
			  // console.log("Rsponse: "+JSON.stringify(data));
			  $("#"+ids+"").attr("role",data.Data);
	 		}
		 }).error(function(data)
			{ $('#T_LoaderSpinner').hide(1000);
			  console.log("We could not process your request......Please try later.");
			});		
	  }
	}
	// expression change for analytical rule panel
    $(document.body).on('change', 'select[id^="CType"]', function()
    {
    	var value = $(this[this.selectedIndex]).val();
    	var exp = $(this).prev().find("option:selected").val();
    	$(this).nextAll("input").hide().val("");
    	$(this).nextAll("select").hide().val("Select");
		if(value != "Select")
		{  
		  if((value == "Value"))
		   { if(exp=="BETWEEN"||exp=="Between"||exp=="!Between"||exp=="!BETWEEN")
			  { 
			    $(this).nextAll('input:not(:last)').show().val("");
			  }else if(exp=="DIFF-DAYS"||exp=="DIFF-MONTH")
			  {
				  $(this).parent().find('select[id^="fcmprexp"]').show().val("Select");
				  $(this).nextAll('input:first,input:last').show().val("");
			  }else
			  {	   
				 $(this).nextAll('input:first').show().val("");
			  }
		   }
		  else if(value=="Field")
		   { 
			  if(exp=="BETWEEN"||exp=="Between"|| exp=="!Between")
			  { 
			  	alert("Between Condition with Field comparision is in allowed");
			  }else if(exp=="DIFF-DAYS"||exp=="DIFF-MONTH")
			  {
				  $(this).nextAll('select').val("Select").show();
				  $(this).nextAll('input:last').val("").show();
			  }
			  else{
// $(this).nextAll("input").hide().val("");
				  $(this).nextAll("select:not(:last)").val("Select").show();
			  }
			  Update_Master("#"+$(this).nextAll("select:first").attr("id")); 
		   }
		}
    });	
    
    // open comapre field in base field Date or DPD
    $(document.body).on('change', '#AntclCType', function()
    {
    	var value = $(this[this.selectedIndex]).val();   
    	$(this).nextAll("input").val("").hide();
		$(this).nextAll("select").val("Select").hide();
		  if(value == "Value")
		    { 
			   $(this).nextAll('input:first').show(100).datepicker({changeMonth: true, changeYear: true, yearRange: "1900:2016", dateFormat: 'dd:mm:yy',defaultDate:(new Date(new Date()).getDate())});;
		    }
		   else if(value=="Field")
		   { 		 
			  $(this).nextAll("select").show(100).val("Select");	
// Update_Master(".IffDrpDwn");
		   }		  
    });	
    $(document.body).on('change', '#AntclAggrOprtr', function()
    {
    	var value = $(this[this.selectedIndex]).val();
		if(value != "Select")
		{  if(value=="MAX-DIFF-MONTH"||value=="MAX-DIFF-DAYS"||value=="MIN-DIFF-MONTH"||value=="MIN-DIFF-DAYS")
			{		  
			  $(this).next().show(100).val("Select");
			}
		  else
		  {   
		     $(this).nextAll("input").val("").hide();
		     $(this).nextAll("select").val("Select").hide();
		  }
		}
    });	
 // expression change for analytical rule panel
    $(document.body).on('change', 'select[id^="AExp"]', function()
    {
    	var value = $(this[this.selectedIndex]).val();
    	var type = $(this).attr("title");
    	$(this).nextAll("input").hide().val("").attr('placeholder','Enter Value').removeAttr("readonly contextmenu").removeClass("hasDatepicker");;
    	$(this).nextAll("select").hide().val("Select");
		if(value != "Select" && value!="null")
		{  if(type =="D"||type=="Date")
			{ if(value=="IS-NULL"||value=="IS-NOT-NULL"){
			  }
			 else{ 
			  $(this).next().show(100);}
			}else if(type =="DPD"||type=="Dpd")
			{ if(value=="DIFF-MONTH"||value=="DIFF-DAYS")
			  { $(this).nextAll("input:last").show(); }
			 else if(value=="BEFORE"||value=="AFTER") 
			  { $(this).nextAll("input:first").datepicker({changeMonth: true, changeYear: true, 
		            	yearRange: "1900:2016",dateFormat: 'dd:mm:yy',defaultDate:(new Date(new Date()).getDate())}).show()
		            	.attr({'readonly':'readonly','placeholder':'Enter Date'});}
			 else 
			  { $(this).nextAll("input:first").attr("contextmenu","Number").show();}
			}
		   else if((value == "Between") || (value == "! Between"))
		    { $(this).nextAll('input:not(:last)').val("").show(); }
		    else
		    { $(this).next().next().val("").show();
// $(this).next().next().next().slideUp().val("");
		    }
		}
    });	
 
    // expression change for analytical rule panel
    $(document.body).on('change', 'select[id^="DPDCType"]', function()
    {
    	var value = $(this[this.selectedIndex]).val();
    	$(this).nextAll("input").hide().val("");
    	$(this).nextAll("select").hide().val("Select");
		if(value == "DPD-VALUE")
	    {  $(this).next().show();
	       Exp_Drop_Downs('#'+$(this).next().attr("id")+'',expressions.DPDExpression);
	    }
	   else if(value=="DPD-DATE") 
	    {   $(this).next().show();	 
	   	   Exp_Drop_Downs('#'+$(this).next().attr("id")+'',expressions.DPDDateExpression);	
	    }
    });	   
    
     var rangecount=0;
	// add new range for analytical rule
	$(document.body).on('click','.ARuleRange',function() 
		{
			var dom = $(this).prev().clone();
			var oprtr = $(dom).find("span[id^='hide']").attr("title");
			dom.remove(".outoprr")
			$(this).prev().find("span[id^='hide']").attr("title","||");
			$(dom).find("span[id^='hide']").attr("title",oprtr);
			$("select, input",dom).each(function(){
				$(this).attr("id",$(this).attr("id")+"R"+rangecount);
			});
			$(dom).attr("id",$(dom).attr("id")+"R"+rangecount);
			$(this).before(dom);
			rangecount=rangecount+1;
		});
	
	// open panel for analytical field view
	$scope.iffFieldView=function(objId)
	{
		var objData;
		for(var obj in $scope.IffFieldList)
			{  if(obj.FIELD_ID==objId && obj.FileID==$scope.IffFileID)
				{
				 objData = obj;
				 break;
				}
			}
		if((typeof objData!="undefined" || objData!="") && $scope.selectedFileType=="ANALYTICAL")
			{
			 $('body #AFDisplPanel').slideDown().focus();
			 $('#iff_fields_table, #addIffField').hide();
			 $("#afieldname").text(objData.DISPLAY_NAME);
			 $("#deffname").text(objData.DEFF_TYPE);
			 $("#aggroprtr").text(objData.OPERATOR);
			 var base = objData.BASE_FIELD.split("$");
			 $("#bsname").text(base[0]+" : "+objData.BASE_FNAME);
			 $scope.Filters = objData.FILTER;
			 $scope.Groups = objData.GROUP;
			 $scope.Ratio = objData.RATIO;
			}
		else if((typeof objData!="undefined" || objData!="") && $scope.selectedFileType=="CUSTOM"){
			 $('body #CstmFDisplPanel').slideDown().focus();
			 $('#iff_fields_table, #addcstmField').hide();
			 $scope.CstmField = objData;
		}
	}
	// close analytical field deffinition panel
	$scope.closeAdefPanel=function()
	{ $('body #AFDisplPanel').hide().removeClass("panel-popup");;
	  $('#iff_fields_table, #addIffField').show();
	  $("#MainBlock").css("opacity","1");
	  $("#afieldname,#deffname,#aggroprtr,#bsname").text("");
		 $scope.Filters = [];
		 $scope.Groups = [];
		 $scope.Ratio = [];
	}
	$scope.closeCstmDsplPanel=function()
	{
	  $('body #CstmFDisplPanel').hide().removeClass("panel-popup");;
	  $('#iff_fields_table, #addcstmField').show();
	  $("#MainBlock").css("opacity","1");
	  $("#cstmFDisName,#cstmDType,#cstmLavel,#cstmdfltVal").text("");
	  $scope.CstmFRules = [];
	}
	
	
	// open panel for analytical field specification view
	$scope.iffSpecificationView=function(field,objId)
	{
		// console.log("inside specification call"+objId);
		if(objId!="")
		{ $http({ method : 'POST',
			url : APP_CONST.getConst('BASE_URL_SCORE')+'Analytical',
			params:{'INSTITUTION_ID':currentUser.institutionID,'CType':'GetSpec'},
			data:{'FieldName':field,'SpecID':objId},
			headers : {'Content-Type' : 'application/json'}
		 }).success(function(data) 
		 { $('#T_LoaderSpinner').hide(1000);
		   $scope.error = ""; 
			if(data.StatusCode === 101 && data.Data != null)
			{
			  // console.log("Rsponse: "+JSON.stringify(data));
			  	$("#MainBlock").css("opacity","0.17");
			     $(document.body).find('#AFDisplPanel').slideDown().addClass("panel-popup").focus();
				 $('#iff_fields_table, #addIffField').hide();
				 $("#afieldname").text(data.Data.DISPLAY_NAME);
				 $("#deffname").text(data.Data.DEFF_TYPE);
				 $("#aggroprtr").text(data.Data.OPERATOR);
				 var base = data.Data.BASE_FIELD.split("$");
				 $("#bsname").text(base[0]+" : "+data.Data.BASE_FNAME);
				 $scope.Filters = data.Data.FILTER;
				 $scope.Groups = data.Data.GROUP;
				 $scope.Ratio = data.Data.RATIO;
	 		}
		 }).error(function(data)
			{ $('#T_LoaderSpinner').hide(1000);
			  console.log("We could not process your request......Please try later.");
			});				
		}else{
			alert("You have not defined any specification for this field.");
		}
	}
	
	// sayali and piyush code for master and enumeration upload and display
	$scope.check_enum = function(fieldid)
		{
			 $('body #enumfield_list_panel').slideDown().focus();
			 $('.item').hide();
			 $('.col-md-10').css("opacity","0.15");
			 $('#importDatabttn').show();
			 $('#import_data').show();
			 var currfile = $scope.IffFileID;
			 $http({
		  	       	method : 'GET',
		  	       	url: APP_CONST.getConst('BASE_URL_SCORE')+'findAllDetails',
		  	       	params:{'INSTITUTION_ID':currentUser.institutionID,'FileID':currfile,'FieldID':fieldid},
		  	       	headers : {'Content-Type' : 'application/json'}
		  	       }).success(function (data) 
	  	    	{ 
		  	    // console.log("import data request :"+JSON.stringify(data));
		  	    if(data.test.length != 0){
			  	    for(var j=0; j< data.test.length; j++)
			  	 	{
			  	    	if(data.test[j].FieldID == fieldid){
				  	    	if(data.test[j].Data!=undefined || data.test[j].Data!=null || data.test[j].Data!=""){
				  	        	for(var i=0; i< data.test[j].Data.length; i++)
				  	 			 {
					  	        		 $('#enumdata').append("<span class='add-div'>"+data.test[j].Data[i]+"</span><br>");
				  	 			 }
				  	         }
			  	    	}
			  	 	}
		  	   $scope.temp=fieldid;
		  	   }
		  	   else{
				  $scope.temp=fieldid;
	  	       }
	  	    }).error(function(data){
	  	    	console.log("error"+data);
// $('#FileDropZone').text("We could not process your request......Please try
// later.").css("color","red");
	  	     });
		}
		$('#cancelenum').click(function() 
		{
			   $('body #enumfield_list_panel').slideUp();
			   $('.item').show();
			   $('.col-md-10').css("opacity","1");
			   $('#importDatabttn').hide();
			   $('#import_data').hide();
			   $('#enumdata').text("");
			   $('#import_data').val("");
		});
		$scope.importData = function(fieldid) 
		{
			$rootScope.data_obj.append('Name', $("#import_data").val());
// console.log("current id :"+$scope.IffFieldList[fieldid]);
			var FNAME;
			for(i in $scope.IffFieldList)
				{
				if($scope.IffFieldList[i].FIELD_ID == fieldid)
					{
					FNAME = $scope.IffFieldList[i].DISPLAY_NAME;
					}
				}
			var fileID=$scope.IffFileID;
			$http({
	  	       	method : 'POST',
	  	       	url: APP_CONST.getConst('BASE_URL_SCORE')+'importDetails',
	  	       	params:{'INSTITUTION_ID':currentUser.institutionID,'user':$scope.username,'FileID':fileID,'FieldID':fieldid,'FieldName':FNAME},
	  	       	data : $rootScope.data_obj,transformRequest: angular.identity,
	  	        headers: {'Content-Type': undefined}
  	       }).success(function (data) 
  	    	{ // console.log("import data request :"+JSON.stringify(data));
  	    	getAllData(fieldid,FNAME);
  	       }).error(function(data)
  	       { console.log("error"+data);
// $('#FileDropZone').text("We could not process your request......Please try
// later.").css("color","red");
  	       });
		}
		
		$(document.body).on("change","#IffFileType",function(){
		if($(this).val() == "MASTER DATA")
			{
// console.log("Dynamic json="+JSON.stringify($scope.IFFList));
			$("#master_name").hide();
			$("#masterFileName").show();
// $scope.masterFileName = $scope.masterFileName[0];
			}
		else{
			$("#master_name").show();
			$("#masterFileName").hide();
		}		
	});
		
	function getAllData(fieldid,FNAME){
			$http({
	  	       	method : 'GET',
	  	       	url: APP_CONST.getConst('BASE_URL_SCORE')+'AllValues',
	  	       	params:{'INSTITUTION_ID':currentUser.institutionID,'FileID':$scope.IffFileID,'FieldID':fieldid,'FieldName':FNAME},
	  	       	headers : {'Content-Type' : 'application/json'}
  	       }).success(function (data) 
  	    	{ // console.log("get data :"+JSON.stringify(data.Data));
	    	$scope.ArrayLists =data.Data;
  	    	for(var i=0;i<data.Data.length;i++){
  	    		$('#enumdata').append("<span class='add-div'>"+data.Data[i]+"</span><br>");
  	    	}
  	       }).error(function(data)
  	       { console.log("error"+data);
// $('#FileDropZone').text("We could not process your request......Please try
// later.").css("color","red");
  	       });
		}
	
	
	 
// ------------------custom field calculation start------------------//
	// change field in custom field rule panel
	 $(document.body).on('change', 'select[id^="cstmFieldOne"]', function()
	 { var value = $(this[this.selectedIndex]).val();
	   var id = "#"+$(this).nextAll("select[id^='cstmExp']").attr("id");
	   $(this).nextAll("input").hide().val("").removeAttr("readonly contextmenu").removeClass("hasDatepicker").attr("placeholder","Enter value");
	   $(this).nextAll("select").hide().val("Select");
	   $(this).nextAll("select[id^='cstmExp']").show();
	   $("div[id^='ui-datepicker-div']").remove();
	   $(id).attr("title",value);
	   var parent = $(this).parent();
	   var valId1 = "#"+$(this).nextAll("input[id^='cstmValue1']").attr("id");
	   var valId2 = "#"+$(this).nextAll("input[id^='cstmValue1']").attr("id");
	   if(value!="Select")
	   { if((value === 'Number') || (value === 'N'))
	     {   parent.find(valId1,valId2).attr("contextmenu","Number").datepicker("destroy");;
		     Exp_Drop_Downs(id,expressions.NumberExpression);
	   		} else if((value === 'String') || (value === 'S'))
	   		    {
	   			 parent.find(valId1,valId2).attr("contextmenu","String").datepicker("destroy");;
	   			 Exp_Drop_Downs(id,expressions.StringExpression);				   			
	   		    } else if((value === 'Boolean') || (value === 'B'))
	   		        {
	   		    	 Exp_Drop_Downs(id,expressions.BooleanExpression);				   			
	   		        } else if((value === 'Date') || (value === 'D'))
	   		           {
	   		        	Exp_Drop_Downs(id,expressions.AntclDateExpression);
	   		        	parent.find(valId1,valId2).datepicker({changeMonth: true, changeYear: true, 
	   		            	yearRange: "1900:2016",dateFormat: 'dd:mm:yy',defaultDate:(new Date(new Date()).getDate())}).attr({'readonly':'readonly','placeholder':'Enter Date'});
	   		           }else if((value === 'DPD') || (value === 'Dpd'))
	   		           {
	   		        	parent.find("select[id^='cstmDPDTYPE']").show();
	   		        	parent.find("select[id^='cstmExp']").hide();
		   		       }
	    var FileType=$(this).prev().find("option:selected").attr("title");
	    var title = $(this[this.selectedIndex]).attr("title");
	    $(this).attr("role","");
	    ids = $(this).attr("id");
		if(FileType=="ANALYTICAL" && value != "Select" && (title != "undefined" || typeof title != 'undefined'))
		{	$('#MainBlock').css("opacity","0.17");
			$("#anltclRulePanel").slideDown().focus();
			$scope.createAntclRuleStructure(title);
		}
	   }
	 });
	 // expression change for custom field rule panel
	    $(document.body).on('change', 'select[id^="cstmExp"]', function()
	    {
	    	var value = $(this[this.selectedIndex]).val();
	    	var type = $(this).attr("title");
	    	$(this).nextAll("input").hide().val("").removeAttr("readonly contextmenu").removeClass("hasDatepicker");
	    	$(this).nextAll("select").hide().val("Select").removeAttr("contextmenu");
			if(value != "Select" && value !="null")
			{  if(type =="D"||type=="Date")
				{ if(value=="IS-NULL"||value=="IS-NOT-NULL"){
				  }
				 else{ 
				  $(this).next().show();}
				}else if(type =="DPD"||type=="Dpd")
				{ if(value=="DIFF-MONTH"||value=="DIFF-DAYS")
				  { $(this).nextAll("input:last").show();
				    $(this).parent().find("select[id^='cstmCmprExp']").show();
				  }
				 else if(value=="BEFORE"||value=="AFTER") 
				  { $(this).nextAll("input:first").show().datepicker({changeMonth: true, changeYear: true, 
			            	yearRange: "1900:2016",dateFormat: 'dd:mm:yy',defaultDate:(new Date(new Date()).getDate())})
			            	.attr({'readonly':'readonly','placeholder':'Enter Date'});}
				 else 
				  { $(this).nextAll("input:first").show().attr("contextmenu","Number");}
				}
			   else if((value == "Between") || (value == "! Between"))
			    { $(this).nextAll('input:not(:last)').show().val(""); }
			    else
			    { 
// $(this).next().next().show().val("");//changed to allow field comparision
			      $(this).next().show();
// $(this).next().next().next().slideUp().val("");
			    }
			}
	    });	
	    // open comapre field in base field Date or DPD
	    $(document.body).on('change', 'select[id^="cstmCType"]', function()
	    {
	    	var value = $(this[this.selectedIndex]).val();
	    	var exp = $(this).prev().find("option:selected").val();
	    	$(this).nextAll("input").hide().val("").removeAttr("contextmenu");
	    	$(this).nextAll("select").hide().val("Select").removeAttr("contextmenu");
			if(value != "Select")
			{  
			  if((value == "Value"))
			   { if(exp=="BETWEEN"||exp=="Between"||exp=="!Between"||exp=="!BETWEEN")
				  { 
				    $(this).nextAll('input:not(:last)').show().val("");
				  }else if(exp=="DIFF-DAYS"||exp=="DIFF-MONTH")
				  {
// $(this).nextAll('select:last').show().val("Select");
					  $(this).nextAll('input:first,input:last').show().val("");
				  }else
				  {	   
					 $(this).nextAll('input:first').show().val("");
				  }
			   }
			  else if(value=="Field")
			   {
				  var lastfieldType = $(this).prev().prev().prev().find("option:selected").val();
				  $(this).nextAll("select[id^='cstmFieldTwo']").attr("contextmenu",lastfieldType);
				  if(exp=="BETWEEN"||exp=="Between"|| exp=="!Between")
				  { 
				  	alert("Between Condition with Field comparision is in allowed");
				  }else if(exp=="DIFF-DAYS"||exp=="DIFF-MONTH")
				  {
					  $(this).nextAll('select').show().val("Select");
					  $(this).nextAll('input:last').show().val("");
					  $(this).nextAll("select[id^='cstmFieldTwo']").attr("contextmenu","D");
				  }
				  else{
// $(this).nextAll("input").hide().val("");
					  $(this).nextAll("select:not(:last)").show().val("Select");
				  }
				  Update_Master("#"+$(this).nextAll("select:first").attr("id")); 
			   }
			}
	    });	
	 // change dpd operation type for custom field rule
	    $(document.body).on('change', 'select[id^="cstmDPDTYPE"]', function()
	    {
	    	var value = $(this[this.selectedIndex]).val();
	    	$(this).nextAll("input").hide().val("");
	    	$(this).nextAll("select").hide().val("Select");
			if(value == "DPD-VALUE")
		    {  $(this).next().show();
		       Exp_Drop_Downs('#'+$(this).next().attr("id")+'',expressions.DPDExpression);
		    }
		   else if(value=="DPD-DATE") 
		    {   $(this).next().show();	 
		   	   Exp_Drop_Downs('#'+$(this).next().attr("id")+'',expressions.DPDDateExpression);	
		    }
	    });	   
	    
	 // select file in criteria panel rule row
	$(document.body).on('change', 'select[id^="cstmOutBaseFile"],select[id^="cstmFileOne"],select[id^="cstmOutCmprFile"],select[id^="cstmFileTwo"],#cstmDfltOutBaseFile,#cstmDfltOutCmprFile', function()
	{ 	
		$("body #custom_error").text("");
		var value = $(this[this.selectedIndex]).val();
		var type = $(this[this.selectedIndex]).attr("title");
		if(value != "Select File" && value != "Select")
		{
		 if($(this).next().attr("id") != undefined)
		  { Update_Rule_Field(value, $(this).next().attr("id"),type); }
		}
	});
	 
	 $(document.body).on('change', 'select[id^="cstmOutBaseField"],#cstmDfltOutBaseField', function()
			 { 
				var value = $(this[this.selectedIndex]).val();
				var id = $(this).attr("id");
				var index = parseInt(id.slice(-1));
				var aggID;
				if(id=="cstmDfltOutBaseField")
				{
					aggID = "#cstmDfltOutAggrOprtr";
				}else{
					aggID = "#cstmOutAggrOprtr"+index;
				}
				$(""+aggID+" option:not(:first)").remove();
				
				if(value != "Select")
					{
					 if(value=="Number"||value=="N")
					 {   $.each(expressions.AggrExpression, function(val, text) 
						 {
				    	   $(""+aggID+"").append('<option value='+text.value+'>'+text.text+'</option>');
						 });
						$(""+aggID+" option:last").prop('disabled', false);
					 }else if(value=="String"||value=="S")
					   {
						 $.each(expressions.AggrExpression, function(val, text) 
					     {
				    	   $(""+aggID+"").append('<option value='+text.value+'>'+text.text+'</option>');
						 });
						 $(""+aggID+" option:not(:last)").prop('disabled', true);				 
					   }else if(value=="Date"||value=="D")
						 {
						    $.each(expressions.AggrDateExpression, function(val, text) 
						     {
					    	   $(""+aggID+"").append('<option value='+text.value+'>'+text.text+'</option>');
							 });
						 }else if(value=="DPD")
						 {
							 $.each(expressions.AggrDPDExpression, function(val, text) 
						     {
					    	   $(""+aggID+"").append('<option value='+text.value+'>'+text.text+'</option>');
							 });
						 }
					    var FileType=$(this).prev().find("option:selected").attr("title");
					    var title = $(this[this.selectedIndex]).attr("title");
					    $(this).attr("role","");
					    ids = $(this).attr("id");
						if(FileType=="ANALYTICAL" && value != "Select" && (title != "undefined" || typeof title != 'undefined'))
						{	$('#MainBlock').css("opacity","0.17");
							$("#anltclRulePanel").show().focus();
							$scope.createAntclRuleStructure(title);
						}
					}
			});
	 // chage output value as per selected agggrigation oprtr
	  $(document.body).on('change', 'select[id^="cstmOutAggrOprtr"], #cstmDfltOutAggrOprtr', function()
	    {
	    	var value = $(this[this.selectedIndex]).val();
			if(value != "Select")
			{  if(value=="MAX-DIFF-MONTH"||value=="MAX-DIFF-DAYS"||value=="MIN-DIFF-MONTH"||value=="MIN-DIFF-DAYS")
				{		  
				  $(this).next().show().val("Select");
				}
			  else
			  {   
			     $(this).nextAll("input").val("").hide();
			     $(this).nextAll("select").val("Select").hide();
			  }
			}
	    });	  
	 
	    // open and change outcome panel for value and field type
	    $(document.body).on('change', 'select[id^="cstmOutType"], #cstmDfltOutType', function()
	    {
	    	if($(this).val() == "Field")
	    		{
	    		$(this).parent().parent().nextAll("#BaseContainer,#AggregationContainer").show();
	    		$(this).parent().parent().nextAll("#valueContainer ").hide();
	    		}
	    	else{
	    		$(this).parent().parent().nextAll("#valueContainer ").show();
	    		$(this).parent().parent().nextAll("#BaseContainer ,#AggregationContainer").hide();
	    	}
	    });	
	    
	    // open comapre field in base field Date or DPD
	    $(document.body).on('change', 'select[id^="cstmOutCType"],#cstmDfltOutCType', function()
	    {
	    	var value = $(this[this.selectedIndex]).val();
	    	var exp = $(this).prev().find("option:selected").val();
	    	$(this).nextAll("input").hide().val("");
	    	$(this).nextAll("select").hide().val("Select");
			if(value != "Select")
			{  
			  if((value == "Value"))
			   { if(exp=="BETWEEN"||exp=="Between"||exp=="!Between"||exp=="!BETWEEN")
				  { 
				    $(this).nextAll('input:not(:last)').show().val("");
				  }else if(exp=="DIFF-DAYS"||exp=="DIFF-MONTH")
				  {
// $(this).nextAll('select:last').show().val("Select");
					  $(this).nextAll('input:first,input:last').show().val("");
				  }else
				  {	   
					 $(this).nextAll('input:first').show().val("");
				  }
			   }
			  else if(value=="Field")
			   { 
				  if(exp=="BETWEEN"||exp=="Between"|| exp=="!Between")
				  { 
				  	alert("Between Condition with Field comparision is in allowed");
				  }else if(exp=="DIFF-DAYS"||exp=="DIFF-MONTH")
				  {
					  $(this).nextAll('select').show().val("Select");
					  $(this).nextAll('input:last').show().val("");
				  }
				  else{
// $(this).nextAll("input").hide().val("");
					  $(this).nextAll("select").show().val("Select");
				  }
				  Update_Master("#"+$(this).nextAll("select:first").attr("id")); 
			   }
			}
	    });	
	    
        $(document.body).on('click',"button.cstmOUTOp", function()
		  {   
			var prevObj = $(this).parent().prev();
			   if(validateAntclField("#"+prevObj.attr("id"),"input,select","custom_error")) 
		        {   
				   	$(this).siblings("button").hide();
					 var dom = $(prevObj).clone();
					 var id=dom.attr("id");
					 dom.addClass("Clone");
					 // console.log("Id ="+id);
					 var count = parseInt(id.slice(-1));
					 $(dom).remove('span[id^="OutOprtr"]');
					 $(prevObj).append('<span class="outopr" id="OutOprtr'+count+'" name='+$(this).attr("value")+'>'+$(this).text()+' <span class="right-braces"></span></span>');
// $(dom).find("span[id^='OUTOp_Value']").attr("id","OUTOp_Value"+count+"");
					 dom.attr("id",id.slice(0,-1)+(++count));
				     $(dom).children("div:not(:first)").remove();
				     var innerDom = $(dom).find(".cstmRow");
				     innerDom.attr("id","0");
		   		     $(dom).find("button.AntclINOp").show();
		   		     $(innerDom).find(".hiden").hide();
		   		     $(innerDom).find("select").val("Select");
		   		     $(innerDom).find("#Oprtr0").remove();
		   		      $('select, input',innerDom).each(function(index,ele)
		   		    	{	id = $(this).attr("id");
		   		    		 $(this).attr("id",id.slice(0,-2)+count+"0");
		   		    		 if(index!=1)
							  {
		   		    			 $(dom).find("#cstmFieldOne"+count+"00 option:not(:first)").remove();
								 $(dom).find("#cstmExp"+count+"00 option:not(:first)").remove();
								 $(dom).find("#cstmFieldTwo"+count+"00 option:not(:first)").remove();
							  }
		   		    		 if($(this).is("input"))
		   		    			 {
		   		    			   $(this).removeAttr("readonly");
		   		    			   $(this).removeAttr("contextmenu");
		   		    			   $(this).removeClass("hasDatepicker");
		   		    			 }
		   		    	});
		   		      $(prevObj).after(dom);
			    }
		});
		
		         $(document.body).on('click',"#addCstmRange", function()
				  {   
					   var prevObj = $(this).parent().prev().prev();
					   if(validateAntclField("#customForm","input,select","custom_error")) 
				        {  					   	
							 var dom = $(prevObj).clone();
							 var id=dom.attr("id");
							 dom.find(".Clone").remove();
							 dom.find(".cstmRow:not(:first)").remove();
							 dom.addClass("Clone");
							 // console.log("Id ="+id);
							 var count = parseInt(id.slice(-1));
							 $(dom).remove('span[id^="OutOprtr"]');
							 $(prevObj).append('<span class="outopr" id="OutOprtr'+count+'" name="OR"> OR <span class="right-braces"></span></span>');
							 dom.attr("id",id.slice(0,-1)+(++count));
						     var innerDom = $(dom).find(".cstmFieldRule");
// innerDom.attr("id","0");
				   		     $(dom).find("button.AntclINOp").show();
				   		     $(dom).find("button.outopr").show();
				   		     $(innerDom).find(".hiden").hide();
				   		     $(innerDom).find("select").val("Select");
				   		     $(innerDom).find('span[id^="OutOprtr"]').remove();
				   		     $(innerDom).find("#Oprtr0").remove();
				   		     var inneroutcome = $(dom).find(".outcomeContainer");
				   		      $('select, input',inneroutcome).each(function(index,ele)
			   		    	  {  id = $(this).attr("id");
			   		    		 $(this).attr("id",id.slice(0,-1)+count);
			   		    	  });
				   		      $('select, input',innerDom).each(function(index,ele)
			   		    	  {  id = $(this).attr("id");
			   		    		 $(this).attr("id",id.slice(0,-3)+count+"0"+"0");
								   $(dom).find("#cstmFieldOne"+count+"00 option:not(:first)").remove();
								   $(dom).find("#cstmExp"+count+"00 option:not(:first)").remove();
								   $(dom).find("#cstmFieldTwo"+count+"00 option:not(:first)").remove();
								   if($(this).is("input"))
			   		    			 {
			   		    			   $(this).removeAttr("readonly");
			   		    			   $(this).removeAttr("contextmenu");
			   		    			   $(this).removeClass("hasDatepicker");
			   		    			 }
			   		    		});
				   		      $(prevObj).after(dom);
				    }
			});
		
		// close cstm field default value
		$scope.closeCstmPanel = function(){
			$("body #addcstmField,#iff_fields_table").show();
			$("body #customFieldPanel, #cstm_field_default").hide();
			$("#customFieldPanel").find(".hiden").hide();
			$("#customFieldPanel").find("span[id^='Oprtr']").remove();
			$("button.AntclINOp, button.cstmOUTOp, #customFieldPanel .cstm_rule_body").show();
			$("#custom_error").text("");
			$("#customFieldPanel .Clone").remove();
			$(".outopr , .right-braces").text("");
			$("#customForm").trigger("reset");
		};
		
		// open only cstm field default value
		$(document.body).on("click","#cstmdfltval",function(){
			$("body .cstm_rule_body,#cstm_field_default").slideToggle();
		});		
		
		// open panel for analytical using analytical
		$(document.body).on('change', 'select[id^="AntclFltrField"],select[id^="AntclRatioField"],select[id^="AntclGrpField"]',function() 
		{
			// check analytical file
			var FileType=$(this).prev().find("option:selected").attr("title");
			var title = $(this[this.selectedIndex]).attr("title");
			var value = $(this[this.selectedIndex]).val();
			ids = $(this).attr("id");
			$(this).attr("role","");
			if(FileType=="ANALYTICAL" && value != "Select" && (title != "undefined" || typeof title != 'undefined'))
			{	$('#MainBlock').css("opacity","0.17");
				$("#anltclRulePanel").slideDown().focus();
				$scope.createAntclRuleStructure(title);
			}	
		});
		
		$(document.body).on("click","#savecstm",function()
		{if(validateAntclField("#customForm","input,select","custom_error"))
		  {	
			var ExpType="",val1="",val2="",fieldIffType="";
			var diff="",fDataType="",field="",displName="",Foprtr="",AFSpecID="";
			var diffoprtr="", defaultValue;
			var rulesmain=[];
			var outComeType = $("#cstmDfltOutType option:selected").val();
			if(outComeType == "Value")
			{ defaultValue={
					 "TYPE":outComeType,
					 "OUTCM_VALUE":replaceComma($("#cstmDfltOutcmValue").val()),
					 "BASE_FIELD":"", "BASE_FNAME":"",
					 "BASE_FTYPE":"","BASE_DTYPE":"", "AGGR_OPRTR":"",
					 "AGGR_TYPE":"",  "COMPR_FIELD":"",
					 "COMPR_FNAME":"", "COMPR_FTYPE":"",
					 "COMPR_VALUE":""								 
					 }
			}else if(outComeType == "Field")
				{
				defaultValue={
						 "TYPE":outComeType,
						 "OUTCM_VALUE":"",
						 "BASE_FIELD":$("#cstmDfltOutBaseFile option:selected").text()+"$"+
						 			  $("#cstmDfltOutBaseField option:selected").attr("title"),
						 "BASE_FNAME":$("#cstmDfltOutBaseField option:selected").text(),
						 "BASE_FTYPE":$("#cstmDfltOutBaseFile option:selected").attr("title"),
						 "BASE_DTYPE":$("#cstmDfltOutBaseField option:selected").val(),
						 "AGGR_OPRTR":$("#cstmDfltOutAggrOprtr option:selected").val(),
						 "AGGR_TYPE":$("#cstmDfltOutCType option:selected").val(),
						 "COMPR_FIELD":$("#cstmDfltOutCmprFile option:selected").text()+"$"+
						 			   $("#cstmDfltOutCmprField option:selected").attr("title"),
						 "COMPR_FNAME":$("#cstmDfltOutCmprField option:selected").text(),
						 "COMPR_FTYPE":$("#cstmDfltOutCmprFile option:selected").attr("title"),
						 "COMPR_VALUE":$("#cstmDfltOutcmValue").val()								 
						 }
				}
			if(((typeof defaultValue.BASE_FTYPE !='undefined') && (defaultValue.BASE_FTYPE!="Select")) || (defaultValue.COMPR_VALUE!=""))
			{ $("#customForm .cstm_rule_body").each(function(Aindex, maine) 
			   { var lavel1rule={"Condition":[]};
			       $(".cstmFieldRule",maine).each(function(Bindex, mainelement) 
					{
			    	   var lavel2rule=[];  
					   var outOprtr = $(this).find("span[id^='OutOprtr']").attr("name");
					   if(typeof outOprtr == 'undefined')									 
					   {   outOprtr = '';}
						$(".cstmRow",mainelement).each(function(index, element) 
						 {
							 ExpType=$(this).find("select[id^='cstmCType'] option:selected").val();
							 if(ExpType =="Value")
							 { if(fDataType=="D"||fDataType=="Date"||fDataType=="DPD")
							   { val1 = $(this).find("input[id^='cstmValue1']").val();
							     val2 = $(this).find("input[id^='cstmValue2']").val();
							     diff =$(this).find("input[id^='cstmCmprValue1']").val();
							     if(diff!="")
							     {  diffoprtr=$(this).find("select[id^='cstmCmprExp'] option:selected").val();}
							   }else{
								   val1 = $(this).find("input[id^='cstmValue1']").val();
								   val2 = $(this).find("input[id^='cstmValue2']").val();
							   }
							 }else if(ExpType == "Field")
							 { if(fDataType=="D"||fDataType=="Date"||fDataType=="DPD")
							   { val1 = $(this).find("select[id^='cstmFileTwo'] option:selected").text()+"$"+
								 	  $(this).find("select[id^='cstmFieldTwo'] option:selected").attr("title");
								 val2 = "";
								 diff =$(this).find("input[id^='cstmCmprValue1']").val();
								 if(diff!="")
							     {  diffoprtr=$(this).find("select[id^='cstmCmprExp'] option:selected").val();}
							   }else{
								 val1 = $(this).find("select[id^='cstmFileTwo'] option:selected").text()+"$"+
								 	  $(this).find("select[id^='cstmFieldTwo'] option:selected").attr("title");
								 val2 = "";
// diff="";
							   }
							 }else{
								 ExpType="Value";
								 val1 = $(this).find("input[id^='cstmValue1']").val();
								 val2 = $(this).find("input[id^='cstmValue2']").val();
								 if(fDataType=="DPD")
								 { diff =$(this).find("input[id^='cstmCmprValue1']").val();
							       if(diff!="")
							       {  diffoprtr=$(this).find("select[id^='cstmCmprExp'] option:selected").val();}
								 }
							 }
						     exp = $(this).find("select[id^='cstmExp'] option:selected").val();
						     fDataType=$(this).find("select[id^='cstmExp']").attr("title");
						     
						     field= $(this).find("select[id^='cstmFileOne'] :selected").text()+"$"+
						     		$(this).find("select[id^='cstmFieldOne'] option:selected").attr("title");
						     displName=$(this).find("select[id^='cstmFieldOne'] :selected").text();
						     fieldIffType=$(this).find("select[id^='cstmFileOne'] option:selected").attr("title");
						     Foprtr= $(this).find("span[id^='Oprtr']").attr("name");
						     AFSpecID=$(this).find("select[id^='cstmFieldOne']").attr("role");
							 if((val1=="" && val2=="") && displName=="Select Field")
							  {  return false; }
						     // console.log(val1+" : "+val2+" : "+exp+" :
								// "+displName+" : "+field+" : "+fDataType+" :
								// "+fieldIffType+" : "+Foprtr+" : "+ExpType);
						     var lavel3rule = createMatrixJson(val1,val2,exp,field,displName,fDataType,fieldIffType,AFSpecID,Foprtr,ExpType);
						     $.extend(lavel3rule,{"Difference":diff,"DiffOpr":diffoprtr});
						    if(index==0)
							 {  $.extend(lavel3rule, {"outOperator":outOprtr,"ref":[]});
							 	lavel2rule=lavel3rule;
							 }else{
								lavel2rule.ref.push(lavel3rule);
							 }
						 });
						if(lavel2rule.fieldname != "Select Field")
						{ lavel1rule.Condition.push(lavel2rule); }			       		
					});	
			         if(lavel1rule.Condition.length > 0)
			         {   var tempOutCType = $(this).find("select[id^='cstmOutType'] option:selected").val();
						if(tempOutCType == "Value")
						{       outcome={"TYPE":tempOutCType,
								 "OUTCM_VALUE":replaceComma($(this).find("input[id^='cstmOutcmValue']").val()),
								 "BASE_FIELD":"", "BASE_FNAME":"",
								 "BASE_FTYPE":"","BASE_DTYPE":"", "AGGR_OPRTR":"",
								 "AGGR_TYPE":"", "COMPR_FIELD":"",
								 "COMPR_FNAME":"", "COMPR_FTYPE":"",
								 "COMPR_VALUE":""								 
								 };
						}else if(tempOutCType=="Field")
							{ var aggrType = $(this).find("select[id^='cstmOutCType'] option:selected").val();
							  var comprFld="", comprFn="", comprFt="", comprVl="";
								if(aggrType == "Field")
								{ comprFld=$(this).find("select[id^='cstmOutCmprFile'] option:selected").text()+"$"+
						 			       $(this).find("select[id^='cstmOutCmprField'] option:selected").attr("title");
								  comprFn=$(this).find("select[id^='cstmOutCmprField'] option:selected").text();
								  comprFt=$(this).find("select[id^='cstmOutCmprFile'] option:selected").attr("title");
								  comprVl="";									
								}else if(aggrType == "Value")
								{
									  comprFld="";
									  comprFn="";
									  comprFt="";
									  comprVl=$(this).find("input[id^='AnltclOutCmprValue']").val();
								}
							  outcome={"TYPE":tempOutCType,
										 "OUTCM_VALUE":$(this).find("input[id^='cstmOutcmValue']").val(),
										 "BASE_FIELD":$(this).find("select[id^='cstmOutBaseFile'] option:selected").text()+"$"+
										 			  $(this).find("select[id^='cstmOutBaseField'] option:selected").attr("title"),
										 "BASE_FNAME":$(this).find("select[id^='cstmOutBaseField'] option:selected").text(),
										 "BASE_FTYPE":$(this).find("select[id^='cstmOutBaseFile'] option:selected").attr("title"),
										 "BASE_DTYPE":$(this).find("select[id^='cstmOutBaseField'] option:selected").val(),
										 "AGGR_OPRTR":$(this).find("select[id^='cstmOutAggrOprtr'] option:selected").val(),
										 "AGGR_TYPE": aggrType,
										 "COMPR_FIELD": comprFld,
										 "COMPR_FNAME": comprFn,
										 "COMPR_FTYPE": comprFt,
										 "COMPR_VALUE":	comprVl							 
										 };
							}
						$.extend(lavel1rule,{"Outcome":outcome});
						rulesmain.push(lavel1rule);
			         }
			   });
			 	   var finalRule ={"FileID":$scope.IffFileID,"FIELD_NAME":$scope.cstmName.toString().replace(/ /g ,"_"),"DISPLAY_NAME":$scope.cstmName.toString().replace(/ /g ,"_"),
			 			   "FIELD_TYPE":$("#cstmDataType option:selected").val(),"LEVEL":$("#CstmLavel").find(".active").text(),
			 			   "RULES":rulesmain,"DEFAULT_VALUE":defaultValue,"OCCURENCE":1,"createdby":$scope.username};
			       // console.log(JSON.stringify(finalRule));
			       $scope.closeCstmPanel();
			       $http({ method : 'POST',
						url : APP_CONST.getConst('BASE_URL_SCORE')+'CustomFields',
						params:{'INSTITUTION_ID':currentUser.institutionID,'CType':'AddField'},
						data:finalRule,
						headers : {'Content-Type' : 'application/json'}
					 }).success(function(data) 
					 { $('#T_LoaderSpinner').hide(1000);
					   $scope.error = ""; 
						if(data.StatusCode === 101 && data.Data != null)
						{
						  // console.log("Rsponse: "+JSON.stringify(data));
						  $scope.IffFieldList.push(data.Data);
				 		}
					 }).error(function(data)
						{ $('#T_LoaderSpinner').hide(1000);
						  console.log("We could not process your request......Please try later.");
						});		
		   }else{
			   $("#custom_error").text("Please Define Default Value for this field");
			   $("#cstmdfltval").focus();
			   $("body .cstm_rule_body,#cstm_field_default").slideToggle();
			   return;
		   }
		  }
		});
		
// -------------elgblty functions start---------------
		$(document.body).on('click',"#addElgbltyRange", function()
		  {   
			   var prevObj = $(this).parent().prev();
			   if(validateAntclField("#elgbltyPnlForm","input,select","elgblty_error")) 
		        {  					   	
					 var dom = $(prevObj).clone();
					 var id=dom.attr("id");
					 dom.find(".Clone").remove();
					 dom.find(".cstmRow:not(:first)").remove();
					 dom.addClass("Clone");
					 // console.log("Id ="+id);
					 var count = parseInt(id.slice(-1));
					 $(dom).remove('span[id^="OutOprtr"]');
					 $(prevObj).append('<span class="outopr" id="OutOprtr'+count+'" name="OR"> OR <span class="right-braces"></span></span>');
					 dom.attr("id",id.slice(0,-1)+(++count));
				     var innerDom = $(dom).find(".elgbltyFieldRule");
// innerDom.attr("id","0");
		   		     $(dom).find("button.AntclINOp").show();
		   		     $(dom).find("button.outopr").show();
		   		     $(innerDom).find(".hiden").hide();
		   		     $(innerDom).find("select").val("Select");
		   		     $(innerDom).find('span[id^="OutOprtr"]').remove();
		   		     $(innerDom).find("#Oprtr0").remove();
		   		     var inneroutcome = $(dom).find(".outcomeContainer");
		   		      $('select, input',inneroutcome).each(function(index,ele)
	   		    	  {  id = $(this).attr("id");
	   		    		 $(this).attr("id",id.slice(0,-1)+count);
	   		    		 if($(this).is("input"))
	   		    			 {
	   		    			   $(this).val("");
	   		    			 }
	   		    	  });
		   		      inneroutcome.find("button[id^='compute']").attr("Disabled","disabeld");
		   		      $('select, input',innerDom).each(function(index,ele)
	   		    	  {  id = $(this).attr("id");
	   		    		 $(this).attr("id",id.slice(0,-3)+count+"0"+"0");
					     if($(this).is("input"))
   		    			 {
   		    			   $(this).removeAttr("readonly");
   		    			   $(this).removeAttr("contextmenu");
   		    			   $(this).removeClass("hasDatepicker");
   		    			 }
	   		    		});
		   		   $(dom).find("#elgbltyFieldOne"+count+"00 option:not(:first)").remove();
				   $(dom).find("#elgbltyExp"+count+"00 option:not(:first)").remove();
				   $(dom).find("#elgbltyFieldTwo"+count+"00 option:not(:first)").remove();
				   $(dom).find("select[id^='elgbltyFileOne'], select[id^='elgbltyFieldOne']").show();
		  	       $(dom).find("#FieldObj").remove();
		  	       $(dom).find("select[id^='elgbltyExp']").val("Select");
		  	       $(dom).find("input, select").css("border-color","#CCC");
		   		      $(prevObj).after(dom);
				    }
			});
		
		$(document.body).on('click',"#copyElgbltyRange", function()
				  {   
					   var prevObj = $(this).parent().prev();
					   if(validateAntclField("#elgbltyPnlForm","input,select","elgblty_error")) 
				        {  					   	
							 var dom = $(prevObj).clone();
							 var id=dom.attr("id");
//							 dom.find(".Clone").remove();
//							 dom.find(".cstmRow:not(:first)").remove();
							 dom.addClass("Clone");
							 // console.log("Id ="+id);
							 var count = parseInt(id.slice(-1));
//							 $(dom).remove('span[id^="OutOprtr"]');
//							 $(prevObj).append('<span class="outopr" id="OutOprtr'+count+'" name="OR"> OR <span class="right-braces"></span></span>');
							 dom.attr("id",id.slice(0,-1)+(++count));
						     var innerDom = $(dom).find(".elgbltyFieldRule");
		// innerDom.attr("id","0");
//				   		     $(dom).find("button.AntclINOp").show();
//				   		     $(dom).find("button.outopr").show();
//				   		     $(innerDom).find(".hiden").hide();
//				   		     $(innerDom).find("select").val("Select");
//				   		     $(innerDom).find('span[id^="OutOprtr"]').remove();
//				   		     $(innerDom).find("#Oprtr0").remove();
				   		     var inneroutcome = $(dom).find(".outcomeContainer");
				   		      $('select, input',inneroutcome).each(function(index,ele)
			   		    	  {  id = $(this).attr("id");
			   		    		 $(this).attr("id",id.slice(0,-1)+count);
//			   		    		 if($(this).is("input"))
//			   		    			 {
//			   		    			   $(this).val("");
//			   		    			 }
			   		    	  });
//				   		      inneroutcome.find("button[id^='compute']").attr("Disabled","disabeld");
				   		      $('select, input',innerDom).each(function(index,ele)
			   		    	  {  id = $(this).attr("id");
			   		    		 $(this).attr("id",id.slice(0,-3)+count+"0"+"0");
//							     if($(this).is("input"))
//		   		    			 {
//		   		    			   $(this).removeAttr("readonly");
//		   		    			   $(this).removeAttr("contextmenu");
//		   		    			   $(this).removeClass("hasDatepicker");
//		   		    			 }
			   		    		});
				   		   var $originalSelects = $(prevObj).find('select');
				   		   var $newSelects = $(dom).find("select");
//				   		   $(dom).find("#elgbltyFieldOne"+count+"00 option:not(:first)").remove();
//						   $(dom).find("#elgbltyExp"+count+"00 option:not(:first)").remove();
//						   $(dom).find("#elgbltyFieldTwo"+count+"00 option:not(:first)").remove();
//						   $(dom).find("select[id^='elgbltyFileOne'], select[id^='elgbltyFieldOne']").show();
//				  	       $(dom).find("#FieldObj").remove();
//				  	       $(dom).find("select[id^='elgbltyExp']").val("Select");
//				  	       $(dom).find("input, select").css("border-color","#CCC");
				   		      $(prevObj).after(dom);
				   		      $(dom).find('select').each(function(index, item) 
			   		    		  { console.log($originalSelects.eq(index).attr("id")+" : "+$originalSelects.eq(index).val());
			   		    		   var id = $(item).attr("id");
			   		    		   if(id.match("^elgbltyFieldOne"))
			   		    	         $(item).find("option[title='"+$originalSelects.eq(index).find("option:selected").attr("title")+"']").attr("selected","selected");
			   		    		   else
			   		    			 $(item).val($originalSelects.eq(index).val());  
			   		    		  });
						    }
					});
		
			// add new field rule body
		        $(document.body).on('click',"button.elgbltyOUTOp", function()
				  {   
		        	var id=$scope.createOuterBlockElgblty($(this));
		           $(document.body).find(id).find("select[id^='elgbltyFileOne'], select[id^='elgbltyFieldOne']").show();
		  	       $(document.body).find(id).find("#FieldObj").remove();
		  	       $(document.body).find(id).find("select[id^='elgbltyExp']").val("Select");
		  	       $(document.body).find(id).find("input, select").css("border-color","#CCC");
				});
		        
		        $scope.createOuterBlockElgblty= function(element)
		        {	var prevObj = $(element).parent().prev();
					   if(validateAntclField("#"+prevObj.attr("id"),"input,select","elgblty_error")) 
				        {   
						   	$(element).siblings("button").hide();
							 var dom = $(prevObj).clone();
							 var id=dom.attr("id");
							 dom.find(".Clone").remove();
							 dom.find(".cstmRow:not(:first)").remove();
							 dom.addClass("Clone");
							 // console.log("Id ="+id);
							 var count = parseInt(id.slice(-1));
							 $(dom).remove('span[id^="OutOprtr"]');
							 $(prevObj).append('<span class="outopr" id="OutOprtr'+count+'" name='+$(element).attr("value")+'>'+$(element).text()+' <span class="right-braces"></span></span>');
// $(dom).find("span[id^='OUTOp_Value']").attr("id","OUTOp_Value"+count+"");
							 dom.attr("id",id.slice(0,-1)+(++count));
						     $(dom).children("div:not(:first)").remove();
						     var innerDom = $(dom).find(".elgbltyRow");
						     innerDom.attr("id","0");
				   		     $(dom).find("button.AntclINOp").show();
				   		     $(innerDom).find(".hiden").hide();
				   		     $(innerDom).find("select").val("Select");
				   		     $(innerDom).find("#Oprtr0").remove();
				   		      $('select, input',innerDom).each(function(index,ele)
				   		    	{	id = $(this).attr("id");
				   		    		 $(this).attr("id",id.slice(0,-2)+count+"0");
				   		    		   $(dom).find("#elgbltyField"+count+"0 option:not(:first)").remove();
									   $(dom).find("#elgbltyExp"+count+"0 option:not(:first)").remove();
				   		    		/*
									 * if($(this).is("input")) {
									 * $(this).removeAttr("readonly");
									 * $(this).removeAttr("contextmenu");
									 * $(this).removeClass("hasDatepicker");
									 * if($(this).is("input")) {
									 * $(this).removeAttr("readonly");
									 * $(this).removeAttr("contextmenu");
									 * $(this).removeClass("hasDatepicker"); } }
									 */
				   		    	});
				   		      $(prevObj).after(dom);
				   		      return dom;
					    }
		        }
		
		// change field in custom field rule panel
		 $(document.body).on('change', 'select[id^="elgbltyFieldOne"]', function()
		 { $("#elgblty_error").text("");
			var value = $(this[this.selectedIndex]).val();
		   var id = "#"+$(this).nextAll("select[id^='elgbltyExp']").attr("id");
		   $(id).attr("title",value);
		   var parent = $(this).parent();
		   $(this).nextAll("input").removeAttr("readonly contextmenu").removeClass("hasDatepicker").attr("placeholder","Enter value");
		   $("div[id^='ui-datepicker-div']").remove();
		   var valId1 = "#"+$(this).nextAll("input[id^='elgbltyValue1']").attr("id");
		   var valId2 = "#"+$(this).nextAll("input[id^='elgbltyValue1']").attr("id");
		   $(this).nextAll(".hiden").hide();
		   if(value!="Select")
		   { if((value === 'Number') || (value === 'N'))
		     {   parent.find(valId1,valId2).attr("contextmenu","Number");
			     Exp_Drop_Downs(id,expressions.NumberExpression);
		   		} else if((value === 'String') || (value === 'S'))
		   		    {
		   			 parent.find(valId1,valId2).attr("contextmenu","String");
		   			 Exp_Drop_Downs(id,expressions.StringExpression);				   			
		   		    } else if((value === 'Boolean') || (value === 'B'))
		   		        {
		   		    	 Exp_Drop_Downs(id,expressions.BooleanExpression);				   			
		   		        } else if((value === 'Date') || (value === 'D'))
		   		           {
		   		        	Exp_Drop_Downs(id,expressions.DateExpression);
		   		        	parent.find(valId1,valId2).datepicker({changeMonth: true, changeYear: true, 
		   		            	yearRange: "1900:2016",dateFormat: 'dd:mm:yy',defaultDate:(new Date(new Date()).getDate())}).attr({'readonly':'readonly','placeholder':'Enter Date'});
		   		           }else if((value === 'DPD') || (value === 'Dpd'))
		   		           {
		   		        	parent.find("select[id^='elgbltyDPDTYPE']").show();
		   		        	parent.find("select[id^='elgbltyExp']").hide();
			   		       }
		    var FileType=$(this).prev().find("option:selected").attr("title");
		    var title = $(this[this.selectedIndex]).attr("title");
		    $(this).attr("role","");
		    ids = $(this).attr("id");
			if(FileType=="ANALYTICAL" && value != "Select" && (title != "undefined" || typeof title != 'undefined'))
			{	$('#MainBlock').css("opacity","0.17");
				$("#anltclRulePanel").slideDown().focus();
				$scope.createAntclRuleStructure(title);
			}
		   }
		 });
		 // expression change for custom field rule panel
		    $(document.body).on('change', 'select[id^="elgbltyExp"]', function()
		    {	$("#elgblty_error").text("");
		    	var value = $(this[this.selectedIndex]).val();
		    	var type = $(this).attr("title");
		    	$(this).nextAll("input").val("").removeAttr("readonly contextmenu").removeClass("hasDatepicker");
		    	$(this).nextAll("select").val("Select").removeAttr("contextmenu");
		    	$(this).nextAll(".hiden").hide();
				if(value != "Select" && value != "null")
				{  if(type =="D"||type=="Date")
					{ if(value=="IS-NULL"||value=="IS-NOT-NULL"){
					  }
					 else{ 
					  $(this).next().show();}
					}else if(type =="DPD" || type=="Dpd")
					{ if(value=="DIFF-MONTH" || value=="DIFF-DAYS")
					  { $(this).nextAll("input:last").show(); }
					 else if(value=="BEFORE" || value=="AFTER") 
					  { $(this).nextAll("input:first").show().datepicker({changeMonth: true, changeYear: true, 
				            	yearRange: "1900:2016",dateFormat: 'dd:mm:yy',defaultDate:(new Date(new Date()).getDate())})
				            	.attr({'readonly':'readonly','placeholder':'Enter Date'});}
					 else 
					  { $(this).nextAll("input:first").show().attr("contextmenu","Number");}
					}
				   else if((value == "Between") || (value == "! Between"))
				    { $(this).nextAll('input:not(:last)').show().val(""); }
				    else
				    { $(this).next().next().show().val("");
// $(this).next().next().next().slideUp().val("");
				    }
				}
		    });	
		    // open comapre field in base field Date or DPD
		    $(document.body).on('change', 'select[id^="elgbltyCType"]', function()
		    {
		    	var value = $(this[this.selectedIndex]).val();
		    	var exp = $(this).prev().find("option:selected").val();
		    	$(this).nextAll("input").hide().val("").removeAttr("contextmenu");
		    	$(this).nextAll("select").hide().val("Select").removeAttr("contextmenu");
				if(value != "Select")
				{  
				  if((value == "Value"))
				   { if(exp=="BETWEEN"||exp=="Between"||exp=="!Between"||exp=="!BETWEEN")
					  { 
					    $(this).nextAll('input:not(:last)').show().val("");
					  }else if(exp=="DIFF-DAYS"||exp=="DIFF-MONTH")
					  {
// $(this).nextAll('select:last').show().val("Select");
						  $(this).nextAll('input:first,input:last').show().val("");
					  }else
					  {	   
						 $(this).nextAll('input:first').show().val("");
					  }
				   }
				  else if(value=="Field")
				   { 
					  if(exp=="BETWEEN"||exp=="Between"|| exp=="!Between")
					  { 
					  	alert("Between Condition with Field comparision is in allowed");
					  }else if(exp=="DIFF-DAYS"||exp=="DIFF-MONTH")
					  {
						  $(this).nextAll('select').show().val("Select");
						  $(this).nextAll('input:last').show().val("");
						  $(this).nextAll("select[id^='elgbltyFieldTwo']").attr("contextmenu","D");
					  }
					  else{
// $(this).nextAll("input").hide().val("");
						  $(this).nextAll("select:not(:last)").show().val("Select");
					  }
					  Update_Master("#"+$(this).nextAll("select:first").attr("id")); 
				   }
				}
		    });	
		 // change dpd operation type for custom field rule
		    $(document.body).on('change', 'select[id^="elgbltyDPDTYPE"]', function()
		    {
		    	var value = $(this[this.selectedIndex]).val();
		    	$(this).nextAll("input").hide().val("");
		    	$(this).nextAll("select").hide().val("Select");
				if(value == "DPD-VALUE")
			    {  $(this).next().show();
			       Exp_Drop_Downs('#'+$(this).next().attr("id")+'',expressions.DPDExpression);
			    }
			   else if(value=="DPD-DATE") 
			    {   $(this).next().show();	 
			   	   Exp_Drop_Downs('#'+$(this).next().attr("id")+'',expressions.DPDDateExpression);	
			    }
		    });	   
		    
		 // select file in criteria panel rule row
		$(document.body).on('change', 'select[id^="elgbltyFileOne"],select[id^="elgbltyFileTwo"],select[id^="cmptFile"]', function()
		{ 	
			$("#elgblty_error").text("");
			var value = $(this[this.selectedIndex]).val();
			var type = $(this[this.selectedIndex]).attr("title");
			if(value != "Select File" || value != "Select")
			{
			 if($(this).next().attr("id") != undefined)
			  { Update_Rule_Field(value, $(this).next().attr("id"),type); }
			}
		});	
		 
		$scope.closeElgbltyPanel=function()
		{	 $("#elgblty_error").text("");			
			 $("#elgbltyPnlForm").trigger("reset");	
			 $("#elegbltyPanel,#elegbltyPanel .hiden, #elegbltyPanel #remarkDiv").hide(); 
			 $("#ElgbltyDisplay,.outapprv, #elgbltyPnlForm button, #elgbltyFieldOne000,#elgbltyFileOne000").show();
			 $("#elegbltyPanel input").val("").css("border-color","#CCC");
			 $("#elegbltyPanel select").val("Select").css("border-color","#CCC");
			 $(".Clone, span[id^='OutOprtr'], span[id^='Oprtr']").remove();
			 $scope.dcsnList=[];
			 $("select[id^='elgbltyFieldOne'] option:not(:first), select[id^='elgbltyExp'] option:not(:first)").remove();
			 $("button[id^='compute']").attr("disabled","disabled").css("opacity","0.4");
			 $("div[id^='ui-datepicker-div']").remove();
			 FDataTypesUpdtd=[];
			 $scope.ElgbltyPanel={};
		 };	
		
		 $(document.body).on("click","button[id^='compute']",function()
		 {
			 ids = $(this);
			 $("#prvwContainer,#resultContainer").text("");
			 $("#computePanel input").val("");
			 $('#MainBlock').css("opacity","0.17");
			 $("#computePanel").show().focus(); 
			 $("#prvwContainer").text(ids.parent().find("input[id^='Dispformula']").val());
			 $scope.formula2=ids.parent().find("input[id^='formula']").val();
			
		 });
		 
		 $("#closeComputePanel").click(function(){		
			  $("#computePanel").slideUp(); 
			  $('#MainBlock').css("opacity","1");
			  $("#prvwContainer,#resultContainer").text("");
			  $("#computeForm").trigger("reset");
			  rangecount=0;
			  ids="";
			  $scope.formula2=[];
		 });
		
		 $("#saveCompute").click(function(){
		   $scope.validateExpression();		
		   if( $("#computeError").text() != "Expression Syntex is not correct.")
				 {
				 inputValues=[]; 
			  $("#computePanel").slideUp(); 
			  $('#MainBlock').css("opacity","1");
			  ids.parent().find("input[id^='Dispformula']").val($("#prvwContainer").text());
			  ids.parent().find("input[id^='formula']").val($scope.formula2);
			  ids="";
			  $scope.formula2=[];
			  $("#prvwContainer,#resultContainer").text("");
			  rangecount=0;
			   $("#computeError").text("");
				 }
		 });
		 
		 $("#clearCompute").click(function(){
		  inputValues=[];
			 $("#prvwContainer,#resultContainer,#computeError").text("");
			 $("#computePanel input").val(""); 
			 rangecount=0;
			 $scope.formula2=[];
		 });
		 
		 $scope.ElgbltyPanel={};
		 // open eligibility panel to add smry details
		 $scope.openElgbltyPanel=function(type,mode)
		 { 
		   $scope.ElgbltyPanel.save=true;
		   if(type=="GRID")
		   { $scope.ElgbltyPanel.AddGrid=true; }
		   else if(type=="SMRY")
		   { if($scope.Eligibility.AGRTD_VALUES && $scope.Eligibility.AGRTD_VALUES.length != 0 && mode!="EDIT")
			 { alert("You have Already defined Summary level rules for this Eligibility");
	    	   return false;
			 } 
		     else
		     {
		    	 $scope.ElgbltyPanel.AddSmry=true;   
		     }
		   }
			 $("#ElgbltyDisplay").hide();
			 $("#elegbltyPanel").show().focus(); 
		 };
		 
		 $(document.body).on('change', 'select[id^="cmptField"]', function()
				 { 
			    	var value = $(this[this.selectedIndex]).text();
				 	buildFormula(value,"VARIABLE");
				 });
		
		 $(document.body).on('focusout', 'input[id^="cmptValue"]', function(e)
				 {  var value = $(this).val();	 	
				 	buildFormula(value,"CONSTANT");	 
				 }); 

		
		 var formula2 =[];  // For iff Files $ IFF Fields
		 function buildFormula(val,type)
		 {	    inputValues = [];
		 		$scope.formula2 =[];  // For iff Files $ IFF Fields
				var error=false;
			    $(' select, input ,span',"#resultContainer").each(function(index,ele)
		   		  {   			
	    			var name= $(this).attr("name");
   		    		var type=$(this).prop('nodeName');
   		    		 if(type=="SELECT" && name !="IFF File")
   		    			 {   		    			 	
   		    			 	var sVal =$(this[this.selectedIndex]).val()
   		    			 	if(sVal == "Select")
	    			 		{	error=true;
   		    			 		return false;	
	    			 		}
   		    			 	else
	    			 		{
   		    			 	var id=$(this).prev('select').attr("id");
   		    			 	// console.log("ID="+id);
   		    			 	var val=$("#"+id+" :selected").text() +'$'+ $(this[this.selectedIndex]).attr("title");
   		    			 	$scope.formula2.push(val);
	    			 	    inputValues.push($(this[this.selectedIndex]).text());
	    			 		}
   		    			 }
	   		    		 else if(type == "SPAN" &&  name !="variable")
	   		    			 {
	   		    			 	$scope.formula2.push($(this).text());
	   		    			 	inputValues.push($(this).text());
	   		    			 }
	   		    		else if(type == "INPUT")
  		    			 {
	   		    			$scope.formula2.push($(this).val());
	   		    			inputValues.push($(this).val());
  		    			 }
	   		    	  });
			    if(error != true)
			    	{
			    	 $scope.formula2=$scope.formula2.join(" ");
			    	 $scope.formula2 = "( "+$scope.formula2+" )";
				     inputValues = inputValues.join(" "); 
				     $("#prvwContainer").text("( "+inputValues+" )");
			    	}
			    // console.log("array="+$scope.formula2);
		 }
		 
 $scope.validateExpression =function()
	{
		var text = $("#prvwContainer").text();
		text = text.split(" ");
		var bracketCount=0;
		var prev,curr,next,error=false;
		for(var i=0 ;i<text.length;i++ )
		{	var curr =text[i] ;
				next=text[i+1]
			if(text[i] == "(")
			{  bracketCount++;
				if(!/^[(+*/-]/.test(prev) && i != "0")
				{
					$("#computeError").fadeIn(1000).text("Please Append Operator before Open bracket");
				 error = true;
				 break;
				}					
			}else if(text[i] == ")")
			{bracketCount--;
			if(/^[(+*/-]/.test(prev))
			{
				$("#computeError").fadeIn(1000).text("Please Append Operand before Closing bracket");
			 error = true;
			 break;
			}					
			}
			else if(/^[A-Z0-9]/.test(text[i]) && /^[A-Z0-9]/.test(prev) )
			{	error = true;
				break;
				$("#computeError").fadeIn(1000).text("Please Use Operator Between two Operand");
			}
			else if((/^[+*/-]/.test(curr) && !(/^[A-Z0-9]/.test(prev) && /^[A-Z0-9(]/.test(next)) ) )
			{	
				$("#computeError").fadeIn(1000).text("Please use operator  between two operand");
				error = true;
				break;
			}
			prev = text[i];
		}
		if(bracketCount == 0 && error == false)
		{
// alert("Expression Syntex is OK.");
			$("#computeError").fadeIn(1000).text("Expression Syntex is OK.");
			bracketCount=0;
		}
		else
		{	
			error = false;
// alert("Expression Syntex is not correct.");
			$("#computeError").fadeIn(1000).text("Expression Syntex is not correct."); // For
																						// Bracket
																						// balancing
		}
	}
		 
	 $(document.body).on("click","#evaluateEXP",function()
		{			 
			$scope.validateExpression();
		});
		 
		 // enable disable compute button in elegibilty
			$(document.body).on("change","select[id^='elgbltyOutcome']",function()
			 {  $("#elgblty_error").text("");
				var value = $(this[this.selectedIndex]).val();
				var div = $(this).parent().parent().parent();
				div.find("button[id^='compute']").attr("disabled","disabeld").css("opacity","0.4");
				div.find("#remarkDiv").find("input").val("");
			 	div.find(".outapprv").find("input").val("");
				if(value=="Approved")
				 {
				    div.find("button[id^='compute']").removeAttr("disabled").css("opacity","1");
				 	div.find("#remarkDiv").hide();
				 	div.find(".outapprv").show();
				 }
			 	else if(value=="Queue" || value=="Declined")
		 		{				 				
			 		div.find("#remarkDiv").show();
			 		div.find(".outapprv").hide();
		 		}			 		
			 });

		$(document.body).on("click","#decisionPrty",function(){
			if($(this).hasClass("glyphicon-plus"))
			{ $("#dcsn_panel").show();
			  $("#decisionPrty ,#closeDcsn ").toggleClass("glyphicon-plus glyphicon-minus");
			}else
				{
				  $("#dcsn_panel").hide();
				  $("#decisionPrty ,#closeDcsn ").toggleClass("glyphicon-plus glyphicon-minus");
				}
		});
//		delete decision priority from elgblty
		$scope.removeDcsnPrty=function(value)
		{
			$scope.dcsnList = $.grep($scope.dcsnList, function(e) { return e.value != value});
		};
		/*$(document.body).on("click","#addElgSumRule",function(){
			$(this).hide();
			$(".lavel2ValueRow,#dcsnContainer,#rmvElgSumRule").show();
		});*/
		/*$(document.body).on("click","#rmvElgSumRule",function(){
			$(".lavel2ValueRow,#dcsnContainer,#rmvElgSumRule").hide();
			$("#addElgSumRule").show();
		});*/
//		$(document.body).on("click","#closeDcsn",function(){
//			$("#dcsn_panel").hide();
//			$("#decisionPrty ,#closeDcsn").toggleClass("glyphicon-plus glyphicon-minus");
//		});
		
//		add decision priority in elgblty summary outcome
		$scope.dcsnList=[];
		$("#add-Decision").click(function(){
			var value = $("#decision_list").val();
			error=false;
			if(value != "Select")
			{
				for(var obj in $scope.dcsnList)
				{ if(obj.value == value)
					{ 	alert("This Decision has already Added").show();
						error = true;
						break;
					}
				}
				if(error != true)
				{ 	$scope.dcsnList.push({"name":value, 'value':value});
					$scope.$apply();
					$("#dcsn_panel").hide();
					$("#decisionPrty ,#closeDcsn").toggleClass("glyphicon-minus glyphicon-plus");
				}
			}else{
// $("#perror").text("Please select Product Type").show();
				alert("Please Select Decision");
			}
			$("#perror").slideUp(2000);
		});
		
		$("#variable").click(function(){
			var val=inputValues[inputValues.length-1];
			if(/^[A-Z0-9]/.test(val))
				{
				  $("#computeError").text("Please Select Operator first...");
				}
			else
				{
				$("#computeError").text("");
		 	var domstr = '<span name ="variable" id="variable'+rangecount+'">';
				domstr = domstr+'<select class="form-control equal IffDrpDwn" id="cmptFile'+rangecount+'" name="IFF File">';
				domstr = domstr+'<option value="Select" selected="selected">Select File</option></select>';
				domstr = domstr+'<select class="form-control equal" id="cmptField'+rangecount+'" name="IFF Field" contextmenu="N">';
				domstr = domstr+'<option value="Select" selected="selected">Select Field</option></select></span>';
				$("#resultContainer").append(domstr);
				Update_Master("#cmptFile"+rangecount);
				rangecount=rangecount+1;
				}
				
		});
		 var inputValues = [];
		$("#constant").click(function(){
			var val=inputValues[inputValues.length-1];
			if(/^[A-Z0-9]/.test(val))
			{
			  $("#computeError").text("Please Select Operator first...");
			}
			else
			{ 
				$("#computeError").text("");
				var domstr='<input class="form-control inline equal" id="cmptValue'+rangecount+'" name="Constant Value" style="margin:5px">';
			  $("#resultContainer").append(domstr);
			  rangecount=rangecount+1;
			}
		});
		
		$(".comma").click(function(){var text = $(this).text();
		var val=inputValues[inputValues.length-1];
		if( text == "(" && !/^[(+*/-]/.test(val) && val != undefined)
		{
		  $("#computeError").text("Please Select Operator first...");
		}
		else if(text == ")")
		{	var count=0;
			for(i in inputValues)
			{if(inputValues[i] == "(")
			  { count++; }
			 else if(inputValues[i] == ")")
			  {	count--; }
			}			
			
			if(count != 0)
			{	
				$("#computeError").text("");
				var domstr='<span id="cmptComma'+rangecount+'" style="padding:5px 10px;font-weight:bold;">'+$(this).text()+'</span>';
				$("#resultContainer").append(domstr);
				rangecount=rangecount+1;
				buildFormula($(this).text(),"COMMA");
			}
			else
			{ $("#computeError").text("Please open a bracket first..."); }
		}
		else
		 {
			$("#computeError").text("");
			var domstr='<span id="cmptComma'+rangecount+'" style="padding:5px 10px;font-weight:bold;">'+$(this).text()+'</span>';
			$("#resultContainer").append(domstr);
			rangecount=rangecount+1;
			buildFormula($(this).text(),"COMMA");
		}});

		$("#ObjectExp").change(function(){
			var val=inputValues[inputValues.length-1];
			if(!/^[)A-Z0-9]/.test(val))
			{	$("#computeError").text("Please Select Operand first...");	}
			else
			{  var text =$(this[this.selectedIndex]).text()
			 if(text != "Select")
			 {	var domstr='<span id="cmptOprtr'+rangecount+'" style="padding:5px 10px;font-weight:bold;">'+$(this[this.selectedIndex]).val()+'</span>';
				$("#resultContainer").append(domstr);
				rangecount=rangecount+1;
				buildFormula($(this[this.selectedIndex]).val(),"OPRTR");
			 }
		  }
		});
		
		
		// load eligibility in details
		$scope.Load_Elgblty = function(id, type)
		{  
			var url=APP_CONST.getConst('BASE_URL_SCORE')+"Eligibility";
			if(type === 'edit')
			{ 
				$scope.ViewMode = false;
				displayEligibility(id);
// $("#openelgblty").show();
			}else if(type === 'delete')
			{	var data = {'ID':id};
				$scope.deleteObject(url,data,"ELGBLTY");
			}
			else if(type === 'approve')
			{
				var data = {'ID':id,'updatedby':$scope.username,'status':'Approved'};
				$scope.updateStatus(url,data,"ELGBLTY");
			}else if(type === 'view')
			{
				$scope.ViewMode = true;
				displayEligibility(id);
			}else 
			{   /*$('#TableError').text("You are not authorised for this action")
				.css("color","red").slideDown().delay(2000).slideUp();*/
				var data = {'ID':id,'updatedby':$scope.username,'status':'Disabled'};
				$scope.updateStatus(url,data,"ELGBLTY");
			}
		}
		$scope.ElgbltyGridRules=[];
		// common function for display elegibitly in details
		function displayEligibility(fileID)
		{   $('#T_LoaderSpinner').show();
			$scope.ElgbltyID = fileID;
			$scope.Table = "Eligibility ID : "+fileID;
			$scope.Eligibility={"RULES":"","AGRTD_VALUES":"","DEC_PRRTY":""};
			$('#elgbltyTables').hide(); 
			$('#ElgbltyDisplay').show();
			for(var obj in $scope.ElgbltyList)
			{ if(obj.ElgbltyID==$scope.ElgbltyID)
				{	
				   $scope.Eligibility.AGRTD_VALUES = obj.AGRTD_VALUES;
				   $scope.Eligibility.DEC_PRRTY = obj.DEC_PRRTY;
				   break;
				}			 
			}
			$http({
				method : 'POST',url : APP_CONST.getConst('BASE_URL_SCORE')+"Eligibility",
				params : {'INSTITUTION_ID':currentUser.institutionID,'CType':"FindOne","ElgbltyID":$scope.ElgbltyID},
				headers : {'Content-Type' : 'application/json'}
			  }).success(function(data) 
				{ 	console.log("inside : "+JSON.stringify(data));
				  if(data.StatusCode == 101 && data.Data!=null)
				  { $scope.Eligibility.RULES=data.Data;
				  }
				  $('#T_LoaderSpinner').hide(3000);	
				}).error(function(data)
				{ console.log("We could not process your request......Please try later.");
				  $('#T_LoaderSpinner').hide();
				});
//			console.log(JSON.stringify($scope.Eligibility));
		}
		// create new elgblty and save to DB
		$scope.SaveElgblty = function()
		{ $('#T_LoaderSpinner').show();
		 try{
			var data = {'name':this.ElgbltyName,'createdby':$scope.username};
			$http({
				method : 'POST',url : APP_CONST.getConst('BASE_URL_SCORE')+"Eligibility",
				params : {'INSTITUTION_ID':currentUser.institutionID,'CType':"AddElgblty"},
				data : data,
				headers : {'Content-Type' : 'application/json'}
			  }).success(function(data) 
				{ 	
				  if(data.StatusCode == 101 && data.Data!=null)
				  { $scope.ElgbltyList.push(data.Data);
				  }
				  // console.log("Eglgblty : "+JSON.stringify(data));
				  $('#T_LoaderSpinner').hide(1000);	
				}).error(function(data)
				{ console.log("We could not process your request......Please try later.");
				  $('#T_LoaderSpinner').hide();
				});
			this.ElgbltyName="";
		 }catch(e)
		 {
			 console.log("Exceptoin : "+e);
		 }
		}
		
		// get all elgblty list from server
		$scope.getElgbltyList = function()
		{  $('#T_LoaderSpinner').show();	
		  $http({
				method : 'POST',url : APP_CONST.getConst('BASE_URL_SCORE')+"Eligibility",
				params : {'INSTITUTION_ID':currentUser.institutionID,'CType':"FindAll"},
				headers : {'Content-Type' : 'application/json'}
			  }).success(function(data) 
				{ 	
				  if(data.StatusCode == 101 && data.Data!=null)
				  { $scope.ElgbltyList=data.Data;
				  }else
				  { $scope.ElgbltyList=[]; }
				  $('#T_LoaderSpinner').hide(1000);	
				}).error(function(data)
				{ console.log("We could not process your request......Please try later.");
				  $('#T_LoaderSpinner').hide();
				});
		}
		
		
		$scope.saveElgbltyRules=function(actionMode)
		{  if(validateAntclField("#elgbltyPnlForm","input,select","elgblty_error"))
			{	$("#elgblty_error").text("");
			    $('#T_LoaderSpinner').show();
					var ExpType="",val1="",val2="",fieldIffType="";
					var diff="",fDataType="",fieldname="",displayname="",Foprtr="",AFSpecID="";
					var diffoprtr="";
					var rulesmain=[];
					// if($scope.dcsnList.length<3)
					// {
					// $("#elgblty_error").text("Please define Decision Priority Sequence");
					// }else
					// {
						$("#elgbltyPnlForm .elgbltyBody:visible").each(function(Aindex, maine) 
					    {   var lavel1rule={"ElgbltyID":$scope.ElgbltyID,"Condition":[],"Outcome":""};
					       $(".elgbltyFieldRule:visible",maine).each(function(Bindex, mainelement) 
							{
					    	   var lavel2rule=[];  
							   var outOprtr = $(this).find("span[id^='OutOprtr']").attr("name");
							   if(typeof outOprtr == 'undefined')									 
							   {   outOprtr = '';}
								$(".elgbltyRow",mainelement).each(function(index, element) 
								 {  
									fieldname = $(element).find("#FieldObj").attr("name");
								 	displayname = $(element).find("#FieldObj").text();
								    if(typeof fieldname == 'undefined' || fieldname == "") 
								    	{ fieldname= $(this).find("select[id^='elgbltyFileOne'] :selected").text()+"$"+
								     		$(this).find("select[id^='elgbltyFieldOne'] option:selected").attr("title");
								    	}
									  if(typeof displayname == 'undefined' || displayname == "") 
								       {  displayname= $(this).find("select[id^='elgbltyFieldOne'] :selected").text();
								       }
									  fDataType = $(this).find("select[id^='elgbltyFieldOne'] option:selected").val();
									  if(typeof fDataType == 'undefined' || fDataType == ""||fDataType == "Select")
									   {  fDataType = FDataTypesUpdtd[0]; 
									      FDataTypesUpdtd.splice(0,1);
									   }
									
								     field = $(element).find('select[id^="ExpType"] option:selected').val();
								     fieldIffType = $(this).find("select[id^='elgbltyFileOne'] option:selected").attr("title");
								    if(typeof fieldIffType == 'undefined' || fieldIffType == undefined)
								    	{
								    	 fieldIffType = $(element).find("#FieldObj").attr("role");
								    	}
								    AFSpecID=$(this).find("select[id^='elgbltyFieldOne']").attr("role");
								    if(typeof AFSpecID == 'undefined' || AFSpecID == undefined)
								    	{
								    	  AFSpecID="";
								    	}
								    
									 ExpType=$(this).find("select[id^='elgbltyCType'] option:selected").val();
									 if(ExpType =="Value")
									 { if(fDataType=="D"||fDataType=="Date")
									   { val1 = $(this).find("input[id^='elgbltyValue1']").val();
									     val2 = $(this).find("input[id^='elgbltyValue2']").val();
									     diff =$(this).find("input[id^='elgbltyCmprValue1']").val();
									     if(diff!="")
									     {  diffoprtr=$(this).find("select[id^='elgbltyCmprExp'] option:selected").val();}
									   }else{
										   val1 = $(this).find("input[id^='elgbltyValue1']").val();
										   val2 = $(this).find("input[id^='elgbltyValue2']").val();
// diff="";
									   }
									 }else if(ExpType == "Field")
									 { if(fDataType=="D"||fDataType=="Date")
									   { val1 = $(this).find("select[id^='elgbltyFileTwo'] option:selected").text()+"$"+
										 	  $(this).find("select[id^='elgbltyFieldTwo'] option:selected").attr("title");
										 val2 = "";
										 diff =$(this).find("input[id^='elgbltyCmprValue1']").val();
										 if(diff!="")
									     {  diffoprtr=$(this).find("select[id^='elgbltyCmprExp'] option:selected").val();}
									   }else{
										 val1 = $(this).find("select[id^='elgbltyFileTwo'] option:selected").text()+"$"+
										 	  $(this).find("select[id^='elgbltyFieldTwo'] option:selected").attr("title");
										 val2 = "";
// diff="";
									   }
									 }else{
										 ExpType="Value";
										 val1 = $(this).find("input[id^='elgbltyValue1']").val();
										 val2 = $(this).find("input[id^='elgbltyValue2']").val();
									 }
								     exp = $(this).find("select[id^='elgbltyExp'] option:selected").val();
// fDataType=$(this).find("select[id^='elgbltyExp']").attr("title");
								     
// fieldIffType=$(this).find("select[id^='elgbltyFileOne']
// option:selected").attr("title");
								     Foprtr= $(this).find("span[id^='Oprtr']").attr("name");
// AFSpecID=$(this).find("select[id^='elgbltyFieldOne']").attr("role");
									 
								     // console.log(val1+" : "+val2+" :
										// "+exp+" : "+displName+" :
										// "+fieldname+" : "+fDataType+" :
										// "+fieldIffType+" : "+Foprtr+" :
										// "+ExpType);
								     var lavel3rule = createMatrixJson(val1,val2,exp,fieldname,displayname,fDataType,fieldIffType,AFSpecID,Foprtr,ExpType);
								     $.extend(lavel3rule,{"Difference":diff,"DiffOpr":diffoprtr});
								    if(index==0)
									 {  $.extend(lavel3rule, {"outOperator":outOprtr,"ref":[]});
									 	lavel2rule=lavel3rule;
									 }else{
										lavel2rule.ref.push(lavel3rule);
									 }
								 });
								lavel1rule.Condition.push(lavel2rule);			       		
							});			       
								outcome={"DECISION":$(this).find("select[id^='elgbltyOutcome'] option:selected").val(),
										 "COMPUTE_DISP":$(this).find("input[id^='Dispformula']").val(),
										 "COMPUTE_LOGIC":$(this).find("input[id^='formula']").val(),
										 "MAX_AMOUNT":replaceComma($(this).find("input[id^='maxAmount']").val()),
										 "MIN_AMOUNT":replaceComma($(this).find("input[id^='minAmount']").val()),
										 "DP":replaceComma($(this).find("input[id^='dpAmount']").val()),
										 "MAX_TENOR":replaceComma($(this).find("input[id^='maxTenor']").val()),
										 "REMARK":$(this).find("input[id^='remark']").val()								 
										 };
								lavel1rule.Outcome=outcome;								
								rulesmain.push(lavel1rule);
					   });
					       var decprrtylist=[];
					       for(obj in $scope.dcsnList)
					       {
					    	   decprrtylist.push(obj.value);
					       }
					       var finalValues=[];					     
					       $("#elgbltyPnlForm .lavel2ValueRow:visible").each(function(index,element) 
						   { var value=$(this).attr("name");					       
					         var data={ "FIELD_NAME":$(this).attr("name"),
					        		   "DISP_NAME":$(this).attr("title"),
					        		   "AGGRTN":$(this).find("select[id^='aggrFinal'] option:selected").val(),
									   "MAX":replaceComma($(this).find("input[id^='maxFinal']").val()),
									   "MIN":replaceComma($(this).find("input[id^='minFinal']").val())								 
									 };
					         finalValues.push(data);
						   });
					       var finalJson={"ElgbltyID":$scope.ElgbltyID,"RULES":rulesmain,
					    		          "AGRTD_VALUES":finalValues,"DEC_PRRTY":decprrtylist,
					    		          "GridID":$scope.elgblGridID}
//					       console.log(JSON.stringify(finalJson));
					       $scope.closeElgbltyPanel();
// $scope.Eligibility=finalJson;
					       var calltype="";
					       if(actionMode=="Save")
					    	   {
					    	    calltype="AddElgRule";
					    	   }else if(actionMode=="Update")
					    		   {					    		    
					    		    calltype="updateGrid";
					    		   }
					       $http({ method : 'POST',
								url : APP_CONST.getConst('BASE_URL_SCORE')+'Eligibility',
								params:{'INSTITUTION_ID':currentUser.institutionID,'CType':calltype,"ElgbltyID":$scope.ElgbltyID},
								data:finalJson,
								headers : {'Content-Type' : 'application/json'}
							 }).success(function(data) 
							 { $('#T_LoaderSpinner').hide(1000);
							   $scope.error = ""; 
								if(data.StatusCode === 101 && data.Data != null)
								{ if(actionMode=="Save")
						    	  {   if(data.Data.RULES.length!=0)
										{ for(var obj in data.Data.RULES)
											{
											 $scope.Eligibility.RULES.push(obj);										
											}
										}
									  if(data.Data.AGRTD_VALUES.length!=0)
									  { 
										  $scope.Eligibility.AGRTD_VALUES=data.Data.AGRTD_VALUES; 
									  }
									  if(data.Data.DEC_PRRTY.length!=0)
									  {  
										  $scope.Eligibility.DEC_PRRTY=data.Data.DEC_PRRTY;
									  }
						    	  }else if(actionMode=="Update")
					    		   {  if(data.Data.RULES.length!=0)
										{ for(var i=0;i<$scope.Eligibility.RULES.length;i++)
										   {
											  if($scope.Eligibility.RULES[i].GridID==data.Data.GridID)
												  {
												   $scope.Eligibility.RULES[i]=data.Data.RULES[0];
//												   $.extend($scope.Eligibility.RULES[i],{"_id":data.Data._id});
												  }
										   }
										}
					    		   }
						 		}
//								console.log(JSON.stringify(data));
							 }).error(function(data)
							{ $('#T_LoaderSpinner').hide(1000);
							  console.log("We could not process your request......Please try later.");
							});		
					 }
// }
				}
// edit fucntion for eligibility
		$scope.editElgbltyGrid=function(gridID)
		{  $("#ElgbltyDisplay").hide();
		   $("#elegbltyPanel").show().focus();
		   $scope.ElgbltyPanel.update=true;
		   $scope.ElgbltyPanel.AddGrid=true;
		  /* $timeout(function(){
			   $scope.ElgbltyPanel.update=true; 
			   $scope.ElgbltyPanel.AddGrid=true;
		   })*/
		   $timeout(function(){
		   $scope.elgblGridID=gridID;
			  for(var obj in $scope.Eligibility.RULES)
				 {
				 if(obj.GridID == gridID)
					 {try
					 {					
					   for(var v=0; v<obj.Condition.length; v++)
						{ var t=v-1;  
						 if(v != 0)
						  { 
						    $scope.createOuterBlockElgblty($("#elegbltyPanel #elgbltyBody0").find("button.elgbltyOUTOp[value='"+obj.Condition[0].outOperator+"']"));
		// 				    $scope.createInnerBlock($("#add-criteria-panel").find("button.AntclINOp[value='"+obj.Condition[0].operator+"'][class='INOperator']"));
						  }
						 	var div = $("#elegbltyPanel #elgbltyRule"+v+"").find("#0:visible");
						 	$(div).find("#elgbltyExp0"+v+"0 option, #FieldObj").remove();
						 	getConditionOperator(obj.Condition[v].exp1,obj.Condition[v].exp2,"#elgbltyExp0"+v+"0",obj.Condition[v].DType);
						 	$(div).find("#elgbltyFileOne0"+v+"0").hide().after("<span id='FieldObj' class='equal Clone' name='"+obj.Condition[v].fieldname+"'>"+obj.Condition[v].displayname+"</span>");
						 	$(div).find("#elgbltyFieldOne0"+v+"0").attr("role",obj.Condition[v].AFSpec).hide();
						 	if(obj.Condition[v].DType=="D"||obj.Condition[v].DType=="Date")
						 	{  if(obj.Condition[v].exp2!="IS-NULL"||obj.Condition[v].exp2!="IS-NOT-NULL")
						 	   {  
						 		$(div).find("#elgbltyCType0"+v+"0").val(obj.Condition[v].ExpType).show();
						 	   }
						 	}
						 	$(div).find("#FieldObj").attr("role",obj.Condition[v].FType);
						 	if(obj.Condition[v].val1 && obj.Condition[v].val2)
							 	{$(div).find("#elgbltyValue10"+v+"0").val(obj.Condition[v].val1).show();
						 		 $(div).find("#elgbltyValue20"+v+"0").val(obj.Condition[v].val2).show();}
						 	else if(obj.Condition[v].val1)
						 		{$(div).find("#elgbltyValue10"+v+"0").val(obj.Condition[v].val1).show();}
						 	else if(obj.Condition[v].val2)
						 		{$(div).find("#elgbltyValue10"+v+"0").val(obj.Condition[v].val2).show();}
						 	for(var h=0; h< obj.Condition[v].ref.length; h++)
						 		{   var m=h+1;
						 			$scope.createInnerBlock($("#elegbltyPanel #elgbltyRule"+v).find("button.AntclINOp[value='"+obj.Condition[v].operator+"']"));
						 	
							 		var div = $("#elegbltyPanel #elgbltyRule"+v+"").find("#"+m+":visible");
								 	$(div).find("#elgbltyExp0"+v+""+m+" option, #FieldObj").remove();
								 	getConditionOperator(obj.Condition[v].ref[h].exp1,obj.Condition[v].ref[h].exp2,"#elgbltyExp0"+v+""+m,obj.Condition[v].ref[h].DType);
								 	$(div).find("#elgbltyFileOne0"+v+""+m).hide().after("<span id='FieldObj' class='equal Clone' name='"+obj.Condition[v].ref[h].fieldname+"'>"+obj.Condition[v].ref[h].displayname+"</span>");
								 	$(div).find("#elgbltyFieldOne0"+v+""+m).attr("role",obj.Condition[v].ref[h].AFSpec).hide();
								 	if(obj.Condition[v].ref[h].DType=="D"||obj.Condition[v].ref[h].DType=="Date")
								 	{  if(obj.Condition[v].ref[h].exp2!="IS-NULL"||obj.Condition[v].ref[h].exp2!="IS-NOT-NULL")
								 	   {  
								 		$(div).find("#elgbltyCType0"+v+"0").val(obj.Condition[v].ref[h].ExpType).show();
								 	   }
								 	}
								 	$(div).find("#FieldObj").attr("role",obj.Condition[v].ref[h].FType);
								 	if(obj.Condition[v].ref[h].val1 && obj.Condition[v].ref[h].val2)
									 	{$(div).find("#elgbltyValue10"+v+""+m).val(obj.Condition[v].ref[h].val1).show();
								 		 $(div).find("#elgbltyValue20"+v+""+m).val(obj.Condition[v].ref[h].val2).show();}
								 	else if(obj.Condition[v].ref[h].val1)
								 		{$(div).find("#elgbltyValue10"+v+""+m).val(obj.Condition[v].ref[h].val1).show();}
								 	else if(obj.Condition[v].ref[h].val2)
								 		{$(div).find("#elgbltyValue10"+v+""+m).val(obj.Condition[v].ref[h].val2).show();}
						 		}
						 }
					 if(typeof obj.Outcome != "undefined")
					 {   var container=$("#elegbltyPanel").find("#elgbltyBody0 .outcomeContainer");
					     container.find("#elgbltyOutcome0").val(obj.Outcome.DECISION);
						 if(obj.Outcome.DECISION=="Approved")
						 {  container.find("#compute0").removeAttr("disabled").css("opacity","1"); 						 
						 	container.find(".outapprv").show();
						 	container.find("#formula0").val(obj.Outcome.COMPUTE_LOGIC);
						   	container.find("#Dispformula0").val(obj.Outcome.COMPUTE_DISP);
						   	container.find("#maxAmount0").val(obj.Outcome.MAX_AMOUNT);
						   	container.find("#minAmount0").val(obj.Outcome.MIN_AMOUNT);
						   	container.find("#dpAmount0").val(obj.Outcome.DP);
						   	container.find("#maxTenor0").val(obj.Outcome.MAX_TENOR);
						 }else
						 {  
							 container.find("#remarkDiv").show();
							 container.find("#compute0").attr("disabled","disabled").css("opacity","0.40"); 
						 	container.find(".outapprv").hide();
						 	container.find("#remark0").val(obj.Outcome.REMARK);
						 }
					 }
					 
					 }catch(e)
					 {	console.log(e);
					    $scope.closeElgbltyPanel();
					    console.log("sorry  due to an internal server error /n we are not able to process your request.");
						break;
					 }
					 break;
					 }
				 }
		   });
		}
		
// delete eligibility grid rules
		 $scope.deleteElgbltyGrid = function(gridID,callType)
		 {
			$('#T_LoaderSpinner').show();
			$("#confirm-title, #delete, #Approve").removeClass("btn-success").addClass("btn-danger");
			$("#confirm-msg").text("This item will not be recovered after succesfully deleted.");
			$("#delete, #Approve").text("Delete").attr("id","delete");
			$('#confirm').modal({ backdrop: 'static', keyboard: false }).one('click', '#delete', function (e) 
		    {if(gridID!="" || gridID!=undefined) 
		      {	$http({ method : 'POST',
					url : APP_CONST.getConst('BASE_URL_SCORE')+'Eligibility',
					params:{'INSTITUTION_ID':currentUser.institutionID,'ElgbltyID':$scope.ElgbltyID,'CType':callType},
					data:gridID,
					headers : {'Content-Type' : 'application/json'}
				}).success(function(data) 
				 { $('#T_LoaderSpinner').hide(1000);
				   $scope.error = ""; 
					if(data.StatusCode === 101)
					{  if(callType=="DeleteGrid")
						{
						  $scope.Eligibility.RULES = $.grep($scope.Eligibility.RULES, function(e) { return e.GridID != data.Data});
						}else if(callType=="DeleteSmry")
							{
							 $scope.Eligibility.AGRTD_VALUES=[];
							 $scope.Eligibility.DEC_PRRTY=[];
							}
			 		 }else{
			 			$scope.error = "Your Rule has not been deleted"; 
			 		 }
				 }).error(function(data)
					{$('#T_LoaderSpinner').hide(1000);
					 console.log("We could not process your request......Please try later.");
					});	
		      }else
		    	  {
		    	    console.log("We could not process your request......Please try later.");
		    	  }
		    });
		 }
//		edit eligibility summary output and decision priority
		 $scope.editElgbltySmry=function()
		 {	
//			$scope.ElgbltyPanel.update=true;
//		 	$scope.ElgbltyPanel.save=false;
			 $scope.openElgbltyPanel("SMRY","EDIT");
			 $timeout(function()
			 {
			 $("#elgbltyPnlForm .lavel2ValueRow:visible").each(function(index,element) 
			   {
				 for(var obj in $scope.Eligibility.AGRTD_VALUES)
				 {
				  if(obj.FIELD_NAME==$(element).attr("name"))
					  {
					  $(element).find("select[id^='aggrFinal']").val(obj.AGGRTN);
					  $(element).find("input[id^='maxFinal']").val(obj.MAX);
					  $(element).find("input[id^='minFinal']").val(obj.MIN);
					   break;
					  }
				 }
			   });
			  for(var obj in $scope.Eligibility.DEC_PRRTY)
			  {
			   $scope.dcsnList.push({"name":obj, 'value':obj});
			  }
			});
		 }
		 
//		 replace commma from all values
		function replaceComma(val)
		{
			return val.toString().replace(/,/g ,"");
		}
		
//		 replace commma from all values
		function replaceSelectUndefined(val)
		{
			if(val == undefined || typeof val == 'undefined' || val=="Select" || val.startsWith("Select"))
				{
				  return "";
				}
		}
		
//		get expression operator for existing in edit mode elgblty
		$scope.getExpression=function(value)
		{   
			if(value=="N" || value=="Number")
				{
				   return expressions["NumberExpression"];
				}else if(value=="S" || value=="String")
				{
					return expressions["StringExpression"];				
				}else if(value=="D" || value=="Date")
				{
					return expressions["DateExpression"];
				}else if(value=="B" || value=="Boolean")
				{
					return expressions["BooleanExpression"];
				}else if(value=="DPD" || value=="DPD")
				{
					return expressions["DPDExpression"];
				}
		}
		
		$scope.uploadtempElgblty=function()
		{
			$http.get("./JSON/elgblty.json").success(function(data){
//				var object = JSON.parse(data);
				var object = data[2];
				for(var obj in object.RULES)
				 {
				   $.extend(obj,{"ElgbltyID":object.ElgbltyID});
				 }
			  var finalJson={"ElgbltyID":object.ElgbltyID,"RULES":object.RULES,
   		          			"AGRTD_VALUES":object.AGRTD_VALUES,"DEC_PRRTY":object.DEC_PRRTY};
		      $http({ method : 'POST',
					url : APP_CONST.getConst('BASE_URL_SCORE')+'Eligibility',
					params:{'INSTITUTION_ID':4019,'CType':"AddElgRule","ElgbltyID":object.ElgbltyID},
					data:finalJson,
					headers : {'Content-Type' : 'application/json'}
				 }).success(function(response) 
				 {  $('#T_LoaderSpinner').hide(1000);
				 }).error(function(data)
					{ $('#T_LoaderSpinner').hide(1000);
					  console.log("We could not process your request......Please try later.");
					});
			});
		}

			 	/* dob popup for error datepicker not found */		
		$scope.openDOBDialog=function(){
	 		var defaultDate = new Date();
	 		defaultDate.setFullYear(defaultDate.getFullYear()-25);
	 		$scope.dob = defaultDate;
			$scope.dobPopup.opened = true;			
		};
		$scope.dobFormat = "dd/MM/yyyy";
	 	$scope.dobPopup = {
		    opened: false
	  	};

		var minDa = new Date();
			minDa.setFullYear(minDa.getFullYear()-100);

		var maxDa = new Date();
		maxDa.setFullYear(maxDa.getFullYear()-18);
		//alert($filter('date')(maxDa,"dd:MM:yyyy"));

		$scope.dateOptions = {		    
		    formatYear: 'yyyy',
		    showWeeks:false,
		    maxDate: maxDa,
		    minDate: minDa,
		    startingDay: 1
		};
		/* End of dob popup */
}]);

}).call(this)