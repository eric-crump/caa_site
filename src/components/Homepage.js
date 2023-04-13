import Stack, {onEntryChange} from "../utils/cstack";
import {useState, useEffect} from "react";

function Homepage(){
    const [entry, setEntry] = useState({});

    async function getEntry(){
        let theEntry = await Stack.getElement('bltf4ff7784448c6f4c', 'homepage')
        console.log('entry in getEntry: ', entry) 
        setEntry(theEntry); 
    }

    useEffect(() => {
        onEntryChange(getEntry)
        //console.log('entry in useEffect: ', entry)
    }, []);

    return(
        <div className="container-fluid text-center">
            <h1 className="text-center mt-4" {...entry?.$?.headline}>{entry?.headline}</h1>
            <img className="mt-5" src={entry?.image?.url} {...entry?.image?.$?.url}></img> 
        </div>
    )
}

export default Homepage;