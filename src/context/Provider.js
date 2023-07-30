import { createContext, useContext, useState, useEffect } from "react";
import { gql } from '@apollo/client';
import { getRandomColor } from "../utils/secondsToHms";
import { useApolloClient } from '@apollo/client';

const context = createContext({});

const query = gql`
query ExampleQuery($search: String, $playlistId: Int!) {
    getSongs(search: $search, playlistId: $playlistId) {
      _id
      title
      photo
      url
      duration
      artist
    }
  }
`;

const Provider = ({ children }) => {
    const [playlist, setPlaylist] = useState({ id: 1, title: "For You" })
    const [randomColor, setRandomColor] = useState("")
    const [search1, setSearch] = useState("")
    const [mobileMenu, setMobileMenu] = useState(false)
    const [song, setSong] = useState(null)
    const [songs, setSongs] = useState([])
    const [loading, setLoading] = useState(false)
    const client = useApolloClient();
    
    useEffect(() => {
        setLoading(true)

        const timeoutId = setTimeout(() => {
            client
                .query({
                    query: query,
                    variables: { playlistId: playlist.id, search: search1 },
                })
                .then((response) => {
                    setSongs(response?.data?.getSongs)
                    setLoading(false)
                })
                .catch((error) => {
                    console.error(error);
                    setLoading(false)
                });
        }, 500)

        return () => {
            clearTimeout(timeoutId)
        }
    }, [client, playlist, search1])


    useEffect(() => {
        setRandomColor(getRandomColor())
    }, [song])

    const value = {
        songs,
        loading,
        song,
        setSong,
        playlist,
        setPlaylist,
        randomColor,
        mobileMenu,
        setMobileMenu,
        setSearch
    }

    return (
        <context.Provider value={value}>
            {children}
        </context.Provider>
    )
}
export default Provider
export const useAppContext = () => useContext(context)