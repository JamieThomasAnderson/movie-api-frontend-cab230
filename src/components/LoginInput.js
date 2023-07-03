import { Container } from "react-bootstrap";
import { Input } from "reactstrap";

function LoginInput({ email, password, setEmail, setPassword }) {
  return (
    <Container>
      <div className="username">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        /></div>
      <div className="password">
        <Input id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        /></div>
    </Container>
  );
}

export default LoginInput;