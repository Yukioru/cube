import ReactDOM from 'react-dom';
import { clientRender } from './render';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import './styles/global.less';

ReactDOM.hydrate(clientRender(), document.querySelector('#__app'));
