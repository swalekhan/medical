import { useState } from 'react'
import style from './Bus.module.css'
import { useSelector } from 'react-redux'

const Bus = ({ item, clickHandler }) => {
    const [price, setPrice] = useState(false)
    const selectedBuses = useSelector(state => state.buses.busesData)

    const itemClickHandler = (item) => {
        if (item.status !== "booked by women" && item.status !== "booked by other") {
            clickHandler && clickHandler(item)
            clickHandler && setPrice(true)
            setTimeout(() => setPrice(false), 1500)
        }
    }

    return (
        <li className={`${item.status === "availble" && style.availble} ${item.status === "booked by other" && style.booke_by_other}
         ${selectedBuses?.find(({ id }) => id === item.id) && style.selectedByYou} ${item.status === "booked" && style.selectedByYou}
         ${item.status === "booked by women" && style.booked_by_women} ${item.status === "availble for women" && style.availble_for_women} `}
            onClick={() => itemClickHandler(item)}
        >
            < p></p>
            <div className={`${price ? style.price_show : style.price_hide}`}>{item.price && item.price} <span></span></div>
        </li>
    )
}

export default Bus