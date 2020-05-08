import React from "react";
import ReactLoading from "react-loading";
const styles = {
  center: {
    marginLeft: "auto",
    marginRight: "auto",
  },
};
const Loading = ({ type, color }) => (
  <div style={{ display: "flex", justifyContent: "center" }}>
    <div className={styles.center}>
      <ReactLoading type={type} color={color} height={300} width={150} />
    </div>
  </div>
);

export default Loading;
