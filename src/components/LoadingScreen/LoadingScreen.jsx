import React from 'react';
import './loading.css'

const LoadingScreen = ({ onFinish }) => {
    const [hiding, setHiding] = useState(false);

    useEffect(() => {
        const imageSrcs = [
            'https://i.discogs.com/6oo3CZ1iL87g4zw-rSPkCgLFmq3QsOCYKFUdzkahANw/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEyODg5/MDcxLTE1NDM5MTUw/MDEtNjQ1Ni5qcGVn.jpeg', 
            'https://i.discogs.com/3j4G7HZAdVjQOgmu6pHnL3fpzhPFty_iPdiKQBS-F1c/rs:fit/g:sm/q:90/h:600/w:597/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEwNzM4/MTMtMTE5MDEzNzA2/MC5qcGVn.jpeg',
            'https://i.discogs.com/ZN8kIuAonS37EQ6edn75PqTHxP6MdXqJ_w3Pchuay6I/rs:fit/g:sm/q:90/h:597/w:599/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTgyNjMw/MjUtMTQ1ODIxNTMw/NS0xOTIzLmpwZWc.jpeg',
        ];

        const preload = imageSrcs.map(src => {
            return new Promise(resolve => {
                const img = new Image();
                img.onload = resolve;
                img.onerror = resolve; 
                img.src = src;
            });
        });

        const fontReady = document.fonts.ready;

        Promise.all([...preload, fontReady]).then(() => {
            setHiding(true);
            setTimeout(onFinish, 600);
        });
    }, []);


    return (
        <div className='loadingScreen'>
            <h1>se incarca...</h1>
        </div>
    );
}

export default LoadingScreen;
