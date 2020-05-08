import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Table, Badge } from "react-bootstrap";
import Aux from "../../hoc/_Aux";

export default function TableInfoCustom({ title, routeCreate, children }) {
  return (
    <Aux>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">{title ? title : "Sin titulo"}</Card.Title>
              <span className="d-block m-t-5">
                listado <code>{title ? title : "Sin titulo"}</code> registrados
                <Link
                  to={routeCreate ? routeCreate : "/#"}
                  className="float-right btn btn-info"
                >
                  Crear nuevo
                </Link>
              </span>
            </Card.Header>
            <Card.Body>{children}</Card.Body>
          </Card>
        </Col>
      </Row>
    </Aux>
  );
}
