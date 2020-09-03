import React, { useRef, useState, useEffect } from 'react';
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
  const [reload, setReload] = useState(true);
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLAudioElement>(null);

  const setVolume = (volume: number): void => {
    if (ref && ref.current) {
      ref.current.volume = volume;
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

  const onPlay = () => {
    setVolume(getVolume());
    setPlaying(true);
    if (ref.current) {
      ref.current.play();
    }
  };

  const onStop = () => {
    setVolume(getVolume());
    if (ref.current) {
      ref.current.pause();
      ref.current.currentTime = 0;
    }
    setReload(false);
    setTimeout(() => {
      setReload(true);
      setPlaying(false);
    }, 100)
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
      {reload && (
        <audio ref={ref} preload="none">
          {JSON.parse(STREAM_URL).map((source: string) => {
            const resRx = source.match(/\.(.{3,4})$/);
            const [, type] = (resRx || []);
            return (
              <source key={type} src={source} type={`audio/${type}`} />
            );
          })}
        </audio> 
      )}
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