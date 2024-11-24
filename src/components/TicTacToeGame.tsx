import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import './TicTacToeGame.css'; // CSS 파일 추가

const TicTacToeGame: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { game } = location.state || {};

  const [board, setBoard] = useState(Array(9).fill(null)); // 게임판 상태
  const [isXNext, setIsXNext] = useState(true); // 현재 플레이어
  const [winner, setWinner] = useState<string | null>(null); // 승리자
  const [turnCount, setTurnCount] = useState({ X: 0, O: 0 }); // 턴 카운트

  // 승리 조건 체크 함수
  const checkWinner = (board: string[]) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const [a, b, c] of winningCombinations) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  // 클릭 이벤트 핸들러
  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    const currentPlayer = isXNext ? 'X' : 'O';

    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    // 턴 카운트 업데이트
    setTurnCount(prev => ({
      ...prev,
      [currentPlayer]: prev[currentPlayer] + 1,
    }));

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    } else if (newBoard.every(cell => cell)) {
      setWinner('Draw');
    } else {
      setIsXNext(!isXNext);
    }
  };

  // 다시 시작 버튼
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setTurnCount({ X: 0, O: 0 }); // 턴 카운트 초기화
  };

  return (
    <div className="tic-tac-toe-container">
      {/* <h1>Tic Tac Toe - Game ID: {id}</h1>
      {game && <p>Game Name: {game.name}</p>} */}

      {/* 턴 카운트 표시 */}
      <div className="turn-counter">
        <p>X: {turnCount.X}<br></br>O: {turnCount.O}</p>
      </div>

      {/* 게임판 */}
      <div className="tic-tac-toe">
        {board.map((value, index) => (
          <div
            key={index}
            className="tic-tac-toe-cell"
            onClick={() => handleClick(index)}
          >
            {value}
          </div>
        ))}
      </div>

      {/* 승리 메시지 */}
      {winner && (
        <div className="winner-message">
          {winner === 'Draw' ? '무승부!' : `${winner} 승리!`}
        </div>
      )}

      {/* 재시작 버튼 */}
      <button className="reset-button" onClick={resetGame}>
        재시작
      </button>
    </div>
  );
};

export default TicTacToeGame;
