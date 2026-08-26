import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";
import { FiUser } from "react-icons/fi";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { autenticar, getUsuarioLogado } from "../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", senha: "" });
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    if (getUsuarioLogado()) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (erro) setErro("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErro("");

    if (!form.email || !form.senha) {
      setErro("Preencha email e senha para continuar.");
      return;
    }

    setCarregando(true);

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

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-primary-custom p-3">
      <div
        className="bg-light rounded-4 shadow p-4 p-sm-5 w-100"
        style={{ maxWidth: "440px" }}
      >
        <div className="d-flex justify-content-center mb-4">
          <img src={Logo} alt="Logo da Clínica Mais Saúde" style={{ height: "55px", objectFit: "contain" }} />
        </div>

        <h2 className="text-primary-custom fw-bold text-center mb-4 fs-4">
          Login Administrativo
        </h2>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3 text-start">
            <label htmlFor="email" className="form-label text-primary-custom fw-bold small">
              Email:
            </label>
            <div className="position-relative">
              <input
                type="email"
                id="email"
                name="email"
                className="form-control input-bg-custom rounded-3 py-2 pe-5"
                placeholder="exemplo@email.com"
                maxLength={80}
                value={form.email}
                onChange={handleChange}
                required
              />
              <FiUser
                size={18}
                className="position-absolute top-50 end-0 translate-middle-y me-3 text-secondary"
              />
            </div>
          </div>

          <div className="mb-2 text-start">
            <label htmlFor="senha" className="form-label text-primary-custom fw-bold small">
              Senha:
            </label>
            <div className="position-relative">
              <input
                type={showPassword ? "text" : "password"}
                id="senha"
                name="senha"
                className="form-control input-bg-custom rounded-3 py-2 pe-5"
                placeholder="******"
                maxLength={50}
                value={form.senha}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                title={showPassword ? "Ocultar senha" : "Mostrar senha"}
                className="btn position-absolute top-50 end-0 translate-middle-y me-1 text-secondary p-1 border-0"
              >
                {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
              </button>
            </div>
          </div>

          {erro && (
            <div className="text-danger small fw-semibold mb-2" role="alert">
              {erro}
            </div>
          )}

          <div className="text-end mb-3">
            <Link to="/em-construcao" className="link-accent small text-decoration-underline">
              Esqueceu sua senha?
            </Link>
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={carregando}
              className="btn btn-primary-custom rounded-3 fw-semibold px-4 py-2 w-50 w-sm-auto"
            >
              {carregando ? "Entrando..." : "Fazer Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;