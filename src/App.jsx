import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Search from "./pages/Search";
import TasksPage from "./pages/Tasks";
import KnowsPage from "./pages/Knows";
import You from "./pages/You";
import UserSettings from "./pages/Settings";
import YourComponent from "./pages/TestPage";
import Page404 from "./pages/404";

import Login from "./auth/Login";
import PrivateRoute from "./auth/PrivateRoute";
import Signup from "./auth/SignUp";
import VerifyEmail from "./auth/Verify";
import GoogleOAuth from "./auth/clients/Google";

import CheckAuth from "./middlewares/CheckAuth";


function App() {
	return (
		<div>
			<Router>
				<CheckAuth />
				<div>
					<Header title="The header" name="" />
				</div>				

				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route exact path="/search" element={<PrivateRoute><Search /></PrivateRoute>} />
					<Route exact path="/tasks" element={<PrivateRoute><TasksPage /></PrivateRoute>} />
					<Route exact path="/knows" element={<PrivateRoute><KnowsPage /></PrivateRoute>} />
					<Route exact path="/:username" element={<PrivateRoute><You /></PrivateRoute>} />
					<Route exact path="/settings" element={<PrivateRoute><UserSettings /></PrivateRoute>} />
					<Route exact path="/test" element={<PrivateRoute><YourComponent /></PrivateRoute>} />
					<Route exact path="/404" element={<PrivateRoute><Page404 /></PrivateRoute>} />
				</Routes>
				<Routes>
					<Route exact path="/auth/login" element={<Login />} />
					<Route exact path="/auth/signup" element={<Signup />} />
					<Route exact path="/auth/verify" element={<VerifyEmail />} />				
					<Route exact path="/auth/google/callback" element={<GoogleOAuth />} />				
				</Routes>
			</Router>			
		</div>

	);
}

export default App;
