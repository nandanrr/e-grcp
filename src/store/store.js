import {
  configureStore,
  combineReducers,
} from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import uiReducer from "../features/settings/uiSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import procurementReducer from "../features/procurement/procurementSlice";
import vendorReducer from "../features/vendors/vendorSlice";
import riskReducer from "../features/risk/riskSlice";
import complianceReducer from "../features/compliance/complianceSlice";
import auditReducer from "../features/audit/auditSlice";
import reportReducer from "../features/reports/reportSlice";
import notificationReducer from "../features/notification/notificationSlice";

import {
  persistStore,
  persistReducer,
} from "redux-persist";

import storage from "redux-persist/es/storage";

const persistConfig = {
  key: "root",
  storage,

  whitelist: [
    "auth",
    "ui",
    "procurement",
    "notification",
    "audit",
    "report",
  ],
};

const rootReducer = combineReducers({

  auth: authReducer,

  ui: uiReducer,

  dashboard: dashboardReducer,

  procurement: procurementReducer,

  vendor: vendorReducer,

  risk: riskReducer,

  compliance: complianceReducer,

  audit: auditReducer,

  report: reportReducer,

  notification: notificationReducer,

});

const persistedReducer =
  persistReducer(
    persistConfig,
    rootReducer
  );

export const store =
  configureStore({

    reducer:
      persistedReducer,

    middleware:
      (getDefaultMiddleware) =>
        getDefaultMiddleware({

          serializableCheck: false,

        }),

    devTools: true,

  });

export const persistor =
  persistStore(store);