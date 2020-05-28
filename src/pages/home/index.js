import React, { useState, useEffect} from 'react';
import 'loaders.css';
import './style.scss';
import classnames from 'classnames';
import Loader from 'react-loaders';
import CardboxContainer from '../../containers/cardbox';

const api = "https://www.breakingbadapi.com/api/";

export default function Home(props) {
    const [search, setSearch] = useState('');
    const [isFetching, setIsFetching ] = useState(false);
    const [filteredCharacters, setFilteredCharacters] = useState(null)
    const [timer, setTimer] = useState(null);
    const [characters, setCharacters] = useState(null);
    const [statusAlive, setStatusAlive] =  useState(null);
    const [statusDeath, setStatusDeath] =  useState(null);

    async function fetchCharacters() {
        try {
            if (search === '') {
                setCharacters(null);
                setFilteredCharacters(null);
                return;
            }
            setIsFetching(true);
            setCharacters(null);
            const response = await fetch(`${api}characters?name=${search.replace(' ', '+')}`);
            const body = await response.json();
            setCharacters(body);
            setFilteredCharacters(body)
        } catch (err) {
            console.error(err);
        } finally {
            setIsFetching(false)
        }
    }
    useEffect(() => {
        if (!characters) return;

        if (statusAlive && !statusDeath) {
            setFilteredCharacters(characters.filter(character => character.status === "Alive"));
        } else if(statusDeath && !statusAlive) {
            setFilteredCharacters(characters.filter(character => character.status === "Deceased"))
        }else {
            setFilteredCharacters(characters)
        }
    }, [statusAlive, statusDeath])
    
    useEffect(() => {
        clearTimeout(timer)
        let newTimer = setTimeout(() => fetchCharacters(), 500)
        setTimer(newTimer); 
    }, [search])

    const handleOnchange = (event) => {    
        setSearch(event.target.value);
    }   

    const handleCheckAlive = (event) => {
        setStatusAlive(event.target.checked)
    }

    const handleCheckDeath = (event) => {
        setStatusDeath(event.target.checked)
    }

    return (
        <div className={classnames({ "main": true, "main-full-height": isFetching || !characters || characters.length < 7})}>
            <main className="main--container">
                <h1>Breaking Bad</h1>
                <input 
                    value={search}
                    onChange={handleOnchange}
                    type="text" 
                    className="main--input"/>
                <div className="checks">
                    <div>
                        <input type="checkbox" 
                            name="alive"
                            onChange={handleCheckAlive}
                            checked={statusAlive}/> 
                        <label>Alive</label>
                    </div>
                    <div>
                        <input type="checkbox" 
                            name="death"
                            onChange={handleCheckDeath}
                            checked={statusDeath}/> 
                        <label>Death</label>
                    </div>

                </div>
                <div className="main--results">
                    { isFetching? <Loader  type="ball-clip-rotate-multiple" />: <CardboxContainer  characters={filteredCharacters}/>}
                </div>
                
            </main>
        </div>
    )
}