import React from 'react';
import { Gamepad2, Trash2, RefreshCw } from 'lucide-react';

export default function GameCard({ game, onDelete, onToggleStatus }) {
  return (
    <div className="game-card">
      <div>
        <div className="card-header">
          <span className="badge">
            <Gamepad2 size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
            {game.platform}
          </span>
          <span style={{ 
            fontSize: '0.85rem', 
            fontWeight: 'bold', 
            color: game.status === 'Bitirildi' ? '#16a34a' : '#5a7295' 
          }}>
            ● {game.status}
          </span>
        </div>
        
        <h3 style={{ margin: '0.6rem 0 0.2rem 0', fontSize: '1.25rem', fontWeight: '800' }}>{game.title}</h3>
        <p style={{ fontSize: '0.85rem', color: '#718096', margin: '0 0 1rem 0' }}>{game.notes}</p>
      </div>
      
      <div className="card-actions" style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
        <button className="btn-action" onClick={() => onToggleStatus(game.id)}>
          <RefreshCw size={13} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
          Durum Değiştir
        </button>
        <button className="btn-action btn-delete" onClick={() => onDelete(game.id)}>
          <Trash2 size={14} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
          Sil
        </button>
      </div>
    </div>
  );
}