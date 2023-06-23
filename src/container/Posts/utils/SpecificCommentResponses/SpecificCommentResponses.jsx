import React, { useState, useEffect } from 'react';
import { query, collection, where, getDocs } from 'firebase/firestore';
import { BsArrowReturnRight } from 'react-icons/bs';

import { db } from '../../../../config/firebase';
import './SpecificCommentResponses.scss';



const SpecificCommentResponses = ({ comment, targetComment, setTargetComment }) => {
    const [responses, setResponses] = useState([]);

    const fetchResponses = () => {
        const q = query(collection(db, "responses"), where("commentId", "==", comment.time));
        let existingResponses = [];

        getDocs(q)
            .then((res) => {
                res.forEach((document) => {
                    existingResponses.push({ ...document.data() });
                })
                setResponses(existingResponses);
            })
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        fetchResponses();
    }, []);

    return (
        (comment.time !== targetComment) && responses.length >= 1 && (            
            <button
                className='view-responses'
                onClick={ () => setTargetComment(comment.time) }
            >
                <BsArrowReturnRight size={ 20 } />
                { responses.length === 1 && 'Voir la réponse' }
                { responses.length > 1   && `Voir les ${ responses.length } réponses` }
            </button>
        )
    );
};

export default SpecificCommentResponses;