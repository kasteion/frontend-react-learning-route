import React from "react";
import md5 from "md5";

const Gravatar = (props) => {
  const email = props.email || "";
  const emailmd5 = md5(email);
  return (
    <img
      className={props.className}
      src={`https://www.gravatar.com/avatar/${emailmd5}?d=identicon`}
      alt="Avatar"
    ></img>
  );
};

export default Gravatar;
