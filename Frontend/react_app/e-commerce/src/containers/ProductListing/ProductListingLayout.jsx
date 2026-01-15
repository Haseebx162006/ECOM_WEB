import ProductCard from '../../components/common/ProductCard';

function ProductListingLayout({
  categories,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  handleCategoryChange,
  priceRange,
  handlePriceChange,
  minRating,
  setMinRating,
  sortBy,
  setSortBy,
  viewType,
  setViewType,
  filteredProducts,
  paginatedProducts,
  startIndex,
  itemsPerPage,
  totalPages,
  currentPage,
  setCurrentPage,
  handleSearch,
  handleReset,
}) {
  return (
    <div className="product-listing-page">
      <div className="listing-header">
        <h1>Our Products</h1>
        <p>Explore our wide range of quality products</p>
      </div>

      <div className="listing-container">
        <aside className="filters-sidebar">
          <div className="filter-section">
            <h3 className="filter-title">Filters</h3>

            <form className="search-form" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-submit">🔍</button>
            </form>

            <div className="filter-group">
              <h4>Category</h4>
              <div className="category-list">
                {categories.map((cat) => (
                  <label key={cat} className="category-label">
                    <input
                      type="radio"
                      name="category"
                      value={cat}
                      checked={selectedCategory === cat}
                      onChange={() => handleCategoryChange(cat)}
                    />
                    <span>{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <h4>Price Range</h4>
              <div className="price-inputs">
                <div className="price-input-group">
                  <label>Min: ${priceRange[0]}</label>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={priceRange[0]}
                    onChange={(e) => handlePriceChange(Number(e.target.value), 'min')}
                    className="price-range-slider"
                  />
                </div>
                <div className="price-input-group">
                  <label>Max: ${priceRange[1]}</label>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={priceRange[1]}
                    onChange={(e) => handlePriceChange(Number(e.target.value), 'max')}
                    className="price-range-slider"
                  />
                </div>
              </div>
            </div>

            <div className="filter-group">
              <h4>Minimum Rating</h4>
              <div className="rating-filter">
                {[0, 1, 2, 3, 4, 5].map((rating) => (
                  <label key={rating} className="rating-label">
                    <input
                      type="radio"
                      name="rating"
                      value={rating}
                      checked={minRating === rating}
                      onChange={() => {
                        setMinRating(rating);
                        setCurrentPage(1);
                      }}
                    />
                    <span>
                      {'★'.repeat(rating)}
                      {'☆'.repeat(5 - rating)}
                      {rating > 0 && ` & up`}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <button className="reset-filters-btn" onClick={handleReset}>
              Reset Filters
            </button>
          </div>
        </aside>

        <main className="products-main">
          <div className="listing-toolbar">
            <div className="results-info">
              <p>
                Showing {startIndex + 1}-
                {Math.min(startIndex + itemsPerPage, filteredProducts.length)} of {filteredProducts.length} products
              </p>
            </div>

            <div className="toolbar-controls">
              <div className="view-toggle">
                <button
                  className={`view-btn ${viewType === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewType('grid')}
                  title="Grid View"
                >
                  ⊞
                </button>
                <button
                  className={`view-btn ${viewType === 'list' ? 'active' : ''}`}
                  onClick={() => setViewType('list')}
                  title="List View"
                >
                  ☰
                </button>
              </div>

              <select
                className="sort-dropdown"
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="relevance">Sort: Relevance</option>
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {paginatedProducts.length > 0 ? (
            <div className={`products-${viewType}`}>
              {paginatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  variant={viewType === 'list' ? 'list' : 'default'}
                />
              ))}
            </div>
          ) : (
            <div className="no-products">
              <p>No products found. Try adjusting your filters.</p>
              <button className="reset-filters-btn" onClick={handleReset}>
                Clear All Filters
              </button>
            </div>
          )}

          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="pagination-btn"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              <div className="pagination-numbers">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    className={`page-number ${currentPage === page ? 'active' : ''}`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                className="pagination-btn"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default ProductListingLayout;
