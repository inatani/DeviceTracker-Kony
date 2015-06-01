function viewDeviceInformationOnRowClick(){
	var deviceInfo = frmListDevice.segListDevice.selectedItems;
	kony.print("Device details"+JSON.stringify(deviceInfo));
	frmViewDeviceInDetail.lblDeviceNameValue.text = deviceInfo[0]["lblName"];
	frmViewDeviceInDetail.lblOSVersionValue.text = deviceInfo[0]["lblOSVersion"];
	frmViewDeviceInDetail.lblMacIDValue.text =	deviceInfo[0]["macID"];
	frmViewDeviceInDetail.lblDeviceIDValue.text = deviceInfo[0]["deviceID"];
	frmViewDeviceInDetail.lblDeviceLocationValue.text = deviceInfo[0]["deviceLocation"];
	
	if(deviceInfo[0]["startTime"] != null){
		startTime = deviceInfo[0]["startTime"];
		//alert(startTime);
	}
	
	checkForDevice = deviceInfo[0]["lblCurrentUser"];
	var stautsCheck = checkForDevice.search("@ust-global.com");
	if(stautsCheck != -1){
//		var expectedEndTime = deviceInfo[0]["expectedEndTime"];
//		var expectedEndTimeInDate = new Date(expectedEndTime).toString();
//		frmViewDeviceInDetail.lblDeviceAvailabilityValue.text = "Busy, expected return time "+expectedEndTimeInDate;
		frmViewDeviceInDetail.lblDeviceAvailabilityValue.text = "Busy";
		frmViewDeviceInDetail.lblUserInfoHeader.isVisible = true;
		frmViewDeviceInDetail.hboxUserNameContainer.isVisible = true;
		frmViewDeviceInDetail.hboxEmailIDContainer.isVisible = true;
		frmViewDeviceInDetail.hboxPhoneNumberContainer.isVisible = true;
		frmViewDeviceInDetail.btnGetOrReturnDevice.text = "Return Device";
		var inputParam = {serviceID : "listUser"};
		appmiddlewaresecureinvokerasync(inputParam, getUserListCallback);
		showLoadingScreen();
	} else {
		frmViewDeviceInDetail.lblDeviceAvailabilityValue.text = "Available";
		frmViewDeviceInDetail.lblUserInfoHeader.isVisible = false;
		frmViewDeviceInDetail.hboxUserNameContainer.isVisible = false;
		frmViewDeviceInDetail.hboxEmailIDContainer.isVisible = false;
		frmViewDeviceInDetail.hboxPhoneNumberContainer.isVisible = false;
		frmViewDeviceInDetail.btnGetOrReturnDevice.text = "Get Device";
	}
	frmViewDeviceInDetail.show();
}

function getUserListCallback(status, userResult){
	if(status==400){
		kony.print("User data result "+userResult)
		var userOpstatus = userResult.opstatus;
		if (userOpstatus == 0){
			var userResultData = userResult.userRoot;
			var userResult = [];
			for (var i = 1; i <= userResultData.length; i++){
				var data = userResultData[kony.decrement(i)];
				var tempResult = [];
				if (checkForDevice == data.emailID){
					frmViewDeviceInDetail.lblUserNameValue.text = data.userName;
					frmViewDeviceInDetail.lblEmailIDValue.text = data.emailID;
					frmViewDeviceInDetail.lblPhoneNumberValue.text = data.phoneNumber;
				}
			}
			
		} else {
			alert("Server error")
		}
		hideLoadingScreen();
	}
}