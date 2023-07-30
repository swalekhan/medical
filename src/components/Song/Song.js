import { useEffect, useRef, useState } from 'react'
import { useAppContext } from '../../context/Provider'
import { BiArrowBack } from 'react-icons/bi';
import Player from './Player'
import style from './Song.module.css'

const Song = () => {
    const [isPlaying, setIsPlaying] = useState(true)
    const [fullScreen, setFullScreen] = useState(false)
    const [percent, setPercent] = useState(0)
    const [time, setTime] = useState({ currentTime: 0, duration: 0 })
    const { song, randomColor } = useAppContext()
    const audioRef = useRef()

    useEffect(() => {
        if (isPlaying) {
            audioRef?.current?.play()
        } else {
            audioRef?.current?.pause()
        }
    }, [isPlaying])

    useEffect(() => {
        if (audioRef && audioRef.current) {
            audioRef.current.currentTime = 0
        }
    }, [song])

    useEffect(() => {
        if (percent >= 99) {
            audioRef.current.currentTime = 0
        }
    }, [percent])

    const rangeHandler = (e) => {
        audioRef.current.currentTime = (audioRef.current.duration / 100) * e.target.value
        setPercent(e.target.value)
    }

    const getUpadate = (e) => {
        const currentTime = e.target.currentTime;
        const duration = e.target.duration
        const percent = ((currentTime / duration) * 100).toFixed(2)
        setPercent(percent)
        setTime({ currentTime, duration })
        // console
    }
    return (
        <section className={`${style.song} ${fullScreen ? style.show_content : style.hide}`} style={{ backgroundColor: randomColor }}>
            {song ?
                <>
                    <div className={`${!fullScreen && style.hide_content} `}>
                        <div className={style.back_arrow}>
                            <BiArrowBack onClick={() => setFullScreen(false)} />
                        </div>
                        <div className={style.song_header}>
                            <h4>{song?.title}</h4>
                            <p>{song?.artist}</p>
                        </div>

                        <div className={style.song_main}>
                            <img src={song?.photo} alt={song?.title} />
                        </div>
                    </div>

                    <div className={style.song_footer} onClick={() => setFullScreen(true)}>
                        <audio src={song?.url} ref={audioRef} onTimeUpdate={getUpadate} autoPlay ></audio>
                        <Player isPlaying={isPlaying} setIsPlaying={setIsPlaying} percent={percent} rangeHandler={rangeHandler} time={time} />
                    </div>
                </>
                :
                <div className={style.not_song_selected}>
                    <p>Please Select a Song</p>
                </div>

            }
        </section>
    )
}

export default Song