import React from "react";
import { Table } from "react-bootstrap";

import URL from "../../apiUrl";
import useEndPoint from "../Hooks/useEndPoint";
import DEMO from "../../store/constant";
import Loading from "../components/Loading";
import avatar1 from "../../assets/images/user/avatar-1.jpg";
import avatar2 from "../../assets/images/user/avatar-2.jpg";
import avatar3 from "../../assets/images/user/avatar-3.jpg";
export default function Models() {
  const items = useEndPoint({ method: "GET", url: URL.dev.models });
  if (items.error) {
    return <div>Error procesando solicitud</div>;
  }

  return (
    <div>
      {!items.complete ? (
        <Loading />
      ) : (
        <Table responsive hover>
          <tbody>
            {items.data.result.map((item, i) => (
              <tr className="unread">
                <td>
                  <img
                    className="rounded"
                    style={{ width: "40px" }}
                    src={item.avatar ? item.avatar : avatar1}
                    alt="activity-user"
                  />
                </td>
                <td>
                  <h6 className="mb-1">{item.full_name}</h6>
                  <p className="m-0">
                    {item.descrptions
                      ? item.descrptions[0].substring(0, 40) + " ..."
                      : "Sin descripción"}
                  </p>
                </td>
                <td>
                  <h6 className="text-muted">
                    <i className="fa fa-circle text-c-green f-10 m-r-15" />
                    {item.createdAt}
                  </h6>
                </td>
                <td>
                  <a
                    href={DEMO.BLANK_LINK}
                    className="label theme-bg2 text-white f-12"
                  >
                    Ver detalles
                  </a>
                  <a
                    href={DEMO.BLANK_LINK}
                    className="label theme-bg text-white f-12"
                  >
                    Aprobar
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
