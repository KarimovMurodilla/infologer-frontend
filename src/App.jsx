import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Tasks from "./pages/Tasks";
import Knows from "./pages/Knows";
import You from "./pages/You";
import UserSettings from "./pages/Settings";

import Login from "./auth/Login";
import PrivateRoute from "./auth/PrivateRoute";
import Signup from "./auth/SignUp";
import VerifyEmail from "./auth/Verify";
import GoogleOAuth from "./auth/clients/Google";

import CheckAuth from "./middlewares/CheckAuth";


function App() {
	// const addUser = (user) => {
	// 	const id = users.length + 1;
	// 	setUsers([...users, { id, ...user }]);
	// };

	// const editUser = (updatedUser) => {
	// 	setUsers(
	// 		users.map((user) =>
	// 			user.id === updatedUser.id ? { ...user, ...updatedUser } : user
	// 		)
	// 	);
	// };

	// const deleteUser = (id) => {
	// 	setUsers(users.filter((el) => el.id !== id));
	// };

	return (
		<Router>
			<CheckAuth />
			<div>
				<Header title="The header" name="" />
			</div>				

			<Routes>
				<Route exact path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
				<Route exact path="/search" element={<PrivateRoute><Search /></PrivateRoute>} />
				<Route exact path="/tasks" element={<PrivateRoute><Tasks /></PrivateRoute>} />
				<Route exact path="/knows" element={<PrivateRoute><Knows /></PrivateRoute>} />
				<Route exact path="/you" element={<PrivateRoute><You /></PrivateRoute>} />
				<Route exact path="/settings" element={<PrivateRoute><UserSettings /></PrivateRoute>} />
			</Routes>
			<Routes>
				<Route exact path="/auth/login" element={<Login />} />
				<Route exact path="/auth/signup" element={<Signup />} />
				<Route exact path="/auth/verify" element={<VerifyEmail />} />				
				<Route exact path="/auth/google/callback" element={<GoogleOAuth />} />				
			</Routes>
		</Router>
	);
}

export default App;
