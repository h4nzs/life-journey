import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPerjalanansByTujuan, deletePerjalanan } from '../../api/perjalanan.api';
import Button from '../common/Button';
import JourneyFormModal from './JourneyFormModal';
// Placeholder for Obstacle component
import ObstacleManagementSection from '../rintangan/ObstacleManagementSection';

const JourneyItem = ({ journey, onEdit, onDelete, onToggleExpand, isExpanded }) => {
  return (
    <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex justify-between items-center">
        <div className="flex-grow cursor-pointer" onClick={onToggleExpand}>
          <h4 className="font-semibold text-green-700">{journey.arah}</h4>
          <p className="text-xs text-gray-500">Resilience: {journey.ketahanan || 'N/A'}</p>
        </div>
        <div className="flex space-x-2">
          <Button size="sm" variant="secondary" onClick={onEdit}>Edit</Button>
          <Button size="sm" variant="danger" onClick={onDelete}>Delete</Button>
        </div>
      </div>
      {isExpanded && (
        <ObstacleManagementSection perjalananId={journey.id} />
      )}
    </div>
  );
};


const JourneyManagementSection = ({ tujuanId }) => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJourney, setEditingJourney] = useState(null);
  const [expandedJourneyId, setExpandedJourneyId] = useState(null);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['perjalanans', tujuanId],
    queryFn: () => getPerjalanansByTujuan(tujuanId),
  });

  const deleteMutation = useMutation({
    mutationFn: deletePerjalanan,
    onSuccess: () => {
      queryClient.invalidateQueries(['perjalanans', tujuanId]);
    },
    onError: (err) => {
      alert(err.response?.data?.message || 'Failed to delete journey.');
    },
  });

  if (isLoading) return <p className="text-sm text-center py-2">Loading journeys...</p>;
  if (isError) return <p className="text-sm text-center py-2 text-red-500">Error: {error.message}</p>;

  const perjalanans = data?.data || [];

  const handleOpenCreateModal = () => {
    setEditingJourney(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (journey) => {
    setEditingJourney(journey);
    setIsModalOpen(true);
  };
  
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this journey?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleToggleExpand = (journeyId) => {
    setExpandedJourneyId(prevId => (prevId === journeyId ? null : journeyId));
  };

  return (
    <div className="mt-4 pt-4 border-t">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-lg font-semibold text-gray-800">Journeys</h4>
        <Button onClick={handleOpenCreateModal}>Add Journey</Button>
      </div>

      <JourneyFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tujuanId={tujuanId}
        initialData={editingJourney}
      />

      <div className="space-y-3">
        {perjalanans.length > 0 ? (
          perjalanans.map((journey) => (
            <JourneyItem 
              key={journey.id}
              journey={journey}
              onEdit={() => handleOpenEditModal(journey)}
              onDelete={() => handleDelete(journey.id)}
              onToggleExpand={() => handleToggleExpand(journey.id)}
              isExpanded={expandedJourneyId === journey.id}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 py-4">No journeys for this goal yet.</p>
        )}
      </div>
    </div>
  );
};

export default JourneyManagementSection;
