function ListDevice(){
	var searchName = frmListDevice.txtBoxSearch.text;
	kony.print("text search on every change ===> "+searchName)
	searchDeviceName(searchName);
}

function getDeviceList(){
	var inputparam = {serviceID : "listDeviceAndAvailability"}
	appmiddlewaresecureinvokerasync(inputparam, getDeviceListCallback);
	showLoadingScreen();
}

function getDeviceListCallback(status, deviceResultData){
	frmListDevice.segListDevice.widgetDataMap = {
		imgDevice : "imgDevice",
		lblName : "lblName",
		lblOSVersion : "lblOSVersion",
		imgAvailabilityIcon : "imgAvailabilityIcon",
		lblCurrentUser : "lblCurrentUser"
	}
	if(status == 400){
	kony.print("deviceResultData "+ JSON.stringify(deviceResultData));
	kony.print("device info "+ JSON.stringify(deviceResultData.root.length) + " userReportRoot " + JSON.stringify(deviceResultData.userReportRoot.length));
	
		var opstatus = deviceResultData.opstatus;

		if(opstatus == 0){
		var deviceResult = deviceResultData.root;
		var userLogResult = deviceResultData.userReportRoot;
			
			var resultToStore = [];
			for(var i=1; i <= deviceResult.length; i++){
				var data = deviceResult[kony.decrement(i)];
				var tempResult = [];
				
				var tempName = data.deviceName;
				var tempOSVersion = data.osVersion;
				var tempImage = data.image
				var tempDeviceLocation = data.deviceLocation;
				var tempDeviceIsIn = data.deviceLocation;
				var tempMacID = data.macID;
				var tempDeviceID = data.deviceID;
				var tempdeviceStatusicon = "available.png";
				
				for(var j=1;j<=userLogResult.length;j++){
					var dataLog = userLogResult[kony.decrement(j)];
					var tempLogResult = [];
					var tempLogMacID = dataLog.macID;
					var tempActualEndTime = dataLog.actualEndTime;
					
					var tempEmailID = dataLog.emailID;
					if(tempMacID == tempLogMacID){
						if(tempActualEndTime == "1899-12-31T18:30:00.000Z"){
							var tempStartTime = dataLog.startTime;
							tempDeviceIsIn = tempEmailID;
							tempdeviceStatusicon = "busy.png";
						}
					}
				}
				
				tempResult = {
					lblName : tempName,
					imgDevice : tempImage,
					lblOSVersion : tempOSVersion,
					deviceLocation : tempDeviceLocation,
					macID : tempMacID,
					deviceID : tempDeviceID,
					imgAvailabilityIcon : tempdeviceStatusicon,
					lblCurrentUser : tempDeviceIsIn,
					deviceLocation : tempDeviceLocation,
					startTime : tempStartTime
					}
				resultToStore.push(tempResult);
			}
			ResultForDeviceList = resultToStore;
			kony.print("Result " + JSON.stringify(resultToStore));
			frmListDevice.segListDevice.setData(resultToStore);
		} else {
			alert("server error with Status Code "+opstatus);
		}
		hideLoadingScreen();
	}
}

function searchDeviceName(name){
	kony.print("name based on search " + name);
	var searchStringLength = name.length;
	var deviceResult = ResultForDeviceList;
	kony.print("device result from search " + JSON.stringify(deviceResult));
	
	var resultToStore = [];
	for(var i=1; i<=deviceResult.length; i++){
		var data = deviceResult[kony.decrement(i)];
		var tempResult = [];
		var tempName = data.lblName;
		if(tempName != null || tempName != ""){
			if(tempNameSlice = tempName.slice(0, searchStringLength).toLowerCase() == name.toLowerCase()){
				tempResult = {
					lblName : tempName,
					imgDevice : data.imgDevice
				}
				tempResult = {
					lblName : tempName,
					imgDevice : data.imgDevice,
					lblOSVersion : data.lblOSVersion,
					deviceLocation : data.deviceLocation,
					macID : data.macID,
					deviceID : data.deviceID,
					imgAvailabilityIcon : data.imgAvailabilityIcon,
					lblCurrentUser : data.lblCurrentUser,
					deviceLocation : data.deviceLocation
				}
				resultToStore.push(tempResult);
				kony.print("if not null " + JSON.stringify(resultToStore));
			}
		} else {
			tempResult = {
				lblName : tempName,
				imgDevice : data.imgDevice,
				lblOSVersion : data.lblOSVersion,
				deviceLocation : data.deviceLocation,
				macID : data.macID,
				deviceID : data.deviceID,
				imgAvailabilityIcon : data.imgAvailabilityIcon,
				lblCurrentUser : data.lblCurrentUser,
				deviceLocation : data.deviceLocation
			}
			resultToStore.push(tempResult);
			kony.print("if null " + JSON.stringify(resultToStore));
		}		
	}
	kony.print("Result after search " + JSON.stringify(resultToStore));
	frmListDevice.segListDevice.setData(resultToStore);	
}