;(function(){

	'use strict';

	angular.module('gonogo').controller("DMIApplicationController",function(
		$scope,$rootScope,$q,$http,$timeout,cfpLoadingBar,Validation,URLService) {
//	*************************************************** Service URL  *****************************************************

//	var baseUrl = "http://gng.softcell.in/GoNoGoV4/";

	var baseUrl = URLService.url();
	
	$scope.pacm ="Select";
	$scope.prmntAcm="Select";
	$scope.gender ="Select";
	$scope.relegion="Select";
	$scope.edu=	"Select";
	$scope.Marital="Select";
	$scope.acTyp="Select";
	$scope.slryCrdt="true";
	$scope.LnOwnrShp="Select";
	$scope.LnType="Select";
	$scope.oblgt="Select";
	$scope.pStayYr="Select";
	$scope.pStayMt="Select";
	$scope.prmStayYr="Select";
	$scope.prmStayMt="Select";
	$scope.paymentMode="Cash";
    $scope.lnNtIncm="";
    $scope.lnBsc="";
    $scope.lnDa='';
    $scope.lnHra="";
    $scope.lnCca="";
    $scope.lnInsntv="";
    $scope.otherIncm="";
    $scope.lnOSrc="";
    $scope.lnPf="";
    $scope.lnPtax="";
   	$scope.lnLic="";
   	$scope.lnEsi="";
    $scope.lnDdction="";
    $scope.llmnth="";
    $scope.lnOblgtn="";
    $scope.lnAmount="";
    $scope.emiAmount="";
    $scope.lnTnr = "";
    $scope.lnEmi ="";
    $scope.dbtEMI="";
    $scope.mntnAmt="";
    $scope.lnAvl="";
    
    $scope.incm1="";
    $scope.incm2="";
    $scope.incm3="";
    
    $scope.ntPrft1="";
    $scope.ntPrft2="";
    $scope.ntPrft3="";
    
    $scope.trnOvr1="";
    $scope.trnOvr2="";
    $scope.trnOvr3="";
    
    $scope.itr="";
    $scope.itr2="";
    $scope.itr3="";
    
    $scope.add2 ="";
    $scope.prmRent="";
    $scope.rent="";
    $scope.avlDoc ="Yes"
    $rootScope.template="DMIApplication";
    $scope.addPrf="Present Residence Address";
    $scope.PermanentPrf="Select Address Proof";
	var top=$(window).height()-$(".header").height()-$(".footer").height();
	var containerHeight=top-160;
	
	$("input, select").attr("autocomplete", "off");
	$("#progressDiv").css("height",containerHeight-60);
	$(".getheight").scrollTop(0);
//	console.log("Institution ID="+$scope.InstitutionID+"user Id")
//	console.log("Footer top="+top);
	var progress = $("#progress").shieldProgressBar(
			{	min : 0,max : 60, value : 60,
				layout : "circular",
				layoutOptions : {
					circular : {width : 8,borderWidth : 1,color : "rgb(36,161,237)"},
				},
				text : {
					enabled : true,
					template : '<span style="font-size:60px;color:rgb(36,161,237);text-align :center">{0:n0}</span><p style="color:rgb(36,161,237);margin-top:-10px;">SECONDS</p>'
				},
				reversed : true
			}).swidget();
	//set last and llast month from date
	var myDate = new Date();
	$scope.lastmonth = myDate.setMonth(myDate.getMonth() - 1);
	$scope.last_lastmonth = myDate.setMonth(myDate.getMonth() - 1);
	var timer = null, startTime = null;
	//save function at submit button
	function start_timer() {
		$('#timer_box').show();
		clearInterval(timer);
		startTime = Date.now();
		timer = setInterval(updateProgress, 100);
	};
	function stop_timer() {						
		$rootScope.counter = -1;
//		progress.value(0);
		clearInterval(timer);
//		$('#timer_box').hide();
	};

	function updateProgress() {
		var remaining = 60 - (Date.now() - startTime) / 1000;
		$rootScope.counter = Math.floor(remaining);
		progress.value(remaining);
		if (remaining <= 0){
			clearInterval(timer);								
			return 0;
		}
	}

	var lastD = new Date();
	var year = lastD.getFullYear() - 18;
//	lastD.setFullYear(year);
//	console.log("Last Date="+lastD);
	$(document.body).find('#dob1').datepicker({changeMonth: true, changeYear: true, yearRange: "1945:1997", dateFormat: 'dd:mm:yy',
		 defaultDate:new Date("1985,01,01"),
		 onSelect: function(dateText,inst){
			 $(this).next().focus();
		    }		
	});
	
	$(document.body).on("focus",".dtClndr",function(){
		$(this).datepicker({changeMonth: true, changeYear: true, yearRange: '1945:' + new Date().getFullYear(), dateFormat: 'dd:mm:yy',
			 defaultDate:new Date("1985,01,01"),
			 onSelect: function(dateText,inst){
				 $(this).next().focus();
			    }		
		});
	});

	
	function refreshPLst()
	{
		$("#KYCList , #personalList , #employmentList , #IncomeList , #BankingList ,#ProductList ,#CalculationList ,#OtherList").removeClass("active");
		$("#KYCList").addClass("active");
	}

	$scope.getOTP=function(mobile)
	{/*
		//			otpContainer();
		$("#errorHeading").text("OTP CODE");
		$("#main_error").text("Please enter last 5 digits of missed call number...")
			$scope.otpMSG="Please enter last 5 digits of missed call number."
				$http({
					method : 'GET',
					url : 'https://www.cognalys.com/api/v1/otp/',
					params:{'app_id':'930264afe4d046f082856d5','access_token':'c99b526c43c6b6f141e059c2d5e81e79529700cc','mobile':"91"+mobile},
					headers :{'Content-Type' : 'application/json'}
				}).success(function(Response){
//					console.log("Response from otp ="+JSON.stringify(Response));
					if(Response.status=="success")
					{
						//console.log(JSON.stringify(Response));
						// $scope.verifyMobile(Response.keymatch);
						$scope.keymatch = Response.keymatch;
						$scope.otp = Response.otp_start.slice(-6);		
					}else if(Response.status == "failed")
					{ 	$scope.otpMSG="Default OTP for your GoNoGo application is '11111' ";
						$("#errorHeading").text("OTP CODE");
						$("#main_error").text("Default OTP for your GoNoGo application is '11111'")
					}
				}).error(function(erro){
					console.log("Getting Error from OTP Service!");
					$("#errorHeading").text("OTP CODE");
					$("#main_error").text("Default OTP for your GoNoGo application is '11111'")
				});
	*/}
	
$(document.body).on("click","div[id^=Applicant]",function()
{ 
	var id=$(this).attr("id");
//	console.log("ID="+id);
	$("#coApplicantArray").show();
	$("fieldset").hide();
	$("fieldset").css({"transform":"initial","opacity":"initial"});
	var option=id.slice(-1);
//	console.log("option="+option);
	$scope.isAvailable(option);
});	
	
$scope.isAvailable =function(option)
{
	var id ="#coApp"+option;
	var length =$(id).children().length;
	$(id).show();
	$(id).siblings().hide();
	if(length == 0)
	{
		$scope.createClone(option);
		$(id).show();
	}
	else if(length == 2)
	{
		$("#employmentList , #IncomeList , #BankingList ,#ProductList ,#CalculationList ,#OtherList").hide();
		$(id).find("fieldset[id^=kyccontainer]").show();
	}
	else if(length == 5)
	{
		$("#ProductList ,#CalculationList ,#OtherList").hide();
		$("#employmentList , #IncomeList , #BankingList").show(); 
		$(id).find("fieldset[id^=kyccontainer]").show();
	}
	refreshPLst();

}

$scope.createClone=function(option)
{		
			//	console.log("Hello")
		var otrDom="<div id='coApp"+option+"' style='display: none;'></div>";
		$("#coApplicantArray").append(otrDom);	
		var innrDom = "";
		innrDom = $("#kyccontainer,#personalInfo").clone();
		$("fieldset").hide();
		$('div',innrDom).each(function(index,ele)
		{
//			console.log("Hello")
			id = $(this).attr("id");
			if($(this).attr("class") == "getheight" ||$(this).attr("class") == "row clearfix getheight")
			{	
//				console.log("ID="+$(this).attr(id))
//				console.log("Class="+$(this).attr("class"))
				$(this).css({"overflow-x":"hiden","overflow-y":"auto"});
			}
		});
		var dom='<div class="row clearfix customRow"><div class="col-md-5 customDiv" ><label  > Co-Applicant Earning</label></div><div class="col-md-7"><select class="form-control customSelect" id="coAppEarning" style="padding: 2px;height: 26px; "><option selected="selected" value="No"> No</option><option value="Yes">Yes </option></select><i class="fa fa-angle-down customarrow" style="font-size: 21px"></i></div></div>';
		var id ="#coApp"+option;
		$(id).prepend(innrDom);
		$(id).children("#kyccontainer ,#personalInfo").css({"transform":"initial","opacity":"initial"});
		$(id).find("#kycDataContainer").prepend(dom);
		var cid	= $(id).find("button:last").text("Submit").addClass("submit");
		$("#employmentList , #IncomeList , #BankingList ,#ProductList ,#CalculationList ,#OtherList").hide();
		var dlength =$("#coApp"+option+"").children().length;
		$('fieldset',id).each(function(index,ele)
				{
					tid = $(this).attr("id");
					tid=tid+option;
					$(this).attr("id",tid);
				});
		$('input,select',id).each(function(index,ele)
				{
					id = $(this).attr("id");
					id=id+option;
					$(this).attr("id",id);
				});
		var id ="#coApp"+option;
		$(id).find("fieldset[id^=kyccontainer]").show();
}

$(document.body).on('change',"select[id^=coAppEarning]",function()
		{
			var val = $(this).val();
			var id = $(this).parents('fieldset').parent().attr("id");
			var option=id.slice(-1);
			var tid="#coApp"+option+"";
			if(val =="Yes")
				{
				var fieldsets = $(tid).find($("fieldset"));
//				console.log("Total Fieldset="+fieldsets.length);
//				console.log("tid ="+tid);
				if(fieldsets.length == 2)
				{
				$(tid).find("button:last").text("next").removeClass("submit");
				var innrDom =$("#employmentContainer , #incomeContainer , #bankingInfo").clone();
				$(tid).children("fieldset").css({"transform":"initial","opacity":"initial"});
				$("#employmentList , #IncomeList , #BankingList").show();
				$('div',innrDom).each(function(index,ele)
				{
					if($(this).attr("class") == "row clearfix getheight")
					{	
						$(this).css({"overflow-x":"hiden","overflow-y":"auto"});
					}
				});
//				console.log("ID="+$("#coApp1").find("fieldset :last").parents("fieldset").attr("id"));
				$(tid).after().append(innrDom);
				$('fieldset',tid).each(function(index,ele)
						{
							tid = $(this).attr("id");
							tid=tid+option;
							$(this).attr("id",tid);
						});
				$('input,select',tid).each(function(index,ele)
						{
							id = $(this).attr("id");
							id=id+option;
							$(this).attr("id",id);
						});
				$("body #coApp"+option+"").find("button").last().text("Submit").addClass("submit");
				$("#coApp"+option+" #CloanLoan").children().remove().end();
				$("#coApp"+option+" #bankingClone").children().remove().end();
					}
				else if(fieldsets.length == 5)
					{
					$("#employmentList , #IncomeList , #BankingList").show();
					}
				}
			else if(val =="No")
				{
					$(tid).children("fieldset[id^=employmentContainer],[id^=incomeContainer],[id^=bankingInfo]").remove();
					$("#employmentList , #IncomeList , #BankingList").hide();
					$("body #coApp"+option+"").find("button").last().text("Submit").addClass("submit");
				}
		
		});

$(document.body).on("click","#Applicant",function(){
	$("fieldset").css({"transform":"initial","opacity":"initial"});
	$("#coApplicantArray").hide();
	$("#kyccontainer").show();
	$("#employmentList , #IncomeList , #BankingList ,#ProductList ,#CalculationList ,#OtherList").show();
	refreshPLst();
});
$(document.body).on("click","#hsFinense",function(){
	$scope.LoanType = "HOUSING LOAN";
	$("#dmiImage").attr("src","img/DMIHF.png").show();
		$("#progressDiv ,#showApplicant ,#msgContainer").show();
		$("#kyccontainer").show();
		$("#selProduct").hide();
});
var plFlag=false;
$(document.body).on("click","#pl",function(){
	plFlag = true;
	$scope.LoanType = "PERSONAL LOAN";
	$("#dmiImage").attr("src","img/dmiHL.png").show();
	$("#progressDiv ,#showApplicant ,#msgContainer").show();
	$("#kyccontainer").show();
	$("#selProduct").hide();
});

function confirmOTP(otpCode)
{/*
//	console.log("Missed call Number :"+otpCode);
	var success =true;
	 $http({
			method : 'GET',
			url : 'https://www.cognalys.com/api/v1/otp/confirm/',
			params:{'app_id':'930264afe4d046f082856d5','access_token':'c99b526c43c6b6f141e059c2d5e81e79529700cc','keymatch':$scope.keymatch,'otp':otpCode},
			headers : {'Content-Type' : 'application/json'}
		}).success(function(Response){
//			console.log("Response from confimation:"+JSON.stringify(Response));
			if(Response.status == "success")
			{
				$('.getheight').slimScroll({
					height: containerHeight
						});
						$("#basicInfo").hide();
						$("#selProduct").show();
						$("#msgContainer").css({"left":"22%","width":"70%"});
						$("#errorHeading").text("");
						$("#main_error").html("");
						verifyMob=true;
			}
			else if(Response.status=="failed")
			{ 
				success=false;
				$("#errorHeading").text("Error Code");
				$("#main_error").html("You have entered wrong OTP...");
			}
			
		}).error(function(erro){
			if(otp==11111){
				$scope.otpMSG="";
				$("#verify,#address,#otp-msg").hide();	
				$('#accept,#cancel,#TnC').show();
			}
		});


		if(success == true)
		{return true;}
		else
		{success =true; 
		 return false;}
*/} 
$scope.appcount=0;
var verifyMob=false;
var otpCode;
$scope.clickEvent=function(type)
{
switch (type) {
case "Resend":
	$scope.getOTP($("#mob").val())
	break;
	
/*case "AddCoApp":
	var dom=$("#Applicant").clone();
	var id=dom.attr("id");
	$scope.appcount=$scope.appcount+1;
	id=id+$scope.appcount;
	dom.attr("id",id);
	dom.find("span").text("Co-Applicant");
	$(dom).insertBefore("#addRow");
	break;
*/
case "getOTP":
	var bool=validation()
	if(bool)
		{
			$scope.getOTP($("#mob").val())
			$("#getOTP").hide();
			$("#otpContainer,#pwdInfo").show();
			
		}
	break;

case "verifybtn":
	 otpCode = $("#txt1").val()+$("#txt2").val()+$("#txt3").val()+$("#txt4").val()+$("#txt5").val()
	TotpCode=$scope.otp+otpCode;
//	 console.log("In verify OTP getting:"+$scope.otp+"otpCode entered by user:"+otpCode);
	var condition=confirmOTP(TotpCode);
	if(otpCode == "11111")
		{
		$("#errorHeading").text("");
		$("#main_error").html("");
		$("#msgContainer").hide();
		$('.getheight').slimScroll({
			height: containerHeight-125
				});
				$("#basicInfo").hide();
				$("#selProduct").show();
				$("#msgContainer").css({"left":"22%","width":"70%"});
				verifyMob=false;
		}
		break;
}
}
$scope.Accommodation = "Select";
$scope.Salaried = "Salaried";
$scope.emiDebited = "Yes";
$(document.body).on("click",".addAddress",function(){
	var id=$(this).parents("fieldset").attr("id");
		$("#"+id+" #PermanentAddressContainer ").toggle();
});
var bDtl=1; 
$(document.body).on("click",".bankDeatil",function(){
	$(".RMVbankDeatil").show();
	var id=$(this).parents("fieldset").attr("id");
	id="#"+id;
	var dom=$(""+id+" #BankingInfoContainer").clone();
	dom.attr("id","BankingInfoContainer"+bDtl+"");
	dom.find("input").val('');
	dom.css({"margin-bottom":"5%"});
	$(""+id+" #bankingClone").prepend(dom);
	bDtl =bDtl+1;
});


var lnDtl=1;
$(document.body).on("click",".loanDeatil",function(){
	$(".RMVloanDeatil").show();
	var id=$(this).parents("fieldset").attr("id");
	id="#"+id;
	var dom=$(""+id+" #loanInfo").clone();
	dom.attr("id","BankingInfoContainer"+lnDtl+"");
	dom.css({"margin-bottom":"5%"});
	dom.find("input").val('');
	$(""+id+" #CloanLoan").prepend(dom);
	lnDtl = lnDtl+1;
});

$(document.body).on("click",".moreReference",function(){
	var id=$(this).parents("fieldset").attr("id");
	$("#"+id+" #reference2").toggle();
});

$scope.object;
function createJson()
{
	
// console.log("Loan Type :"+$scope.LoanType);
$scope.object={
		  "sInstId": "4011",
		  "sUserId":$scope.userid,
		  "oHeader": {
		    "sAppID": null,
		    "sInstID": $scope.InstitutionID,
		    "sSourceID": "Yet to Confirm",
		    "sAppSource":"WEB",
		    "dtSubmit": 1461584954958,
		    "sDsaId"  :$scope.useremail
		  },
		  "oReq":{
		    "oApplicant": {
		      "sApplID": "APPLICANT_1",
		      "oApplName": {
		        "sFirstName": $scope.fname,
		        "sMiddleName":$scope.mname,
		        "sLastName": $scope.lname,
		      },
		      "oFatherName":{
		        "sFirstName":$scope.fthrFnm,
		        "sMiddleName":$scope.fthrMnm,
		        "sLastName": $scope.fthrLnm,
		      },
		      "oSpouseName":{
		        "sFirstName":$scope.spsFnm,
		        "sMiddleName":$scope.spsMnm,
		        "sLastName":$scope.spsLnm,
		      },
		      "sReligion":$scope.relegion,
		      "sApplGndr": $scope.gender,
		      "sDob": $("#dob1").val().replace(/:/g,""),
		      "sMarStat":  $scope.Marital,
		      "aKycDocs": [
		        {
		          "sKycName":  "PAN",
		          "sKycNumber": $scope.pan,
		          
		        },
		      ],
		      "aAddr": [],
		      "aPhone": [],
		      "aEmail": [{"sEmailType":"Personal","sEmailAddr":$scope.email1},
		                 {"sEmailType":"Work Email","sEmailAddr":$scope.wrkemail}],
		      "aEmpl": [
		        {
		          "sEmplType":$scope.Salaried,
		          "sEmplName":$scope.empNm,
		          "sDtJoin": $("#doj").val().replace(/:/g,""),
		          "dGrossSal":$("#lnGrsIncm").val().replace(/,/g,''),
		          "sConst":$scope.constn,
		          "sDesig": $("#design").val(),
		          "sModePayment": $scope.paymentMode,
		          "sDeptmt":  $("#dept").val(),
		          "sWorkExps":$("#workex").val(),
		          "sBusinesName":$("#bsnsNm").val(),
		          "dtComencemnt":$scope.bsnsDt
		        }
		      ],
		      "iNoOfDep":parseInt($("#noOfDpndnt").val()),
		      "sEdu":$("#edu").val(),
		      "bMobVer":verifyMob,
		      "aBankingDetails": [
		        {
		          "oActHolderName": {
		            "sFirstName":$scope.acNm1,
		            "sMiddleName": $scope.acNm2,
		            "sLastName":$scope.acNm3,
		            "sPrefix": null,
		            "sSuffix": null
		          },
		          "sBankName":$scope.bnkNm,
		          "sActType": $scope.acTyp,
		          "bSalaryAct":$scope.slryCrdt,
		          "sInwardChequeReturn":$scope.retChq,
		          "sOutwardChequeReturn":$scope.owChq,
		          "dAvgBankBalance": parseInt($scope.avgvblnc),
		          "dDeductedEmiAmt" :$scope.dbtEMI.replace(/,/g,''),
		          "sAnyEmi":$scope.emiDebited,
		          "dMntnAmt":$scope.mntnAmt.replace(/,/g,'')
		        }
		      ],
		      "aLoanDetails": [
		        {
		          "sLnOwnrshp":$scope.LnOwnrShp,
		          "sLnTyp":$scope.LnType,
		          "sLnAccNo":$scope.lnACNo,
		          "sCrdtGrntr":$scope.lnAvl.replace(/:/g,''),
		          "dLnAmt": $scope.lnAmount.replace(/,/g,''),
		          "dEmiAmt":$scope.emiAmount.replace(/,/g,''),
		          "iMob": $scope.lnMob,
		          "iBalTenur": $scope.balTnr,
		          "sRpymntBnkNm":$scope.repayment,
		          "sOblgt": $scope.oblgt,
		          "dLnApr": 0
		        }
		      ],
		      "oIncomeDetails": {
		        "sDocAvail":$scope.avlDoc,
		        "oSalriedDtl": {
		          "dBasIncm":  $scope.lnIncm,
		          "dNetIncm": $scope.lnNtIncm.replace(/,/g,''),
		          "dBsic": $scope.lnBsc.replace(/,/g,''),
		          "dDA":$scope.lnDa.replace(/,/g,''),
		          "dHra": $scope.lnHra.replace(/,/g,''),
		          "dCca":$scope.lnCca.replace(/,/g,''),
		          "dInctv":$scope.lnInsntv.replace(/,/g,''),
		          "dOthr": $scope.otherIncm.replace(/,/g,''),
		          "dOthrSrcIncm":$scope.lnOSrc.replace(/,/g,''),
		          "dPF": $scope.lnPf.replace(/,/g,''),
		          "dPrfTax": $scope.lnPtax.replace(/,/g,''),
		          "dLIC": $scope.lnLic.replace(/,/g,''),
		          "dESI": $scope.lnEsi.replace(/,/g,''),
		          "aLstMnthIncm": [
		            {
		              "sMonthName": null,
		              "dMonthIncome": 0
		            }
		          ],
		          "dPf": 0,
		          "dSic": 0,
		          "dOthrDdctn" :$scope.OtherDed,
		          "dLstMntSal":$scope.llmnth.replace(/,/g,''),
		          "dObligtn": $scope.lnOblgtn.replace(/,/g,''),
		          "sRemarks": $scope.lnRmrk
		        },
		        "aSenpPflIncm": [
		          {
		            "sYr":$scope.y1,
		            "sItrDt": $scope.itr.replace(/:/g,''),
		            "dTrnOvr": $scope.trnOvr1.replace(/,/g,''),
		            "dDprciatn": $scope.deprctn1,
		            "dNtPrfit": $scope.ntPrft1.replace(/,/g,''),
		            "dOthrIncm":$scope.incm1.replace(/,/g,'')
		          },
					{
				             "sYr": $scope.y2,
				             "sItrDt":  $scope.itr2.replace(/:/g,''),
				             "dTrnOvr": $scope.trnOvr2.replace(/,/g,''),
				             "dDprciatn": $scope.deprctn2,
				             "dNtPrfit": $scope.ntPrft2.replace(/,/g,''),
				             "dOthrIncm":$scope.incm2.replace(/,/g,'')
				          },
				           {
				               "sYr": $scope.y3,
				               "sItrDt": $scope.itr3.replace(/:/g,''),
				               "dTrnOvr": $scope.trnOvr3.replace(/,/g,''),
				               "dDprciatn": $scope.deprctn3,
				               "dNtPrfit": $scope.ntPrft3.replace(/,/g,''),
				               "dOthrIncm": $scope.incm3.replace(/,/g,'')
				             }
		        ]
		      }
		    },
		    "aCoApplicant": [],
		    "oApplication": {
		      "sLoanType": $scope.LoanType,       //$("#propPrdct").val(),
		      "dLoanAmt":$("#LnAmt").val().replace(/,/g,''),
		      "iLoanTenor": $scope.lnTnr.replace(/,/g,''),
		      "oProperty":{
		    	"sPropertyName":$("#propPrdct").val(),
		    	"sStatus": $("#propSts").val(),
		    	"sPropertyType":$("#proptyOwnrShip").val(),
		    	"sPropertyValue":$("#propVal").val().replace(/,/g,''),
		        "oPropertyAddress":{
		          "sLine1":$("#prptya1").val(),
		          "sLine2": $("#prptya2").val(),
		          "sCity":$("#prptycity").val(),
		          "iPinCode":$("#prptyPin").val(),
		          "sState": $("#prptyState").val(),
		          "sLandMark":$("#proptylnmrk").val()
		        },
		        "sPurpose":$("#prptyPrps").val(),
		        "sPropertyArea":$("#prptyArea").val(),
		        "sPropUnt":$("#propUnt").val(),
		        "sMarketValue": $("#mrkyVal").val().replace(/,/g,''),
		        "sOCRAmt":  $("#ocrAmt").val().replace(/,/g,''),
		        "sRemark":$("#prptyRmrk").val()
		      },
		      "dEmi":$scope.lnEmi.replace(/,/g,''),
		    }
		  },
		  "sRespFormat": null,
		  "sCurrentStageId": "DE"
		};

//	console.log("Stay month:"+ $scope.pStayMt +"Calculated month:"+ parseInt($scope.pStayMt));
	var tmpmth=0;
	var perTtlTim =0;
	if($scope.pStayYr == "10+" ||$scope.pStayYr =="Since Birth" )
		{perTtlTim = 132;}
	else
		{perTtlTim= parseInt($scope.pStayYr)*12 + parseInt($scope.pStayMt);}
/*	if($scope.pStayMt != undefined)
		{perTtlTim=tmpmth +parseInt($scope.pStayMt);
		 console.log("Calculated time at addrss:"+ perTtlTim +"Time at year:" + $scope.pStayYr + "Time at Month:" + $scope.pStayMt);
		}*/
	$scope.address1={
			"sLine1":$scope.a1,
			"sLine2":$scope.a2,
			"sCity": $scope.ucity,
			"iPinCode":$scope.pin,
			"sState" : $scope.ustate,
			"sCountry":"INDIA",
			"sLandLoard":$scope.lndlrd,
			"sLandMark":$scope.lndMrk,
			"sAccm":$scope.pacm,
			"sAddrType":"RESIDENCE",
			"iMonthAtAddr":$scope.perTtlTim,
			"dRentAmt":$scope.rent.replace(/,/g,'')
			};
//	console.log("Stay year:"+$scope.prmStayYr+"Calculated month:"+parseInt($scope.prmStayYr)*12);
//	console.log("Stay month:"+ $scope.prmStayMt +"Calculated month:"+parseInt($scope.prmStayYr)*12);
//	******************************************calculating month at address***************************************************
	var pmnth = 0;
	var perstay=0;
	if($scope.prmStayYr == "10+" || $scope.prmStayYr == "Since Birth")
		{perstay =132;}
	else
		{perstay= (parseInt($scope.prmStayYr)*12) +parseInt($scope.prmStayMt)}
/*	if($scope.prmStayMt != undefined )
		{ perstay = pmnth +parseInt($scope.prmStayMt);
	console.log("Calculated time at addrss:"+perstay+"Time at year:"+$scope.prmStayYr+"Time at Month:"+$scope.prmStayMt);
		}*/
	if($("#same").prop("checked") == true)
		{
		$scope.add2 = 	$scope.address1;
//		console.log("Copied Address:"+JSON.stringify($scope.add2));
		}
	else{
	$scope.add2={
			"sLine1":$scope.prma1,
			"sLine2":$scope.prma2,
			"sCity": $scope.upcity,
			"iPinCode":$scope.prmpin,
			"sState" : $scope.upstate,
			"sCountry":"INDIA",
			"sLandLoard":$scope.prmlndlrd,
			"sLandMark":$scope.prmlndMrk,
			"sAccm":$scope.prmntAcm,
			"sAddrType":"PERMANENT",
			"iMonthAtAddr":perstay,
			"dRentAmt":$scope.prmRent.replace(/,/g,'')
			};
		}
	$scope.add3={
			"sLine1":$scope.cmpnya1,
			"sLine2":$scope.cmpnya2,
			"sCity": $scope.cmpnyCity,
			"iPinCode":$scope.cmpnyPin,
			"sState" : $scope.cmpnyState,
			"sCountry":"INDIA",
			"sLandMark":$scope.cmpnyLndmrk,
			"sAddrType":"OFFICE",
			};
	
	$scope.add4={
			"sLine1":$scope.bsnsa1,
			"sLine2":$scope.bsnsa2,
			"sCity": $scope.bsnsCity,
			"iPinCode":$scope.bsnspin,
			"sState" :$scope.bsnsState,
			"sCountry":"INDIA",
			"sLandMark":$scope.bsnsLndmrk,
			"sAddrType":"OFFICE",
//			"iMonthAtAddr":perstay
			};
	$scope.object.oReq.oApplicant.aAddr.push($scope.address1);
	$scope.object.oReq.oApplicant.aAddr.push($scope.add2);
	$scope.object.oReq.oApplicant.aAddr.push($scope.add3);
	$scope.object.oReq.oApplicant.aAddr.push($scope.add4);
	
	$scope.phone1={"sPhoneType":"PERSONAL_MOBILE",
					"sPhoneNumber":$scope.mob,
					"sCountryCode":"+91"
					};
	$scope.phone2={"sPhoneType":"PERSONAL_PHONE",
			"sPhoneNumber":$scope.perPhone,
			"sCountryCode":"+91"
			};
	$scope.phone3={"sPhoneType":"ALTERNATE_MOBILE",
			"sPhoneNumber":$scope.perMobile,
			"sCountryCode":"+91"
			};
	$scope.phone4={"sPhoneType":"OFFICE_PHONE",
			"sPhoneNumber":$scope.wrkmob,
			"sCountryCode":"+91"
			};
	$scope.phone5={"sPhoneType":"BUSINESS_PHONE",
			"sPhoneNumber":$scope.bsnsNmbr,
			"sCountryCode":"+91"
			};
	$scope.object.oReq.oApplicant.aPhone.push($scope.phone1);
	$scope.object.oReq.oApplicant.aPhone.push($scope.phone2);
	$scope.object.oReq.oApplicant.aPhone.push($scope.phone3);
	$scope.object.oReq.oApplicant.aPhone.push($scope.phone4);
	$scope.object.oReq.oApplicant.aPhone.push($scope.phone5);	
        $("div[id^=BankingInfoContainer]"," #bankingClone").each(function(index,element){
	                    	 var id=$(this).attr("id");
//	                    	 alert("ID:"+id);
	                    	 var id="#"+id;
	                    	 $scope.b1= {
	                         "oActHolderName": {
	                           "sFirstName":$(id+" #acNm1").val(),
	                           "sMiddleName":$(id+" #acNm2").val(),
	                           "sLastName":$(id+" #acNm3").val(),
	                         },
	                         "sBankName": $(id+" #bnkNm").val(),
	                         "sActType":$(id+" #acTyp").val(),
	                         "sInwardChequeReturn":$(id+" #retChq").val(),
	                         "sOutwardChequeReturn":$(id+" #owChq").val(),
	                         "dAvgBankBalance":parseInt($(id+" #avgvblnc").val()),
	                         "dDeductedEmiAmt":$(id+" #dbtEMI").val(),
	                         "sAnyEmi":$(id+" #emiDebited").val(),
	                         "dMntnAmt":$(id+" #mntnAmt").val().replace(/,/g,'')
	                    	 	}
	             $scope.object.oReq.oApplicant.aBankingDetails.push($scope.b1);
	                     });
	                   
//	                     $scope.lnmain=[];
	                     $("div[id^=BankingInfoContainer]"," #CloanLoan").each(function(index,element){
	                    	 var id=$(this).attr("id");
	                    	 var id="#"+id;  
	                    	 $scope.l1={
	                    			 "sLnOwnrshp":$(id+" #LnOwnrShp").val(),
	                    			 "sLnTyp":$(id+" #LnType").val(),
	                    			 "sLnAccNo":$(id+" #lnACNo").val(),
	                     	    	 "sCrdtGrntr": $(id+" #lnAvl").val().replace(/:/g,''),
	                    			 "dLnAmt":$(id+" #lnAmount").val(),
	                     	    	   "dEmiAmt":$(id+" #emiAmount").val(),
	                     	    	   "iMob":$(id+" #lnMob").val(),
	                     	    	   "iBalTenur":$(id+" #balTnr").val(),
	//	                     			"sCrdtGrntr": null,
	                     				"sRpymntBnkNm":$(id+" #repayment").val(),
	                     				"sOblgt":$(id+" #oblgt").val(),
	                     				"dLnApr":0
	                     	           }
	                     		$scope.object.oReq.oApplicant.aLoanDetails.push($scope.l1);
	                     });
	                    
//	             console.log("one banking Info:"+JSON.stringify($scope.b1)+"Array:"+JSON.stringify($scope.main));
		                     
};

function coAppJSon(){/*
	var jsnObj;
$('div[id^=coApp]',"#coApplicantArray").each(function(index,ele)
		{
		var id=$(this).attr("id");
		console.log("ID :"+id);
	jsnObj =	{
	        "sApplID": null,
	        "oApplName": {
	          "sFirstName": null,
	          "sMiddleName": null,
	          "sLastName": null,
	          "sPrefix": null,
	          "sSuffix": null
	        },
	        "oFatherName": {
	          "sFirstName": $("#"+id+" #fthrFnm").val(),
	          "sMiddleName":$("#"+id+" #fthrMnm").val(),
	          "sLastName":$("#"+id+" #lname").val(),
//	          "sPrefix": null,
	          "sSuffix": null
	        },
	        "oSpouseName": {
	          "sFirstName": $("#"+id+" #spsFnm").val(),
	          "sMiddleName":$("#"+id+" #spsMnm").val(),
	          "sLastName":  $("#"+id+" #spsLnm").val(),
	          "sPrefix": null,
	          "sSuffix": null
	        },
	        "sReligion": $("#"+id+" #relegion").val(),
	        "sApplGndr": $("#"+id+" #gender").val(),
	        "sDob": $("#"+id+" #dob").val().replace(/:/g,""),
	        "iAge": 0,
	        "sMarStat": $("#"+id+" #Marital").val(),
	        "aKycDocs": [
	          {
	            "sKycName": "PAN",
	            "sKycNumber": $("#"+id+" #pan").val(),
	          }
	        ],
	        "aAddr": [],
	        "aPhone": [],
	        "aEmail": [{"sEmailType":"Personal","sEmailAddr":$("#"+id+" #email").val()},
		                 {"sEmailType":"Work Email","sEmailAddr":$("#"+id+" #wrkemail").val()}],
	        "aEmpl": [
	          {
	            "sEmplType":$("#"+id+" #Salaried").val(),
	            "sEmplName": $("#"+id+" #empNm").val(),
	            "sDtJoin":$("#"+id+" #doj").val().replace(/:/g,""),
	            "sDtLeave":$("#"+id+" #Salaried").val(),
	            "dmonthSal": 0,
	            "dGrossSal": 0,
	            "aLastMonthIncome": [
	              {
	                "sMonthName": null,
	                "dMonthIncome": 0
	              }
	            ],
	            "sConst":$("#"+id+" #constn").val(),
	            "sDesig":$("#"+id+" #design").val(),
	            "sModePayment": $("#"+id+" #paymentMode").val(),
	            "sDeptmt":$("#"+id+" #dept").val(),
	            "sWorkExps":$("#"+id+" #workex").val(),
	            "sBusinesName":$("#"+id+" #bsnsNm").val(),
	            "dtComencemnt":$("#"+id+" #bsnsDt").val()
	          }
	        ],
	        "iNoOfDep": parseInt($("#"+id+" #noOfDpndnt").val()),
	        "iEarnMem": 0,
	        "iFamilyMem": 0,
	        "sEdu":$("#"+id+" #edu").val(),
	        "bMobVer": false,
	        "aBankingDetails": [
	          {
	            "oActHolderName": {
	              "sFirstName":$("#"+id+" #acNm1").val(),
	              "sMiddleName":$("#"+id+" #acNm2").val(),
	              "sLastName": $("#"+id+" #acNm3").val(),
	            },
	            "sBankName": $("#"+id+" #bnkNm").val(),
	            "sActType": $("#"+id+" #acTyp").val(),
	            "bSalaryAct": $("#"+id+" #slryCrdt").val(),
	            "sInwardChequeReturn": $("#"+id+" #retChq").val(),
	            "sOutwardChequeReturn": $("#"+id+" #owChq").val(),
	            "dAvgBankBalance": parseInt($("#"+id+" #avgvblnc").val()),
	            "dDeductedEmiAmt": $("#"+id+" #dbtEMI").val(),
	            "sAnyEmi": $("#"+id+" #emiDebited").val(),
	            "dMntnAmt": parseFloat($("#"+id+" #mntnAmt").val())
	            }
	        ],
	        "aLoanDetails": [
	          {
	            "sLnOwnrshp":$("#"+id+" #LnOwnrShp").val(),
	            "sLnTyp":$("#"+id+" #LnType").val(),
	            "sLnAccNo":$("#"+id+" #lnACNo").val(),
	            "dLnAmt": $("#"+id+" #lnAmount").val(),
	            "dEmiAmt":$("#"+id+" #emiAmount").val(),
	            "iMob": $("#"+id+" #lnMob").val(),
	            "iBalTenur": $("#"+id+" #balTnr").val(),
	            "sRpymntBnkNm": $("#"+id+" #repayment").val(),
	            "sOblgt": $("#"+id+" #oblgt").val()
	             }
	        ],
	        "oIncomeDetails": {
	          "sDocAvail":$("#"+id+" #avlDoc").val(),
	          "aOthrSrcInc": [],
	          "oSalriedDtl": {
	            "dBasIncm": $("#"+id+" #lnIncm").val(),
	            "dNetIncm":$("#"+id+" #lnNtIncm").val(),
	            "dBsic": $("#"+id+" #lnBsc").val(),
	            "dDA": $("#"+id+" #lnDa").val(),
	            "dHra": $("#"+id+" #lnHra").val(),
	            "dCca":$("#"+id+" #lnCca").val(),
	            "dInctv": $("#"+id+" #lnInsntv").val(),
	            "dOthr": $("#"+id+" #otherIncm").val(),
	            "dOthrSrcIncm":$("#"+id+" #lnOSrc").val(),
	            "dPF": $("#"+id+" #lnPf").val(),
	            "dPrfTax": $("#"+id+" #lnPtax").val(),
	            "dLIC": $("#"+id+" #lnLic").val(),
	            "dESI":$("#"+id+" #lnEsi").val(),
	            "aLstMnthIncm": [
	              {
	                "sMonthName": null,
	                "dMonthIncome": 0
	              }
	            ],
	        
	            "dOthrDdctn":$("#"+id+" #lnDdction").val(),
	            "dLstMntSal":$("#"+id+" #llmnth").val(),
	            "dObligtn":$("#"+id+" #lnOblgtn").val()
//	            "sRemarks":$("#"+id+" #lnRmrk").val(),
	          },
	          "aSenpPflIncm": [
	            {
	              "sYr": $("#"+id+" #y1").val(),
	              "sItrDt":$("#"+id+" #itr").val(),
	              "dTrnOvr":$("#"+id+" #trnOvr1").val(),
	              "dDprciatn":$("#"+id+" #deprctn1").val(),
	              "dNtPrfit": $("#"+id+" #ntPrft1").val(),
	              "dOthrIncm":$("#"+id+" #incm1").val(),
	            },
	            {
		              "sYr":$("#"+id+" #y2").val(),
		              "sItrDt":$("#"+id+" #itr2").val(),
		              "dTrnOvr":$("#"+id+" #trnOvr2").val(),
		              "dDprciatn":$("#"+id+" #deprctn2").val(),
		              "dNtPrfit":$("#"+id+" #ntPrft2").val(),
		              "dOthrIncm":$("#"+id+" #incm2").val(),
		            },
		            {
			              "sYr":$("#"+id+" #y3").val(),
			              "sItrDt":$("#"+id+" #itr3").val(),
			              "dTrnOvr":$("#"+id+" #trnOvr3").val(),
			              "dDprciatn":$("#"+id+" #deprctn3").val(),
			              "dNtPrfit":$("#"+id+" #ntPrft3").val(),
			              "dOthrIncm":$("#"+id+" #incm3").val(),
			            }
	            ]
	        },
	        "sRelWithAppl": null
	      }
	
		});
*/}
$(document.body).on("click",".submit",function(){
//	var validate = validation()
	var validate = true;
	if(validate){
	$("#infoContainer , #ErrorContainer").hide();
	$("#resultPanel , #home").show();
	start_timer();
	createJson();
	/*if ( $('#coApplicantArray').children().length > 0 ) {
	     coAppJSon();
		
	}*/
//	$scope.object={"sInstId":"4011","oHeader":{"sAppID":"","sInstID":"4011","sSourceID":null,"sAppSource":"WEB","dtSubmit":1461584954958},"oReq":{"oApplicant":{"oApplName":{"sFirstName":"oooooo","sMiddleName":"oooooooooo","sLastName":"oooooooooooo"},"oFatherName":{"sFirstName":"fa1","sMiddleName":"fa2","sLastName":"fa3"},"oSpouseName":{"sFirstName":"sa1","sMiddleName":"sa2","sLastName":"sa3"},"sReligion":"Hindu","sApplGndr":"Male","sDob":"24051990","aKycDocs":[{"sKycName":"PAN"}],"aAddr":[{"sLine1":"a1","sLine2":"a2","iPinCode":"888888","sCountry":"INDIA","sLandLoard":"pppppp","sLandMark":"llllllll","sAccm":"Rented","sAddrType":"RESIDENCE","iMonthAtAddr":45},{"sCountry":"INDIA","sAddrType":"Permanent","iMonthAtAddr":null},{"sCountry":"INDIA","sAddrType":"OFFICE"},{"sLine1":"Ba1","sLine2":"Ba2","sCity":"CITY","iPinCode":"888888","sState":"STATE","sCountry":"INDIA","sLandMark":"BSNS A2","sAddrType":"OFFICE"}],"aPhone":[{"sPhoneType":"PERSONAL_MOBILE","sPhoneNumber":"9999999999","sCountryCode":"+91"},{"sPhoneType":"PERSONAL_PHONE","sPhoneNumber":"8787877878","sCountryCode":"+91"},{"sPhoneType":"ALTERNATE_MOBILE","sPhoneNumber":"7676767676","sCountryCode":"+91"},{"sPhoneType":"OFFICE_PHONE","sCountryCode":"+91"},{"sPhoneType":"BUSINESS_PHONE","sPhoneNumber":"9999999999","sCountryCode":"+91"}],"aEmail":[],"aEmpl":[{"sEmplType":"SENP","sDesig":"","sModePayment":"Cheque","sDeptmt":"","sWorkExps":"","sBusinesName":"B1","dtComencemnt":"99999"}],"iNoOfDep":null,"oApplRef":{"sOccup":null},"sEdu":"12th","bMobVer":true,"aBankingDetails":[{"oActHolderName":{"sFirstName":"ba1","sMiddleName":"ba2","sLastName":"ba3","sPrefix":null,"sSuffix":null},"sBankName":"name bake","sActType":"CA","bSalaryAct":"false","sInwardChequeReturn":"I/W CHQ","sOutwardChequeReturn":"O/W CHQ","dAvgBankBalance":999999,"sAnyEmi":"No","dMntnAmt":99999}],"aLoanDetails":[{"sLnOwnrshp":"Individual","sLnTyp":"Home Loan","sLnAccNo":"99999999","dLnAmt":"9999999","dEmiAmt":"9999999","iMob":"999999","iBalTenur":"9999999","sRpymntBnkNm":"9999999","sOblgt":"Yes","dLnApr":0}],"oIncomeDetails":{"sDocAvail":"Yes","oSalriedDtl":{"aLstMnthIncm":[{"sMonthName":null,"dMonthIncome":0}],"dPf":0,"dSic":0},"aSenpPflIncm":[{"sYr":"9999","sItrDt":"999","dTrnOvr":"9999","dDprciatn":"999","dNtPrfit":"999","dOthrIncm":"999"},{"sYr":"9999","sItrDt":"999","dTrnOvr":"999","dDprciatn":"999","dNtPrfit":"999","dOthrIncm":"999"},{"sYr":"9999","sItrDt":"999","dTrnOvr":"999","dDprciatn":"999","dNtPrfit":"999","dOthrIncm":"99999"}]}},"aCoApplicant":[],"oApplication":{"sLoanType":"LAP","dLoanAmt":"99999","iLoanTenor":"9999","oProperty":{"sStatus":"Yes","sPropertyType":"8888","sPropertyAddress":{"sLine1":"9898989898","sLine2":"oiiooioioioi","sCity":"popopopo","iPinCode":"878787","sState":"popoopo","sLandMark":"oioioiioio"},"sPurpose":"Flat Purchase","sPropertyArea":"989898","sPropUnt":"Sq. Feet","sMarketValue":"88888","sOCRAmt":"8888","sRemark":"Hello"},"dEmi":"99999"}},"sRespFormat":null,"sCurrentStageId":"DE"}
//	$scope.object={"sInstId":"4011","sUserId":"487","oHeader":{"sAppID":null,"sInstID":"4011","sSourceID":"Yet to Confirm","sAppSource":"WEB","dtSubmit":1461584954958,"sDsaId":"tanveer.alam@dmifinance.in"},"oReq":{"oApplicant":{"oApplName":{"sFirstName":"Demo","sMiddleName":"Demo","sLastName":"Demo"},"oFatherName":{"sFirstName":"Po","sMiddleName":"Po","sLastName":"Po"},"oSpouseName":{"sFirstName":"Po","sMiddleName":"Po","sLastName":"Po"},"sReligion":"Muslim","sApplGndr":"Male","sDob":"26021985","sMarStat":"Un-Married","aKycDocs":[{"sKycName":"PAN","sKycNumber":"PPPPP9999P"}],"aAddr":[{"sLine1":"Po","sLine2":"Po","sCity":"Pune","iPinCode":"411044","sCountry":"INDIA","sLandMark":"Opop","sAccm":"Employer","sAddrType":"RESIDENCE","iMonthAtAddr":41},{"sCountry":"INDIA","sAccm":"Select","sAddrType":"Permanent","iMonthAtAddr":null},{"sCountry":"INDIA","sAddrType":"OFFICE"},{"sLine1":"Opo","sLine2":"Po","sCity":"Pune","iPinCode":"411044","sState":"Maharashtra","sCountry":"INDIA","sLandMark":"Po","sAddrType":"OFFICE"}],"aPhone":[{"sPhoneType":"PERSONAL_MOBILE","sPhoneNumber":"9090909090","sCountryCode":"+91"},{"sPhoneType":"PERSONAL_PHONE","sPhoneNumber":"9898889898","sCountryCode":"+91"},{"sPhoneType":"ALTERNATE_MOBILE","sCountryCode":"+91"},{"sPhoneType":"OFFICE_PHONE","sCountryCode":"+91"},{"sPhoneType":"BUSINESS_PHONE","sPhoneNumber":"9898989898","sCountryCode":"+91"}],"aEmail":[{"sEmailType":"Personal","sEmailAddr":"work@gmail.com"},{"sEmailType":"Work Email"}],"aEmpl":[{"sEmplType":"SENP","sDtJoin":"","sConst":"Private Ltd","sDesig":"","sModePayment":"Bank Salary","sDeptmt":"","sWorkExps":"","sBusinesName":"Pop","dtComencemnt":"989898"}],"iNoOfDep":3,"oApplRef":{"sOccup":null},"sEdu":"12th","bMobVer":false,"aBankingDetails":[{"oActHolderName":{"sFirstName":"po","sMiddleName":"po","sLastName":"po","sPrefix":null,"sSuffix":null},"sBankName":"po","sActType":"CA","bSalaryAct":"false","sInwardChequeReturn":"p","sOutwardChequeReturn":"opo","dAvgBankBalance":9898,"dDeductedEmiAmt":"99898","sAnyEmi":"Yes","dMntnAmt":98989}],"aLoanDetails":[{"sLnOwnrshp":"Joint","sLnTyp":"TWO-WHEELER LOAN","sLnAccNo":"989898","dLnAmt":"99898","dEmiAmt":"98989","iMob":"989","iBalTenur":"989898","sRpymntBnkNm":"87878","sOblgt":"Yes","dLnApr":0}],"oIncomeDetails":{"sDocAvail":"Yes","oSalriedDtl":{"dNetIncm":"","dBsic":"","dDA":"","dHra":"","dCca":"","dInctv":"","dOthr":"","dOthrSrcIncm":"","dPF":"","dPrfTax":"","dLIC":"","dESI":"","aLstMnthIncm":[{"sMonthName":null,"dMonthIncome":0}],"dPf":0,"dSic":0,"dLstMntSal":"","dObligtn":""},"aSenpPflIncm":[{"sYr":"98","sItrDt":"889","dTrnOvr":"98","dDprciatn":"89898","dNtPrfit":"98","dOthrIncm":"9898"},{"sYr":"9898","sItrDt":"98","dTrnOvr":"989","dDprciatn":"989898","dNtPrfit":"98","dOthrIncm":"9898"},{"sYr":"98","sItrDt":"989","dTrnOvr":"898","dDprciatn":"9898","dNtPrfit":"989","dOthrIncm":"98"}]}},"aCoApplicant":[],"oApplication":{"sLoanType":"HOUSING LOAN","dLoanAmt":"98988","iLoanTenor":"98989","oProperty":{"sPropertyName":"Home loan","sStatus":"Yes","sPropertyType":"Single","sPropertyValue":"878787","oPropertyAddress":{"sLine1":"popop","sLine2":"opopo","sCity":"pune","iPinCode":"411044","sState":"Maharashtra","sLandMark":"popo"},"sPurpose":"House Purchase","sPropertyArea":"8878","sPropUnt":"Sq. Feet","sMarketValue":"86866","sOCRAmt":"87","sRemark":"hello"},"dEmi":"989898"}},"sRespFormat":null,"sCurrentStageId":"DE"};
	console.log("Submit JSON:"+JSON.stringify($scope.object));
	   $http({
			method : 'POST',
			url : baseUrl+'submit-application',
			data :$scope.object,
			headers : {'Content-Type':'application/json'}
		}).success(function(data) 
				{ 
					/*	$("#infoContainer , #ErrorContainer").hide();
						$("#resultPanel").show();
						start_timer(); // 60 sec timer
*///						console.log("Data Successfully submitted-" + JSON.stringify(data));
						$scope.statusJSON = {
								  "sRefID":data.sRefID,
								  "oHeader": {
								    "sCroId": "default",
								    "dtSubmit":9898989898,
								    "sReqType": "JSON",
								    "sAppSource" : "MOBILE",
								    "sDsaId":$scope.useremail,
								    "sAppID": data.oHeader.sAppID,
								    "sSourceID":"",
								    "sInstID":4011
								  }
							};
	// console.log("Status input json="+ JSON.stringify($scope.statusJSON));
				$scope.check_status();
				UploadAllImgs(data.sRefID,img_array,"submit");
				$scope.REFID = data.sRefID;
				}).error(function(data) 
				{
					$scope.serviceHitCount=$scope.serviceHitCount+1;
					if($scope.serviceHitCount<=3)
						{
						$scope.submitApplication();
						}
					else{
						$scope.serviceHitCount=1;
						$scope.error="Sorry we can not process your Submit request";
					}	

});
	}//End of validation

});

$(document.body).on("change",".Accommodation",function(){
	var id=$(this).parents("fieldset").attr("id");
	id="#"+id;

	if($(this).val() == "Rented")
	{
		$(""+id+" #landLoard , #rentDiv").show();
	}
	else
		$(""+id+" #landLoard , #rentDiv").hide();
});

$(document.body).on("change",".Salaried",function(){
	var id=$(this).parents("fieldset").attr("id");
	id="#"+id;
	var value= $(this).val();
	var ptrn =  /(SENP|SEP)$/i;
	if(value == "Salaried")
	{
		$(""+id+" #paymentMode ,#onSalariedProfile ,#onSalrSlct").show();
	/*	$(""+id+" #nnSlrd").hide();
		$(""+id+" #noSalariedProfile").hide();*/
//		$(""+id+" #payInput").css("display","none");
		$(""+id+" #payInput ,#noSalariedProfile,#nnSlrd").hide();
	}
	else if(ptrn.test(value))
	{
		$(""+id+" #paymentMode ,#onSalariedProfile,#onSalrSlct").hide();
		$(""+id+" #payInput ,#noSalariedProfile,#nnSlrd").show();
	}
});

$(document.body).on("change",".emiDebited",function(){
	var id=$(this).parents("fieldset").attr("id");
	id="#"+id;
	if($(""+id+"#emiDebited").val() == "Yes")
	{
		$(""+id+"#OnEmi").show();
	}
	else
	{
		$(""+id+"#OnEmi").hide();
	}
});
$(document.body).on("focusin","input[type='text']",function(e){
	$(this).parents(".customRow").css("border-color","#24a1ed");
	$(this).parents().siblings(".customDiv").css("border-color","#24a1ed");
	 $(this).parent().parent().find("label").css("color","#24a1ed");
	var hdrval = $(this).parent().parent().find("label").text();
	$("#errorHeading").text(hdrval).addClass("text-danger").removeClass("text-info");
	$("#main_error").text("Please enter"+hdrval+" ").addClass("text-danger").removeClass("text-info");
});	

	$(document.body).on("blur","input , select",function(e)
	{
		$(this).parents(".customRow").css("border-color","#727272");
		$(this).parents().siblings(".customDiv").css("border-color","#727272");
		 $(this).parent().parent().find("label").css("color","black");
	});
	
function validation()
	{
		var error =false;
		var selectError=false;
//		var panptrn = /[A-Z]{3}[P][A-Z]\d{4}[A-Z]/i;
		var panptrn = /(^([a-zA-Z]{5})([0-9]{4})([a-zA-Z]{1})$)/;
		var nmrptrn = /^[,0-9\d]+$/;
		var number = /(number|pin)/i;
		var string = /(name|string|city|state)/i;
		var char10 =/(address)/i;
		var email=/(email)/i;
		var pan=/(pan)/i;
		var nnMndtry = /(mname|ntMndty)/i;
		var strptrn = /^[a-zA-Z\s ]+$/;
		var mailptrn =/^[A-Za-z0-9._]+@[A-Za-z]+\.[a-z]{2,4}$/i;
//		var mobile=/(tmob|permobile|prmnt_permobile)$/i;
//		var pincode=/(perpin|prmnt_perpin|wrkpin|cr)$/i;
//		var std	=/(perstdCode|prmnt_perstdCode|wrkstd)$/i;
//		var phone=/(perphone|prmnt_perphone|wrkphn)$/i;
//      var mailptrn =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
//		var char4 =/(fname|lname)$/i;
		
		$("input[type='text']:visible").each(function()
		{
			var cstmClass = $(this).attr("class");
			 $(this).val($.trim($(this).val()));
			 var val= $(this).val();
			 var strcls = cstmClass.search(string);
			var cndtn = cstmClass.search(nnMndtry)
//			var length=$(this).val().length;
//			console.log("function return :" +strcls);
			 if(val == "" && cndtn == -1)
					{
   			 		 $(this).focus();
					 error = true;
					 return false;
					 $("#errorHeading").text(hdrval).addClass("text-danger").removeClass("text-info");
					 $("#main_error").text("Please enter !").addClass("text-danger").removeClass("text-info");
					 $(this).parents(".customRow").css("border-color","red");
					 $(this).parents().siblings(".customDiv").css("border-color","red");
					}

			 else if(val != "")
			 {		
				 if(cstmClass.search(email) != -1)
				{
					if(!mailptrn.test(val) )
						{
							$(this).focus();
							error = true;
							$("#errorHeading").text("Email").addClass("text-danger").removeClass("text-info");
							$("#main_error").text("Please Enter correct Email").addClass("text-danger").removeClass("text-info");
							$(this).parents(".customRow").css("border-color","red");
							$(this).parents().siblings(".customDiv").css("border-color","red");
							return false;
						}
				}else if(cstmClass.search(string) != -1 )
				{
					if(!strptrn.test(val) )
					{
						$(this).focus();
						var hdrval = $(this).parent().parent().find("label").text();
						$("#errorHeading").text(hdrval).addClass("text-danger").removeClass("text-info");
						$("#main_error").text("Please enter Characters only!").addClass("text-danger").removeClass("text-info");
						$(this).parents(".customRow").css("border-color","red");
						$(this).parents().siblings(".customDiv").css("border-color","red");
						error = true;
						return false;
					}
				}	
				else if(cstmClass.search(number) != -1)
				{
						if(!nmrptrn.test(val) )
						{	
							$(this).focus();
							var hdrval = $(this).parent().parent().find("label").text();
							$("#errorHeading").text(hdrval).addClass("text-danger").removeClass("text-info");
							$("#main_error").text("Please enter Number only!").addClass("text-danger").removeClass("text-info");
							$(this).parents(".customRow").css("border-color","red");
							$(this).parents().siblings(".customDiv").css("border-color","red");
							error = true;
							return false;
						}
				}

				 
				else if(cstmClass.search("mobile") != -1)
				{
						if(!nmrptrn.test(val) || val.length != 10)
						{	
							$(this).focus();
							var hdrval = $(this).parent().parent().find("label").text();
							$("#errorHeading").text(hdrval).addClass("text-danger").removeClass("text-info");
							$("#main_error").text("Please enter 10 digit mobile Number").addClass("text-danger").removeClass("text-info");
							$(this).parents(".customRow").css("border-color","red");
							$(this).parents().siblings(".customDiv").css("border-color","red");
							error = true;
							return false;
						}
				} 
				else if(cstmClass.search(pan) != -1)
				{
						if(!panptrn.test(val))
						{	
							$(this).focus();
							var hdrval = $(this).parent().parent().find("label").text();
							$("#errorHeading").text(hdrval).addClass("text-danger").removeClass("text-info");
							$("#main_error").text("Please enter correct PAN Number!").addClass("text-danger").removeClass("text-info");
							error = true;
							$(this).parents(".customRow").css("border-color","red");
							$(this).parents().siblings(".customDiv").css("border-color","red");
							return false;
						}

				}
			 }
		});
		// *******************************  for PAN validation *********************
		if(error == false )
		{ $("select:visible").each(function(){
			if($(this).val() == "Select")
			{
//				console.log("Select ID :"+);
//				$("#"+$(this).attr("id")).foc
				$(this).focus();
				 selectError = true;
				 var hdrval = $(this).parent().parent().find("label").text();
				 $("#errorHeading").text(hdrval).addClass("text-danger").removeClass("text-info");
				 $("#main_error").text("Please select any option!").addClass("text-danger").removeClass("text-info");
				 $(this).parents(".customRow").css("border-color","red");
				 $(this).parents().siblings(".customDiv").css("border-color","red");
				 $(".getheight").scroll(40);
				 return false;
			}
			else
				{
//				 $(this).css("border-bottom","1px solid #727272");
				}
		  });

		}
		if(error == true || selectError == true)
			{
			error=false;
			selectError=false;
			return false;
			}
		else
			{
			return true;
			}
	}

$(document.body).on("click",".next",function(){
//	var bool = validation();
	var bool=true;
	if (bool) {
		$("#errorHeading").text("");
		$("#main_error").html("");
		animating = true;
		current_fs = $(this).parents('fieldset');
		next_fs = $(this).parents('fieldset').next();
//		console.log("current"+current_fs.index()+"next:"+);
		$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
//		console.log("Siblings :"+JSON.stringify($("#progressbar li").eq($("fieldset").index(next_fs)).siblings()));
		$("#progressbar li").removeClass("active");
		if(next_fs.index() == 5 && plFlag)
			{$("#plProduct").show();
			 $("#prdctDiv").hide()}
		else
		{$("#plProduct").hide();
		 $("#prdctDiv").show()}

		if($("#coApplicantArray").css("display") == "none")
		{$(".getheight").scrollTop(0);
			$('.getheight').slimScroll({
				 start : 'top'
			});
		$(".progressbar li").eq($("fieldset").index(next_fs)).addClass("active");}
		else
		{	var id=$(this).parents("div[id^=coApp]").attr("id");
			count=id.slice(-1);
			$(".getheight").scrollTop(0);
			$('.getheight').slimScroll({
				 start : 'top'
			});
			$(".progressbar li").eq($("#coApp"+count+" fieldset").index(next_fs)).addClass("active");
		}
		current_fs.animate(
				{opacity : 0},{
					duration : 400,
					step : function(now,mx) 
					{	scale = 1 - (1 - now) * 0.2;
					right = 100;
					left = (now * 50)+ '%';
					opacity = 1 - now;
					next_fs.css({'left' : left,'opacity' : opacity});
					current_fs.css({'transform' : 'scale('+ scale+ ')'});
					},
					complete : function(){
						$(this).hide();
						next_fs.show();
						animating = false;
					}
				});
	}
});

//$(".previous").click(function() {
$(document.body).on("click",".previous",function(){
	$("#errorHeading").text("");
	$("#main_error").html("");
	if(animating)
		return false;
	animating = true;
//	fieldsetn = fieldsetn - 1;
//	change_header();
	current_fs = $(this).parents('fieldset');
	previous_fs = $(this).parents('fieldset').prev();
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
	if($("#coApplicantArray").css("display") == "none")
	{	$(".progressbar li").eq($("fieldset").index(current_fs)).removeClass();
		;$(".getheight").scrollTop(0);
		$('.getheight').slimScroll({
			 start : 'top'
		});}
	else{
		$(".getheight").scrollTop(0);
		$('.getheight').slimScroll({
			 start : 'top'
		});
		var id=$(this).parents("div[id^=coApp]").attr("id");
		count=id.slice(-1);
		$(".progressbar li").eq($("#coApp"+count+" fieldset").index(current_fs)).removeClass("active");
		}
	current_fs.animate({
		opacity : 0}, {
			duration : 400,
			step : function(now, mx) {
				scale = 0.8 + (1 - now) * 0.2;
				left = ((1 - now) * 50) + "%";
				opacity = 1 - now;
				current_fs.css({'left' : left});
				previous_fs.css({'transform' : 'scale('+ scale + ')','opacity' : opacity});
			},
			complete : function() {
				current_fs.hide();
				previous_fs.show();
				animating = false;
			}
		});
});

$(document).on("mouseenter","#hsFinense ",function(){
//	alert("Hello");
    $(this).attr("src","img/dmiHs2.png");
});
$(document).on("mouseleave","#hsFinense ",function(){
//	alert("Hello");
	   $(this).attr("src","img/dmiHouse.png");
});
$(document).on("mouseenter","#pl ",function(){
//	alert("Hello");

    $(this).attr("src","img/money02.png");
});
$(document).on("mouseleave","#pl",function(){
//	alert("Hello");
	   $(this).attr("src","img/money.png");
});


$(document.body).on("change","#prmntAcm",function(){
	var id=$(this).parents("fieldset").attr("id");
	id="#"+id;
	if($(this).val() == "Rented")
	{
		$(""+id+" #prmntlandLoard ,#prmrentDiv").show();
	}
	else
		$(""+id+" #prmntlandLoard ,#prmrentDiv").hide();
});

//var countimg=0;
var img_array=[];
$scope.onselectImg = function($files,type) 
{           
//			alert("Hello");
			console.log("inside file select"+ type + " file:"+JSON.stringify($files));
			var img_type ='';
			for (var i = 0; i < $files.length; i++) 
			{    	
				fname=$files[0].name;
//		    	var re = (/\.(gif|jpg|jpeg|tiff|png)$/i);
		    	var re = (/\.(jpg)$/i);
				if(!re.exec(fname))
		    	{
			    	alert("Sorry..!! We can not upload your image. \n Only .Jpg images are allowed");
			    	break;
		    	}
				img_type = fname.split(".")[1];
				var $file = $files[i];
				var base64;
				var  reader=new FileReader();
				if ($files[i] && $file) {
					 var binaryString;
					 var size=((($files[i].size)/1024).toFixed(2)) +" Kb";
			         reader.onload = function(readerEvt){
			            binaryString = readerEvt.target.result;
//						base64 = btoa(binaryString);
			            switch (type){
			            case "ResidenceProof":
							$scope.selectImg20 = binaryString	
				        	img_array.push({kyc_name:$scope.addPrf,image:$scope.selectImg20.split(",")[1],type:img_type,reason:"Present Residence Address"});
							break;
						
			            case "PermanentPrf":
							$scope.selectImg1 = binaryString	
				        	img_array.push({kyc_name:$scope.PermanentPrf,image:$scope.selectImg1.split(",")[1],type:img_type,reason:"Permanent Address Proof"});
							break;
			           
			            case "dob":
							$scope.selectImg2 = binaryString	
				        	img_array.push({kyc_name:$scope.dobPrf,image:$scope.selectImg2.split(",")[1],type:img_type,reason:"Date of Birth"});
							break;		
							
			            case "IDProof":
							$scope.selectImg3 = binaryString	
				        	img_array.push({kyc_name:$scope.idPrf,image:$scope.selectImg3.split(",")[1],type:img_type,reason:"Identification No."});
							break;		
							
			            case "SgntrPrf":
							$scope.selectImg4 = binaryString	
				        	img_array.push({kyc_name:$scope.SignPrf,image:$scope.selectImg4.split(",")[1],type:img_type,reason:"Signature Proof"});
							break;		
							
			            case "pan":
							$scope.selectImg50 = binaryString	
				        	img_array.push({kyc_name:"pan",image:$scope.selectImg50.split(",")[1],type:img_type,reason:"PAN"});
							break;
						
			            case "appPhoto":
							$scope.selectImg6 = binaryString	
				        	img_array.push({kyc_name:"Applicant_photo",image:$scope.selectImg6.split(",")[1],type:img_type,reason:"Applicant Photo"});
							break;	
							
			  }
			      };
			        reader.readAsDataURL($files[i]);
			        $timeout(function() {
					}, 1000);
			}
		}
}

/*
* Author Sayali uploadallimg function to upload img one by one
*/
function UploadAllImgs(Ref,array,callType)
{
	for(var i=0 ; i<array.length ; i++){
		var json ={
				  "oHeader": {
				    "sAppID": Ref,  // application id
				    "sApplID": "1" // applicant id
				  },
				  "sRefID": Ref,
				  "oUpldDtl": {
				    "sFileID": "1", // ask yogesh
				    "sFileName": array[i].kyc_name,
				    "sFileType": array[i].type,
				    "sfileData": array[i].image,
				    "sStat": "", // ask yogesh
				    "sReason":array[i].reason // ask yogesh
				  }
				};
//		console.log("image JSon : "+JSON.stringify(json));
		uploadImage(json,callType);		
	}/*
	if(callType=="ipa")
		{
		 $scope.errHead="Submit";
	     $scope.errorMsg="Your application has been succesfully completed.";
		}*/
}

function uploadImage(json,callType)
{	$http({
			method : 'POST',
			url : baseUrl+'upload-image',
			data : json,
			headers : {'Content-Type' : 'application/json'}
		}).success(function(Response) 
		{ if(Response.sStatus == 'SUCCESS')
			{
				console.log("response for-"+JSON.stringify(Response));				
			}
		}).error(function(error) {
			$scope.serviceHitCount=$scope.serviceHitCount+1;
			if($scope.serviceHitCount<=3)
				{
				  uploadImage(json,callType);
				}
			else{
				$scope.serviceHitCount=1;
				$scope.error="Sorry we can not process your PAN request";
			}	
		});
	
}

$scope.dcsnPtrn=/(Declined|Approved|OnHold)$/i;
$scope.check_status=function()
{
if($rootScope.template == "DMIApplication")
{
	var json = $scope.statusJSON;
//	console.log("check status josn:"+JSON.stringify(json));
	$http({
		method : 'POST',
		url : baseUrl+'status',
//		url :"http://172.26.1.205:8080/gonogo/status",
		data : json,
		headers : {'Content-Type' : 'application/json'}
	}).success(function(data) 
			{ 
//					console.log("from data getting score-" + JSON.stringify(data));
// 					console.log("data.sAppStat"+data.sAppStat);
					if(typeof data.aCroDec != "undefined" && data.aCroDec != null && data.aCroDec.length >0)
					{ $(document.body).find("#apvAmt").val(data.aCroDec[0].dAmtAppr).siblings("help").show(); }
					$scope.dstatus = data.sAppStat;
					if(typeof data.oIntrmStat != "undefined" && data.oIntrmStat != null)
					{
					 if(data.oIntrmStat.sPanStat == "NOT_AUTHORIZED")
						{	$("#vpc").fadeIn("500");
							$scope.pstatus=data.oIntrmStat.sPanStat;
						}
					 if(data.oIntrmStat.sCblScore == "COMPLETE")
					 {	$("#cs").fadeIn("500");
						$scope.Cstatus=data.oIntrmStat.oCibilResult.sMsg;
					 }
					 if(data.oIntrmStat.sAppStat == "VERIFIED")
					 {	$("#as").fadeIn("500");
						$scope.Astatus=data.aAppScoRslt[1].sMsg;
					 }
					}
					if(data.sAppStat =="Declined")
					{
						$("#dimg").attr("src","img/reject.png").show();
						$("#postIPA").show();
						stop_timer();
					}
					else if(data.sAppStat =="Approved")
					{
//						$scope.scmService();
						$("#dimg").attr("src","img/approve.png").show();
						$("#postIPA").show();
						stop_timer();
					}
					else if(data.sAppStat =="Queue")
					{
						$("#dimg").attr("src","img/queue_status.png").show();						
						stop_timer();
					}
					else if(data.sAppStat =="OnHold")
					{
						$("#dimg").attr("src","../img/pending.png").show();
						$("#postIPA").show();
						stop_timer();
					}
					
			}).error(function(data) 
			{
				
				console.log("Getting error from score decesion....");
				$scope.serviceHitCount=$scope.serviceHitCount+1;
				if($scope.serviceHitCount<=3)
					{
					 $scope.check_status();
					}
				else{
					$scope.serviceHitCount=1;
					$scope.error="Sorry we can not process your Check Status request";
				}	
			});
	if(!$scope.dcsnPtrn.test($scope.dstatus))
	{
	  setTimeout(function(){  // set app score
		$scope.check_status();
	   },3000);
	}
}
}

$scope.remove_file = function(filetype, id, index) {
	if(id == 1){  $scope.selectImg20 = "";}
	else if(id == 2){		$scope.selectImg1 = "";}
	else if(id == 3){	$scope.selectImg2 = "";}
	else if(id == 4){	$scope.selectImg3 = "";}
	else if(id == 5){	$scope.selectImg4 = "";}
	else if(id == 6){	$scope.selectImg50 = "";}
	else if(id == 7){	$scope.selectImg6 = "";}
	else if(id == 8){	$scope.selectImg7 = "";}
	
};// end file remove method


$(document.body).on("click",".RMVbankDeatil",function(){
	bDtl = bDtl-1;
	if(bDtl == 1)
		{$(this).hide()}
	else
		{$(this).show()}
	$("#bankingClone").find('div').first().remove();	
	});
	$(document.body).on("click",".RMVloanDeatil",function(){
		lnDtl = lnDtl-1;
		if(lnDtl == 1)
		{$(this).hide()}
		else
		{$(this).show()}
		$("#CloanLoan").find('div').first().remove();	
		});
	$(document.body).on("click",".eduimg",function(){
		$(this).attr("src","img/education.png");
		$(".trvlimg").attr("src","img/travel02.png");
		$(".healthimg").attr("src","img/health02.png");
	});

	$(document.body).on("click",".trvlimg",function(){
		$(".eduimg").attr("src","img/education02.png");
		$(".trvlimg").attr("src","img/travel.png");
		$(".healthimg").attr("src","img/health02.png");
	});
	
	$(document.body).on("click",".healthimg",function(){
		$(".eduimg").attr("src","img/education02.png");
		$(".trvlimg").attr("src","img/travel02.png");
		$(".healthimg").attr("src","img/health.png");
	});
	
	
$(document.body).on("click",".Home",function(){
	  location.reload();
});

$(document.body).on("change","#propSts",function(){
	if($(this).val() == "No")
		{
		$("#paddrow ,#PropSel").hide()
		}
	else
		{
		$("#paddrow ,#PropSel").show();
		}
});

//$scope.stateChanged =function()
$(document.body).on("change","#same",function(){
	//alert("Hello");
	var id=$(this).parents("fieldset").attr("id");
	var option= $(this).prop("checked");
	if(option == true)
	{
	$("#"+id+" #PermanentAddressContainer").hide();
	}
	else
	{ 
	$("#"+id+" #PermanentAddressContainer ").show();
	}
});

});



//
angular.module('gonogo').directive('rupees', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl) {
          var formate = function(inputValue) {
            if (inputValue == undefined) inputValue = '';
            var rupee = torupee(inputValue);
            if (rupee !== inputValue) {
              modelCtrl.$setViewValue(rupee);
              modelCtrl.$render();
            }
            return rupee;
          }
          function torupee(x) {
  			x=x.toString().replace(/,/g,'');
  			if(x.length > 3)
  			{ var lastThree = x.substring(x.length-3);
  			  var otherNumbers = x.substring(0,x.length-3);
  			  if(otherNumbers != '')
  				{ lastThree = ',' + lastThree; }
  			  var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
  			  return res;
  			}else{
  				return x;
  			}
  		}
          modelCtrl.$parsers.push(formate);
          formate(scope[attrs.ngModel]); // capitalize initial value
        }
      };
    });


angular.module('gonogo').directive('initcap', function (){
	return {
		require: 'ngModel',
		link: function(scope, element, attrs, modelCtrl) {
			var capitalize = function(inputValue) {
				if(inputValue == undefined) inputValue = '';
				var capitalized = inputValue.replace(/^(.)|\s(.)/g, function(v){ return v.toUpperCase( ); });
				if(capitalized !== inputValue) {
					modelCtrl.$setViewValue(capitalized);
					modelCtrl.$render();
				}         
				return capitalized;
			}
			modelCtrl.$parsers.push(capitalize);
			capitalize(scope[attrs.ngModel]);  // capitalize initial value
		}
	};
});

angular.module('gonogo').directive('capitalize', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl) {
          var capitalize = function(inputValue) {
            if (inputValue == undefined) inputValue = '';
            var capitalized = inputValue.toUpperCase();
            if (capitalized !== inputValue) {
              modelCtrl.$setViewValue(capitalized);
              modelCtrl.$render();
            }
            return capitalized;
          }
          modelCtrl.$parsers.push(capitalize);
          capitalize(scope[attrs.ngModel]); // capitalize initial value
        }
      };
    });

}).call(this)