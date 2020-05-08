import React, { useState, useEffect } from "react";
import { Table, Badge } from "react-bootstrap";
import useEndPoint from "../Hooks/useEndPoint";
import URL from "../../apiUrl";
import Loading from "../components/Loading";
import TableInfoCustom from "../components/TableInfoCustom";
 
export default function CitiesTable() {
  const items = useEndPoint({ method: "GET", url: URL.dev.cities });
  if (items.error) {
    return <div>Error procesando solicitud</div>;
  }

  return (
   
    <div>
      {!items.complete ? (
        <Loading type="bubbles" color="#1de9b6" />
      ) : (
        <TableInfoCustom
          title="Nacionalidades"
          routeCreate="/nationalities/created"
        >
          <Table responsive hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Nacionalidad</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {items.data.map((item, i) => (
                <tr key={item._id}>
                  <th scope="row">{i + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.nationality_id.name}</td>
                  <td>
                    {item.status ? (
                      <Badge variant="success">Activo</Badge>
                    ) : (
                      <Badge variant="danger">Inacitvo</Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableInfoCustom>
      )}
    </div>
  );
}
