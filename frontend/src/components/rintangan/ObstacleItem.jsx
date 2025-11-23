import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Button from '../common/Button';
import Input from '../common/Input';
import { getEmosisByRintangan, createEmosi, deleteEmosi } from '../../api/emosi.api';

// This component manages the emotions for a single obstacle
const EmotionManagement = ({ rintanganId }) => {
    const queryClient = useQueryClient();
    const [newEmosiText, setNewEmosiText] = useState('');

    const { data, isLoading } = useQuery({
        queryKey: ['emosis', rintanganId],
        queryFn: () => getEmosisByRintangan(rintanganId),
    });

    const createMutation = useMutation({
        mutationFn: createEmosi,
        onSuccess: () => {
            queryClient.invalidateQueries(['emosis', rintanganId]);
            setNewEmosiText('');
        },
    });

    const deleteMutation = useMutation({
        mutationFn: deleteEmosi,
        onSuccess: () => {
            queryClient.invalidateQueries(['emosis', rintanganId]);
        },
    });

    const handleCreate = (e) => {
        e.preventDefault();
        if (newEmosiText.trim()) {
            createMutation.mutate({ rintanganId, jenis_emosi: newEmosiText });
        }
    };

    const emosis = data?.data || [];

    return (
        <div className="mt-3 pt-3 border-t border-gray-200">
            <h6 className="text-xs font-semibold text-gray-600 mb-2">Emotions Logged:</h6>
            <div className="space-y-1 mb-2">
                {isLoading ? <p className="text-xs text-gray-500">Loading...</p> : emosis.length > 0 ? emosis.map(emosi => (
                    <div key={emosi.id} className="flex justify-between items-center text-sm bg-gray-100 p-1.5 rounded-md">
                        <span className="text-gray-800">{emosi.jenis_emosi}</span>
                        <Button size="sm" variant="danger" onClick={() => deleteMutation.mutate(emosi.id)}>x</Button>
                    </div>
                )) : <p className="text-xs text-gray-500">No emotions logged.</p>}
            </div>
            <form onSubmit={handleCreate} className="flex gap-2 items-center">
                <Input
                    value={newEmosiText}
                    onChange={(e) => setNewEmosiText(e.target.value)}
                    placeholder="Log an emotion..."
                    className="text-sm h-8"
                />
                <Button type="submit" size="sm" variant="secondary" disabled={createMutation.isLoading}>Log</Button>
            </form>
        </div>
    );
};


const ObstacleItem = ({ rintangan, onEdit, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="bg-white p-3 rounded-lg border border-gray-200">
      <div className="flex justify-between items-center">
        <div className="flex-grow cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
          <h5 className="font-semibold text-red-700">{rintangan.jenis_rintangan}</h5>
        </div>
        <div className="flex space-x-2">
          <Button size="sm" variant="secondary" onClick={onEdit}>Edit</Button>
          <Button size="sm" variant="danger" onClick={onDelete}>Delete</Button>
        </div>
      </div>
      {isExpanded && <EmotionManagement rintanganId={rintangan.id} />}
    </div>
  );
};

export default ObstacleItem;
