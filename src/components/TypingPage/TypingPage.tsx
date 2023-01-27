import { MenuOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { memo } from 'react'
import { paragraphs } from '../../data/paragraphs'

const getCloud = () => paragraphs[Math.floor(Math.random() * 20)].split(' ')

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
    <div className="flex justify-center items-center p-2 flex-col">
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
  const [finish, setFinish] = useState<boolean>(false)

  useEffect(() => {
    console.log(paragraphs.length)
  }, [])

  const processInput = (value: string) => {
    if (value.endsWith(' ')) {
      if (activeWordIndex === parah.current.length) return
      if (!startCounting) setStartCounting(true)
      if (activeWordIndex === parah.current.length - 1) {
        setStartCounting(false)
        setFinish(true)
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
    <div className="w-[100vw] h-[100vh]">
      <div className="header flex items-center  p-4 bg-[#98C5E4] shadow-md px-12">
        <span className="text-[28px] font-semibold m-auto">Typing Test</span>
        <MenuOutlined className="cursor-pointer" />
      </div>
      <div className="Scores flex w-full justify-center my-12 ">
        <div className="p-3 border-solid border-[#98C5E4] border-[1px] rounded-md shadow-inner shadow-lg">
          <Timer
            startCounting={startCounting}
            correctWords={correctWordArray.filter(Boolean).length}
          />
        </div>
      </div>
      <div className="w-full flex justify-center">
        <div className="w-[60%]">
          <div className="p-4 border-solid border-[1px] border-[#e0e0e0] rounded-md mb-4 bg-[#FFFDD0]">
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
          </div>
          {!finish && (
            <Input
              placeholder="Start Typing..."
              value={inputValue}
              onChange={(e) => {
                processInput(e.target.value)
              }}
            />
          )}
          {finish && (
            <div className="flex justify-center items-center">
              <span className="text-green-500 text-[24px] font-bold">
                Completed!
              </span>
            </div>
          )}
        </div>
      </div>
      {finish && (
        <div className="w-full flex justify-center items-center mt-12">
          <Button onClick={() => window.location.reload()}>Restart</Button>
        </div>
      )}
    </div>
  )
}

export default TypingPage
