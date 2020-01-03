import React from 'react'

const Header = props =>
    <h3>{props.course}</h3>

const Part = ({ part }) =>
    <p>{part.name} {part.exercises}</p>


const Content = ({ parts }) => {
    const rows = () => parts.map(part =>
        <Part
            key={part.id}
            part={part}
        />
    )

    return (
        <div>
            {rows()}
        </div>
    )
}

const Total = ({ parts }) => {
    const total =
        parts.reduce((s, p) => {
            return s + p.exercises;
        }, 0);

    return <p><b>total of {total} exercises</b></p>
}

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course