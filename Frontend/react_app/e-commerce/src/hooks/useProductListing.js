import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../services/api';

const DEFAULT_PRICE_RANGE = [0, 500];

export function useProductListing() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [priceRange, setPriceRange] = useState(DEFAULT_PRICE_RANGE);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('relevance');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewType, setViewType] = useState('grid');

  const itemsPerPage = 12;

  // Fetch products from mock API once
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const products = await api.getProducts();
        setAllProducts(products);
        setError(null);
      } catch (err) {
        console.error('Failed to load products', err);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Sync state with URL search params when they change
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const searchParam = searchParams.get('search');
    
    if (categoryParam && categoryParam !== selectedCategory) {
      setSelectedCategory(categoryParam);
      setCurrentPage(1);
    } else if (!categoryParam && selectedCategory !== 'All') {
      setSelectedCategory('All');
      setCurrentPage(1);
    }
    
    if (searchParam !== null && searchParam !== searchQuery) {
      setSearchQuery(searchParam);
      setCurrentPage(1);
    }
  }, [searchParams]);

  // Derived categories
  const categories = useMemo(() => {
    const base = new Set(['All']);
    allProducts.forEach((p) => p.category && base.add(p.category));
    return Array.from(base);
  }, [allProducts]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let products = [...allProducts];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      products = products.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== 'All') {
      products = products.filter((p) => p.category === selectedCategory);
    }

    products = products.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1] && (p.rating || 0) >= minRating
    );

    switch (sortBy) {
      case 'price-low':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        products.sort((a, b) => b.id - a.id);
        break;
      case 'rating':
        products.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'relevance':
      default:
        break;
    }

    return products;
  }, [allProducts, searchQuery, selectedCategory, priceRange, minRating, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  // Handlers
  const handlePriceChange = (value, type) => {
    if (type === 'min') {
      setPriceRange(([_, max]) => [Math.min(value, max), max]);
    } else {
      setPriceRange(([min]) => [min, Math.max(value, min)]);
    }
    setCurrentPage(1);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    setSearchParams({ category: category !== 'All' ? category : '' });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ search: searchQuery });
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setPriceRange(DEFAULT_PRICE_RANGE);
    setMinRating(0);
    setSortBy('relevance');
    setCurrentPage(1);
    setSearchParams({});
  };

  return {
    loading,
    error,
    categories,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    minRating,
    setMinRating,
    sortBy,
    setSortBy,
    currentPage,
    setCurrentPage,
    viewType,
    setViewType,
    filteredProducts,
    paginatedProducts,
    totalPages,
    startIndex,
    itemsPerPage,
    handlePriceChange,
    handleCategoryChange,
    handleSearch,
    handleReset,
  };
}

export default useProductListing;
