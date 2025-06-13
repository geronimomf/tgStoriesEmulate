import { useEffect, useState } from 'react';
import styled from 'styled-components';

const StoriesContainer = styled.div`
  width: 100vw;
  height: var(--tg-viewport-stable-height);
  position: relative;
  overflow: hidden;
  background: #000;
`;

const Story = styled.div<{ background: string }>`
  width: 100%;
  height: 100%;
  background: ${props => props.background};
  position: absolute;
  top: 0;
  left: 0;
  transition: opacity 0.3s ease;
  opacity: 0;
  
  &.active {
    opacity: 1;
    z-index: 1;
  }
`;

const ProgressContainer = styled.div`
  position: absolute;
  top: max(10px, env(safe-area-inset-top));
  left: 10px;
  right: 10px;
  display: flex;
  gap: 5px;
  z-index: 2;
`;

const ProgressBar = styled.div<{ progress: number }>`
  height: 2px;
  flex: 1;
  background: rgba(255, 255, 255, 0.3);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: ${props => props.progress}%;
    background: white;
    transition: width 0.1s linear;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: max(10px, env(safe-area-inset-top));
  right: 10px;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  z-index: 2;
  padding: 10px;
  -webkit-tap-highlight-color: transparent;
  
  &:active {
    opacity: 0.7;
  }
`;

const STORY_DURATION = 5000; // 5 seconds per story
const STORIES = [
  { background: '#8B5CF6' }, // Фиолетовый
  { background: '#EF4444' }  // Красный
];

export const Stories = () => {
  const [currentStory, setCurrentStory] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / (STORY_DURATION / 100));
        
        // Если прогресс достиг 100%
        if (newProgress >= 100) {
          // Если это первая история
          if (currentStory === 0) {
            setCurrentStory(1); // Переключаемся на вторую историю
            return 0; // Сбрасываем прогресс
          }
          // Если это вторая (последняя) история
          else {
            clearInterval(interval);
            window.Telegram?.WebApp?.close();
            return 100;
          }
        }
        
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [currentStory]);

  const handleClose = () => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.close();
    }
  };

  return (
    <StoriesContainer>
      <ProgressContainer>
        {STORIES.map((_, index) => (
          <ProgressBar
            key={index}
            progress={index === currentStory ? progress : index < currentStory ? 100 : 0}
          />
        ))}
      </ProgressContainer>
      
      <CloseButton onClick={handleClose}>✕</CloseButton>

      {STORIES.map((story, index) => (
        <Story
          key={index}
          background={story.background}
          className={index === currentStory ? 'active' : ''}
        />
      ))}
    </StoriesContainer>
  );
}; 