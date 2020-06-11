import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Slider from 'rc-slider';

import * as Styles from './Player.styles';

const { STREAM_URL = '[]' } = process.env;

const Player = ({ children, air }) => {
  const [volume, setStateVolume] = useState(0.6);
  const [reload, setReload] = useState(true);
  const [playing, setPlaying] = useState(false);
  const ref = useRef();

  const setVolume = (volume) => {
    ref.current.volume = volume;
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
    ref.current.play();
  };

  const onStop = () => {
    setVolume(getVolume());
    ref.current.pause();
    ref.current.currentTime = 0;
    setReload(false);
    setTimeout(() => {
      setReload(true);
      setPlaying(false);
    }, 100)
  };


  const onChangeVolume = (volume) => {
    setVolume(volume);
  };

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
          <Slider value={volume} step={0.01} min={0} max={1} onChange={onChangeVolume} />
        </Styles.SliderWrapper>
      </Styles.Content>
      {reload && (
        <audio ref={ref} preload="none">
          {JSON.parse(STREAM_URL).map((source) => {
            const [, type] = source.match(/\.(.{3,4})$/);
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
  children: null,
  air: false,
};

export default Player;
