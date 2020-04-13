import React, { ReactNode, Component, Fragment, Children } from 'react';
import { Route, Switch, Redirect } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";

import { CSSTransition } from "react-transition-group";

import BottomNavigation from '../../components/BottomNavigation/BottomNavigation';
import Page, { PageProps } from '../../components/Page/Page';

import indexRoutes from "../../routes/index";
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';

import { NavButtonState } from '../../components/BottomNavigation/BottomNavigation';

export class App extends Component<any> {
  private bottomNavigation = React.createRef<BottomNavigation>();
  constructor(props: any) {
    super(props);
    this.onInitNavigationButtons = this.onInitNavigationButtons.bind(this);
  }

  onInitNavigationButtons(left?: NavButtonState, right?: NavButtonState) {
    this.bottomNavigation.current?.updateButtons(left, right);
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Jumbotron className='full-height'>
            <Container>
              <Switch>
                <Fragment>
                  {indexRoutes.map(({path, Component}) => {
                    return (
                      <Route key={path} exact path={path}>
                        {({ match }) => (
                          <CSSTransition in={match != null} timeout={700} classNames="page" unmountOnExit>
                            <div className="page">
                              {React.createElement<PageProps>(Component, {initNavigationButtons: this.onInitNavigationButtons})}
                            </div>
                          </CSSTransition>
                        )}               
                      </Route>
                    )
                  })}
                </Fragment>
              </Switch>

              <BottomNavigation ref={this.bottomNavigation}/>
            </Container>
          </Jumbotron>
        </div>
        <Redirect exact to="/" />
      </Router>
    );
  }
}