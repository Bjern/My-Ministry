function doDonate() {
    try {
		blackberry.payment.purchase({
      	"digitalGoodID":"132198",
      	"digitalGoodSKU":"tox_myministry_2",
      	"digitalGoodName":"My Ministry 2",
      	"metaData":"metadata",
      	"purchaseAppName":"My Ministry",
      	"purchaseAppIcon":null},
      	success,failure);
		
   } catch (e) {
     alert ("Error" + e);
   }
}

function success(purchase) {
   var purchasedItem = JSON.parse(purchase);
   var transId = purchasedItem.transactionID;
   var sku = purchasedItem.digitalGoodSKU;
   var dgId = purchasedItem.digitalGoodID;
   alert("Donation Item: " + transId + "," + sku +  "," + dgId);
 }

function failure(errorText, errorId) {
   alert("Error occured: " + errorText + ", " + errorId);
}