import React from "react";

import { css } from "@emotion/react";
import MoonLoader from "react-spinners/MoonLoader";

const override = css`
  display: block;
  margin: auto;
  margin-top: 100px;
  margin-bottom: 100px;
`;

export default function Spinner() {
  return <MoonLoader color="#cd204e" size="60px" css={override}></MoonLoader>;
}
