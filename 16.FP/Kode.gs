function doGet(request) {
   var htmlOutput = HtmlService.createTemplateFromFile('Login');
   htmlOutput.message = '';
   return htmlOutput.evaluate()
		.addMetaTag('viewport', 'width=device-width , initial-scale=1')
		.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
}

/**  INCLUDE HTML PARTS, EG. JAVASCRIPT, CSS, OTHER HTML FILES */
function include(filename) {
	return HtmlService.createHtmlOutputFromFile(filename)
		.getContent();
}

function globalVariables() {
	var varArray = {
		spreadsheetId: '1yuGHvVUEAXr3xnCPOe2485XbuYxktNQwmfiboQWMOYQ',
		dataRange: 'Data!A3:H',
		idRange: 'Data!A2:A',
		lastCol: 'H',
		insertRange: 'Data!A1:H1',
		sheetID: '1183381631'
	};
	return varArray;
}

/**  PROCESS FORM */
function processForm(formObject) {

	/**--Execute if form passes an ID and if is an existing ID */
	if (formObject.RecId && checkID(formObject.RecId)) {

		/**--Update Data */
		updateData(getFormValues(formObject), globalVariables().spreadsheetId, getRangeByID(formObject.RecId));
	} else {

		/**--Execute if form does not pass an ID
		 **--Append Form Data */
		appendData(getFormValues(formObject), globalVariables().spreadsheetId, globalVariables().insertRange);
	}

	//Return last 10 rows
	return getAllData();
}


/**  GET FORM VALUES AS AN ARRAY */
function getFormValues(formObject) {

	/**  ADD OR REMOVE VARIABLES ACCORDING TO YOUR FORM */
	if (formObject.RecId && checkID(formObject.RecId)) {
		var values = [
			[formObject.RecId.toString(),
				formObject.nama,
				formObject.alamat,
				formObject.telp,
				formObject.ambil,
				formObject.kembali,
				formObject.kendaraan,
				new Date().toLocaleString()
			]
		];
	} else {

		/** Reference https://webapps.stackexchange.com/a/51012/244121 */
		var values = [
			[new Date().getTime().toString(),
				formObject.nama,
				formObject.alamat,
				formObject.telp,
				formObject.ambil,
				formObject.kembali,
				formObject.kendaraan,
				new Date().toLocaleString()
			]
		];
	}
	return values;
}


/** 
## CRUD FUNCTIONS ----------------------------------------------------------------------------------------
*/


/**  CREATE/ APPEND DATA */
function appendData(values, spreadsheetId, range) {
	var valueRange = Sheets.newRowData();
	valueRange.values = values;
	var appendRequest = Sheets.newAppendCellsRequest();
	appendRequest.sheetID = spreadsheetId;
	appendRequest.rows = valueRange;
	var results = Sheets.Spreadsheets.Values.append(valueRange, spreadsheetId, range, {
		valueInputOption: "RAW"
	});
}


/**  READ DATA */
function readData(spreadsheetId, range) {
	var result = Sheets.Spreadsheets.Values.get(spreadsheetId, range);
	return result.values;
}


/**  UPDATE DATA */
function updateData(values, spreadsheetId, range) {
	var valueRange = Sheets.newValueRange();
	valueRange.values = values;
	var result = Sheets.Spreadsheets.Values.update(valueRange, spreadsheetId, range, {
		valueInputOption: "RAW"
	});
}


/** DELETE DATA */
function deleteData(ID) {
	var startIndex = getRowIndexByID(ID);

	var deleteRange = {
		"sheetId": globalVariables().sheetID,
		"dimension": "ROWS",
		"startIndex": startIndex,
		"endIndex": startIndex + 1
	}

	var deleteRequest = [{
		"deleteDimension": {
			"range": deleteRange
		}
	}];
	Sheets.Spreadsheets.batchUpdate({
		"requests": deleteRequest
	}, globalVariables().spreadsheetId);

	return getAllData();
}

/** 
## HELPER FUNCTIONS FOR CRUD OPERATIONS --------------------------------------------------------------
*/


/**  CHECK FOR EXISTING ID, RETURN BOOLEAN */
function checkID(ID) {
	var idList = readData(globalVariables()
			.spreadsheetId, globalVariables().idRange, )
		.reduce(function(a, b) {
			return a.concat(b);
		});
	return idList.includes(ID);
}


/**  GET DATA RANGE A1 NOTATION FOR GIVEN ID */
function getRangeByID(id) {
	if (id) {
		var idList = readData(globalVariables().spreadsheetId, globalVariables().idRange);
		for (var i = 0; i < idList.length; i++) {
			if (id == idList[i][0]) {
				return 'Data!A' + (i + 2) + ':' + globalVariables().lastCol + (i + 2);
			}
		}
	}
}


/**  GET RECORD BY ID */
function getRecordById(id) {
	if (id && checkID(id)) {
		var result = readData(globalVariables().spreadsheetId, getRangeByID(id));
		return result;
	}
}


/**  GET ROW NUMBER FOR GIVEN ID */
function getRowIndexByID(id) {
	if (id) {
		var idList = readData(globalVariables().spreadsheetId, globalVariables().idRange);
		for (var i = 0; i < idList.length; i++) {
			if (id == idList[i][0]) {
				var rowIndex = parseInt(i + 1);
				return rowIndex;
			}
		}
	}
}


/**  GET ALL RECORDS */
function getAllData() {
	var data = readData(globalVariables().spreadsheetId, globalVariables().dataRange);
	return data;
}


/*GET DROPDOWN LIST KENDARAAN */
function getDropdownListKota(range) {
	var list = readData(globalVariables().spreadsheetId, range);
	return list;
}

function getNewHtml(e) {
  var html = HtmlService
	.createTemplateFromFile('Index') // uses templated html
	.evaluate()
	.getContent();
  return html;
}


function myURL() {
   return ScriptApp.getService().getUrl();
}

function cekLogin(username, password) {
   var usernames = ['user1', 'user2']; //user array
   var passwords = ['user1', 'user2']; //password array
   var cek = '';
   if (cek == '') {
      for (var i = 0; i < usernames.length; i++) {
         if (username == usernames[i] && password == passwords[i]) {
            cek = 'TRUE';
         }
      }
   }
   if (cek == '') {
      cek = 'FALSE';
   }
   return cek;
}

function doPost(e) {
   Logger.log(JSON.stringify(e));
   if (e.parameter.LoginButton == 'Login') {
      var username = e.parameter.username;
      var password = e.parameter.password;
      var validasi = cekLogin(username, password);

      if (validasi == 'TRUE') {
         var htmlOutput = HtmlService.createTemplateFromFile('Index');
         htmlOutput.username = username;
         htmlOutput.message = '';
         return htmlOutput.evaluate()
         .addMetaTag('viewport', 'width=device-width , initial-scale=1')
         .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      } else {
         var htmlOutput = HtmlService.createTemplateFromFile('Login');
         htmlOutput.message = 'Login Gagal!';
         return htmlOutput.evaluate()
         .addMetaTag('viewport', 'width=device-width , initial-scale=1')
         .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      }
   }
}