export function addCommaToNumber(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function isNumber(x) {
  return /^\d+$/.test(x);
}

export function isNormalText(x) {
  return !/[^a-zA-Z0-9|ㄱ-ㅎ|ㅏ-ㅣ|가-힣\-,^?(\s+)\/]/.test(x);
}

export function removeComma(x) {
  return x.replace(/,/g, "");
}

export function attachComma(e) {
  const inputtedString = removeComma(e.target.value);
  e.target.value = addCommaToNumber(inputtedString);
}

//초기화시킬 타겟 엘레멘트, 메세지를 표시할 타켓 엘레멘트, 메세지
export function showAlertMessage(target, msgTarget, message) {
  target.value = "";
  target.focus();
  msgTarget.innerText = `알림: ${message}`;
}
