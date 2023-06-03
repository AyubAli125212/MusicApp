import { Outlet } from "react-router-dom"
import Navbar from './Navbar'
import styled from '@emotion/styled/macro';
import { useSelector } from 'react-redux';
import { MusicPlayer } from '../components';

const AppContainer = styled.nav`
    padding: 0;
    margin:0
`;
const Layout = () => {
    const selectedSong = useSelector((state) => state.songs.selectedSong);
    return (
        <AppContainer >
            <Navbar />
            <Outlet />
            {selectedSong && (
                <MusicPlayer />
            )}
        </AppContainer>
    )
}

export default Layout
