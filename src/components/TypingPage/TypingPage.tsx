import { Input } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { memo } from 'react'

const getCloud = () =>
  `Keep in mind that ScrollViews must have a bounded height in order to work, since they contain unbounded-height children into a bounded container (via a scroll interaction). In order to bound the height of a ScrollView, either set the height of the view directly (discouraged) or make sure all parent views have bounded height.`
    .split(' ')
    .sort(() => (Math.random() > 0.5 ? 1 : -1))
const Word = memo((props: any) => {
  const { text, active, correct } = props
  if (correct === true) {
    return <span className="font-semibold text-green-600">{text} </span>
  }
  if (correct === false) {
    return <span className="font-semibold text-red-500">{text} </span>
  }
  if (active) {
    return <span className="font-semibold">{text} </span>
  }
  return <span>{text} </span>
})
const Timer: any = (props: any) => {
  const { correctWords, startCounting } = props
  const [timeElapsed, setTimeElapsed] = useState<any>(0)
  useEffect(() => {
    let id: any
    if (startCounting) {
      id = setInterval(
        () => setTimeElapsed((oldTime: any) => oldTime + 1),
        1000
      )
    }
    return () => {
      clearInterval(id)
    }
  }, [startCounting])
  const minutes = timeElapsed / 60
  return (
    <div>
      <div>Time: {timeElapsed}</div>
      <div>Speed: {(correctWords / minutes || 0).toFixed(2)} WPM</div>
    </div>
  )
}
// Word = React.memo(Word)
const TypingPage = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const [activeWordIndex, setActiveWordIndex] = useState<number>(0)
  const parah = useRef(getCloud())
  const [correctWordArray, setCorrectWordArray] = useState<any>([])
  const [startCounting, setStartCounting] = useState<boolean>(false)

  useEffect(() => {
    console.log(startCounting)
  }, [startCounting])

  const processInput = (value: string) => {
    if (value.endsWith(' ')) {
      if (activeWordIndex === parah.current.length) return
      if (!startCounting) setStartCounting(true)
      if (activeWordIndex === parah.current.length - 1) {
        setStartCounting(false)
        setInputValue('completed')
      } else {
        setInputValue('')
      }
      setActiveWordIndex((index: number) => index + 1)

      setCorrectWordArray((data: any) => {
        const word = value.trim()
        const newResult = [...data]
        newResult[activeWordIndex] = word === parah.current[activeWordIndex]
        return newResult
      })
    } else {
      setInputValue(value)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center p-4 w-full h-[100vh]">
      <div className="w-[60%]">
        {' '}
        <span>Typing Test</span>
        <Timer
          startCounting={startCounting}
          correctWords={correctWordArray.filter(Boolean).length}
        />
        <p>
          {parah.current.map((word, index) => {
            return (
              <Word
                text={word}
                active={index === activeWordIndex}
                correct={correctWordArray[index]}
              />
            )
          })}
        </p>
        <Input
          placeholder="Start Typing..."
          value={inputValue}
          onChange={(e) => {
            processInput(e.target.value)
          }}
        />
      </div>
    </div>
  )
}

export default TypingPage
