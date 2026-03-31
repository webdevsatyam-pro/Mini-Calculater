let current = '0';
let expr = '';
let justCalc = false;

function updateDisplay() {
  document.getElementById('display').textContent = current;
  document.getElementById('expr').textContent = expr;
}

function appendNum(n) {
  if (justCalc) {
    current = n;
    expr = '';
    justCalc = false;
  } else {
    current = current === '0' ? n : current + n;
  }
  updateDisplay();
}

function appendOp(op) {
  justCalc = false;
  const sym = op === '/' ? '÷' : op === '*' ? '×' : op === '-' ? '−' : op;
  expr = current + ' ' + sym;
  current = '0';
  updateDisplay();
}

function appendDot() {
  if (!current.includes('.')) {
    current += '.';
  }
  updateDisplay();
}

function clearAll() {
  current = '0';
  expr = '';
  justCalc = false;
  updateDisplay();
}

function toggleSign() {
  if (current !== '0') {
    current = current.startsWith('-') ? current.slice(1) : '-' + current;
  }
  updateDisplay();
}

function percent() {
  current = String(parseFloat(current) / 100);
  updateDisplay();
}

function calculate() {
  try {
    const raw = expr
      .replace('÷', '/')
      .replace('×', '*')
      .replace('−', '-');
    const full = raw + current;
    expr = full + ' =';
    const result = Function('"use strict"; return (' + full + ')')();
    current = String(parseFloat(result.toFixed(10)));
    justCalc = true;
    updateDisplay();
  } catch (e) {
    current = 'Error';
    updateDisplay();
  }
}