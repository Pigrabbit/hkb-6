export const state = {
    isPaymentPopupVisible: {
        data: false,
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
