import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
// Other imports...

const Routes = () => {
    return (
        <Router>
            <Switch>
                {/* Other routes... */}
                <Route path="/admin" component={AdminDashboard} />
            </Switch>
        </Router>
    );
};

export default Routes;
