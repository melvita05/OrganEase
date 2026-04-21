export const dashboardUserState = {
  userDetails: null,
  loading: false,
  OrderByUser: null,
  notifications: [],
  unreadCount: 0,
};

export const dashboardUserReducer = (state, action) => {
  switch (action.type) {
    case "userDetails":
      return {
        ...state,
        userDetails: action.payload,
      };
    case "OrderByUser":
      return {
        ...state,
        OrderByUser: action.payload,
      };
    case "loading":
      return {
        ...state,
        loading: action.payload,
      };
      case "setNotifications":
  return {
    ...state,
    notifications: action.payload,
  };

case "setUnreadCount":
  return {
    ...state,
    unreadCount: action.payload,
  };
    default:
      return state;
  }
};
