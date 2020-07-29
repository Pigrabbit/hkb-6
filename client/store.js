export const state = {
    isPaymentPopupVisible: {
        data: false,
        listeners: {}
    },
    ledgerItem: {
      data: [
        {
          category: "쇼핑/뷰티",
          content: "미용실",
          payment: "현대카드",
          amount: "-20000원"
        },
        {
          category: "식품",
          content: "편의점",
          payment: "우리카드",
          amount: "-1000원"
        }
      ], // [{}, {}, {}]
      listeners: {}
    }
};

export const subscribe = (component, key, eventHandler) => {
  state[key].listeners[component] = eventHandler;
};

const publish = (key) =>
  Object.values(key.listeners).forEach((eventHandler) =>
    eventHandler(key.data)
  );

export function getLedgerItem() {
  return state.ledgerItem.data;
}