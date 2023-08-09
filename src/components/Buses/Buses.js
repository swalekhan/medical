import style from './Buses.module.css'
import { busArray, busInfo, busArray2 } from '../../utils/data';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBuses } from './BusesSlice';
import Bus from '../bus/bus';

const Buses = () => {
    const selectedBuses = useSelector(state => state.buses.busesData)
    const dispatch = useDispatch()

    const clickHandler = (item) => {
        dispatch(addBuses(item))
    }

    return (
        <>
            <main className={style.buses_container}>

                <section className={style.bus_info}>
                    <h2>Know about seat type</h2>
                    <ul>
                        {busInfo.map((item) => (
                            <div key={item?.id} className={style.bus_item_info}>
                                <Bus item={item} />
                                <p className={style.bus_name}>{item.name}</p>
                            </div >
                        ))}
                    </ul>
                </section >

                <section className={style.buses}>
                    <h2>Lower Deck</h2>
                    <ul>
                        {busArray.map((item) => (
                            <Bus item={item} clickHandler={clickHandler} key={item.id} />
                        ))}
                    </ul>
                </section >

                <section className={style.buses}>
                    <h2>Upper Deck</h2>
                    <ul>
                        {busArray2.map((item) => (
                            <Bus item={item} clickHandler={clickHandler} key={item.id} />
                        ))}
                    </ul>
                </section>

                {selectedBuses.length > 0 &&
                    <section className={style.selected_buses}>
                        <p className={style.selected_buses_item}>{selectedBuses.length} Seats|</p>
                        <div className={style.selected_buses_item}>
                            {selectedBuses.map((item) => (
                                <p>{item.name}</p>
                            ))}
                        </div>
                        <button>Continue</button>
                    </section>}

            </ main>
        </>
    )
}
export default Buses