import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getRintangansByPerjalanan, deleteRintangan } from '../../api/rintangan.api';
import Button from '../common/Button';
import ObstacleFormModal from './ObstacleFormModal';
import ObstacleItem from './ObstacleItem'; // Import the corrected ObstacleItem

const ObstacleManagementSection = ({ perjalananId }) => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingObstacle, setEditingObstacle] = useState(null);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['rintangans', perjalananId],
    queryFn: () => getRintangansByPerjalanan(perjalananId),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteRintangan,
    onSuccess: () => {
      queryClient.invalidateQueries(['rintangans', perjalananId]);
    },
    onError: (err) => {
      alert(err.response?.data?.message || 'Failed to delete obstacle.');
    },
  });

  if (isLoading) return <p className="text-sm text-center py-2">Loading obstacles...</p>;
  if (isError) return <p className="text-sm text-center py-2 text-red-500">Error: {error.message}</p>;

  const rintangans = data?.data || [];

  const handleOpenCreateModal = () => {
    setEditingObstacle(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (obstacle) => {
    setEditingObstacle(obstacle);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this obstacle?')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="mt-4 pt-4 border-t">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-md font-semibold text-gray-800">Obstacles</h4>
        <Button size="sm" onClick={handleOpenCreateModal}>Add Obstacle</Button>
      </div>

      <ObstacleFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        perjalananId={perjalananId}
        initialData={editingObstacle}
      />

      <div className="space-y-3">
        {rintangans.length > 0 ? (
          rintangans.map((rintangan) => (
            <ObstacleItem
              key={rintangan.id}
              rintangan={rintangan}
              onEdit={() => handleOpenEditModal(rintangan)}
              onDelete={() => handleDelete(rintangan.id)}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 text-sm py-3">No obstacles for this journey yet.</p>
        )}
      </div>
    </div>
  );
};

export default ObstacleManagementSection;