import { Link } from "react-router-dom";
import { gamesList } from "../Games";

const Dashboard = () => {
  return (
    <div className="container">
      <h2>Available games</h2>

      {gamesList.map((d: any, k: number) => (
        <div key={k} className={`game ${d.keys === 0 ? "unavailable" : ""}`}>
          <div>
            {d.title}

            <small>
              {d.keys === 0 ? (
                <>currently unavailable</>
              ) : (
                <>
                  {d.keys} key{d.keys > 1 && "s"} available
                </>
              )}
            </small>
          </div>
          <div>
            {d.keys === 0 ? (
              "Claim"
            ) : (
              <Link to={`/register/${d.id}`}>Claim</Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
