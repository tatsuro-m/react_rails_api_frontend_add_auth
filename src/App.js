import React from 'react';
import './App.css';
import PostList from "./components/PostList";
import Box from "@material-ui/core/Box";

function App() {
    return (
        <div className="App">
            <Box p={5}>
                <PostList/>
            </Box>
        </div>
    );
}

export default App;
