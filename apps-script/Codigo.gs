/**
 * Evaluación Régimen Penal Juvenil · IESP
 * Pegar en Extensiones > Apps Script de la planilla de resultados.
 * Implementar > Gestionar implementaciones > Editar > Nueva versión
 * (Ejecutar como: Yo · Acceso: Cualquier persona).
 */
const CLAVE_DOCENTES = "CAMBIAR-ESTA-CLAVE";   // la misma que se ingresa en monitor.html
const HOJA = "Resultados";
const COLS = ["fecha","nombre","jerarquia","dni","destino","aciertos","nota","tiempo","detalle"];

function hoja_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(HOJA);
  if (!sh) sh = ss.insertSheet(HOJA);
  if (sh.getLastRow() === 0) sh.appendRow(COLS);
  return sh;
}

function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  const lock = LockService.getScriptLock(); lock.waitLock(10000);
  try { hoja_().appendRow(COLS.map(k => d[k] ?? "")); } finally { lock.releaseLock(); }
  return ContentService.createTextOutput("ok");
}

function doGet(e) {
  const p = e.parameter || {};
  if (p.action !== "list") return ContentService.createTextOutput("ok");
  if (p.key !== CLAVE_DOCENTES)
    return json_({ ok: false, error: "Clave incorrecta" });
  const v = hoja_().getDataRange().getDisplayValues();
  const head = v.shift();
  return json_({ ok: true, rows: v.map(r => Object.fromEntries(head.map((h, i) => [h, r[i]]))) });
}

function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
