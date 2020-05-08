import React, { useState, useEffect } from "react";
import Axios from "axios";
export default function useEndpoint(req) {
  const [res, setRes] = useState({
    data: null,
    complete: false,
    pending: false,
    error: false,
  });
  useEffect(() => {
    setRes({
      data: null,
      pending: true,
      error: false,
      complete: false,
    });
    Axios(req)
      .then((res) =>
        setRes({
          data: res.data,
          pending: false,
          error: false,
          complete: true,
        })
      )
      .catch(() =>
        setRes({
          data: null,
          pending: false,
          error: true,
          complete: true,
        })
      );
  }, [req.url]);
  return res;
}
