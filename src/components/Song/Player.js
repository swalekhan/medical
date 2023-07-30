import { TbPlayerTrackNextFilled } from 'react-icons/tb'
import { TbPlayerTrackPrevFilled } from 'react-icons/tb';
import { IoMdPause } from 'react-icons/io';
import { IoMdPlay } from 'react-icons/io';
import style from './Player.module.css'
import { useAppContext } from '../../context/Provider';
import { secondsToHms } from '../../utils/secondsToHms';



const Player = ({ setIsPlaying, isPlaying, rangeHandler, percent, time }) => {
    const { songs, song, setSong } = useAppContext()

    const backHnadler = (e) => {
        e.stopPropagation()
        const index = songs.findIndex((item) => item?._id === song?._id)

        if (index <= 0) {
            setSong(songs[songs.length - 1])
        } else {
            setSong(songs[index - 1])
        }
    }

    const nextHandler = (e) => {
        e.stopPropagation()
        const index = songs.findIndex((item) => item?._id === song?._id)

        if (index === songs.length - 1) {
            setSong(songs[0])
        } else {
            setSong(songs[index + 1])
        }
    }

    const playPauseHandler = (e) => {
        e.stopPropagation()
        setIsPlaying(!isPlaying)
    }


    return (
        <div className={style.player}>
            <div className={style.range}>
                <input type='range' value={percent} onChange={rangeHandler} />
            </div>
            <div>
                <div className={style.player_time}>
                    <div>{secondsToHms(time.currentTime)}</div>
                    <div>{secondsToHms(time.duration)}</div>
                </div>
            </div>
            <div className={style.player_controler}>
                <TbPlayerTrackPrevFilled onClick={backHnadler} />
                <div onClick={playPauseHandler}>
                    {isPlaying ? <IoMdPlay /> : <IoMdPause />}
                </div>
                <TbPlayerTrackNextFilled onClick={nextHandler} />
            </div>
        </div>
    )
}

export default Player