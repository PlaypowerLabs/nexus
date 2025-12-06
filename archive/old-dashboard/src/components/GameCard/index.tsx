import React from 'react';
import { Button } from '../ui/button';
import styles from '@components/GameCard/GameCard.module.css';
import { i18n } from '@/lib/i18n';
import { useLanguage } from '@/contexts/LanguageContext';

interface GameCardProps {
    id: string;
    grade: string;
    image: string;
    onClick: () => void;
    disabled?: boolean;
    path?: string;
    isExistingGame?: boolean;
    hideDetails?: boolean;
    scormUrl?: string;
    scormUrlEs?: string;
    title?: string;
    titleEs?: string;
    txTitle?: string;
    txTitleEs?: string;
    description?: string;
    lastUpdated?: string;
}

const GameCard: React.FC<GameCardProps> = ({
    id,
    grade,
    image,
    onClick,
    disabled = false,
    path,
    isExistingGame = false,
    hideDetails = false,
    title,
    titleEs,
    txTitle,
    txTitleEs,
    description,
}) => {
    const { currentLang } = useLanguage();
    const imageUrl = isExistingGame ? image.replace('.png', '-en.png') : image.replace('.png', `-${currentLang}.png`);

    // Get the appropriate titles based on language
    const displayTitle = currentLang === 'es' ? titleEs : title;
    const displayTxTitle = currentLang === 'es' ? txTitleEs : txTitle;

    // Check feature flag for showing titles
    const showTitles = import.meta.env.VITE_SHOW_GAME_CARD_TITLES === 'true';

    const handlePlayClick = () => {
        if (isExistingGame) {
            onClick();
        } else {
            const url = new URL(path!);
            url.searchParams.set('lang', currentLang || 'en');
            window.open(url.toString(), '_blank');
        }
    };

    return (
        <div className={`${styles.gameCard} ${disabled ? styles.disabledCard : ''}`} aria-disabled={disabled}>
            <div className={styles.gameImageWrapper}>
                <img
                    src={imageUrl}
                    alt={isExistingGame ? i18n.t(`existingGamesData.${id}.title`) : i18n.t(`title.grade${grade}.${id}`)}
                    className={styles.gameImage}
                />
            </div>
            <div className={styles.gameContent}>
                {isExistingGame ? (
                    <>
                        {!hideDetails && (
                            <>
                                <h3 className={styles.gameTitle}>{i18n.t(`existingGamesData.${id}.title`)}</h3>
                                <p className={styles.gameDescription}>{i18n.t(`existingGamesData.${id}.description`)}</p>
                            </>
                        )}
                    </>
                ) : (
                    <>
                        {!hideDetails && (
                            <>
                                {showTitles && displayTitle && (
                                    <h3 className={styles.gameTitle}>{displayTitle}</h3>
                                )}
                                {showTitles && displayTxTitle && (
                                    <p className={styles.txTitle}>{displayTxTitle}</p>
                                )}
                                <p className={styles.gameDescription}>{description}</p>
                            </>
                        )}
                    </>
                )}
                <div className={styles.gameFooter}>
                    {!disabled && (
                        <Button
                            variant='default'
                            className={`${styles.playButton} w-[120px]`}
                            onClick={handlePlayClick}
                        >
                            {i18n.t('playNow')}
                        </Button>
                    )}
                    {disabled && <span className={styles.playText}>{i18n.t('comingSoon')}</span>}
                </div>
            </div>
        </div>
    );
};

export default GameCard;
