import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Slider from 'rc-slider';

import * as Styles from './Player.styles';

interface PlayerProps {
  children?: React.ReactNode;
  air?: boolean;
};

const { STREAM_URL = '[]' } = process.env;

const Player: React.FC<PlayerProps> = ({ children, air }) => {
  const [volume, setStateVolume] = useState(0.6);
  const [playing, setPlaying] = useState(false);

  const getAudioInstance = (): HTMLAudioElement => document.querySelector('#audio') as HTMLAudioElement;

  const setVolume = (volume: number): void => {
    const instance = getAudioInstance();
    if (instance) {
      instance.volume = volume;
    }
    window.localStorage.setItem('cube:volume', String(volume));
    setStateVolume(volume);
  };

  const getVolume = () => {
    const volumeStr = window.localStorage.getItem('cube:volume');
    return volumeStr ? Number(volumeStr) : 0.6;
  }
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const volume = getVolume();
      setVolume(volume);
    }
  }, []);

  const play = () => {
    const instance = getAudioInstance();
    if (!instance) return;
    instance.childNodes.forEach((child: any, index) => {
      const sources = JSON.parse(STREAM_URL);
      child.src = sources[index];
    });
    
    instance.load();
    instance.play();
  }

  const stop = () => {
    const instance = getAudioInstance();
    if (!instance) return;
    instance.currentTime = 0;
    instance.pause();
    instance.childNodes.forEach((child: any, index) => {
      child.src = null;
    });
  }

  const onPlay = () => {
    setVolume(getVolume());
    setPlaying(true);
    play();
  };

  const onStop = () => {
    setVolume(getVolume());
    stop();
    setPlaying(false);
  };


  const onChangeVolume = (volume: number): void => {
    setVolume(volume);
  };

  const SliderComponent: any = Slider;
  return (
    <Styles.Wrapper>
      <Styles.ActionWrapper>
        <Styles.M3U href="/cube.m3u" target="_blank">M3U</Styles.M3U>
        <Styles.Button isAir={air} isActive={playing} onClick={playing ? onStop : onPlay}>
          <Styles.ButtonContent>
            {playing ? 'Stop' : 'Play'}
          </Styles.ButtonContent>
        </Styles.Button>
      </Styles.ActionWrapper>
      <Styles.Content>
        {children}
        <Styles.SliderWrapper>
          <SliderComponent value={volume} step={0.01} min={0} max={1} onChange={onChangeVolume} />
        </Styles.SliderWrapper>
      </Styles.Content>
      <audio id="audio" preload="none">
        {JSON.parse(STREAM_URL).map((source: string) => {
          const resRx = source.match(/\.(.{3,4})$/);
          const [, type] = (resRx || []);
          return (
            <source key={type} src="" type={`audio/${type}`} />
          );
        })}
      </audio> 
    </Styles.Wrapper>
  );
};

Player.propTypes = {
  children: PropTypes.node,
  air: PropTypes.bool,
};

Player.defaultProps = {
  children: undefined,
  air: false,
};

export { Styles };
export default Player;
