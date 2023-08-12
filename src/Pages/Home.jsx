import { useState, useRef, useEffect  } from "react"
import { addOrders, addReturns,addDate, isSubmit} from "../services/stote"
import { useDispatch } from 'react-redux';
import '../main.css'





function Logo() { 
    return (
        <div className="header">
            <h1 className="logo mainFont">#CHIFCHUF</h1>
        </div>
    )
    
}

function Uploader() {
    const [orders, setOrders] = useState(null)
    const [returns, setReturns] = useState(null)
    const [orderStatus, setOrderStatus] = useState('אין קובץ')
    const [returnStatus, setReturnStatus] = useState('אין קובץ')
    const dispatch = useDispatch()
    const XLSX = require('xlsx')
    const orderRef = useRef(null)
    const returnRef = useRef(null)
    const [day, setDay] = useState('')
    const [month, setMonth] = useState('')
    const [year, setYear] = useState('')
    const [date, setDate] = useState('')

    useEffect(() => {
        // Этот код будет выполнен, когда day, month или year изменятся
        if (day && month && year) {
          const date = day + '/' + month + '/' + year;
          // Теперь вы можете использовать date, например, отправить его в хранилище
          dispatch(addDate({ date }));
        }
      }, [day, month, year])

    const readXlsxFile = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const json = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
            resolve(json);
          };
          reader.onerror = reject;
          reader.readAsArrayBuffer(file);
        });
      };

    const handleSubmit = async () => {
        const orderJSON = await readXlsxFile(orders);
        const returnJSON = await readXlsxFile(returns);
        dispatch(addOrders({ orders: orderJSON }));
        dispatch(addReturns({ returns: returnJSON }))
        dispatch(isSubmit()) 
    }

    const handleOrderRefClick = () => {
        orderRef.current.click()
    }

    const handleReturnRefClick = () => {
        returnRef.current.click()
    }

    const onChangeOrder = (e) => {
        setOrders(e.target.files[0]);
        setOrderStatus(e.target.files[0].name);
    }

    const onChangeReturn = (e) => {
        setReturns(e.target.files[0]);
        setReturnStatus(e.target.files[0].name);
    }

    return(
        <div className="upload">
            <div className="dateBlock">
                <h1 className="hebrewFont">תאריך</h1>
                <div className="date">
                    <input  className='inputDate' name="date" type="text" onChange={(e)=> setDay(e.target.value)} placeholder="27"></input>
                    <p className="slash">/</p>
                    <input className='inputDate' name="month" type="text" onChange={(e) => setMonth(e.target.value)} placeholder="06"></input>
                    <p className="slash">/</p>
                    <input className='inputDate' name="year" type="text" onChange={(e) => setYear(e.target.value)} placeholder="96"></input>
                </div>
            </div>
            <div className="inputBlock">
                <h1 className="textInput">הכנות</h1>
                <div className="input">
                    <input type="file" className="hiddenInput" accept="xlxs"  ref={orderRef} onChange={onChangeOrder} required/>
                    <div className="customInput" onClick={handleOrderRefClick}></div>
                    <span className="hebrewFont hebrewSpan invertible">{orderStatus}</span>
                </div>
            </div>
            <div className="inputBlock">
                <h1 className="textInput">חזרות</h1>
                <div className="input">
                    <input type="file" className="hiddenInput" accept="xlxs"  ref={returnRef} onChange={onChangeReturn} required/>
                    <div className="customInput" onClick={handleReturnRefClick}></div>
                    <span className="hebrewFont hebrewSpan invertible">{returnStatus}</span>
                </div>
            </div>
            <button className="submitButton hebrewFont" onClick={handleSubmit}>ידכון</button>
        </div>
    )
    
}


function Home() {


    return (
        <div>
            <Uploader/>
        </div>
        
    )
}

export default Home