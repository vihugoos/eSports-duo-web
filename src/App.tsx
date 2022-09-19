import axios from 'axios';
import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import { CreateAdModal } from './components/CreateAdModal';

import './styles/main.css';

import logoImg from './assets/logo-nlw-esports.svg';

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

function App() {
  const [listGames, setListGames] = useState<Game[]>([]);

  useEffect(() => {
    axios(`${import.meta.env.VITE_SERVER_API_URL}/games`).then(response => {
        setListGames(response.data);
      })
  }, []);

  return (
    <div className="max-w-[1270px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt=""/>

      <h1 className="text-5xl text-white font-black mt-20"> 
        Your <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> is here. 
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {listGames.map(game => {
          return (
            <GameBanner 
              key={game.id}
              bannerUrl={game.bannerUrl} 
              title={game.title} 
              adsCount={game._count.ads}
            />
          )
        })};
      </div>
      
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}

export default App
