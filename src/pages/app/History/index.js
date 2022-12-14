import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import Layout from "../components/Layout";

export default function History() {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const [ok, setOk] = useState(false);
  useEffect(() => {
    if (JSON.stringify(context.user) === "{}") isSignin();
    else setOk(true);
  }, []);

  function isSignin() {
    navigate("/");
  }
  return (
    <>
      {ok ? (
        <Layout>
          Em breve você poderá ver o histórico dos seus hábitos aqui!
        </Layout>
      ) : (
        ""
      )}
    </>
  );
}
