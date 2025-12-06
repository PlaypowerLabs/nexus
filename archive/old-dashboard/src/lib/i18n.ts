// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Translations = Record<string, any>;

export interface I18nConfig {
  resources: {
    [lang: string]: {
      translation: Translations;
    };
  };
  fallbackLng?: string;
  debug?: boolean;
}

export class I18nHelper {
  private static instance: I18nHelper;
  private initialized = false;
  private currentLanguage: string = 'en';
  private translations: { [lang: string]: Translations } = {};
  private fallbackLanguage: string = 'en';
  private debug: boolean = false;
  private listeners: Set<(lang: string) => void> = new Set();

  private constructor() { }

  public static getInstance(): I18nHelper {
    if (!I18nHelper.instance) {
      I18nHelper.instance = new I18nHelper();
    }
    return I18nHelper.instance;
  }

  public init(config: I18nConfig): void {
    if (this.initialized) {
      console.warn('i18n already initialized');
      return;
    }

    this.fallbackLanguage = config.fallbackLng || 'en';
    this.debug = config.debug || false;
    
    // Store translations
    Object.entries(config.resources).forEach(([lang, resource]) => {
      this.translations[lang] = resource.translation;
    });

    // Set initial language to fallback
    this.currentLanguage = this.fallbackLanguage;
    this.initialized = true;

    if (this.debug) {
      console.log('[i18n] Initialized with languages:', Object.keys(this.translations));
    }
  }

  public getLanguage(): string {
    return this.currentLanguage;
  }

  public setLanguage(lang: string): void {
    if (!this.initialized) {
      throw new Error('i18n not initialized');
    }

    if (Object.keys(this.translations).includes(lang)) {
      this.currentLanguage = lang;
      
      if (this.debug) {
        console.log('[i18n] Language changed to:', lang);
      }

      // Notify all listeners
      this.listeners.forEach(listener => listener(lang));
    } else {
      console.warn(`Language ${lang} not available`);
    }
  }

  public onLanguageChanged(callback: (lang: string) => void): () => void {
    this.listeners.add(callback);
    
    // Return unsubscribe function
    return () => {
      this.listeners.delete(callback);
    };
  }

  public t(key: string): string {
    if (!this.initialized) {
      throw new Error('i18n not initialized');
    }

    const translations = this.translations[this.currentLanguage];
    
    if (translations && translations[key]) {
      return translations[key];
    }

    // Try fallback language
    const fallbackTranslations = this.translations[this.fallbackLanguage];
    if (fallbackTranslations && fallbackTranslations[key]) {
      if (this.debug) {
        console.warn(`[i18n] Key '${key}' not found in '${this.currentLanguage}', using fallback`);
      }
      return fallbackTranslations[key];
    }

    // Return key if not found
    console.warn(`[i18n] Translation key '${key}' not found`);
    return key;
  }

  /**
   * Format a number according to the current locale
   * @param num The number to format
   * @param options Intl.NumberFormatOptions
   * @returns Formatted number string
   */
  public formatNumber(num: number, options?: Intl.NumberFormatOptions): string {
    const locale = this.getLanguage();
    const defaultOptions: Intl.NumberFormatOptions = {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0
    };

    return new Intl.NumberFormat(
      locale,
      { ...defaultOptions, ...options }
    ).format(num);
  }

  /**
   * Format a number for screen reader accessibility
   * For Spanish, this provides number words for better pronunciation
   * @param num The number to format
   * @returns Formatted number string optimized for screen readers
   */
  public formatNumberForScreenReader(num: number): string {
    const locale = this.getLanguage();
    
    if (locale === 'es') {
      // Spanish number words for better screen reader pronunciation
      const spanishNumbers: { [key: number]: string } = {
        0: 'cero',
        1: 'uno',
        2: 'dos',
        3: 'tres',
        4: 'cuatro',
        5: 'cinco',
        6: 'seis',
        7: 'siete',
        8: 'ocho',
        9: 'nueve',
        10: 'diez'
      };
      
      return spanishNumbers[num] || num.toString();
    }
    
    // For other languages, use regular number formatting
    return this.formatNumber(num);
  }

  /**
   * Format a number as an ordinal
   * @param num The number to format
   * @returns Formatted ordinal string
   */
  public formatOrdinal(num: number): string {
    const locale = this.getLanguage();
    // Use a different approach for ordinals since Intl.NumberFormat doesn't support ordinal style
    const rules = new Intl.PluralRules(locale, { type: 'ordinal' });
    const suffix = rules.select(num);

    // Map common ordinal suffixes based on the plural rule
    const suffixes: Record<string, string> = {
      one: 'st',
      two: 'nd',
      few: 'rd',
      other: 'th'
    };

    return `${num}${suffixes[suffix] || suffixes.other}`;
  }

  /**
   * Format a decimal number specifically for math education context
   * @param num The number to format
   * @returns Formatted decimal string
   */
  public formatDecimal(num: number, decimals: number = 2): string {
    const locale = this.getLanguage();
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(num);
  }

  /**
   * Format a fraction
   * @param numerator The top number
   * @param denominator The bottom number
   * @returns Formatted fraction string
   */
  public formatFraction(numerator: number, denominator: number): string {
    return `${this.formatNumber(numerator)}/${this.formatNumber(denominator)}`;
  }
}

export const i18n = I18nHelper.getInstance();

