/**
 * Evaluación Régimen Penal Juvenil · IESP
 * Reemplaza el script anterior: misma hoja, mismas columnas + "Detalle" (col. I).
 * Después: Implementar > Gestionar implementaciones > lápiz > Nueva versión > Implementar.
 */
var CLAVE_DOCENTES = "CAMBIAR-ESTA-CLAVE";   // la que se ingresa en monitor.html
var KEYS = ["fecha","nombre","jerarquia","dni","destino","aciertos","nota","tiempo","detalle"];
var HEAD = ["Marca Temporal","Nombre y Apellido","Jerarquía","N° Legajo","Destino / Unidad",
            "Aciertos","Nota (1-10)","Tiempo Empleado","Detalle por pregunta"];

function hoja_() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  if (sheet.getLastRow() === 0) sheet.appendRow(HEAD);
  if (!sheet.getRange(1, 9).getValue()) sheet.getRange(1, 9).setValue(HEAD[8]);
  sheet.getRange(1, 1, 1, 9).setFontWeight("bold").setBackground("#F1F5F9");
  return sheet;
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    var data = JSON.parse(e.postData.contents);
    hoja_().appendRow([
      data.fecha || new Date().toLocaleString("es-AR", { timeZone: "America/Argentina/Tucuman" }),
      data.nombre,
      data.jerarquia,
      data.dni,
      data.destino,
      String(data.aciertos).indexOf("/") > -1 ? data.aciertos : data.aciertos + " / 20",
      data.nota,
      data.tiempo,
      data.detalle || ""
    ]);
    return json_({ status: "success" });
  } catch (error) {
    return json_({ status: "error", message: error.toString() });
  } finally {
    lock.releaseLock();
  }
}

// Lectura para el monitor docente: ?action=list&key=CLAVE
function doGet(e) {
  var p = (e && e.parameter) || {};
  if (p.action !== "list") return ContentService.createTextOutput("ok");
  if (p.key !== CLAVE_DOCENTES) return json_({ ok: false, error: "Clave incorrecta" });
  var v = hoja_().getDataRange().getDisplayValues();
  v.shift(); // encabezados
  var rows = v.map(function (r) {
    var o = {};
    KEYS.forEach(function (k, i) { o[k] = r[i] || ""; });
    return o;
  });
  return json_({ ok: true, rows: rows });
}

function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
