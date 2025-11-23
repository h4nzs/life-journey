import React from 'react';
import Card from '../../../components/common/Card';

const StatCard = ({ title, value, icon, description, colorClass = 'text-gray-600' }) => {
  return (
    <Card>
      <div className="flex items-center">
        <div className={`p-3 rounded-full mr-4 ${colorClass.replace('text-', 'bg-').replace('600', '100')}`}>
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className={`text-2xl font-bold ${colorClass}`}>{value}</p>
        </div>
      </div>
      {description && <p className="text-sm text-gray-500 mt-2">{description}</p>}
    </Card>
  );
};

export default StatCard;
