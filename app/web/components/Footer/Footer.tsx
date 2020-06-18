import React from 'react';
import Tooltip from 'rc-tooltip';

import Image from '../Image';
import * as Styles from './Footer.styles';

const Footer = () => {
  return (
    <Styles.Wrapper>
      <Styles.Container>
        <Styles.Images>
        <Tooltip
          id="greencubes"
          placement="top"
          trigger={['hover']}
          overlay={<span>Сайт игры GreenCubes</span>}
          destroyTooltipOnHide
        >
          <Styles.Link href="https://greencubes.org" target="_blank" rel="noopener noreferrer">
            <Image
              src="/images/greencubes/greencubes"
              formats={['png', 'webp']}
              destiny={2}
            />
          </Styles.Link>
        </Tooltip>
        <Tooltip
          id="discord"
          placement="top"
          trigger={['hover']}
          overlay={<span>Присоединиться к сообществу</span>}
          destroyTooltipOnHide
        >
          <Styles.Link href="https://discord.gg/Hqc4rDW" target="_blank" rel="noopener noreferrer">
            <Image
              src="/images/discord/discord"
              formats={['png', 'webp']}
              destiny={2}
            />
          </Styles.Link>
        </Tooltip>
        </Styles.Images>
      </Styles.Container>
    </Styles.Wrapper>
  );
};

export { Styles };
export default Footer;
