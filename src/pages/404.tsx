import type { NextRouter } from "next/router";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { URLS } from "../constants/url.constant";

const NotFound = (): void => {
  const { push }: NextRouter = useRouter();
  useEffect(() => {
    push(URLS.HOME);
  }, []);
};

export default NotFound;
