import './LanguageToggle.css';

export function LanguageToggle({ currentLanguage, onToggle, className = '' }) {
  return (
    <button
      className={`language-toggle ${className}`}
      onClick={onToggle}
      aria-label={`Switch to ${currentLanguage === 'en' ? 'Chinese' : 'English'}`}
    >
      <span className="language-toggle-text">
        {currentLanguage === 'en' ? '中文' : 'EN'}
      </span>
    </button>
  );
}
