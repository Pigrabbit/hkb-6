export function fetchMockLedgerItem() {
  return {
    "2020-07-30": [
      {
        category: "쇼핑/뷰티",
        content: "미용실",
        payment: "현대카드",
        amount: "-20000",
        t_type: "지출"
      },
      {
        category: "기타",
        content: "로또",
        payment: "현금",
        amount: "5000",
        t_type: "수입"
      },
      {
        category: "식품",
        content: "점심식사",
        payment: "우리카드",
        amount: "-9000",
        t_type: "지출"
      },
    ],
    "2020-07-29": [
      {
        category: "용돈",
        content: "할머니 용돈",
        payment: "현금",
        amount: "50000",
        t_type: "수입"
      },
      {
        category: "월급",
        content: "7월 월급",
        payment: "국민은행",
        amount: "2000000",
        t_type: "수입"
      },
      {
        category: "식품",
        content: "아웃백",
        payment: "카카오체크카드",
        amount: "-100000",
        t_type: "지출"
      },
    ],
  };
}
