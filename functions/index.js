const functions = require("firebase-functions");
const { GoogleSpreadsheet } = require('google-spreadsheet');
require('dotenv').config();

exports.easy = functions.https.onRequest(async (request, response) => {
    const res = await loadSudokuDatafromSpreadSheet('easy-01');
    response.json(res);
  });

  // Googleスプレッドシートからシフト情報をロードし、担当者の電話番号を取得



async function loadSudokuDatafromSpreadSheet(sheetname) {
      // スプレッドシートIDと資格情報を用いてGoogleスプレッドシートをロード
      const doc = new GoogleSpreadsheet(process.env.SPREADSHEET_ID);
      const credentials = require('./sudoku-firebase-credential.json');
      await doc.useServiceAccountAuth(credentials);
      await doc.loadInfo();
  
         //シフト情報を取得
         const shiftSheet = await doc.sheetsById[process.env.EASY_WORKSHEET_ID];
         //const shiftRows = await shiftSheet.getRows();
      const sheet = await doc.sheetsByTitle[sheetname];
      await sheet.loadCells();
      var sudokudefaultdata = new Array();
      var sudokuanswerdata = new Array();
      for (var i = 0; i < 81; i++) {
        var x = await sheet.getCell(3 + i, 1).value;
        var y = await sheet.getCell(3 + i, 2).value;
        var value = await sheet.getCell(3 + i, 3).value;
        sudokudefaultdata.push(new sudokuCoordinate(x, y, value));
  
        var x = await sheet.getCell(3 + i, 5).value;
        var y = await sheet.getCell(3 + i, 6).value;
        var value = await sheet.getCell(3 + i, 7).value;
        sudokuanswerdata.push(new sudokuCoordinate(x, y, value));
      }
      return await new sudokuGetResultFormat(defautval = sudokudefaultdata, answer = sudokuanswerdata);
}



class sudokuCoordinate {
  constructor(X, Y, value) {
    this.X = X;
    this.Y = Y;
    this.Value = value
  }
}

class sudokuGetResultFormat {
  constructor(defautval, answer) {
    this.DefaultValue = defautval;
    this.Answer = answer;
  }
}