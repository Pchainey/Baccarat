

function Upload() {
    //Reference the FileUpload element.
    document.getElementById('lodingSpinner').style.display = 'block';
    var fileUpload = document.getElementById("fileUpload");

    //Validate whether File is valid Excel file.
    //var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
    var regex = /(.xls|.xlsx)$/;
    if (regex.test(fileUpload.value.toLowerCase())) {
        if (typeof (FileReader) != "undefined") {
            var reader = new FileReader();

            //For Browsers other than IE.
            if (reader.readAsBinaryString) {
                reader.onload = function (e) {
                    ProcessExcel(e.target.result);
                };
                reader.readAsBinaryString(fileUpload.files[0]);
            } else {
                //For IE Browser.
                reader.onload = function (e) {
                    var data = "";
                    var bytes = new Uint8Array(e.target.result);
                    for (var i = 0; i < bytes.byteLength; i++) {
                        data += String.fromCharCode(bytes[i]);
                    }
                    ProcessExcel(data);
                };
                reader.readAsArrayBuffer(fileUpload.files[0]);
            }
        } else {
            alert("This browser does not support HTML5.");
        }
   } 
    else {
        alert("Please upload a valid Excel file.");
    }
};


function ProcessExcel(data) {
    //Read the Excel File data.
    //var start = new Date().getTime();
    var workbook = XLSX.read(data, {
        type: 'binary'
    });

    //Fetch the name of First Sheet.
    var firstSheet = workbook.SheetNames[0];

    //Read all rows from First Sheet into an JSON array.


    excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
    var jsonObj = JSON.stringify(excelRows);
    statusIsFileUpload = 1;

    //let exceldata = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet]);
    // var end = new Date().getTime();
    // var time = end - start;
    // document.getElementById('demo').innerHTML  = 'Execution time: ' + time ;
    //document.getElementById('demo').innerHTML =  Object.keys(excelRows[2])[0] + '<br> ' + excelRows[2]['Hand 3'] ;

    lastshoeNumberInXlsxFile = excelRows[excelRows.length - 1]['Shoe'];
    document.getElementById('lodingSpinner').style.display = 'none';


    if(statusOfRS == 1){
        document.getElementById('displayBtnForRandomShoe').style.display = "none";
        document.getElementById('selectPlayModeOfRandomShoe').style.display = "none";
        document.getElementById('formDisplayInRS').style.display = 'block';
        statusOfRSMode1 = 0 ;
    } else {
        document.getElementById('removeDIV').style.display = 'none';
        document.getElementById('formDisplay').style.display = 'block';
    }

}

