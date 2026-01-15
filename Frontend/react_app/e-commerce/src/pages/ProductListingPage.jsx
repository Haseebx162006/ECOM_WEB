import ProductListingLayout from '../containers/ProductListing/ProductListingLayout';
import { useProductListing } from '../hooks/useProductListing';
import './ProductListingPage.css';

function ProductListingPage() {
  const listing = useProductListing();

  if (listing.loading) {
    return <div className="product-listing-page"><div className="listing-header"><h1>Loading...</h1></div></div>;
  }

  if (listing.error) {
    return (
      <div className="product-listing-page">
        <div className="listing-header">
          <h1>Oops!</h1>
          <p>{listing.error}</p>
        </div>
      </div>
    );
  }

  return <ProductListingLayout {...listing} />;
}

export default ProductListingPage;
