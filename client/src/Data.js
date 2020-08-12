export function fetchMockLedgerItem() {
  return {
    "2020-07-30": [
      {
        category: "쇼핑/뷰티",
        content: "미용실",
        payment: "현대카드",
        amount: "-20000",
        t_type: "지출",
      },
      {
        category: "기타",
        content: "로또",
        payment: "현금",
        amount: "5000",
        t_type: "수입",
      },
      {
        category: "식품",
        content: "점심식사",
        payment: "우리카드",
        amount: "-9000",
        t_type: "지출",
      },
    ],
    "2020-07-29": [
      {
        category: "용돈",
        content: "할머니 용돈",
        payment: "현금",
        amount: "50000",
        t_type: "수입",
      },
      {
        category: "월급",
        content: "7월 월급",
        payment: "국민은행",
        amount: "2000000",
        t_type: "수입",
      },
      {
        category: "식품",
        content: "아웃백",
        payment: "카카오체크카드",
        amount: "-100000",
        t_type: "지출",
      },
    ],
  };
}

export function fetchMockBarData() {
  return [
    {
      category: "생활",
      percentage: "63",
      totalPrice: "1575000",
    },
    {
      category: "식비",
      percentage: "16",
      totalPrice: "400000",
    },
    {
      category: "의료/건강",
      percentage: "6",
      totalPrice: "150000",
    },
    {
      category: "교통",
      percentage: "4",
      totalPrice: "100000",
    },
    {
      category: "쇼핑/뷰티",
      percentage: "4",
      totalPrice: "100000",
    },
    {
      category: "문화/여가",
      percentage: "2",
      totalPrice: "50000",
    },
    {
      category: "미분류",
      percentage: "5",
      totalPrice: "125000",
    },
  ];
}
