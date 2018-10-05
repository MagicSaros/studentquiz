import React from 'react';
import { Link } from 'react-router-dom';

export default function QuizzesItem({quiz}) {
    return (
        <span>
            <Link to={`/quizzes/${quiz.quizId}`}>{quiz.name}</Link>
        </span>
    );

}
