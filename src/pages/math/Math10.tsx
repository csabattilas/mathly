import React, { useState, useEffect } from 'react'
import { map, takeUntil, interval, Subject, takeWhile } from 'rxjs'
import { AuthContext, User } from '../../components/auth/AuthProvider'
import { updatePoints } from '../../services/db/points'

function Math10() {
    const [num1, setNum1] = useState<number>(0)
    const [num2, setNum2] = useState<number>(0)
    const [correctAnswer, setCorrectAnswer] = useState<number>(0)
    const [choices, setChoices] = useState<number[]>([])
    const [elapsedSeconds, setElapsedSeconds] = useState<number>(30)
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
    const [stopTimer, setStopTimer] = useState<Subject<void>>()

    const authContext = React.useContext(AuthContext)

    const startTimer = () => {
        const stopTimer = new Subject<void>()

        interval(1000) // Emit a value every second
            .pipe(
                map((value: number) => 30 - value),
                takeWhile((value: number) => value <= 30),
                takeUntil(stopTimer)
            )
            .subscribe((value) => {
                setElapsedSeconds(value)
            })

        return stopTimer
    }

    const setPoints = async () => {
        if (authContext.user) {
            const user: User = {
                ...authContext.user,
                points: (authContext.user?.points ?? 0) + elapsedSeconds,
            }

            if (user.points && user.points > (authContext.user.points ?? 0)) {
                await updatePoints(user.uid, user.points)
                authContext.setUser(user)
            }
        }
    }

    const generateRandomNumbers = () => {
        const randomNum1 = Math.floor(Math.random() * 10) + 1
        const randomNum2 = Math.floor(Math.random() * 10) + 1

        setNum1(randomNum1)
        setNum2(randomNum2)

        const sum = randomNum1 + randomNum2
        setCorrectAnswer(sum)

        const incorrectAnswers: number[] = []
        while (incorrectAnswers.length < 2) {
            const randomIncorrect = Math.floor(Math.random() * 20) + 1
            if (
                randomIncorrect !== sum &&
                !incorrectAnswers.includes(randomIncorrect)
            ) {
                incorrectAnswers.push(randomIncorrect)
            }
        }

        const answerChoices = [...incorrectAnswers, sum].sort(
            () => Math.random() - 0.5
        )
        setChoices(answerChoices)
        setSelectedAnswer(null)

        const stopTimer = startTimer()

        setStopTimer(stopTimer)

        return () => {
            stopTimer.next()
            stopTimer.complete()
        }
    }

    useEffect(() => {
        return generateRandomNumbers()
    }, [])

    return (
        <div>
            <h1>What is the answer?</h1>
            <p>
                What is the sum of {num1} and {num2}? {elapsedSeconds}
            </p>
            <ul>
                {choices.map((choice, index) => (
                    <li key={index}>
                        <button
                            onClick={() => {
                                setSelectedAnswer(choice)

                                if (choice === correctAnswer) {
                                    stopTimer?.next()
                                    setPoints()
                                }
                            }}
                        >
                            {choice}
                        </button>
                    </li>
                ))}
            </ul>
            {selectedAnswer !== null && (
                <p>
                    Your answer: {selectedAnswer}{' '}
                    {selectedAnswer
                        ? selectedAnswer === correctAnswer
                            ? '(Correct)'
                            : '(Incorrect)'
                        : ''}
                </p>
            )}
            {selectedAnswer === correctAnswer && (
                <button onClick={generateRandomNumbers}>Next</button>
            )}
        </div>
    )
}

export default Math10
