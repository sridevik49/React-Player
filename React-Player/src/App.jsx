import React from 'react'
import ReactPlayer from "react-player/youtube";
import "./App.css"

const App = () => {
    const playerRef = React.useRef(null);
    const [isPlaying, setIsPlaying] = React.useState(false)
    const [isMuted, setIsMuted] = React.useState(false)
    const [volume, setVolume] = React.useState(0.9)
    const [duration, setDuration] = React.useState(0)
    const [progress, setProgress] = React.useState(0)
    const [seeking, setSeeking] = React.useState(false)
    const [playbackRate, setPlaybackRate] = React.useState(1)

    function handlePlay() {
        setIsPlaying(prev => !prev);
    }

    function handleMute() {
        setIsMuted(prev => !prev);
    }

    function handleVolume(e) {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);

        if (newVolume === 0) {
            setIsMuted(true);
        } else {
            setIsMuted(false);
        }
    }
    const handleProgress = (progress) => { setProgress(progress.playedSeconds) }
    const handleDuration = (duration) => { setDuration(duration) }

    const handleSeek = (e) => {
        const seekTo = parseFloat(e.target.value);
        setProgress(seekTo);
        playerRef.current.seekTo(seekTo);
    };


    const handleSeekMouseDown = () => {
        setSeeking(true);
    };

    const handleSeekMouseUp = (e) => {
        setSeeking(false);
        playerRef.current.seekTo(parseFloat(e.target.value));
    };

    const jumpForward = () => {
        const newTime = Math.min(progress + 10, duration); // don't exceed duration
        setProgress(newTime);
        playerRef.current.seekTo(newTime);
    };

    const jumpBackward = () => {
        const newTime = Math.max(progress - 10, 0); // don't go below 0
        setProgress(newTime);
        playerRef.current.seekTo(newTime);
    };

    function formatTime(seconds) {
        const min = Math.floor(seconds / 60)
        const sec = Math.floor(seconds % 60)
        return `${min} : ${sec < 10 ? "0" : ""}${sec}`
    }

    return (
        <div className='player'>
            <div className='overAll'>
                <h1 className='title'>Video Player</h1>
                <ReactPlayer
                    className='video'
                    url="https://youtu.be/p7GmO8ewjmw?si=FuHaAZNwv0BfxGn4"
                    ref={playerRef}
                    width={'100%'}
                    height={'510px'}
                    muted={isMuted}
                    playing={isPlaying}
                    volume={volume}
                    playbackRate={playbackRate}
                    onProgress={handleProgress}
                    onDuration={handleDuration}
                />



                <div className='seek'>

                    <span>{formatTime(progress)}</span>

                    <input
                        type="range"
                        min={0}
                        max={duration}
                        step={0.1}
                        value={progress}
                        onChange={handleSeek}
                        onMouseDown={handleSeekMouseDown}
                        onMouseUp={handleSeekMouseUp}
                        style={{ width: "92%" }}
                    />

                    <span>{formatTime(duration)}</span>

                </div>
                <div className='btn'>
                    <div className='volume'>

                        <button onClick={handleMute}>
                            {isMuted || volume === 0 ? (
                                <i className="fa-solid fa-volume-xmark"></i>
                            ) : (
                                <i className="fa-solid fa-volume-high"></i>
                            )}
                        </button>

                        <input
                            step={0.1}
                            min={0}
                            max={1}
                            value={volume}
                            type="range"
                            onChange={handleVolume}
                        />

                    </div>

                    <div className='play'>

                        <button onClick={jumpBackward} className="seek-btn"><i class="fa-solid fa-backward"></i> 10s</button>

                        <button onClick={handlePlay} className='playbtn'>
                            {isPlaying ? (
                                <i class="fa-solid fa-pause"></i>
                            ) : (
                                <i class="fa-solid fa-play"></i>
                            )}
                        </button>

                        <button onClick={jumpForward} className="seek-btn">10s <i class="fa-solid fa-forward"></i></button>

                    </div>


                    <div className="speed">

                        <select
                            value={playbackRate}
                            onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
                        >
                            <option value={0.5}>0.5x</option>
                            <option value={0.75}>0.75x</option>
                            <option value={1}>1x</option>
                            <option value={1.25}>1.25x</option>
                            <option value={1.5}>1.5x</option>
                            <option value={2}>2x</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default App