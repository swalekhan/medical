import { FiSearch } from 'react-icons/fi';
import style from './Playlist.module.css'
import { useAppContext } from '../../context/Provider';
import Loading from '../Loding/Loading';
import { secondsToHms } from '../../utils/secondsToHms';
import Spiner from '../Loding/Spiner';

const Playlist = () => {
    const { songs, loading, setSong, song, playlist, setMobileMenu, setSearch } = useAppContext()

    const SearchHandler = (e) => {
        const str = e.target.value
        setSearch(str)
    }

    return (
        <>
            <section className={style.playlist}>
                <div className={style.playlist_header}>
                    <div className={style.header_content}>
                        <img src="/mobileLogo.png" alt="logo" className={style.logo} onClick={() => setMobileMenu(true)} />
                        <h2>{playlist.title}</h2>
                    </div>
                    <div className={style.playlist_search}>
                        <input type="text" placeholder='Search Song, Artist' name='search' onChange={SearchHandler} />
                        <button><FiSearch /></button>
                    </div>
                </div>

                <div className={style.playlist_items}>
                    <ul>
                        {!loading ?
                            songs?.map((item) => (
                                <li key={item?._id} className={`${item._id === song?._id ? style.active : ""}`} onClick={() => setSong(item)}>
                                    <div className={style.item_content}>
                                        <img src={item?.photo} alt={item?.title} />
                                        <div>
                                            <h4>{item?.title.length > 25 ? `${item?.title?.substring(0, 25)}...` : item?.title}</h4>
                                            <p>{item?.artist}</p>
                                        </div>
                                    </div>
                                    {
                                        song?._id === item?._id ?
                                            <Loading />
                                            :
                                            <p>{secondsToHms(item?.duration)}</p>
                                    }
                                </li>
                            ))
                            :
                            <Spiner />
                        }
                    </ul>
                </div>

            </section>
        </>
    )
}
export default Playlist