;(function(){

	'use strict';
	var app = angular.module('gng-ga',['gng-web-utils']);

	app.factory('GNG_GA',['UserService','WEB_UTILS',function(UserService,WEB_UTILS){

		var DIMENSION={
		 	DIMEN_VERSION_NAME : 1,//Version Name(Version Code)
		   	DIMEN_REFERENCE_ID : 2,
		    DIMEN_NETWORK_TYPE : 3,
		    DIMEN_DEVICE_INFO : 4,// name(AndroidV)
		    DIMEN_USER_ID : 5,
		    DIMEN_API_CALL : 6, // name of API
		    DIMEN_SCREEN_NAME : 7, //
		    DIMEN_LOCATION : 8, //
		    DIMEN_EXCEPTION : 9,
		    DIMEN_BROWSER : 10
	    }, //
	    SCREEN={
		    SCRN_LOGIN : "Login Screen",
		    SCRN_CDL_APPLY : "CDL Apply Screen",
		    SCRN_CDL_DEALER : "CDL Dealer Screen",
		    SCRN_CDL_DASHBOARD : "CDL Dashboard Screen",
		    SCRN_CDL_CUSTOMER_FORM : "CDL Customer Form Screen"
		},
	    CATEGORY={
		    CAT_BUTTON_CLICK : "Button_Click",
		    CAT_API_CALL : "Api_Call",
		    CAT_EXCEPTION : "Exception",
		    CAT_INTERNET_CHECK : "Internet_Check",
		    CAT_WEB_EVENT : "Web_Event",
		    CAT_PACKAGE_INFO : "package_info",
		},
		ACTION={
		    ACTION_API_FAIL : "fail",
		    ACTION_API_SUCCESS : "success",
		    ACTION_API_EXCEPTION : "parse_exception",


		    ACTION_EXCEPTION_PARSE : "parse_exception",
		    ACTION_EXCEPTION_UNDEFINED : "undefined",
		    ACTION_EXCEPTION_API_FAIL : "api_fail",
		    ACTION_EXCEPTION_OUT_OF_MEMORY : "out_of_meomory",
		    ACTION_EXCEPTION_NULLPOINTER : "nullpointer",


		    ACTION_ANDROID_EVENT_BACK_BUTTON : "BACK_BUTTON",
		    ACTION_INTERNET_CHECK_ONLINE : "internet_avail",
		    ACTION_INTERNET_CHECK_OFFLINE : "internet_not_avail",


		    ACTION_CLICK_LOGIN : "login",
		    ACTION_CLICK_DEALER_SELECTED : "dealer_selected",
		    ACTION_CLICK_GET_OTP : "get_otp",
		    ACTION_CLICK_VERIFY_OTP : "verify_otp",
		    ACTION_CLICK_RESEND_OTP : "resend_otp",
		    ACTION_CLICK_SKIP_OTP : "skip_otp",
		    ACTION_CLICK_DASHBOARD_DATA_TYPE : "dashboard_data_type",
		    ACTION_CLICK_DASHBOARD_SEARCH : "dashboard_search",
		    ACTION_CLICK_DASHBOARD_APPLICATION_CLICKED : "dashboard_application_clicked",
		    ACTION_CLICK_DASHBOARD_APPLICATION_MORE_CLICKED : "dashboard_application_more_clicked",
		    ACTION_CLICK_DASHBOARD_CIBIL_PDF : "dashboard_cibil_pdf",
		    ACTION_CLICK_DASHBOARD_DO_PDF : "dashboard_do_pdf",
		    ACTION_CLICK_DASHBOARD_RESTART : "dashboard_restart",
		    ACTION_CLICK_TIMER_SCREEN_CIBIL_PDF : "timer_cibil_pdf",
		    ACTION_CLICK_CRO_REASON_NEXT : "cro_reason_next",
		    ACTION_CLICK_DECISION_NEXT : "decision_next",
		    ACTION_CLICK_DECISION_CHANGE_ASSET : "decision_change_asset",
		    ACTION_CLICK_DECISION_SCHEME_SELECTION : "decision_scheme_selection",
		    ACTION_CLICK_DECISION_MARGIN_MONEY : "decision_margin_money",
		    ACTION_CLICK_CHANGE_ASSET_SAVE : "change_asset_save",
		    ACTION_CLICK_PD_DOCUMENT_PHOTO_CAPTURE : "pd_document_photo_capture",
		    ACTION_CLICK_PD_DOCUMENT_ADD : "pd_document_add",
		    ACTION_CLICK_PD_DOCUMENT_SAVE : "pd_document_save",
		    ACTION_CLICK_ON_HOLD_PHOTO_CAPTURE : "on_hold_photo_capture",
		    ACTION_CLICK_ON_HOLD_SAVE : "on_hold_save",
		    ACTION_CLICK_ZOOM_IN : "do_zoom_in",
		    ACTION_CLICK_ZOOM_OUT : "do_zoom_out",
		    ACTION_CLICK_DO_SEND : "do_send",
		    ACTION_CLICK_DO_CANCEL : "do_cancel",
		    ACTION_CLICK_SLIDER_OPEN : "slider_open",
		    ACTION_CLICK_SLIDER_CLOSE : "slider_close",
		    ACTION_CLICK_MENU_APPLY : "menu_apply",
		    ACTION_CLICK_MENU_DASHBOARD : "menu_dashboard",
		    ACTION_CLICK_MENU_ASSET_MASTER : "menu_asset_master",
		    ACTION_CLICK_MENU_LOGOUT : "menu_logout",


		    ACTION_CLICK_PERSONAL_INFO_CUSTOMER_PHOTO : "personal_info_customer_photo",
		    ACTION_CLICK_PERSONAL_INFO_NEXT : "personal_info_next",
		    ACTION_CLICK_ADDRESS_DETAIL_CHECK_AS_ABOVE : "address_detail_check_as_above",
		    ACTION_CLICK_ADDRESS_DETAI_NEXT : "address_detail_next",
		    ACTION_CLICK_ADDRESS_DETAIL_ADDRESS_DETAIL_PREVIOUS : "address_detail_previous",
		    ACTION_CLICK_EMPLOYER_SEARCH : "employer_search",
		    ACTION_CLICK_EMPLOYER_NEXT : "employer_next",
		    ACTION_CLICK_EMPLOYER_PREVIOUS : "employer_previous",
		    ACTION_CLICK_ASSET_NEXT : "asset_next",
		    ACTION_CLICK_ASSET_PREVIOUS : "asset_previous",
		    ACTION_CLICK_KYC_DOCUMENT_TYPE : "kyc_document_type",
		    ACTION_CLICK_KYC_DOCUMENT_ADD : "kyc_document_add",
		    ACTION_CLICK_KYC_SAVE : "kyc_document_save",
		    ACTION_CLICK_KYC_DOCUMENT_CANCEL : "kyc_document_cancel",
		    ACTION_CLICK_KYC_DOCUMENT_SUBMIT : "kyc_document_submit",
		    ACTION_CLICK_KYC_DOCUMENT_PREVIOUS : "kyc_document_previous",
		    ACTION_CLICK_KYC_PREVIOUS : "previous_clicked",
		    ACTION_CLICK_KYC_DOCUMENT_DELETE : "kyc_document_delete",
		    ACTION_CLICK_START_NEW_APPLICATION_NO : "start_new_application_no",
		    ACTION_CLICK_START_NEW_APPLICATION_YES : "start_new_application_yes",
		    ACTION_CLICK_APP_SAVE_DIALOG_YES : "app_save_dialog_yes",// button name save
		    ACTION_CLICK_APP_SAVE_DIALOG_NO : "app_save_dialog_no"
		},
		API={
		    API_LOGIN : "api_login",
		    API_GET_OTP : "api_get_otp",
		    API_STEP1 : "api_step1",
		    API_DASHBOARD_LIST : "api_dashboard_list",
		    API_DASHBOARD_GRAPH : "api_dashboard_graph",
		    API_DASHBOARD_APPLICATION_DETAILS : "api_dashboard_application_details",
		    API_STEP4 : "api_step4",
		    API_STEP3 : "api_step3",
		    API_CHECK_APPLICATION_STATUS : "api_check_application_status",
		    API_UPLOAD_IMAGE : "api_upload_image",
		    API_APPLICATION_RESET_STATUS : "api_application_reset_status",
		    API_PD_DE_STAGE_UPDATE : "api_pd_de_stage_update",
		    API_SCHEME_SELECTION : "api_scheme_selection",
		    API_DECISION_SUBMIT : "api_decision_submit",
		    API_DO_REFERENCEID : "api_do_referenceid",
		    API_CIBIL_PDF_DOWNLOAD : "api_cibil_pdf_download",
		    API_GET_IMAGE : "api_get_image",
		    API_APPLICATION_GET_IMAGE_LIST : "api_application_get_image_list",
		    API_SEND_DO : "api_send_do",
		    API_LOGOUT : "api_logout",
		    API_PINCODE_FETCH : "api_pincode_fetch",
		    API_EMPLOYER_FETCH : "api_employer_fetch",
		    API_ASSET_CATEGORY_FETCH : "api_asset_category_fetch",
		    API_ASSET_MAKE_FETCH : "api_asset_make_fetch",
		    API_ASSET_MODEL_FETCH : "api_asset_model_fetch",
		    API_POST_IPA_FETCH : "api_post_ipa_fetch",
		    API_POST_EKYC_GET_OTP : "api_ekyc_get_otp",
		    API_POST_EKYC_VERIFY_OTP : "api_ekyc_verify_otp"
		};

		return {
			getConstAPI:function(api) {
				return API[api];
			},
			getConstDimension:function(dim) {
				return DIMENSION[dim];
			},
			getConstAction:function(action) {
				return ACTION[action];
			},
			getConstCategory:function(category) {
				return CATEGORY[category];
			},
			getConstScreen:function(screen) {
				return SCREEN[screen];
			},			
			sendEvent:function(pScreenName,pCategory,pAction,pLabel,pValue,pApiName,pException,pReferenceID){
				/*$analytics.eventTrack(pAction, {  category: pCategory, label: pLabel });*/

				var dimensions={};
				dimensions['dimension'+ this.getConstDimension("DIMEN_REFERENCE_ID")]="1.0";
				dimensions['dimension'+ this.getConstDimension("DIMEN_USER_ID")]=UserService.getCurrentUser().username;
				dimensions['dimension'+ this.getConstDimension("DIMEN_API_CALL")]=pApiName;
				dimensions['dimension'+ this.getConstDimension("DIMEN_SCREEN_NAME")]=pScreenName;
				dimensions['dimension'+ this.getConstDimension("DIMEN_BROWSER")]=WEB_UTILS.getBrowser();

				ga('send', 'event', pCategory, pAction, dimensions);
			}
		};
	}]);
}).call(this);