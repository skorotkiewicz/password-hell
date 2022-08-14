import { useEffect, useRef, useState } from "react";
import { useGunContext } from "../context";
import { useParams } from "react-router-dom";
import Games from "../Games";

const Admin = () => {
  const params = useParams();
  const gun = useGunContext();
  const loaded = useRef<boolean>(false);
  const [data, setData] = useState<any>([]);
  const [info, setInfo] = useState<string>("");
  const [clients, setClients] = useState<string[]>([]);
  const [game, setGame] = useState<string | boolean>("");
  let ids: string[] = [];
  let idsClients: string[] = [];
  let gameId: string = "";

  useEffect(() => {
    if (!params.gameId) return setInfo("no game");
    else gameId = params.gameId.toString();

    if (loaded.current === false) {
      setGame(Games(params.gameId));

      gun
        .get("claim-dev")
        .get(gameId)
        .map()
        .once()
        .on((data: any) => {
          if (!ids.includes(`${data.fingerprint}_${data.time}`)) {
            ids.push(`${data.fingerprint}_${data.time}`);
            setData((prev: any) => [...prev, data]);

            if (!idsClients.includes(data.fingerprint)) {
              idsClients.push(data.fingerprint);
              setClients((prev: any) => [...prev, data.fingerprint]);
            }
          }
        });

      loaded.current = true;
    }
  }, []);

  useEffect(() => {
    setData(
      data.sort((a: any, b: any) => {
        return a.time - b.time;
      })
    );
  }, [data]);

  return (
    <div>
      {game && !info && (
        <>
          <h2>{game}</h2>
          <div className="a">
            {clients.map((d: any, key: number) => (
              <div className="c" key={key}>
                <strong>Client: {d}</strong>
                {data.map((dd: any, k: number) => {
                  let last = 0;
                  if (k !== 0) {
                    last = data[k - 1].time;
                  } else {
                    last = dd.time;
                  }
                  // FIXME: time between try
                  return (
                    <div key={k}>
                      {d === dd.fingerprint && (
                        <p>{(dd.time - last) / 1000}sec later</p>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Admin;
