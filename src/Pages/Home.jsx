import React, { useState, useEffect } from 'react';
import { initialGames } from '../Interfaces/mockData';
import GameCard from '../Components/GameCard';
import { PlusCircle } from 'lucide-react';

export default function Home() {
  const [games, setGames] = useState(() => {
    const saved = localStorage.getItem('gamerlog_games');
    return saved ? JSON.parse(saved) : initialGames;
  });

  const [title, setTitle] = useState('');
  const [platform, setPlatform] = useState('PC');
  const [status, setStatus] = useState('Devam Ediyor');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    localStorage.setItem('gamerlog_games', JSON.stringify(games));
  }, [games]);

  const handleAddGame = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newGame = {
      id: Date.now().toString(),
      title,
      platform,
      status,
      notes: notes.trim() ? notes : "Oynanış notu eklenmedi."
    };

    setGames([newGame, ...games]);
    setTitle('');
    setNotes('');
    setStatus('Devam Ediyor');
  };

  const handleToggleStatus = (id) => {
    const updated = games.map(game => {
      if (game.id === id) {
        return { 
          ...game, 
          status: game.status === 'Devam Ediyor' ? 'Bitirildi' : 'Devam Ediyor' 
        };
      }
      return game;
    });
    setGames(updated);
  };

  const handleDeleteGame = (id) => {
    setGames(games.filter(game => game.id !== id));
  };

  return (
    <div className="container">
      {/* Sol Sütun: Form */}
      <div className="card-form">
        <h2 style={{ margin: '0 0 1.5rem 0', fontSize: '1.4rem', fontWeight: '800' }}>Yeni Oyun Ekle</h2>
        <form onSubmit={handleAddGame}>
          <div className="form-group">
            <label>Oyun Adı</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="Örn: Elden Ring" 
              required 
            />
          </div>
          <div className="form-group">
            <label>Platform</label>
            <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
              <option value="PC">PC</option>
              <option value="PS5">PS5</option>
              <option value="Xbox">Xbox</option>
              <option value="Nintendo">Nintendo</option>
            </select>
          </div>
          <div className="form-group">
            <label>Mevcut Durum</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Devam Ediyor">Devam Ediyor</option>
              <option value="Bitirildi">Bitirildi</option>
              <option value="İstek Listesi">İstek Listesi</option>
            </select>
          </div>
          <div className="form-group">
            <label>Oynanış Notları</label>
            <textarea 
              value={notes} 
              onChange={(e) => setNotes(e.target.value)} 
              placeholder="Hangi bölümdesin, güncel hedefin ne?" 
              style={{ height: '90px', resize: 'none' }}
            />
          </div>
          <button type="submit" className="btn-primary">
            <PlusCircle size={16} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
            Kütüphaneye Ekle
          </button>
        </form>
      </div>
      <div>
        <h2 style={{ margin: '0 0 1.5rem 0', fontSize: '1.4rem', fontWeight: '800' }}>Oyun Kütüphanem ({games.length})</h2>
        {games.length === 0 ? (
          <p style={{ color: '#718096' }}>Kütüphanen henüz boş. İlk oyununu soldan ekle!</p>
        ) : (
          <div className="game-grid">
            {games.map(game => (
              <GameCard 
                key={game.id} 
                game={game} 
                onDelete={handleDeleteGame} 
                onToggleStatus={handleToggleStatus} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}