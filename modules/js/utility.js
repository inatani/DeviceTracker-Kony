function showLoadingScreen(){
	var loadingText = "Please Wait..";
	kony.application.showLoadingScreen(BlockedUISkn,
	                                    loadingText,
	                                    "center",
	                                    true,
	                                    true,
	                                    null);
}
function hideLoadingScreen(){
	kony.application.dismissLoadingScreen();
}