
import "./App.css";

import React, { useEffect, useState ,Component} from 'react';
import Navbar from "./components/Navbar";
import News from "./components/News";
import { useLocation } from 'react-router-dom';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
export default class App extends Component {
  c="John"
  render() {
    return (
  
      <div>
        
        <Router>
        {<Navbar />}
        <Routes>
          <Route exact path="/electric vehicles" element={<News key="electric vehicles" pageSize={this.pageSize} q={"electric vehicles"}/>}/>
          <Route exact path="/" element={<News pageSize={this.pageSize} q={"sustainable development"}/>}/>
          <Route exact path="/artificial intelligence" element={<News key="artificial intelligence" pageSize={this.pageSize} q={"artificial intelligence"}/>}/>
          <Route exact path="/renewable energy" element={<News key="renewable energy" pageSize={this.pageSize} q={"renewable energy"}/>}/>
          <Route exact path="/global warming" element={<News key="global warming" pageSize={this.pageSize} q={"global warming"}/>}/>
          <Route exact path="/climate crisis" element={<News key="climate crisis" pageSize={this.pageSize} q={"climate crisis"}/>}/>
          <Route path="/search" element={<NewsWithSearch />} />
        </Routes>
        </Router>
      </div>
    )
  }
}

function NewsWithSearch() {
  const location = useLocation();
  const [query, setQuery] = useState(new URLSearchParams(location.search).get('q') || 'climate change');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const newQuery = searchParams.get('q') || 'climate change';
    setQuery(newQuery);
  }, [location]);

  return <News q={query} />;
}


