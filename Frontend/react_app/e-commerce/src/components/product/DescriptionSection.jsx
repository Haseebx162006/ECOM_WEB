import { useState } from 'react';
import './DescriptionSection.css';

function DescriptionSection({ 
  description = '', 
  features = [], 
  specifications = [],
  shipping = 'Free shipping on orders over $50'
}) {
  const [activeTab, setActiveTab] = useState('description');

  return (
    <div className="description-section">
      {/* Tab Navigation */}
      <div className="tabs-navigation">
        <button 
          className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
          onClick={() => setActiveTab('description')}
        >
          Description
        </button>
        <button 
          className={`tab-btn ${activeTab === 'specifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('specifications')}
        >
          Specifications
        </button>
        <button 
          className={`tab-btn ${activeTab === 'shipping' ? 'active' : ''}`}
          onClick={() => setActiveTab('shipping')}
        >
          Shipping & Returns
        </button>
      </div>

      {/* Tab Content */}
      <div className="tabs-content">
        {/* Description Tab */}
        {activeTab === 'description' && (
          <div className="tab-pane">
            <h2>Product Description</h2>
            <p className="description-text">
              {description}
            </p>

            {features && features.length > 0 && (
              <div className="features-section">
                <h3>Features & Benefits</h3>
                <ul className="features-grid">
                  {features.map((feature, index) => (
                    <li key={index}>
                      <span className="feature-check">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Specifications Tab */}
        {activeTab === 'specifications' && (
          <div className="tab-pane">
            <h2>Technical Specifications</h2>
            {specifications && specifications.length > 0 ? (
              <table className="specifications-table">
                <tbody>
                  {specifications.map((spec, index) => (
                    <tr key={index}>
                      <td className="spec-label">{spec.label}</td>
                      <td className="spec-value">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="no-data">No specifications available</p>
            )}
          </div>
        )}

        {/* Shipping & Returns Tab */}
        {activeTab === 'shipping' && (
          <div className="tab-pane">
            <h2>Shipping & Returns</h2>
            <div className="shipping-details">
              <div className="shipping-item">
                <h4>📦 Shipping Information</h4>
                <p>{shipping}</p>
                <ul>
                  <li>Standard Shipping: 5-7 business days</li>
                  <li>Express Shipping: 2-3 business days</li>
                  <li>Overnight Shipping: 1 business day</li>
                </ul>
              </div>

              <div className="return-policy">
                <h4>🔄 Return Policy</h4>
                <ul>
                  <li>30-day money-back guarantee</li>
                  <li>Free returns on defective items</li>
                  <li>Return shipping paid by us</li>
                  <li>No questions asked returns</li>
                </ul>
              </div>

              <div className="warranty-info">
                <h4>🛡️ Warranty</h4>
                <ul>
                  <li>2-Year Manufacturer's Warranty</li>
                  <li>Covers manufacturing defects</li>
                  <li>Extended warranty available</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DescriptionSection;
