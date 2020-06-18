import fetch from 'node-fetch';
import { get, sumBy } from 'lodash';

const { ICY_META_URL = '', HARBOR_META_URL = '' } = process.env;

const getMeta = async () => {
  let ice;
  try {
    ice = await fetch(ICY_META_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(e => e.json());
  } catch (error) {
    console.log('Error fetch icy', error);
    return {
      status: 'down',
    };
  }

  const isOnAir = !!get(ice, 'icestats.source');
  if (!isOnAir) {
    return {
      status: 'down',
    };
  }

  let isAIR = false;
  let icyData;
  if (Array.isArray(ice.icestats.source)) {
    isAIR = !!get(ice, 'icestats.source', []).find((e: any) => {
      return e.listenurl.includes('live.ogg');
    });
    icyData = {
      listeners: sumBy(ice.icestats.source, 'listeners'),
      peak: sumBy(ice.icestats.source, 'listener_peak'),
      onAir: isAIR,
    };
  } else {
    icyData = {
      listeners: get(ice, 'icestats.source.listeners'),
      peak: get(ice, 'icestats.source.listener_peak'),
    };
  }


  let meta;
  try {
    meta = await fetch(HARBOR_META_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(e => e.json());
  } catch (error) {
    meta = null;
  }

  let trackMeta = {};

  if (isAIR) {
    const rawTitle = get(meta, 'title');
    const rx = /(.+)\-(.+)/;
    if (rx.test(rawTitle)) {
      const [, artist, title] = rawTitle.match(/(.+)\-(.+)/);
      trackMeta = {
        artist,
        title,
      };
    }
  } else {
    trackMeta = {
      album: get(meta, 'album'),
      artist: get(meta, 'artist'),
      title: get(meta, 'title'),
    }
  }


  return {
    status: 'up',
    data: {
      ...icyData,
      current: meta ? trackMeta : null,
    },
  };
};

export default getMeta;
