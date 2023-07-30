import React from "react"
import { useQuery, gql } from "@apollo/client"
import style from './Sidebar.module.css'
import { useAppContext } from "../../context/Provider"

const query = gql`
query GetPlaylists {
    getPlaylists {
      id
      title
    }
  }
`

const Sidebar = () => {
    const { data, error } = useQuery(query)
    const { setPlaylist, playlist, mobileMenu, setMobileMenu, randomColor } = useAppContext()

    if (error) {
        return <h4>something went wrong</h4>
    }

    const clickHandler = (e, item) => {
        e.stopPropagation()
        setPlaylist(item)
        setMobileMenu(false)
    }

    return (
        <aside className={`${style.sidebar} ${mobileMenu && style.sidebar_open}`}
            onClick={() => setMobileMenu(false)}
        >
            <div className={style.sidebar_wrapper}
                onClick={(e) => e.stopPropagation()}
                style={{ backgroundColor: randomColor }}
            >
                <div className={style.sidebar_header}>
                    <img src="/logo.png" alt="logo" />
                </div>
                <div className={style.sidebar_main}>
                    <ul>
                        {data?.getPlaylists?.map((item, key) => (
                            <li key={key} className={`${item?.id === playlist.id ? style.active : ""}`}
                                onClick={e => clickHandler(e, item)}
                            >{item.title}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar