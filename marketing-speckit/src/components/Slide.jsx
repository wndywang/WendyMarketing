import './Slide.css';

export function Slide({ slide, language, isActive, slideIndex }) {
  const content = slide.content[language];

  const renderContent = () => {
    switch (slide.type) {
      case 'cover':
        return (
          <div className="slide-cover">
            <h1 className="slide-cover-title">{content.title}</h1>
            <h2 className="slide-cover-subtitle">{content.subtitle}</h2>
            {content.description && (
              <p className="slide-cover-description">{content.description}</p>
            )}
          </div>
        );

      case 'strategy':
      case 'features':
        return (
          <div className="slide-content-wrapper">
            <h2 className="slide-title">{content.title}</h2>
            <ul className="slide-points">
              {content.points.map((point, index) => (
                <li key={index} className="slide-point">
                  {point}
                </li>
              ))}
            </ul>
          </div>
        );

      case 'feature-detail':
        return (
          <div className="slide-content-wrapper">
            <div className="slide-feature-icon">{content.icon}</div>
            <h2 className="slide-title">{content.title}</h2>
            <h3 className="slide-feature-name">{content.featureName}</h3>
            <p className="slide-feature-description">{content.description}</p>
            <ul className="slide-feature-points">
              {content.keyPoints.map((point, index) => (
                <li key={index} className="slide-feature-point">
                  {point}
                </li>
              ))}
            </ul>
          </div>
        );

      case 'next-steps':
        return (
          <div className="slide-content-wrapper">
            <h2 className="slide-title">{content.title}</h2>
            <ol className="slide-next-steps">
              {content.points.map((point, index) => (
                <li key={index} className="slide-next-step">
                  {point}
                </li>
              ))}
            </ol>
          </div>
        );

      default:
        return <div>Unknown slide type</div>;
    }
  };

  return (
    <div
      className={`slide ${isActive ? 'active' : ''} slide-type-${slide.type}`}
      data-slide-index={slideIndex}
    >
      {renderContent()}
    </div>
  );
}
