import React from 'react';

class App extends Component {
  state = {  }
  render() { 
    return (
      <Router>
            <Switch>



                <Route path='/' exact component={Home}
                />
                <Route path='/user' exact component={User}
                />
                <Route path='/admin' exact component={Admin}
                />
 <Route path='/verify' exact component={Verify}
                />

            </Switch>
        </Router>



      );
  }
}
 
export default App;


