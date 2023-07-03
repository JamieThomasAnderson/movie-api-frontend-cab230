import { Input } from "reactstrap";

import LoginInput from "./LoginInput";
import { Container } from "react-bootstrap";

function RegisterInput({ email, password, passwordConfirm, setEmail, setPassword, setPasswordConfirm }) {
  return (
    <Container>

      <LoginInput
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword} />

      <div className="confirmPassword">
        <Input id="password"
          type="password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          placeholder="Confirm Password"
        /></div>
    </Container>
  );
}

export default RegisterInput;