import { Link } from 'react-router-dom';

import derivLogo from '../../static/deriv-logo.svg';

export function Homepage() {
    return (
        <div className='flex flex-col items-center justify-center gap-10'>
            <a href='https://deriv.com' target='_blank' rel='noreferrer'>
                <img src={derivLogo} className='h-[100px] w-[100px]' alt='Deriv logo' />
            </a>
            <h1 className='text-5xl font-bold'>Deriv V2</h1>
            <Link to='signup'>Click me 💅</Link>
            <p>
                Edit <code>src/App.tsx</code> and save to test HMR
            </p>
        </div>
    );
}
