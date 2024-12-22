import data from "./data"
import "./style.css"
import { useState } from "react"

const Accordion = () => {
    
    const [checked, setChecked] = useState(null)

    const handleSingleSelection = (id) => {
        // id === checked ? setChecked(null) : setChecked(id)
        setChecked(id === checked? null: id)
    }

    return (
        <>
            <div className="header">Accordion Component</div>
            <div className="wrapper">
                <div className="accordion">
                    {
                        data && data.length > 0 ?
                        data.map((item)=>{
                            return (
                                <div className="item" key={item.id} onClick={() => handleSingleSelection(item.id)}>
                                    <div className="title">
                                        <h3>{item.title}</h3>
                                        <span>+</span>
                                    </div>
                                    {
                                        checked === item.id ?
                                        <div className="content">
                                            <p>{item.content}</p>
                                        </div>:
                                        null
                                    }

                                </div>
                            )
                        }):
                        <div>No data found!</div>
                    }
                    
                </div>
            </div>
        </>
    )
}

export default Accordion;
