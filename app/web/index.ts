import ReactDOM from 'react-dom';
import { clientRender } from './render';

import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import 'rc-dropdown/assets/index.css';
import './styles/global.less';

ReactDOM.hydrate(clientRender(), document.getElementById('__app'));
