import React from "react";

import { Context } from "~/providers/HttpProvider";

export default function useHttp() {
  return React.useContext(Context);
}
