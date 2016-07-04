;(function(){


	'use strict';

	app.module('gonogo.factories',[]);

	var app  = app.module("app.ui.metadata",[]);
	
	app.factory("timeataddress",['$scope',function($scope){
		var timeataddress;
		return timeataddress = [ { value: 'select', name: 'Select Time @ address'},
	                         { value: '5', name: 'Less than 6 months'},
	                         { value: '11', name: '6 to 12 months'},
	                         { value: '15', name: '1 to 3 years'},
	                         { value: '37', name: 'More than 3 years'}					          
	                         ];
	}]),

	app.factory("timeataddress",['$scope',function($scope){
		var jobType;
		return  jobType = [{value:'selected', name:'Please Select Employment'},
	                  {value:'Professional', name:'Professional'},
	                  {value:'Business', name:'Bussiness'},
	                  {value:'Job', name:'Job'}
	                  ];
	}]),

	app.factory("addrType",['$scope',function($scope){
		var addrType;
		return addrType = [{value:'selected', name:'Please Select Addr Type'},
	                  {value:'Residence', name:'Residence'},
	                  {value:'Office', name:'Office'},
	                  {value:'Permanent', name:'Permanent'}
	                  ]; 
	}]),

	app.factory("phoneData",['$scope', function($scope){
		var phoneData ;
		return phoneData = [{value:'OFFICE_PHONE', name:'Office Phone'},
                      {value:'RESIDENCE_PHONE',name:'Residence Phone'},
                      {value:'PERSONAL_PHONE',name:'Personal Phone'},
   	                  {value:'PERSONAL_MOBILE', name:'Personal Mobile'},
   	                  {value:'RESIDENCE_MOBILE', name:'Residence Mobile'},
   	                  {value:'OFFICE_MOBILE', name:'Office Mobile'}
   	                  ];
	}]),

	app.factory("dataset",['$scope',function($scope){
		var dataset;
		return dataset = [{'Name':'Auto Loan',
		'ID':'0',
		'Icon':'images/icons-auto.png',
		'Count':'2',
		'Type' : 'Approve',
		'Offers':[{'Name':'Refinance your Auto Loan at 12% APR','Icon':'images/icons-auto.png'},
		          {'Name':'Get up-to 60% discounts on Auto Insurance ','Icon':'images/icons-auto.png'}]
		},
		{'Name':'Personal Loan',
			'ID':'1',
			'Icon':'images/icon-personal-loan.png',
			'Count':'1',
			'Type' : 'Approve',
			'Offers':[{'Name':'Avail 10% of your sanctioned Home Loan amount at zero processing charges','Icon':'images/icon-personal-loan.png'}]
		},
		{'Name':'Credit Card',
			'ID':'2',
			'Icon':'images/Credit_Card.png',
			'Count':'4',
			'Type' : 'Approve',
			'Offers':[{'Name':'5000 INR cash-back if you pay the Home Loan processing fee using your new credit card','Icon':'images/Credit_Card.png'},
			          {'Name':'0% on New purchases for the first three months ','Icon':'images/Credit_Card.png'},
			          {'Name':'Credit Card with no credit limit cap','Icon':'images/Credit_Card.png'},
			          {'Name':'Consolidate your balances for 6% APR for the first 6 months','Icon':'images/Credit_Card.png'}]
		},
		{'Name':'Home Insurance',
			'ID':'3',
			'Icon':'images/Home_Insurance.png',
			'Count':'3',
			'Type' : 'Approve',
			'Offers':[{'Name':'50% discount on Premium for long-term Home Insurance policy ','Icon':'images/Home_Insurance.png'},
			          {'Name':'10% discount on the Home Content Insurance for covers upto 4 Lakh Rupees ','Icon':'images/Home_Insurance.png'},
			          {'Name':'Protect your home for 20 years with a single premium','Icon':'images/Home_Insurance.png'}]
		}];
	}]),

	app.factory("aplcntType", ['$scope',  function($scope){
		var aplcntType;
		return aplcntType = [{value:"SAL","text":"Salaried"},
				               	{value:"SEB","text":"Self Employed Business"},
				               	{value:"SEP","text":"Self Employed Professional"}];
	}])

}).call(this)