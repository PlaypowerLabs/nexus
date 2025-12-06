import React, { useState, useEffect } from "react";
import Header from "@components/Header";
import GamesGrid from "@components/GamesGrid";
import styles from "@components/Dashboard/Dashboard.module.css";
import { games, existingGames } from "@/data/games";
import { i18n } from "@/lib/i18n";
import { useLanguage } from "@/contexts/LanguageContext";

const grades = ["K", "1", "2", "3", "4", "5", "6", "7", "8"];
const ALL_TAB = "ALL";
const DEFAULT_GRADE = "K";

// Valid grades including ALL
const validGrades = [...grades, ALL_TAB];

/**
 * Get URL parameters
 */
const getUrlParams = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    grade: params.get("grade"),
    lang: params.get("lang"),
  };
};

/**
 * Update URL parameters without page reload
 */
const updateUrlParams = (updates: { grade?: string; lang?: string }, skipHistory = false) => {
  const params = new URLSearchParams(window.location.search);
  
  if (updates.grade !== undefined) {
    if (updates.grade === DEFAULT_GRADE) {
      // Remove grade param if it's the default
      params.delete("grade");
    } else {
      params.set("grade", updates.grade);
    }
  }
  
  if (updates.lang !== undefined) {
    // Only include lang in URL if it's Spanish (en is default)
    if (updates.lang === "es") {
      params.set("lang", "es");
    } else {
      // Remove lang param for English (default)
      params.delete("lang");
    }
  }
  
  const newUrl = params.toString()
    ? `${window.location.pathname}?${params.toString()}`
    : window.location.pathname;
  
  if (!skipHistory) {
    window.history.pushState({}, "", newUrl);
  }
};

/**
 * Validate grade value from URL
 */
const validateGrade = (grade: string | null): string => {
  if (!grade) return DEFAULT_GRADE;
  return validGrades.includes(grade) ? grade : DEFAULT_GRADE;
};

const Dashboard: React.FC = () => {
  const { currentLang, setLanguage } = useLanguage();
  
  // Initialize selectedGrade from URL or default
  const initializeGrade = (): string => {
    const urlParams = getUrlParams();
    return validateGrade(urlParams.grade);
  };
  
  const [selectedGrade, setSelectedGrade] = useState<string>(initializeGrade);

  // Sync with URL params on mount
  useEffect(() => {
    const urlParams = getUrlParams();
    
    // Set grade from URL
    const gradeFromUrl = validateGrade(urlParams.grade);
    setSelectedGrade(gradeFromUrl);
    
    // Set language from URL (default to "en" if not specified)
    if (urlParams.lang && (urlParams.lang === "en" || urlParams.lang === "es")) {
      setLanguage(urlParams.lang);
    } else if (!urlParams.lang) {
      // Explicitly set to "en" if no lang param in URL
      setLanguage("en");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const params = getUrlParams();
      const grade = validateGrade(params.grade);
      setSelectedGrade(grade);
      
      // Sync language from URL on navigation
      if (params.lang && (params.lang === "en" || params.lang === "es")) {
        if (params.lang !== currentLang) {
          setLanguage(params.lang);
        }
      } else if (!params.lang && currentLang !== "en") {
        // If no lang param, default to English
        setLanguage("en");
      }
    };
    
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [currentLang, setLanguage]);

  const getUniqueGamesByGameName = (list: typeof games) => {
    const seen = new Set<string>();
    return list.filter((g) => {
      if (g.id === 'multiverse-algo-checker') return false;
      const gameName = g.gameName || '';
      if (seen.has(gameName) || g.disabled) return false;
      seen.add(gameName);
      return true;
    });
  };

  const filteredGames = (selectedGrade === ALL_TAB
    ? getUniqueGamesByGameName(games)
    : games.filter(
        (g) => g.grade && g.grade === selectedGrade && g.id !== 'multiverse-algo-checker'
      )
  );

  // sort filteredGames by not disabled first, then disabled
  filteredGames.sort((a, b) => {
    if (!a.disabled && b.disabled) return -1;
    if (a.disabled && !b.disabled) return 1;
    return 0;
  });

  const handleLanguageToggle = () => {
    const newLang = currentLang === "en" ? "es" : "en";
    setLanguage(newLang);
    updateUrlParams({ lang: newLang });
  };

  const handleGradeChange = (grade: string) => {
    setSelectedGrade(grade);
    updateUrlParams({ grade });
  };

  return (
    <main className={styles.container} role="main" aria-label="Dashboard">
      <div className={styles.wrapper}>
        <Header />
        
        {/* Language Toggle */}
        <div className={styles.languageToggle}>
          <button
            onClick={handleLanguageToggle}
            className={`${styles.languageButton} ${currentLang === "en" ? styles.activeLang : ""}`}
            aria-label="Switch to English"
          >
            EN
          </button>
          <button
            onClick={handleLanguageToggle}
            className={`${styles.languageButton} ${currentLang === "es" ? styles.activeLang : ""}`}
            aria-label="Switch to Spanish"
          >
            ES
          </button>
        </div>

        {/* Grade Tabs */}
        <div className={styles.gradeTabs}>
          {grades.map((grade) => (
            <button
              key={grade}
              className={`${styles.gradeTab} 
              ${selectedGrade === grade ? styles.activeTab : ""}
              ${grade == 'K'  && i18n.getLanguage() == 'es' ? styles.kGradeTab : ''}`}
              onClick={() => handleGradeChange(grade)}
              aria-selected={selectedGrade === grade}
              role="tab"
            >
              {grade === 'K' ? i18n.t('gradeK') : `${i18n.t('grade')} ${grade}`}
            </button>
          ))}
          <button
            key={ALL_TAB}
            className={`${styles.gradeTab} ${selectedGrade === ALL_TAB ? styles.activeTab : ""}`}
            onClick={() => handleGradeChange(ALL_TAB)}
            aria-selected={selectedGrade === ALL_TAB}
            role="tab"
          >
            {i18n.t('allGames')}
          </button>
        </div>

        <section>
          <GamesGrid
            games={filteredGames}
            onGameClick={(path) => window.open(path, "_blank")}
            isExistingGame={false}
            hideDetails={selectedGrade === ALL_TAB}
          />
        </section>
        {import.meta.env.VITE_SHOW_EXISTING_GAMES === 'true' && (
          <section>
            <h2 className={styles.existingGamesTitle}>{i18n.t('existingGames')}</h2>
            <GamesGrid
              games={existingGames}
              onGameClick={(path) => window.open(path, "_blank")}
              isExistingGame={true}
            />
          </section>
        )}
      </div>
    </main>
  );
};

export default Dashboard;
