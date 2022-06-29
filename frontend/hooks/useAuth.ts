import React from "react";

import { Context } from "../providers/AuthProvider";

export default function useAuth() {
  return React.useContext(Context);
}
