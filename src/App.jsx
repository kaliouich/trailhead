import React, { useEffect, useState } from "react";

// Where the storefront reads its catalog from.
// A relative path keeps the request on the same origin as the page, so the browser
// asks for no CORS permission. Replacing this with a full URL on another host is
// what turns the same fetch into a cross-origin request.
const CATALOG_URL = "/products.json";

function ProductCard({ product }) {
  return (
    <li className="card">
      <span className="category">{product.category}</span>
      <h2>{product.name}</h2>
      <p className="price">{product.price} EUR</p>
    </li>
  );
}

export default function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadCatalog() {
      // The catch is here because a failed catalog fetch is the one error this app
      // is expected to hit, and the message on screen is what you debug from.
      try {
        const response = await fetch(CATALOG_URL);
        const catalog = await response.json();
        setProducts(catalog);
      } catch (fetchError) {
        setError(fetchError.message);
      }
    }

    loadCatalog();
  }, []);

  return (
    <main>
      <header>
        <h1>Trailhead</h1>
        <p>Gear for people who would rather be outside.</p>
      </header>

      {error && <p className="error">Catalog unavailable: {error}</p>}

      <ul className="catalog">
        {products.map(function renderProduct(product) {
          return <ProductCard key={product.id} product={product} />;
        })}
      </ul>
    </main>
  );
}
