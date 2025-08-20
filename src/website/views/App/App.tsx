import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";

import { CSSTransition, TransitionGroup } from "react-transition-group";

import BottomNavigation, {
  BottomNavigationHandle,
  NavButtonState,
} from '../../components/BottomNavigation/BottomNavigation';
import { PageProps } from '../../components/Page/Page';

import indexRoutes from "../../routes/index";
import Container from 'react-bootstrap/Container';

// Helper component so we can use hooks for animation keys
function AnimatedRoutes({ onInitNavigationButtons }: { onInitNavigationButtons: PageProps["initNavigationButtons"] }) {
  const location = useLocation();

  return (
    <TransitionGroup component={null}>
      <CSSTransition key={location.pathname} timeout={700} classNames="page" unmountOnExit>
        <div className="page">
          <Routes location={location}>
            {indexRoutes.map(({ path, Component }) => (
              <Route
                key={path}
                path={path}
                element={<Component initNavigationButtons={onInitNavigationButtons} />}
              />
            ))}
            {/* fallback replaces Redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
}  

class App extends React.Component {
  bottomNavigation = React.useRef<BottomNavigationHandle>(null);

  onInitNavigationButtons: PageProps["initNavigationButtons"] = (
    left,
    right
  ) => {
    this.bottomNavigation.current?.updateButtons(left, right);
  };

  render() {
    return (
      <Router>
        <div className="App">
          <div className="p-5 mb-4 bg-light rounded-3 full-height">
            <Container>
              <AnimatedRoutes onInitNavigationButtons={this.onInitNavigationButtons} />
              <BottomNavigation ref={this.bottomNavigation}/>
            </Container>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;