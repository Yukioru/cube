import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import every from 'lodash/every';

const Image = ({ src, alt, style, destiny, allowedFallbackFormats, formats, componentClass, imgProps, ...props }) => {
  // Генерация объекта с ссылками и плотностью
  const eachDestiny = (keys, link) => {
    const source = typeof link !== 'string' ? link : {};
    keys.forEach(key => {
      const rx = new RegExp(`(.+)\\.(${key})$`);
      const [, url, ext] = typeof link !== 'string' ? source[key].match(rx) : ['', link, key];
      source[key] = Array(destiny)
        .fill()
        .map((e, i) => {
          if (i > 0) return `${url}@${i + 1}x.${ext} ${i + 1}x`;
          return `${url}.${ext} ${i + 1}x`;
        })
        .join(', ');
    });
    return source;
  };

  let source = src;
  // Если ссылка - простая строка с расширением
  if (typeof src === 'string' && !destiny) {
    source = {
      jpg: src,
      fallback: src,
    };
  }

  // Если ссылка - строка без расширения с указанной плотностью
  if (typeof src === 'string' && !!destiny && Array.isArray(formats)) {
    const rx = new RegExp(`.+\\.(${formats.join('|')})$`);
    if (!rx.test(src)) {
      const fallbackExt = formats.filter(e => allowedFallbackFormats.includes(e))[0];
      source = {
        ...eachDestiny(formats, src),
        fallback: `${src}.${fallbackExt}`,
      };
    }
  }

  const keys = Object.keys(source).filter(e => e !== 'fallback');

  // Если ссылка - объект с ссылками и указанной плостностью
  if (typeof src !== 'string' && !!destiny && !formats) {
    // eslint-disable-next-line no-useless-escape
    if (!every(omit(source, 'fallback'), e => /\ \dx/g.test(e))) {
      source = {
        ...source,
        ...eachDestiny(keys, source),
      };
    }
  }

  const Tag = componentClass || 'picture';
  const { style: imgStyle = {}, ...imgOther } = imgProps;
  return (
    <Tag style={{ display: 'flex', userSelect: 'unset', pointerEvents: 'unset', ...style }} {...props}>
      {keys.map(key => (
        <source key={key} srcSet={source[key]} type={`image/${key}`} />
      ))}
      <img
        {...imgOther}
        alt={alt}
        src={source.fallback}
        style={{
          objectFit: 'contain',
          userSelect: 'none',
          pointerEvents: 'none',
          maxWidth: '100%',
          ...imgStyle,
        }}
      />
    </Tag>
  );
};

Image.propTypes = {
  src: PropTypes.oneOfType([PropTypes.string, PropTypes.objectOf(Object)]),
  alt: PropTypes.string,
  style: PropTypes.objectOf(Object),
  destiny: PropTypes.number,
  allowedFallbackFormats: PropTypes.arrayOf(PropTypes.string),
  formats: PropTypes.arrayOf(PropTypes.string),
  // eslint-disable-next-line react/forbid-prop-types
  componentClass: PropTypes.any,
  imgProps: PropTypes.objectOf(Object),
};

Image.defaultProps = {
  src: null,
  alt: '',
  style: {},
  destiny: null,
  allowedFallbackFormats: ['jpg', 'png'],
  formats: null,
  componentClass: 'picture',
  imgProps: {},
};

export default Image;
