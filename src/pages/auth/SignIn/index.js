import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/form/Button";
import { Form } from "../../../components/form/Form";
import { Input } from "../../../components/form/Input";
import TrackItLink from "../../../components/Link";
import { AuthContext } from "../../../context/AuthContext";
import Layout from "../components/Layout";

export default function SignIn() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [disableForm, setDisableForm] = useState(false);
  const navigate = useNavigate();
  const context = useContext(AuthContext);

  function updateDisabledForm() {
    setDisableForm((prev) => !prev);
  }

  function handleForm(e) {
    e.preventDefault();
    updateDisabledForm();
    const promise = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login",
      user
    );

    promise.then((res) => {
      const { token, name, email, image } = res.data;
      const user = {
        token,
        name,
        email,
        image,
      };
      context.setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/habitos");
    });

    promise.catch((err) => {
      updateDisabledForm();
      alert("Aconteceu algum problema!\nVerifique os campos!");
    });
  }

  return (
    <Layout>
      <Form onSubmit={handleForm}>
        <Input
          placeholder="email"
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          disabled={disableForm}
        />
        <Input
          placeholder="senha"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          disabled={disableForm}
        />
        <Button>Entrar</Button>
      </Form>
      <TrackItLink to="/cadastro" text="Não tem uma conta? Cadastre-se!" />
    </Layout>
  );
}
