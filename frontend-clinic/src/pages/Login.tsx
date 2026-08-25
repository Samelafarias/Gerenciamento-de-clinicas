import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";
import { FiUser } from "react-icons/fi";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { autenticar, getUsuarioLogado } from "../hooks/useAuth";

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100dvh;
  width: 100%;
  background-color: #004b87;
  padding: 24px 16px;
  box-sizing: border-box;
`;

const CardForm = styled.div`
  background-color: #f8fafc;
  width: 100%;
  max-width: 440px;
  padding: 40px 32px;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 480px) {
    padding: 32px 20px;
  }
`;

const LogoImage = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;

  img {
    height: 55px;
    object-fit: contain;
  }
`;

const Title = styled.h2`
  color: #003366;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 28px 0;
  text-align: center;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const Label = styled.label`
  color: #003366;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 8px;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px 42px 14px 16px;
  border: none;
  border-radius: 10px;
  background-color: #e5e7eb;
  color: #333;
  font-size: 15px;
  box-sizing: border-box;
  outline: none;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    background-color: #e2e8f0;
    box-shadow: 0 0 0 2px #004b87;
  }
`;

const IconInside = styled.span`
  position: absolute;
  right: 14px;
  color: #6b7280;
  display: flex;
  align-items: center;
  pointer-events: none;
`;

// Botão clicável para alternar a senha
const TogglePasswordButton = styled.button`
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  cursor: pointer;
  border-radius: 4px;
  transition: color 0.2s ease;

  &:hover {
    color: #004b87;
  }

  &:focus {
    outline: none;
  }
`;

const ForgotPasswordLink = styled(Link)`
  align-self: flex-end;
  color: #00a3ad;
  font-size: 13px;
  font-weight: 600;
  text-decoration: underline;
  margin-top: -4px;
  margin-bottom: 8px;

  &:hover {
    color: #00828a;
  }
`;

const SubmitButton = styled.button`
  width: 60%;
  align-self: center;
  padding: 12px;
  background-color: #004b87;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s ease, transform 0.1s ease;

  &:hover {
    background-color: #003366;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const ErrorMessage = styled.span`
  color: #d92d20;
  font-size: 13px;
  font-weight: 600;
  margin-top: -6px;
`;

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", senha: "" });
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (erro) setErro(""); // limpa erro ao digitar de novo
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErro("");

    if (!form.email || !form.senha) {
      setErro("Preencha email e senha para continuar.");
      return;
    }

    setCarregando(true);

    // Simula um pequeno delay de requisição, pra dar sensação de "chamada real"
    setTimeout(() => {
      const resultado = autenticar(form.email, form.senha);

      if (!resultado.sucesso) {
        setErro(resultado.mensagem);
        setCarregando(false);
        return;
      }

      navigate("/dashboard");
    }, 600);
  };

useEffect(() => {
  if (getUsuarioLogado()) {
    navigate("/dashboard", { replace: true });
  }
}, [navigate]);

  return (
    <LoginContainer>
      <CardForm>
        <LogoImage>
          <img src={Logo} alt="Logo da Clínica Mais Saúde" />
        </LogoImage>

        <Title>Login Administrativo</Title>

        <Form id="loginForm" onSubmit={handleSubmit} noValidate>
          <FormGroup>
            <Label htmlFor="email">Email:</Label>
            <InputWrapper>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="exemplo@email.com"
                maxLength={80}
                value={form.email}
                onChange={handleChange}
                required
              />
              <IconInside>
                <FiUser size={18} />
              </IconInside>
            </InputWrapper>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="senha">Senha:</Label>
            <InputWrapper>
              <Input
                type={showPassword ? "text" : "password"}
                id="senha"
                name="senha"
                placeholder="******"
                maxLength={50}
                value={form.senha}
                onChange={handleChange}
                required
              />
              <TogglePasswordButton
                type="button"
                onClick={togglePasswordVisibility}
                title={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
              </TogglePasswordButton>
            </InputWrapper>
          </FormGroup>

          {erro && <ErrorMessage role="alert">{erro}</ErrorMessage>}

          <ForgotPasswordLink to="/em-construcao">
            Esqueceu sua senha?
          </ForgotPasswordLink>

          <SubmitButton type="submit" disabled={carregando}>
            {carregando ? "Entrando..." : "Fazer Login"}
          </SubmitButton>
        </Form>
      </CardForm>
    </LoginContainer>
  );
};

export default Login;