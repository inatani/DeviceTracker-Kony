function openRegisterDevicePopup(){
	deviceStatus = frmViewDeviceInDetail.lblDeviceAvailabilityValue.text;
	//var status = deviceStatus.slice(0,4); 
	if(deviceStatus == "Busy"){
		popupRegisterDevice.txtbxEmailID.isVisible = false;	
	}
	popupRegisterDevice.show();
}
function userLogin(){
	var password = popupRegisterDevice.txtbxPassword.text.trim();
	var emailID = "";
	if(deviceStatus == "Available")
		emailID = popupRegisterDevice.txtbxEmailID.text.trim();
	if(deviceStatus == "Busy")
		emailID = frmViewDeviceInDetail.lblEmailIDValue.text.trim();
		if(((emailID == null) && (password == null)) || ((emailID == "") && (password == ""))){
                kony.ui.Alert("Please enter the details",
                               null,
                               "info",
                               null,
                               null,
                               "D-Track");
                return ;
        }
        if((password == null) || (password == "")){
                kony.ui.Alert("Ouch! Pwd Missing.",
                               null,
                               "info",
                               null,
                               null,
                               "D-Track");
                return ;
        }
        if((emailID == null) || (emailID == "")){
                kony.ui.Alert("Ouch! EmailID Missing",
                               null,
                               "info",
                               null,
                               null,
                               "D-Track");
                return ;
        }
        if((kony.string.isValidEmail(emailID) == false)){
			kony.ui.Alert("oh ho! I am not allowed to accept wrong frmt",
			               null,
			               "info",
			               null,
			               null,
			               null,
			               "D-Track");
			return false;
		}
	var inputParam = {serviceID : "loginUser", emailID : emailID, passwd : password};
		kony.print("Login Service "+JSON.stringify(inputParam));
	appmiddlewaresecureinvokerasync(inputParam, loginCallback);
	showLoadingScreen();
}

function loginCallback(status , loginResult){
	if (status == 400){
		var opstatus = loginResult.opstatus;
		kony.print("Login Resultset "+ JSON.stringify(loginResult));
		if(opstatus == 0){
			var loginStatus = loginResult.loginStatus;
			if(loginStatus == "success"){
				if(deviceStatus == "Available"){
					var emailID = popupRegisterDevice.txtbxEmailID.text.trim();
					var macID = frmViewDeviceInDetail.lblMacIDValue.text;
					var inputParam = {serviceID : "acquireDevice", emailID : emailID, macID : macID};
					appmiddlewaresecureinvokerasync(inputParam, acquireDeviceCallback);
					
				}
				if(deviceStatus == "Busy"){
					var emailID = frmViewDeviceInDetail.lblEmailIDValue.text;
					//alert(startTime);
					var inputParam = {serviceID : "returnDevice", emailID : emailID, startTime : startTime };
					appmiddlewaresecureinvokerasync(inputParam, returnDeviceCallback);
				}
			} else {
				alert("Login Failed");
			}
		} else {
			alert("Server error");
		}
		hideLoadingScreen();
	}
}

function acquireDeviceCallback(status, acquireDeviceResult){
	if (status == 400){
		var opstatus = acquireDeviceResult.opstatus;
		kony.print("Acquire Resultset "+ JSON.stringify(acquireDeviceResult));
		if(opstatus == 0){
			var resultStatus = acquireDeviceResult.status;
			if(resultStatus == "success"){
				alert("Acquired Successful!");
				frmListDevice.show();
			} else {
				alert("Acquired Failed");
			}
		} else {
			alert("Server error");
		}
	}
}

function returnDeviceCallback(status, returnDeviceResult){
	if (status == 400){
		var opstatus = returnDeviceResult.opstatus;
		kony.print("Acquire Resultset "+ JSON.stringify(returnDeviceResult));
		if(opstatus == 0){
			var resultStatus = returnDeviceResult.status;
			if(resultStatus == "success"){
				alert("Returned Successful!");
				frmListDevice.show();
			} else {
				alert("Returned Failed");
			}
		} else {
			alert("Server error");
		}
	}
}