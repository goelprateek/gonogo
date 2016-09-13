;
(function() {


    'use strict';

    var app = angular.module('gonogo.factories', []);

    app.factory("addrType", function() {
            var addrType;
            return addrType = [{ value: 'selected', name: 'Please Select Addr Type' },
                { value: 'Residence', name: 'Residence' },
                { value: 'Office', name: 'Office' },
                { value: 'Permanent', name: 'Permanent' }
            ];
        }),

        app.factory("phoneData", function() {
            var phoneData;
            return phoneData = [{ value: 'OFFICE_PHONE', name: 'Office Phone' },
                { value: 'RESIDENCE_PHONE', name: 'Residence Phone' },
                { value: 'PERSONAL_PHONE', name: 'Personal Phone' },
                { value: 'PERSONAL_MOBILE', name: 'Personal Mobile' },
                { value: 'RESIDENCE_MOBILE', name: 'Residence Mobile' },
                { value: 'OFFICE_MOBILE', name: 'Office Mobile' }
            ];
        }),

        app.factory("dataset", function() {
            var dataset;
            return dataset = [{
                'Name': 'Auto Loan',
                'ID': '0',
                'Icon': 'images/icons-auto.png',
                'Count': '2',
                'Type': 'Approve',
                'Offers': [{ 'Name': 'Refinance your Auto Loan at 12% APR', 'Icon': 'images/icons-auto.png' },
                    { 'Name': 'Get up-to 60% discounts on Auto Insurance ', 'Icon': 'images/icons-auto.png' }
                ]
            }, {
                'Name': 'Personal Loan',
                'ID': '1',
                'Icon': 'images/icon-personal-loan.png',
                'Count': '1',
                'Type': 'Approve',
                'Offers': [{ 'Name': 'Avail 10% of your sanctioned Home Loan amount at zero processing charges', 'Icon': 'images/icon-personal-loan.png' }]
            }, {
                'Name': 'Credit Card',
                'ID': '2',
                'Icon': 'images/Credit_Card.png',
                'Count': '4',
                'Type': 'Approve',
                'Offers': [{ 'Name': '5000 INR cash-back if you pay the Home Loan processing fee using your new credit card', 'Icon': 'images/Credit_Card.png' },
                    { 'Name': '0% on New purchases for the first three months ', 'Icon': 'images/Credit_Card.png' },
                    { 'Name': 'Credit Card with no credit limit cap', 'Icon': 'images/Credit_Card.png' },
                    { 'Name': 'Consolidate your balances for 6% APR for the first 6 months', 'Icon': 'images/Credit_Card.png' }
                ]
            }, {
                'Name': 'Home Insurance',
                'ID': '3',
                'Icon': 'images/Home_Insurance.png',
                'Count': '3',
                'Type': 'Approve',
                'Offers': [{ 'Name': '50% discount on Premium for long-term Home Insurance policy ', 'Icon': 'images/Home_Insurance.png' },
                    { 'Name': '10% discount on the Home Content Insurance for covers upto 4 Lakh Rupees ', 'Icon': 'images/Home_Insurance.png' },
                    { 'Name': 'Protect your home for 20 years with a single premium', 'Icon': 'images/Home_Insurance.png' }
                ]
            }];
        }),

        app.factory("aplcntType", function() {
            var aplcntType;
            return aplcntType = [{ value: "SAL", "text": "Salaried" },
                { value: "SEB", "text": "Self Employed Business" },
                { value: "SEP", "text": "Self Employed Professional" }
            ];
        }),

        app.factory("SelectArrays", function() {

            var _getResidenceTypes = function() {
                    return [{ value: "OWNED-BUNGLOW", "text": "OWNED-BUNGLOW" },
                        { value: "OWNED-CHAWL", "text": "OWNED-CHAWL" },
                        { value: "OWNED-FLAT", "text": "OWNED-FLAT" },
                        { value: "OWNED-PENTHOUSE", "text": "OWNED-PENTHOUSE" },
                        { value: "OWNED-ROWHOUSE", "text": "OWNED-ROWHOUSE" },
                        { value: "RENTED-BUNGLOW", "text": "RENTED-BUNGLOW" },
                        { value: "RENTED-CHAWL", "text": "RENTED-CHAWL" },
                        { value: "RENTED-FLAT", "text": "RENTED-FLAT" },
                        { value: "RENTED-PENTHOUSE", "text": "RENTED-PENTHOUSE" },
                        { value: "RENTED-ROWHOUSE", "text": "RENTED-ROWHOUSE" },
                        { value: "RENTED-BACHELOR ACCOMODATION", "text": "RENTED-BACHELOR ACCOMODATION" },
                        { value: "COMPANY PROVIDED-FLAT", "text": "COMPANY PROVIDED-FLAT" },
                        { value: "PARENT OWNED-HOUSE", "text": "PARENT OWNED-HOUSE" },
                        { value: "PARENT OWNED-FLAT", "text": "PARENT OWNED-FLAT" },
                        { value: "COMPANY PROVIDED-HOUSE", "text": "COMPANY PROVIDED-HOUSE" }
                    ];
                },
                _getAddrType = function() {
                    return [{ value: 'selected', name: 'Please Select Addr Type' },
                        { value: 'Residence', name: 'Residence' },
                        { value: 'Office', name: 'Office' },
                        { value: 'Permanent', name: 'Permanent' }
                    ];

                },
                _getEmploymentType = function() {
                    var employmentType;
                    employmentType = ["SELF-EMPLOYED", "PROFESSIONAL", "RETIRED", "SALARIED", "OTHERS"];
                    return employmentType

                },
                _getOfferData = function() {
                    return [{
                        'Name': 'Address Proof',
                        'ID': '0',
                        'Icon': 'images/address-proof.png',
                        'Count': '1',
                        'Type': 'Approve',
                        'Offers': [{ 'Name': 'Valid Passport', 'Icon': 'images/address-proof.png', 'Code': '101' },
                            { 'Name': 'Latest Electricity Bill', 'Icon': 'images/address-proof.png', 'Code': '102' },
                            { 'Name': 'Telephone Bill', 'Icon': 'images/address-proof.png', 'Code': '103' },
                            { 'Name': 'Driving License', 'Icon': 'images/address-proof.png', 'Code': '104' },
                            { 'Name': 'Ration Card', 'Icon': 'images/address-proof.png', 'Code': '105' },
                            { 'Name': 'Bank Account Statement/Pass Book 1st page', 'Icon': 'images/address-proof.png', 'Code': '106' },
                            { 'Name': 'Rent Agreement', 'Icon': 'images/address-proof.png', 'Code': '107' },
                            { 'Name': 'Gas Connection Bill or Post Paid Mobile Bill with full address ', 'Icon': 'images/address-proof.png', 'Code': '108' },
                            { 'Name': 'Property Tax receipt or Water Bill', 'Icon': 'images/address-proof.png', 'Code': '109' },
                            { 'Name': 'Voter’s Identity card', 'Icon': 'images/address-proof.png', 'Code': '110' },
                            { 'Name': 'Aadhar UID Card', 'Icon': 'images/address-proof.png', 'Code': '111' }
                        ]
                    }, {
                        'Name': 'DOB Proof',
                        'ID': '1',
                        'Icon': 'images/date of birth proof.png',
                        'Count': '2',
                        'Type': 'Approve',
                        'Offers': [{ 'Name': 'Valid Passport', 'Icon': 'images/date of birth proof.png', 'Code': '101' },
                            { 'Name': 'PAN Card', 'Icon': 'images/date of birth proof.png', 'Code': '112' },
                            { 'Name': 'Driving License', 'Icon': 'images/date of birth proof.png', 'Code': '104' },
                            { 'Name': 'Birth Certificate (Govt agency)', 'Icon': 'images/date of birth proof.png', 'Code': '113' },
                            { 'Name': 'School Leaving certificate (10th/12th)', 'Icon': 'images/date of birth proof.png', 'Code': '114' },
                            { 'Name': 'Voter ID Card', 'Icon': 'images/date of birth proof.png', 'Code': '110' },
                            { 'Name': 'Pension Certificate / Govt. ID Card / Aadhar UID Card', 'Icon': 'images/date of birth proof.png', 'Code': '111' }
                        ]
                    }, {
                        'Name': 'Identification Proof',
                        'ID': '2',
                        'Icon': 'images/identification number.png',
                        'Count': '3',
                        'Type': 'Approve',
                        'Offers': [{ 'Name': 'Valid Passport', 'Icon': 'images/identification number.png', 'Code': '101' },
                            { 'Name': 'PAN Card', 'Icon': 'images/identification number.png', 'Code': '112' },
                            { 'Name': 'Driving License', 'Icon': 'images/identification number.png', 'Code': '104' },
                            { 'Name': 'Voter’s Identity Card', 'Icon': 'images/identification number.png', 'Code': '110' },
                            { 'Name': 'Aadhar UID card', 'Icon': 'images/identification number.png', 'Code': '111' },
                            { 'Name': 'Bank Passbook with photo', 'Icon': 'images/identification number.png', 'Code': '115' }
                        ]
                    }, {
                        'Name': 'Signature Proof',
                        'ID': '3',
                        'Icon': 'images/signature proof.png',
                        'Count': '4',
                        'Offers': [{ 'Name': 'Signature verification from bank', 'Icon': 'images/signature proof.png', 'Code': '116' },
                            { 'Name': 'Passport Copy', 'Icon': 'images/signature proof.png', 'Code': '101' },
                            { 'Name': 'PAN Card', 'Icon': 'images/signature proof.png', 'Code': '112' },
                            { 'Name': 'Driving license with photograph and signature', 'Icon': 'images/signature proof.png', 'Code': '104' },
                            { 'Name': 'Clearance of processing fees cheque', 'Icon': 'images/signature proof.png', 'Code': '117' }
                        ]
                    }, {
                        'Name': 'Rejected Proof',
                        'ID': '4',
                        'Icon': 'images/rejected proof.png',
                        'Count': '5',
                        'Offers': []
                    }];
                }
            return {
                getResidenceTypes: _getResidenceTypes,
                getAddrType: _getAddrType,
                getOfferData: _getOfferData,
                getEmploymentType: _getEmploymentType
            };
        }),

        app.factory("ApplyObject", function() {
            var _obj = {
                "suspected": "No",
                "creditCard": "",
                "gender": "Male",
                "education": "",
                "maritalStat": "Single",
                "dob": "",
                "constitution": "",
                "sameAbove": false,
                "application": {
                    "loanType": "Consumer Durables",
                    "loanAmt": "",
                    "tenor": ""
                },
                "aKycDocs": [],
                "empl": {
                    "emplType": "",
                    "emplMob": "",
                    "emplLandLine": "",
                    "emplStd": "",
                    "emplITReturn": "",
                    "emplSalary": "",
                    "emplMonthWithEmp": "",
                    "emplName": "",
                    "emplEmail": "",
                    "emplState": "",
                    "emplCity": "",
                    "emplPin": "",
                    "emplAddr1": "",
                    "emplAddr2": "",
                    "emplAddr3": ""
                },
                "oResidence": {
                    "oAddress": {
                        "addrType": "",
                        "sAddress1": "",
                        "sAddress2": "",
                        "sAddress3": "",
                        "sState": "",
                        "sCity": "",
                        "sPinCode": "",
                        "addrType": "",
                        "iMonthCity": "",
                        "dRentPerMonth": "",
                        "iMonthAddress": ""
                    },
                    "oPhone": {
                        "iMobile": "",
                        "iLandLine": "",
                        "sStdCode": ""
                    },
                    "sEmail": ""
                },
                "oPermanent": {
                    "oAddress": {
                        "addrType": "",
                        "sAddress1": "",
                        "sAddress2": "",
                        "sAddress3": "",
                        "sState": "",
                        "sCity": "",
                        "sPinCode": "",
                        "addrType": "",
                        "iMonthCity": "",
                        "dRentPerMonth": "",
                        "iMonthAddress": ""
                    },
                    "oPhone": {
                        "iMobile": "",
                        "iLandLine": "",
                        "sStdCode": ""
                    },
                    "sEmail": ""
                },
                "asset": {
                    "category": "",
                    "make": "",
                    "model": ""
                }
            };
            return {
                dummy: _obj
            }
        });


    app.factory('ObjectStore', ['$q', function($q) {

        function NotifyObject() {

            var object;
            object = {

                "applicationLog": {},
                "sRefID": "",
                "bStatFlag": "",
                "iNoReTry": "",
                "oAppReq": {
                    "sInstId": "",
                    "sUserId": "",
                    "sPassword": "",
                    "sRefID": "",
                    "oHeader": {
                        "sAppID": "",
                        "sInstID": "",
                        "sSourceID": "",
                        "sAppSource": "",
                        "sReqType": "",
                        "dtSubmit": "",
                        "sDsaId": "",
                        "sCroId": "",
                        "sDealerId": ""
                    },
                    "oReq": {
                        "oApplicant": {
                            "residenceAddSameAsAbove": "",
                            "sApplID": "",
                            "oApplName": {
                                "sFirstName": "",
                                "sMiddleName": "",
                                "sLastName": "",
                                "sPrefix": "",
                                "sSuffix": ""
                            },
                            "oFatherName": "",
                            "oSpouseName": "",
                            "sReligion": "",
                            "sApplGndr": "",
                            "sDob": "",
                            "iAge": "",
                            "sMarStat": "",
                            "aKycDocs": [{
                                "sKycName": "",
                                "sKycNumber": "",
                                "sKycStat": "",
                                "sIssueDate": "",
                                "sExpiryDate": ""
                            }],
                            "bSameAbove": "",
                            "aAddr": [{
                                "sLine1": "",
                                "sLine2": "",
                                "sCity": "",
                                "iPinCode": "",
                                "sState": "",
                                "sCountry": "",
                                "sLandLoard": "",
                                "sLine3": "",
                                "sLine4": "",
                                "sVillage": "",
                                "sDistrict": "",
                                "fDistFrom": "",
                                "sLandMark": "",
                                "sAccm": "",
                                "iTimeAtAddr": "",
                                "sAddrType": "",
                                "sResAddrType": "",
                                "iMonthAtCity": "",
                                "iMonthAtAddr": "",
                                "dRentAmt": "",
                                "iYearAtCity": ""
                            }],
                            "aPhone": [{
                                "sPhoneType": "",
                                "sAreaCode": "",
                                "sCountryCode": "",
                                "sPhoneNumber": "",
                                "sExt": ""
                            }],
                            "aEmail": [{
                                "sEmailType": "",
                                "sEmailAddr": ""
                            }],
                            "aEmpl": [{
                                "sEmplType": "",
                                "sEmplName": "",
                                "iTmWithEmplr": "",
                                "sDtJoin": "",
                                "sDtLeave": "",
                                "dmonthSal": "",
                                "dGrossSal": "",
                                "aLastMonthIncome": [],
                                "sConst": "",
                                "sItrID": "",
                                "dItrAmt": "",
                                "sDesig": "",
                                "sEmplrCode": "",
                                "sEmplrBr": "",
                                "sModePayment": "",
                                "sDeptmt": "",
                                "sWorkExps": "",
                                "sBusinesName": "",
                                "dtComencemnt": ""
                            }],
                            "iNoOfDep": "",
                            "iEarnMem": "",
                            "iFamilyMem": "",
                            "oApplRef": "",
                            "sEdu": "",
                            "sCreditCardNum": "",
                            "bMobVer": "",
                            "sAdharVer": "",
                            "aBankingDetails": "",
                            "aLoanDetails": "",
                            "oIncomeDetails": "",
                            "oSurrogate": ""
                        },
                        "aCoApplicant": "",
                        "oApplication": {
                            "sAppID": "",
                            "sLoanType": "",
                            "sAppliedFor": "",
                            "dLoanAmt": "",
                            "iLoanTenor": "",
                            "oProperty": "",
                            "sLnPurp": "",
                            "dLnApr": "",
                            "dEmi": "",
                            "iAdvEmi": "",
                            "dMarginAmt": "",
                            "aAssetDetail": [
                                /* {
                                     "sAssetCtg": "",
                                     "sDlrName": "",
                                     "sAssetMake": "",
                                     "sModelNo": "",
                                     "sPrice": ""
                                 }*/
                            ],
                            "aOwndAst": ""
                        },
                        "sSuspAct": ""
                    },
                    "sRespFormat": "",
                    "sCurrentStageId": ""
                },
                "oCompRes": {
                    "multiBureauJsonRespose": {},
                    "scoringServiceResponse": {
                        "ELIGIBILITY_RESPONSE": {
                            "ElgbltyID": "",
                            "GridID": "",
                            "FOIR_AMOUNT": "",
                            "APPROVED_AMOUNT": "",
                            "Error": "",
                            "DECISION": "",
                            "COMPUTE_DISP": "",
                            "COMPUTE_LOGIC": "",
                            "MAX_AMOUNT": "",
                            "MIN_AMOUNT": "",
                            "DP": "",
                            "MAX_TENOR": "",
                            "REMARK": "",
                            "COMPUTED_AMOUNT": "",
                            "ELIGIBILITY_AMOUNT": "",
                            "CNT": "",
                            "RULE-SEQ": "",
                            "GRID_EXP": ""
                        },
                        "DECISION_RESPONSE": {
                            "RuleID": "",
                            "Decision": "",
                            "Details": [{
                                "CriteriaID": "",
                                "RuleName": "",
                                "Outcome": " ",
                                "Remark": "",
                                "Exp": "",
                                "Value": "",
                                "Values": {
                                    "SCORE_VALUE": "",
                                    "NEG_PINCODE_CHECK": ""
                                }
                            }]
                        }
                    }
                },
                "oIntrmStat": {
                    "sRefId": "",
                    "sAppID": "",
                    "sInstID": "",
                    "dtStart": "",
                    "dtETime": "",
                    "sAppStart": "",
                    "sDedupe": "",
                    "sEmailStat": "",
                    "sOtpStat": "",
                    "sAppStat": "",
                    "sPanStat": "",
                    "sAadharStat": "",
                    "sMbStat": "",
                    "sVarScoreStat": "",
                    "sScoreStat": "",
                    "sCblScore": "",
                    "sCroStat": "",
                    "oPanResult": {
                        "sCustID": "",
                        "sFldName": "",
                        "iOrder": "",
                        "sFldVal": "",
                        "sMsg": "",
                        "iAddrStblty": "",
                        "fNameScore": ""
                    },
                    "aCoApplicant": "",
                    "oApplication": {
                        "sAppID": "",
                        "sLoanType": "",
                        "sAppliedFor": "",
                        "dLoanAmt": "",
                        "iLoanTenor": "",
                        "oProperty": "",
                        "sLnPurp": null,
                        "dLnApr": "",
                        "dEmi": "",
                        "iAdvEmi": "",
                        "dMarginAmt": "",
                        "aAssetDetail": [{
                            "sAssetCtg": "",
                            "sDlrName": "",
                            "sAssetMake": "",
                            "sModelNo": "",
                            "sPrice": ""
                        }],
                        "aOwndAst": ""
                    },
                    "oResAddressResult": {
                        "sCustID": "",
                        "sFldName": "",
                        "iOrder": "",
                        "sFldVal": "",
                        "sMsg": "",
                        "iAddrStblty": "",
                        "fNameScore": ""
                    },
                    "oOffAddressResult": {
                        "sCustID": "",
                        "sFldName": "",
                        "iOrder": "",
                        "sFldVal": "",
                        "sMsg": "",
                        "iAddrStblty": "",
                        "fNameScore": ""
                    },
                    "oScoringResult": {
                        "sCustID": "",
                        "sFldName": "",
                        "iOrder": "",
                        "sFldVal": "",
                        "sMsg": "",
                        "iAddrStblty": "",
                        "fNameScore": ""
                    },
                    "oAadharResult": "",
                    "oExperianResult": "",
                    "oEquifaxResult": "",
                    "oCHMResult": "",
                    "oMbResult": ""
                },
                "aCroDec": [{
                    "dAmtAppr": "",
                    "dItrRt": "",
                    "dDpay": "",
                    "dEmi": "",
                    "iTenor": "",
                    "dEligibleAmt": ""
                }],
                "bNegPinCodeFlag": "",
                "aAppScoRslt": "",
                "aDeDupe": [],
                "aAppImgDtl": [{
                    "sApplID": "",
                    "aImgMap": [{
                        "sImgID": "",
                        "sImgType": "",
                        "sStat": "",
                        "sReason": ""
                    }],
                    "sImageBlock": ""
                }]
            };
            return object;

        };

        function analyticsObject() {
            var obj;
            obj = {
                "applicationLog": {},
                "sRefID": "",
                "bStatFlag": "",
                "iNoReTry": "",
                "oAppReq": {
                    "sInstId": "",
                    "sUserId": "",
                    "sPassword": "",
                    "sRefID": "",
                    "oHeader": {
                        "sAppID": "",
                        "sInstID": "",
                        "sSourceID": "",
                        "sAppSource": "",
                        "sReqType": "",
                        "dtSubmit": "",
                        "sDsaId": "",
                        "sCroId": "",
                        "sDealerId": ""
                    },
                    "oReq": {
                        "oApplicant": {
                            "residenceAddSameAsAbove": "",
                            "sApplID": "",
                            "oApplName": {
                                "sFirstName": "",
                                "sMiddleName": "",
                                "sLastName": "",
                                "sPrefix": "",
                                "sSuffix": ""
                            },
                            "oFatherName": "",
                            "oSpouseName": "",
                            "sReligion": "",
                            "sApplGndr": "",
                            "sDob": "",
                            "iAge": "",
                            "sMarStat": "",
                            "aKycDocs": [{
                                "sKycName": "",
                                "sKycNumber": "",
                                "sKycStat": "",
                                "sIssueDate": "",
                                "sExpiryDate": ""
                            }],
                            "bSameAbove": "",
                            "aAddr": [{
                                "sLine1": "",
                                "sLine2": "",
                                "sCity": "",
                                "iPinCode": "",
                                "sState": "",
                                "sCountry": "",
                                "sLandLoard": "",
                                "sLine3": "",
                                "sLine4": "",
                                "sVillage": "",
                                "sDistrict": "",
                                "fDistFrom": "",
                                "sLandMark": "",
                                "sAccm": "",
                                "iTimeAtAddr": "",
                                "sAddrType": "",
                                "sResAddrType": "",
                                "iMonthAtCity": "",
                                "iMonthAtAddr": "",
                                "dRentAmt": "",
                                "iYearAtCity": ""
                            }],
                            "aPhone": [{
                                "sPhoneType": "",
                                "sAreaCode": "",
                                "sCountryCode": "",
                                "sPhoneNumber": "",
                                "sExt": ""
                            }],
                            "aEmail": [{
                                "sEmailType": "",
                                "sEmailAddr": ""
                            }],
                            "aEmpl": [{
                                "sEmplType": "",
                                "sEmplName": "",
                                "iTmWithEmplr": "",
                                "sDtJoin": "",
                                "sDtLeave": "",
                                "dmonthSal": "",
                                "dGrossSal": "",
                                "aLastMonthIncome": [],
                                "sConst": "",
                                "sItrID": "",
                                "dItrAmt": "",
                                "sDesig": "",
                                "sEmplrCode": "",
                                "sEmplrBr": "",
                                "sModePayment": "",
                                "sDeptmt": "",
                                "sWorkExps": "",
                                "sBusinesName": "",
                                "dtComencemnt": ""
                            }],
                            "iNoOfDep": "",
                            "iEarnMem": "",
                            "iFamilyMem": "",
                            "oApplRef": "",
                            "sEdu": "",
                            "sCreditCardNum": "",
                            "bMobVer": "",
                            "sAdharVer": "",
                            "aBankingDetails": "",
                            "aLoanDetails": "",
                            "oIncomeDetails": "",
                            "oSurrogate": ""
                        },
                        "aCoApplicant": "",
                        "oApplication": {
                            "sAppID": "",
                            "sLoanType": "",
                            "sAppliedFor": "",
                            "dLoanAmt": "",
                            "iLoanTenor": "",
                            "oProperty": "",
                            "sLnPurp": "",
                            "dLnApr": "",
                            "dEmi": "",
                            "iAdvEmi": "",
                            "dMarginAmt": "",
                            "aAssetDetail": [{
                                "sAssetCtg": "",
                                "sDlrName": "",
                                "sAssetMake": "",
                                "sModelNo": "",
                                "sPrice": ""
                            }],
                            "aOwndAst": ""
                        },
                        "sSuspAct": ""
                    },
                    "sRespFormat": "",
                    "sCurrentStageId": ""
                },
                "oCompRes": {
                    "multiBureauJsonRespose": {},
                    "scoringServiceResponse": {
                        "ELIGIBILITY_RESPONSE": {
                            "ElgbltyID": "",
                            "GridID": "",
                            "FOIR_AMOUNT": "",
                            "APPROVED_AMOUNT": "",
                            "Error": "",
                            "DECISION": "",
                            "COMPUTE_DISP": "",
                            "COMPUTE_LOGIC": "",
                            "MAX_AMOUNT": "",
                            "MIN_AMOUNT": "",
                            "DP": "",
                            "MAX_TENOR": "",
                            "REMARK": "",
                            "COMPUTED_AMOUNT": "",
                            "ELIGIBILITY_AMOUNT": "",
                            "CNT": "",
                            "RULE-SEQ": "",
                            "GRID_EXP": ""
                        },
                        "DECISION_RESPONSE": {
                            "RuleID": "",
                            "Decision": "",
                            "Details": [{
                                "CriteriaID": "",
                                "RuleName": "",
                                "Outcome": " ",
                                "Remark": "",
                                "Exp": "",
                                "Value": "",
                                "Values": {
                                    "SCORE_VALUE": "",
                                    "NEG_PINCODE_CHECK": ""
                                }
                            }]
                        }
                    }
                },
                "oIntrmStat": {
                    "sRefId": "",
                    "sAppID": "",
                    "sInstID": "",
                    "dtStart": "",
                    "dtETime": "",
                    "sAppStart": "",
                    "sDedupe": "",
                    "sEmailStat": "",
                    "sOtpStat": "",
                    "sAppStat": "",
                    "sPanStat": "",
                    "sAadharStat": "",
                    "sMbStat": "",
                    "sVarScoreStat": "",
                    "sScoreStat": "",
                    "sCblScore": "",
                    "sCroStat": "",
                    "oPanResult": {
                        "sCustID": "",
                        "sFldName": "",
                        "iOrder": "",
                        "sFldVal": "",
                        "sMsg": "",
                        "iAddrStblty": "",
                        "fNameScore": ""
                    },
                    "aCoApplicant": "",
                    "oApplication": {
                        "sAppID": "",
                        "sLoanType": "",
                        "sAppliedFor": "",
                        "dLoanAmt": "",
                        "iLoanTenor": "",
                        "oProperty": "",
                        "sLnPurp": null,
                        "dLnApr": "",
                        "dEmi": "",
                        "iAdvEmi": "",
                        "dMarginAmt": "",
                        "aAssetDetail": [{
                            "sAssetCtg": "",
                            "sDlrName": "",
                            "sAssetMake": "",
                            "sModelNo": "",
                            "sPrice": ""
                        }],
                        "aOwndAst": ""

                    },
                    "oResAddressResult": {
                        "sCustID": "",
                        "sFldName": "",
                        "iOrder": "",
                        "sFldVal": "",
                        "sMsg": "",
                        "iAddrStblty": "",
                        "fNameScore": ""
                    },
                    "oOffAddressResult": {
                        "sCustID": "",
                        "sFldName": "",
                        "iOrder": "",
                        "sFldVal": "",
                        "sMsg": "",
                        "iAddrStblty": "",
                        "fNameScore": ""
                    },
                    "oScoringResult": {
                        "sCustID": "",
                        "sFldName": "",
                        "iOrder": "",
                        "sFldVal": "",
                        "sMsg": "",
                        "iAddrStblty": "",
                        "fNameScore": ""
                    },
                    "oAadharResult": "",
                    "oExperianResult": "",
                    "oEquifaxResult": "",
                    "oCHMResult": "",
                    "oMbResult": ""
                },
                "aCroDec": [{
                    "dAmtAppr": "",
                    "dItrRt": "",
                    "dDpay": "",
                    "dEmi": "",
                    "iTenor": "",
                    "dEligibleAmt": ""
                }],
                "bNegPinCodeFlag": "",
                "aAppScoRslt": [{
                    "sCustID": "",
                    "sFldName": "",
                    "iOrder": "",
                    "sFldVal": "",
                    "sMsg": "",
                    "iAddrStblty": "",
                    "fNameScore": ""
                }],
                "aDeDupe": [],
                "aAppImgDtl": [{
                    "sApplID": "",
                    "aImgMap": [{
                        "sImgID": "",
                        "sImgType": "",
                        "sStat": "",
                        "sReason": ""
                    }],
                    "sImageBlock": ""
                }]
            }

            return obj;
        }

        function reportObject() {
            var reportConfig;
            return reportConfig = {
                "oColumns": [{
                    "sCloumnKey": "",
                    "sColDispName": "",
                    "sColIndex": 0,
                    "bViewable": false,
                    "bDownloadable": false
                }],
                "oReports": [{
                    "oHeader": {
                        "sAppID": null,
                        "sInstID": "",
                        "sSourceID": null,
                        "sAppSource": null,
                        "sReqType": null,
                        "dtSubmit": "",
                        "sDsaId": "",
                        "sCroId": null,
                        "sDealerId": null
                    },
                    "sReportId": "",
                    "aProductType": [
                        "Consumer Durables"
                    ],
                    "aFlatConfig": {
                        "fileHeader": "Phone1,Phone2,Phone2,Phone3,Date",
                        "mHeaderMap": {
                            "0": {
                                "sCloumnKey": "",
                                "sColDispName": "",
                                "sColIndex": 0,
                                "bViewable": false,
                                "bDownloadable": false
                            }
                        },
                        "sReportName": null,
                        "sReportType": null,
                        "sReportFomat": null,
                        "sHeader": null,
                        "sSeperator": ","
                    },
                    "sBranchId": null,
                    "sUserId": "",
                    "oPaggination": {
                        "iPageId": 1,
                        "iLimit": 1,
                        "iSkip": 0
                    }
                }, ]
            };
        }


        return {
            notify: NotifyObject,
            analytics: analyticsObject,
            report: reportObject
        }

    }]);


}).call(this)
