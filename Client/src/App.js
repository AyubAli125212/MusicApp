import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SongList, SongDetail, SongUpdate, SongCreate, Status, Layout } from './components';
import './App.css'

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path='/' element={<Layout />}>
                        <Route path='' element={<SongList />} />
                        <Route path="songs/create" element={<SongCreate />} />
                        <Route path="songs/:id" element={<SongDetail />} />
                        <Route path="songs/update/:id" element={<SongUpdate />} />
                    </Route>
                    <Route path="*" element={<Status text="😒 Sorry we can't find the page you are looking for." />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
