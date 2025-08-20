import { createRoot } from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.min.css';
import "./commons/index.css";

import App from "./views/App/App";

const el = document.getElementById('root')!;
createRoot(el).render(<App />);