import React, { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const PongGame: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { game } = location.state || {};

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [leftScore, setLeftScore] = useState(0);
  const [rightScore, setRightScore] = useState(0);
  const [isGameRunning, setIsGameRunning] = useState(false); // Game state toggle

  const upPressedLeft = useRef(false);
  const downPressedLeft = useRef(false);
  const upPressedRight = useRef(false);
  const downPressedRight = useRef(false);

  const ballSpeed = useRef(3);
  const ballVelocityX = useRef(3);
  const ballVelocityY = useRef(3);
  const lastSpeedUpdateTime = useRef(Date.now());

  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        const paddleWidth = 10,
          paddleHeight = 100,
          ballSize = 15;
        let leftPaddleY = canvas.height / 2 - paddleHeight / 2;
        let rightPaddleY = canvas.height / 2 - paddleHeight / 2;
        let ballX = canvas.width / 2,
          ballY = canvas.height / 2;

        const paddleSpeed = 4;

        const resetBall = () => {
          ballX = canvas.width / 2;
          ballY = canvas.height / 2;
          ballSpeed.current = 5;
          ballVelocityX.current = ballSpeed.current;
          ballVelocityY.current = ballSpeed.current;
          const randomYDirection = Math.random() > 0.5 ? 1 : -1;
          ballVelocityX.current = -ballSpeed.current;
          ballVelocityY.current = randomYDirection * ballSpeed.current;
        };

        const render = () => {
          if (!isGameRunning) {
            animationFrameId.current = requestAnimationFrame(render);
            return;
          }

          context.clearRect(0, 0, canvas.width, canvas.height);
          ballX += ballVelocityX.current;
          ballY += ballVelocityY.current;

          if (ballY + ballSize >= canvas.height || ballY - ballSize <= 0) {
            ballVelocityY.current = -ballVelocityY.current;
          }

          if (
            ballX - ballSize <= paddleWidth &&
            ballY > leftPaddleY &&
            ballY < leftPaddleY + paddleHeight
          ) {
            const deltaY = ballY - (leftPaddleY + paddleHeight / 2);
            ballVelocityY.current = deltaY * 0.3;
            ballVelocityX.current = -ballVelocityX.current;
          }

          if (
            ballX + ballSize >= canvas.width - paddleWidth &&
            ballY > rightPaddleY &&
            ballY < rightPaddleY + paddleHeight
          ) {
            ballVelocityX.current = -ballVelocityX.current;
          }

          if (ballX - ballSize <= 0) {
            setRightScore((prev) => prev + 1);
            resetBall();
          } else if (ballX + ballSize >= canvas.width) {
            setLeftScore((prev) => prev + 1);
            resetBall();
          }

          if (upPressedLeft.current && leftPaddleY > 0) leftPaddleY -= paddleSpeed;
          if (
            downPressedLeft.current &&
            leftPaddleY < canvas.height - paddleHeight
          )
            leftPaddleY += paddleSpeed;

          if (upPressedRight.current && rightPaddleY > 0) rightPaddleY -= paddleSpeed;
          if (
            downPressedRight.current &&
            rightPaddleY < canvas.height - paddleHeight
          )
            rightPaddleY += paddleSpeed;

          context.fillStyle = "white";
          context.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);
          context.fillRect(
            canvas.width - paddleWidth,
            rightPaddleY,
            paddleWidth,
            paddleHeight
          );
          context.beginPath();
          context.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
          context.fill();

          context.font = "20px Arial";
          context.fillText(`Left: ${leftScore}`, 50, 30);
          context.fillText(`Right: ${rightScore}`, canvas.width - 120, 30);

          animationFrameId.current = requestAnimationFrame(render);
        };

        const updateSpeed = () => {
          const now = Date.now();
          if (now - lastSpeedUpdateTime.current >= 2000) {
            lastSpeedUpdateTime.current = now;
            ballSpeed.current *= 1.1;
            ballVelocityX.current = ballSpeed.current * Math.sign(ballVelocityX.current);
            ballVelocityY.current = ballSpeed.current * Math.sign(ballVelocityY.current);
          }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
          if (e.key === "q" || e.key === "Q") upPressedLeft.current = true;
          if (e.key === "a" || e.key === "A") downPressedLeft.current = true;
          if (e.key === "p" || e.key === "P") upPressedRight.current = true;
          if (e.key === "l" || e.key === "L") downPressedRight.current = true;
          if (e.key === " ") setIsGameRunning((prev) => !prev); // Spacebar toggles game state
        };

        const handleKeyUp = (e: KeyboardEvent) => {
          if (e.key === "q" || e.key === "Q") upPressedLeft.current = false;
          if (e.key === "a" || e.key === "A") downPressedLeft.current = false;
          if (e.key === "p" || e.key === "P") upPressedRight.current = false;
          if (e.key === "l" || e.key === "L") downPressedRight.current = false;
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        resetBall();
        animationFrameId.current = requestAnimationFrame(render);

        const speedInterval = setInterval(updateSpeed, 100);

        return () => {
          window.removeEventListener("keydown", handleKeyDown);
          window.removeEventListener("keyup", handleKeyUp);
          if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
          }
          clearInterval(speedInterval);
        };
      }
    }
  }, [leftScore, rightScore, isGameRunning]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={800}
        height={400}
        style={{ display: "block", margin: "0 auto", background: "black" }}
      ></canvas>
      <p style={{ textAlign: "center", color: "black" }}>
        왼쪽: {leftScore} - 오른쪽: {rightScore}
        <br />
        게임조작 : 왼쪽 Q A  -  오른쪽 P L <br />
        스페이스바: 게임 시작/정지
      </p>
    </div>
  );
};

export default PongGame;
