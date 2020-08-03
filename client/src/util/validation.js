//1000단위로 콤마를 붙여주는 함수
export function addCommaToNumber(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//숫자인지 판별하는 유효성 검사 함수
export function isNumber(x) {
  return /^\d+$/.test(x);
}

//내용에 입력할 수 있는 유효성 검사 함수
export function isNormalText(x) {
  return !/[^a-zA-Z0-9|ㄱ-ㅎ|ㅏ-ㅣ|가-힣\-,^?(\s+)\/]/.test(x);
}

//콤마를 제거해주는 함수
export function removeComma(x) {
  return x.replace(/,/g, "");
}

// 문자열에 콤마를 붙여주는 함수
export function attachComma(target, x) {
  const inputtedString = removeComma(x);
  target.value = addCommaToNumber(inputtedString);
}

// 상태에 따라 다른 알림 메세지를 표시해주는 함수
//초기화시킬 타겟 엘레멘트, 메세지를 표시할 타켓 엘레멘트, 메세지
export function showAlertMessage(target, msgTarget, message) {
  target.focus();
  msgTarget.innerText = `알림: ${message}`;
}
