import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="container">
      <h2>Available games</h2>

      <div className="game">
        <div>
          Euro Track Simulator 2 <small>5 keys available</small>
        </div>
        <div>
          <Link to="/register/7UKbURnqfCUw">Claim</Link>
        </div>
      </div>
      <div className="game">
        <div>
          DiRT 4 <small>2 keys available</small>
        </div>
        <div>
          <Link to="/register/0pfZkZ7R8CZs">Claim</Link>
        </div>
      </div>
      <div className="game">
        <div>
          Destiny 2 <small>1 key available</small>
        </div>
        <div>
          <Link to="/register/Xo09iOkyw7vP">Claim</Link>
        </div>
      </div>
      <div className="game">
        <div>
          Terraria <small>7 keys available</small>
        </div>
        <div>
          <Link to="/register/vLmNQm5yft0b">Claim</Link>
        </div>
      </div>
      <div className="game unavailable">
        <div>
          Grand Theft Auto 5 <small>currently unavailable</small>
        </div>
        <div>Claim</div>
      </div>
      <div className="game unavailable">
        <div>
          Elden Ring <small>currently unavailable</small>
        </div>
        <div>Claim</div>
      </div>
    </div>
  );
};

export default Dashboard;
