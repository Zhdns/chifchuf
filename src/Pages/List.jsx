import { useSelector } from "react-redux"
import { ORDERNUMEBER, STATUS, 
    FROMDATE, FROMTIME, 
    UNTILDATA, UNTILTIME, 
    NUMBEROFLINES, PRODCTION, 
    PROJECT, CONTACTNAME, CONTACTNUMBER, 
    OUT, DONE, ONPROCESS, NEW, CONTINUE } from "../services/constans"
import { useEffect, useState } from "react"

function Total(props) {
    return (
        <div className=" total">
            <p className="hebrewFont">{props.name}</p>
            <p className=" mainFont numberTotal">{props.number}</p>
        </div>
    )
}

function Returns(props) {
    return (
        <li className="haz">
            <p>{props.name}</p>
            <p>{props.project} -</p>
            <p className="totalInList">--{props.total}--</p>
            <p className="time">{props.time}</p>
        </li>
    )
}

function Orders(props) {
    return (
        <li className="haz">
            <p>{props.number}</p>
            <p>{props.name}</p>
            <p>{props.project} -</p>
    </li>
    )   
}




function ListPrint() {

    const returns = useSelector((state) => state.or.returns)
    const orders = useSelector((state) => state.or.orders)
    const date = useSelector((state) => state.or.date)
    
    const [totalReturnNumber, setTotalReturnNumder] = useState(0)
    const [totalReturns, setTotalReturns] = useState([])
    const [totalContinue, setTotalContinue] = useState([])
    const [totalContinueNumber, serTotalContinueNumber] = useState(0)
    const [mainReturns, setMainReturns] = useState([])
    const [totalOrder, setTotalOrder] = useState([])

    useEffect(() => {
        const todayOrders = orders.filter((o) => (o[STATUS] === NEW || o[STATUS] === ONPROCESS) && o[NUMBEROFLINES] > 15);
        setTotalOrder(todayOrders);
        console.log(todayOrders);
    }, [orders]);

    useEffect(() => {
        const todaysReturns = returns.filter((r) => r[UNTILDATA] === date && r[STATUS] === OUT)
        setTotalReturns(todaysReturns)
        console.log(todaysReturns)
    }, [returns])

    useEffect(() => {
        const todaysReturns = totalReturns.filter((r) => r[NUMBEROFLINES] > 99)
        setMainReturns(todaysReturns)
        console.log(todaysReturns)
    }, [totalReturns])

    useEffect(() => {
        const todaysReturns = returns.filter((r) => r[UNTILDATA] === date && r[STATUS] === CONTINUE)
        setTotalContinue(todaysReturns)
        console.log(todaysReturns)
    }, [returns])

    useEffect(() => {
        const total = totalReturns.reduce((total, item) => {
            return total + (item[NUMBEROFLINES] || 0); 
        }, 0);
        setTotalReturnNumder(total);
        console.log(total);
    }, [totalReturns]);

    useEffect(() => {
        const total = totalContinue.reduce((total, item) => {
            return total + (item[NUMBEROFLINES] || 0); 
        }, 0);
        serTotalContinueNumber(total);
        console.log(total);
    }, [totalContinue]);


    return (
        <div className="mainShell">
            <div className="shell">
            <div className="summ">
                <Total name='חזרות'  number={totalReturnNumber} />
                <Total name='ממשיכים'  number={totalContinueNumber} />
            </div>
            <ul className="hazarot">
            {mainReturns.map(r => (
                <Returns
                name={r[PRODCTION]}
                project={r[PRODCTION]}
                total={r[NUMBEROFLINES]}
                time={r[UNTILTIME]}
                />
            ))}
            </ul>
        </div>
        <ul className="yaziot">
            {totalOrder.map(o => (
                <Orders
                    number={o[ORDERNUMEBER]}
                    name={o[PRODCTION]}
                    project={o[PROJECT]}
                />
            ))}
        </ul>
     </div>
        
    )}

export default ListPrint