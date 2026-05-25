import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ cartCount = 0 }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("role") === "ADMIN";

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="container nav-content">
        <Link to="/home" className="logo">
          SmartPurchase
        </Link>

        <div className="nav-links">
          <Link to="/home">Home</Link>
          <Link to="/products">Products</Link>
          {isAdmin && <Link to="/add-product">Add Product</Link>}

          <Link to="/cart" className="cart-link">
            🛒
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </Link>

          {token ? (
            <button className="btn btn-outline" onClick={logout}>
              Logout
            </button>
          ) : (
            <Link to="/">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
