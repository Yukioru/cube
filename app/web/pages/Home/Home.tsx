import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { get } from 'lodash';
import Tooltip from 'rc-tooltip';

import Player from '../../components/Player';
import Context from '../../App.context';

import * as Styles from './Home.styles';

interface InitialState {
  status: string;
  data: object;
};

const Home = () => {
  const [state, setState] = useState({} as InitialState);
  const { socket } = useContext(Context);
  useEffect(() => {
    if (socket) {
      socket.emit('meta');
      socket.on('meta', setState);
    }
    return () => {
      if (socket) socket.off('meta');
    };
  }, []);

  const { status, data } = state;
  let headTitle = 'Главная';
  const title = get(data, 'current.title');
  const artist = get(data, 'current.artist');
  if (status === 'up' && (title && artist)) {
    headTitle = `${get(data, 'current.artist')} - ${get(data, 'current.title')}`;
  }

  // const image = get(data, 'current.image');
  const current = get(data, 'listeners', 0);
  const peak = get(data, 'peak', 0);
  const overlay = `
    Сейчас: ${current}\nЗа всё время: ${peak}
  `.trim();
  const listeners = (
    <span>
      {`Слушатели: `}
      <Tooltip
        id="listeners"
        placement="top"
        trigger={['hover', 'click']}
        overlay={<Styles.TooltipOverlay>{overlay}</Styles.TooltipOverlay>}
        destroyTooltipOnHide
      >
        <Styles.TooltipContent>
          {`${current}/${peak}`}
        </Styles.TooltipContent>
      </Tooltip>
    </span>
  );

  return (
    <>
      <Helmet>
        <title>{headTitle}</title>
      </Helmet>
      {/* <Styles.Background image={image} /> */}
      <Styles.Container>
        <Styles.Inner>
          <Player air={get(data, 'onAir', false)}>
            <Styles.Listeners>{listeners}</Styles.Listeners>
            {(title && artist) ? (
              <>
                <Styles.Title>{title}</Styles.Title>
                <Styles.Artist>{artist}</Styles.Artist>
              </>
            ) : (
              <>
                <Styles.TitlePlaceholderWrapper>
                  <Styles.TitlePlaceholder />
                </Styles.TitlePlaceholderWrapper>
                <Styles.ArtistPlaceholderWrapper>
                  <Styles.ArtistPlaceholder />
                </Styles.ArtistPlaceholderWrapper>
              </>
            )}
          </Player>
        </Styles.Inner>
      </Styles.Container>
    </>
  );
};

export { Styles };
export default Home;
