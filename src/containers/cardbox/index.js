import React from 'react';
import CardBox from '../../components/cardbox';
import './style.scss';

export default function CardBoxContainer({ characters}) {
    if (!characters) return null;
    if (characters.length === 0) return <div>Nenhum dado foi encontrado</div>

    return (
        <div className="cardbox">
            {
                characters.map(character => <CardBox key={character.char_id}  {...character}/>)
            }
        </div>
    )
}