import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ClientJS } from "clientjs";
import axios from "axios";
import { useGunContext } from "../context";
import { nanoid } from "nanoid";
import { Games } from "../Games";

const Register = () => {
  const params = useParams();
  const [game, setGame] = useState<string | undefined>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [info, setInfo] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const client = new ClientJS();
  const fingerprint = client.getFingerprint();
  const gun = useGunContext();
  const SEA = Gun.SEA;

  useEffect(() => {
    if (!params.gameId) return;
    else setGame(Games(params.gameId)?.title);
  }, []);

  const register = useCallback(async () => {
    let gameId: string = "";

    if (!params.gameId) return;
    else gameId = params.gameId.toString();

    if (password !== confirmPassword) {
      return setInfo("Passwords are not the same.");
    }

    setLoading(true);
    setInfo("");

    const time = Date.now();
    const salt: any = nanoid();
    const hash: any = await SEA.work({ time, game }, salt, null, {
      name: "SHA-256",
    });

    setTimeout(() => {
      gun
        .get("claim-dev")
        .get(gameId)
        .get(hash)
        .put({ time, fingerprint: fingerprint.toString() }, (ack: any) => {
          if (!ack.err) {
            // setLoading(false);
          }
        });

      axios
        .get("https://api.passwordpurgatory.com/make-hell?password=" + password)
        .then((res) => {
          setInfo(res.data?.message);
          setLoading(false);
        })
        .catch(() => {
          setInfo(
            "There was a problem during registration, try again in a while"
          );
          setLoading(false);
        });
    }, 1000 * Math.floor(Math.random() * (10 - 1 + 1) + 1));
  }, [name, password, confirmPassword]);

  return (
    <div className="container">
      {game ? (
        <>
          <h2>Register</h2>
          <div className="game claim">{game}</div>
          <div className="registerForm">
            <div>
              <input
                type="text"
                placeholder="Username"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password Confirmation"
                name="confirm"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {info && <div className="info">{info}</div>}
            <div>
              {loading ? (
                <button className="process">please wait</button>
              ) : (
                <button onClick={register}>Register</button>
              )}
            </div>
          </div>
        </>
      ) : (
        <>game not unavailable</>
      )}
    </div>
  );
};

export default Register;
