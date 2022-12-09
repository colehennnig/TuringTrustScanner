//=========================================================================//
// doPost:
//-------------------------------------------------------------------------//
// Checks the request parameter "method" and call the corresponding funtion.
// Sends back the status code to the client.
//=========================================================================//
function doPost(request) {
  var result;
  if (request.parameter.method == "addData") {
    result = addData(request);
  } else if (request.parameter.method == "addSheet") {
    result = addSheet(request)
  }
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

//=========================================================================//
// addData:
//-------------------------------------------------------------------------//
// First checks to see if the user has existing sheets, if not, returns a
// 404 status code.
// Then checks to see if the asset number given has already been entered
// into the user's log sheet, if so, returns a 400 status code.
// If everything is okay, the new asset information gets added to the log
// sheet and the total in the summary sheet either gets added with a 1 or
// incremented if the date has been used already.
// Return a 200 status code for successful upload and 201 status code if
// a new date was added to the summary sheet.
//=========================================================================//
function addData(request) {
  var result;
  var allSheets = SpreadsheetApp.getActive();
  var logs = allSheets.getSheetByName(request.parameter.name + " Log");
  var summary = allSheets.getSheetByName(request.parameter.name + " Summary");
  if (logs == null || summary == null) {
    result = {
      status: 404
    };
    return result;
  }

  var logData = logs.getDataRange().getValues();
  var logHeaders = logData[0];
  var assetIndex = logHeaders.indexOf('Asset Number');
  for( var i = 1 ; i < logData.length; i++ ) {
    var row = logData[i];
    if(row[assetIndex] == request.parameter.assetNumber) {
      result = {
        status: 400
      }; 
      return result;
    }
  }
  var row =  [request.parameter.date, request.parameter.assetNumber, 'No'];
  logs.appendRow(row);
  logs.getRange(logs.getLastRow(), 2).setBackground(request.parameter.color)
  var data = summary.getDataRange().getValues();
  var headers = data[0];
  var dateIndex = headers.indexOf('Date'); 
  var totalIndex = headers.indexOf('Total');
  var sheetRow = 0;
  // Iterate data, look for the correct row checking the ldap, start from 1 as 0==headers
  for( var i = 1 ; i < data.length; i++ ) {
    var row = data[i];
    if(row[dateIndex] == request.parameter.date) {
      // You have found the correct row, set + 1 because Sheet range starts from 1, not 0
      sheetRow = i + 1;
      // We have found the row, no need to iterate further
      break;
    }
  }
  if (sheetRow) {
    ++totalIndex;
    //Set the value
    summary.getRange(sheetRow, totalIndex).setValue(summary.getRange(sheetRow, totalIndex).getValue() + 1);
    result = {
      status: 200
    };
  } else {
    var row =  [request.parameter.date, 1];
    summary.appendRow(row);
    result = {
      status: 201
    };
  }
  return result
}

//=========================================================================//
// addSheet:
//-------------------------------------------------------------------------//
// Creates empty Log and Summary sheets with the user's name with the
// appropiate column titles.
// Then call the addData function with the same request and returns the
// result of that function.
//=========================================================================//
function addSheet(request) {
  var result;
  var allSheets = SpreadsheetApp.getActive();
  var logs = allSheets.getSheetByName(request.parameter.name + " Log");
  var summary = allSheets.getSheetByName(request.parameter.name + " Summary");
  if (logs == null) {
    allSheets.insertSheet(request.parameter.name + " Log");
    logs = allSheets.getSheetByName(request.parameter.name + " Log");
    logs.getRange("A1:A").setNumberFormat("@");
    logs.appendRow(["Date", "Asset Number", "QA Checked"]);
  }
  if (summary == null) {
    allSheets.insertSheet(request.parameter.name + " Summary");
    summary = allSheets.getSheetByName(request.parameter.name + " Summary");
    summary.getRange("A1:A").setNumberFormat("@");
    summary.appendRow(["Date", "Total"]);
  }
  result = addData(request);
  return result;
}
