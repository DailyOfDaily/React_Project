import React from 'react';
import { Suspense } from 'react';
import { useParams, useLocation } from 'react-router-dom';

// 각 게임 컴포넌트를 동적으로 import
const PongGame = React.lazy(() => import('../components/PongGame'));
const MemoryMatchGame = React.lazy(() => import('../components/MemoryMatchGame'));
const ReactionSpeedTest = React.lazy(() => import('../components/ReactionSpeedTest'));
const TicTacToeGame = React.lazy(() => import('../components/TicTacToeGame'));

const GameDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();  // URL 파라미터에서 game.id를 가져옴
    const location = useLocation();
    const { game } = location.state || {};  // Link에서 전달한 game 데이터

    // 게임 ID에 따라 동적으로 렌더링할 컴포넌트 결정
    const getGameComponent = (id: string) => {
        switch (id) {
            case '1': // 예를 들어, ID가 1이면 MemoryMatchGame 렌더링
                return <MemoryMatchGame />;
            case '2': // ID가 2이면 PongGame 렌더링
                return <PongGame />;
            case '3': // ID가 2이면 TicTacToeGame 렌더링
                return <TicTacToeGame />;
            case '4': // ID가 2이면 ReactionSpeedTest 렌더링
                return <ReactionSpeedTest />;
            default:
                return <div>게임을 찾을 수 없습니다.</div>;
        }
    };
    
    return (
        <div className="detailpage-wrapper">
            <p></p>
            <h2>{game?.title}</h2>
            <p>{game?.description}</p>
            <Suspense fallback={<div>로딩 중...</div>}>
                {getGameComponent(id!)}  {/* id가 존재할 경우 해당 게임 컴포넌트 렌더링 */}
            </Suspense>
        </div>
    );
};

export default GameDetailPage;