import React, { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";


const MemoryMatchGame: React.FC = () => {
  const imagePaths = Array.from({ length: 8 }, (_, i) => `/images/MMG_${i + 1}.jpg`);

  const generateShuffledCards = () => {
    const cards = imagePaths
      .flatMap((path, index) => [
        { id: `card${index}a`, image: path, flipped: false },
        { id: `card${index}b`, image: path, flipped: false },
      ])
      .sort(() => Math.random() - 0.5); // 무작위 셔플
    return cards;
  };

  const [cards, setCards] = useState(generateShuffledCards());
  const [flipped, setFlipped] = useState<number[]>([]);
  const [time, setTime] = useState(0); // 경과 시간 (밀리초 단위)
  const [timerRunning, setTimerRunning] = useState(false); // 타이머 동작 여부

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (timerRunning) {
      timer = setInterval(() => {
        setTime(prevTime => prevTime + 10); // 10ms 간격으로 증가
      }, 10);
    } else if (!timerRunning && timer) {
      clearInterval(timer);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timerRunning]);

  const flipCard = (index: number) => {
    if (flipped.length === 2 || flipped.includes(index) || cards[index].flipped) {
      return;
    }

    if (!timerRunning) {
      setTimerRunning(true); // 첫 카드 클릭 시 타이머 시작
    }

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setTimeout(() => {
        const [firstIndex, secondIndex] = newFlipped;
        if (cards[firstIndex].image === cards[secondIndex].image) {
          // 매칭 성공
          setCards(prevCards =>
            prevCards.map((card, idx) =>
              idx === firstIndex || idx === secondIndex
                ? { ...card, flipped: true }
                : card
            )
          );
        }
        setFlipped([]);
      }, 300);
    }
  };

  useEffect(() => {
    // 모든 카드가 뒤집혔는지 확인
    if (cards.every(card => card.flipped)) {
      setTimerRunning(false); // 타이머 중지
    }
  }, [cards]);

  const resetGame = () => {
    setCards(generateShuffledCards());
    setFlipped([]);
    setTime(0);
    setTimerRunning(false);
  };

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const milliseconds = ms % 1000;
    return `${seconds}.${milliseconds.toString().padStart(3, "0")}초`;
  };

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      {/* 상단 UI */}
      <div style={{ marginBottom: "20px" }}>
        <span style={{ fontSize: "24px", fontWeight: "bold", marginRight: "20px" }}>
          시간: {formatTime(time)}
        </span>
        <button
          onClick={resetGame}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          재시작
        </button>
      </div>

      {/* 카드 그리드 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 150px)",
          gridGap: "10px",
          justifyContent: "center",
          alignItems: "center",
          margin: "20px",
        }}
      >
        {cards.map((card, index) => (
          <div
            key={card.id}
            onClick={() => flipCard(index)}
            style={{
              width: "150px",
              height: "150px",
              backgroundColor: flipped.includes(index) || card.flipped ? "#eee" : "#333",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              border: "1px solid #aaa",
              overflow: "hidden",
            }}
          >
            {flipped.includes(index) || card.flipped ? (
              <img
                src={card.image}
                alt={`Card ${index}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
              "?"
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoryMatchGame;