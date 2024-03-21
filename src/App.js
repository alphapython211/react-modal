import Login from "./SignUp/Login";
import SignUp from "./SignUp/SignUp";
import Module from './Module/Module';
import Note from "./Context/Note";
import './App.css';
import {
	BrowserRouter,
	Routes,
	Route,
  Router
} from "react-router-dom";
import Search from "./Components/Search";
import Pagination from './Page/Pagination';
import MyTable from "./Components/MyTable";
import About from "./Components/About";

function App() {

  return (
    <>
   
    <Note>
      <BrowserRouter>
       <Routes>
       <Route
       exact
       path = ""
       element = {<Login/>}/>
       <Route
       exact
       path = "/SignUp"
       element = {<SignUp/>}/>
       <Route
       exact
       path = "/Module"
       element = {<Module/>}/>
       <Route
       exact
       path = "/about"
       element = {<About/>}/>
       <Route
       exact
       path = "Page"
       element = {<Pagination/>}/>
       <Route
       exact
       path = "table"
       element = {<MyTable/>}/>

       </Routes>
      </BrowserRouter>
      </Note>
      </>
  );
}

export default App;

