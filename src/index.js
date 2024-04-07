import './style.css'
import AddIcon from './Assets/icons/add.svg'
import {domStuff} from './domstuff.js'
import {Render} from './homenav.js';
import {contentBody} from './contentbody.js';


domStuff();
Render.renderToday();
Render.renderAll();



